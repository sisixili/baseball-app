import { React, useEffect, useState } from 'react';
import RacingBarChart from '../components/RacingBarDisplay/RacingBarChart';
import Timer from '../components/RacingBarDisplay/Timer';
import addColours from '../components/RacingBarDisplay/ColourFinder';

/*import { lightMode, setLightMode } from '../App.js';*/

function Home({ lightMode, setLightMode }) {
  /*const { lightMode, setLightMode } = useContext(lightMode);*/

  const [year, setYear] = useState(1871);
  const [start, setStart] = useState(false);
  const [data, setData] = useState([]); // list of leading franchises

  useEffect(() => {
    fetch(`http://localhost:3001/barleaders?yearID=${year}&limit=6`, {
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
          const dataWithColours = addColours(data);
          setData(dataWithColours);
        }
      })
      .catch((error) => console.log("ERROR", error));
  }, [year]) 

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
        <h2>Franchise Win Leaders Over The Years</h2>

        <h3>Year: {year}</h3>

        <div className="graphText">
          <RacingBarChart className="graphText" data={data} />
        </div>

        <button className={lightMode ? "graphButton" : "DMgraphButton"} onClick={handleStartStop}>
          {start ? "Stop" : "Start"}
        </button>
        &ensp;
        <button className={lightMode ? "graphButton" : "DMgraphButton"} onClick={restart}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default Home;
