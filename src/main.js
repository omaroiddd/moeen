import "./animations.js";
import "./swiperscripts.js";

// words animation
const words = document.querySelectorAll(".word");
let currentIndex = 0;

if (words && words.length > 0) {
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
}

// Field cards hover effect

document.querySelectorAll(".field-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    // Remove active from all cards
    document
      .querySelectorAll(".field-card")
      .forEach((c) => c.classList.remove("active"));
    // Add active only to the hovered one
    card.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");

  const animateCount = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const increment = target / 200; // سرعة العد (عدد الخطوات)

    const updateCount = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };

    updateCount();
  };

  // تشغيل الأنيميشن لما تدخل العناصر الـ viewport
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
});

// --- Field cards interactive ---

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-banner");
  const contents = document.querySelectorAll(".tab-content-banner");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      if (contents[index]) {
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        contents[index].classList.add("active");
      }
    });
  });

  const cards = document.querySelectorAll(".field-card");
  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  function activateCard(card) {
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
    if (!isDesktop()) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (isDesktop()) activateCard(card);
    });
    card.addEventListener("click", () => activateCard(card));
  });

  if (![...cards].some((c) => c.classList.contains("active")) && cards[0]) {
    cards[0].classList.add("active");
  }
});
