import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayTable from '../components/DisplayTable'

function Standings() {
  const [listOfStandings, setListOfStandings] = useState([]);
  const [year, setYear] = useState(1871); 

  useEffect(() => {
    fetch(`http://localhost:3001/standings?yearID=${year}`, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("FETCH failed");
        }
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setListOfStandings(data);
        }
      })
      .catch((error) => console.log("ERROR", error));
  }, [year]);

  // Generate an array of years from 1871 to 2023
  const allYears = [];
  for (let y = 1871; y <= 2023; y++) {
    allYears.push(y);
  }


  const columns = [
    { name: "name", displayName: "Team Name", link: "/teams/:teamID/:yearID" },
    { name: "franchiseName", displayName: "Franchise Name", link: "/franchises/:franchiseID" },
    { name: "G"},
    { name: "W"},
    { name: "L"}
  ];


  return (
    <div>
      <select
        className="dropdown"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        {allYears.map((year) => (
          <option key={year} value={year}>
            {" "}
            {year}{" "}
          </option>
        ))}
      </select>

      <div>
        <h1>Team and Franchise Stats</h1>
        <DisplayTable columns={columns} data={listOfStandings} />
      </div>

    </div>
  );
}

export default Standings;
