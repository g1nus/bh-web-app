import React from 'react';

function SvgBoundingBox({x,y,width, height}) {
  return (
    <>
      <rect x={x} y={y} width={width} height={height} style={{fill:"none",strokeWidth:"1", opacity:"0.1", stroke:"rgb(30,30,30)"}} vectorEffect="non-scaling-stroke" />
    </>
  );
}

export default SvgBoundingBox;