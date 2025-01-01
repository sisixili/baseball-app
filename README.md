# DataBaseball

A project created to track and analyze MLB baseball statistics, with inspiration taken from [BaseballReference](https://www.baseball-reference.com/).

## Demo Videos

[Feature Demo](https://drive.google.com/file/d/16P-L0qlSNGKabFKaUxFZ9OpLhzYxTgnM/view?usp=sharing)

[Setup Demo](https://drive.google.com/file/d/1X_w3iSUIZSOpsjB1Q-FAhmlAau5o5cmL/view?usp=sharing)

## Implemented Features

1. Register Account: Create account, log in, log out (users are required to register and log in to use all other features).
2. Player Search: Search for specific players by name. Players matching search displayed via pagination.
3. Leaderboard: See leaders in different batting, pitching, and fielding statistics for a selected year, with the ability to sort in both ascending and descending order.
4. Player Profile: Player bio, along with both career total and year-by-year statistics for batting, pitching, and fielding.
5. Franchise Search: Search for a specific franchise by name.
6. Franchise Profile: Franchise bio, all time franchise statistics, and statistics for each year in existence. Can redirect to Team Profile page to see in depth statistics and rosters for a specific year.
7. Team Profile: Team bio, along with both team total and player-by-player statistics for batting and pitching. Can redirect to the Player Profile for any player that played for the team currently being viewed.
8. Favourites: Add favourite franchises, teams, and players to your account. These are displayed on the favourites page with links to their respecive profile pages.
9. Standings: Regular season standings for any selected year.

## Set Up

Follow the steps below to setup and run the app. 

1. Run `git clone https://github.com/sisixili/baseball-app.git` into your desired local directory
2. Ensure Python version 3.11.4 is installed.
3. Ensure MySQL is installed on your machine, and you have setup your localhost server, root user (and associated password)
4. In `baseball-app/client` directory run the following commands: `nvm ls`, `nvm install 20.14.0`, `nvm use 20.14.0`, `npm install`, `npm i d3`, `npm i resize-observer-polyfill`
5. In `baseball-app/server` directory run the following commands: `nvm ls`, `nvm install 20.14.0`, `nvm use 20.14.0`, `npm install`, `npm i bcrypt@5.1.1 cors@2.8.5 dotenv@16.4.5 express@4.19.2 jsonwebtoken@9.0.2 knex@3.1.0 mysql2@3.10.1 nodemon@3.1.3`, `npm install jsdom`, `npm install axios`, `npm i cookie-parser`
6. Follow the steps in [db/README.md](https://github.com/sisixili/baseball-app/blob/master/db/README.md) to setup the database
7. Create a `.env` file with your localhost MySQL db's login info and place it in the `baseball-app/server` directory, for example:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=baseball-dev
ACCESS_TOKEN_SECRET=personal_randomized_access_token
```
To run the website:
1. Run `npx nodemon index.js` from `baseball-app/server`
2. Open another terminal and run `npm start` from `baseball-app/client`
3. Go to `localhost:3000` to access the website.
