-- Get the season by season pitching statistics for the entered playerID, sort by year ascending

SELECT yearID, teamID, G, W, L, GS, CG, SHO, SV, H, R, ER, HR, BB, IBB, SO, HBP, BK, WP,
       outsRecorded / 3 AS IP
FROM Pitching
WHERE playerID = 'greggha01'
ORDER BY yearID ASC;