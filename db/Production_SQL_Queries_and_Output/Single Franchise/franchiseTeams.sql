SELECT 
    yearID, name, teamID,
    G, W, L, W / G AS winPercentage,
    (Teams.attendance / (SELECT SUM(gamesWithFans) FROM HomeGames WHERE HomeGames.yearID = Teams.yearID AND HomeGames.teamID = Teams.teamID)) AS averageAttendance
FROM 
    Teams
WHERE 
    franchiseID = 'LAD'
ORDER BY 
    yearID ASC
LIMIT 15;