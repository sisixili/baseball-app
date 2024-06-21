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

        <div>
          {teamStats.teamBio.map((team, key) => (
            <div key={key}>
              {team.name}
              <Link to={`/franchises/${team.franchiseID}`}>
                Franchise: {team.franchiseID}
              </Link>
              {team.G} {team.W} {team.L} {team.park} {team.averageAttendance}
            </div>
          ))}
        </div>

        <div>
          {teamStats.totalBattersForTeam.map((team, key) => (
            <div key={key}>
              {team.AB} {team.R} {team.H} {team["2B"]} {team["3B"]} {team.HR} {team.RBI}
              {team.SB} {team.CS} {team.BB} {team.SO} {team.IBB} {team.HBP} {team.SH} 
              {team.SF} {team.GIDP} {team.PA}
            </div>
          ))}
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
