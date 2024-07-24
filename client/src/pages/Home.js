import { React, useEffect, useState } from 'react';
import RacingBarChart from '../components/RacingBarDisplay/RacingBarChart';
import Timer from '../components/RacingBarDisplay/Timer';
import addColours from '../components/RacingBarDisplay/ColourFinder';

/*import { lightMode, setLightMode } from '../App.js';*/

function Home({ lightMode, setLightMode }) {
  /*const { lightMode, setLightMode } = useContext(lightMode);*/

  const [year, setYear] = useState(1871);
  //const [limit, setLimit] = useState(10); // Currently hardcoded at 6
  const [start, setStart] = useState(false);
  const [data, setData] = useState([]); // list of leading franchises

  useEffect(() => {
    fetch(`http://localhost:3001/barleaders?yearID=${year}&limit=6`, {
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
          const dataWithColours = addColours(data);
          setData(dataWithColours);
          console.log(dataWithColours)
        }
      })
      .catch((error) => console.log("ERROR", error));
  }, [year]) //limit

  Timer(() => {
    if (start) {
      if (year >= 2022) {
        setStart(false);
      }
      setYear((prevYear) => prevYear + 1);
    }
  }, 600);

  const handleStartStop = () => {
    setStart(!start)
    if (year >= 2023) {
      setYear(1871)
    }
  };

  const restart = () => {
    setYear(1871)
  }

  return (
    <div>
      <div className="pageTitle">
        <h1>⚾ DataBaseBall ⚾</h1>
      </div>
      <div className="bottom-chunk">
        <h1>Franchise Win Leaders Over The Years</h1>
        <RacingBarChart data={data} />
        <button onClick={handleStartStop}>
          {start ? "Stop" : "Start"}
        </button>
        <button onClick={restart}>
          Restart
        </button>
        <p>Year: {year}</p>
      </div>
    </div>
  );
}

export default Home;
