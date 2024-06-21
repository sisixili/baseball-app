-- Top Win pitchers in 1945, in asc order

SELECT Pitching.playerID, Pitching.W, Players.nameFirst, Players.nameLast
        FROM Pitching
        JOIN Players ON Pitching.playerID = Players.playerID
        WHERE Pitching.yearID = 1945
        ORDER BY Pitching.W asc;