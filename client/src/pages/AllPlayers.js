import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Search All Players page

/* TODO: implement pagination
*/

function Players() {
    const [listOfPlayers, setListOfPlayers] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/players", {
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
              setListOfPlayers(data);
            }
          })
          .catch((error) => console.log("ERROR", error));
      }, []);

    function handleChange(event) {
        setName(event.target.value);
    }
    
    function checkName(player) {
        return player.nameLast.toLowerCase().includes(name.toLowerCase());
    }

  return (
    <div className="Players">
        <input
        onChange={handleChange}
        placeholder="Search by Last name"
      />
      {listOfPlayers.filter(checkName).map((player) => (
        <div className="player" key={player.playerID}>
          <Link to={`/players/${player.playerID}`}>
            {player.nameFirst} {player.nameLast}
          </Link>    
        </div>
      ))}
    </div>
  );
}

export default Players;
