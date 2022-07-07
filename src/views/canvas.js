import React from 'react';
import SvgAnimator from '../components/svgAnimator';

function Canvas({scenario}) {

  return (
    <div id="svg-wrapper">
      <SvgAnimator {...{scenario}}/> 
    </div>
  );
}

export default Canvas;