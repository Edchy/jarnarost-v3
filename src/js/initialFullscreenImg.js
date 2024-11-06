    document.addEventListener("astro:page-load", function () {
      const initialLoadImage = document.querySelector(".full-w-image");
      if (!initialLoadImage) return;
      console.log(initialLoadImage);
      // Check if this is the first load of the page
      if (!sessionStorage.getItem("pageLoaded")) {
        console.log(1);
        setTimeout(() => {
          initialLoadImage.classList.add("fade-out");
          setTimeout(() => {
            initialLoadImage.remove();
          }, 1000); // Remove after fade-out animation completes
        }, 2000);

        // Set flag in sessionStorage
        sessionStorage.setItem("pageLoaded", "true");
      } else {
        // If not the first load, remove the image immediately
        initialLoadImage.remove();
      }
    });