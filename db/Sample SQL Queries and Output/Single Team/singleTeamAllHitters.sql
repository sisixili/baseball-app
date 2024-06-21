SELECT 
    Players.nameFirst,
    Players.nameLast,
    Players.playerID,
    G,
    AB,
    R,
    H,
    2B,
    3B,
    HR,
    RBI,
    SB,
    CS,
    BB,
    SO,
    IBB,
    HBP,
    SH,
    SF,
    GIDP
FROM Batting
JOIN Players ON Batting.playerID = Players.playerID
WHERE Batting.teamID = 'TOR'
AND Batting.yearID = '2022'
ORDER BY G DESC;