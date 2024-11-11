import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()



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

  // Determine grid dimensions based on the number of articles and screen size
  const numCols = window.innerWidth >= 750 ? 3 : 2;
  const numRows = Math.ceil(articles.length / numCols);

  // Track the current state of the grid
  const gridState: string[][] = Array.from({ length: numRows }, () => Array(numCols).fill(""));

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

  let triggered = false;
  articles.forEach((article, articleIndex) => {
    article.addEventListener("mouseenter", () => {
      const img = article.querySelector("img");
      if (!img) return;

      hoverCount++;

      // Every third hover, show a special image
      if (hoverCount % 3 === 0) {
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

      // Update grid state
      const rowIndex = Math.floor(articleIndex / numCols);
      const colIndex = articleIndex % numCols;
      gridState[rowIndex][colIndex] = img.src;
    });
    article.addEventListener("mouseleave", () => {
      // Check for win condition
      if(triggered) return;
      if (checkWinCondition(gridState, numRows, numCols)) {
        triggered = true;
        jsConfetti.addConfetti({
          emojis: ['', '⚡️', '💥', '✨', '💫', '❤️‍🔥'],
          emojiSize: 100,
          confettiRadius: 6,
          confettiNumber: 10,

})

      }
    });
  });
}

function checkWinCondition(grid: string[][], numRows: number, numCols: number): boolean {
  // Check rows
  for (let row = 0; row < numRows; row++) {
    const rowImages = grid[row].filter((src) => src.includes("coffee") && src !== "");
    if (rowImages.length === numCols && rowImages.length === 3) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < numCols; col++) {
    const colImages = grid.map((row) => row[col]).filter((src) => src.includes("coffee") && src !== "");
    if (colImages.length === numRows && colImages.length === 3) {
      return true;
    }
  }

  return false;
}

function shuffle(array: string[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.addEventListener("DOMContentLoaded", loadImages);