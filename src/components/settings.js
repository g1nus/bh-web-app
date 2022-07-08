import React, { useState } from 'react';
import SvgSettings from './svgSettings';

function Settings({timeInterval, updateTimeInterval, displayMaxBBox, toggleMaxBBox}) {

  const [displaySetting, setDisplaySetting] = useState(false);

  function toggleDisplaySetting() {
    setDisplaySetting(!displaySetting);
  }

  return (
    <div id="settings-wrapper">
      <button id="toggle-settings" type="button" onClick={toggleDisplaySetting}>
        <SvgSettings/>
      </button>
      {
        (displaySetting) ? 
          <div id="settings">
            <label id="s" htmlFor='sleep'>Animation sleep time</label>
            <input type="number" id="sleep" name="sleep" min="0" max="5000" defaultValue={timeInterval.current} onChange={updateTimeInterval}/>
            <label id="vb" htmlFor="view-box">Use max viewbox as viewbox</label>
            <input type="checkbox" id="view-box" name="view-box" value="Max" checked={displayMaxBBox} onChange={toggleMaxBBox}/>
          </div>
        :
          <></>
      }
    </div>
  );
}

export default Settings;