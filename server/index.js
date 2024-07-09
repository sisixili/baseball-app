import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import {   
            RegisterNewUser, findUserID,                                                                        // Login/Logout
                                                                                                                                          
            getFavouriteFranchises, getFavouriteTeams, getFavouritePlayers,                                     // Favourites                        
                createFavouriteFranchise, createFavouriteTeam, createFavouritePlayer,                                           
            
            getAllPlayers,                                                                                      // Search for Player
            
            getBattingLeaders, getPitchingLeaders, getFieldingLeaders,                                          // Leaderboard

            getStandings,                                                                                       // Standings

            getFranchises,                                                                                      // All franchises
                                                                                                                                                       
            getFanchiseBio, getFranchiseTotalPitching, getFranchiseTotalBatting, getFranchiseTeams,             // Franchise profile
                                                                                      
            getTeamBio, getTeamTotalPitching, getTeamAllPitchers, getTeamTotalBatting, getTeamAllBatters,       // Team profile

            getPlayerBio, getPlayerPositions, wasElectedToHallOfFame, getPlayerAwards,                          // Player profile
                getPlayerCareerPitchingTotals, getPlayerSeasonalPitchingTotals, 
                getPlayerCareerBattingTotals, getPlayerSeasonalBattingTotals, 
                getPlayerCareerFieldingTotals, getPlayerSeasonalFieldingTotals         
} from "./database.js";

import { validateToken } from "./middlewares/AuthMiddleware.js";


const app = express();
const { sign } = jwt;

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  // Express 5 middleware
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


/**
 * Register Account
 */
