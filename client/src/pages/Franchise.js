import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


function Franchise() {
    const { franchiseID } = useParams();
    const [franchiseStats, setFranchiseStats] = useState({
      franchiseBio: [],
      franchiseTotals: [],
      franchiseTeams: []
    });
  
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
      <div>
        <div className="pageTitle">
          {franchiseStats.franchiseBio.map((franchise, key) => (
            <div className="pageTitle" key={key}>
              <h2>
              {franchise.franchiseName} Is Active: {franchise.isActive}
              </h2>
            </div>
          ))}
        </div>

        <div>
        <h3>All Time Franchise Stats</h3>
        <table className="TableStyle">
        <thead>
        <tr>
          <th>G</th>
          <th>W</th>
          <th>L</th>
          <th>R</th>
          <th>AB</th>
          <th>H</th>
          <th>2B</th>
          <th>3B</th>
          <th>HR</th>
          <th>BB</th>
          <th>SO</th>
          <th>SB</th>
          <th>CS</th>
          <th>HBP</th>
          <th>SF</th>
          <th>RA</th>
          <th>ER</th>
          <th>CG</th>
          <th>SHO</th>
          <th>SV</th>
          <th>HA</th>
          <th>HRA</th>
          <th>BBA</th>
          <th>SOA</th>
          <th>E</th>
          <th>DP</th>
          <th>IP</th>
        </tr>
      </thead>
      <tbody className="TableResults">
          {franchiseStats.franchiseTotals.map((franchise, key) => (
            <div key={key}>
              {franchise.G} {franchise.W} {franchise.L} {franchise.R} {franchise.AB} {franchise.H} {franchise['2B']} {franchise['3B']} {franchise.HR}
              {franchise.BB} {franchise.SO} {franchise.SB} {franchise.CS} {franchise.HBP} {franchise.SF} {franchise.RA} {franchise.ER} {franchise.CG}
              {franchise.SHO} {franchise.SV} {franchise.HA} {franchise.HRA} {franchise.BBA} {franchise.SOA} {franchise.E} {franchise.DP} {franchise.IP}
            </div>
          ))}
          </tbody>
          </table>
        </div>

        

        <div>
          {franchiseStats.franchiseTeams.map((franchise, key) => (           
            <div key={key}>
              <Link to={`/teams/${franchise.teamID}/${franchise.yearID}`}>{franchise.name} {franchise.yearID}</Link> 
              {franchise.G} {franchise.W} {franchise.L} {franchise.R} {franchise.AB} {franchise.H} {franchise['2B']} {franchise['3B']} 
              {franchise.HR} {franchise.BB} {franchise.SO} {franchise.SB} {franchise.SF} {franchise.HBP} {franchise.SF} {franchise.RA} {franchise.ER} {franchise.CG} 
              {franchise.SHO} {franchise.SV} {franchise.HA} {franchise.HRA} {franchise.BBA} {franchise.SOA} {franchise.E} {franchise.DP} {franchise.FP} {franchise.IP}
            </div>
          ))}
        </div>

      </div>
    );

}

export default Franchise;
  