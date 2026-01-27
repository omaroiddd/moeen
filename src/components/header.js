// src/components/header.js
const HEADER_TEXT = {
  ar: {
    dir: "rtl",
    align: "text-right",
    logo: {
      src: "/assets/Moeen-logo.png",
      href: "/",
      ariaLabel: "الرئيسية",
      alt: "الشعار",
    },
    nav: [
      { href: "/", label: "الرئيسية" },
      {
        href: "/services.html",
        label: "خدماتنا",
        // submenu: [
        //   { href: "/services/customer-service.html", label: "خدمة العملاء" },
        //   { href: "/services/sales-representative.html", label: "المبيعات" },
        //   { href: "/services/developers.html", label: "تطوير المواقع" },
        //   { href: "/services/cybersecurity.html", label: "الأمن السيبراني" },
        //   { href: "/services/graphic-design.html", label: "التصميم والابداع" },
        //   { href: "/services/video-editing.html", label: "تعديل الفيديوهات" },
        //   { href: "/services/digital-marketing.html", label: "التسويق الرقمي" },
        //   { href: "/services/data-analysis.html", label: "تحليل البيانات" },
        //   {
        //     href: "/services/e-store-managers.html",
        //     label: "التجارة الالكترونية",
        //   },
        //   {
        //     href: "/services/financial-analysis.html",
        //     label: "التحليل المالي",
        //   },
        //   { href: "/services/project-managers.html", label: "ادارة المشاريع" },
        // ],
      },
      { href: "/pricing.html", label: "الأسعار" },
    ],
    cta: {
      href: "/contact.html",
      label: "احجز استشارتك الآن",
    },
    mobile_title: "القائمة",
    mobile_cta_label: "احجز استشارتك الآن",
    lang_switch: "EN",
  },

  en: {
    dir: "ltr",
    align: "text-left",
    logo: {
      src: "/assets/Moeen-logo.png",
      href: "/en/",
      ariaLabel: "Home",
      alt: "Moeen Logo",
    },
    nav: [
      { href: "/en/", label: "Home" },
      {
        href: "/en/services.html",
        label: "Services",
        // submenu: [
        //   {
        //     href: "/en/services/customer-service.html",
        //     label: "Customer Service",
        //   },
        //   { href: "/en/services/sales.html", label: "Sales" },
        //   {
        //     href: "/en/services/technical-support.html",
        //     label: "Technical Support",
        //   },
        //   { href: "/en/services/consulting.html", label: "Consulting" },
        // ],
      },
      { href: "/en/pricing.html", label: "Pricing" },
    ],
    cta: {
      href: "/en/contact.html",
      label: "Book Your Consultation",
    },
    mobile_title: "Menu",
    mobile_cta_label: "Book Your Consultation",
    lang_switch: "العربية",
  },
};

