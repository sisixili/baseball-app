import pandas as pd
import os
import argparse

def read_mappings(mapping_file):
    mappings = {}
    with open(mapping_file, 'r') as file:
        lines = file.readlines()
        
    for line in lines:
        line = line.strip()
        if not line:
            continue
        parts = line.split(':')
        if len(parts) < 2:
            print(f"Skipping invalid mapping line: {line}")
            continue
        
        csv_file = parts[0]
        mappings[csv_file] = {}
        for mapping in parts[1:]:
            old_name, new_name = mapping.split(',')
            mappings[csv_file][old_name] = new_name
    
    for csv, mapping in mappings.items():
        print(f"Mappings for {csv}: {mapping}")
    
    return mappings

def rename_columns_in_csv(csv_file_path, column_mapping, output_csv_file_path):
    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_file_path, encoding='ISO-8859-1')
    
    # Rename the columns based on the mapping
    df.rename(columns=column_mapping, inplace=True)
    
    # Save the updated DataFrame
    df.to_csv(output_csv_file_path, index=False)
    print(f"Columns renamed and saved to {output_csv_file_path}")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("mapping_file", help="Path to the text file with column mappings")
    parser.add_argument("csv_dir", help="Directory containing the CSV files")
    
    args = parser.parse_args()
    mappings = read_mappings(args.mapping_file)
    for csv_file, column_mapping in mappings.items():
        csv_file_path = os.path.join(args.csv_dir, csv_file)
        output_csv_file_path = os.path.join(args.csv_dir, f"{os.path.splitext(csv_file)[0]}.csv")
        rename_columns_in_csv(csv_file_path, column_mapping, output_csv_file_path)

if __name__ == "__main__":
    main()
