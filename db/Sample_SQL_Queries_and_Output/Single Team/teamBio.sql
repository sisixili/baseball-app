-- Get the bio information for the specified team and the specified year

SELECT 
    Teams.name,
    Teams.franchiseID,
    Teams.G,
    Teams.W,
    Teams.L,
    Teams.park,
    Teams.attendance / HomeGames.gamesWithFans AS averageAttendance
FROM Teams
JOIN HomeGames 
    ON Teams.teamID = HomeGames.teamID
    AND Teams.yearID = HomeGames.yearID
WHERE Teams.teamID = 'TOR'
AND Teams.yearID = '2022';