export function mountHeader(el, lang = "ar") {
  if (!el) return;

  const t = HEADER_TEXT[lang] || HEADER_TEXT.ar;
  const isRtl = t.dir === "rtl";

  const desktopNavHtml = t.nav
    .map((item) => {
      if (item.submenu) {
        // Item with submenu
        const submenuItems = item.submenu
          .map(
            (sub) =>
              `<a href="${sub.href}" class="block px-4 py-2 text-sm text-[#5d6481] hover:bg-gray-50 hover:text-primary transition-colors rounded-lg">
              ${sub.label}
            </a>`,
          )
          .join("");

        return `
          <div class="nav-item-wrapper relative group">
            <a href="${
              item.href
            }" class="nav-link nav-link-dropdown flex items-center gap-1 px-1 py-0.5 text-sm md:text-base transition-colors text-[#5d6481] hover:text-primary rounded
               after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
               after:scale-x-0 group-hover:after:scale-x-100 ${
                 isRtl
                   ? "after:origin-right group-hover:after:origin-right"
                   : "after:origin-left group-hover:after:origin-left"
               } after:transition-transform">
              ${item.label}
              <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            
            <!-- Dropdown Menu -->
            <div class="submenu absolute ${
              isRtl ? "right-0" : "left-0"
            } mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform group-hover:translate-y-0 -translate-y-2 z-50">
              <div class="rounded-xl shadow-lg border border-gray-100 py-2 backdrop-blur-sm bg-white/95">
                ${submenuItems}
              </div>
            </div>
          </div>`;
      } else {
        // Regular link
        return `
          <a href="${
            item.href
          }" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors text-[#5d6481] hover:text-primary rounded
             after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
             after:scale-x-0 hover:after:scale-x-100 ${
               isRtl
                 ? "after:origin-right hover:after:origin-right"
                 : "after:origin-left hover:after:origin-left"
             } after:transition-transform">
            ${item.label}
          </a>`;
      }
    })
    .join("");

  const mobileNavHtml = t.nav
    .map((item) => {
      if (item.submenu) {
        const submenuItems = item.submenu
          .map(
            (sub) =>
              `<li><a class="m-link block rounded-xl px-6 py-2 hover:bg-gray-100 text-sm" href="${sub.href}">${sub.label}</a></li>`,
          )
          .join("");

        return `
          <li>
            <a href="${
              item.href
            }" class="mobile-dropdown-toggle w-full flex items-center justify-between rounded-xl px-3 py-2 hover:bg-gray-100">
              ${item.label}
              <button type="button" class="mobile-dropdown-btn p-1" aria-label="Toggle submenu">
                <svg class="mobile-dropdown-icon w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </a>
            <ul class="mobile-submenu hidden space-y-1 mt-1 ${
              isRtl ? "pr-2" : "pl-2"
            }">
              ${submenuItems}
            </ul>
          </li>`;
      } else {
        return `
          <li>
            <a class="m-link block rounded-xl px-3 py-2 hover:bg-gray-100" href="${item.href}">
              ${item.label}
            </a>
          </li>`;
      }
    })
    .join("");

  el.setAttribute(
    "class",
    "fixed w-full top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/40",
  );

  el.innerHTML = `
<div
  class="container mx-auto px-4 sm:px-6 md:px-16 py-6 md:py-16 max-w-[1500px] flex h-16 sm:h-20 items-center gap-6 md:gap-8 justify-between"
  dir="${t.dir}"
>
  <!-- Logo + Nav -->
  <div class="flex items-center justify-between gap-4 md:gap-12">
    <!-- Logo -->
    <a class="block shrink-0 rounded" href="${t.logo.href}" aria-label="${
      t.logo.ariaLabel
    }">
      <img src="${t.logo.src}" class="site-logo w-auto h-18 lg:h-22" alt="${
        t.logo.alt
      }" />
    </a>

    <!-- Desktop Nav -->
    <nav class="site-nav hidden md:flex items-center gap-4 sm:gap-6 font-medium" aria-label="Main navigation">
      ${desktopNavHtml}
    </nav>
  </div>

  <!-- CTA -->
  <a id="ctaBtn" href="${t.cta.href}" class="cta-btn ${
    isRtl ? "mr-auto" : "ml-auto"
  } hidden md:inline-flex rounded-full">
    <div class="dots_border"></div>
    <span class="text_button">${t.cta.label}</span>
  </a>

  <!-- Language Switch (Desktop) -->
  <a href="#" class="lang-switch text-primary font-semibold hover:underline hidden md:inline-flex md:items-center md:justify-center rounded">
    ${t.lang_switch}
    <img src="/assets/globe-rotate.gif" alt="Language" class="inline-block w-6 h-6 ${
      isRtl ? "mr-1" : "ml-1"
    }"/>
  </a>

  <!-- Mobile: hamburger -->
  <button id="menuBtn" type="button"
          class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border bg-primary border-gray-200"
          aria-label="${
            isRtl ? "فتح القائمة" : "Open menu"
          }" aria-expanded="false" aria-controls="mobileMenu">
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
       class="fixed top-0 bottom-0 ${
         isRtl ? "right-0" : "left-0"
       } w-[85%] max-w-sm shadow-2xl ${
         isRtl ? "translate-x-full" : "-translate-x-full"
       }
              transition-transform duration-300 ease-out md:hidden flex flex-col bg-secondary"
       tabindex="-1" aria-hidden="true">
  <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-secondary">
    <span class="font-semibold">${t.mobile_title}</span>
    <button id="closeMenu" type="button"
            class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-primary"
            aria-label="${isRtl ? "إغلاق القائمة" : "Close menu"}">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <nav class="flex-1 p-4 bg-secondary" aria-label="Mobile navigation">
    <ul class="space-y-2 text-base">
      ${mobileNavHtml}
      <li class="pt-2">
        <a href="${t.cta.href}"
           class="m-link block text-center rounded-full bg-primary text-secondary px-4 py-3 font-medium">
          ${t.mobile_cta_label}
        </a>
      </li>
      <li>
        <a href="#" class="lang-switch text-primary font-semibold hover:underline inline-flex items-center justify-center rounded">
          ${t.lang_switch}
          <img src="/assets/globe-rotate.gif" alt="Language" class="inline-block w-6 h-6 mr-1"/>
        </a>
      </li>
    </ul>
  </nav>

  <div class="p-4 text-xs text-gray-500 bg-secondary ${
    isRtl ? "rounded-bl-[30px]" : "rounded-br-[30px]"
  }">
    © <span id="year"></span> Moeen
  </div>
</aside>
  `;

  wireHeader(el);
  wireMobileDropdowns(el);
  markActiveDesktopLink(el);
}

// Mobile submenu functionality
function wireMobileDropdowns(root) {
  const dropdownBtns = root.querySelectorAll(".mobile-dropdown-btn");

  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent link navigation

      const listItem = btn.closest("li");
      const submenu = listItem
        ? listItem.querySelector(".mobile-submenu")
        : null;
      const icon = btn.querySelector(".mobile-dropdown-icon");

      if (submenu) {
        const isOpen = !submenu.classList.contains("hidden");

        if (isOpen) {
          submenu.classList.add("hidden");
          if (icon) icon.style.transform = "rotate(0deg)";
        } else {
          submenu.classList.remove("hidden");
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      }
    });
  });
}

// نفس لوجيك الموبايل القديم تقريباً
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

    // Check if RTL or LTR
    const isRtl = drawer.classList.contains("right-0");
    if (isRtl) {
      drawer.classList.remove("translate-x-full");
    } else {
      drawer.classList.remove("-translate-x-full");
    }

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

    // Check if RTL or LTR
    const isRtl = drawer.classList.contains("right-0");
    if (isRtl) {
      drawer.classList.add("translate-x-full");
    } else {
      drawer.classList.add("-translate-x-full");
    }

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
    (e) => e.key === "Escape" && closeMenu(),
  );
  links.forEach((a) => a.addEventListener("click", closeMenu));

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  root.dataset.headerWired = "1";
}

// نفس الفنكشن بتاعة تفعيل اللينك الأكتيف
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
        "after:!bg-[#6adf73]",
      );
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove(
        "text-[#6adf73]",
        "after:scale-x-100",
        "after:origin-left",
        "after:!bg-[#6adf73]",
      );
      a.removeAttribute("aria-current");
    }
  });
}
