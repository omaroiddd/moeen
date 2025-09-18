import AOS from "aos";
import "aos/dist/aos.css";

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

// stage cards animation
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", function () {
  gsap.set("#stage .card", {
    opacity: 0,
    y: 40,
    rotate: -4,
    willChange: "transform, opacity",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#stage",
      start: "top 80%",
      end: "bottom 40%",
      scrub: 1.5,
      markers: false,
      yoyo: true,
      refreshPriority: -1,
      onRefresh: (self) => self.animation && self.animation.invalidate(),
      onComplete: () => ScrollTrigger.refresh(),
    },
  });

  gsap.utils.toArray("#stage .card").forEach((card, i) => {
    tl.to(
      card,
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      i * 0.2
    );
  });
});
