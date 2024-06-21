-- Get the season by season hitting statistics for the entered playerID, sort by year ascending


SELECT yearID, teamID, G, AB, R, H, 2B, 3B, HR, RBI, SB, CS, BB, SO, IBB, HBP, SH, SF, GIDP,
       COALESCE(AB, 0) + COALESCE(BB, 0) + COALESCE(HBP, 0) + COALESCE(SH, 0) + COALESCE(SF, 0) AS PA
FROM Batting
WHERE playerID = 'greggha01'
ORDER BY yearID ASC;