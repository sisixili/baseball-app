SELECT 
    Teams.teamID,
    Teams.name,
    Teams.yearID,
    Franchises.franchiseID,
    Franchises.franchiseName,
    Teams.G,
    Teams.W,
    Teams.L
FROM 
    Teams
JOIN 
    Franchises ON Franchises.franchiseID = Teams.franchiseID
WHERE 
    Teams.yearID = '2022'
ORDER BY 
    Teams.W DESC;