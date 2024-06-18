import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Leaderboard page

function Leaderboard() {
    const [listOfPlayers, setListOfPlayers] = useState([]);
    const [column, setColumn] = useState('birthYear');
    const [orderDirection, setOrderDirection] = useState('asc');
    
    useEffect(() => {
        console.log("User submitted: ", column, orderDirection)
        try {
            fetch(`http://localhost:3001/leaderboard?column=${encodeURIComponent(column)}&orderDirection=${encodeURIComponent(orderDirection)}`)
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
                  setListOfPlayers(data);
                }
              })
              .catch((error) => console.log("ERROR", error));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }, [column, orderDirection])

    return (
      <div>
        <div>
          <select value={column} onChange={(e) => setColumn(e.target.value)}>
            <option value="birthYear">Birth Year</option>
            <option value="weight">Weight</option>
            <option value="height">Height</option>
          </select>

          <select
            value={orderDirection}
            onChange={(e) => setOrderDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {listOfPlayers.map((player) => (
          <div className="player" key={player.playerID}>
            <Link to={`/allplayers/${player.playerID}`}>
              {player.nameFirst} {player.nameLast} 
            </Link> {player[column]}
          </div>
        ))}
      </div>
    );

}

export default Leaderboard;

/*
{listOfPlayers.map((player) => (
          <div key={player.playerID}> { TODO: unique key <div key={`${player.playerID}-${player.year}-${player.stint}`}>}
          <h2>{player.playerID}</h2> 
          <p>Home Runs: {player.HR}</p>
          <p>Games Played: {player.G}</p>
        </div>
      ))}
*/

// BUG: 