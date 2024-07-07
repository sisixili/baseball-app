import os
import argparse

def load_renames(file_path):
    renames = {}
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            line = line.strip()
            if not line or ',' not in line:
                continue
            old_name, new_name = line.split(',', 1)
            renames[old_name.strip()] = new_name.strip()
    return renames

def rename_files(directory, renames):
    for old_name, new_name in renames.items():
        old_path = os.path.join(directory, old_name)
        new_path = os.path.join(directory, new_name)
        if os.path.exists(old_path):
            os.rename(old_path, new_path)
            print(f"Renamed: {old_name} -> {new_name}")
        else:
            print(f"File not found: {old_name}")

def main():
    parser = argparse.ArgumentParser(description="Rename files based on a provided mapping file.")
    parser.add_argument("directory", type=str, help="Directory containing the files to be renamed")
    parser.add_argument("renames_file", type=str, help="File containing the list of renames")
    args = parser.parse_args()

    directory = args.directory
    renames_file = args.renames_file

    if not os.path.isdir(directory):
        print(f"Error: {directory} is not a valid directory")
        sys.exit(1)

    if not os.path.isfile(renames_file):
        print(f"Error: {renames_file} is not a valid file")
        sys.exit(1)

    renames = load_renames(renames_file)
    rename_files(directory, renames)

if __name__ == "__main__":
    main()
