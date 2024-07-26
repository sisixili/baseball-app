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

            getFranchises, getNationalAssociationFranchises,                                                    // All franchises
                                                                                                                                                       
            getFanchiseBio, getFranchiseTotalPitching, getFranchiseTotalBatting, getFranchiseTeams,             // Franchise profile
                                                                                      
            getTeamBio, getTeamTotalPitching, getTeamAllPitchers, getTeamTotalBatting, getTeamAllBatters,       // Team profile

            getPlayerBio, getPlayerPositions, wasElectedToHallOfFame, getPlayerAwards,                          // Player profile
                getPlayerCareerPitchingTotals, getPlayerSeasonalPitchingTotals, 
                getPlayerCareerBattingTotals, getPlayerSeasonalBattingTotals, 
                getPlayerCareerFieldingTotals, getPlayerSeasonalFieldingTotals,
                getBaseballReferenceID,
            
            getTopFranchises                                                                                    // All time franchise wins racing bar animation     
} from "./database.js";

import { validateToken } from "./middlewares/AuthMiddleware.js";
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

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
      const accessToken = jwt.sign({ userID: user.userID }, process.env.ACCESS_TOKEN_SECRET);

      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({ message: `${userID} Logged in successfully`, token:accessToken}); //, token:accessToken
    });

});

app.get("/logout", (req, res) => {
    return res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "Successfully logged out" });
  });


/**
 * Existing Favourites
 */
app.get("/favourites/:userID", validateToken, async (req, res) => {
    const { userID } = req.params;

    try {
        const favouriteFranchises = await getFavouriteFranchises(userID);     
        const favouriteTeams = await getFavouriteTeams(userID);
        const favouritePlayers = await getFavouritePlayers(userID);
    
        const favourites = {
            favouriteFranchises: favouriteFranchises,
            favouriteTeams: favouriteTeams,
            favouritePlayers: favouritePlayers
        };
        res.send(favourites);
    } catch(error) {
        res.status(500).json({error: error});
    }
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

    //const {battingStatistic, battingYearID, battingOrderDirection} = req.query;


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
    try {
        const standings = await getStandings(yearID);
        res.send(standings);
    } catch (error) {
        res.status(500).json({error: error});
    }
    
});

 
/**
 * All Franchises
 */
app.get("/franchises", validateToken, async (req, res) => {

    try {
        const activeFranchises = await getFranchises('Y');                                  // Active franchises
        const nonActiveFranchises = await getFranchises('N');                               // Nonactive franchises
        const nationalAssociationFranchises = await getNationalAssociationFranchises();     // National Association franchises

        const franchises = {
            activeFranchises: activeFranchises,
            nonActiveFranchises: nonActiveFranchises,
            nationalAssociationFranchises: nationalAssociationFranchises
        };
        res.send(franchises);
    } catch (error) {
        res.status(500).json({error: error});
    }
    
});


/**
 * Franchise Profile
 */
app.get("/franchises/:franchiseID", validateToken, async (req, res) => {
  const { franchiseID } = req.params;

  try {
    const franchiseBio = await getFanchiseBio(franchiseID);
    const franchiseTotalPitching = await getFranchiseTotalPitching(franchiseID);
    const franchiseTotalBatting = await getFranchiseTotalBatting(franchiseID);
    const franchiseTeams = await getFranchiseTeams(franchiseID);

    const franchiseProfile = {
      franchiseBio: franchiseBio,
      franchiseTotalPitching: franchiseTotalPitching,
      franchiseTotalBatting: franchiseTotalBatting,
      franchiseTeams: franchiseTeams,
    };

    res.send(franchiseProfile);
  } catch (error) {
    res.status(500).json({error: error});
  }
});


/**
 * Team Profile
 */
app.get("/teams/:teamID/:yearID", validateToken, async (req, res) => {
  const { teamID, yearID } = req.params;

  try {
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
      teamAllBatters: teamAllBatters,
    };
    res.send(teamProfile);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


/**
 * Player Profile
 */
app.get("/players/:playerID", validateToken, async (req, res) => {
  const { playerID } = req.params;
  const { showPlayoffs } = req.query;
  const playoffs = showPlayoffs === "true";
  try {
    // General player info
    const playerBio = await getPlayerBio(playerID);
    const playerPositions = await getPlayerPositions(playerID);
    const playerHallOfFameStatus = await wasElectedToHallOfFame(playerID);
    const playerAwards = await getPlayerAwards(playerID);

    // Pitching
    const playerCareerPitchingTotals = await getPlayerCareerPitchingTotals(
      playerID,
      playoffs
    );
    const playerSeasonalPitchingTotals = await getPlayerSeasonalPitchingTotals(
      playerID,
      playoffs
    );

    // Batting
    const playerCareerBattingTotals = await getPlayerCareerBattingTotals(
      playerID,
      playoffs
    );
    const playerSeasonalBattingTotals = await getPlayerSeasonalBattingTotals(
      playerID,
      playoffs
    );

    // Fielding
    const playerCareerFieldingTotals = await getPlayerCareerFieldingTotals(
      playerID,
      playoffs
    );
    const playerSeasonalFieldingTotals = await getPlayerSeasonalFieldingTotals(
      playerID,
      playoffs
    );

    // Player Profile Picture
    // Query the database to get the Baseball Reference ID
    const baseballReferenceID = await getBaseballReferenceID(playerID);
    let headshotURL = "";

    if (baseballReferenceID) {
      const firstLetter = baseballReferenceID[0];
      const url = `https://www.baseball-reference.com/players/${firstLetter}/${baseballReferenceID}.shtml`;

      // Fetch and parse the Baseball Reference page for headshot URLs
      const response = await axios.get(url);
      const { document } = new JSDOM(response.data).window;
      const mediaDiv = document.querySelector("div.media-item");

      if (mediaDiv) {
        const imgTag = mediaDiv.querySelector("img");
        if (imgTag) {
          headshotURL = imgTag.src;
        }
      }
    }

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
      playerSeasonalFieldingTotals: playerSeasonalFieldingTotals,
      headshotURL: headshotURL,
    };
    res.send(playerProfile);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


/** 
 * All time wins racing bar animation  
 */
app.get("/barleaders", validateToken, async (req, res) => {
  try {
    const { limit, yearID } = req.query;
    res.send(await getTopFranchises(yearID, limit));
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


/**
 * Listen
 */
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

