# Checks if primary_key is minimal for csv_file
# Prints any rows where a primary_key value is null

import pandas as pd
from itertools import combinations

def is_minimal_primary_key(df, primary_key):
    n_rows = len(df)
    
    # Check all subsets of the primary key
    for i in range(1, len(primary_key)):
        for subset in combinations(primary_key, i):
            subset = list(subset)
            if df[subset].drop_duplicates().shape[0] == n_rows:
                return False, subset  # Found a subset that can uniquely identify rows
    
    return True, None

def highlight_null_primary_key(df, primary_key):
    null_rows = df[df[primary_key].isnull().any(axis=1)]
    return null_rows

def main(csv_file, primary_key):
    df = pd.read_csv(csv_file, encoding='ISO-8859-1')

    null_rows = highlight_null_primary_key(df, primary_key)
    if not null_rows.empty:
        print("Rows with null values in the primary key columns:")
        print(null_rows)
    else:
        print("No null values found in the primary key columns.")

    is_minimal, minimal_subset = is_minimal_primary_key(df, primary_key)
    if is_minimal:
        print(f"The primary key {primary_key} is minimal.")
    else:
        print(f"The primary key {primary_key} is not minimal. The subset {minimal_subset} can uniquely identify rows.")

if __name__ == "__main__":
    csv_file = 'TeamsFranchises.csv'
    primary_key = ['franchID']
    main(csv_file, primary_key)
