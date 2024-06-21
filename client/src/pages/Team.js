import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Team() {
    const { teamID } = useParams();
    const [teamStats, setTeamStats] = useState({
        teamBio: [],
        totalBattersForTeam: [],
        allBattersForTeam: [],
        totalPitchersForTeam: [],
        allPitchersForTeam: []
    });
  
    useEffect(() => {
      fetch(`http://localhost:3001/teams/${teamID}`, {
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
            setTeamStats(data);
            console.log("FETCHED: ", data, " from ", teamID);
          }
        })
        .catch((error) => console.log("ERROR", error));
    }, [teamID]);

    return (

        <div></div>
    )

}

export default Team
