import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Team() {
    const { teamID, yearID } = useParams();
    const [teamStats, setTeamStats] = useState({
        teamBio: [],
        totalBattersForTeam: [],
        allBattersForTeam: [],
        totalPitchersForTeam: [],
        allPitchersForTeam: []
    });
  
    useEffect(() => {
      fetch(`http://localhost:3001/teams/${teamID}/${yearID}`, {
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
            setTeamStats(data);
            console.log("FETCHED: ", data, " from ", teamID, yearID);
          }
        })
        .catch((error) => console.log("ERROR", error));
    }, [teamID]);

    return (
      <div>

        <div className="pageTitle">
          {teamStats.teamBio.map((team, key) => (
            <div className="pageTitle" key={key}>
              <h2>
              {team.name}
               Franchise: 
              <Link to={`/franchises/${team.franchiseID}`}>
                {team.franchiseID}
              </Link>
              </h2>
              <h3>
              Games: {team.G},
              Wins: {team.W},
              Losses: {team.L},
              Team Park: {team.park},
              Avg Attendance: {team.averageAttendance}
              </h3>
            </div>
          ))}
        </div>

        <div>
          <h3>All Batter Stats</h3>
          <table className="TableStyle">
            <thead>
            <tr>
              <th>AB</th>
              <th>R </th>
              <th>H</th>
              <th>2B </th>
              <th>3B </th>
              <th>HR </th>
              <th>RBI</th>
              <th>SB </th>
              <th>CS </th>
              <th>BB </th>
              <th>SO </th>
              <th>IBB </th>
              <th>HBP </th>
              <th>SH </th>
              <th>SF </th>
              <th>SF</th>
              <th>GIDP </th>
              <th>PA</th>
              </tr>
              </thead>
              <tbody className="TableResults">
          {teamStats.totalBattersForTeam.map((team, key) => (
              <tr key={key}>
              <td>{team.AB}</td>
              <td>{team.R} </td>
              <td>{team.H} </td>
              <td>{team["2B"]} </td>
              <td>{team["3B"]} </td>
              <td>{team.HR} </td>
              <td>{team.RBI}</td>
              <td>{team.SB} </td>
              <td>{team.CS} </td>
              <td>{team.BB} </td>
              <td>{team.SO} </td>
              <td>{team.IBB} </td>
              <td>{team.HBP} </td>
              <td>{team.SH}</td>
              <td>{team.SF}</td>
              <td>{team.SF}</td>
              <td>{team.GIDP}</td>
              <td>{team.PA}</td>
              </tr>
          ))}
          </tbody>
          </table>
        </div>

        <div>
          {teamStats.allBattersForTeam.map((team, key) => (
            <div key={key}>
              <Link to={`/players/${team.playerID}`}>
              {team.nameFirst} {team.nameLast}
              </Link>
              {team.G} {team.AB} {team.R} {team.H} {team["2B"]} {team["3B"]} {team.HR} {team.RBI}
              {team.SB} {team.CS} {team.BB} {team.SO} {team.IBB} {team.HBP} {team.SH} {team.SF} {team.GIDP}
            </div>
          ))}
        </div>

        <div>
          {teamStats.totalPitchersForTeam.map((team, key) => (
            <div key={key}>
              {team.G} {team.W} {team.L} {team.GS} {team.CG} {team.SHO} {team.SV}
              {team.H} {team.R} {team.ER} {team.HR} {team.BB} {team.IBB} {team.SO} 
              {team.HBP} {team.BK} {team.WP} {team.IP}
            </div>
          ))}
        </div>

        <div>
          {teamStats.allPitchersForTeam.map((team, key) => (
            <div key={key}>
              <Link to={`/players/${team.playerID}`}>
              {team.nameFirst} {team.nameLast}
              </Link>
              {team.G} {team.W} {team.L} {team.GS} {team.CG} {team.SHO} {team.SV} {team.H}
              {team.R} {team.ER} {team.HR} {team.BB} {team.IBB} {team.SO} {team.HBP} {team.BK} {team.WP}
            </div>
          ))}
        </div>

      </div>
    );

}

export default Team
