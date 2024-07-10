SELECT 
    Players.nameFirst, Players.nameLast, Pitching.playerID,
    Pitching.G, Pitching.W, Pitching.L,
    Pitching.GS, Pitching.CG, Pitching.SHO, Pitching.SV,
    Pitching.H, Pitching.R, Pitching.ER, Pitching.HR,
    Pitching.BB, Pitching.IBB, Pitching.SO,
    Pitching.HBP,Pitching.BK, Pitching.WP,
    Pitching.outsRecorded / 3 AS IP
FROM 
    Pitching
JOIN 
    Players ON Pitching.playerID = Players.playerID
WHERE 
    Pitching.yearID = '2022'
    AND Pitching.teamID = 'TOR'
ORDER BY 
    Players.nameLast ASC;