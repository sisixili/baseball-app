import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Search All Franchises page

function Franchises() {
  const [listOfFranchises, setListOfFranchises] = useState({
    activeFranchises: [],
    nonActiveFranchises: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/franchises", {
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
          setListOfFranchises(data);
        }
      })
      .catch((error) => console.log("ERROR", error));
  }, []);

  return (
    <div>
      <div className="pageTitle">
        <h2>Franchises</h2>
      </div>
      <div className="subTitle">
      <div className="franHeader"><h3 className="boxMargins">All Active Franchises</h3></div>
      
      <div className="Players">
        <div className="franList">
        <div className="nameList">
          {listOfFranchises.activeFranchises.map((franchise, key) => (
            <div className="player" key={key}>
              <div className="nameList">
              <Link to={`/franchises/${franchise.franchiseID}`}>
                {franchise.franchiseName}
              </Link>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <h3> </h3>

      <div className="franHeader"><h3 className="boxMargins">All Non-Active Franchises</h3></div>

      <div className="Players">
        <div className="franList">
        <div className="nameList">
          {listOfFranchises.nonActiveFranchises.map((franchise, key) => (
            <div className="player" key={key}>
              <div className="nameList">
                <Link to={`/franchises/${franchise.franchiseID}`}>
                  {franchise.franchiseName}
                </Link>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      <h3 className="ListWrap"> </h3>
      </div>
    </div>
  );
}

export default Franchises;
