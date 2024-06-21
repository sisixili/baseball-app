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
          <th>Name & Year</th>
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
              <tr key={key}>
              <td>{franchise.G} </td>
              <td>{franchise.W} </td>
              <td>{franchise.L} </td>
              <td>{franchise.R} </td>
              <td>{franchise.AB} </td>
              <td>{franchise.H} </td>
              <td>{franchise['2B']} </td>
              <td>{franchise['3B']} </td>
              <td>{franchise.HR}</td>
              <td>{franchise.BB} </td>
              <td>{franchise.SO} </td>
              <td>{franchise.SB} </td>
              <td>{franchise.CS} </td>
              <td>{franchise.HBP} </td>
              <td>{franchise.SF} </td>
              <td>{franchise.RA} </td>
              <td>{franchise.ER} </td>
              <td>{franchise.CG}</td>
              <td>{franchise.SHO} </td>
              <td>{franchise.SV} </td>
              <td>{franchise.HA} </td>
              <td>{franchise.HRA} </td>
              <td>{franchise.BBA} </td>
              <td>{franchise.SOA} </td>
              <td>{franchise.E} </td>
              <td>{franchise.DP} </td>
              <td>{franchise.IP}</td>
              </tr>
          ))}
          </tbody>
          </table>
        </div>

        

        <div>
          {franchiseStats.franchiseTeams.map((franchise, key) => (           
            <div>
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
              <td>{franchise.R}</td> 
              <td>{franchise.AB}</td> 
              <td>{franchise.H}</td> 
              <td>{franchise['2B']}</td> 
              <td>{franchise['3B']}</td> 
              <td>{franchise.HR}</td> 
              <td>{franchise.BB}</td> 
              <td>{franchise.SO}</td> 
              <td>{franchise.SB}</td> 
              <td>{franchise.SF}</td> 
              <td>{franchise.HBP} </td>
              <td>{franchise.SF} </td>
              <td>{franchise.RA}</td> 
              <td>{franchise.ER} </td>
              <td>{franchise.CG}</td> 
              <td>{franchise.SHO}</td> 
              <td>{franchise.SV}</td> 
              <td>{franchise.HA}</td> 
              <td>{franchise.HRA}</td> 
              <td>{franchise.BBA}</td> 
              <td>{franchise.SOA}</td> 
              <td>{franchise.E}</td> 
              <td>{franchise.DP}</td> 
              <td>{franchise.FP}</td> 
              <td>{franchise.IP}</td>
              </tr>
            </div>
          ))}
        </div>

      </div>
    );

}

export default Franchise;
  