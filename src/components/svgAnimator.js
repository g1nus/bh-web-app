import React, { useEffect, useRef, useState } from 'react';
import {utils} from "./../utils/utils";
import SvgQuadtreeNode from './svgQuadtreeNode';

function SvgAnimator({scenario}) {

  const [svgInfo, setSvgInfo] = useState(
    {svgH: 0, svgW: 0, vbH: 0, vbW: 0, vbY: 0, vbX: 0, displayMaxBBox: true, bodiesSize: null, velocityRatio: 0}
  );

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
          if(stepIndex.current < scenario.simulationSteps.length){
            animate();
          }
      }, timeInterval.current);
    }
    if(scenario.simulationSteps.length > 0 && svgInfo.bodiesSize !== null){
      console.log("START ANIMATION");
      setCurrStep(scenario.simulationSteps[stepIndex.current].quadtree);
      animate();
    }
  }, [svgInfo, scenario.simulationSteps])

  function updateTimeInterval(event){
    if(event.target.value > 0 && event.target.value < 5000){
      timeInterval.current = event.target.value;
    }
  }

  return (
    <>
      <svg width={svgInfo.svgW} height={svgInfo.svgH} viewBox={`${svgInfo.vbX} ${svgInfo.vbY} ${svgInfo.vbW} ${svgInfo.vbH}`}>
        {
          (svgInfo.bodiesSize != null) ? <SvgQuadtreeNode quadtree={currStep} bodiesSize={svgInfo.bodiesSize} velocityRatio={svgInfo.velocityRatio}/> : <></>
        }
      </svg>
      <input type="number" id="sleep" name="sleep" min="0" max="5000" defaultValue={timeInterval.current} onChange={updateTimeInterval}/>
    </>
  );
}

export default SvgAnimator;