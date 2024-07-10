SELECT 
    Fielding.playerID,
    Players.nameFirst,
    Players.nameLast,
    SUM(Fielding.outsRecorded) / 3 AS Inn,
    SUM(Fielding.GS) AS GS,
    SUM(Fielding.PO) AS PO,
    SUM(Fielding.A) AS A,
    SUM(Fielding.E) AS E,
    SUM(Fielding.DP) AS DP
FROM 
    Fielding
JOIN 
    Players ON Fielding.playerID = Players.playerID
WHERE 
    Fielding.yearID = '2022'
GROUP BY 
    Fielding.playerID, Players.nameFirst, Players.nameLast
ORDER BY 
    SUM(Fielding.E) desc
LIMIT 25;