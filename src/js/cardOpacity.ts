
  function updateCardOpacity() {
        // Get all navigation links
    const navLinks = document.querySelectorAll('.card-link');
   

    // Remove "active" class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Get the id of the last active link from sessionStorage
    const activeLinkId = sessionStorage.getItem('activeLinkId');

    // If an active link is stored, apply the "active" class
    if (activeLinkId) {
        const activeLink = document.querySelector(`[data-id="${activeLinkId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    // Add click event to each link to store the "active" link id
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sessionStorage.setItem('activeLinkId', link.getAttribute('data-id'));
        });
    });

    setTimeout(()=> {
      navLinks.forEach(link => link.classList.remove('active'));

    }, 1500)
  }

  // Run immediately on page load
  updateCardOpacity();

  // Run on subsequent navigations to this page
  document.addEventListener("astro:page-load", () => {
    // Check if we're on the index page
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
      updateCardOpacity();
    }
  });
