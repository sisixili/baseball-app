# Checks how csv_file is encoded

import chardet

def detect_encoding(file_path):
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        return result['encoding']

csv_file = 'Parks.csv'
encoding = detect_encoding(csv_file)
print(f"The detected encoding is: {encoding}")
