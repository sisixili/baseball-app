-- Get the statistics for each team that was a member of the specified franchise, sort by year ascending

SELECT 
    name,
    teamID,
    yearID,
    G,
    W,
    L,
    R,
    AB,
    H,
    2B,
    3B,
    HR,
    BB,
    SO,
    SB,
    CS,
    HBP,
    SF,
    RA,
    ER,
    CG,
    SHO,
    SV,
    HA,
    HRA,
    BBA,
    SOA,
    E,
    DP,
    FP,
    outsRecorded / 3 AS IP
FROM Teams
WHERE franchiseID = 'LAD'
ORDER BY yearID ASC;

