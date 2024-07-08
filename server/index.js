// "main file"
// Contains all backend APIs

//---------Headers---------//

import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import {    getAllPlayers,                                                                                                                                              // Search for player
            getBattingLeaders, getPitchingLeaders,                                                                                                                      // Leaderboard
            RegisterNewUser, findUserID,                                                                                                                                // Login/Logout
            getFavouriteFranchises, getFavouriteTeams, getFavouritePlayers,                                                                                             // Favourites
            getFranchises,                                                                                                                                              // All franchises
            getFanchiseBio, getFranchiseTotals, getFranchiseTeams, createFavouriteFranchise,                                                                            // Franchise profile
            getTeamBio, getTotalPitchersForTeam, getAllPitchersForTeam, getTotalBattersForTeam, getAllBattersForTeam, createFavouriteTeam,                              // Team profile
            getPlayerBio, getCareerPitchingTotals, getSeasonBySeasonPitchingStats, getCareerBattingTotals, getSeasonBySeasonBattingStats, createFavouritePlayer         // Player profile
} from "./database.js"; // This syntax is for "destructuring", a javascript technique to extract values from an object
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

// ------------API's-------------------//


/**
 * Players
 */
app.get("/players", validateToken, async (req, res) => {
  const players = await getAllPlayers();          
  res.send(players);
});

app.get("/players/:playerID", validateToken, async (req, res) => {
  const playerBio = await getPlayerBio(req.params.playerID)                                           // Player bio
  const careerPitchingTotals = await getCareerPitchingTotals(req.params.playerID)                     // Career pitching totals
  const seasonBySeasonPitchingStats = await getSeasonBySeasonPitchingStats(req.params.playerID)       // Season by season pitching statistics
  const careerBattingTotals = await getCareerBattingTotals(req.params.playerID)                       // Career batting totals
  const seasonBySeasonBattingStats = await getSeasonBySeasonBattingStats(req.params.playerID)         // Season by season batting statistics
  const playerProfile = {
      playerBio: playerBio,
      careerPitchingTotals: careerPitchingTotals,
      seasonBySeasonPitchingStats: seasonBySeasonPitchingStats,
      careerBattingTotals: careerBattingTotals,
      seasonBySeasonBattingStats: seasonBySeasonBattingStats
  };
  res.send(playerProfile)
})

/**
 * Leaderboard
 */

