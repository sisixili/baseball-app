-- Get the career hitting totals for the entered playerID

SELECT 
    SUM(G) AS G,
    SUM(AB) AS AB,
    SUM(R) AS R,
    SUM(H) AS H,
    SUM(2B) AS '2B',
    SUM(3B) AS '3B',
    SUM(HR) AS HR,
    SUM(RBI) AS RBI,
    SUM(SB) AS SB,
    SUM(CS) AS CS,
    SUM(BB) AS BB,
    SUM(SO) AS SO,
    SUM(IBB) AS IBB,
    SUM(HBP) AS HBP,
    SUM(SH) AS SH,
    SUM(SF) AS SF,
    SUM(GIDP) AS GIDP,
    (SUM(COALESCE(AB, 0)) + SUM(COALESCE(BB, 0)) + 
    SUM(COALESCE(HBP, 0)) + SUM(COALESCE(SH, 0)) + 
    SUM(COALESCE(SF, 0))) AS PA
FROM Batting
WHERE playerID = 'greggha01';