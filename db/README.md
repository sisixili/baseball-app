# Initializing database with Python and MySQL

1. Create a .env file with your local MySQL db's login info and place it in `baseball-app/setupdb`, for example:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
```
2. Download lahman_1871-2023_csv folder from `https://www.dropbox.com/scl/fi/hy0sxw6gaai7ghemrshi8/lahman_1871-2023_csv.7z?e=5&file_subpath=%2Flahman_1871-2023_csv&rlkey=edw1u63zzxg48gvpcmr3qpnhz&dl=0`
3. Unzip the downloaded zip file, `cd lahman_1871-2023_csv`, and move the folder `lahman_1871-2023_csv` containing ONLY THE CSV FILES (not the README) into `baseball-app/setupdb`
4. Run `make` to tailor the downloaded production dataset to our database, generate the sample data using the production data, and populate the database with the generated sample data. Note that you may have to install various Python libraries that you do not already have installed, we plan on automating this process at some point but it is not a priority at the moment.

Notes:
- Because our tables contain an enormous amount of statisitical data, instead creating the sample data ourselves (which would be extremely tedious) we handpick data frmo the production dataset to use as our sample dataset. We supplement this with sample User Account informatino that we created ourselves based on the sample data that we generate.
- If you have issues running the makefile, possibly because you aren't able to create an alias for Python3, we've included a text file (dbsetup.txt) that explicitly outlines each command that needs to be run. You can then alter `python3` to `python`