app.get("/leaderboard", validateToken, async (req, res) => {
  const { hittingStatistic, pitchingStatistic, hitYearID, pitchYearID, hitOrderDirection, pitchOrderDirection } = req.query;
  try {
    const hittingLeaders = await getBattingLeaders(hittingStatistic, hitYearID, hitOrderDirection)      // Batting leaderboard, hittingStatistic: H or HR or RBI
    const pitchingLeaders = await getPitchingLeaders(pitchingStatistic, pitchYearID, pitchOrderDirection)   // Pitching leaderboard, pitchingStatitic: W or ER or SO
    const leaders = {
        hittingLeaders: hittingLeaders,
        pitchingLeaders: pitchingLeaders,
    }
    res.send(leaders)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * Login/Logout
 */
app.post("/register", async (req, res) => {
  const { userID, nameFirst, nameLast, pwd } = req.body;

  if (!userID || !nameFirst || !nameLast || !pwd) {
    return res.status(400).json({ error: "All fields are required" }); 
  }

  try {
    const newUser = await RegisterNewUser(userID, nameFirst, nameLast, pwd)
    res.status(201).json({ message: `User ${userID} registered successfully` }); // res.json gets sent back to client
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/login", async (req, res) => {
  const { userID, pwd } = req.body;
  const user = await findUserID(userID)

  if (!user) {
    return res.json({ error: "User does not exist" });
  }
  
  bcrypt.compare(pwd, user.pwd).then((match) => {
    // check if inputted password matches pwd associated with username
    if (!match) {
      return res.json({ error: "The username or password is incorrect" });
    }
      
    const accessToken = sign({ userID: user.userID }, "8waH28nEHUwE") // create token with userID
    return res.json(accessToken);
  });

});


/**
 * Favourites
 */
app.get("/favourites/:userID", validateToken, async (req, res) => {
    const favouriteFranchises = await getFavouriteFranchises(req.params.userID)     // Favourite franchises
    const favouriteTeams = await getFavouriteTeams(req.params.userID)               // Favourite teams
    const favouritePlayers = await getFavouritePlayers(req.params.userID)           // Favourite players
    const favourites = {
        favouriteFranchises: favouriteFranchises,
        favouriteTeams: favouriteTeams,
        favouritePlayers: favouritePlayers
    }
    res.send(favourites)
})


app.post("/favourite" , async (req, res) => {  //validateToken
  const {type, id, userID} = req.body
  try {
    switch (type) {
      case 'player':
        await createFavouritePlayer(id, userID) // playerID, userID
        break;
      case 'team':
        await createFavouriteTeam(id.team, id.year, userID) // teamID, yearID, userID
        break;
      case 'franchise':
        await createFavouriteFranchise(id, userID) //franchiseID, userID
        break;
      default:
        //console.log("ERROR: type of favourite ", type, " is not valid!")
        throw("ERROR: type of favourite is not valid!")
    }
    res.status(201).json({ message: `Favourite ${type} registered successfully for ${userID}` });
  } catch (error) {
    res.status(500).json({ error: error + " failed to create favourite " + type + " for user " + userID})
    console.log(error)
  }
  
})

/**
 * All franchises
 */
app.get("/franchises", validateToken, async (req, res) => {
    const activeFranchises = await getFranchises('Y')           // Active franchises
    const nonActiveFranchises = await getFranchises('N')        // Nonactive franchises
    const franchises = {
        activeFranchises: activeFranchises,
        nonActiveFranchises: nonActiveFranchises
    };
    res.send(franchises)
})

/**
 * Franchise profile
 */
app.get("/franchises/:franchiseID", validateToken, async (req, res) => {
    const franchiseBio = await getFanchiseBio(req.params.franchiseID)           // Franchise bio
    const franchiseTotals = await getFranchiseTotals(req.params.franchiseID)    // Franchise all time total statistics
    const franchiseTeams = await getFranchiseTeams(req.params.franchiseID)      // Year by year statistics for the franchise
    const franchiseProfile = {
        franchiseBio: franchiseBio,
        franchiseTotals: franchiseTotals,
        franchiseTeams: franchiseTeams
    };
    res.send(franchiseProfile)
})

    

/**
 * Team profile
 */
app.get("/teams/:teamID/:yearID", validateToken, async (req, res) => {
    const teamBio = await getTeamBio(req.params.teamID, req.params.yearID)                              // Team bio
    const totalBattersForTeam = await getTotalBattersForTeam(req.params.teamID, req.params.yearID)      // Batting statistics totalled for all players on team
    const allBattersForTeam = await getAllBattersForTeam(req.params.teamID, req.params.yearID)          // Batting statistics for each individual player
    const totalPitchersForTeam = await getTotalPitchersForTeam(req.params.teamID, req.params.yearID)    // Pitching statistics totalled for all players on team
    const allPitchersForTeam = await getAllPitchersForTeam(req.params.teamID, req.params.yearID)        // Pitching statistics for each individual player
    const teamProfile = {
        teamBio: teamBio,
        totalBattersForTeam: totalBattersForTeam,
        allBattersForTeam: allBattersForTeam,
        totalPitchersForTeam: totalPitchersForTeam,
        allPitchersForTeam: allPitchersForTeam
    };
    res.send(teamProfile)
})





// Crash course on Javascript:
// In JS, you can have asynchronous code to execute "in the background" (JS is single-threaded so you won't
// have truly concurrent lines running. async indicates that code inside the function may not run one line after the other
// Declaring functions as asynchronous returns a Promise, which is an object representing the "status" of an
// async function (pending, fulfilled, rejected)
// IMPORTANT: By using "await", the program will wait until the Promise resolves or rejects, and
// return whatever result is generated by the line using "await"
// "await" is necessary if later lines of code use data from the current line

// Add more API's here...

//---------------------------------------//

// NOTE: Implement routing for Milestone 2...?

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

