import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  offset: 200,
  once: false, // 👈 animate every time (scroll down & up)
  mirror: true, // 👈 replay animation in reverse when leaving viewport
});

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  smooth: 3, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

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