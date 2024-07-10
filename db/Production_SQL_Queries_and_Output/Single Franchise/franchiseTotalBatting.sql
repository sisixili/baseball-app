SELECT 
    SUM(Batting.AB) AS total_AB, SUM(Batting.R) AS total_R,
    SUM(Batting.H) AS total_H, SUM(Batting.`2B`) AS total_2B, SUM(Batting.`3B`) AS total_3B, SUM(Batting.HR) AS total_HR, SUM(Batting.RBI) AS total_RBI,
    SUM(Batting.SB) AS total_SB, SUM(Batting.CS) AS total_CS, SUM(Batting.BB) AS total_BB, SUM(Batting.SO) AS total_SO, SUM(Batting.IBB) AS total_IBB,
    SUM(Batting.HBP) AS total_HBP, SUM(Batting.SH) AS total_SH, SUM(Batting.SF) AS total_SF, SUM(Batting.GIDP) AS total_GIDP
FROM 
    Franchises
JOIN 
    Teams ON Franchises.franchiseID = Teams.franchiseID
JOIN 
    Batting ON Teams.yearID = Batting.yearID AND Teams.teamID = Batting.teamID
WHERE 
    Franchises.franchiseID = 'LAD';