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

// --- Draggable falling chips ---
const field = document.getElementById("chip-field");
const chips = [...field.querySelectorAll(".chip")];

const MARGIN = 16; // هوامش أمان لعدم خروج أي جزء خارج الحاوية

// Scroll trigger variables
let hasDropped = false;
let observer;

// Initialize chips function
function initChips() {
  chips.forEach((chip, i) => {
    chip.dataset.color = colors[i % colors.length];
    chip.textContent = chip.dataset.label || "عنصر";

    const rect = field.getBoundingClientRect();
    const w = 120,
      h = 44; // تقريب مبدئي لحجم الشيب
    const cx = rect.width / 2;

    // ابدأ قريب من مركز الحاوية أفقيًا، وفوق الحاوية رأسيًا
    const x = clamp(
      cx - w / 2 + rand(-80, 80),
      MARGIN,
      rect.width - w - MARGIN
    );
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
}

// Setup scroll trigger using Intersection Observer
function setupScrollTrigger() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasDropped) {
          hasDropped = true;
          triggerDrop();
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the container is visible
      rootMargin: "0px 0px -100px 0px", // Trigger 100px before it comes into view
    }
  );

  observer.observe(field);
}

// Trigger the drop animation
function triggerDrop() {
  initChips();
}

// Assign labels/colors and initial positions (but don't drop until scroll)
const colors = [1, 2, 3, 4, 5];
chips.forEach((chip, i) => {
  chip.dataset.color = colors[i % colors.length];
  chip.textContent = chip.dataset.label || "عنصر";
  chip.style.opacity = "0"; // Hide initially
  chip.__state = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    vr: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    width: 120,
    height: 44,
    measured: false,
  };
});

// Initialize scroll trigger
setupScrollTrigger();

// Resize handling (re-clamp positions)
window.addEventListener("resize", () => {
  if (!hasDropped) return; // Don't reposition before drop
  const rect = field.getBoundingClientRect();
  chips.forEach((chip) => {
    const s = chip.__state;
    s.x = clamp(s.x, MARGIN, rect.width - s.width - MARGIN);
    s.y = clamp(s.y, MARGIN, rect.height - s.height - MARGIN);
    place(chip);
  });
});

function resetOnScrollUp() {
  const rect = field.getBoundingClientRect();
  const isAboveViewport = rect.bottom < 0;

  if (isAboveViewport && hasDropped) {
    hasDropped = false;
    chips.forEach((chip) => {
      chip.style.opacity = "0";
      chip.__state.x = 0;
      chip.__state.y = 0;
    });
  }
}
window.addEventListener("scroll", resetOnScrollUp);

// Pointer events
chips.forEach((chip, i) => {
  chip.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    ev.stopPropagation(); // منع التداخل مع أحداث أخرى
    chip.setPointerCapture(ev.pointerId);
    const s = chip.__state;
    s.dragging = true;
    s.vx = s.vy = s.vr = 0;

    // تأكد من قياس الحاوية في الوقت الحالي
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

    // تأكد من قياس الحاوية الحالي
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

    // قياس الحجم الفعلي للشيب إذا لم يتم قياسه بعد
    if (!s.measured) {
      const chipRect = chip.getBoundingClientRect();
      s.width = chipRect.width;
      s.height = chipRect.height;
      s.measured = true;
    }

    // Collisions with bounds (مع هوامش ثابتة) - استخدم الأحجام الفعلية
    const minX = MARGIN;
    const maxX = W - s.width - MARGIN;
    const minY = MARGIN;
    const maxY = H - s.height - MARGIN;

    // تأكد أن الحدود صحيحة
    if (maxX < minX) {
      // إذا كانت الحاوية صغيرة جداً، استخدم المنتصف
      s.x = W / 2 - s.width / 2;
    } else if (s.x <= minX) {
      s.x = minX;
      s.vx = -s.vx * bounce;
      s.vr = -s.vr * bounce;
    } else if (s.x >= maxX) {
      s.x = maxX;
      s.vx = -s.vx * bounce;
      s.vr = -s.vr * bounce;
    }

    if (maxY < minY) {
      // إذا كانت الحاوية صغيرة جداً، استخدم المنتصف
      s.y = H / 2 - s.height / 2;
    } else if (s.y <= minY) {
      s.y = minY;
      s.vy = -s.vy * bounce;
      s.vr = -s.vr * bounce;
    } else if (s.y >= maxY) {
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
  // تأكد من أن القيم رقمية صحيحة
  const x = isNaN(s.x) ? 0 : s.x;
  const y = isNaN(s.y) ? 0 : s.y;
  const r = isNaN(s.r) ? 0 : s.r;

  el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
}

function clamp(v, min, max) {
  // تأكد من أن القيم رقمية
  if (isNaN(v)) return min;
  if (isNaN(min)) min = 0;
  if (isNaN(max)) max = 0;

  return Math.max(min, Math.min(max, v));
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
