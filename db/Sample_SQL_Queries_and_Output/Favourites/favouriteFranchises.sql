SELECT Franchises.franchiseName, Franchises.franchiseID
FROM FavouriteFranchises
JOIN Franchises ON FavouriteFranchises.franchiseID = Franchises.franchiseID
WHERE FavouriteFranchises.userID = 'Admin';