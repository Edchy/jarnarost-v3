
  document.addEventListener("DOMContentLoaded", () => {
    const cardLinks = document.querySelectorAll(".card-link");

    cardLinks.forEach((li) => {
      li.addEventListener("touchstart", () => {
        li.classList.toggle("focused");
      });
      // li.addEventListener("click", () => {
      //   li.classList.toggle("focused");
      // });


      // li.addEventListener("mouseenter", () => {
      //   li.classList.add("focused");
      // });

      // li.addEventListener("mouseleave", () => {
      //   li.classList.remove("focused");
      // });
    });
  });

async function loadImages() {
  const response = await fetch("../data/images.json");
  let images = await response.json();
  shuffle(images);

  // Initial loading of first 6 images
  images.slice(0, 6).forEach((src: string, i: number) => {
    const img = document.getElementById(`image-${i}`) as HTMLImageElement;
    if (img) {
      img.src = src;
    }
  });

  const articles = document.querySelectorAll(".card-links li");
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

  // Assign random images to articles initially
  articles.forEach((article, index) => {
    const img = article.querySelector("img");
    if (img) {
      if (index < images.length) {
        img.src = images[index];
      } else {
        img.src = images[index % images.length];
      }
    }
  });

  articles.forEach((article) => {
    article.addEventListener("mouseenter", () => {
      const img = article.querySelector("img");
      if (!img) return;

      hoverCount++;

      // Every third hover, show a special image
      if (hoverCount % 4 === 0) {
        img.src = specialImages[specialImageIndex];
        specialImageIndex = (specialImageIndex + 1) % specialImages.length;
      } else {
        // Regular random image behavior
        if (imageIndex >= images.length) {
          shuffle(images);
          imageIndex = 0;
        }
        img.src = images[imageIndex++];
      }
    });
    // article.addEventListener("click", () => {
    //   const img = article.querySelector("img");
    //   if (!img) return;

    //   hoverCount++;

    //   if (hoverCount % 4 === 0) {
    //     img.src = specialImages[specialImageIndex];
    //     specialImageIndex = (specialImageIndex + 1) % specialImages.length;
    //   } else {
    //     if (imageIndex >= images.length) {
    //       shuffle(images);
    //       imageIndex = 0;
    //     }
    //     img.src = images[imageIndex++];
    //   }
    // });

    // Add touch event listeners for iOS
    article.addEventListener("touchstart", () => {
      const img = article.querySelector("img");
      if (!img) return;

      hoverCount++;

      if (hoverCount % 4 === 0) {
        img.src = specialImages[specialImageIndex];
        specialImageIndex = (specialImageIndex + 1) % specialImages.length;
      } else {
        if (imageIndex >= images.length) {
          shuffle(images);
          imageIndex = 0;
        }
        img.src = images[imageIndex++];
      }
    });
  });
}

function shuffle(array: string[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.addEventListener("DOMContentLoaded", loadImages);