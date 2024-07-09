SELECT 
    Teams.name, Teams.franchiseID,
    (
        SELECT franchiseName 
        FROM Franchises 
        WHERE Teams.franchiseID = Franchises.franchiseID
    ) AS franchiseName,
    Teams.G, Teams.W, Teams.L, Teams.park,
    (Teams.attendance / (SELECT SUM(gamesWithFans) FROM HomeGames WHERE HomeGames.yearID = Teams.yearID AND HomeGames.teamID = Teams.teamID)) AS averageAttendance
FROM 
    Teams
WHERE 
    Teams.yearID = '2022' 
    AND Teams.teamID = 'TOR';