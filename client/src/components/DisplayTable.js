import React from "react";

const DisplayTable = ({ columns, data }) => {
  // Function to check if all rows match the columns
  const isValidRow = (row) => {
    return columns.every((col) => col in row);
  };

  // Filter the invalid rows and log errors
  const invalidRows = data.filter((row) => !isValidRow(row));
  if (invalidRows.length > 0) {
    console.log("Error: Some rows do not match the columns", invalidRows);
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTable;
