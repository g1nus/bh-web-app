import React, { useState } from 'react';
import Home from "./views/home"
import Loading from './views/loading';
import Canvas from './views/canvas';

function App() {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
      <div className="App">
        {
          (loading) ?
            <Loading/>
          :
            (
              (scenario == null) ?
                <Home {...{setScenario, setLoading}} />
              :
                <Canvas {...{scenario}}/>
            )
        }
      </div>
  );
}

export default App;
