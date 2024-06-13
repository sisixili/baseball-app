
-- Run this to initialize the dev db

CREATE TABLE IF NOT EXISTS Users (
	userID INT AUTO_INCREMENT PRIMARY KEY,
    username varchar(255),
    pwd varchar(255)
);