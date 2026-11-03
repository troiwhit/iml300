(() => {
function startSadnessAnimation() {
const files = [
"defeatedpanda.PNG",
 "car-ride.JPG",
 "comparison.jpg",
  "lonely.jpg",
 "defeated.jpg" ];

    const settings = {
      headX: 0.48,
      headY: 0.52,

      orbitCenterX: 0.50,
      orbitCenterY: 0.54,

      orbitRadiusX: 0.35,
      orbitRadiusY: 0.32,

      firstDelay: 0.8,
      emergeDuration: 2.8,
      launchGap: 5,
      orbitDuration: 25,

      entryAngle: -Math.PI / 2
    };


    document.getElementById("sadnessOrbit")?.remove();

    const layer = document.createElement("div");
    layer.id = "sadnessOrbit";
    document.body.appendChild(layer);

    const tilts = [-7, 5, -4, 7, -5];

    const photos = files.map((filename, index) => {
      const card = document.createElement("div");
      card.className = "sadness-orbit-card";
      card.style.opacity = "0";

      const img = document.createElement("img");
      img.src = filename;
      img.alt = `Memory photo ${index + 1}`;
      img.draggable = false;

      img.addEventListener("error", () => {
        console.error(`Could not load sadness photo: ${filename}`);
      });

      card.appendChild(img);
      layer.appendChild(card);

      return {
        card,
        img,
        tilt: tilts[index],
        delay: settings.firstDelay + index * settings.launchGap
      };
    });

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function smoothstep(t) {
      return t * t * (3 - 2 * t);
    }

    function mix(a, b, t) {
      return a + (b - a) * t;
    }


    function bezier(start, control, end, t) {
      const remaining = 1 - t;

      return (
        remaining * remaining * start +
        2 * remaining * t * control +
        t * t * end
      );
    }

    let lastTime;
    let elapsed = 0;

    function animate(timestamp) {
      if (lastTime !== undefined) {
        // Prevent large jumps after switching browser tabs.
        elapsed += Math.min((timestamp - lastTime) / 1000, 0.05);
      }

      lastTime = timestamp;

      const w = window.innerWidth;
      const h = window.innerHeight;

      const headX = w * settings.headX;
      const headY = h * settings.headY;

      const centerX = w * settings.orbitCenterX;
      const centerY = h * settings.orbitCenterY;

      const radiusX = w * settings.orbitRadiusX;
      const radiusY = h * settings.orbitRadiusY;

      const entryX =
        centerX + Math.cos(settings.entryAngle) * radiusX;

      const entryY =
        centerY + Math.sin(settings.entryAngle) * radiusY;

      const maxWidth = clamp(w * 0.16, 85, 230);
      const maxHeight = h * 0.27;

      for (const photo of photos) {
        const age = elapsed - photo.delay;

        if (
          age < 0 ||
          !photo.img.complete ||
          photo.img.naturalWidth === 0
        ) {
          photo.card.style.opacity = "0";
          continue;
        }

        const ratio =
          photo.img.naturalWidth / photo.img.naturalHeight;

        const imageWidth = Math.min(maxWidth, maxHeight * ratio);

        photo.img.style.width = `${imageWidth}px`;

        let x;
        let y;
        let scale;
        let opacity;
        let rotation;

        if (age < settings.emergeDuration) {
          const progress = age / settings.emergeDuration;
          const eased = smoothstep(progress);

          const controlX = headX + w * 0.12;
          const controlY = headY - h * 0.24;

          x = bezier(headX, controlX, entryX, eased);
          y = bezier(headY, controlY, entryY, eased);

          scale = mix(0.035, 1, eased);
          opacity = clamp(progress * 4, 0, 1);
          rotation = mix(-20, photo.tilt, eased);
        } else {
          const orbitAge = age - settings.emergeDuration;

          const rampTime = 1;
          const travelTime =
            orbitAge -
            rampTime * (1 - Math.exp(-orbitAge / rampTime));

          const angle =
            settings.entryAngle +
            (travelTime / settings.orbitDuration) * Math.PI * 2;

          x = centerX + Math.cos(angle) * radiusX;
          y = centerY + Math.sin(angle) * radiusY;

          scale = 1;
          opacity = 1;

          rotation = photo.tilt + Math.sin(orbitAge * 0.4) * 2;
        }

        photo.card.style.left = `${x}px`;
        photo.card.style.top = `${y}px`;
        photo.card.style.opacity = opacity;

        photo.card.style.transform =
          `translate(-50%, -50%) ` +
          `rotate(${rotation}deg) scale(${scale})`;
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startSadnessAnimation,
      { once: true }
    );
  } else {
    startSadnessAnimation();
  }
})();