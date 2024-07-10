SELECT 
    COUNT(DISTINCT yearID) AS seasonsPlayed,
    SUM(GS) AS GS, SUM(PO) AS PO, SUM(A) AS A, SUM(E) AS E, 
    SUM(DP) AS DP, SUM(outsRecorded) / 3 AS Inn
FROM 
    FieldingPost
WHERE 
    playerID = 'greggha01';