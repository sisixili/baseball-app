SELECT yearID
FROM HallOfFame
WHERE playerID = 'greggha01'
AND wasInducted = 'Y'
ORDER BY yearID ASC
LIMIT 1;