# Set Up

Ensure Python3 version 3.11.4 is installed in the directory `baseball-app`

In `baseball-app/client` directory run the following commands:
`nvm ls`
`nvm install 20.14.0`
`nvm use 20.14.0`
`npm install`

In `baseball-app/server` directory run the following commands:
`nvm ls`
`nvm install 20.14.0`
`nvm use 20.14.0`
`npm install`
`npm i bcrypt@5.1.1 cors@2.8.5 dotenv@16.4.5 express@4.19.2 jsonwebtoken@9.0.2 knex@3.1.0 mysql2@3.10.1 nodemon@3.1.3`

1. Run `git clone https://github.com/sisixili/baseball-app.git` into your desired local directory
2. Follow the steps outlined in the setupdb README if you have not yet set up the database
3. Follow steps above
4. Create a .env file with your local MySQL db's login info and place it in `baseball-app/server` (DO NOT upload your .env file), for example:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=baseball-dev
```
5. Run `npx nodemon index.js` from `baseball-app/server`
6. Open another terminal and run `npm start` from `baseball-app/client`
7. Go to localhost:3000 to access the website.

