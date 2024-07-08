// All SQL queries go here
// REMEMBER: must import each function below in index.js (or wherever it's being used)

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
    pool: {min: 0, max: 30} // set max/min on size of connection pool
});

//------------Queries-------------//


/**
 * Register user 
 */
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


export const getAllPlayers = async () => {
    return await db('Players')
        .select('*')
        //.limit(limit);
}

export const getBattingLeaders = async (hittingStatistic, yearID, orderDirection) => {
    return await db('Batting')
        .select('Batting.playerID', hittingStatistic, 'Players.nameFirst', 'Players.nameLast')
        .join('Players', 'Batting.playerID', 'Players.playerID')
        .where('Batting.yearID', yearID)
        .orderBy(hittingStatistic, orderDirection)
        .limit(25);
}

export const getPitchingLeaders = async (pitchingStatistic, yearID, orderDirection) => {
    return await db('Pitching')
        .select('Pitching.playerID', pitchingStatistic, 'Players.nameFirst', 'Players.nameLast')
        .join('Players', 'Pitching.playerID', 'Players.playerID')
        .where('Pitching.yearID', yearID)
        .orderBy(pitchingStatistic, orderDirection)
        .limit(25);
}


// All time statistics displayed for each franchise
const FRANCHISE_TOTALS = [              'G', 'W', 'L', 'R', 'AB', 'H', '2B', '3B', 'HR', 'BB', 'SO', 'SB', 'CS', 'HBP', 'SF', 
                                        'RA', 'ER', 'CG', 'SHO', 'SV', 'HA', 'HRA', 'BBA', 'SOA', 'E', 'DP'];                                       // IP Calculated

// Totalled statistics for all players on team displayed for a given team that is part of a franchise                                
const TEAM_SINGLE_SEASON = [            'G', 'W', 'L', 'R', 'AB', 'H', '2B', '3B', 'HR', 'BB', 'SO', 'SB', 'CS', 'HBP', 'SF', 
                                        'RA', 'ER', 'CG', 'SHO', 'SV', 'HA', 'HRA', 'BBA', 'SOA', 'E', 'DP', 'FP'];                                 // IP Calculated

// Totalled pitching statistics for all players on a team displayed for a given team
const TEAM_SINGLE_SEASON_PITCHING = [   'G', 'W', 'L', 'GS', 'CG', 'SHO', 'SV', 'H', 'R', 'ER', 'HR', 'BB', 'IBB', 'SO', 'HBP', 'BK', 'WP'];        // IP Calculated

// Totalled batting statistics for all players on a team displayed for a given team
const TEAM_SINGLE_SEASON_HITTING = [    'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'SB', 'CS', 'BB', 'SO', 'IBB', 'HBP', 'SH', 'SF', 'GIDP'];         // PA Calculated

// Carreer pitching statistics displayed for a given player
const PLAYER_CAREER_PITCHING = [        'G', 'W', 'L', 'GS', 'CG', 'SHO', 'SV', 'H', 'R', 'ER', 'HR', 'BB', 'IBB', 'SO', 'HBP', 'BK', 'WP'];        // IP Calculated

// Season by season pitching statistics displayed for a given player
const PLAYER_SINGLE_SEASON_PITCHING = [ 'G', 'W', 'L', 'GS', 'CG', 'SHO', 'SV', 'H', 'R', 'ER', 'HR', 'BB', 'IBB', 'SO', 'HBP', 'BK', 'WP'];        // IP Calculated

// Carreer batting statistics displayed for a given player
const PLAYER_CAREER_HITTING = [         'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'SB', 'CS', 'BB', 'SO', 'IBB', 'HBP', 'SH', 'SF', 'GIDP'];    // PA Calculated

// Season by season batting statistics displayed for a given player
const PLAYER_SINGLE_SEASON_HITTING = [  'G', 'AB', 'R', 'H', '2B', '3B', 'HR', 'RBI', 'SB', 'CS', 'BB', 'SO', 'IBB', 'HBP', 'SH', 'SF', 'GIDP'];    // PA Calculated


export const getFranchises = async (isActive) => {
  const franchiseTotals = await db("Franchises")
    .join("Teams", "Franchises.franchiseID", "Teams.franchiseID")
    .select(
      "Franchises.franchiseID",
      "Franchises.franchiseName",
      ...FRANCHISE_TOTALS.map((column) =>
        db.raw(`SUM(${column}) as ${column}`)
      ),
      db.raw("SUM(outsRecorded) / 3 AS IP")
    )
    .where("Franchises.isActive", isActive)
    .groupBy("Franchises.franchiseID")
    .orderBy(db.raw("SUM(W)"), "desc");

  return franchiseTotals;
};

export const getFanchiseBio = async (franchiseID) => {
  return await db("Franchises")
    .select("franchiseName", "isActive")
    .where("franchiseID", franchiseID);
};

export const getFranchiseTotals = async (franchiseID) => {
  return await db("Teams")
    .select(
      ...FRANCHISE_TOTALS.map((column) =>
        db.raw(`SUM(${column}) as ${column}`)
      ),
      db.raw("SUM(outsRecorded) / 3 AS IP")
    )
    .where("franchiseID", franchiseID);
};

export const getFranchiseTeams = async (franchiseID) => {
  return await db("Teams")
    .select(
      "name",
      "teamID",
      "yearID",
      ...TEAM_SINGLE_SEASON,
      db.raw("outsRecorded / 3 AS IP")
    )
    .where("franchiseID", franchiseID)
    .orderBy("yearID", "asc");
};


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
            this.on('FavouriteTeams.teamID', '=', 'Teams.teamID')
                .andOn('FavouriteTeams.yearID', '=', 'Teams.yearID'); 
        })
        .where('FavouriteTeams.userID', userID);
}

