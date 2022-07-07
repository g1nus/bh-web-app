import React from 'react';

function SvgRectangle({x,y,width, height}) {
  return (
    <>
      <rect x={x} y={y} width={width} height={height} style={{fill:"none",strokeWidth:"3",stroke:"rgb(0,0,0)"}} />
    </>
  );
}

export default SvgRectangle;