import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


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
        <div>
          {franchiseStats.franchiseBio.map((franchise, key) => (
            <div key={key}>
              {franchise.franchiseName} Is Active: {franchise.isActive}
            </div>
          ))}
        </div>

        <div>
          {franchiseStats.franchiseTotals.map((franchise, key) => (
            <div key={key}>
              {franchise.G} {franchise.W} {franchise.L} {franchise.R} {franchise.AB} {franchise.H} {franchise['2B']} {franchise['3B']} {franchise.HR}
              {franchise.BB} {franchise.SO} {franchise.SB} {franchise.CS} {franchise.HBP} {franchise.SF} {franchise.RA} {franchise.ER} {franchise.CG}
              {franchise.SHO} {franchise.SV} {franchise.HA} {franchise.HRA} {franchise.BBA} {franchise.SOA} {franchise.E} {franchise.DP} {franchise.IP}
            </div>
          ))}
        </div>

        <div>
          {franchiseStats.franchiseTeams.map((franchise, key) => (
            <div key={key}>
              {franchise.name} {franchise.yearID} {franchise.G} {franchise.W} {franchise.L} {franchise.R} {franchise.AB} {franchise.H} {franchise['2B']} {franchise['3B']} 
              {franchise.HR} {franchise.BB} {franchise.SO} {franchise.SB} {franchise.SF} {franchise.HBP} {franchise.SF} {franchise.RA} {franchise.ER} {franchise.CG} 
              {franchise.SHO} {franchise.SV} {franchise.HA} {franchise.HRA} {franchise.BBA} {franchise.SOA} {franchise.E} {franchise.DP} {franchise.FP} {franchise.IP}
            </div>
          ))}
        </div>

      </div>
    );

}

export default Franchise;
  