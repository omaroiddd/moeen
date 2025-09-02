import AOS from "aos";
import "aos/dist/aos.css";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

// Loader animation
window.addEventListener("load", function () {
  const loader = document.getElementById("loader-wrapper");
  if (!loader) return;

  gsap.delayedCall(1, () => {
    gsap.to(loader, {
      duration: 0.6,
      autoAlpha: 0,
      ease: "power2.out",
      onComplete: () => (loader.style.display = "none"),
    });
  });
});

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin);

// Smooth scrolling

ScrollSmoother.create({
  smooth: 2,
  effects: true,
  smoothTouch: 0.1,
});

window.addEventListener("load", () => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: false,
    mirror: true,
  });

  ScrollTrigger.addEventListener("refresh", () => {
    AOS.refresh();
  });

  AOS.refresh();
});

// Animate icons in section two
const imgWithIcons = document.querySelectorAll(".img-with-icons");

if (imgWithIcons.length > 0) {
  imgWithIcons.forEach((img) => {
    const icons = img.querySelectorAll(".icon-svg");
    if (icons.length > 0) {
      // Set initial state for all icons
      gsap.set(icons, {
        opacity: 0,
        y: 50,
        scale: 0.8,
      });

      icons.forEach((icon, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".sec-sec",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Animate each icon with a slight delay
        tl.to(icon, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.2, // Stagger effect
        });
      });
    }
  });
}

