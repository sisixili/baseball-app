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
        <h2>All Active Franchises</h2>
      </div>

      <div className="Players">
        <div className="NameList">
          {listOfFranchises.activeFranchises.map((franchise, key) => (
            <div className="player" key={key}>
              <Link to={`/franchises/${franchise.franchiseID}`}>
                {franchise.franchiseName}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="pageTitle">
        <h2>All Non-Active Franchises</h2>
      </div>

      <div className="Players">
        <div className="NameList">
          {listOfFranchises.nonActiveFranchises.map((franchise, key) => (
            <div className="player" key={key}>
              <Link to={`/franchises/${franchise.franchiseID}`}>
                {franchise.franchiseName}
              </Link>
            </div>
          ))}
          <h4 className="ListWrap"> </h4>
        </div>
      </div>
    </div>
  );
}

export default Franchises;
