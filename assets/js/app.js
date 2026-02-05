document.addEventListener("DOMContentLoaded", () => {
  // YEAR (support multiple ids)
  const yearEl = document.getElementById("year") || document.getElementById("fxYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // MOBILE MENU
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => mobileMenu.classList.toggle("show"));

    // optional: close menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobileMenu.classList.remove("show"));
    });
  }

  // HERO SLIDER
  const heroImage = document.getElementById("heroImage");
  const dots = document.querySelectorAll(".dot");

  const slides = [
    "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=2000&q=70",
    "https://www.wfla.com/wp-content/uploads/sites/71/2023/04/GettyImages-1397011551.jpg?w=2560&h=1440&crop=1",
    "https://miro.medium.com/v2/resize:fit:1400/1*eJVXPiyT0PTUjTccFwIIrA.jpeg"
  ];

  let current = 0;

  function setSlide(index) {
    if (!heroImage) return; // important guard

    current = index;
    heroImage.style.backgroundImage = `url('${slides[current]}')`;

    if (dots && dots.length) {
      dots.forEach(d => d.classList.remove("active"));
      if (dots[current]) dots[current].classList.add("active");
    }
  }

  // only run slider if hero exists
  if (heroImage) {
    // set first image immediately
    setSlide(0);

    // dot click (only if dots exist)
    if (dots && dots.length) {
      dots.forEach(d => {
        d.addEventListener("click", () => {
          const idx = parseInt(d.dataset.slide, 10);
          if (!Number.isNaN(idx)) setSlide(idx);
        });
      });
    }

    // auto rotate
    setInterval(() => setSlide((current + 1) % slides.length), 6500);
  }

  // SIMPLE ALERT TOAST
  function toast(msg) { alert(msg); }

  // SAFE FORM HANDLERS (only attach if form exists)
  const quickLead = document.getElementById("quickLead");
  if (quickLead) {
    quickLead.addEventListener("submit", (e) => {
      e.preventDefault();
      toast("Thank you! We received your request. We’ll contact you soon.");
      e.target.reset();
    });
  }

  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      toast("Quote request submitted! We’ll contact you shortly.");
      e.target.reset();
    });
  }

  const apptForm = document.getElementById("apptForm");
  if (apptForm) {
    apptForm.addEventListener("submit", (e) => {
      e.preventDefault();
      toast("Appointment request received! We’ll confirm soon.");
      e.target.reset();
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      toast("Message sent! We’ll reply soon.");
      e.target.reset();
    });
  }
});
