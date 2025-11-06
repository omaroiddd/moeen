// header-en.js (ESM)
export function mountHeader(el) {
  if (!el) return;

  el.setAttribute(
    "class",
    "fixed w-full top-0 z-50 !bg-[image:var(--linear-gradient)] bg-cover bg-no-repeat backdrop-blur supports-[backdrop-filter]:bg-white/60"
  );

  el.innerHTML = `
<!-- Header (LTR) -->
<div
  class="container mx-auto px-4 sm:px-6 md:px-16 py-6 md:py-16 max-w-[1500px] flex h-16 sm:h-20 items-center gap-6 md:gap-8 justify-between"
  dir="ltr"
>
  <!-- Logo + Nav -->
  <div class="flex items-center justify-between gap-4 md:gap-12">
    <!-- Logo -->
    <a class="block shrink-0" href="/en/" aria-label="Home">
      <img src="/assets/Moeen-logo.png" class="site-logo w-auto h-18 lg:h-22" alt="Moeen Logo" />
    </a>

    <!-- Desktop Nav -->
    <nav class="site-nav hidden md:flex items-center gap-4 sm:gap-6 font-medium" aria-label="Main navigation">
      <a href="/en/" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors text-[#5d6481] hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-left hover:after:origin-left after:transition-transform">Home</a>
      <a href="/en/services.html" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors text-[#5d6481] hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-left hover:after:origin-left after:transition-transform">Services</a>
      <a href="/en/pricing.html" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors text-[#5d6481] hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-left hover:after:origin-left after:transition-transform">Pricing</a>
    </nav>
  </div>

  <a id="ctaBtn" href="/en/contact.html" class="ml-auto hidden md:inline-flex">
    <div class="dots_border"></div>
    <span class="text_button">Book Your Consultation</span>
  </a>

  <!-- Language Switch (Desktop) -->
<a href="#" class="lang-switch text-primary font-semibold hover:underline hidden md:inline-flex">العربية</a>


  <!-- Mobile: hamburger -->
  <button id="menuBtn" type="button"
          class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border bg-primary border-gray-200"
          aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h10" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>
</div>

<!-- Mobile Overlay -->
<div id="overlay"
     class="fixed inset-0 bg-secondary opacity-0 pointer-events-none transition-opacity duration-200 md:hidden"></div>

<!-- Mobile Drawer -->
<aside id="mobileMenu"
       class="fixed top-0 bottom-0 left-0 w-[85%] max-w-sm shadow-2xl -translate-x-full
              transition-transform duration-300 ease-out md:hidden flex flex-col shadow-lg bg-secondary"
       tabindex="-1" aria-hidden="true">
  <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-secondary">
    <span class="font-semibold">Menu</span>
    <button id="closeMenu" type="button"
            class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-primary"
            aria-label="Close menu">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <nav class="flex-1 p-4 bg-secondary" aria-label="Mobile navigation">
    <ul class="space-y-2 text-base">
      <li><a class="m-link block rounded-xl px-3 py-2 hover:bg-gray-100" href="/en/">Home</a></li>
      <li><a class="m-link block rounded-xl px-3 py-2 hover:bg-gray-100" href="/en/services.html">Services</a></li>
      <li><a class="m-link block rounded-xl px-3 py-2 hover:bg-gray-100" href="/en/pricing.html">Pricing</a></li>
      <li class="pt-2">
        <a href="/en/contact.html"
           class="m-link block text-center rounded-2xl bg-primary text-secondary px-4 py-3 font-medium">
          Book Your Consultation
        </a>
      </li>
      <li>
<a href="#" class="lang-switch text-primary font-semibold hover:underline">العربية</a>
      </li>
    </ul>
  </nav>

  <div class="p-4 text-xs text-gray-500 bg-secondary rounded-br-[30px]">
    © <span id="year"></span> Moeen
  </div>
</aside>
  `;

  wireHeader(el);
}

// Mobile menu + highlighting logic
function wireHeader(root) {
  if (root.dataset.headerWired === "1") return;

  const menuBtn = root.querySelector("#menuBtn");
  const closeBtn = root.querySelector("#closeMenu");
  const drawer = root.querySelector("#mobileMenu");
  const overlay = root.querySelector("#overlay");
  const links = drawer ? drawer.querySelectorAll(".m-link") : [];
  const yearEl = root.querySelector("#year");
  let isOpen = false;

  function lockScroll(lock) {
    document.documentElement.classList.toggle("overflow-hidden", lock);
    document.body.classList.toggle("overflow-hidden", lock);
    document.body.style.touchAction = lock ? "none" : "";
  }

  function openMenu() {
    if (isOpen || !drawer || !overlay) return;
    isOpen = true;
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");

    drawer.classList.remove("-translate-x-full");
    overlay.classList.remove("pointer-events-none");
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });

    lockScroll(true);
    setTimeout(() => drawer && drawer.focus(), 10);
  }

  function closeMenu() {
    if (!isOpen || !drawer || !overlay) return;
    isOpen = false;
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");

    drawer.classList.add("-translate-x-full");
    overlay.style.opacity = "0";
    setTimeout(() => overlay.classList.add("pointer-events-none"), 200);

    lockScroll(false);
    menuBtn && menuBtn.focus();
  }

  menuBtn && menuBtn.addEventListener("click", openMenu);
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  overlay && overlay.addEventListener("click", closeMenu);
  document.addEventListener(
    "keydown",
    (e) => e.key === "Escape" && closeMenu()
  );
  links.forEach((a) => a.addEventListener("click", closeMenu));

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  markActiveDesktopLink(root);
  root.dataset.headerWired = "1";
}

function markActiveDesktopLink(root) {
  if (!root) return;
  const normalize = (path) => {
    if (!path) return "/";
    path = path.split("#")[0].split("?")[0];
    path = path.replace(/\/index(?:\.html?)?$/i, "");
    path = path.replace(/\.html?$/i, "");
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    try {
      path = decodeURIComponent(path);
    } catch {}
    return path || "/";
  };

  const current = normalize(location.pathname);
  const links = root.querySelectorAll(".site-nav .nav-link[href]");
  links.forEach((a) => {
    const rawHref = a.getAttribute("href");
    if (
      !rawHref ||
      rawHref.startsWith("#") ||
      rawHref.startsWith("javascript:")
    )
      return;
    const url = new URL(rawHref, location.origin);
    if (url.origin !== location.origin) return;
    const to = normalize(url.pathname);
    if (to === current) {
      a.classList.add(
        "text-[#6adf73]",
        "after:scale-x-100",
        "after:origin-left",
        "after:!bg-[#6adf73]"
      );
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove(
        "text-[#6adf73]",
        "after:scale-x-100",
        "after:origin-left",
        "after:!bg-[#6adf73]"
      );
      a.removeAttribute("aria-current");
    }
  });
}
