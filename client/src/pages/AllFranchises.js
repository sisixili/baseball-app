import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Search All Frachises page

function Franchises() {
  const [listOfFranchises, setListOfFranchises] = useState({
    activeFranchises: [],
    nonActiveFranchises: [],
  });
  const [name, setName] = useState("");

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

  function handleChange(event) {
    setName(event.target.value);
  }

  function filterFranchises(franchiseArray) {
    return franchiseArray.filter(franchise =>
      franchise.franchiseName.toLowerCase().includes(name.toLowerCase())
    );
}

  const filteredActiveFranchises = filterFranchises(listOfFranchises.activeFranchises);
  const filteredNonActiveFranchises = filterFranchises(listOfFranchises.nonActiveFranchises);

  return (
    <div>
      <div className="pageTitle">
        <h2>Search All Franchises</h2>
      </div>
      <input
        class="input"
        onChange={handleChange}
        placeholder="Search by Franchise Name"
      />
      <div className="Players">
        <div className="NameList">
        {filteredActiveFranchises.map((franchise, key) => (
            <div className="player" key={key}>
              <Link to={`/franchises/${franchise.franchiseID}`}>
                {franchise.franchiseName}
              </Link>    
            </div>
          ))}
          {filteredNonActiveFranchises.map((franchise, key) => (
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
