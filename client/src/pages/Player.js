// Single Player component
// To be in Leaderboard, Players

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Player() {
  const { playerID } = useParams();
  const [PlayerStats, setPlayerStats] = useState({
    playerBio: [],
    careerPitchingTotals: [],
    seasonBySeasonPitchingStats: [0], // Init 0 to avoid showing "No pitching..." on first render 
    careerBattingTotals: [],
    seasonBySeasonBattingStats: [0],
  });

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

      <div>
        {PlayerStats.playerBio.map((player, key) => (
        <div key={key}>
          {player.nameFirst} {player.nameLast} {player.weight} {player.height}
          {player.bats} {player.throws} {player.birthCountry}
        </div>
        ))}
      </div>

      <div>
        {PlayerStats.careerPitchingTotals.map((player, key) => (
        <div key={key}>
          {player.G} {player.W} {player.L} {player.GS} {player.CG} {player.SHO} {player.SV} {player.H} {player.R} 
          {player.ER} {player.HR} {player.BB} {player.IBB} {player.SO} {player.HBP} {player.BK} {player.WP} {player.IP}
        </div>
        ))}
      </div>

      <div>
      {PlayerStats.seasonBySeasonPitchingStats.length > 0 ? (
        PlayerStats.seasonBySeasonPitchingStats.map((player, key) => (
        <div key={key}>
          {player.yearID} {player.teamID} {player.G} {player.W} {player.L} {player.GS} {player.CG} {player.SHO} {player.SV} {player.H} 
          {player.R} {player.ER} {player.HR} {player.BB} {player.IBB} {player.SO} {player.HBP} {player.BK} {player.WP} {player.IP} 
        </div>
        ))
      ) : (
        <div>This player has never pitched before so no pitching stats available</div>
      )}
      </div>

      <div>
        {PlayerStats.careerBattingTotals.map((player, key) => (
        <div key={key}>
          {player.G} {player.AB} {player.R} {player.H} {player["2B"]} {player["3B"]} {player.HR} {player.RBI} {player.SB} 
          {player.CS} {player.BB} {player.SO} {player.IBB} {player.HBP} {player.SH} {player.SF} {player.GIPD} {player.PA}
        </div>
        ))}
      </div>

      <div>
      {PlayerStats.seasonBySeasonBattingStats.length > 0 ? (
        PlayerStats.seasonBySeasonBattingStats.map((player, key) => (
        <div key={key}>
          {player.yearID} {player.teamID} {player.G} {player.AB} {player.R} {player.H} {player["2B"]} {player["3B"]} {player.HR} {player.RBI} 
          {player.SB} {player.CS} {player.BB} {player.SO} {player.IBB} {player.HBP} {player.SH} {player.SF} {player.GIDP} {player.PA} 
        </div>
        ))
      ) : (
        <div>This player has never batted before so no batting stats available</div>
      )}
      </div>

    </div>
  );
}

export default Player;

/*
    playerBio: any[];
    careerPitchingTotals: any[];
    seasonBySeasonPitchingStats: any[];
    careerBattingTotals: any[];
    seasonBySeasonBattingStats: any[];
*/
