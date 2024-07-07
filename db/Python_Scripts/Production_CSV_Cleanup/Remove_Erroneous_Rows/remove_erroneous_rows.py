import os
import pandas as pd
import argparse

def main():
    # Set up argparse to handle command line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('rows_file', type=str, help='The name of the file containing the rows to delete.')
    parser.add_argument('directory', type=str, help='The directory path where the CSV file is located.')
    args = parser.parse_args()

    # Construct the full file paths
    csv_file_path = os.path.join(args.directory, 'AwardsPlayers.csv')
    rows_file_path = args.rows_file

    # Read the CSV file from the specified directory
    try:
        df = pd.read_csv(csv_file_path, encoding='ISO-8859-1')
    except FileNotFoundError:
        print("The CSV file was not found in the specified directory.")
        exit()

    try:
        rows_df = pd.read_csv(rows_file_path)
    except FileNotFoundError:
        print("The rows file was not found in the specified directory.")
        exit()

    
    df['lgID'] = df['lgID'].astype(str)
    rows_df['lgID'] = rows_df['lgID'].astype(str)
    merged_df = df.merge(rows_df, on=['playerID', 'awardID', 'yearID', 'lgID'], how='left', indicator=True)
    df_filtered = merged_df[merged_df['_merge'] == 'left_only'].drop(columns=['_merge'])
    df_filtered.to_csv(csv_file_path, index=False)
    print(f"The modified file has been saved as {csv_file_path}")

if __name__ == "__main__":
    main()
