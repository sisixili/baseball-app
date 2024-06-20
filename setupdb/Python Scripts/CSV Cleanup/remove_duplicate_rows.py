import pandas as pd
import os
import sys

# Get the directory name from the command line arguments
if len(sys.argv) != 2:
    sys.exit(1)

directory = sys.argv[1]

# Check if the specified directory exists
if not os.path.isdir(directory):
    print(f"Error: Directory '{directory}' does not exist.")
    sys.exit(1)

# Process each CSV file in the directory
for filename in os.listdir(directory):
    if filename.endswith(".csv"):
        file_path = os.path.join(directory, filename)

        # Read the CSV file
        df = pd.read_csv(file_path, encoding='ISO-8859-1')

        # Remove duplicate rows
        df_no_duplicates = df.drop_duplicates()

        # Save the CSV file, overwriting the original file
        df_no_duplicates.to_csv(file_path, index=False)

        print(f"Duplicates removed from '{filename}'. File overwritten.")

print("Processing complete.")
