import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FavouriteButton from "../components/FavouriteButton";
import SimpleTable from "../components/SimpleTable";

function Team() {
  const { teamID, yearID } = useParams();
  const [teamStats, setTeamStats] = useState({
    teamBio: [],
    teamTotalPitching: [0],
    teamAllPitchers: [],
    teamTotalBatting: [0],
    teamAllBatters: [],
  });
  const userID = sessionStorage.getItem("userID");

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
  }, [teamID, yearID]);

  return (
    <div>
      <div className="pageTitle">
        {teamStats.teamBio.map((team, key) => (
          <div className="pageTitle" key={key}>
            <h2>
              {team.name} Franchise:
              <Link to={`/franchises/${team.franchiseID}`}>
                {team.franchiseID}
              </Link>
            </h2>
            <h3>
              Games: {team.G}, Wins: {team.W}, Losses: {team.L}, Team Park:{" "}
              {team.park}, Avg Attendance: {team.averageAttendance}
            </h3>
          </div>
        ))}
      </div>

      <div>
        <FavouriteButton
          userID={userID}
          type="team"
          id={{ team: teamID, year: yearID }}
          text="Add Favourite Team"
        />
      </div>

      <h3> Total Pitching Stats</h3>
      <SimpleTable
        columns={Object.keys(teamStats.teamTotalPitching[0])}
        data={teamStats.teamTotalPitching}
      />

      <h3> All Pitchers</h3>
      <table className="TableStyle">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>G</th>
            <th>W</th>
            <th>L</th>
            <th>GS</th>
            <th>CG</th>
            <th>SHO</th>
            <th>SV</th>
            <th>H</th>
            <th>R</th>
            <th>ER</th>
            <th>HR</th>
            <th>BB</th>
            <th>IBB</th>
            <th>SO</th>
            <th>HBP</th>
            <th>BK</th>
            <th>WP</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody className="TableResults">
          {teamStats.teamAllPitchers.map((team, key) => (
            <tr key={key}>
              <td>
                <Link to={`/players/${team.playerID}`}>
                  {team.nameFirst} {team.nameLast}
                </Link>
              </td>
              <td>{team.G}</td>
              <td>{team.W}</td>
              <td>{team.L}</td>
              <td>{team.GS}</td>
              <td>{team.CG}</td>
              <td>{team.SHO}</td>
              <td>{team.SV}</td>
              <td>{team.H}</td>
              <td>{team.R}</td>
              <td>{team.ER}</td>
              <td>{team.HR}</td>
              <td>{team.BB}</td>
              <td>{team.IBB}</td>
              <td>{team.SO}</td>
              <td>{team.HBP}</td>
              <td>{team.BK}</td>
              <td>{team.WP}</td>
              <td>{team.IP}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3> Total Batting Stats</h3>
      <SimpleTable
        columns={Object.keys(teamStats.teamTotalBatting[0])}
        data={teamStats.teamTotalBatting}
      />

      <h3> All Batters</h3>
      <table className="TableStyle">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>G</th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>2B</th>
            <th>3B</th>
            <th>HR</th>
            <th>RBI</th>
            <th>SB</th>
            <th>CS</th>
            <th>BB</th>
            <th>SO</th>
            <th>IBB</th>
            <th>HBP</th>
            <th>SH</th>
            <th>SF</th>
            <th>GIDP</th>
            <th>PA</th>
          </tr>
        </thead>
        <tbody className="TableResults">
          {teamStats.teamAllBatters.map((team, key) => (
            <tr key={key}>
              <td>
                <Link to={`/players/${team.playerID}`}>
                  {team.nameFirst} {team.nameLast}
                </Link>
              </td>
              <td>{team.G}</td>
              <td>{team.AB}</td>
              <td>{team.R}</td>
              <td>{team.H}</td>
              <td>{team["2B"]}</td>
              <td>{team["3B"]}</td>
              <td>{team.HR}</td>
              <td>{team.RBI}</td>
              <td>{team.SB}</td>
              <td>{team.CS}</td>
              <td>{team.BB}</td>
              <td>{team.SO}</td>
              <td>{team.IBB}</td>
              <td>{team.HBP}</td>
              <td>{team.SH}</td>
              <td>{team.SF}</td>
              <td>{team.GIDP}</td>
              <td>{team.PA}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Team;
