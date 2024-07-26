import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favourites({lightMode, setLightMode}) {
  const [listOfFavourites, setListOfFavourites] = useState({
    favouriteFranchises: [],
    favouriteTeams: [],
    favouritePlayers: [],
  });
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    fetch(`http://localhost:3001/favourites/${userID}`, {
      credentials: 'include',
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
        <h3> </h3>
        <div className={lightMode ? "favHeader" : "dmfavHeader"}><h3 className="boxMargins">Favourite Franchises</h3></div>
        <div className={lightMode?"favlistgap":"DMfavlistgap"}>
          {listOfFavourites.favouriteFranchises.map((franchise, key) => (
            <div className={lightMode?"favList":"DMfavList"} key={key}>
              <div className="boxMargins">
              <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/franchises/${franchise.franchiseID}`}>
                {franchise.franchiseName}
              </Link>
              </div>
            </div>
          ))}
          <p> </p>
        </div>
        <p> </p>
        <div className={lightMode ? "favHeader" : "dmfavHeader"}><h3 className="boxMargins">Favourite Teams</h3></div>
        <div className={lightMode?"favlistgap":"DMfavlistgap"}>
          {listOfFavourites.favouriteTeams.map((team, key) => (
            <div className={lightMode?"favList":"DMfavList"} key={key}>
              <div className="boxMargins">
              <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/teams/${team.teamID}/${team.yearID}`}>
                {team.name} {team.yearID}
              </Link>
              </div>
            </div>
          ))}
          <p> </p>
        </div>
        <p> </p>
        <div className={lightMode ? "favHeader" : "dmfavHeader"}><h3 className="boxMargins">Favourite Players</h3></div>
        <div className={lightMode?"favlistgap":"DMfavlistgap"}>
          {listOfFavourites.favouritePlayers.map((player, key) => (
            <div className={lightMode?"favList":"DMfavList"} key={key}>
              <div className="boxMargins">
              <Link className={lightMode?"tableLinks":"DMtableLinks"} to={`/players/${player.playerID}`}>
                {player.nameFirst} {player.nameLast}
              </Link>
              </div>
            </div>
          ))}
          <p> </p>
        </div>
      </div>
      <h3 className="fav-footer"> </h3>
    </div>
  );
}

export default Favourites;
