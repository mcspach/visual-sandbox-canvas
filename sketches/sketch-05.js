const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const tp = require('tweakpane');

const params = {
  curves: 10,
  lines: 10,
  stroke: 3,
  minHeight: 10,
  maxHeight: 200,
  frame: 0,
  animate: true
};

const settings = {
  dimensions: [ 1000, 1000 ],
  animate: true
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const curves = params.curves + 2;
    const lines = params.lines + 1;

    const cellw = width / curves;
    const cellh = height / lines;

    for ( let i = cellh; i < height - cellh; i += cellh) {

      // the following three formulas have the same output variable.
      // const scale = (n + 1) / 2 * 30;
      // const scale = (n * 0.5 + 0.5) * 30;
      // const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
      context.save();

      context.lineWidth = params.stroke;
      context.beginPath();
      context.moveTo(0, i);

      for ( let j = cellw; j < width; j += cellw) {
        console.log('i', i, 'j', j);
        context.lineTo(j, i + random.range(params.minHeight, params.maxHeight)); 
        // context.lineTo(j, i + n);
      }
      context.stroke();
      }
      context.restore();

  };
};

const createPane = () => {
  const pane = new tp.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Lines'});
  folder.addInput(params, 'stroke', { min: 1, max: 30, step: 1});
  folder.addInput(params, 'lines', { min: 2, max: 100, step: 1});
  folder.addInput(params, 'curves', { min: 2, max: 100, step: 1});
  folder.addInput(params, 'minHeight', { min: 2, max: 100 });
  folder.addInput(params, 'maxHeight', { min: 2, max: 500 });

  folder = pane.addFolder({ title: 'Noise'});
//   folder.addInput(params, 'frequency', { min: -0.01, max: 0.01 });
//   folder.addInput(params, 'amplitude', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999});
}


createPane();
canvasSketch(sketch, settings);