SELECT 
    FieldingPost.yearID, 
    FieldingPost.teamID, 
    (
        SELECT name 
        FROM Teams 
        WHERE Teams.yearID = FieldingPost.yearID 
        AND Teams.teamID = FieldingPost.teamID
    ) AS teamName,
    SUM(outsRecorded) / 3 AS Inn,
    SUM(GS) AS GS, SUM(PO) AS PO, SUM(A) AS A, SUM(E) AS E, SUM(DP) AS DP
FROM 
    FieldingPost
WHERE 
    FieldingPost.playerID = 'greggha01'
GROUP BY 
    FieldingPost.yearID, 
    FieldingPost.teamID
ORDER BY 
    FieldingPost.yearID ASC;