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
        <div className="favHeader"><h3 className="boxMargins">Favourite Franchises</h3></div>
        {listOfFavourites.favouriteFranchises.map((franchise, key) => (
          <div className="favList" key={key}>
            <div className="boxMargins">
            <Link to={`/franchises/${franchise.franchiseID}`}>
              {franchise.franchiseName}
            </Link>
            </div>
          </div>
        ))}
        <h3> </h3>
        <div className="favHeader"><h3 className="boxMargins">Favourite Teams</h3></div>
        {listOfFavourites.favouriteTeams.map((team, key) => (
          <div className="favList" key={key}>
            <div className="boxMargins">
            <Link to={`/teams/${team.teamID}/${team.yearID}`}>
              {team.name} {team.yearID}
            </Link>
            </div>
          </div>
        ))}
        <h3> </h3>
        <div className="favHeader"><h3 className="boxMargins">Favourite Players</h3></div>
        {listOfFavourites.favouritePlayers.map((player, key) => (
          <div className="favList" key={key}>
            <div className="boxMargins">
            <Link to={`/players/${player.playerID}`}>
              {player.nameFirst} {player.nameLast}
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