// Title animation
window.addEventListener("DOMContentLoaded", () => {
  gsap.utils.toArray(".title-contactus").forEach((el) => {
    gsap.to(el, {
      xPercent: 250,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  });

  // Parallax background for about us section

  const windowWidth = window.innerWidth;
  const el = document.getElementById("about-us");
  if (windowWidth > 768 && el) {
    gsap.set(el, { backgroundPositionY: 0 });

    gsap.to(el, {
      backgroundPositionY: 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
});

// --- falling of cards

const initializedStages = new WeakSet();

export function initCards({
  stageSelector = "#stage",
  cardSelector = ".card",
  gridSize = 20,
  bounceFactor = 0.6,
  resistance = 350,
} = {}) {
  const stage = document.querySelector(stageSelector);
  if (!stage) return { destroy() {} }; // not on this page → safe no-op
  if (initializedStages.has(stage)) return { destroy() {} }; // already set up
  initializedStages.add(stage);

  const cards = gsap.utils.toArray(cardSelector);
  if (!cards.length) return { destroy() {} };

  const snap = (v) => Math.round(v / gridSize) * gridSize;

  const lift = (el, up = true) =>
    gsap.to(el, {
      duration: 0.15,
      scale: up ? 1.06 : 1,
      ease: "power2.out",
      overwrite: "auto",
    });

  function getBoundsFor(card) {
    const sw = stage.clientWidth,
      sh = stage.clientHeight;
    const cw = card.offsetWidth,
      ch = card.offsetHeight;
    return { minX: 0, maxX: sw - cw, minY: 0, maxY: sh - ch };
  }

  function throwWithBounce(card, vx, vy) {
    InertiaPlugin.track(card, "x,y");
    const bounds = getBoundsFor(card);

    const snapToGrid = () => {
      const b = getBoundsFor(card);
      let x = snap(gsap.getProperty(card, "x"));
      let y = snap(gsap.getProperty(card, "y"));
      x = gsap.utils.clamp(b.minX, b.maxX, x);
      y = gsap.utils.clamp(b.minY, b.maxY, y);
      gsap.to(card, { x, y, duration: 0.12, ease: "power2.out" });
    };

    const bounceCheck = () => {
      let x = gsap.getProperty(card, "x");
      let y = gsap.getProperty(card, "y");

      if (x > bounds.maxX || x < bounds.minX) {
        const atRight = x > bounds.maxX;
        gsap.set(card, { x: atRight ? bounds.maxX : bounds.minX });
        const curVx = InertiaPlugin.getVelocity(card, "x") || vx || 0;
        curTween.kill();
        InertiaPlugin.track(card, "x,y");
        curTween = gsap.to(card, {
          ease: "none",
          inertia: {
            x: { velocity: -curVx * bounceFactor, resistance },
            y: {
              velocity: InertiaPlugin.getVelocity(card, "y") || vy,
              resistance,
            },
          },
          onUpdate: bounceCheck,
          onComplete: snapToGrid,
        });
        return;
      }

      if (y > bounds.maxY || y < bounds.minY) {
        const atBottom = y > bounds.maxY;
        gsap.set(card, { y: atBottom ? bounds.maxY : bounds.minY });
        const curVy = InertiaPlugin.getVelocity(card, "y") || vy || 0;
        curTween.kill();
        InertiaPlugin.track(card, "x,y");
        curTween = gsap.to(card, {
          ease: "none",
          inertia: {
            x: {
              velocity: InertiaPlugin.getVelocity(card, "x") || vx,
              resistance,
            },
            y: { velocity: -curVy * bounceFactor, resistance },
          },
          onUpdate: bounceCheck,
          onComplete: snapToGrid,
        });
        return;
      }
    };

    let curTween = gsap.to(card, {
      ease: "none",
      inertia: {
        x: { velocity: vx, resistance },
        y: { velocity: vy, resistance },
      },
      onUpdate: bounceCheck,
      onComplete: snapToGrid,
    });
  }

  function setupCard(card) {
    const left = parseFloat(card.style.left) || 0;
    const top = parseFloat(card.style.top) || 0;
    gsap.set(card, { x: left, y: top });
    card.style.left = "0px";
    card.style.top = "0px";

    Draggable.create(card, {
      type: "x,y",
      bounds: stage,
      edgeResistance: 0.85,
      inertia: true,
      zIndexBoost: true,
      liveSnap: { x: snap, y: snap },
      onPress() {
        gsap.killTweensOf(card);
        lift(card, true);
        InertiaPlugin.track(card, "x,y");
      },
      onRelease() {
        lift(card, false);
      },
      onDragEnd() {
        const inst = Draggable.get(card);
        const vx = inst?.getVelocity?.("x") ?? 0;
        const vy = inst?.getVelocity?.("y") ?? 0;
        if (Math.hypot(vx, vy) > 20) throwWithBounce(card, vx, vy);
      },
    });
  }

  cards.forEach(setupCard);

  // keep inside stage on resize
  const onResize = () => {
    cards.forEach((card) => {
      const b = getBoundsFor(card);
      const x = gsap.utils.clamp(b.minX, b.maxX, gsap.getProperty(card, "x"));
      const y = gsap.utils.clamp(b.minY, b.maxY, gsap.getProperty(card, "y"));
      gsap.set(card, { x, y });
    });
  };
  window.addEventListener("resize", onResize);

  // one-time fall-in when stage enters viewport
  const io = new IntersectionObserver(
    (entries, obs) => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;
      obs.disconnect();

      const dropOffset = stage.clientHeight + 120;
      const tl = gsap.timeline();
      cards.forEach((card, i) => {
        const b = getBoundsFor(card);
        const finalX = gsap.utils.random(b.minX, b.maxX);
        const finalY = b.maxY;
        gsap.set(card, { x: finalX, y: finalY - dropOffset });
        tl.to(
          card,
          {
            x: finalX,
            y: finalY,
            ease: "bounce.out",
            duration: 1.0,
            delay: i * 0.06,
          },
          0
        );
      });
    },
    { threshold: 0.15 }
  );
  io.observe(stage);

  // expose a cleanup API in case you navigate or re-init
  function destroy() {
    window.removeEventListener("resize", onResize);
    try {
      io.disconnect();
    } catch {}
    // kill draggables & tweens
    cards.forEach((card) => {
      const d = Draggable.get(card);
      d?.kill?.();
      gsap.killTweensOf(card);
    });
    initializedStages.delete(stage);
  }

  return { destroy };
}

document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector("#stage");
  if (stage) {
    initCards();
  }
});
// --- end falling of cards ---