export const getFavouritePlayers = async (userID) => {
    return await db('FavouritePlayers')
        .select('Players.nameFirst', 'Players.nameLast', 'Players.playerID')
        .join('Players', 'FavouritePlayers.playerID', '=', 'Players.playerID')
        .where('FavouritePlayers.userID', userID);
}

export const getTeamBio = async (teamID, yearID) => {
    return await db('Teams')
        .select(
            'Teams.name',
            'Teams.franchiseID',
            'Teams.G',
            'Teams.W',
            'Teams.L',
            'Teams.park',
            db.raw('Teams.attendance / HomeGames.gamesWithFans AS averageAttendance')
        )
        .join('HomeGames', function() {
            this.on('Teams.teamID', '=', 'HomeGames.teamID')
                .andOn('Teams.yearID', '=', 'HomeGames.yearID');
        })
        .where('Teams.teamID', teamID)
        .andWhere('Teams.yearID', yearID);
}

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

export const getTotalBattersForTeam = async (teamID, yearID) => {
    const sumColumns = TEAM_SINGLE_SEASON_HITTING.map(column => db.raw(`SUM(${column}) as ${column}`));
    sumColumns.push(db.raw('SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + SUM(COALESCE(SF, 0)) AS PA'));
    return await db('Batting')
        .select(sumColumns)
        .where('teamID', teamID)
        .andWhere('yearID', yearID);
}

export const getAllBattersForTeam = async (teamID, yearID) => {
    return await db('Batting')
        .select('Players.nameFirst', 'Players.nameLast', 'Players.playerID', ...PLAYER_CAREER_HITTING)
        .join('Players', 'Batting.playerID', '=', 'Players.playerID')
        .where('Batting.teamID', teamID)
        .andWhere('Batting.yearID', yearID)
        .orderBy('G', 'desc');
}

export const getTotalPitchersForTeam = async (teamID, yearID) => {
    return await db('Pitching')
        .select(
            ...TEAM_SINGLE_SEASON_PITCHING.map(column => db.raw(`SUM(${column}) as ${column}`)),
            db.raw('SUM(outsRecorded) / 3 AS IP')
        )
        .where('teamID', teamID)
        .andWhere('yearID', yearID);
}

export const getAllPitchersForTeam = async (teamID, yearID) => {
    return await db('Pitching')
        .select('Players.nameFirst', 'Players.nameLast', 'Players.playerID', ...PLAYER_SINGLE_SEASON_PITCHING)
        .join('Players', 'Pitching.playerID', '=', 'Players.playerID')
        .where('Pitching.teamID', teamID)
        .andWhere('Pitching.yearID', yearID)
        .orderBy('G', 'desc');
}

export const getPlayerBio = async (playerID) => {
    return await db('Players')
        .select('nameFirst', 'nameLast', 'weight', 'height', 'bats', 'throws', 'birthCountry')
        .where('Players.playerID', playerID);
}

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

export const getCareerPitchingTotals = async (playerID) => {
    const sumColumns = PLAYER_CAREER_PITCHING.map(column => db.raw(`SUM(??) AS ??`, [column, column]));
    sumColumns.push(db.raw(`SUM(outsRecorded) / 3 AS IP`));
    return await db('Pitching')
        .select(...sumColumns)
        .where('Pitching.playerID', playerID);
}

export const getSeasonBySeasonPitchingStats = async (playerID) => {
    const columns = PLAYER_SINGLE_SEASON_PITCHING;
    columns.push(db.raw(`outsRecorded / 3 AS IP`));

    return await db('Pitching')
        .select('yearID', 'teamID', ...columns)
        .where('Pitching.playerID', playerID)
        .orderBy('yearID', 'asc');
}

export const getCareerBattingTotals = async (playerID) => {
    const sumColumns = PLAYER_CAREER_HITTING.map(column => db.raw(`SUM(??) AS ??`, [column, column]));
    sumColumns.push(db.raw('SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + SUM(COALESCE(SF, 0)) AS PA'));
    return await db('Batting')
        .select(...sumColumns)
        .where('Batting.playerID', playerID);
}

export const getSeasonBySeasonBattingStats = async (playerID) => {
    const columns = PLAYER_SINGLE_SEASON_HITTING;
    columns.push(db.raw('COALESCE(AB ,0) + COALESCE(BB ,0) + COALESCE(HBP ,0) + COALESCE(SH ,0) + COALESCE(SF ,0) AS PA'));
    return await db('Batting')
        .select('yearID', 'teamID', ...columns)
        .where('Batting.playerID', playerID)
        .orderBy('yearID', 'asc');
}
