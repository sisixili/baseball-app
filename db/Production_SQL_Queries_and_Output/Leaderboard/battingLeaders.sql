SELECT 
    Batting.playerID, Players.nameFirst, Players.nameLast,
    SUM(COALESCE(Batting.AB, 0)) + SUM(COALESCE(Batting.BB, 0)) + SUM(COALESCE(Batting.HBP, 0)) + SUM(COALESCE(Batting.SH, 0)) + SUM(COALESCE(Batting.SF, 0)) AS PA,
    SUM(Batting.G) AS G, SUM(Batting.AB) AS AB, SUM(Batting.R) AS R, SUM(Batting.H) AS H, SUM(Batting.`2B`) AS `2B`, SUM(Batting.`3B`) AS `3B`, SUM(Batting.HR) AS HR, SUM(Batting.RBI) AS RBI,
    SUM(Batting.SB) AS SB, SUM(Batting.CS) AS CS, SUM(Batting.BB) AS BB, SUM(Batting.SO) AS SO, SUM(Batting.IBB) AS IBB, SUM(Batting.HBP) AS HBP, SUM(Batting.SH) AS SH, SUM(Batting.SF) AS SF,
    SUM(Batting.GIDP) AS GIDP
FROM 
    Batting
JOIN 
    Players ON Batting.playerID = Players.playerID
WHERE 
    Batting.yearID = '2022'
GROUP BY 
    Batting.playerID, Players.nameFirst, Players.nameLast
ORDER BY 
    SUM(Batting.HR) desc
LIMIT 25;