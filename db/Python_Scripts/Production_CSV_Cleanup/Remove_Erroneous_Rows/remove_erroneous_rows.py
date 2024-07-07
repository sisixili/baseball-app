import os
import pandas as pd
import argparse

def main():
    # Set up argparse to handle command line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('config_file', type=str, help='The name of the file containing the table configurations and rows to delete.')
    parser.add_argument('directory', type=str, help='The directory path where the CSV files are located.')
    args = parser.parse_args()

    # Read the config file to get the table configurations and rows to delete
    try:
        with open(args.config_file, 'r') as file:
            lines = file.readlines()
    except FileNotFoundError:
        print("The config file was not found in the specified directory.")
        exit()

    current_table = None
    columns = []
    rows = []
    for line in lines:
        line = line.strip()
        if not line:
            continue

        if ':' in line:
            if current_table and columns and rows:
                process_table(args.directory, current_table, columns, rows)
            parts = line.split(':')
            if len(parts) == 2:
                current_table = parts[0]
                columns = parts[1].split(',')
                rows = []
        else:
            rows.append(line.split(','))

    if current_table and columns and rows:
        process_table(args.directory, current_table, columns, rows)

def process_table(directory, table_name, columns, rows):
    csv_file_path = os.path.join(directory, table_name)
    
    try:
        df = pd.read_csv(csv_file_path, encoding='ISO-8859-1')
    except FileNotFoundError:
        print(f"The CSV file {table_name} was not found in the specified directory.")
        return

    rows_df = pd.DataFrame(rows, columns=columns)

    for col in columns:
        if col in df.columns:
            df[col] = df[col].astype(str)
        if col in rows_df.columns:
            rows_df[col] = rows_df[col].astype(str)

    # Perform left join and filter out rows to be deleted
    merged_df = df.merge(rows_df, on=columns, how='left', indicator=True)
    df_filtered = merged_df[merged_df['_merge'] == 'left_only'].drop(columns=['_merge'])
    
    # Save the modified DataFrame back to the CSV file
    df_filtered.to_csv(csv_file_path, index=False)
    print(f"The modified file has been saved as {csv_file_path}")

if __name__ == "__main__":
    main()
