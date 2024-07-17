import React from 'react';
/*import { lightMode, setLightMode } from '../App.js';*/

function Home({ lightMode, setLightMode }) {
  /*const { lightMode, setLightMode } = useContext(lightMode);*/
  return (
    <div className={lightMode ? 'App' : 'DMApp'}>
      <div className={lightMode ? 'lmbody' : 'dmbody'}>
        <div className="pageTitle">
            <h1>⚾ DataBaseBall ⚾</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
