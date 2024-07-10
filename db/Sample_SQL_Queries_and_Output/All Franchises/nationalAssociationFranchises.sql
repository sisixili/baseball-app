SELECT 
    Franchises.franchiseID,
    Franchises.franchiseName,
    SUM(Teams.G) AS totalGames,
    SUM(Teams.W) AS totalWins,
    SUM(Teams.L) AS totalLosses,
    SUM(Teams.W) / SUM(Teams.G) AS winPercentage,
    COUNT(SeriesPost.winningTeamID) AS worldSeriesWins
FROM 
    Franchises
JOIN 
    Teams ON Franchises.franchiseID = Teams.franchiseID
LEFT JOIN 
    SeriesPost ON Teams.yearID = SeriesPost.yearID
    AND SeriesPost.round = 'WS'
    AND Teams.teamID = SeriesPost.winningTeamID
WHERE 
    Franchises.isActive IS NULL
GROUP BY 
    Franchises.franchiseID, Franchises.franchiseName
ORDER BY 
    Franchises.franchiseName ASC;