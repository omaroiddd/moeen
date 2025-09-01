import Swiper from "swiper/bundle";
import "swiper/css/bundle";

/**
 * Respect reduced motion users
 */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// ================= Logo slider =================
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
    enabled: false,
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  },
});

const getTabButtonAtReal = (swiper) => {
  const real = swiper.realIndex ?? swiper.activeIndex;
  return (
    swiper.slides?.[swiper.activeIndex]?.querySelector?.(".tab-button") || null
  );
};

const resetAllTabProgress = (swiper) => {
  swiper.slides.forEach((slide) => {
    const btn = slide.querySelector(".tab-button");
    if (btn) btn.style.setProperty("--tab-progress", 0);
  });
};

const tabsSwiper = new Swiper(".tabsSwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: false,
  loop: true, // ✅ يلف على كل التابات
  navigation: { nextEl: ".tabs-button-next", prevEl: ".tabs-button-prev" },
  autoplay: prefersReducedMotion
    ? false
    : {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
  on: {
    init(s) {
      resetAllTabProgress(s);
      const btn = getTabButtonAtReal(s);
      if (btn) btn.style.setProperty("--tab-progress", 0);
    },
    slideChangeTransitionStart(s) {
      resetAllTabProgress(s);
      const btn = getTabButtonAtReal(s);
      if (btn) btn.style.setProperty("--tab-progress", 0);
    },
    autoplayTimeLeft(s, time, progress) {
      const btn = getTabButtonAtReal(s);
      if (btn) btn.style.setProperty("--tab-progress", String(1 - progress));
    },
  },
  breakpoints: {
    480: { slidesPerView: 3, spaceBetween: 15 },
    640: { slidesPerView: 4, spaceBetween: 20 },
    768: { slidesPerView: 5, spaceBetween: 20 },
    1024: { slidesPerView: 6, spaceBetween: 0 },
  },
  watchOverflow: false,
});

// ================= Tab content functionality (synced with tabsSwiper) =================

const tabButtons = document.querySelectorAll(".tabsSwiper .tab-button");
const tabContents = document.querySelectorAll(".tab-content");

const tabInnerSwipers = {};

/* Init inner swiper once per tab (اختياري لو عندك سوايبر داخلي) */
function initializeInnerSwiper(tabId) {
  if (tabInnerSwipers[tabId]) return;
  const container = document.querySelector(
    `#${CSS.escape(tabId)} .candidateSwiper`
  );
  if (!container) return;

  tabInnerSwipers[tabId] = new Swiper(container, {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: { enabled: false },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 30 },
      1024: { slidesPerView: 3, spaceBetween: 30 },
    },
    pagination: {
      el:
        container
          .closest(`#${CSS.escape(tabId)}`)
          ?.querySelector(".swiper-pagination") || ".swiper-pagination",
      clickable: true,
    },
    autoplay: prefersReducedMotion
      ? false
      : { delay: 5000, disableOnInteraction: false },
    loop: false,
  });
}

/* فعل/أخفِ البانلز وحدّث ستايلات الأزرار */
function setActiveTab(tabId) {
  // tabButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const targetTab = button.getAttribute("data-tab");
  //     if (!targetTab) return;

  //     setActiveTab(targetTab);

  //     const slideEl = button.closest(".swiper-slide");
  //     const idx = Array.from(slideEl.parentElement.children).indexOf(slideEl);
  //     if (idx >= 0) {
  //       tabsSwiper.autoplay?.stop?.();
  //       tabsSwiper.slideToLoop(idx, 0);
  //       resetAllTabProgress(tabsSwiper);
  //       button.style.setProperty("--tab-progress", 0);
  //       tabsSwiper.autoplay?.start?.();
  //     }
  //   });
  // });

  tabContents.forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== tabId);
  });

  initializeInnerSwiper(tabId);
  requestAnimationFrame(() => tabInnerSwipers[tabId]?.update?.());
}

function getActiveTabIdFromSwiper(swiper) {
  const btn =
    swiper.slides?.[swiper.activeIndex]?.querySelector?.(".tab-button");
  return btn?.getAttribute("data-tab") || null;
}

function slideOuterToTab(tabId) {
  const btn = document.querySelector(
    `.tabsSwiper .tab-button[data-tab="${CSS.escape(tabId)}"]`
  );
  const slideEl = btn?.closest(".swiper-slide");
  if (!slideEl) return;

  const idx = Array.from(slideEl.parentElement.children).indexOf(slideEl);
  if (idx >= 0) {
    tabsSwiper.slideTo(idx);
    tabsSwiper.autoplay?.start?.();

    btn.style.setProperty("--tab-progress", 0);
  }
}

// tabButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const targetTab = button.getAttribute("data-tab");
//     if (!targetTab) return;

//     setActiveTab(targetTab);
//     slideOuterToTab(targetTab);
//   });
// });

tabsSwiper.on("init", (s) => {
  const id = getActiveTabIdFromSwiper(s);
  if (id) setActiveTab(id);
});

tabsSwiper.on("slideChangeTransitionStart", (s) => {
  const id = getActiveTabIdFromSwiper(s);
  if (id) setActiveTab(id);
});

const initialBtn =
  document.querySelector(".tabsSwiper .tab-button.active") || tabButtons[0];
if (initialBtn) {
  const initialId = initialBtn.getAttribute("data-tab");
  setActiveTab(initialId);
  slideOuterToTab(initialId);
}

// ================= Add smooth scroll animation to cards =================

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
