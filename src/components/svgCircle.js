import React from 'react';

function SvgCircle({x,y,r}) {
  return (
    <circle cx={x} cy={y} r={r} style={{fill:"blue",strokeWidth:"3",stroke:"rgb(0,0,0)"}} />
  );
}

export default SvgCircle;