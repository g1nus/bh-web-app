import React from 'react';

function SvgBody({x,y,r, vx, vy, vr}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} style={{fill:"black",strokeWidth:"3",stroke:"rgb(0,0,0)"}} />
      <line x1={x} y1={y} x2={x + (vx*vr)} y2={y + (vy*vr)} stroke="green" vectorEffect="non-scaling-stroke"/>
    </g>
  );
}

export default SvgBody;