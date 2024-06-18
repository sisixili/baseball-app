import pandas as pd
import os
import argparse


def parse_arguments():
    parser = argparse.ArgumentParser(description='Filter CSV files based on conditions and save to new directory.')
    parser.add_argument('input_directory', type=str, help='Path to the input directory containing the original CSV files')
    parser.add_argument('output_directory', type=str, help='Path to the output directory to save the filtered CSV files')
    return parser.parse_args()


# Define the conditions for selecting rows
# Example: conditions = { 'file1.csv': [{'column_name': 'value1'}, {'column_name': 'value2'}], ... }
conditions = {
    'AllstarFull.csv': [
        {'playerID': 'guerrvl02', 'yearID': '2022', 'gameNumber': '0'},
        {'playerID': 'guerrvl02', 'yearID': '2023', 'gameNumber': '0'},
        {'playerID': 'bettsmo01', 'yearID': '2022', 'gameNumber': '0'},
        {'playerID': 'bettsmo01', 'yearID': '2023', 'gameNumber': '0'},
        {'playerID': 'kershcl01', 'yearID': '2022', 'gameNumber': '0'},
        {'playerID': 'kershcl01', 'yearID': '2023', 'gameNumber': '0'},
        {'playerID': 'greggha01', 'yearID': '1945', 'gameNumber': '0'},
        {'playerID': 'galanau01', 'yearID': '1944', 'gameNumber': '0'}
    ], 
    'Appearances.csv': [
        {'playerID': 'guerrvl02', 'yearID': '2022', 'teamID': 'TOR'},
        {'playerID': 'guerrvl02', 'yearID': '2023', 'teamID': 'TOR'},
        {'playerID': 'biggica01', 'yearID': '2022', 'teamID': 'TOR'},
        {'playerID': 'biggica01', 'yearID': '2023', 'teamID': 'TOR'},
        {'playerID': 'bettsmo01', 'yearID': '2022', 'teamID': 'LAN'},
        {'playerID': 'bettsmo01', 'yearID': '2023', 'teamID': 'LAN'},
        {'playerID': 'kershcl01', 'yearID': '2022', 'teamID': 'LAN'},
        {'playerID': 'kershcl01', 'yearID': '2023', 'teamID': 'LAN'},
        {'playerID': 'buehlwa01', 'yearID': '2022', 'teamID': 'LAN'},
        {'playerID': 'bordafr01', 'yearID': '1944', 'teamID': 'BRO'},
        {'playerID': 'bordafr01', 'yearID': '1945', 'teamID': 'BRO'},
        {'playerID': 'greggha01', 'yearID': '1944', 'teamID': 'BRO'},
        {'playerID': 'greggha01', 'yearID': '1945', 'teamID': 'BRO'},
        {'playerID': 'webbele01', 'yearID': '1944', 'teamID': 'BRO'},
        {'playerID': 'webbele01', 'yearID': '1945', 'teamID': 'BRO'},
        {'playerID': 'galanau01', 'yearID': '1944', 'teamID': 'BRO'},
        {'playerID': 'galanau01', 'yearID': '1945', 'teamID': 'BRO'},
        {'playerID': 'quinnjo02', 'yearID': '1890', 'teamID': 'BSP'},
        {'playerID': 'broutda01', 'yearID': '1890', 'teamID': 'BSP'},
        {'playerID': 'broutda01', 'yearID': '1891', 'teamID': 'BS2'},
        {'playerID': 'daleybi01', 'yearID': '1890', 'teamID': 'BSP'},
        {'playerID': 'daleybi01', 'yearID': '1891', 'teamID': 'BS2'},
    ],
    'AwardsPlayers.csv': [
        {'playerID': 'guerrvl02', 'awardID': 'Gold Glove', 'yearID': '2022', 'leagueID': 'AL'},
        {'playerID': 'bettsmo01', 'awardID': 'TSN All-Star', 'yearID': '2022', 'leagueID': 'NL'},
        {'playerID': 'bettsmo01', 'awardID': 'TSN All-Star', 'yearID': '2023', 'leagueID': 'NL'},
        {'playerID': 'bettsmo01', 'awardID': 'Silver Slugger', 'yearID': '2022', 'leagueID': 'NL'},
        {'playerID': 'bettsmo01', 'awardID': 'Silver Slugger', 'yearID': '2023', 'leagueID': 'NL'},
        {'playerID': 'bettsmo01', 'awardID': 'Gold Glove', 'yearID': '2022', 'leagueID': 'NL'},
    ],
    'Batting.csv': [
        {'playerID': 'guerrvl02', 'yearID': '2022', 'stint': '1'},
        {'playerID': 'guerrvl02', 'yearID': '2023', 'stint': '1'},
        {'playerID': 'biggica01', 'yearID': '2022', 'stint': '1'},
        {'playerID': 'biggica01', 'yearID': '2023', 'stint': '1'},
        {'playerID': 'bettsmo01', 'yearID': '2022', 'stint': '1'},
        {'playerID': 'bettsmo01', 'yearID': '2023', 'stint': '1'},
        {'playerID': 'bordafr01', 'yearID': '1944', 'stint': '1'},
        {'playerID': 'bordafr01', 'yearID': '1945', 'stint': '1'},
        {'playerID': 'greggha01', 'yearID': '1944', 'stint': '1'},
        {'playerID': 'greggha01', 'yearID': '1945', 'stint': '1'},
        {'playerID': 'webbele01', 'yearID': '1944', 'stint': '1'},
        {'playerID': 'webbele01', 'yearID': '1945', 'stint': '1'},
        {'playerID': 'galanau01', 'yearID': '1944', 'stint': '1'},
        {'playerID': 'galanau01', 'yearID': '1945', 'stint': '1'},
        {'playerID': 'quinnjo02', 'yearID': '1890', 'stint': '1'},
        {'playerID': 'broutda01', 'yearID': '1890', 'stint': '1'},
        {'playerID': 'broutda01', 'yearID': '1891', 'stint': '1'},
        {'playerID': 'daleybi01', 'yearID': '1890', 'stint': '1'},
        {'playerID': 'daleybi01', 'yearID': '1891', 'stint': '1'},
    ],    
    'Fielding.csv': [
        {'playerID': 'guerrvl02', 'yearID': '2022', 'stint': '1', 'position': '1B'},
        {'playerID': 'guerrvl02', 'yearID': '2022', 'stint': '1', 'position': '3B'},
        {'playerID': 'guerrvl02', 'yearID': '2023', 'stint': '1', 'position': '1B'},

        {'playerID': 'biggica01', 'yearID': '2022', 'stint': '1', 'position': '1B'},
        {'playerID': 'biggica01', 'yearID': '2022', 'stint': '1', 'position': '2B'},
        {'playerID': 'biggica01', 'yearID': '2022', 'stint': '1', 'position': '3B'},
        {'playerID': 'biggica01', 'yearID': '2022', 'stint': '1', 'position': 'OF'},
        {'playerID': 'biggica01', 'yearID': '2023', 'stint': '1', 'position': '1B'},
        {'playerID': 'biggica01', 'yearID': '2023', 'stint': '1', 'position': '2B'},
        {'playerID': 'biggica01', 'yearID': '2023', 'stint': '1', 'position': '3B'},
        {'playerID': 'biggica01', 'yearID': '2023', 'stint': '1', 'position': 'SS'},
        {'playerID': 'biggica01', 'yearID': '2023', 'stint': '1', 'position': 'OF'},

        {'playerID': 'kikucyu01', 'yearID': '2022', 'stint': '1', 'position': 'P'},
        {'playerID': 'kikucyu01', 'yearID': '2023', 'stint': '1', 'position': 'P'},

        {'playerID': 'bettsmo01', 'yearID': '2022', 'stint': '1', 'position': '2B'},
        {'playerID': 'bettsmo01', 'yearID': '2022', 'stint': '1', 'position': 'OF'},
        {'playerID': 'bettsmo01', 'yearID': '2023', 'stint': '1', 'position': '2B'},
        {'playerID': 'bettsmo01', 'yearID': '2023', 'stint': '1', 'position': 'SS'},
        {'playerID': 'bettsmo01', 'yearID': '2023', 'stint': '1', 'position': 'OF'},

        {'playerID': 'kershcl01', 'yearID': '2022', 'stint': '1', 'position': 'P'},
        {'playerID': 'kershcl01', 'yearID': '2023', 'stint': '1', 'position': 'P'},

        {'playerID': 'buehlwa01', 'yearID': '2022', 'stint': '1', 'position': 'P'},

        {'playerID': 'bordafr01', 'yearID': '1944', 'stint': '1', 'position': '3B'},
        {'playerID': 'bordafr01', 'yearID': '1944', 'stint': '1', 'position': 'OF'},
        {'playerID': 'bordafr01', 'yearID': '1945', 'stint': '1', 'position': '3B'},

        {'playerID': 'greggha01', 'yearID': '1944', 'stint': '1', 'position': 'P'},
        {'playerID': 'greggha01', 'yearID': '1945', 'stint': '1', 'position': 'P'},

        {'playerID': 'webbele01', 'yearID': '1944', 'stint': '1', 'position': 'P'},
        {'playerID': 'webbele01', 'yearID': '1945', 'stint': '1', 'position': 'P'},

        {'playerID': 'galanau01', 'yearID': '1944', 'stint': '1', 'position': '2B'},
        {'playerID': 'galanau01', 'yearID': '1944', 'stint': '1', 'position': 'OF'},
        {'playerID': 'galanau01', 'yearID': '1945', 'stint': '1', 'position': '1B'},
        {'playerID': 'galanau01', 'yearID': '1945', 'stint': '1', 'position': '3B'},
        {'playerID': 'galanau01', 'yearID': '1945', 'stint': '1', 'position': 'OF'},

        {'playerID': 'quinnjo02', 'yearID': '1890', 'stint': '1', 'position': '2B'},

        {'playerID': 'broutda01', 'yearID': '1890', 'stint': '1', 'position': '1B'},
        {'playerID': 'broutda01', 'yearID': '1891', 'stint': '1', 'position': '1B'},

        {'playerID': 'daleybi01', 'yearID': '1890', 'stint': '1', 'position': 'OF'},
        {'playerID': 'daleybi01', 'yearID': '1890', 'stint': '1', 'position': 'P'},
        {'playerID': 'daleybi01', 'yearID': '1891', 'stint': '1', 'position': 'OF'},
        {'playerID': 'daleybi01', 'yearID': '1891', 'stint': '1', 'position': 'P'}
    ],
    'FieldingOFsplit.csv': [
        {'playerID': 'biggica01', 'yearID': '2022', 'stint': '1', 'position': 'LF'},
        {'playerID': 'biggica01', 'yearID': '2022', 'stint': '1', 'position': 'RF'},
        {'playerID': 'biggica01', 'yearID': '2023', 'stint': '1', 'position': 'RF'},
        {'playerID': 'bettsmo01', 'yearID': '2022', 'stint': '1', 'position': 'RF'},
        {'playerID': 'bettsmo01', 'yearID': '2023', 'stint': '1', 'position': 'RF'},

    ],
    'HallOfFame.csv': [
        {'yearID': '1936', 'playerID': 'broutda01'},
        {'yearID': '1945', 'playerID': 'broutda01'}
    ],
    'HomeGames.csv': [
        {'yearID': '1944', 'teamID': 'BRO', 'parkID': 'NYC15'},
        {'yearID': '1945', 'teamID': 'BRO', 'parkID': 'NYC15'},
        {'yearID': '2022', 'teamID': 'LAN', 'parkID': 'LOS03'},
        {'yearID': '2023', 'teamID': 'LAN', 'parkID': 'LOS03'},
        {'yearID': '2022', 'teamID': 'TOR', 'parkID': 'TOR02'},
        {'yearID': '2023', 'teamID': 'TOR', 'parkID': 'TOR02'},
        {'yearID': '1890', 'teamID': 'BSP', 'parkID': 'BOS04'},
        {'yearID': '1891', 'teamID': 'BS2', 'parkID': 'BOS04'},
    ],
    'Parks.csv': [
        {'parkID': 'NYC15'},
        {'parkID': 'LOS03'},
        {'parkID': 'TOR02'},
        {'parkID': 'BOS04'}
    ],
    'Pitching.csv': [
        {'playerID': 'kikucyu01', 'yearID': '2022', 'stint': '1'},
        {'playerID': 'kikucyu01', 'yearID': '2023', 'stint': '1'},
        {'playerID': 'kershcl01', 'yearID': '2022', 'stint': '1'},
        {'playerID': 'kershcl01', 'yearID': '2023', 'stint': '1'},
        {'playerID': 'buehlwa01', 'yearID': '2022', 'stint': '1'},
        {'playerID': 'greggha01', 'yearID': '1944', 'stint': '1'},
        {'playerID': 'greggha01', 'yearID': '1945', 'stint': '1'},
        {'playerID': 'webbele01', 'yearID': '1944', 'stint': '1'},
        {'playerID': 'webbele01', 'yearID': '1945', 'stint': '1'},
        {'playerID': 'daleybi01', 'yearID': '1890', 'stint': '1'},
        {'playerID': 'daleybi01', 'yearID': '1891', 'stint': '1'},
    ],
    'People.csv': [
        {'playerID': 'guerrvl02'},
        {'playerID': 'biggica01'},
        {'playerID': 'kikucyu01'},
        {'playerID': 'bettsmo01'},
        {'playerID': 'kershcl01'},
        {'playerID': 'buehlwa01'},
        {'playerID': 'bordafr01'},
        {'playerID': 'greggha01'},
        {'playerID': 'webbele01'},
        {'playerID': 'galanau01'},
        {'playerID': 'quinnjo02'},
        {'playerID': 'broutda01'},
        {'playerID': 'daleybi01'}
    ],
    'Teams.csv': [
        {'yearID': '1944', 'teamID': 'BRO'},
        {'yearID': '1945', 'teamID': 'BRO'},
        {'yearID': '2022', 'teamID': 'LAN'},
        {'yearID': '2023', 'teamID': 'LAN'},
        {'yearID': '2022', 'teamID': 'TOR'},
        {'yearID': '2023', 'teamID': 'TOR'},
        {'yearID': '1890', 'teamID': 'BSP'},
        {'yearID': '1891', 'teamID': 'BS2'},
    ],
    'TeamsFranchises.csv': [
        {'franchiseID': 'TOR'},
        {'franchiseID': 'LAD'},
        {'franchiseID': 'BRS'},
    ]
}

