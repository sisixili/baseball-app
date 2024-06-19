# Initializing database with Python and MySQL

Note: May need to tailor `python3` vs `python` and `pip3` vs `pip`  

Ensure Python3 version 3.11.4 in the directory `baseball-app`

1. Make sure Python and MySQL are installed locally
2. Run `pip3 install mysql-connector-python python-dotenv pandas` from `baseball-app`
3. Create a .env file with your local MySQL db's login info and place it in `baseball-app/setupdb` (DO NOT upload your .env file), for example:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
```
4. Download lahman_1871-2023_csv folder from `https://www.dropbox.com/scl/fi/hy0sxw6gaai7ghemrshi8/lahman_1871-2023_csv.7z?e=5&file_subpath=%2Flahman_1871-2023_csv&rlkey=edw1u63zzxg48gvpcmr3qpnhz&dl=0`
5. Move this folder (`lahman_1871-2023_csv`) to `baseball-app/setupdb`
6. Run `make`

Sisi Password Query Stuff:

"CREATE TABLE IF NOT EXISTS Users (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    nameFirst varchar(255) NOT NULL,
    nameLast varchar(255) NOT NULL,
    pwd varchar(255) NOT NULL
);
ALTER TABLE users AUTO_INCREMENT=1001;
INSERT INTO users(nameFirst, nameLast, pwd)
VALUES
	("user1", "test", "69420@urmom");"

NOTE: pwd will be encrypted, so in the db it will show up as a long string that is NOT the actual password (it’s the hashed pwd). 

In client directory: 
run `create-react-app` to initializa a react app in the current directory.
run npm i on the package:
	"react-router-dom": "^6.23.1"

In server directory: run npm i on the following packages
	"bcrypt": "^5.1.1",
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "jsonwebtoken": "^9.0.2",
        "knex": "^3.1.0",
        "mysql2": "^3.10.1",
        "nodemon": "^3.1.3"
