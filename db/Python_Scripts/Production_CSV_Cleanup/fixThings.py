import pandas as pd
import os

def update_team_id(csv_file_path):
    try:
        # Read the CSV file
        df = pd.read_csv(csv_file_path, encoding='ISO-8859-1')

        # Check if 'teamID' and 'yearID' columns exist
        if 'teamID' in df.columns and 'yearID' in df.columns:
            # Update 'ANA' to 'LAA' in 'teamID' column when 'yearID' is 2023
            df.loc[(df['teamID'] == 'ANA') & (df['yearID'] == 2023), 'teamID'] = 'LAA'
            # Save the updated DataFrame back to the CSV file
            df.to_csv(csv_file_path, index=False)
            print(f"Updated 'teamID' column in {csv_file_path} successfully.")
        else:
            print(f"'teamID' or 'yearID' column not found in {csv_file_path}.")
    except FileNotFoundError:
        print(f"The CSV file {csv_file_path} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

def update_was_inducted(csv_file_path):
    try:
        # Read the CSV file
        df = pd.read_csv(csv_file_path, encoding='ISO-8859-1')

        # Check if 'wasInducted' column exists
        if 'wasInducted' in df.columns:
            # Set 'wasInducted' to 'N' where it is NULL
            df['wasInducted'] = df['wasInducted'].fillna('N')
            # Save the updated DataFrame back to the CSV file
            df.to_csv(csv_file_path, index=False)
            print(f"Updated 'wasInducted' column in {csv_file_path} successfully.")
        else:
            print(f"'wasInducted' column not found in {csv_file_path}.")
    except FileNotFoundError:
        print(f"The CSV file {csv_file_path} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    appearances_csv_file_name = "Appearances.csv"
    halloffame_csv_file_name = "HallofFame.csv"
    csv_files_dir = "Production_CSV_Files"  # Update this path as needed
    
    appearances_csv_file_path = os.path.join(csv_files_dir, appearances_csv_file_name)
    halloffame_csv_file_path = os.path.join(csv_files_dir, halloffame_csv_file_name)
    
    update_team_id(appearances_csv_file_path)
    update_was_inducted(halloffame_csv_file_path)
