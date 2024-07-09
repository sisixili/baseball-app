SELECT 
    SUM(Pitching.W) AS total_W, SUM(Pitching.L) AS total_L,
    SUM(Pitching.GS) AS total_GS, SUM(Pitching.CG) AS total_CG, SUM(Pitching.SHO) AS total_SHO,SUM(Pitching.SV) AS total_SV,
    SUM(Pitching.H) AS total_H, SUM(Pitching.R) AS total_R, SUM(Pitching.ER) AS total_ER, SUM(Pitching.HR) AS total_HR,
    SUM(Pitching.BB) AS total_BB, SUM(Pitching.IBB) AS total_IBB, SUM(Pitching.SO) AS total_SO, SUM(Pitching.HBP) AS total_HBP,
    SUM(Pitching.BK) AS total_BK, SUM(Pitching.WP) AS total_WP
FROM 
    Franchises
JOIN 
    Teams ON Franchises.franchiseID = Teams.franchiseID
JOIN 
    Pitching ON Teams.yearID = Pitching.yearID AND Teams.teamID = Pitching.teamID
WHERE 
    Franchises.franchiseID = 'LAD';