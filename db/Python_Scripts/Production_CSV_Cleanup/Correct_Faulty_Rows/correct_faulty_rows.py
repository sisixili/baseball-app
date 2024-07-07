import os
import pandas as pd
import argparse

def main():
    # Set up argparse to handle command line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('config_file', type=str, help='The name of the file containing the table configurations and rows to update.')
    parser.add_argument('directory', type=str, help='The directory path where the CSV files are located.')
    args = parser.parse_args()

    # Read the config file to get the table configurations and rows to update
    try:
        with open(args.config_file, 'r') as file:
            lines = file.readlines()
    except FileNotFoundError:
        print("The config file was not found in the specified directory.")
        exit()

    current_table = None
    columns = []
    updates = []
    for line in lines:
        line = line.strip()
        if not line:
            continue

        if ':' in line:
            if current_table and columns and updates:
                process_table(args.directory, current_table, columns, updates)
            parts = line.split(':')
            if len(parts) == 2:
                current_table = parts[0]
                columns = parts[1].split(',')
                updates = []
        else:
            old_new = line.split(';')
            if len(old_new) == 2:
                old_values = old_new[0].split(',')
                new_values = old_new[1].split(',')
                updates.append((old_values, new_values))

    if current_table and columns and updates:
        process_table(args.directory, current_table, columns, updates)

def process_table(directory, table_name, columns, updates):
    csv_file_path = os.path.join(directory, table_name)
    
    try:
        df = pd.read_csv(csv_file_path, encoding='ISO-8859-1')
    except FileNotFoundError:
        print(f"The CSV file {table_name} was not found in the specified directory.")
        return

    for col in columns:
        if col in df.columns:
            df[col] = df[col].astype(str)

    # Update rows in the DataFrame with the new values
    for old_values, new_values in updates:
        matching_rows = df.loc[(df[columns] == old_values).all(axis=1)]
        if not matching_rows.empty:
            for col, new_value in zip(columns, new_values):
                df.loc[matching_rows.index, col] = new_value

    # Save the modified DataFrame back to the CSV file
    df.to_csv(csv_file_path, index=False)
    print(f"The modified file has been saved as {csv_file_path}")

if __name__ == "__main__":
    main()
