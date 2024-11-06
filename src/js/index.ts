
async function loadImages() {
  const response = await fetch("../data/images.json");
  let images = await response.json();
  shuffle(images);
  images.slice(0, 6).forEach((src: string, i: number) => {
    const img = document.getElementById(`image-${i}`) as HTMLImageElement;
    // console.log(img);
    if (img) img.src = src;
  });

  const articles = document.querySelectorAll(".card-links li:not(.logo-card)");
  let imageIndex = 6;

  articles.forEach((article) => {
    article.addEventListener("mouseenter", () => {
      const img = article.querySelector("img");
      // console.log(imageIndex, images.length);
      if (imageIndex >= images.length) {
        shuffle(images);
        imageIndex = 0;
      }
      if (img) img.src = images[imageIndex++];
    });
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.addEventListener("astro:page-load", loadImages);
loadImages();
