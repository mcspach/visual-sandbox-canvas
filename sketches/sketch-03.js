const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(1, width);
    const y = random.range(1, height);
    agents.push(new Agent(x, y));
    }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if ( dist > 250 ) continue;

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      // agent.wrap(width, height);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.radius = random.range(4, 12);
    this.velocity = new Vector(random.range(-2, 2), random.range(-2, 2));
    }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.velocity.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.velocity.y *= -1;
  }

  wrap(width, height) {
    if ( this.pos.x < 0 ) this.pos.x = width;
    if ( this.pos.y < 0 ) this.pos.y = height;
    if ( this.pos.x > width ) this.pos.x = 0;
    if ( this.pos.y > height ) this.pos.y = 0;
  }

  draw(context) {
    // context.fillStyle = 'black';

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.lineWidth = 2;
    context.fill();
    context.stroke();

    context.restore();
  }
}
