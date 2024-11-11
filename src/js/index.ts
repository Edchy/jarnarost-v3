import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()
let deg = 45;

const lis = document.querySelectorAll('[class^="image-"]');
const logo = document.querySelector(".logo") as HTMLElement;

const emojis = [";)", "=)", ":)", ":D", ":P", ":O"];
const headings = ["Biodynamiskt kaffe", "Demeter kaffe", "Ekologiskt kaffe" ];
// const secondaryHeadings = ["Kaffe kultur", "Järna rosteri", "Hantverks rosteri"];
const secondaryHeadings = ["Kaff", "Järn", "Hant"];
const instagramTexts = ["#senaste", "#kaffepaus", "#instagram"];
const contact = [
  {
    language: "English",
    word: "Contact"
  },
    {
    language: "Japanese",
    word: "連絡",
    pronunciation: "renraku"
  },
  {
    language: "Latin",
    word: "Contacto",
    
  },
    {
    language: "Russian",
    word: "Контакт",
    pronunciation: "Kontakt"
  },
  {
    language: "Chinese",
    word: "联系",
    pronunciation: "liánxì"
  },
  {
    language: "Korean",
    word: "연락",
    pronunciation: "yeollak"
  },
  {
    language: "Arabic",
    word: "اتصال",
    pronunciation: "ittisāl"
  },
  {
    language: "Thai",
    word: "ติดต่อ",
    pronunciation: "dtìt dtàaw"
  },
  {
    language: "Hindi",
    word: "संपर्क",
    pronunciation: "sampark"
  },
  {
    language: "Nordic",
    word: "Kontakt",
  },

];
let emojiIndex = 0;
let headingsIndex = 0;
let secondaryHeadingsIndex = 0;
let contactIndex = 0;
let instagramTextsIndex = 0;




lis[0].addEventListener("click", () => {
  lis[0].querySelector("h2").textContent = headings[headingsIndex];
  if (headingsIndex === headings.length - 1) {
    headingsIndex = 0;
  } else {
    headingsIndex++;
  }
});
lis[1].addEventListener("click", () => {
  lis[1].querySelector("h2").textContent = instagramTexts[instagramTextsIndex];
  if (instagramTextsIndex === instagramTexts.length - 1) {
    instagramTextsIndex = 0;
  } else {
    instagramTextsIndex++;
  }
});

lis[2].addEventListener("click", () => {
  lis[2].querySelector("h2").textContent = secondaryHeadings[secondaryHeadingsIndex];
  if (secondaryHeadingsIndex === secondaryHeadings.length - 1) {
    secondaryHeadingsIndex = 0;
  } else {
    secondaryHeadingsIndex++;
  }
});
// logo.addEventListener("click", () => {
//   logo.style.filter = `hue-rotate(${deg}deg)`;

//   deg += 45;
// })
lis[4].addEventListener("click", () => {
  lis[4].querySelector("h2").textContent = contact[contactIndex].word;
    if (contactIndex === contact.length - 1) {
    contactIndex = 0;
  } else {
    contactIndex++;
  }
  // lis[4].querySelector("h2").style.rotate = lis[4].querySelector("h2").style.rotate === "180deg" ? "0deg" : "180deg";
});
lis[5].addEventListener("click", () => {
  lis[5].querySelector("h2").textContent = emojis[emojiIndex];
  if (emojiIndex === emojis.length - 1) {
    emojiIndex = 0;
  } else {
    emojiIndex++;
  }
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
          // emojis: ['', '⚡️', '💥', '✨', '💫', '❤️‍🔥'],
         emojis: ['🔥', '⚡️',],
          emojiSize: 50,
          confettiRadius: 25,
          confettiNumber: 6,

})

      }
    });
    article.addEventListener("click", () => {
      // Check for win condition
      if(triggered) return;
      if (checkWinCondition(gridState, numRows, numCols)) {
        triggered = true;
        jsConfetti.addConfetti({
          // emojis: ['', '⚡️', '💥', '✨', '💫', '❤️‍🔥'],
          emojis: ['🔥', '⚡️',],
          emojiSize: 50,
          confettiRadius: 25,
          confettiNumber: 6,

})

      }
    });
  });
}

function checkWinCondition(grid: string[][], numRows: number, numCols: number): boolean {


  // Check rows
  for (let row = 0; row < numRows; row++) {
    const rowImages = grid[row].map((src, index) => {
      const li = document.querySelector(`.card-links li:nth-child(${row * numCols + index + 1})`) as HTMLElement;
      const img = li?.querySelector("img") as HTMLImageElement;
      const siblingX = li?.querySelector(".x") as HTMLElement;
      if (img && src.includes("coffee") && src !== "" && siblingX && window.getComputedStyle(siblingX).opacity !== "1") {
        return img;
      }
      return null;
    }).filter(Boolean);
    if (rowImages.length === numCols && rowImages.length === 3) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < numCols; col++) {
    const colImages = grid.map((row, rowIndex) => {
      const li = document.querySelector(`.card-links li:nth-child(${rowIndex * numCols + col + 1})`) as HTMLElement;
      const img = li?.querySelector("img") as HTMLImageElement;
      const siblingX = li?.querySelector(".x") as HTMLElement;
      if (img && row[col].includes("coffee") && row[col] !== "" && siblingX && window.getComputedStyle(siblingX).opacity !== "1") {
        return img;
      }
      return null;
    }).filter(Boolean);
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