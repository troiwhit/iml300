const items = [
  { src: "moncalvocity.jpeg", type: "image", position: "still-top-left" },
  { src: "theeye.jpeg", type: "image", position: "still-top-right" },
  { src: "sandiego.jpeg", type: "image", position: "still-right" },
  { src: "la.jpeg", type: "image", position: "still-bottom-right" },
  { src: "cherryblossom.jpeg", type: "image", position: "still-bottom-left" },
  { src: "fallinlove.MOV", type: "video", position: "still-left" },
  { src: "nurtureinnature.MOV", type: "video", position: "still-top-center" },
  { src: "stillinmotion.MOV", type: "video", position: "still-bottom-center" }
];

const collage = document.getElementById("collage");
const song = document.getElementById("song");
const prompt = document.getElementById("musicPrompt");

let index = 0;

function addNextItem() {
  if (index >= items.length) return;

  const item = items[index];
  let el;

  if (item.type === "video") {
    el = document.createElement("video");
    el.src = item.src;
    el.muted = true;
    el.loop = true;
    el.autoplay = true;
    el.playsInline = true;
  } else {
    el = document.createElement("img");
    el.src = item.src;
    el.alt = "A still memory";
  }

  el.className = "collage-item " + item.position;
  el.style.zIndex = index + 1;

  collage.appendChild(el);

  if (item.type === "video") {
    el.play().catch(() => {});
  }

  index++;
}

function startCollage() {
  addNextItem();
  setInterval(addNextItem, 3500);
}

startCollage();