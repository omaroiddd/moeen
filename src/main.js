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
      loop: false,
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

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-banner");
  const contents = document.querySelectorAll(".tab-content-banner");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Check if the content exists before trying to access it
      if (contents[index]) {
        // Remove active class from all tabs
        tabs.forEach((t) => t.classList.remove("active"));

        // Hide all contents
        contents.forEach((c) => c.classList.remove("active"));

        // Activate clicked tab
        tab.classList.add("active");

        // Show corresponding content
        contents[index].classList.add("active");
      }
    });
  });
});

const field = document.getElementById("chip-field");
const chips = [...field.querySelectorAll(".chip")];

const MARGIN = 16; // هوامش أمان لعدم خروج أي جزء خارج الحاوية

// Assign labels/colors and initial positions (centered + drop from top fast)
const colors = [1, 2, 3, 4, 5];
chips.forEach((chip, i) => {
  chip.dataset.color = colors[i % colors.length];
  chip.textContent = chip.dataset.label || "عنصر";

  const rect = field.getBoundingClientRect();
  const w = 120,
    h = 44; // تقريب مبدئي لحجم الشيب
  const cx = rect.width / 2;

  // ابدأ قريب من مركز الحاوية أفقيًا، وفوق الحاوية رأسيًا
  const x = clamp(cx - w / 2 + rand(-80, 80), MARGIN, rect.width - w - MARGIN);
  const y = -h - rand(20, 80);

  const tilt = parseFloat(chip.dataset.tilt || 0);
  chip.__state = {
    x,
    y,
    // سرعات ابتدائية للنزول السريع من الأعلى
    vx: rand(-0.5, 0.5),
    vy: rand(7, 12),
    r: tilt,
    vr: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    width: w,
    height: h,
    measured: false,
  };
  place(chip);
  chip.style.opacity = "1";
});

// Resize handling (re-clamp positions)
window.addEventListener("resize", () => {
  const rect = field.getBoundingClientRect();
  chips.forEach((chip) => {
    const s = chip.__state;
    s.x = clamp(s.x, MARGIN, rect.width - s.width - MARGIN);
    s.y = clamp(s.y, MARGIN, rect.height - s.height - MARGIN);
    place(chip);
  });
});

// Pointer events
chips.forEach((chip, i) => {
  chip.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    chip.setPointerCapture(ev.pointerId);
    const s = chip.__state;
    s.dragging = true;
    s.vx = s.vy = s.vr = 0;
    const rect = field.getBoundingClientRect();
    s.offsetX = ev.clientX - (rect.left + s.x);
    s.offsetY = ev.clientY - (rect.top + s.y);
    s.lastX = ev.clientX;
    s.lastY = ev.clientY;
    s.lastT = performance.now();
    chip.style.zIndex = 10 + i; // bring to front
  });

  chip.addEventListener("pointermove", (ev) => {
    const s = chip.__state;
    if (!s.dragging) return;
    const rect = field.getBoundingClientRect();

    // Position
    const nx = ev.clientX - rect.left - s.offsetX;
    const ny = ev.clientY - rect.top - s.offsetY;

    // Velocity (pixels/ms)
    const now = performance.now();
    const dt = Math.max(1, now - s.lastT);
    s.vx = (ev.clientX - s.lastX) / dt;
    s.vy = (ev.clientY - s.lastY) / dt;
    s.vr = s.vx * 0.06;
    s.lastX = ev.clientX;
    s.lastY = ev.clientY;
    s.lastT = now;

    // Clamp within field while dragging (مع هوامش)
    s.x = clamp(nx, MARGIN, rect.width - s.width - MARGIN);
    s.y = clamp(ny, MARGIN, rect.height - s.height - MARGIN);
    place(chip);
  });

  const end = (ev) => {
    const s = chip.__state;
    if (!s.dragging) return;
    try {
      chip.releasePointerCapture(ev.pointerId);
    } catch {}
    s.dragging = false;
    // amplify velocity a bit (px/ms -> px/frame ~16ms)
    s.vx *= 14;
    s.vy *= 14;
    s.vr *= 14;
  };
  chip.addEventListener("pointerup", end);
  chip.addEventListener("pointercancel", end);
});

// Physics loop (faster drop via higher gravity)
const damping = 0.985; // inertia
const rotationDamp = 0.98;
const bounce = 0.6; // restitution
const friction = 0.012; // air resistance-ish
const gravity = 0.25; // أقوى عشان الهبوط أسرع

function tick() {
  const rect = field.getBoundingClientRect();
  const W = rect.width;
  const H = rect.height;

  for (const chip of chips) {
    const s = chip.__state;
    if (s.dragging) continue;

    // Apply physics
    s.vy += gravity;
    s.vx *= 1 - friction;
    s.vy *= 1 - friction;

    s.x += s.vx;
    s.y += s.vy;
    s.r += s.vr;

    // Collisions with bounds (مع هوامش ثابتة)
    const minX = MARGIN,
      maxX = W - s.width - MARGIN;
    const minY = MARGIN,
      maxY = H - s.height - MARGIN;

    if (s.x <= minX) {
      s.x = minX;
      s.vx = -s.vx * bounce;
      s.vr = -s.vr * bounce;
    }
    if (s.x >= maxX) {
      s.x = maxX;
      s.vx = -s.vx * bounce;
      s.vr = -s.vr * bounce;
    }
    if (s.y <= minY) {
      s.y = minY;
      s.vy = -s.vy * bounce;
      s.vr = -s.vr * bounce;
    }
    if (s.y >= maxY) {
      s.y = maxY;
      s.vy = -s.vy * bounce;
      s.vr = -s.vr * bounce;
    }

    s.vx *= damping;
    s.vy *= damping;
    s.vr *= rotationDamp;

    // Stop if nearly resting
    const speed2 = s.vx * s.vx + s.vy * s.vy;
    if (speed2 < 0.02 && Math.abs(s.vr) < 0.02) {
      s.vx = s.vy = s.vr = 0;
    }

    place(chip);
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// Helpers
function place(el) {
  const s = el.__state;
  el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.r}deg)`;
  // Measure size once (after layout) for better collisions
  if (!s.measured) {
    const rect = el.getBoundingClientRect();
    s.width = rect.width;
    s.height = rect.height;
    s.measured = true;
  }
}
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function rand(min, max) {
  return Math.random() * (max - min) + min;
}
