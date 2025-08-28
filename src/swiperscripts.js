import Swiper from "swiper/bundle";
import "swiper/css/bundle";

/**
 * Respect reduced motion users
 */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// logos slider
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true, // ✅ infinite loop
  autoplay: prefersReducedMotion
    ? false
    : {
        delay: 1500,
        disableOnInteraction: false,
        reverseDirection: false,
      },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  },
});

// Initialize Tabs Swiper
const tabsSwiper = new Swiper(".tabsSwiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  centeredSlides: false,
  navigation: {
    nextEl: ".tabs-button-next",
    prevEl: ".tabs-button-prev",
  },
  breakpoints: {
    480: { slidesPerView: 3, spaceBetween: 15 },
    640: { slidesPerView: 4, spaceBetween: 20 },
    768: { slidesPerView: 5, spaceBetween: 20 },
    1024: { slidesPerView: 6, spaceBetween: 0 },
  },
  watchOverflow: false,
});

// Tab content functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

// Initialize Swiper for each tab
const swipers = {};

function initializeSwiper(tabId) {
  if (!swipers[tabId]) {
    swipers[tabId] = new Swiper(`#${tabId} .candidateSwiper`, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: { enabled: false },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      },
      pagination: { el: ".swiper-pagination", clickable: true },
      autoplay: prefersReducedMotion
        ? false
        : {
            delay: 5000,
            disableOnInteraction: false,
          },
      loop: false,
    });
  }
}

// Initialize the active tab's swiper
initializeSwiper("sales");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Remove active state
    tabButtons.forEach((btn) => {
      btn.classList.remove("active", "text-primary", "border-primary");
      btn.classList.add("border-transparent");
    });
    tabContents.forEach((content) => content.classList.add("hidden"));

    // Add active to clicked
    button.classList.add("active", "text-primary", "border-primary");
    button.classList.remove("border-transparent");

    // Show content
    const targetContent = document.getElementById(targetTab);
    targetContent.classList.remove("hidden");

    // Init swiper
    setTimeout(() => {
      initializeSwiper(targetTab);
    }, 100);
  });
});

// Add smooth scroll animation to cards
const cards = document.querySelectorAll(".candidate-card");
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(-30px)";

        setTimeout(() => {
          entry.target.style.transition = "all 0.6s ease-out";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);
      }
    });
  }, observerOptions);

  cards.forEach((card) => observer.observe(card));
}

// Fields Swiper
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper("#fieldsSwiper", {
    slidesPerView: 1.05,
    centeredSlides: true,
    initialSlide: Math.floor(
      document.querySelectorAll("#fieldsSwiper .swiper-slide").length / 2
    ),
    spaceBetween: 16,
    loop: true,
    grabCursor: true,
    watchSlidesProgress: true,
    pagination: { enabled: false },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 1.2, spaceBetween: 16, centeredSlides: true },
      768: { slidesPerView: 2.2, spaceBetween: 20, centeredSlides: true },
      1024: { slidesPerView: 3, spaceBetween: 24, centeredSlides: true },
    },
    on: {
      init() {
        document
          .querySelectorAll(".field-card")
          .forEach((c) => c.classList.remove("active"));
        const startCard =
          this.slides[this.activeIndex]?.querySelector(".field-card");
        if (startCard) startCard.classList.add("active");
      },
      slideChange() {
        document
          .querySelectorAll(".field-card")
          .forEach((c) => c.classList.remove("active"));
        const card =
          this.slides[this.activeIndex]?.querySelector(".field-card");
        if (card) card.classList.add("active");
      },
    },
  });

  document
    .querySelectorAll(".swiper-slide .field-card")
    .forEach((card, index) => {
      const slide = card.closest(".swiper-slide");
      card.addEventListener("click", () => {
        activateCard(card);
        const slideIndex = Array.from(slide.parentElement.children).indexOf(
          slide
        );
        swiper.slideTo(slideIndex, 300);
      });
    });

  function activateCard(cardEl) {
    document
      .querySelectorAll(".field-card")
      .forEach((c) => c.classList.remove("active"));
    if (cardEl) cardEl.classList.add("active");
  }
});
