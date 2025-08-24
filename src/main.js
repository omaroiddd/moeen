import Swiper from "swiper/bundle";
import "swiper/css/bundle";

// logos slider
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true, // ✅ infinite loop
  autoplay: {
    delay: 2500, // ✅ autoplay delay (ms)
    disableOnInteraction: false, // keep autoplay after user interaction
    reverseDirection: false, // ✅ set true if you want reverse direction
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

// words animation

const words = document.querySelectorAll(".word");
let currentIndex = 0;

function rotateWords() {
  // Remove active class from current word and add exit animation
  words[currentIndex].classList.remove("active");
  words[currentIndex].classList.add("exit");

  // Move to next word
  currentIndex = (currentIndex + 1) % words.length;

  // After exit animation completes, show next word
  setTimeout(() => {
    // Reset all words
    words.forEach((word) => {
      word.classList.remove("active", "exit", "enter");
    });

    // Add enter animation to new word
    words[currentIndex].classList.add("enter");

    // After a brief delay, make it active
    setTimeout(() => {
      words[currentIndex].classList.remove("enter");
      words[currentIndex].classList.add("active");
    }, 50);
  }, 400);
}

// Start rotation after initial display
setInterval(rotateWords, 2000);

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
    480: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 0,
    },
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
      navigation: {
        enabled: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
    });
  }
}

// Initialize the active tab's swiper
initializeSwiper("sales");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => {
      btn.classList.remove("active", "text-primary", "border-primary");
      btn.classList.add("border-transparent");
    });

    tabContents.forEach((content) => {
      content.classList.add("hidden");
    });

    // Add active class to clicked button
    button.classList.add("active", "text-primary", "border-primary");
    button.classList.remove("border-transparent");

    // Show target content
    const targetContent = document.getElementById(targetTab);
    targetContent.classList.remove("hidden");

    // Initialize swiper for the active tab
    setTimeout(() => {
      initializeSwiper(targetTab);
    }, 100);
  });
});

// Add smooth scroll animation to cards
const cards = document.querySelectorAll(".candidate-card");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(30px)";

      setTimeout(() => {
        entry.target.style.transition = "all 0.6s ease-out";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, 100);
    }
  });
}, observerOptions);

cards.forEach((card) => {
  observer.observe(card);
});

