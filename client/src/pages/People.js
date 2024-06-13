import React from "react";
import { useEffect, useState } from "react";

function People() {
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
    <div className="People">
        <input
        name="person"
        onChange={handleChange}
        placeholder="Search by given Name"
      />
      {listOfForms.filter(checkName).map((person, key) => (
        <div className="personName" key={person.ID}>
          <h4>
            {person.nameGiven} {/* CAN ADD MORE FIELDS */}
          </h4> 
        </div>
      ))}
    </div>
  );
}

export default People;