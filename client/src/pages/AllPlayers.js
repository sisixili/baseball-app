import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Search All Players page

/* Current problem with AllPlayers: 
  In prod db, there will be thousands of entries in players...
  cannot load all of them and then filter.

  Possible solutions: 
  - Send SQL queries each time the user presses 'enter' and does a search
    (returns nothing until there is an exact match)
  - Pagination: display only (ex. 20) entries at a time, and go to the next page.
    (able to concat in frontend first and last names, and filter from there)

    Pagination is more professional...but it'll take me some time to figure it out
    so I'm leaning towards pagination being a "fancy" feature in later milestone
    Right now all players has the quick and dirty solution of selecting all b/c the db is small
*/

function Players() {
    const [listOfPlayers, setListOfPlayers] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/allplayers", {
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
          <Link to={`/allplayers/${player.playerID}`}>
            {player.nameFirst} {player.nameLast}
          </Link>    
        </div>
      ))}
    </div>
  );
}

export default Players;
