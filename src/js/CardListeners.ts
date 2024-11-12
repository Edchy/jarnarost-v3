const lis = document.querySelectorAll('[class^="image-"]');
const logo = document.querySelector(".logo") as HTMLElement;
const emojis = [";)", "=)", ":)", ":D", ":P", ":O"];
const headings = ["Biodynamiskt kaffe", "Demeter kaffe", "Ekologiskt kaffe" ];
const secondaryHeadings = ["Kaffe kultur", "Järna rosteri", "Hantverks rosteri"];
const instagramTexts = ["#senaste", "#instagram"];
const contact = [
    {
    language: "Arabic",
    word: "اتصال",
    pronunciation: "ittisāl"
  },
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
    language: "Chinese",
    word: "联系",
    pronunciation: "liánxì"
  },
    {
    language: "Russian",
    word: "Контакт",
    pronunciation: "Kontakt"
  },

  {
    language: "Korean",
    word: "연락",
    pronunciation: "yeollak"
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
    langauage: "Amharic (ethiopian)",
    word: "ማግኘት",
    pronunciation: "māgänät"
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
let deg = 45;





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
logo.addEventListener("click", () => {
  logo.style.filter = `hue-rotate(${deg}deg)`;

  deg += 45;
})
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