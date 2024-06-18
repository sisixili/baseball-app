import os
import pandas as pd
import argparse

def main():
    # Set up argparse to handle command line arguments
    parser = argparse.ArgumentParser(description='Delete specific rows from a CSV file based on given criteria.')
    parser.add_argument('keys_file', type=str, help='The name of the file containing the keys to delete.')
    parser.add_argument('directory', type=str, help='The directory path where the CSV file is located.')

    args = parser.parse_args()

    # Construct the full file paths
    csv_file_path = os.path.join(args.directory, 'AwardsPlayers.csv')
    keys_file_path = args.keys_file

    # Read the CSV file from the specified directory
    try:
        df = pd.read_csv(csv_file_path, encoding='ISO-8859-1')
    except FileNotFoundError:
        print("The CSV file was not found in the specified directory.")
        exit()

    # Read the keys file
    try:
        keys_df = pd.read_csv(keys_file_path)
    except FileNotFoundError:
        print("The keys file was not found in the specified directory.")
        exit()

    # Ensure the 'lgID' column is treated as a string (to handle 'NaN' correctly)
    df['lgID'] = df['lgID'].astype(str)
    keys_df['lgID'] = keys_df['lgID'].astype(str)

    # Merge the DataFrame with keys to delete
    merged_df = df.merge(keys_df, on=['playerID', 'awardID', 'yearID', 'lgID'], how='left', indicator=True)

    # Filter out rows that exist in the keys file
    df_filtered = merged_df[merged_df['_merge'] == 'left_only'].drop(columns=['_merge'])

    # Save the modified DataFrame back to the original file path
    df_filtered.to_csv(csv_file_path, index=False)

    print(f"The modified file has been saved as {csv_file_path}")

if __name__ == "__main__":
    main()
