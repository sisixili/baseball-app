SELECT 
    SUM(G) AS G,
    SUM(W) AS W,
    SUM(L) AS L,
    SUM(GS) AS GS,
    SUM(CG) AS CG,
    SUM(SHO) AS SHO,
    SUM(SV) AS SV,
    SUM(H) AS H,
    SUM(R) AS R,
    SUM(ER) AS ER,
    SUM(HR) AS HR,
    SUM(BB) AS BB,
    SUM(IBB) AS IBB,
    SUM(SO) AS SO,
    SUM(HBP) AS HBP,
    SUM(BK) AS BK,
    SUM(WP) AS WP,
    SUM(outsRecorded) / 3 AS IP
FROM Pitching
WHERE teamID = 'TOR'
AND yearID = '2022';