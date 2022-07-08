async function parseJSON(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = event => {
      /** @type {string} */
      const result = event.target.result;
      const parsed = JSON.parse(result);
      resolve(parsed);
    }
    fileReader.onerror = error => reject(error);
  });
}

function buildScenario(json) {
  let scenarioInfo = json.reduce((pValue, cValue) =>({
    maxBoundingBox: {
      bottomLeft: {
        x: (cValue.boundingBox.bottomLeft.x < pValue.maxBoundingBox.bottomLeft.x) ? cValue.boundingBox.bottomLeft.x : pValue.maxBoundingBox.bottomLeft.x,
        y: (cValue.boundingBox.bottomLeft.y < pValue.maxBoundingBox.bottomLeft.y) ? cValue.boundingBox.bottomLeft.y : pValue.maxBoundingBox.bottomLeft.y
      },
      topRight: {
        x: (cValue.boundingBox.topRight.x > pValue.maxBoundingBox.topRight.x) ? cValue.boundingBox.topRight.x : pValue.maxBoundingBox.topRight.x,
        y: (cValue.boundingBox.topRight.y > pValue.maxBoundingBox.topRight.y) ? cValue.boundingBox.topRight.y : pValue.maxBoundingBox.topRight.y
      }
    },
    nSteps: ++pValue.nSteps
  }), 
  {
    maxBoundingBox: {
      bottomLeft: {
        x: Infinity,
        y: Infinity
      },
      topRight: {
        x: -Infinity,
        y: -Infinity
      }
    },
    nSteps: 0
  })
  return {
    ...scenarioInfo,
    simulationSteps: json
  }
}

function setUpSvg(windowHeight, windowWidth, maxBoundingBox) {
  console.log(maxBoundingBox);
  let vbH = maxBoundingBox.topRight.y - maxBoundingBox.bottomLeft.y;
  let vbW = maxBoundingBox.topRight.x - maxBoundingBox.bottomLeft.x;
  console.log(`${windowHeight} x ${windowWidth}`)
  return{
    svgH: (windowHeight < windowWidth) ? windowHeight : windowWidth * (vbH/vbW),
    svgW: (windowHeight >= windowWidth) ? windowWidth : windowHeight * (vbW/vbH),
    maxVbH: vbH,
    maxVbW: vbW,
    maxVbY: maxBoundingBox.bottomLeft.y,
    maxVbX: maxBoundingBox.bottomLeft.x,
    bodiesSize: (vbH > vbW) ? vbH/100 : vbW/100,
    velocityRatio: (vbH > vbW) ? vbH/1000 : vbW/1000
  };
}

const utils = {
  parseJSON,
  buildScenario,
  setUpSvg
}

export {utils}