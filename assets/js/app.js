document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     YEAR (supports both ids)
  ================================ */
  const yearEl = document.getElementById("year") || document.getElementById("fxYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


 // Mobile menu toggle (uses .open to match CSS)
    (() => {
      const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      if (!hamburger || !mobileMenu) return;

      hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        hamburger.classList.toggle("is-open");
      });

      mobileMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          mobileMenu.classList.remove("open");
          hamburger.classList.remove("is-open");
        });
      });
    })();
 
    // Mobile Products dropdown
(() => {
  const btn = document.getElementById("mProductsBtn");
  const menu = document.getElementById("mProductsMenu");
  if(!btn || !menu) return;

  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("open");
  });
})();

  /* ================================
     HERO SLIDER
  ================================ */
  const heroImage = document.getElementById("heroImage");
  const dots = document.querySelectorAll(".heroDots .dot");

  const slides = [
    "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=2000&q=70",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80"
  ];

  let current = 0;
  let sliderTimer = null;

  function setSlide(index) {
    if (!heroImage) return;

    current = index;
    heroImage.style.backgroundImage = `url('${slides[current]}')`;

    dots.forEach(d => d.classList.remove("active"));
    if (dots[current]) dots[current].classList.add("active");
  }

  function startSlider() {
    if (!heroImage) return;
    if (sliderTimer) clearInterval(sliderTimer);
    sliderTimer = setInterval(() => setSlide((current + 1) % slides.length), 6500);
  }

  if (heroImage) {
    setSlide(0);

    dots.forEach(d => {
      d.addEventListener("click", () => {
        const idx = parseInt(d.dataset.slide, 10);
        if (!Number.isNaN(idx)) {
          setSlide(idx);
          startSlider(); // restart timer so user click feels smooth
        }
      });
    });

    startSlider();
  }


  /* ================================
     SIMPLE TOAST (better than alert)
  ================================ */
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toastX";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 250);
    }, 2500);
  }


  /* ================================
     SAFE FORM HANDLERS
  ================================ */
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


  /* ================================
     EVENTS (PUBLIC VIEW ONLY)
  ================================ */
  const EVENTS_KEY = "axenrich_events_v1";

  function loadEvents() {
    try { return JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]"); }
    catch (e) { return []; }
  }

  function renderPublicEvents() {
    const wrap = document.getElementById("eventsList");
    if (!wrap) return;

    const list = loadEvents();

    if (!list.length) {
      wrap.innerHTML = `
        <div class="event-card">
          <p class="event-desc">No upcoming events posted yet. Please check back soon.</p>
        </div>
      `;
      return;
    }

    wrap.innerHTML = list.map(ev => `
      <div class="event-card">
        <div class="event-top">
          <div>
            <h3 class="event-title">${ev.title || "Event"}</h3>
            <div class="event-meta">
              <span class="em-chip">
                <i class="fa-solid fa-calendar"></i>
                ${(ev.date || "")} ${(ev.time ? "• " + ev.time : "")} ${(ev.tz ? "• " + ev.tz : "")}
              </span>
            </div>
          </div>
        </div>

        <p class="event-desc">${ev.desc || ""}</p>

        ${ev.link ? `
          <div class="event-actions">
            <a class="event-join btn btn-primary" href="${ev.link}" target="_blank" rel="noopener">
              <i class="fa-solid fa-video"></i> Join Meeting
            </a>
          </div>
        ` : ""}
      </div>
    `).join("");
  }

  renderPublicEvents();

});
