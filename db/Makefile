# Setup production and sample database

PYTHON = python3

# Renanme downloaded CSV directory
OLD_CSV_FILE_DIRECTORY_NAME = lahman_1871-2023_csv
PRODUCTION_CSV_FILES_DIRECTORY = "Production CSV Files"
SAMPLE_CSV_FILES_DIRECTORY = "Sample CSV Files"


# Remove unnecessary CSV files
REMOVE_UNNECESSARY_CSV_FILES = "Python Scripts/CSV Cleanup/remove_unnecessary_csv_files.py"
REMOVE_UNNECESSARY_CSV_FILES_ARGS = "Python Scripts/CSV Cleanup/textFiles/unnecessary_csv_files.txt" $(PRODUCTION_CSV_FILES_DIRECTORY)

# Remove unnecessary columns from CSV files
REMOVE_UNNECESSARY_CSV_FILE_COLUMNS = "Python Scripts/CSV Cleanup/remove_unnecessary_columns.py"
REMOVE_UNNECESSARY_CSV_FILE_COLUMNS_ARGS = "Python Scripts/CSV Cleanup/textFiles/unnecessary_columns.txt" $(PRODUCTION_CSV_FILES_DIRECTORY)

# Remove duplicate rows from all CSV files
REMOVE_DUPLICATE_ROWS = "Python Scripts/CSV Cleanup/remove_duplicate_rows.py"
REMOVE_DUPLICATE_ROWS_ARGS = $(PRODUCTION_CSV_FILES_DIRECTORY)

# Remove erroneous rows from CSV files
REMOVE_ERRONEOUS_ROWS = "Python Scripts/CSV Cleanup/remove_erroneous_rows.py"
REMOVE_ERRONEOUS_ROWS_ARGS = "Python Scripts/CSV Cleanup/textFiles/erroneous_rows.txt" $(PRODUCTION_CSV_FILES_DIRECTORY)

# Rename columns from CSV files
RENAME_COLUMNS = "Python Scripts/CSV Cleanup/rename_columns.py"
RENAME_COLUMNS_ARGS = "Python Scripts/CSV Cleanup/textFiles/column_renames.txt" $(PRODUCTION_CSV_FILES_DIRECTORY)

# Create sample CSV files
CREATE_SAMPLE_CSV_FILES = "Python Scripts/create_sample_csv_files.py"
CREATE_SAMPLE_CSV_FILES_ARGS = $(PRODUCTION_CSV_FILES_DIRECTORY)  $(SAMPLE_CSV_FILES_DIRECTORY)

# Create and populate tables
CREATE_AND_POPULATE = "Python Scripts/initTables.py"
CREATE_AND_POPULATE_ARGS = $(SAMPLE_CSV_FILES_DIRECTORY)

all: run_all


run_all: rename_production_directory remove_unnecessary_csv_files remove_unnecessary_columns remove_duplicate_rows remove_erroneous_rows rename_columns create_sample_csv_files create_and_populate_tables


rename_production_directory:
	mv $(OLD_CSV_FILE_DIRECTORY_NAME) $(PRODUCTION_CSV_FILES_DIRECTORY)

remove_unnecessary_csv_files:
	$(PYTHON) $(REMOVE_UNNECESSARY_CSV_FILES) $(REMOVE_UNNECESSARY_CSV_FILES_ARGS)

remove_unnecessary_columns:
	$(PYTHON) $(REMOVE_UNNECESSARY_CSV_FILE_COLUMNS) $(REMOVE_UNNECESSARY_CSV_FILE_COLUMNS_ARGS)

remove_duplicate_rows:
	$(PYTHON) $(REMOVE_DUPLICATE_ROWS) $(REMOVE_DUPLICATE_ROWS_ARGS)

remove_erroneous_rows:
	$(PYTHON) $(REMOVE_ERRONEOUS_ROWS) $(REMOVE_ERRONEOUS_ROWS_ARGS)

rename_columns:
	$(PYTHON) $(RENAME_COLUMNS) $(RENAME_COLUMNS_ARGS)

create_sample_csv_files:
	$(PYTHON) $(CREATE_SAMPLE_CSV_FILES) $(CREATE_SAMPLE_CSV_FILES_ARGS)

create_and_populate_tables:
	$(PYTHON) $(CREATE_AND_POPULATE) $(CREATE_AND_POPULATE_ARGS)
