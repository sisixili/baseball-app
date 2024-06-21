-- Get the all time statistics for the specified franchiseID

SELECT 
    SUM(G) AS G,
    SUM(W) AS W,
    SUM(L) AS L,
    SUM(R) AS R,
    SUM(AB) AS AB,
    SUM(H) AS H,
    SUM(2B) AS 2B,
    SUM(3B) AS 3B,
    SUM(HR) AS HR,
    SUM(BB) AS BB,
    SUM(SO) AS SO,
    SUM(SB) AS SB,
    SUM(CS) AS CS,
    SUM(HBP) AS HBP,
    SUM(SF) AS SF,
    SUM(RA) AS RA,
    SUM(ER) AS ER,
    SUM(CG) AS CG,
    SUM(SHO) AS SHO,
    SUM(SV) AS SV,
    SUM(HA) AS HA,
    SUM(HRA) AS HRA,
    SUM(BBA) AS BBA,
    SUM(SOA) AS SOA,
    SUM(E) AS E,
    SUM(DP) AS DP,
    SUM(outsRecorded) / 3 AS IP
FROM Teams
WHERE franchiseID = 'LAD';

