import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayTable from '../components/DisplayTable'

function Standings({lightMode, setLightMode}) {
  const [listOfStandings, setListOfStandings] = useState([]);
  const [year, setYear] = useState(1871); 

  useEffect(() => {
    fetch(`http://localhost:3001/standings?yearID=${year}`, {
      credentials: 'include',
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
    { name: "rank", displayName: "Rank" },
    { name: "name", displayName: "Team Name", link: "/teams/:teamID/:yearID" },
    { name: "franchiseName", displayName: "Franchise Name", link: "/franchises/:franchiseID" },
    { name: "G"},
    { name: "W"},
    { name: "L"}
  ];


  return (
    <div>

      <div className="pageTitle">
        <h1>Standings</h1>

        <select
          className={lightMode ? "dropdown2" : "DMdropdown2"}
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
        <h4> </h4>

        <DisplayTable lightMode={lightMode} columns={columns} data={listOfStandings} />
      </div>
      <div className="standings-footer">
          <h4> </h4>
      </div>
      <div className="center">
        <h1> </h1>
        <h1> </h1>
        <p> </p>
      </div>
    </div>
  );
}

export default Standings;