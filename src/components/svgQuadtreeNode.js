import React from 'react';
import SvgRectangle from './svgRectangle';
import SvgCircle from './svgCircle';

function SvgQuadtreeNode({quadtree}) {

  function computeOutput(quadtree){
    if(quadtree?.leaf && quadtree.leaf.body) {
      return (
        <>
          <SvgRectangle 
            x={quadtree.boundingBox.bottomLeft.x} y={quadtree.boundingBox.bottomLeft.y} 
            width={quadtree.boundingBox.topRight.x - quadtree.boundingBox.bottomLeft.x}
            height={quadtree.boundingBox.topRight.y - quadtree.boundingBox.bottomLeft.y}
          />
          <SvgCircle x={quadtree.leaf.body.position.x} y={quadtree.leaf.body.position.y} r={100}/>
        </>
      )
    }else if(quadtree?.leaf){
      return (
        <SvgRectangle 
          x={quadtree.boundingBox.bottomLeft.x} y={quadtree.boundingBox.bottomLeft.y} 
          width={quadtree.boundingBox.topRight.x - quadtree.boundingBox.bottomLeft.x}
          height={quadtree.boundingBox.topRight.y - quadtree.boundingBox.bottomLeft.y}
        />
      )
    }else if(quadtree?.fork){
      return (
        <>
          <SvgRectangle 
            x={quadtree.boundingBox.bottomLeft.x} y={quadtree.boundingBox.bottomLeft.y} 
            width={quadtree.boundingBox.topRight.x - quadtree.boundingBox.bottomLeft.x}
            height={quadtree.boundingBox.topRight.y - quadtree.boundingBox.bottomLeft.y}
          />
          <SvgQuadtreeNode quadtree={quadtree.fork.nw}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.ne}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.se}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.sw}/>
        </>
      )
    }

    return (
      <></>
    )
    
  }

  return (
    computeOutput(quadtree)
  );
}

export default SvgQuadtreeNode;