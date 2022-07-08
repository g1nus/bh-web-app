import React, {useRef} from 'react';
import SvgUpload from '../components/svgUpload';
import {utils} from "./../utils/utils";

function Home({setScenario, setLoading}) {

  const hiddenFileInput = useRef(null);

  async function fileParse(event){
    setLoading(true);
    try{
      const file = event.target.files[0];
      const json = await utils.parseJSON(file);
      setScenario(utils.buildScenario(json));
      setLoading(false);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div id="home-view">
      <h1 id="title">
        View a Barnes Hut simulation
      </h1>
      <input type="file" id="file-selector" onChange={fileParse} accept=".json" ref={hiddenFileInput} style={{display: 'none'}}/>
      <input type="button" id="file-cover" value="Upload JSON..." onClick={(event) => hiddenFileInput.current.click()}/>
      <SvgUpload/>
    </div>
  );
}

export default Home;