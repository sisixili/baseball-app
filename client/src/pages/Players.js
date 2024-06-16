import React from "react";
import { useEffect, useState } from "react";

function Players() {
    const [listOfForms, setListOfForms] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        // fetch always succeeds (besides network error), so need additional error checking
        fetch("http://localhost:3001/people", {})
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
              setListOfForms(data);
            }
          })
          .catch((error) => console.log("ERROR", error));
      }, []);

    function handleChange(event) {
        setName(event.target.value);
    }
    
    function checkName(person) {
        return person.nameGiven.toLowerCase().includes(name.toLowerCase());
    }

  return (
    <div className="Players">
        <input
        name="player"
        onChange={handleChange}
        placeholder="Search by last name"
      />
      {listOfForms.filter(checkName).map((player, key) => (
        <div className="playerName" key={player.ID}>
          <h4>
            {player.nameFirst} {player.nameLast} {/* CAN ADD MORE FIELDS */}
          </h4> 
        </div>
      ))}
    </div>
  );
}

export default Players;


/*

- USE QUERY BUILDERS SISI
- Do all SQL querying at backend
- Minimize frontend filtering (just animation)

- START with login (automatic redirect)
- After login, can access homepage and everything else

*/