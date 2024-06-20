# Set Up

Follow the steps below to setup and run the app. 
There may be some redundancies which we will factor out at a later date, but we're trying to just play it safe for now. 

1. Run `git clone https://github.com/sisixili/baseball-app.git` into your desired local directory
2. Ensure Python3 version 3.11.4 is installed. If you have straight Python installed, you will want to create an alias for Python3.
3. Ensure MySQL is installed on your machine, and you have setup your localhost server, root user (and associated password)
4. In `baseball-app/client` directory run the following commands: `nvm ls`, `nvm install 20.14.0`, `nvm use 20.14.0`, `npm install`
5. In `baseball-app/server` directory run the following commands: `nvm ls`, `nvm install 20.14.0`, `nvm use 20.14.0`, `npm install`, `npm i bcrypt@5.1.1 cors@2.8.5 dotenv@16.4.5 express@4.19.2 jsonwebtoken@9.0.2 knex@3.1.0 mysql2@3.10.1 nodemon@3.1.3` 
6. Follow the steps in `db/README.md` to setup the database
7. Create a .env file with your localhost MySQL db's login info and place it in `baseball-app/server`, for example:
```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=baseball-dev
```
To run the website:
1. Run `npx nodemon index.js` from `baseball-app/server`
2. Open another terminal and run `npm start` from `baseball-app/client`
3. Go to localhost:3000 to access the website.
