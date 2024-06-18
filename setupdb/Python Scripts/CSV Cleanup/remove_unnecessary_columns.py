import pandas as pd
import os
import argparse

def remove_columns_from_csv(input_file, columns_to_remove):
    try:
        # Read the CSV file into a DataFrame
        df = pd.read_csv(input_file, encoding='ISO-8859-1')
        
        # Find columns that are not in the DataFrame
        missing_columns = [col for col in columns_to_remove if col not in df.columns]
        if missing_columns:
            print(f"Columns not found in {input_file}: {missing_columns}")
        
        # Check and remove the columns if they exist in the DataFrame
        df = df.drop(columns=[col for col in columns_to_remove if col in df.columns])
        
        # Save the modified DataFrame to the same CSV file
        df.to_csv(input_file, index=False)
        print(f"Columns {columns_to_remove} removed (if they existed) from {input_file}.")
    except FileNotFoundError:
        print(f"File not found: {input_file}")

def process_multiple_tables(config_file, csv_directory):
    with open(config_file, 'r') as file:
        lines = file.readlines()
        
    for line in lines:
        table_info = line.strip().split(':')
        input_file = os.path.join(csv_directory, table_info[0])
        columns_to_remove = table_info[1].split(',')
        
        remove_columns_from_csv(input_file, columns_to_remove)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Remove specified columns from multiple CSV files.')
    parser.add_argument('config_file', type=str, help='Path to the text file containing columns to remove')
    parser.add_argument('csv_directory', type=str, help='Directory containing the CSV files')
    
    args = parser.parse_args()
    
    process_multiple_tables(args.config_file, args.csv_directory)
