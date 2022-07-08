import React from 'react';
import SvgRectangle from './svgRectangle';
import SvgCircle from './svgCircle';

function SvgQuadtreeNode({quadtree, bodiesSize}) {

  function computeOutput(quadtree, bodiesSize){
    if(quadtree?.leaf && quadtree.leaf.body) {
      return (
        <>
          <SvgRectangle 
            x={quadtree.boundingBox.bottomLeft.x} y={quadtree.boundingBox.bottomLeft.y} 
            width={quadtree.boundingBox.topRight.x - quadtree.boundingBox.bottomLeft.x}
            height={quadtree.boundingBox.topRight.y - quadtree.boundingBox.bottomLeft.y}
          />
          <SvgCircle x={quadtree.leaf.body.position.x} y={quadtree.leaf.body.position.y} r={bodiesSize}/>
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
          <SvgQuadtreeNode quadtree={quadtree.fork.nw} bodiesSize={bodiesSize}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.ne} bodiesSize={bodiesSize}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.se} bodiesSize={bodiesSize}/>
          <SvgQuadtreeNode quadtree={quadtree.fork.sw} bodiesSize={bodiesSize}/>
        </>
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