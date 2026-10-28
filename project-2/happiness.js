const happinessItems = [
  { src: "littleme.jpeg", position: "happy-top-left" },
  { src: "sunshine.HEIC", position: "happy-top-right" },
  { src: "meandsis.heic", position: "happy-right" },
  { src: "meanddog.heic", position: "happy-bottom-right" },
  { src: "besties.jpeg", position: "happy-bottom-center" },
  { src: "beyonce.HEIC", position: "happy-bottom-left" },
  { src: "chase.HEIC", position: "happy-left" },
  { src: "graduation.JPG", position: "happy-top-center" }
];
const happinessCollage = document.getElementById("happinessCollage");
let happinessIndex = 0;

function addHappinessPhoto() {
  if (happinessIndex >= happinessItems.length) return;

  const item = happinessItems[happinessIndex];
  const photo = document.createElement("img");

  photo.src = item.src;
  photo.alt = "A happy memory";
  photo.className = "happiness-photo " + item.position;
  photo.style.zIndex = happinessIndex + 1;

  happinessCollage.appendChild(photo);
  happinessIndex++;
}

addHappinessPhoto();

setInterval(addHappinessPhoto, 900);