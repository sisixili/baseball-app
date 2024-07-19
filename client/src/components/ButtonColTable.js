import React from "react";

const ButtonColTable = ({ columns, data, setValue, value, direction, year, lightMode, setLightMode }) => {
  // Function to check if all rows match the columns
  const isValidRow = (row) => {
    return columns.every((col) => col in row);
  };

  const things=(col)=>{
    console.log(value);
    setValue(col.toString());
    console.log(value);
  }

  // Filter the invalid rows and log errors
  const invalidRows = data.filter((row) => !isValidRow(row));
  if (invalidRows.length > 0) {
    console.log("Error: Some rows do not match the columns", invalidRows);
  }

  return (
    <div>
      <table className={lightMode ? "blackBG" : "whiteBG"}>
        <thead>
          <tr className={lightMode ? "SimpleTableHeader" : "DMSimpleTableHeader"}>
            {columns.map((col, index) => (
              <th key={index}><td> <button onClick={things(col)}>{col}</button> </td></th> /* className={lightMode ? "input" : "DMinput"} */
            ))}
          </tr>
        </thead>
        <tbody className="SimpleTableListItem">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ButtonColTable;