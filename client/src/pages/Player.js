// Single Player component
// To be in Leaderboard, Players

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FavouriteButton from "../components/FavouriteButton";
import SimpleTable from "../components/SimpleTable";

function Player({lightMode, setLightMode}) {
  const { playerID } = useParams();
  const [PlayerStats, setPlayerStats] = useState({
    playerBio: [0], // Init 0 to avoid error on first render
    playerPositions: [0],
    playerHallOfFameStatus: [0],
    playerAwards: [0],
    playerCareerPitchingTotals: [0],
    playerSeasonalPitchingTotals: [0], // Init 0 to avoid showing "No pitching..." on first render
    playerCareerBattingTotals: [0],
    playerSeasonalBattingTotals: [0],
    playerCareerFieldingTotals: [0],
    playerSeasonalFieldingTotals: [0],
    headshotURL: ""     // Initialize the headshot URL
  });
  const [playoff, setPlayoff] = useState(false)
  const userID = sessionStorage.getItem("userID")

  useEffect(() => {
    fetch(`http://localhost:3001/players/${playerID}?showPlayoffs=${playoff}`, {
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("FETCH failed");
        }
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setPlayerStats(data);
        }
      })
      .catch((error) => console.log("ERROR", error));
  }, [playerID, playoff]);

  const togglePlayoff = () => {
    setPlayoff(!playoff)
  }


  return (
    <div>
      <div id="TopBar"> {/*  className="TopGrid"*/}
      <div id="TopLeft">
        <div className="player-info">
        <div className="player-details">
          {PlayerStats.playerBio.map((player, key) => (
            <div className={lightMode ? "bio":"DMbio"} key={key}>
              <h2>{player.nameFirst} {player.nameLast}</h2>
              <div>
                <FavouriteButton lightMode={lightMode} userID={userID} type="player" id={playerID} text="Add Favourite Player" />
                <button onClick={togglePlayoff}>Showing {playoff ? "Playoffs" : "Regular Season"}</button>
              </div>
              <ul className="BioStats">
                <li>Bats: {player.bats ? player.bats : "N/A"}</li>
                <li>Throws: {player.throws ? player.throws : "N/A"}</li>
                <li>Birthday: {player.birthYear ? player.birthYear : "0000"}-{player.birthMonth ? player.birthMonth : "00"}-{player.birthDay ? player.birthDay : "00"}</li>
                <li>Debut: {player.debut ? player.debut : "N/A"}</li>
                <li>Height: {player.height ? player.height : "N/A"}"</li>
                <li>Weight: {player.weight ? player.weight + " lbs" : "N/A"}</li>
                <li>Born: {player.birthCountry ? player.birthCountry : "N/A"}</li>
              </ul>
              <div className="Positions">
                <h3 className={lightMode? "tit":"DMtit"}>Positions:</h3>
                {PlayerStats.playerPositions.map((position, posKey) => (
                  <div key={posKey}>{position.position}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {PlayerStats.headshotURL && (
          <div className={lightMode?"player-headshot":"DMplayer-headshot"}>
            <img src={PlayerStats.headshotURL} alt="Player headshot" />
          </div>
        )}
      </div>
    </div>
      
      <div id="TopRight">
        <h3>Player Hall Of Fame</h3>
        {PlayerStats?.playerHallOfFameStatus?.[0] ? (
          <SimpleTable
            lightMode={lightMode}
            setLightMode={setLightMode}
            columns={Object.keys(PlayerStats.playerHallOfFameStatus[0])}
            data={PlayerStats.playerHallOfFameStatus}
          />
        ) : (
          <p className={lightMode ? "bio":"DMbio"}>Player was not inducted into the Hall Of Fame.</p>
        )}
      </div>

      </div>

      <h3>Player Awards</h3>
      {PlayerStats?.playerAwards?.[0] ? (
        <SimpleTable
        lightMode={lightMode}
        setLightMode={setLightMode}
          columns={Object.keys(PlayerStats.playerAwards[0])}
          data={PlayerStats.playerAwards}
        />
      ) : (
        <p className={lightMode ? "bio":"DMbio"}>No awards for this player.</p>
      )}

      <h3>Career Pitching Totals</h3>
      {PlayerStats?.playerCareerPitchingTotals?.[0] ? (
      <SimpleTable
            lightMode={lightMode}
            setLightMode={setLightMode}
        columns={Object.keys(PlayerStats.playerCareerPitchingTotals[0])}
        data={PlayerStats.playerCareerPitchingTotals}
      />
      ):(
        <p className={lightMode ? "bio":"DMbio"}>No pitching totals for this player.</p>  
      )}

      <h3>Seasonal Pitching Totals</h3>
      {/* PlayerStats?.playerSeasonalPitchingTotals?.[0] ? (
      <SimpleTable
            lightMode={lightMode}
            setLightMode={setLightMode}
        columns={Object.keys(PlayerStats.playerSeasonalPitchingTotals[0])}
        data={PlayerStats.playerSeasonalPitchingTotals}
      />
      ):(
        <p className={lightMode ? "bio":"DMbio"}>No pitching totals for this player.</p>  
      ) */}           {/* works but cant seem to include the links specifically */}
      <table className={lightMode ? "TableStyle" : "DMTableStyle"}>
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
        <tbody className={lightMode?"TableResults":"DMTableResults"}>
          {PlayerStats.playerSeasonalPitchingTotals.length > 0 ? (
            PlayerStats.playerSeasonalPitchingTotals.map((player, key) => (
              <tr key={key}>
                <td>{player.yearID}</td>
                <td>
                  <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/teams/${player.teamID}/${player.yearID}`}>
                    {" "}
                    {player.teamName}{" "}
                  </Link>
                </td>
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

      <h3>Career Batting Totals</h3>
      {PlayerStats?.playerCareerBattingTotals?.[0] ? (
      <SimpleTable
            lightMode={lightMode}
            setLightMode={setLightMode}
        columns={Object.keys(PlayerStats.playerCareerBattingTotals[0])}
        data={PlayerStats.playerCareerBattingTotals}
      />):(
        <p className={lightMode ? "bio":"DMbio"}>No batting totals for this player.</p>  
      )}

      <h3>Seasonal Batting Totals</h3>
      <table className={lightMode ? "TableStyle" : "DMTableStyle"}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Team</th>
            <th>PA</th>
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
          </tr>
        </thead>

        <tbody className={lightMode?"TableResults":"DMTableResults"}>
          {PlayerStats.playerSeasonalBattingTotals.length > 0 ? (
            PlayerStats.playerSeasonalBattingTotals.map((player, key) => (
              <tr key={key}>
                <td>{player.yearID}</td>
                <td>
                  <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/teams/${player.teamID}/${player.yearID}`}>
                    {" "}
                    {player.teamName}{" "}
                  </Link>
                </td>
                <td>{player.PA}</td>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="20">No pitching statistics available</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Career Fielding Totals</h3>
      {PlayerStats?.playerCareerFieldingTotals?.[0] ? (
      <SimpleTable
            lightMode={lightMode}
            setLightMode={setLightMode}
        columns={Object.keys(PlayerStats.playerCareerFieldingTotals[0])}
        data={PlayerStats.playerCareerFieldingTotals}
      />):(
        <p className={lightMode ? "bio":"DMbio"}>No fielding totals for this player.</p>  
      )}


      <h3>Seasonal Fielding Totals</h3>
      <table className={lightMode ? "TableStyle" : "DMTableStyle"}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Team</th>
            <th>Inn</th>
            <th>GS</th>
            <th>PO</th>
            <th>A</th>
            <th>E</th>
            <th>DP</th>
          </tr>
        </thead>
        <tbody className={lightMode?"TableResults":"DMTableResults"}>
          {PlayerStats.playerSeasonalFieldingTotals.length > 0 ? (
            PlayerStats.playerSeasonalFieldingTotals.map((player, key) => (
              <tr key={key}>
                <td>{player.yearID}</td>
                <td>
                  <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/teams/${player.teamID}/${player.yearID}`}>
                    {" "}
                    {player.teamName}{" "}
                  </Link>
                </td>
                <td>{player.Inn}</td>
                <td>{player.GS}</td>
                <td>{player.PO}</td>
                <td>{player.A}</td>
                <td>{player.E}</td>
                <td>{player.DP}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="20">No pitching statistics available</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3> </h3>
    </div>
  );
}

export default Player;
