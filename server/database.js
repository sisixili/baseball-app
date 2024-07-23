import knex from 'knex'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

// Establish connection to database: pool is "cursor" in python
const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,  
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
});


///////////////////////////////////////////////// LOGIN/LOGOUT

export const findUserID = async(userID) => {
    const existingUser = await db("users").where({ userID }).first()
    if (existingUser) {
        return existingUser
    }
    else {
        return null 
    }
} 

export const RegisterNewUser = async (userID, nameFirst, nameLast, pwd) => {
    // Check if the username already exists
    const existingUser = await findUserID(userID);
    if (existingUser) {
        throw "Username already taken";
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(pwd, 10);

    // Insert the new user into the database
    await db("users").insert({
        userID: userID,
        nameFirst: nameFirst,
        nameLast: nameLast,
        pwd: hashedPassword,
    });
}


///////////////////////////////////////////////// FAVOURITES

export const getFavouriteFranchises = async (userID) => {
    return await db('FavouriteFranchises')
        .select('Franchises.franchiseName', 'Franchises.franchiseID')
        .join('Franchises', 'FavouriteFranchises.franchiseID', '=', 'Franchises.franchiseID')
        .where('FavouriteFranchises.userID', userID);
}

export const getFavouriteTeams = async (userID) => {
    return await db('FavouriteTeams')
        .select('Teams.name', 'Teams.yearID', 'Teams.teamID')
        .join('Teams', function() {
            this.on('FavouriteTeams.yearID', '=', 'Teams.yearID')
                .andOn('FavouriteTeams.teamID', '=', 'Teams.teamID'); 
        })
        .where('FavouriteTeams.userID', userID);
}

export const getFavouritePlayers = async (userID) => {
    return await db('FavouritePlayers')
        .select('Players.nameFirst', 'Players.nameLast', 'Players.playerID')
        .join('Players', 'FavouritePlayers.playerID', '=', 'Players.playerID')
        .where('FavouritePlayers.userID', userID);
}

export const createFavouriteFranchise = async (franchiseID, userID) => {
    const exists = await db("FavouriteFranchises")
        .select("*")
        .where({ userID, franchiseID })
        .first();
    if (exists) {
        console.log("Favourite Franchise already exists: ", userID, franchiseID);
        //console.log(exists);
        throw "Favourite franchise already exists. ";
    } else {
        await db("FavouriteFranchises").insert({ userID, franchiseID });
        //console.log('Successfully added favourite player ', franchiseID, ' for ', userID)
    }
  };

export const createFavouriteTeam = async (teamID, yearID, userID) => {
    const exists = await db("FavouriteTeams")
        .select("*")
        .where({ userID, yearID, teamID })
        .first();
    if (exists) {
        console.log("Favourite Team already exists: ", userID, teamID, yearID);
        //console.log(exists);
        throw "Favourite Team already exists. ";
    }
    else {
        await db('FavouriteTeams').insert({ userID, yearID, teamID });
    }
};

export const createFavouritePlayer = async (playerID, userID) => {
    const exists = await db("FavouritePlayers")
        .select("*")
        .where({ userID, playerID })
        .first();
    if (exists) {
        console.log("Favourite Player already exists: ", userID, playerID); // Does not return this msg to api
        //console.log(exists);
        throw "Favourite Player already exists. ";
    } else {
        await db("FavouritePlayers").insert({ userID, playerID });
        //console.log("Successfully added favourite player ", playerID, " for ", userID);
    }
};


///////////////////////////////////////////////// SEARCH FOR PLAYERS

export const getAllPlayers = async (page, limit, search) => {

    const offset = (page - 1) * limit;
  
    let query = db('Players')
        .select('*')
        .offset(offset)
        .limit(limit);
  
    if (search) {
        query = query.where('nameLast', 'like', `%${search}%`);
    }
  
    const players = await query;
  
    let countQuery = db('players').count('playerID as count').first();
    if (search) {
        countQuery = countQuery.where('nameLast', 'like', `%${search}%`);
    }
  
    const totalPlayers = await countQuery;
    const totalPages = Math.ceil(totalPlayers.count / limit);
  
    return {players, totalPages}
};


///////////////////////////////////////////////// CONSTANTS

const TEAM_TOTAL_PITCHING = [       'W', 'L', 'GS', 'CG', 'SHO', 'SV', 'H', 'R', 'ER', 'HR', 'BB', 'IBB', 'SO', 'HBP', 'BK', 'WP'];             // IP Calculated
const TEAM_TOTAL_BATTING = [        'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'SB', 'CS', 'BB', 'SO', 'IBB', 'HBP', 'SH', 'SF', 'GIDP'];         // PA Calculated

const PLAYER_PITCHING = [           'G', 'W', 'L', 'GS', 'CG', 'SHO', 'SV', 'H', 'R', 'ER', 'HR', 'BB', 'IBB', 'SO', 'HBP', 'BK', 'WP'];        // IP Calculated
const PLAYER_BATTING = [            'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'SB', 'CS', 'BB', 'SO', 'IBB', 'HBP', 'SH', 'SF', 'GIDP'];    // PA Calculated
const PLAYER_FIELDING = [           'GS', 'PO', 'A', 'E', 'DP'];                                                                                // Inn Calculated
  

///////////////////////////////////////////////// LEADERBOARD

export const getPitchingLeaders = async (pitchingStatistic, yearID, orderDirection) => {
    return await db('Pitching')
        .select(
            'Pitching.playerID', 
            'Players.nameFirst', 
            'Players.nameLast',
            db.raw('SUM(outsRecorded) / 3 AS IP'),
            ...PLAYER_PITCHING.map(stat => db.raw(`SUM(${stat}) AS ${stat}`))
        )
        .join('Players', 'Pitching.playerID', 'Players.playerID')
        .where('Pitching.yearID', yearID)
        .groupBy('Pitching.playerID', 'Players.nameFirst', 'Players.nameLast')
        //.orderBy(db.raw(`SUM(${pitchingStatistic})`), orderDirection)
        .orderBy(pitchingStatistic, orderDirection)
        .limit(25);
}

export const getBattingLeaders = async (battingStatistic, yearID, orderDirection) => {
    return await db('Batting')
        .select(
            'Batting.playerID', 
            'Players.nameFirst', 
            'Players.nameLast',
            db.raw('SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + SUM(COALESCE(SF, 0)) AS PA'),
            ...PLAYER_BATTING.map(stat => db.raw(`SUM(${stat}) AS ${stat}`))
        )
        .join('Players', 'Batting.playerID', 'Players.playerID')
        .where('Batting.yearID', yearID)
        .groupBy('Batting.playerID', 'Players.nameFirst', 'Players.nameLast')
        //.orderBy(db.raw(`SUM(${battingStatistic})`), orderDirection)
        .orderBy(db.raw(battingStatistic), orderDirection)
        .limit(25);
}

export const getFieldingLeaders = async (fieldingStatistic, yearID, orderDirection) => {
    return await db('Fielding')
        .select(
            'Fielding.playerID', 
            'Players.nameFirst', 
            'Players.nameLast',
            db.raw('SUM(outsRecorded) / 3 AS Inn'),
            ...PLAYER_FIELDING.map(stat => db.raw(`SUM(${stat}) AS ${stat}`))
        )
        .join('Players', 'Fielding.playerID', 'Players.playerID')
        .where('Fielding.yearID', yearID)
        .groupBy('Fielding.playerID', 'Players.nameFirst', 'Players.nameLast')
        //.orderBy(db.raw(`SUM(${fieldingStatistic})`), orderDirection)
        .orderBy(db.raw(fieldingStatistic), orderDirection)
        .limit(25);
}


///////////////////////////////////////////////// STANDINGS

export const getStandings = async (yearID) => {
    return await db('Teams')
        .select(
            'Teams.teamID',
            'Teams.name',
            'Teams.yearID',
            'Franchises.franchiseID',
            'Franchises.franchiseName',
            'Teams.G',
            'Teams.W',
            'Teams.L'
        )
        .join('Franchises', 'Franchises.franchiseID', 'Teams.franchiseID')
        .where('yearID', yearID)
        .orderBy('W', 'desc');
}


///////////////////////////////////////////////// ALL FRANCHISES

export const getFranchises = async (isActive) => {
    return await db('Franchises')
        .join('Teams', 'Franchises.franchiseID', 'Teams.franchiseID')
        .leftJoin('SeriesPost', function() {
            this.on('Teams.yearID', '=', 'SeriesPost.yearID')
                .andOn('SeriesPost.round', '=', db.raw("'WS'"))
                .andOn('Teams.teamID', '=', 'SeriesPost.winningTeamID')
        })
        .select(
            'Franchises.franchiseID',
            'Franchises.franchiseName',
            db.raw('SUM(Teams.G) AS totalGames'),
            db.raw('SUM(Teams.W) AS totalWins'),
            db.raw('SUM(Teams.L) AS totalLosses'),
            db.raw('SUM(Teams.W) / SUM(Teams.G) AS winPercentage'),
            db.raw('COUNT(SeriesPost.winningTeamID) AS worldSeriesWins')
        )
        .where("Franchises.isActive", isActive)
        .groupBy('Franchises.franchiseID')
        .orderBy('Franchises.franchiseName', 'asc');
};

export const getNationalAssociationFranchises = async () => {
    return await db('Franchises')
        .join('Teams', 'Franchises.franchiseID', 'Teams.franchiseID')
        .leftJoin('SeriesPost', function() {
            this.on('Teams.yearID', '=', 'SeriesPost.yearID')
                .andOn('SeriesPost.round', '=', db.raw("'WS'"))
                .andOn('Teams.teamID', '=', 'SeriesPost.winningTeamID')
        })
        .select(
            'Franchises.franchiseID',
            'Franchises.franchiseName',
            db.raw('SUM(Teams.G) AS totalGames'),
            db.raw('SUM(Teams.W) AS totalWins'),
            db.raw('SUM(Teams.L) AS totalLosses'),
            db.raw('SUM(Teams.W) / SUM(Teams.G) AS winPercentage'),
            db.raw('COUNT(SeriesPost.winningTeamID) AS worldSeriesWins')
        )
        .whereNull('Franchises.isActive')
        .groupBy('Franchises.franchiseID')
        .orderBy('Franchises.franchiseName', 'asc');
};



///////////////////////////////////////////////// FRANCHISE PROFILE

export const getFanchiseBio = async (franchiseID) => {
    return await db("Franchises")
        .join('Teams', 'Franchises.franchiseID', 'Teams.franchiseID')
        .leftJoin('SeriesPost', function() {
            this.on('Teams.yearID', '=', 'SeriesPost.yearID')
                .andOn('SeriesPost.round', '=', db.raw("'WS'"))
                .andOn('Teams.teamID', '=', 'SeriesPost.winningTeamID')
        })
        .select(
            "Franchises.franchiseName", 
            "Franchises.isActive",
            db.raw('SUM(Teams.G) AS totalGames'),
            db.raw('SUM(Teams.W) AS totalWins'),
            db.raw('SUM(Teams.L) AS totalLosses'),
            db.raw('SUM(Teams.W) / SUM(Teams.G) AS winPercentage'),
            db.raw('COUNT(SeriesPost.winningTeamID) AS worldSeriesWins')
        )
        .where("Franchises.franchiseID", franchiseID)
        .groupBy("Franchises.franchiseID", "Franchises.franchiseName", "Franchises.isActive");
};

export const getFranchiseTotalPitching = async (franchiseID) =>{
    return await db('Franchises')
        .join('Teams', 'Franchises.franchiseID', 'Teams.franchiseID')
        .join('Pitching', function() {
            this.on('Teams.yearID', '=', 'Pitching.yearID')
                .andOn('Teams.teamID', '=', 'Pitching.teamID');
        })
        .select(
            ...TEAM_TOTAL_PITCHING.map(column => db.raw(`SUM(Pitching.${column}) AS total_${column}`))
        )
        .where('Franchises.franchiseID', franchiseID);
}

export const getFranchiseTotalBatting = async (franchiseID) => {
    return await db('Franchises')
        .join('Teams', 'Franchises.franchiseID', 'Teams.franchiseID')
        .join('Batting', function() {
            this.on('Teams.yearID', '=', 'Batting.yearID')
                .andOn('Teams.teamID', '=', 'Batting.teamID');
        })
        .select(
            ...TEAM_TOTAL_BATTING.map(column => db.raw(`SUM(Batting.${column}) AS total_${column}`))
        )
        .where('Franchises.franchiseID', franchiseID);
}

export const getFranchiseTeams = async (franchiseID) => {
  return await db("Teams")
    .select(
        "yearID",
        "name",
        "teamID",
        "G",
        "W",
        "L",
        db.raw('W / G AS winPercentage'),
        db.raw('(Teams.attendance / (SELECT SUM(gamesWithFans) FROM HomeGames WHERE HomeGames.yearID = Teams.yearID AND HomeGames.teamID = Teams.teamID)) AS averageAttendance')
    )
    .where("franchiseID", franchiseID)
    .orderBy("yearID", "asc");
};


///////////////////////////////////////////////// TEAM PROFILE

export const getTeamBio = async (teamID, yearID) => {
    return await db('Teams')
        .select(
            'Teams.name',
            'Teams.franchiseID',
            db.raw('(SELECT franchiseName FROM Franchises WHERE Teams.franchiseID = Franchises.franchiseID) AS franchiseName'), 
            'Teams.G',
            'Teams.W',
            'Teams.L',
            'Teams.park',
            db.raw('(Teams.attendance / (SELECT SUM(gamesWithFans) FROM HomeGames WHERE HomeGames.yearID = Teams.yearID AND HomeGames.teamID = Teams.teamID)) AS averageAttendance')
        )
        .where('Teams.yearID', yearID)
        .andWhere('Teams.teamID', teamID);
}

export const getTeamTotalPitching = async (teamID, yearID) => {
    return await db('Pitching')
        .select(
            ...TEAM_TOTAL_PITCHING.map(column => db.raw(`SUM(${column}) as ${column}`)),
            db.raw('SUM(outsRecorded) / 3 AS IP')
        )
        .where('yearID', yearID)
        .andWhere('teamID', teamID);
}

export const getTeamAllPitchers = async (teamID, yearID) => {
    return await db('Pitching')
        .join('Players', 'Pitching.playerID', '=', 'Players.playerID')
        .select(
            'Players.nameFirst',
            'Players.nameLast',
            'Pitching.playerID', 
            ...PLAYER_PITCHING,
            db.raw(`outsRecorded / 3 AS IP`)
        )
        .where('Pitching.yearID', yearID)
        .andWhere('Pitching.teamID', teamID)
        .orderBy('nameLast', 'asc');
}

export const getTeamTotalBatting = async (teamID, yearID) => {
    return await db('Batting')
        .select(
            ...TEAM_TOTAL_BATTING.map(column => db.raw(`SUM(${column}) as ${column}`)),
            db.raw('SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + SUM(COALESCE(SF, 0)) AS PA')
        )
        .where('yearID', yearID)
        .andWhere('teamID', teamID);
        
}

export const getTeamAllBatters = async (teamID, yearID) => {
    return await db('Batting')
        .join('Players', 'Batting.playerID', '=', 'Players.playerID')
        .select(
            'Players.nameFirst',
            'Players.nameLast',
            'Batting.playerID', 
            ...PLAYER_BATTING,
            db.raw('COALESCE(AB ,0) + COALESCE(BB ,0) + COALESCE(HBP ,0) + COALESCE(SH ,0) + COALESCE(SF ,0) AS PA')
        )
        .where('Batting.yearID', yearID)
        .andWhere('Batting.teamID', teamID)
        .orderBy('nameLast', 'asc');
}


///////////////////////////////////////////////// PLAYER PROFILE

export const getPlayerBio = async (playerID) => {
    return await db('Players')
        .select('nameFirst', 'nameLast', 'weight', 'height', 'bats', 'throws', 'birthDay', 'birthMonth', 'birthYear', 'birthCountry', 'debut')
        .where('Players.playerID', playerID);
}

export const getPlayerPositions = async(playerID) => {
    return await db('Fielding')
        .distinct('position')
        .where('playerID', playerID)
        .orderByRaw(
            `CASE
                WHEN position = 'P' THEN 1
                WHEN position = 'C' THEN 2
                WHEN position = '1B' THEN 3
                WHEN position = '2B' THEN 4
                WHEN position = '3B' THEN 5
                WHEN position = 'SS' THEN 6
                WHEN position = 'OF' THEN 7
            END`
        );
}

export const wasElectedToHallOfFame = async(playerID) => {
    return await db('HallOfFame')
        .select('yearID')
        .where('playerID', playerID)
        .andWhere('wasInducted', 'Y')
        .orderBy('yearID', 'asc');
}

export const getPlayerAwards = async(playerID) => {
    return await db
        .select('awardID', 'note', 'leagueID', 'yearID')
        .from(function() {
            this.select(
                db.raw('"All Star" AS awardID'),
                db.raw('NULL AS note'),
                'leagueID',
                'yearID'
            )
            .from('AllstarFull')
            .where('playerID', playerID)
            .groupBy('awardID', 'note', 'leagueID', 'yearID')
        .unionAll(function() {
            this.select(
                'awardID',
                'note',
                'leagueID',
                'yearID'
            )
            .from('AwardsPlayers')
            .where('playerID', playerID)
        })
        .as('Awards')
        })
        .orderBy([
            { column: 'yearID', order: 'asc' },
            { column: 'awardID', order: 'desc' }
        ]);
}   

export const getPlayerCareerPitchingTotals = async (playerID, playoffs) => {
    const table = playoffs ? 'PitchingPost' : 'Pitching';
    return await db(table)
        .select(db.raw('COUNT(DISTINCT yearID) AS seasonsPlayed'),
                ...PLAYER_PITCHING.map(column => db.raw(`SUM(${column}) AS ${column}`)), 
                db.raw('SUM(outsRecorded) / 3 AS IP'))
        .where('playerID', playerID)
        .having(db.raw('SUM(outsRecorded) / 3'), '>', 0);
}

export const getPlayerSeasonalPitchingTotals = async (playerID, playoffs) => {
    if (playoffs) {
        return await db('PitchingPost')
        .select('PitchingPost.yearID', 'PitchingPost.teamID', 
                db.raw('(SELECT name FROM Teams WHERE Teams.yearID = PitchingPost.yearID AND Teams.teamID = PitchingPost.teamID) AS teamName'), 
                ...PLAYER_PITCHING.map(column => db.raw(`SUM(${column}) AS ${column}`)), 
                db.raw('SUM(outsRecorded) / 3 AS IP'))
        .where('PitchingPost.playerID', playerID)
        .groupBy('PitchingPost.yearID', 'PitchingPost.teamID')
        .having(db.raw('SUM(outsRecorded) / 3'), '>', 0)
        .orderBy('PitchingPost.yearID', 'asc');
    } else {
        return await db('Pitching')
        .select('Pitching.yearID', 'Pitching.teamID', 
                db.raw('(SELECT name FROM Teams WHERE Teams.yearID = Pitching.yearID AND Teams.teamID = Pitching.teamID) AS teamName'), 
                ...PLAYER_PITCHING, 
                db.raw(`outsRecorded / 3 AS IP`))
        .where('Pitching.playerID', playerID)
        .andWhere(db.raw('outsRecorded / 3'), '>', 0)
        .orderBy(['Pitching.yearID', 'Pitching.stint'], 'asc');
    }
}

export const getPlayerCareerBattingTotals = async (playerID, playoffs) => {
    const table = playoffs ? 'BattingPost' : 'Batting';
    return await db(table)
        .select(db.raw('COUNT(DISTINCT yearID) AS seasonsPlayed'),
                db.raw('SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + SUM(COALESCE(SF, 0)) AS PA'),
                ...PLAYER_BATTING.map(column => db.raw(`SUM(${column}) AS ${column}`)))
        .where('playerID', playerID)
        .having(db.raw('SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + SUM(COALESCE(SF, 0))'), '>', 0);
}

export const getPlayerSeasonalBattingTotals = async (playerID, playoffs) => {
    if (playoffs) {
        return await db('BattingPost')
        .select('BattingPost.yearID', 'BattingPost.teamID', 
                db.raw('(SELECT name FROM Teams WHERE Teams.yearID = BattingPost.yearID AND Teams.teamID = BattingPost.teamID) AS teamName'), 
                db.raw('SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + SUM(COALESCE(SF, 0)) AS PA'),
                ...PLAYER_BATTING.map(column => db.raw(`SUM(${column}) AS ${column}`)))
        .where('BattingPost.playerID', playerID)
        .groupBy('BattingPost.yearID', 'BattingPost.teamID')
        .having(db.raw('SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + SUM(COALESCE(SF, 0))'), '>', 0)
        .orderBy('BattingPost.yearID', 'asc');
    } else {
        return await db('Batting')
        .select('Batting.yearID', 'Batting.teamID', 
                db.raw('(SELECT name FROM Teams WHERE Teams.yearID = Batting.yearID AND Teams.teamID = Batting.teamID) AS teamName'),
                db.raw('COALESCE(AB ,0) + COALESCE(BB ,0) + COALESCE(HBP ,0) + COALESCE(SH ,0) + COALESCE(SF ,0) AS PA'), 
                ...PLAYER_BATTING)
        .where('Batting.playerID', playerID)
        .andWhere(db.raw('COALESCE(AB ,0) + COALESCE(BB ,0) + COALESCE(HBP ,0) + COALESCE(SH ,0) + COALESCE(SF ,0)'), '>', 0)
        .orderBy(['Batting.yearID', 'Batting.stint'], 'asc');
    }
}

export const getPlayerCareerFieldingTotals = async (playerID, playoffs) => {
    const table = playoffs ? 'FieldingPost' : 'Fielding';
    return await db(table)
        .select(db.raw('COUNT(DISTINCT yearID) AS seasonsPlayed'),
                ...PLAYER_FIELDING.map(column => db.raw(`SUM(${column}) AS ${column}`)), 
                db.raw('SUM(outsRecorded) / 3 AS Inn'))
        .where('playerID', playerID)
        .having(db.raw('SUM(outsRecorded) / 3'), '>', 0);
}

export const getPlayerSeasonalFieldingTotals = async (playerID, playoffs) => {
    if (playoffs) {
        return await db('FieldingPost')
        .select('FieldingPost.yearID', 'FieldingPost.teamID', 
                db.raw('(SELECT name FROM Teams WHERE Teams.yearID = FieldingPost.yearID AND Teams.teamID = FieldingPost.teamID) AS teamName'), 
                db.raw(`SUM(outsRecorded) / 3 AS Inn`),
                ...PLAYER_FIELDING.map(column => db.raw(`SUM(${column}) AS ${column}`)))
        .where('FieldingPost.playerID', playerID)
        .groupBy('FieldingPost.yearID', 'FieldingPost.teamID')
        .having(db.raw('SUM(outsRecorded) / 3'), '>', 0)
        .orderBy('FieldingPost.yearID', 'asc');
    } else {
        return await db('Fielding')
        .select('Fielding.yearID', 'Fielding.teamID', 
                db.raw('(SELECT name FROM Teams WHERE Teams.yearID = Fielding.yearID AND Teams.teamID = Fielding.teamID) AS teamName'), 
                db.raw(`SUM(outsRecorded) / 3 AS Inn`),
                ...PLAYER_FIELDING.map(column => db.raw(`SUM(${column}) AS ${column}`)))
        .where('Fielding.playerID', playerID)
        .groupBy('Fielding.yearID', 'Fielding.teamID', 'Fielding.stint')
        .having(db.raw('SUM(outsRecorded) / 3'), '>', 0)
        .orderBy(['Fielding.yearID', 'Fielding.stint'], 'asc');
    }
}


// RACING BAR DISPLAY

// btw this is a temp function I made based off of getStandings (doesn't take into account national association)
// This does not take the SUM of all years
export const getTopFranchises = async (yearID, limit) => {
  return await db("Teams")
    .select("Franchises.franchiseName", db.raw("SUM(Teams.W) as totalWins"))
    .join("Franchises", "Franchises.franchiseID", "Teams.franchiseID")
    .where("Teams.yearID", "<=", yearID)
    .groupBy("Franchises.franchiseName")
    .orderBy("totalWins", "desc")
    .limit(limit);
};
