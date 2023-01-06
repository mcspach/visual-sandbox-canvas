const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const windowW = window.innerWidth;
const windowH = window.innerHeight;

const settings = {
  dimensions: [ 2048, 2048 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  
    context.fillStyle = 'pink';
    const cx = 1080;
    const cy = 1080;
    const w = 25;
    const h = height*.6;
    let x, y;

    const num = 30; 
    const radius = width*.25;

    for (let i = 0; i < num; i++) {
    
      const slice = math.degToRad(360 / num);
      const angle = slice*i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle); 
      
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(1,4),1);

      context.beginPath();
      context.rect(w*.5, random.range(0, -h*0.5), w*0.5, h*0.5);
      context.fill();

      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(10,50);

      context.beginPath();
      context.arc(
        0, 
        0, 
        random.range(radius*.5, radius*.5), 
        random.range(1, -2), 
        random.range(1, -2)
      );
      context.stroke();
      
      context.restore();
      
    }
  };
};

canvasSketch(sketch, settings);

