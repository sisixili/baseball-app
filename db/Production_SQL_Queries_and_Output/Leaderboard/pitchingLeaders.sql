SELECT 
    Pitching.playerID, Players.nameFirst, Players.nameLast,
    SUM(Pitching.outsRecorded) / 3 AS IP, SUM(Pitching.W) AS W, SUM(Pitching.L) AS L, 
    SUM(Pitching.GS) AS GS, SUM(Pitching.CG) AS CG, SUM(Pitching.SHO) AS SHO, SUM(Pitching.SV) AS SV,
    SUM(Pitching.H) AS H, SUM(Pitching.R) AS R, SUM(Pitching.ER) AS ER, SUM(Pitching.HR) AS HR,
    SUM(Pitching.BB) AS BB, SUM(Pitching.IBB) AS IBB, SUM(Pitching.SO) AS SO, SUM(Pitching.HBP) AS HBP,
    SUM(Pitching.BK) AS BK, SUM(Pitching.WP) AS WP
FROM 
    Pitching
JOIN 
    Players ON Pitching.playerID = Players.playerID
WHERE 
    Pitching.yearID = '1945'
GROUP BY 
    Pitching.playerID, Players.nameFirst, Players.nameLast
ORDER BY 
    SUM(Pitching.W) desc
LIMIT 25;