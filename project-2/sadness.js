const sadnessItems = [
  { src: "car-ride.JPG", type: "image", position: "top-left" },
  { src: "defeatedpanda.PNG", type: "image", position: "top-right" },
  { src: "comparison.jpg", type: "image", position: "right" },
  { src: "lonely.heic", type: "image", position: "bottom-right" },
  { src: "defeated.HEIC", type: "image", position: "left" }
];

const sadnessCollage = document.getElementById("sadnessCollage");
let sadnessIndex = 0;

function addSadnessPhoto() {
  if (sadnessIndex >= sadnessItems.length) return;

  const item = sadnessItems[sadnessIndex];
  let element;

  if (item.type === "video") {
    element = document.createElement("video");
    element.src = item.src;
    element.muted = true;
    element.autoplay = true;
    element.loop = true;
    element.playsInline = true;
    element.controls = true;
  } else {
    element = document.createElement("img");
    element.src = item.src;
    element.alt = "A difficult memory";
  }

  element.className = "sadness-photo " + item.position;
  element.style.zIndex = sadnessIndex + 1;

  sadnessCollage.appendChild(element);

  if (item.type === "video") {
    element.play().catch(() => {});
  }

  sadnessIndex++;
}

addSadnessPhoto();

setInterval(addSadnessPhoto, 4200);