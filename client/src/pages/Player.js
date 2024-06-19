// Single Player component 
// To be in Leaderboard, Players

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Player() {
    const { playerID } = useParams();
    const [PlayerStats, setPlayerStats] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/allplayers/${playerID}`, {                                            
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
              console.log("FETCHED: ", data, " from ", playerID)
            }
          })
          .catch((error) => console.log("ERROR", error));
      }, [playerID]);


    return (
        <div>
            {PlayerStats.map((player, key) => (
          <div key={player.playerID}> {/* TODO: unique key <div key={`${player.playerID}-${player.year}-${player.stint}`}>*/}
            <h2>{player.nameFirst} {player.nameLast}</h2> 
            <p>Birthdate: {`${player.birthMonth}-${player.birthDay}-${player.birthYear}`}</p>
            <p>Other stuff about these dudes here</p>
          </div>
        ))}

        </div>
    )
}

export default Player;