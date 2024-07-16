SELECT Teams.name, Teams.yearID, Teams.teamID
FROM FavouriteTeams
JOIN Teams
ON FavouriteTeams.yearID = Teams.yearID
AND FavouriteTeams.teamID = Teams.teamID
WHERE FavouriteTeams.userID = 'Admin';