import mysql.connector
import pandas as pd
import numpy as np
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get database credentials from environment variables
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")

# Connect to MySQL server
conn = mysql.connector.connect(
    host=db_host,
    user=db_user,
    password=db_password,
    auth_plugin = "mysql_native_password"
)

cursor = conn.cursor()

print("Successfully established connection to MySQL server")

# Create database
cursor.execute("CREATE DATABASE IF NOT EXISTS `baseball-dev`;")
cursor.execute("USE `baseball-dev`;")

# Create table People
create_table_query = """
CREATE TABLE IF NOT EXISTS Players (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    playerID VARCHAR(255),
    birthYear INT,
    birthMonth INT,
    birthDay INT,
    birthCity VARCHAR(255),
    birthCountry VARCHAR(255),
    birthState VARCHAR(255),
    deathYear INT,
    deathMonth INT,
    deathDay INT,
    deathCountry VARCHAR(255),
    deathState VARCHAR(255),
    deathCity VARCHAR(255),
    nameFirst VARCHAR(255),
    nameLast VARCHAR(255),
    nameGiven VARCHAR(255),
    weight INT,
    height INT,
    bats VARCHAR(5),
    throws VARCHAR(5),
    debut DATE,
    bbrefID VARCHAR(255),
    finalGame DATE,
    retroID VARCHAR(255)
);
"""

cursor.execute(create_table_query)

# Read data from CSV file into dataframe
people_df = pd.read_csv("People.csv")

# Convert blanks to NULL
def nan_to_none(row):
    return tuple(None if pd.isna(x) else x for x in row)

# Convert DataFrame to list of tuples and apply convert blanks to NULL function
data_tuples = people_df.apply(lambda row: nan_to_none(tuple(row)), axis=1)

insert_query = """
    INSERT INTO Players (
        playerID, birthYear, birthMonth, birthDay, birthCity, birthCountry, birthState, deathYear, deathMonth, deathDay, deathCountry, deathState, deathCity, nameFirst, nameLast, nameGiven, weight, height, bats, throws, debut, bbrefID, finalGame, retroID
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

# Insert data into People table
for data in data_tuples:
    cursor.execute(insert_query, data)

conn.commit()

print("Successfully populated Players table")

# Close the connection
cursor.close()
conn.close()
