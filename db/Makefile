# Setup

# Determine which Python version to use
PYTHON3 := $(shell command -v python3 2>/dev/null)
PYTHON := $(if $(PYTHON3),$(PYTHON3),$(shell command -v python 2>/dev/null))

# Directories
IMPORTED_CSV_FILE_DIRECTORY = lahman_1871-2023_csv
SAMPLE_CSV_FILES_DIRECTORY = Sample_CSV_Files
PRODUCTION_CSV_FILES_DIRECTORY = Production_CSV_Files
PYTHON_SCRIPTS = Python_Scripts
PRODUCTION_CSV_CLEANUP = Production_CSV_Cleanup


# Transfer imported CSV files to the Production CSV File directory (only the CSV files we use)
TRANSFER_IMPORTED_PRODUCTION_CSV_FILES = $(PYTHON_SCRIPTS)/Transfer_Imported_Production_CSV_Files/transfer_imported_production_csv_files.py
TRANSFER_IMPORTED_PRODUCTION_CSV_FILES_ARGS = $(IMPORTED_CSV_FILE_DIRECTORY) $(PRODUCTION_CSV_FILES_DIRECTORY) $(PYTHON_SCRIPTS)/Transfer_Imported_Production_CSV_Files/imported_production_csv_files_to_use.txt

# Rename files in Production CSV Files
RENAME_FILES = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Rename_Files/rename_files.py
RENAME_FILES_ARGS = $(PRODUCTION_CSV_FILES_DIRECTORY) $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Rename_Files/file_renames.txt 

# Remove unnecessary columns from Production CSV files
REMOVE_UNNECESSARY_COLUMNS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Remove_Unnecessary_Columns/remove_unnecessary_columns.py
REMOVE_UNNECESSARY_COLUMNS_ARGS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Remove_Unnecessary_Columns/unnecessary_columns.txt $(PRODUCTION_CSV_FILES_DIRECTORY)

# Rename columns in Production CSV files
RENAME_COLUMNS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Rename_Columns/rename_columns.py
RENAME_COLUMNS_ARGS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Rename_Columns/column_renames.txt $(PRODUCTION_CSV_FILES_DIRECTORY)

# Remove duplicate rows from all Production CSV files
REMOVE_DUPLICATE_ROWS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/remove_duplicate_rows.py
REMOVE_DUPLICATE_ROWS_ARGS = $(PRODUCTION_CSV_FILES_DIRECTORY)

# Correct faulty rows from Production CSV files
CORRECT_FAULTY_ROWS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Correct_Faulty_Rows/correct_faulty_rows.py
CORRECT_FAULTY_ROWS_ARGS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Correct_Faulty_Rows/faulty_rows.txt $(PRODUCTION_CSV_FILES_DIRECTORY)

# Remove erroneous rows from Production CSV files
REMOVE_ERRONEOUS_ROWS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Remove_Erroneous_Rows/remove_erroneous_rows.py
REMOVE_ERRONEOUS_ROWS_ARGS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/Remove_Erroneous_Rows/erroneous_rows.txt $(PRODUCTION_CSV_FILES_DIRECTORY)

FIX_THINGS = $(PYTHON_SCRIPTS)/$(PRODUCTION_CSV_CLEANUP)/fixThings.py

# Create sample CSV files using Production CSV files
CREATE_SAMPLE_CSV_FILES = $(PYTHON_SCRIPTS)/create_sample_csv_files.py
CREATE_SAMPLE_CSV_FILES_ARGS = $(PRODUCTION_CSV_FILES_DIRECTORY)  $(SAMPLE_CSV_FILES_DIRECTORY)

# Create and populate tables
CREATE_AND_POPULATE = $(PYTHON_SCRIPTS)/initTables.py



.PHONY: default
default:
	@echo "Warning: carefully read what each targets do"


.PHONY: configure_imported_production_csv_files
configure_imported_production_csv_files: transfer_imported_production_csv_files delete_imported_csv_file_directory rename_files remove_unnecessary_columns rename_columns remove_duplicate_rows correct_faulty_rows remove_erroneous_rows fix_things

.PHONY: transfer_imported_production_csv_files
transfer_imported_production_csv_files:
	$(PYTHON) $(TRANSFER_IMPORTED_PRODUCTION_CSV_FILES) $(TRANSFER_IMPORTED_PRODUCTION_CSV_FILES_ARGS)

.PHONY: delete_imported_csv_file_directory
delete_imported_csv_file_directory:
	if [ -d $(IMPORTED_CSV_FILE_DIRECTORY) ]; then rm -rf $(IMPORTED_CSV_FILE_DIRECTORY); fi
	@echo "Deleted $(IMPORTED_CSV_FILE_DIRECTORY) if it existed."

.PHONY: rename_files
rename_files: 
	$(PYTHON) $(RENAME_FILES) $(RENAME_FILES_ARGS)

.PHONY: remove_unnecessary_columns
remove_unnecessary_columns:
	$(PYTHON) $(REMOVE_UNNECESSARY_COLUMNS) $(REMOVE_UNNECESSARY_COLUMNS_ARGS)

.PHONY: rename_columns
rename_columns:
	$(PYTHON) $(RENAME_COLUMNS) $(RENAME_COLUMNS_ARGS)

.PHONY: remove_duplicate_rows
remove_duplicate_rows:
	$(PYTHON) $(REMOVE_DUPLICATE_ROWS) $(REMOVE_DUPLICATE_ROWS_ARGS)

.PHONY: correct_faulty_rows
correct_faulty_rows:
	$(PYTHON) $(CORRECT_FAULTY_ROWS) $(CORRECT_FAULTY_ROWS_ARGS)

.PHONY: remove_erroneous_rows
remove_erroneous_rows:
	$(PYTHON) $(REMOVE_ERRONEOUS_ROWS) $(REMOVE_ERRONEOUS_ROWS_ARGS)

.PHONY: fix_things
fix_things:
	$(PYTHON) $(FIX_THINGS)


.PHONY: create_sample_csv_files
create_sample_csv_files:
	$(PYTHON) $(CREATE_SAMPLE_CSV_FILES) $(CREATE_SAMPLE_CSV_FILES_ARGS)


.PHONY: create_and_populate_tables_with_sample_data
create_and_populate_tables_with_sample_data: create_sample_csv_files
	$(PYTHON) $(CREATE_AND_POPULATE) $(SAMPLE_CSV_FILES_DIRECTORY)

.PHONY: create_and_populate_tables_with_production_data
create_and_populate_tables_with_production_data:
	$(PYTHON) $(CREATE_AND_POPULATE) $(PRODUCTION_CSV_FILES_DIRECTORY)
