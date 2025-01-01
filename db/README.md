# Initializing Database with Python and MySQL

Install the following python modules: `mysql-connector-python`, `pandas`, `numpy`, `python-dotenv`, `argparse`

1. Create a `.env` file with your local MySQL db's login info and place it in the `baseball-app/setupdb` directory, for example:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
```
2. Download `lahman_1871-2023_csv` folder from `https://www.dropbox.com/scl/fi/hy0sxw6gaai7ghemrshi8/lahman_1871-2023_csv.7z?e=5&file_subpath=%2Flahman_1871-2023_csv&rlkey=edw1u63zzxg48gvpcmr3qpnhz&dl=0`
3. Unzip the downloaded zip file
4. Move `lahman_1871-2023_csv/lahman_1871-2023_csv` into `baseball-app/setupdb`
5. Run `make configure_imported_production_csv_files` to configure the downloaded data
6. Run `make create_and_populate_tables_with_sample_data` or `make create_and_populate_tables_with_production_data` to create the database tables and populate them with either the sample or production data
