import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
/* import ButtonColTable from "../components/ButtonColTable"; */

// Leaderboard page

function Leaderboard({lightMode, setLightMode}) {
  const [listOfPlayers, setListOfPlayers] = useState({
    battingLeaders: [],
    pitchingLeaders: [],
    fieldingLeaders: [],
  });
  const [battingStatistic, setBattingStatistic] = useState("G");
  const [pitchingStatistic, setPitchingStatistic] = useState("IP");
  const [fieldingStatistic, setFieldingStatistic] = useState("Inn");

  const [batYearID, setBatYearID] = useState(2023);
  const [pitchYearID, setPitchYearID] = useState(2023);
  const [fieldYearID, setFieldYearID] = useState(2023);

  const [batOrderDirection, setBatOrderDirection] = useState("desc");
  const [pitchOrderDirection, setPitchOrderDirection] = useState("desc");
  const [fieldingOrderDirection, setFieldingOrderDirection] = useState("desc");

  useEffect(() => {
    const url = `http://localhost:3001/leaderboard?battingStatistic=${encodeURIComponent(battingStatistic)}&pitchingStatistic=${encodeURIComponent(pitchingStatistic)}&fieldingStatistic=${encodeURIComponent(fieldingStatistic)}&battingYearID=${encodeURIComponent(batYearID)}&pitchingYearID=${encodeURIComponent(pitchYearID)}&fieldingYearID=${encodeURIComponent(fieldYearID)}&battingOrderDirection=${encodeURIComponent(batOrderDirection)}&pitchingOrderDirection=${encodeURIComponent(pitchOrderDirection)}&fieldingOrderDirection=${encodeURIComponent(fieldingOrderDirection)}`;

    try {
      fetch(url, {
        credentials: 'include',
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
            console.log("FETCHED:", data)
            setListOfPlayers(data);
          }
        })
        .catch((error) => console.log("ERROR", error));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [
    battingStatistic,
    pitchingStatistic,
    fieldingStatistic,
    batYearID,
    pitchYearID,
    fieldYearID,
    batOrderDirection,
    pitchOrderDirection,
    fieldingOrderDirection,
  ]);

  // Generate an array of years from 1871 to 2023
  const allYears = [];
  for (let y = 1871; y <= 2023; y++) {
    allYears.push(y);
  }

  return (
    <div className="center">
      <div className="pageTitle">
        <h2>Leaderboard</h2>
      </div>

      <div className="center">
      <p>To order the tables, click on the column header of the statistic you would like to sort by.</p>
      <div className="pgInstr">
      <p>Click again to toggle between ascending and descending order.</p>
      </div>
      </div>

      {/* console.log(listOfPlayers) */}
      {/* console.log(listOfPlayers.battingLeaders) */}
      <div className="row">
        <div className="inner-row-item">
          <div> {/* className="subTitle" */}
            <h3>Batting</h3>
          </div>
        </div>
        <div className="inner-row-item">
        <select
            className={lightMode ? "dropdown" : "DMdropdown2"}
            value={batYearID}
            onChange={(e) => setBatYearID(e.target.value)}
          >
            {allYears.map((year) => (
              <option key={year} value={year}>
                {" "}
                {year}{" "}
              </option>
            ))}
        </select>
        </div>
      </div>
      { listOfPlayers?.battingLeaders?.[0]? ( 

        <div>
        <table className={lightMode ? "blackBG" : "whiteBG"}>
          <thead>
            <tr className={lightMode ? "SimpleTableHeader" : "DMSimpleTableHeader"}>
              {/* Merge the first three columns into one */}
              <th>
                <td>
                  <button 
                    className={lightMode ? "colButton" : "DMcolButton"} 
                    onClick={() => {
                      if (battingStatistic === 'nameLast') {
                        if (batOrderDirection === 'asc'){
                          setBatOrderDirection('desc');
                        }
                        else{
                          setBatOrderDirection('asc')
                        }
                      } else {
                        setBattingStatistic('nameLast');
                      }
                    }}
                  >
                    Player
                  </button>
                </td>
              </th>
              {Object.keys(listOfPlayers.battingLeaders[0]).slice(3).map((col, index) => (
                <th key={index + 1}>
                  <td>
                    <button
                      className={lightMode ? "colButton" : "DMcolButton"} 
                      onClick={() => {
                        if (battingStatistic === col.toString()) {
                          if (batOrderDirection === 'asc'){
                            setBatOrderDirection('desc');
                          }
                          else{
                            setBatOrderDirection('asc')
                          }
                        } else {
                          setBattingStatistic(col.toString());
                        }
                      }}
                    >
                      {col}
                    </button>
                  </td>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={lightMode?"SimpleTableListItem":"DMSimpleTableListItem"}>
            {listOfPlayers.battingLeaders.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Combine the first three columns into one cell */}
                <td>
                  <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/players/${row[Object.keys(listOfPlayers.battingLeaders[0])[0]]}`}>
                    {row[Object.keys(listOfPlayers.battingLeaders[0])[1]]} {row[Object.keys(listOfPlayers.battingLeaders[0])[2]]}
                  </Link>
                </td>
                {Object.keys(listOfPlayers.battingLeaders[0]).slice(3).map((col, colIndex) => (
                  <td key={colIndex + 1}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        /* <ButtonColTable 
      
        lightMode={lightMode}
        columns={Object.keys(listOfPlayers.battingLeaders[0])}
        data={listOfPlayers.battingLeaders}

        value={battingStatistic} 
        setValue={setBattingStatistic}

        direction={batOrderDirection}
        year={batYearID}
      /> */

      ) : (
        <p>No Batting Statistics Available</p>
      )}

      {/* <div className="subTitle">
        <h3>Batting</h3>
      </div>

      <div className={lightMode ? "dropdown" : "DMdropdown"}>
        <select className={lightMode ? "dropdown" : "DMdropdown"} value={battingStatistic} onChange={(e) => setBattingStatistic(e.target.value)}>
          <option value="G">G</option>
          <option value="PA">PA</option>
          <option value="AB">AB</option>
          <option value="R">R</option>
          <option value="H">H</option>
          <option value="2B">2B</option>
          <option value="3B">3B</option>
          <option value="HR">HR</option>
          <option value="RBI">RBI</option>
          <option value="SB">SB</option>
          <option value="CS">CS</option>
          <option value="BB">BB</option>
          <option value="SO">SO</option>
          <option value="IBB">IBB</option>
          <option value="HBP">HBP</option>
          <option value="SH">SH</option>
          <option value="SF">SF</option>
          <option value="GIDP">GIDP</option>
        </select>

        <select
          className={lightMode ? "dropdown" : "DMdropdown"}
          value={batYearID}
          onChange={(e) => setBatYearID(parseInt(e.target.value, 10))}
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {" "}
              {year}{" "}
            </option>
          ))}
        </select>

        <select
          className={lightMode ? "dropdown" : "DMdropdown"}
          value={batOrderDirection}
          onChange={(e) => setBatOrderDirection(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="Players">
        <div className="nameList">
          {listOfPlayers.battingLeaders.map((player, key) => (
            <div className="player" key={key}>
              <ul id="hittingList">
                <li>{player[battingStatistic]}</li>
                <li>
                  <Link to={`/players/${player.playerID}`}>
                    {player.nameFirst} {player.nameLast}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div> */}

      {/* ==================================================================================== */}

      <div className="row">
        <div className="inner-row-item">
          <div> {/* className="subTitle" */}
            <h3>Pitching</h3>
          </div>
        </div>
        <div className="inner-row-item">
        <select
            className={lightMode ? "dropdown" : "DMdropdown2"}
            value={pitchYearID}
            onChange={(e) => setPitchYearID(e.target.value)}
          >
            {allYears.map((year) => (
              <option key={year} value={year}>
                {" "}
                {year}{" "}
              </option>
            ))}
        </select>
        </div>
      </div>

      { listOfPlayers?.pitchingLeaders?.[0]? ( 

        <div>
        <table className={lightMode ? "blackBG" : "whiteBG"}>
          <thead>
            <tr className={lightMode ? "SimpleTableHeader" : "DMSimpleTableHeader"}>
              {/* Merge the first three columns into one */}
              <th>
                <td>
                  <button 
                    className={lightMode ? "colButton" : "DMcolButton"} 
                    onClick={() => {
                      if (pitchingStatistic === 'nameLast') {
                        if (pitchOrderDirection === 'asc'){
                          setPitchOrderDirection('desc');
                        }
                        else{
                          setPitchOrderDirection('asc')
                        }
                      } else {
                        setPitchingStatistic('nameLast');
                      }
                    }}
                  >
                    Player
                  </button>
                </td>
              </th>
              {Object.keys(listOfPlayers.pitchingLeaders[0]).slice(3).map((col, index) => (
                <th key={index + 1}>
                  <td>
                    <button
                      className={lightMode ? "colButton" : "DMcolButton"} 
                      onClick={() => {
                        if (pitchingStatistic === col.toString()) {
                          if (pitchOrderDirection === 'asc'){
                            setPitchOrderDirection('desc');
                          }
                          else{
                            setPitchOrderDirection('asc')
                          }
                        } else {
                          setPitchingStatistic(col.toString());
                        }
                      }}
                    >
                      {col}
                    </button>
                  </td>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={lightMode?"SimpleTableListItem":"DMSimpleTableListItem"}>
            {listOfPlayers.pitchingLeaders.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Combine the first three columns into one cell */}
                <td>
                  <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/players/${row[Object.keys(listOfPlayers.pitchingLeaders[0])[0]]}`}>
                    {row[Object.keys(listOfPlayers.pitchingLeaders[0])[1]]} {row[Object.keys(listOfPlayers.pitchingLeaders[0])[2]]}
                  </Link>
                </td>
                {Object.keys(listOfPlayers.pitchingLeaders[0]).slice(3).map((col, colIndex) => (
                  <td key={colIndex + 1}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        ) : (
        <p>No Pitching Statistics Available</p>
        )}


      {/* <div className={lightMode ? "dropdown" : "DMdropdown"}>
        <select
          className={lightMode ? "dropdown" : "DMdropdown"}
          value={pitchingStatistic}
          onChange={(e) => setPitchingStatistic(e.target.value)}
        >
          <option value="IP">IP</option>
          <option value="G">G</option>
          <option value="W">W</option>
          <option value="L">L</option>
          <option value="GS">GS</option>
          <option value="CG">CG</option>
          <option value="SHO">SHO</option>
          <option value="SV">SV</option>
          <option value="H">H</option>
          <option value="R">R</option>
          <option value="ER">ER</option>
          <option value="HR">HR</option>
          <option value="BB">BB</option>
          <option value="IBB">IBB</option>
          <option value="SO">SO</option>
          <option value="HBP">HBP</option>
          <option value="BK">BK</option>
          <option value="WP">WP</option>
        </select>

        <select
          className={lightMode ? "dropdown" : "DMdropdown"}
          value={pitchYearID}
          onChange={(e) => setPitchYearID(parseInt(e.target.value, 10))}
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {" "}
              {year}{" "}
            </option>
          ))}
        </select>

        <select
          className={lightMode ? "dropdown" : "DMdropdown"}
          value={pitchOrderDirection}
          onChange={(e) => setPitchOrderDirection(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="Players">
        <div className="nameList">
          {listOfPlayers.pitchingLeaders.map((player) => (
            <div className="player" key={player.playerID}>
              <ul id="pitchingList">
                <li>{player[pitchingStatistic]}</li>
                <li>
                  <Link to={`/players/${player.playerID}`}>
                    {player.nameFirst} {player.nameLast}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div> */}

<div className="row">
        <div className="inner-row-item">
          <div> {/* className="subTitle" */}
            <h3>Fielding</h3>
          </div>
        </div>
        <div className="inner-row-item">
        <select
            className={lightMode ? "dropdown" : "DMdropdown2"}
            value={fieldYearID}
            onChange={(e) => setFieldYearID(e.target.value)}
          >
            {allYears.map((year) => (
              <option key={year} value={year}>
                {" "}
                {year}{" "}
              </option>
            ))}
        </select>
        </div>
      </div>

      { listOfPlayers?.fieldingLeaders?.[0]? ( 

        <div>
        <table className={lightMode ? "blackBG" : "whiteBG"}>
          <thead>
            <tr className={lightMode ? "SimpleTableHeader" : "DMSimpleTableHeader"}>
              {/* Merge the first three columns into one */}
              <th>
                <td>
                  <button 
                    className={lightMode ? "colButton" : "DMcolButton"} 
                    onClick={() => {
                      if (fieldingStatistic === 'nameLast') {
                        if (fieldingOrderDirection === 'asc'){
                          setFieldingOrderDirection('desc');
                        }
                        else{
                          setFieldingOrderDirection('asc')
                        }
                      } else {
                        setFieldingStatistic('nameLast');
                      }
                    }}
                  >
                    Player
                  </button>
                </td>
              </th>
              {Object.keys(listOfPlayers.fieldingLeaders[0]).slice(3).map((col, index) => (
                <th key={index + 1}>
                  <td>
                    <button
                      className={lightMode ? "colButton" : "DMcolButton"} 
                      onClick={() => {
                        if (fieldingStatistic === col.toString()) {
                          if (fieldingOrderDirection === 'asc'){
                            setFieldingOrderDirection('desc');
                          }
                          else{
                            setFieldingOrderDirection('asc')
                          }
                        } else {
                          setFieldingStatistic(col.toString());
                        }
                      }}
                    >
                      {col}
                    </button>
                  </td>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={lightMode?"SimpleTableListItem":"DMSimpleTableListItem"}>
            {listOfPlayers.fieldingLeaders.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Combine the first three columns into one cell */}
                <td>
                  <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/players/${row[Object.keys(listOfPlayers.battingLeaders[0])[0]]}`}>
                    {row[Object.keys(listOfPlayers.fieldingLeaders[0])[1]]} {row[Object.keys(listOfPlayers.fieldingLeaders[0])[2]]}
                  </Link>
                </td>
                {Object.keys(listOfPlayers.fieldingLeaders[0]).slice(3).map((col, colIndex) => (
                  <td key={colIndex + 1}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        ) : (
        <p>No Fielding Statistics Available</p>
        )}

      {/* <div className={lightMode ? "dropdown" : "DMdropdown"}>
        <select
          className={lightMode ? "dropdown" : "DMdropdown"}
          value={fieldingStatistic}
          onChange={(e) => setFieldingStatistic(e.target.value)}
        >
          <option value="Inn">Inn</option>
          <option value="GS">GS</option>
          <option value="PO">PO</option>
          <option value="A">A</option>
          <option value="E">E</option>
          <option value="DP">DP</option>        
        </select>

        <select
          className={lightMode ? "dropdown" : "DMdropdown"}

          
          value={fieldYearID}
          onChange={(e) => setFieldYearID(parseInt(e.target.value, 10))}
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {" "}
              {year}{" "}
            </option>
          ))}
        </select>

        <select
          className={lightMode ? "dropdown" : "DMdropdown"}
          value={fieldingOrderDirection}
          onChange={(e) => setFieldingOrderDirection(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="Players">
        <div className="nameList">
          {listOfPlayers.fieldingLeaders.map((player, key) => (
            <div className="player" key={key}>
              <ul>
                <li>{player[fieldingStatistic]}</li>
                <li>
                  <Link to={`/players/${player.playerID}`}>
                    {player.nameFirst} {player.nameLast}
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div> */}
      <h3> </h3>
    </div>
  );
}

export default Leaderboard;
