-- Retrieve player bio info for the entered playerID

SELECT nameFirst, nameLast, weight, height, bats, throws, birthCountry
    FROM Players
    WHERE playerID = 'greggha01';