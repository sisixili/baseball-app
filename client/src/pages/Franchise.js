import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FavouriteButton from '../components/FavouriteButton'
import SimpleTable from "../components/SimpleTable";


function Franchise({lightMode, setLightMode}) {
    const { franchiseID } = useParams();
    const [franchiseStats, setFranchiseStats] = useState({
      franchiseBio: [],
      franchiseTotalPitching: [0],
      franchiseTotalBatting: [0],
      franchiseTeams: [0]
    });
    const userID = sessionStorage.getItem("userID");
  
    useEffect(() => {
      fetch(`http://localhost:3001/franchises/${franchiseID}`, {
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
            setFranchiseStats(data);
            console.log("FETCHED: ", data, " from ", franchiseID);
          }
        })
        .catch((error) => console.log("ERROR", error));
    }, [franchiseID]);

    return (
      <div className="center">
        <div className="pageTitle">
          {franchiseStats.franchiseBio.map((franchise, key) => (
            <div className="pageTitle" key={key}>
              <h2 className="center">
                {franchise.franchiseName} Is Active: {franchise.isActive}
              </h2>
            </div>
          ))}
        </div>
        <FavouriteButton lightMode={lightMode} userID={userID} type="franchise" id={franchiseID} text="Add Favourite Franchise" />
        <div>
          <h3 className="center">Franchise Total Pitching Stats</h3>
          <SimpleTable
            lightMode={lightMode}
            columns={Object.keys(franchiseStats.franchiseTotalPitching[0])}
            data={franchiseStats.franchiseTotalPitching}
          />
        </div>

        <div>
        <h3 className="center">Franchise Total Batting Stats</h3>
          <SimpleTable
            lightMode={lightMode}
            columns={Object.keys(franchiseStats.franchiseTotalBatting[0])}
            data={franchiseStats.franchiseTotalBatting}
          />
        </div>

        <h3>Teams</h3>
        {console.log(franchiseStats.franchiseTeams)}
        <div className="center">
          <table className={lightMode ? "TableStyle" : "DMTableStyle"}>
            <thead>
              <tr>
                <th>Name & Year</th>
                <th>G</th>
                <th>W</th>
                <th>L</th>
                <th>winPercentage</th>
                <th>averageAttendance</th>
              </tr>
            </thead>
            <tbody className="TableResults">
              {franchiseStats.franchiseTeams.map((franchise, key) => (
                <tr key={key}>
                  <td>
                    <Link to={`/teams/${franchise.teamID}/${franchise.yearID}`}>
                      {franchise.name}
                      {franchise.yearID}
                    </Link>
                  </td>
                  <td>{franchise.G}</td>
                  <td>{franchise.W}</td>
                  <td>{franchise.L}</td>
                  <td>{franchise.winPercentage}</td>
                  <td>{franchise.averageAttendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

}

export default Franchise;
  