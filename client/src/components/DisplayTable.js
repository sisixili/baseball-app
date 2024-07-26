import React from "react";
import { Link } from "react-router-dom";

const DisplayTable = ({ lightMode, columns, data }) => {

  // Function to check if all rows match the columns
  const isValidRow = (row) => {
    return columns.every((col) => col.name in row);
  };

  // Filter the invalid rows and log errors
  const invalidRows = data.filter((row) => !isValidRow(row));
  if (invalidRows.length > 0) {
    console.log("Error: Some rows do not match the columns", invalidRows);
  }

  return (
    <table className={lightMode ? "blackBG" : "whiteBG"}>
      <thead>
        <tr className={lightMode ? "SimpleTableHeader" : "DMSimpleTableHeader"}>
          {columns.map((col, index) => (
            <th key={index}>{col.displayName || col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody className={lightMode?"SimpleTableListItem":"DMSimpleTableListItem"}>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.link ? (
                  <Link className={lightMode?"tableLinks":"DMtableLinks"} to={col.link.replace(":teamID", row.teamID).replace(":yearID", row.yearID).replace(":franchiseID", row.franchiseID)}>
                    {row[col.name]}
                  </Link>
                ) : (
                  row[col.name]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTable;
