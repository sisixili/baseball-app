SELECT DISTINCT position
FROM Fielding
WHERE playerID = 'greggha01'
ORDER BY CASE
    WHEN position = 'P' THEN 1
    WHEN position = 'C' THEN 2
    WHEN position = '1B' THEN 3
    WHEN position = '2B' THEN 4
    WHEN position = '3B' THEN 5
    WHEN position = 'SS' THEN 6
    WHEN position = 'OF' THEN 7
END;