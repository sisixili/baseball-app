import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Leaderboard page

function Leaderboard() {
  const [listOfPlayers, setListOfPlayers] = useState({
    hittingLeaders: [],
    pitchingLeaders: [],
  });
  const [hitColumn, setHitColumn] = useState('H');
  const [pitchColumn, setPitchColumn] = useState('W');
  const [hitYearID, setHitYearID] = useState(2023);
  const [pitchYearID, setPitchYearID] = useState(2023);
  const [hitOrderDirection, setHitOrderDirection] = useState('asc');
  const [pitchOrderDirection, setPitchOrderDirection] = useState('asc');

  useEffect(() => {
    const url = `http://localhost:3001/leaderboard?hittingStatistic=${encodeURIComponent(hitColumn)}`
    +`&pitchingStatistic=${encodeURIComponent(pitchColumn)}`
    +`&hitYearID=${encodeURIComponent(hitYearID)}`
    +`&pitchYearID=${encodeURIComponent(pitchYearID)}`
    +`&hitOrderDirection=${encodeURIComponent(hitOrderDirection)}`
    +`&pitchOrderDirection=${encodeURIComponent(pitchOrderDirection)}`
    
    try {
      fetch(url, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log("FETCH failed", res.status);
          }
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setListOfPlayers(data);
          }
        })
        .catch((error) => console.log("ERROR", error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [hitColumn, pitchColumn, hitYearID, pitchYearID, hitOrderDirection, pitchOrderDirection]);

  return (
    <div>
      <div className="pageTitle">
        <h2>Leaderboard</h2>
      </div>

      <div className="subTitle">
        <h4>Hitting</h4>
      </div>
      <div className="dropdown">
        <select className="dropdown" value={hitColumn} onChange={(e) => setHitColumn(e.target.value)}>
          <option value="H">H</option>
          <option value="HR">HR</option>
          <option value="RBI">RBI</option>
        </select>

        <select className="dropdown" value={hitYearID} onChange={(e) => setHitYearID(parseInt(e.target.value, 10))}>
          <option value="1890">1890</option>
          <option value="1891">1891</option>
          <option value="1944">1944</option>
          <option value="1945">1945</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>

        <select className="dropdown" 
          value={hitOrderDirection}
          onChange={(e) => setHitOrderDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="Players"><div className="NameList">
        {listOfPlayers.hittingLeaders.map((player) => (
          <div className="player" key={player.playerID}>
            <ul id="hittingList">
                <li> 
                {player[hitColumn]}
              </li>
              <li>
                <Link to={`/players/${player.playerID}`}>
                    {player.nameFirst} {player.nameLast}
                </Link> 
              </li>
              
            </ul>
          </div>
        ))}
        <h3 className="ListWrap"> </h3>
      </div></div>

      <div className="subTitle">
        <h4>Pitching</h4>
      </div>

      <div className="dropdown">
        <select className="dropdown" value={pitchColumn} onChange={(e) => setPitchColumn(e.target.value)}>
          <option value="W">W</option>
          <option value="ER">ER</option>
          <option value="SO">SO</option>
        </select>

        <select className="dropdown" value={pitchYearID} onChange={(e) => setPitchYearID(parseInt(e.target.value, 10))}>
          <option value="1890">1890</option>
          <option value="1891">1891</option>
          <option value="1944">1944</option>
          <option value="1945">1945</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>

        <select className="dropdown" 
          value={pitchOrderDirection}
          onChange={(e) => setPitchOrderDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="Players">
      <div className="NameList">
        {listOfPlayers.pitchingLeaders.map((player) => (
          <div className="player" key={player.playerID}>
            <ul id="pitchingList">
              <li>
                {player[pitchColumn]}
              </li>
              <li>
              <Link to={`/players/${player.playerID}`}>
                {player.nameFirst} {player.nameLast}
              </Link> 
              </li>
            </ul>
          </div>
        ))}
        <h3 className="ListWrap"> </h3>
      </div>
      </div>
    </div>
  );
}

export default Leaderboard;

