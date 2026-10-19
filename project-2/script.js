//Inspired by Mo Chuang's work titled "DIVERSE DEMOGRAPHIC OF AMERICA" but with a different perspective. This crowd of bodies are all uniform, besides their colors, saluting and all moving together in a still codified and routine pathway. I think this is a nod to the kind of performative advocacy of diversity that still maintains control over bodies and values homogeneity. Anything or anyone that dares to stand out is a disruption to that alleged "diversity." The bodies are traveling upward continuously and if the user hovers the mouse over the canvas, bodies near the mouse will get bigger/"stand out."
let bodyColors = ["white", "brown", "orange", "beige", "black"];
let moveY = 0;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(200);
  moveY -= 1.5; //makes crowd travel upward

  if (moveY <= -100) {
    moveY = 0; //sends crowd back to the bottom
  }
  for (let x = 0; x <= width + 100; x += 100) {
    for (let y = 0; y <= height + 100; y += 100) {
      let c = bodyColors[(x / 100 + y / 100) % bodyColors.length];
      let personY = y + moveY;
      let d = dist(mouseX, mouseY, x + 50, personY + 70);
      
      let size = 1;
      if (d < 125) {
        size = 1.4;
      }
      push();
      translate(x + 50, personY + 70);
      scale(size);
      translate(-50, -70);

      fill(c);
      stroke(110);
      strokeWeight(2);
      circle(50, 30, 55);
      rect(22,55, 56, 65);
      
      stroke(c);
      strokeWeight(12);
      line(75, 70, 88, 58);
      line(88, 58, 78, 42);

      pop();
    }
  }
}
