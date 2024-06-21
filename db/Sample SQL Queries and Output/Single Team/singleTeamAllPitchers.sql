SELECT 
    Players.nameFirst,
    Players.nameLast,
    Players.playerID,
    G,
    W,
    L,
    GS,
    CG,
    SHO,
    SV,
    H,
    R,
    ER,
    HR,
    BB,
    IBB,
    SO,
    HBP,
    BK,
    WP
FROM Pitching
JOIN Players ON Pitching.playerID = Players.playerID
WHERE Pitching.teamID = 'TOR'
AND Pitching.yearID = '2022'
ORDER BY G DESC;