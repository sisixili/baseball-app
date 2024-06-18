# Initializing database with Python and MySQL

Note: May need to tailor `python3` vs `python` and `pip3` vs `pip`  

1. Make sure Python and MySQL are installed locally
2. Run `pip3 install mysql-connector-python python-dotenv pandas` from `baseball-app`
3. Create a .env file with your local MySQL db's login info and place it in `baseball-app/setupdb` (DO NOT upload your .env file), for example:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
```
4. Download lahman_1871-2023_csv folder from `https://www.dropbox.com/scl/fi/hy0sxw6gaai7ghemrshi8/lahman_1871-2023_csv.7z?rlkey=edw1u63zzxg48gvpcmr3qpnhz&e=1&dl=0`
5. Move this folder (`lahman_1871-2023_csv`) to `baseball-app/setupdb`
6. Rename `lahman_1871-2023_csv` to `Production CSV Files`
7. Run `python3 "Python Scripts"/"CSV Cleanup"/remove_unnecessary_csv_files.py "Python Scripts"/"CSV Cleanup"/textFiles/unnecessary_csv_files.txt "Production CSV Files"` from `baseball-app/setupdb`
8. Run `python3 "Python Scripts"/"CSV Cleanup"/remove_unnecessary_columns.py "Python Scripts"/"CSV Cleanup"/textFiles/unnecessary_columns.txt "Production CSV Files"` from `baseball-app/setupdb`
9. Run `python3 "Python Scripts"/"CSV Cleanup"/remove_duplicate_rows.py "Production CSV Files"` from `baseball-app/setupdb`
10. Run `python3 "Python Scripts"/"CSV Cleanup"/remove_erroneous_rows.py "Python Scripts"/"CSV Cleanup"/textFiles/erroneous_rows.txt "Production CSV Files"` from `baseball-app/setupdb`
11. Run `python3 "Python Scripts"/"CSV Cleanup"/rename_columns.py "Python Scripts"/"CSV Cleanup"/textFiles/column_renames.txt "Production CSV Files"` from `baseball-app/setupdb`
12. Run `python3 "Python Scripts"/create_sample_csv_files.py "Production CSV Files" "Sample CSV Files"` from `baseball-app/setupdb`
13. Run `python3 "Python Scripts"/initTables.py` from `baseball-app/setupdb`



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