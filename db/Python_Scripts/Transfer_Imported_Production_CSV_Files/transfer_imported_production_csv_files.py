import os
import shutil
import argparse

def read_file_list(file_list_path):
    with open(file_list_path, 'r') as file:
        return [line.strip() for line in file.readlines()]

def move_files(old_dir, new_dir, files):
    # Create the destination directory if it doesn't exist
    if not os.path.exists(new_dir):
        os.makedirs(new_dir)
    
    # Move the files
    for file in files:
        old_path = os.path.join(old_dir, file)
        new_path = os.path.join(new_dir, file)
        if os.path.exists(old_path):
            shutil.move(old_path, new_path)
            print(f"Moved {old_path} to {new_path}")
        else:
            print(f"File {old_path} does not exist")

def main():
    parser = argparse.ArgumentParser(description="Move files from one directory to another.")
    parser.add_argument('old_directory', type=str, help='The directory to move files from')
    parser.add_argument('new_directory', type=str, help='The directory to move files to')
    parser.add_argument('file_list', type=str, help='A text file with the list of files to move')
    
    args = parser.parse_args()
    
    old_directory = args.old_directory
    new_directory = args.new_directory
    file_list_path = args.file_list

    # Read the list of files to move from the text file
    files_to_move = read_file_list(file_list_path)

    move_files(old_directory, new_directory, files_to_move)

if __name__ == "__main__":
    main()
