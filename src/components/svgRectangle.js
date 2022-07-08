import React from 'react';

function SvgRectangle({x,y,width, height}) {
  return (
    <>
      <rect x={x} y={y} width={width} height={height} style={{fill:"none",strokeWidth:"0.5",stroke:"rgb(200,200,200)"}} vectorEffect="non-scaling-stroke" />
    </>
  );
}

export default SvgRectangle;