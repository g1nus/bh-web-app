import React, { useEffect, useRef, useState } from 'react';
import {utils} from "./../utils/utils";
import Settings from './settings';
import SvgQuadtreeNode from './svgQuadtreeNode';

function SvgAnimator({scenario}) {

  const [svgInfo, setSvgInfo] = useState(
    {svgH: 0, svgW: 0, maxVbH: 0, maxVbW: 0, maxVbY: 0, maxVbX: 0, bodiesSize: null, velocityRatio: 0}
  );

  const [displayMaxBBox, setDisplayMaxBBox] = useState(true);

  const [currStep, setCurrStep] = useState([]);

  const timeInterval = useRef(200);
  const stepIndex = useRef(0);

  useEffect(() => {
    setSvgInfo(utils.setUpSvg(window.innerHeight, window.innerWidth, scenario.maxBoundingBox))
  }, [scenario])

  useEffect(() => {
    console.log("ANIMATION HOOK CALLED");
    function animate() {
      setTimeout(() => {
          setCurrStep(scenario.simulationSteps[stepIndex.current].quadtree);
          stepIndex.current++;
          console.log(timeInterval.current)
          if(stepIndex.current < scenario.simulationSteps.length){
            animate();
          }
      }, timeInterval.current);
    }
    if(scenario.simulationSteps.length > 0){
      console.log("START ANIMATION");
      setCurrStep(scenario.simulationSteps[stepIndex.current].quadtree);
      animate();
    }
  }, [scenario.simulationSteps])

  function updateTimeInterval(event){
    if(event.target.value > 0 && event.target.value < 5000){
      timeInterval.current = event.target.value;
    }
  }

  function toggleMaxBBox(){
    setDisplayMaxBBox(!displayMaxBBox);
  }

  return (
    <>
      <Settings timeInterval={timeInterval} updateTimeInterval={updateTimeInterval} displayMaxBBox={displayMaxBBox} toggleMaxBBox={toggleMaxBBox}/>
      <svg id="animator" width={svgInfo.svgW} height={svgInfo.svgH} viewBox={
        (displayMaxBBox) ?
          `${svgInfo.maxVbX} ${svgInfo.maxVbY} ${svgInfo.maxVbW} ${svgInfo.maxVbH}`
        :
          `${currStep.boundingBox.bottomLeft.x} ${currStep.boundingBox.bottomLeft.y} ${currStep.boundingBox.topRight.x - currStep.boundingBox.bottomLeft.x} ${currStep.boundingBox.topRight.y - currStep.boundingBox.bottomLeft.y}`
        }>
        {
          (svgInfo.bodiesSize != null) ? <SvgQuadtreeNode quadtree={currStep} bodiesSize={
            (displayMaxBBox) ?
              svgInfo.bodiesSize
            :
              ((currStep.boundingBox.topRight.x - currStep.boundingBox.bottomLeft.x)/100)
          } velocityRatio={svgInfo.velocityRatio}/> : <></>
        }
      </svg>
    </>
  );
}

export default SvgAnimator;