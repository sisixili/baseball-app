SELECT awardID, note, leagueID, yearID
FROM (
    (
    SELECT 
        'All Star' AS awardID,
        NULL AS note,
        leagueID,
        yearID
    FROM AllstarFull
    WHERE playerID = 'greggha01'
    GROUP BY awardID, note, leagueID, yearID
    )

    UNION ALL

    (
    SELECT 
        awardID,
        note,
        leagueID,
        yearID
    FROM AwardsPlayers
    WHERE playerID = 'greggha01'
    )
) AS Awards
ORDER BY yearID ASC, awardID DESC;