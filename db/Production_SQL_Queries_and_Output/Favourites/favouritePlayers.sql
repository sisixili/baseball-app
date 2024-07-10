SELECT Players.nameFirst, Players.nameLast, Players.playerID
FROM FavouritePlayers
JOIN Players ON FavouritePlayers.playerID = Players.playerID
WHERE FavouritePlayers.userID = 'Admin';