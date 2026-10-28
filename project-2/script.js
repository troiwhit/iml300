let sleet = [];
const numberOfStreaks = 450;


function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeCap (ROUND);

  for (let i = 0; i<numberOfStreaks; i++) {
    sleet.push(new Streak());
  }
}

function draw() {
  background(0);
  let step = min(deltaTime/16.67,2);
  for (let streak of sleet) {
    streak.move(step);
    streak.show();
  }
}
class Streak {
  constructor() {
    this.setAppearance();
    this.x=random(width);
    this.y=random(height);
    
  }
  setAppearance() {
    this.length = random(20,85);
    this.speed = random(10,23);
    this.brightness = random(70,220);
    this.weight = random(0.5,1.2);
  }
move(step) {
  this.x -= this.speed*0.25*step;
  this.y += this.speed * step;
  if (
      this.y > height + this.length ||
      this.x < -this.length
    ) {
      this.reset();
    }
  }

  reset() {
    this.setAppearance();
    let topWeight = width;
    let rightWeight = height * 0.25;

    if (random(topWeight + rightWeight) < topWeight) {
      this.x = random(width);
      this.y = -this.length;
    } else {
      this.x = width + this.length * 0.25;
      this.y = random(height);
    }
  }

  show() {
    stroke(255, this.brightness);
    strokeWeight(this.weight);

    line(
      this.x,
      this.y,
      this.x + this.length * 0.25,
      this.y - this.length
    );
  }
}
