let photos = [];
let girl;
let collage = [];
let scrollOffset = 0;

const BACKGROUND_COLOR = "#CFAD88";
const SCROLL_SPEED = 22; // Pixels per second; lower = slower

const photoFiles = [
  "sunshine.jpeg",
  "meanddog.jpeg",
  "besties.jpeg",
  "beyonce.jpeg",
  "littleme.jpeg",
  "meandsis.jpeg",
  "graduation.JPG"
];

function preload() {
  girl = loadImage("Happiest_bkgrndremoved.png");

  for (let filename of photoFiles) {
    photos.push(loadImage(filename));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  imageMode(CENTER);
  rectMode(CENTER);

  makeCollage();
}

function makeCollage() {
  collage = [];

  // Fixed placements make the collage feel intentionally arranged.
  const positions = [
    { x: 0.16, y: 0.08, angle: -10, size: 0.95 },
    { x: 0.52, y: 0.02, angle:   7, size: 0.85 },
    { x: 0.85, y: 0.16, angle:  12, size: 1.00 },
    { x: 0.12, y: 0.43, angle:  -6, size: 1.00 },
    { x: 0.80, y: 0.50, angle: -12, size: 0.95 },
    { x: 0.46, y: 0.66, angle:   8, size: 0.85 },
    { x: 0.17, y: 0.82, angle: -14, size: 0.95 },
    { x: 0.85, y: 0.89, angle:   6, size: 1.00 }
  ];

  const baseWidth = constrain(width * 0.21, 100, 260);

  for (let i = 0; i < photos.length; i++) {
    const placement = positions[i];
    const img = photos[i];
    const photoWidth = baseWidth * placement.size;

    collage.push({
      img: img,
      x: width * placement.x,
      yFraction: placement.y,
      angle: radians(placement.angle),
      w: photoWidth,
      h: photoWidth * (img.height / img.width)
    });
  }
}

function draw() {
  background(BACKGROUND_COLOR);

  // deltaTime keeps the scrolling speed consistent.
  scrollOffset += SCROLL_SPEED * min(deltaTime, 50) / 1000;

  const tallestPhoto = max(collage.map(photo => photo.h));

  // Extra room lets each tilted photo disappear fully offscreen.
  const margin = tallestPhoto + 100;
  const loopHeight = height + margin * 2;

  // Draw every background photo first.
  for (let photo of collage) {
    const y =
      ((photo.yFraction * loopHeight + scrollOffset) % loopHeight)
      - margin;

    drawPhoto(photo, y);
  }

  // Draw the girl last so she stays in front.
  drawGirl();
  drawQuote();
}

function drawPhoto(photo, y) {
  push();

  translate(photo.x, y);
  rotate(photo.angle);

  const border = 10;
  const bottomBorder = 28;

  // Shadow applies to the cream photo backing.
  drawingContext.shadowColor = "rgba(55, 35, 20, 0.24)";
  drawingContext.shadowBlur = 18;
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 9;

  noStroke();
  fill("black");

  rect(
    0,
    (bottomBorder - border) / 2,
    photo.w + border * 2,
    photo.h + border + bottomBorder
  );

  // Keep the photo itself free of additional shadows.
  drawingContext.shadowColor = "transparent";
  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;

  image(photo.img, 0, 0, photo.w, photo.h);

  pop();
}

function drawGirl() {
  push();

  // Fit the entire PNG into the center of the canvas.
  const scale = min(
    (height * 0.86) / girl.height,
    (width * 0.60) / girl.width
  );

  const girlWidth = girl.width * scale;
  const girlHeight = girl.height * scale;

  drawingContext.shadowColor = "rgba(55, 35, 20, 0.22)";
  drawingContext.shadowBlur = 20;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 8;

  image(
    girl,
    width / 2,
    height - girlHeight/2 +30,
    girlWidth,
    girlHeight
  );

  pop();
}
function drawQuote() {
  push();

  const fontSize = constrain(width * 0.035, 20, 42);
  const boxWidth = min(width * 0.84, 760);
  const boxHeight = min(height * 0.8, fontSize * 12);

  rectMode(CORNER);
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  textStyle(ITALIC);
  textSize(fontSize);
  textLeading(fontSize * 1.4);

  fill("#FFF8EB");
  noStroke();

  drawingContext.shadowColor = "rgba(45, 28, 16, 0.85)";
  drawingContext.shadowBlur = 10;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 2;

  const quote =
    "Happiness comes and goes.\n" +
    "Appreciate these fleeting moments " +
    "before all you’re left with is a distant picture.";

  text(
    quote,
    (width - boxWidth) / 2,
    (height - boxHeight) / 2,
    boxWidth,
    boxHeight
  );

  pop();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  makeCollage();
}
