-- Top HR hitters in 2022, in desc order

SELECT Batting.playerID, Batting.HR, Players.nameFirst, Players.nameLast
        FROM Batting
        JOIN Players ON Batting.playerID = Players.playerID
        WHERE Batting.yearID = 2022
        ORDER BY Batting.HR desc;


        