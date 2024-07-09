SELECT 
    Players.nameFirst, Players.nameLast, Batting.playerID,
    Batting.G, Batting.AB, Batting.R, Batting.H, Batting.`2B`, Batting.`3B`, Batting.HR,
    Batting.RBI, Batting.SB, Batting.CS, Batting.BB, Batting.SO, Batting.IBB, Batting.HBP,
    Batting.SH, Batting.SF, Batting.GIDP,
    COALESCE(Batting.AB, 0) + COALESCE(Batting.BB, 0) + COALESCE(Batting.HBP, 0) + COALESCE(Batting.SH, 0) + COALESCE(Batting.SF, 0) AS PA
FROM 
    Batting
JOIN 
    Players ON Batting.playerID = Players.playerID
WHERE 
    Batting.yearID = '2022'
    AND Batting.teamID = 'TOR'
ORDER BY 
    Players.nameLast ASC;