app.post("/register", async (req, res) => {
    const { userID, nameFirst, nameLast, pwd } = req.body;

    if (!userID || !nameFirst || !nameLast || !pwd) {
        return res.status(400).json({ error: "All fields are required" }); 
    }

    try {
        const newUser = await RegisterNewUser(userID, nameFirst, nameLast, pwd);
        res.status(201).json({ message: `User ${userID} registered successfully` });    // res.json gets sent back to client
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


/**
 * Login to account
 */
app.post("/login", async (req, res) => {
    const { userID, pwd } = req.body;
    const user = await findUserID(userID);

    if (!user) {
        return res.json({ error: "User does not exist" });
    }
    
    bcrypt.compare(pwd, user.pwd).then((match) => {
        
        // Check if inputted password matches pwd associated with username
        if (!match) {
            return res.json({ error: "The username or password is incorrect" });
        }
        
        // Create token with userID
        const accessToken = sign({ userID: user.userID }, "8waH28nEHUwE");
        return res.json(accessToken);
    });

});


/**
 * Existing Favourites
 */
app.get("/favourites/:userID", validateToken, async (req, res) => {
    const { userID } = req.params;

    const favouriteFranchises = await getFavouriteFranchises(userID);     
    const favouriteTeams = await getFavouriteTeams(userID);
    const favouritePlayers = await getFavouritePlayers(userID);

    const favourites = {
        favouriteFranchises: favouriteFranchises,
        favouriteTeams: favouriteTeams,
        favouritePlayers: favouritePlayers
    };
    res.send(favourites);
})


/**
 * Create Favourite
 */
app.post("/favourite", validateToken , async (req, res) => { 
    const {type, id, userID} = req.body;
    try {
        switch (type) {
            case 'player':
                await createFavouritePlayer(id, userID);                // playerID, userID
                break;
            case 'team':
                await createFavouriteTeam(id.team, id.year, userID);    // teamID, yearID, userID
                break;
            case 'franchise':
                await createFavouriteFranchise(id, userID);             //franchiseID, userID
                break;
            default:
                // console.log("ERROR: type of favourite ", type, " is not valid!")
                throw("ERROR: type of favourite is not valid!")
        }
        res.status(201).json({ message: `Favourite ${type} registered successfully for ${userID}` });
    } catch (error) {
        res.status(500).json({ error: error + " failed to create favourite " + type + " for user " + userID});
        console.log(error);
    }
});


/**
 * Search For Players
 */
app.get("/players",  validateToken, async (req, res) => { 
    const {page, limit, search} = req.query;
  
    try {
        const players = await getAllPlayers(page, limit, search);
        res.json(players);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch players' });
    }    
});
  

/**
 * Leaderboard
 */
app.get("/leaderboard", validateToken, async (req, res) => {
    const { battingStatistic, pitchingStatistic, fieldingStatistic, 
            battingYearID, pitchingYearID, fieldingYearID, 
            battingOrderDirection, pitchingOrderDirection, fieldingOrderDirection } = req.query;

    try {
        const battingLeaders = await getBattingLeaders(battingStatistic, battingYearID, battingOrderDirection);
        const pitchingLeaders = await getPitchingLeaders(pitchingStatistic, pitchingYearID, pitchingOrderDirection);
        const fieldingLeaders = await getFieldingLeaders(fieldingStatistic, fieldingYearID, fieldingOrderDirection);
        const leaders = {
            battingLeaders: battingLeaders,
            pitchingLeaders: pitchingLeaders,
            fieldingLeaders: fieldingLeaders
        };
        res.send(leaders);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


/**
 * Standings
 */
app.get("/standings", validateToken, async (req, res) => {
    const { yearID } = req.query;
    const standings = await getStandings(yearID);
    res.send(standings);
});

 
/**
 * All Franchises
 */
app.get("/franchises", validateToken, async (req, res) => {
    const activeFranchises = await getFranchises('Y');          // Active franchises
    const nonActiveFranchises = await getFranchises('N');       // Nonactive franchises

    const franchises = {
        activeFranchises: activeFranchises,
        nonActiveFranchises: nonActiveFranchises
    };
    res.send(franchises);
});


/**
 * Franchise Profile
 */
app.get("/franchises/:franchiseID", validateToken, async (req, res) => {
    const { franchiseID } = req.params;

    const franchiseBio = await getFanchiseBio(franchiseID);              
    const franchiseTotalPitching = await getFranchiseTotalPitching(franchiseID);
    const franchiseTotalBatting = await getFranchiseTotalBatting(franchiseID);
    const franchiseTeams = await getFranchiseTeams(franchiseID);

    const franchiseProfile = {
        franchiseBio: franchiseBio,
        franchiseTotalPitching: franchiseTotalPitching,
        franchiseTotalBatting: franchiseTotalBatting,
        franchiseTeams: franchiseTeams
    };
    res.send(franchiseProfile);
});


/**
 * Team Profile
 */
app.get("/teams/:teamID/:yearID", validateToken, async (req, res) => {
    const { teamID, yearID } = req.params;

    // Team bio
    const teamBio = await getTeamBio(teamID, yearID);                             

    // Pitching
    const teamTotalPitching = await getTeamTotalPitching(teamID, yearID);
    const teamAllPitchers = await getTeamAllPitchers(teamID, yearID);

    // Batting
    const teamTotalBatting = await getTeamTotalBatting(teamID, yearID);
    const teamAllBatters = await getTeamAllBatters(teamID, yearID);

    const teamProfile = {
        teamBio: teamBio,
        teamTotalPitching: teamTotalPitching,
        teamAllPitchers: teamAllPitchers,
        teamTotalBatting: teamTotalBatting,
        teamAllBatters: teamAllBatters
    };
    res.send(teamProfile);
});


/**
 * Player Profile
 */
app.get("/players/:playerID", validateToken, async (req, res) => {
    const { playerID } = req.params;
    const { showPlayoffs } = req.query;
    const playoffs = showPlayoffs === 'true';

    // General player info
    const playerBio = await getPlayerBio(playerID); 
    const playerPositions = await getPlayerPositions(playerID);
    const playerHallOfFameStatus = await wasElectedToHallOfFame(playerID);
    const playerAwards = await getPlayerAwards(playerID);

    // Pitching
    const playerCareerPitchingTotals = await getPlayerCareerPitchingTotals(playerID, playoffs);
    const playerSeasonalPitchingTotals = await getPlayerSeasonalPitchingTotals(playerID, playoffs);

    // Batting
    const playerCareerBattingTotals = await getPlayerCareerBattingTotals(playerID, playoffs);
    const playerSeasonalBattingTotals = await getPlayerSeasonalBattingTotals(playerID, playoffs);

    // Fielding
    const playerCareerFieldingTotals = await getPlayerCareerFieldingTotals(playerID, playoffs);
    const playerSeasonalFieldingTotals = await getPlayerSeasonalFieldingTotals(playerID, playoffs);
  
    const playerProfile = {
        playerBio: playerBio,
        playerPositions: playerPositions,
        playerHallOfFameStatus: playerHallOfFameStatus,
        playerAwards: playerAwards,
        playerCareerPitchingTotals: playerCareerPitchingTotals,
        playerSeasonalPitchingTotals: playerSeasonalPitchingTotals,
        playerCareerBattingTotals: playerCareerBattingTotals,
        playerSeasonalBattingTotals: playerSeasonalBattingTotals,
        playerCareerFieldingTotals: playerCareerFieldingTotals,
        playerSeasonalFieldingTotals: playerSeasonalFieldingTotals
    };
    res.send(playerProfile);
});


/**
 * Listen
 */
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

