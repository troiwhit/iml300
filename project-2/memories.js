const memoryMotionPreference = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

new p5((p) => {
  const streaks = [];

  const streakCount = 450;

  // Negative horizontal movement makes the sleet
  // travel down and to the left.
  const slant = 0.25;

  class Streak {
    constructor() {
      this.setAppearance();

      // Fill the screen immediately.
      this.x = p.random(p.width);
      this.y = p.random(p.height);
    }

    setAppearance() {
      this.length = p.random(20, 85);
      this.speed = p.random(10, 23);
      this.opacity = p.random(60, 180);
      this.weight = p.random(0.5, 1.2);
    }

    reset() {
      this.setAppearance();

      const topWeight = p.width;
      const rightWeight = p.height * slant;

      // Introduce new streaks from the top or right edge.
      if (p.random(topWeight + rightWeight) < topWeight) {
        this.x = p.random(p.width);
        this.y = -this.length;
      } else {
        this.x = p.width + this.length * slant;
        this.y = p.random(p.height);
      }
    }

    update(step) {
      this.x -= this.speed * slant * step;
      this.y += this.speed * step;

      // Reset only when the whole streak is offscreen.
      if (
        this.y > p.height + this.length ||
        this.x < -this.length
      ) {
        this.reset();
      }
    }

    display() {
      p.stroke(255, this.opacity);
      p.strokeWeight(this.weight);

      p.line(
        this.x,
        this.y,
        this.x + this.length * slant,
        this.y - this.length
      );
    }
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.strokeCap(p.ROUND);

    for (let i = 0; i < streakCount; i++) {
      streaks.push(new Streak());
    }

    if (memoryMotionPreference.matches) {
      p.noLoop();
    }
  };

  p.draw = () => {
    p.background(0);

    // Limit large jumps if the browser tab was inactive.
    const step = p.min(p.deltaTime / 16.67, 2);

    for (const streak of streaks) {
      if (!memoryMotionPreference.matches) {
        streak.update(step);
      }

      streak.display();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  memoryMotionPreference.addEventListener(
    "change",
    (event) => {
      if (event.matches) {
        p.noLoop();
        p.redraw();
      } else {
        p.loop();
      }
    }
  );
}, "sleet-background");