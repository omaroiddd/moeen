import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: false,
  mirror: true,
});

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Smooth scrolling

ScrollSmoother.create({
  smooth: 3,
  effects: true,
  smoothTouch: 0.1,
});

// Mobile menu

const btn = document.getElementById("menuButton");
const panel = document.getElementById("mobileMenu");

if (btn && panel) {
  const items = () => panel.querySelectorAll(".mm-item, .space-y-2 a, .mt-4 a");

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out" },
    onStart() {
      panel.classList.remove("hidden");
      panel.setAttribute("aria-hidden", "false");
    },
    onComplete() {},
    onReverseComplete() {
      panel.classList.add("hidden");
      panel.setAttribute("aria-hidden", "true");
    },
  });

  tl.from(panel, {
    height: 0,
    y: -8,
    autoAlpha: 0,
    duration: 0.28,
    clearProps: "height",
  });

  tl.from(
    items(),
    {
      y: 8,
      autoAlpha: 0,
      duration: 0.18,
      stagger: 0.05,
      onComplete: function () {
        items().forEach((item) => {
          gsap.set(item, { autoAlpha: 1, y: 0 });
        });
      },
    },
    "-=0.12"
  );

  let open = false;

  btn.addEventListener("click", () => {
    if (tl.isActive()) {
      return;
    }
    open ? tl.reverse() : tl.play(0);
    open = !open;
    btn.setAttribute("aria-expanded", String(open));
  });
}

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
gsap.to(".title", {
  xPercent: 250,
  ease: "none",
  scrollTrigger: {
    trigger: ".title",
    start: "top bottom",
    end: "bottom top",
    scrub: 2,
  },
});
