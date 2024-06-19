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
6. Run `make`

