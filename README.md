# Set Up

Ensure Python3 version 3.11.4 is installed in the directory `baseball-app`

In `baseball-app/client` directory: 
run `npx create-react-app@18.3.1` to initialize a react app in the current directory.
run `npm i react-router-dom@6.23.1`

In `baseball-app/server` directory: 
run `npm i bcrypt@5.1.1 cors@2.8.5 dotenv@16.4.5 express@4.19.2 jsonwebtoken@9.0.2 knex@3.1.0 mysql2@3.10.1 nodemon@3.1.3`

1. Run `git clone https://github.com/sisixili/baseball-app.git` into your desired local directory
2. Follow the steps outlined in the setupdb README if you have not yet set up the database
3. Install the latest stable version of [Node](https://nodejs.org/en/download/package-manager/). This project uses Express (backend web app framework for RESTful APIs in Node) and React (front end JS library for UI).
4. 3. Create a .env file with your local MySQL db's login info and place it in `baseball-app/server` (DO NOT upload your .env file), for example:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=baseball-dev
```
5. Run `npm start` from `baseball-app/server`
6. If you run into issues running nodemon, you may have to run the following to update it's permissions: `chmod +x baseball-app/server/node_modules/.bin/nodemon`
7. Open another terminal and run `npm start` from `baseball-app/client`
8. If you run into issues running react-scripts, you may have to run the following to update it's permissions: `chmod +x baseball-app/client/node_modules/.bin/react-scripts`
9. Go to localhost:3000 to access the website.

