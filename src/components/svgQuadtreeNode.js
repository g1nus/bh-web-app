import React from 'react';
import SvgBoundingBox from './svgBoundingBox';
import SvgBody from './svgBody';

function SvgQuadtreeNode({quadtree, bodiesSize, velocityRatio}) {

  function computeOutput(quadtree, bodiesSize){
    if(quadtree?.leaf && quadtree.leaf.body) {
      return (
        <g>
          <SvgBoundingBox 
            x={quadtree.boundingBox.bottomLeft.x} y={quadtree.boundingBox.bottomLeft.y} 
            width={quadtree.boundingBox.topRight.x - quadtree.boundingBox.bottomLeft.x}
            height={quadtree.boundingBox.topRight.y - quadtree.boundingBox.bottomLeft.y}
          />
          <SvgBody x={quadtree.leaf.body.position.x} y={quadtree.leaf.body.position.y} r={bodiesSize} 
                   vx={quadtree.leaf.body.velocity.x} vy={quadtree.leaf.body.velocity.y}
                   vr={velocityRatio}/>
        </g>
      )
    }else if(quadtree?.leaf){
      return (
        <SvgBoundingBox 
          x={quadtree.boundingBox.bottomLeft.x} y={quadtree.boundingBox.bottomLeft.y} 
          width={quadtree.boundingBox.topRight.x - quadtree.boundingBox.bottomLeft.x}
          height={quadtree.boundingBox.topRight.y - quadtree.boundingBox.bottomLeft.y}
        />
      )
    }else if(quadtree?.fork){
      return (
        <g>
          <SvgBoundingBox 
            x={quadtree.boundingBox.bottomLeft.x} y={quadtree.boundingBox.bottomLeft.y} 
            width={quadtree.boundingBox.topRight.x - quadtree.boundingBox.bottomLeft.x}
            height={quadtree.boundingBox.topRight.y - quadtree.boundingBox.bottomLeft.y}
          />
          <SvgQuadtreeNode quadtree={quadtree.fork.nw} bodiesSize={bodiesSize} velocityRatio={velocityRatio}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.ne} bodiesSize={bodiesSize} velocityRatio={velocityRatio}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.se} bodiesSize={bodiesSize} velocityRatio={velocityRatio}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.sw} bodiesSize={bodiesSize} velocityRatio={velocityRatio}/>
        </g>
      )
    }

    return (
      <></>
    )
    
  }

  return (
    computeOutput(quadtree, bodiesSize)
  );
}

export default SvgQuadtreeNode;