# Function to check if a row matches any condition
def row_matches_conditions(row, conditions):
    for condition in conditions:
        if all(row.get(key) == str(value) for key, value in condition.items()):
            return True
    return False


def main():
    args = parse_arguments()

    input_directory = args.input_directory
    output_directory = args.output_directory

    # Define the paths to your original CSV files
    csv_files = [
        'AllstarFull.csv',
        'Appearances.csv',
        'AwardsPlayers.csv',
        'Batting.csv',
        'Fielding.csv',
        'FieldingOFsplit.csv',
        'HallOfFame.csv',
        'HomeGames.csv',
        'Parks.csv',
        'Pitching.csv',
        'People.csv',
        'Teams.csv',
        'TeamsFranchises.csv'
    ]

    # Create the directory if it doesn't exist
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Create a sub CSV for each CSV file based on conditions
    for csv_file in csv_files:
        if csv_file in conditions:
            file_path = os.path.join(input_directory, csv_file)
            df = pd.read_csv(file_path, encoding='ISO-8859-1')

            # Check if the required columns are in the dataframe
            required_columns = list(conditions[csv_file][0].keys())
            if not set(required_columns).issubset(df.columns):
                print(f"Missing columns in {csv_file}: {set(required_columns) - set(df.columns)}")
                continue

            # Convert required columns to string for consistency
            df[required_columns] = df[required_columns].astype(str)

            filtered_df = df[df.apply(lambda row: row_matches_conditions(row, conditions[csv_file]), axis=1)]

            output_file = os.path.join(output_directory, f"{csv_file}")
            filtered_df.to_csv(output_file, index=False)
            print(f"Created {output_file} with {len(filtered_df)} matching rows.")

if __name__ == '__main__':
    main()

