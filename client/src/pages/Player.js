// Single Player component
// To be in Leaderboard, Players

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FavouriteButton from '../components/FavouriteButton'

function Player() {
  const { playerID } = useParams();
  const [PlayerStats, setPlayerStats] = useState({
    playerBio: [0], // Init 0 to avoid error on first render
    playerPositions: [0],
    playerAwards:[0],
    playerCareerPitchingTotals: [0],
    playerSeasonalPitchingTotals: [0], // Init 0 to avoid showing "No pitching..." on first render 
    playerSeasonalBattingTotals: [0],
    seasonBySeasonBattingStats: [0],
    playerCareerFieldingTotals: [0],
    playerSeasonalFieldingTotals: [0],
  });
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    fetch(`http://localhost:3001/players/${playerID}`, {
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
          setPlayerStats(data);
          console.log("FETCHED: ", data, " from ", playerID);
        }
      })
      .catch((error) => console.log("ERROR", error));
  }, [playerID]);

  return (
    <div>
      <div className="pageTitle">
        {PlayerStats.playerBio.map((player, key) => (
        <div className="pageTitle" key={key}>
          <h2>
          {player.nameFirst} {player.nameLast}
          </h2>
        </div>
        ))}
      </div>

      <div>
        <FavouriteButton userID={userID} type="player" id={playerID} />
      </div>

      <div>
        {PlayerStats.playerBio.map((player, key) => (
        <div key={key}>
          {player.weight} lbs, {Math.floor(player.height / 12)} ft{player.height % 12 !== 0 && ` ${player.height % 12} inches`}, Bats: {player.bats}, Throws: {player.throws}, Born: {player.birthCountry}
        </div>
        ))}
      </div>

      <div>
      <h3>Career Pitching Totals</h3>
    <table className="TableStyle">
      <thead>
        <tr>
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
        {PlayerStats.careerPitchingTotals.length === 0 || PlayerStats.careerPitchingTotals.every(player => 
          player.G === null && player.W === null && player.L === null && player.GS === null &&
          player.CG === null && player.SHO === null && player.SV === null && player.H === null &&
          player.R === null && player.ER === null && player.HR === null && player.BB === null &&
          player.IBB === null && player.SO === null && player.HBP === null && player.BK === null &&
          player.WP === null && player.IP === null
        ) ? (
          <tr>
            <td colSpan="18">No pitching statistics available</td>
          </tr>
        ) : (
          PlayerStats.careerPitchingTotals.map((player, key) => (
            <tr key={key}>
              <td>{player.G}</td>
              <td>{player.W}</td>
              <td>{player.L}</td>
              <td>{player.GS}</td>
              <td>{player.CG}</td>
              <td>{player.SHO}</td>
              <td>{player.SV}</td>
              <td>{player.H}</td>
              <td>{player.R}</td>
              <td>{player.ER}</td>
              <td>{player.HR}</td>
              <td>{player.BB}</td>
              <td>{player.IBB}</td>
              <td>{player.SO}</td>
              <td>{player.HBP}</td>
              <td>{player.BK}</td>
              <td>{player.WP}</td>
              <td>{player.IP}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    <h3>Season by Season Pitching Stats</h3>
    <table className="TableStyle">
      <thead>
        <tr>
          <th>Year</th>
          <th>Team</th>
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
        {PlayerStats.seasonBySeasonPitchingStats.length > 0 ? (
          PlayerStats.seasonBySeasonPitchingStats.map((player, key) => (
            <tr key={key}>
              <td><Link to={`/teams/${player.teamID}/${player.yearID}`}> {player.yearID} </Link></td>
              <td>{player.teamID}</td>
              <td>{player.G}</td>
              <td>{player.W}</td>
              <td>{player.L}</td>
              <td>{player.GS}</td>
              <td>{player.CG}</td>
              <td>{player.SHO}</td>
              <td>{player.SV}</td>
              <td>{player.H}</td>
              <td>{player.R}</td>
              <td>{player.ER}</td>
              <td>{player.HR}</td>
              <td>{player.BB}</td>
              <td>{player.IBB}</td>
              <td>{player.SO}</td>
              <td>{player.HBP}</td>
              <td>{player.BK}</td>
              <td>{player.WP}</td>
              <td>{player.IP}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="20">No pitching statistics available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  <h3>Career Hitting Totals</h3>
    <table className="TableStyle">
      <thead>
        <tr>
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
        {PlayerStats.careerBattingTotals.length === 0 || PlayerStats.careerBattingTotals.every(player => 
          player.G == null && player.AB == null && player.R == null && player.H == null &&
          player["2B"] == null && player["3B"] == null && player.HR == null && player.RBI == null &&
          player.SB == null && player.CS == null && player.BB == null && player.SO == null &&
          player.IBB == null && player.HBP == null && player.SH == null && player.SF == null &&
          player.GIDP == null && player.PA == null
        ) ? (
          <tr>
            <td colSpan="18">No hitting statistics available</td>
          </tr>
        ) : (
          PlayerStats.careerBattingTotals.map((player, key) => (
            <tr key={key}>
              <td>{player.G}</td>
              <td>{player.AB}</td>
              <td>{player.R}</td>
              <td>{player.H}</td>
              <td>{player["2B"]}</td>
              <td>{player["3B"]}</td>
              <td>{player.HR}</td>
              <td>{player.RBI}</td>
              <td>{player.SB}</td>
              <td>{player.CS}</td>
              <td>{player.BB}</td>
              <td>{player.SO}</td>
              <td>{player.IBB}</td>
              <td>{player.HBP}</td>
              <td>{player.SH}</td>
              <td>{player.SF}</td>
              <td>{player.GIDP}</td>
              <td>{player.PA}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    <h3>Season by Season Hitting Statistics</h3>
    <table className="TableStyle">
      <thead>
        <tr>
          <th>Year</th>
          <th>Team</th>
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
        {PlayerStats.seasonBySeasonBattingStats.length > 0 ? (
          PlayerStats.seasonBySeasonBattingStats.map((player, key) => (
            <tr key={key}>
              <td><Link to={`/teams/${player.teamID}/${player.yearID}`}> {player.yearID} </Link></td>
              <td>{player.teamID}</td>
              <td>{player.G}</td>
              <td>{player.AB}</td>
              <td>{player.R}</td>
              <td>{player.H}</td>
              <td>{player["2B"]}</td>
              <td>{player["3B"]}</td>
              <td>{player.HR}</td>
              <td>{player.RBI}</td>
              <td>{player.SB}</td>
              <td>{player.CS}</td>
              <td>{player.BB}</td>
              <td>{player.SO}</td>
              <td>{player.IBB}</td>
              <td>{player.HBP}</td>
              <td>{player.SH}</td>
              <td>{player.SF}</td>
              <td>{player.GIDP}</td>
              <td>{player.PA}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="20">No hitting statistics available</td>
          </tr>
        )}
      </tbody>
    </table>

    </div>
  );
}

export default Player;

