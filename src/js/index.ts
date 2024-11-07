async function loadImages() {
  const response = await fetch("../data/images.json");
  let images = await response.json();
  shuffle(images);
  
  // Initial loading of first 6 images
  images.slice(0, 6).forEach((src: string, i: number) => {
    const img = document.getElementById(`image-${i}`) as HTMLImageElement;
    if (img) {
      img.src = src;
      // img.classList.remove('special-image');
    }
  });

  const articles = document.querySelectorAll(".card-links li:not(.logo-card)");
  let imageIndex = 6;
  let hoverCount = 0;
  
  // Your specific images to show every third hover
  const specialImages = [
    "/images/coffee/brygg-white.avif",
    "/images/coffee/espgrande-white.avif",
    "/images/coffee/mellan-white.avif",
    "/images/coffee/esp-white.avif",
  ];
  let specialImageIndex = 0;

  articles.forEach((article) => {
    article.addEventListener("mouseenter", () => {
      const img = article.querySelector("img");
      if (!img) return;

      hoverCount++;

      // Every third hover, show a special image
      if (hoverCount % 4 === 0) {
        img.src = specialImages[specialImageIndex];
        // img.classList.add("special-image");
        specialImageIndex = (specialImageIndex + 1) % specialImages.length;
      } else {
        // Regular random image behavior
        if (imageIndex >= images.length) {
          shuffle(images);
          imageIndex = 0;
        }
        img.src = images[imageIndex++];
        // img.classList.remove("special-image"); 
      }
    });
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.addEventListener("DOMContentLoaded", loadImages);
loadImages();