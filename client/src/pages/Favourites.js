import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favourites() {
  const [listOfFavourites, setListOfFavourites] = useState({
    favouriteFranchises: [],
    favouriteTeams: [],
    favouritePlayers: [],
  });
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    fetch(`http://localhost:3001/favourites/${userID}`, {
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
          setListOfFavourites(data);
        }
      })
      .catch((error) => console.log("ERROR", error));
  }, [userID]);

  return (
    <div>
      <div className="pageTitle">
        <h2>Your Favourites</h2>
      </div>
      <div className="subTitle">
        <h3>Favourite Franchises</h3>
        {listOfFavourites.favouriteFranchises.map((franchise, key) => (
          <div key={key}>
            <Link to={`/franchises/${franchise.franchiseID}`}>
              {franchise.franchiseName}
            </Link>
          </div>
        ))}
        <h3>Favourite Teams</h3>
        {listOfFavourites.favouriteTeams.map((team, key) => (
          <div key={key}>
            <Link to={`/teams/${team.teamID}/${team.yearID}`}>
              {team.name} {team.yearID}
            </Link>
          </div>
        ))}
        <h3>Favourite Players</h3>
        {listOfFavourites.favouritePlayers.map((player, key) => (
          <div key={key}>
            <Link to={`/players/${player.playerID}`}>
              {player.nameFirst} {player.nameLast}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
