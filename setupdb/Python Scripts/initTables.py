import mysql.connector
import pandas as pd
import numpy as np
from dotenv import load_dotenv
import os
import sys

def main(csv_files_dir):
    # Load environment variables from .env file
    load_dotenv()

    # Get database credentials from environment variables
    db_host = os.getenv("DB_HOST")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")

    # Define directory for SQL scripts
    create_tables_dir = 'SQL Scripts'  # Update this path if needed

    # Connect to MySQL server
    conn = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        auth_plugin="mysql_native_password"
    )

    cursor = conn.cursor()

    print("Successfully established connection to MySQL server")

    # Create database
    cursor.execute("CREATE DATABASE IF NOT EXISTS `baseball-dev`;")
    cursor.execute("USE `baseball-dev`;")

    # CURRENTLY DELETING TABLES AND RE-ENTERING DATA WHENEVER THIS SCRIPT IS RUN
    ##############################################

    # Read and execute the dropTables.sql file
    drop_tables_path = os.path.join(create_tables_dir, 'dropTables.sql')
    with open(drop_tables_path, 'r') as file:
        drop_tables_sql = file.read()
        for result in cursor.execute(drop_tables_sql, multi=True):
            pass  # This ensures all parts of the multi-statement SQL are executed

    print("Successfully dropped all tables if they exist")

    ##############################################

    # Read and execute the createTables.sql file
    create_tables_path = os.path.join(create_tables_dir, 'createTables.sql')
    with open(create_tables_path, 'r') as file:
        create_tables_sql = file.read()
        for result in cursor.execute(create_tables_sql, multi=True):
            pass  # This ensures all parts of the multi-statement SQL are executed

    # Function to load CSV data into corresponding tables
    def load_data_into_table(table_name, csv_file):
        df = pd.read_csv(csv_file, encoding='ISO-8859-1')

        # Convert blanks to NULL
        def nan_to_none(row):
            return tuple(None if pd.isna(x) else x for x in row)

        # Convert DataFrame to list of tuples and apply convert blanks to NULL function
        data_tuples = df.apply(lambda row: nan_to_none(tuple(row)), axis=1)

        # Construct the INSERT query based on table columns
        columns = ', '.join([f"`{col}`" for col in df.columns])
        placeholders = ', '.join(['%s'] * len(df.columns))
        insert_query = f"INSERT INTO `{table_name}` ({columns}) VALUES ({placeholders})"

        # Insert data into the table
        for data in data_tuples:
            cursor.execute(insert_query, data)

        conn.commit()
        print(f"Successfully populated {table_name} table")

    # Dictionary mapping table names to their corresponding CSV files
    tables_and_files = {
        "Players": "People.csv",
        "Franchises": "TeamsFranchises.csv",
        "Teams": "Teams.csv",
        "Parks": "Parks.csv",
        "AllstarFull": "AllstarFull.csv",
        "Appearances": "Appearances.csv",
        "AwardsPlayers": "AwardsPlayers.csv",
        "Batting": "Batting.csv",
        "Fielding": "Fielding.csv",
        "FieldingOFSplit": "FieldingOFsplit.csv",
        "HallOfFame": "HallOfFame.csv",
        "HomeGames": "HomeGames.csv",
        "Pitching": "Pitching.csv",
        "Users": "Users.csv",
        "FavouriteFranchises": "FavouriteFranchises.csv",
        "FavouriteTeams": "FavouriteTeams.csv",
        "FavouritePlayers": "FavouritePlayers.csv"
    }

    # Load data for all tables
    for table, csv_file in tables_and_files.items():
        csv_path = os.path.join(csv_files_dir, csv_file)
        load_data_into_table(table, csv_path)

    # Close the connection
    cursor.close()
    conn.close()

    print("All tables have been successfully populated")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <csv_files_directory>")
        sys.exit(1)

    csv_files_dir = sys.argv[1]
    main(csv_files_dir)
