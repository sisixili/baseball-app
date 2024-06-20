import os
import argparse

def remove_files_from_list(list_file, directory):
    # Read the list of files to remove
    with open(list_file, 'r') as file:
        files_to_remove = file.read().splitlines()
    
    for file_name in files_to_remove:
        file_path = os.path.join(directory, file_name)
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"Removed file: {file_path}")
        else:
            print(f"File not found: {file_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('list_file', type=str, help='The path to the text file containing names of files to be removed.')
    parser.add_argument('directory', type=str, help='The directory where files should be removed.')
    args = parser.parse_args()
    remove_files_from_list(args.list_file, args.directory)
