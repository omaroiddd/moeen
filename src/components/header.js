// header.js (ESM)
export function mountHeader(el) {
  if (!el) return;

  el.setAttribute(
    "class",
    "relative top-0 z-50 !bg-[image:var(--linear-gradient)] bg-cover bg-no-repeat backdrop-blur supports-[backdrop-filter]:bg-white/60"
  );

  el.innerHTML = `
<!-- Header (RTL) -->
<div
  class="container mx-auto px-4 sm:px-6 md:px-16 py-6 md:py-16 flex h-16 sm:h-24 items-center gap-6 md:gap-8 justify-between"
  dir="rtl"
>
  <!-- المجموعة: الشعار + الناف -->
  <div class="flex items-center gap-4 md:gap-8">
    <!-- Logo -->
    <a class="block shrink-0" href="/" aria-label="الرئيسية">
      <img src="/assets/Moeen-logo.png" class="site-logo w-auto h-18 lg:h-24" alt="الشعار" />
    </a>

    <!-- Desktop Nav -->
    <nav class="site-nav hidden md:flex items-center gap-4 sm:gap-6 font-medium" aria-label="التنقل الرئيسي">
      <a href="/" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform">الرئيسية</a>
      <a href="/services.html" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform">خدمتنا</a>
      <a href="/pricing.html" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform">تسعير</a>
    </nav>
  </div>

<a id="ctaBtn" href="/contact.html" class="mr-auto hidden md:inline-flex">
  <div class="dots_border"></div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="sparkle"
  >
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="black"
      fill="black"
      d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
    ></path>
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="black"
      fill="black"
      d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
    ></path>
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="black"
      fill="black"
      d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
    ></path>
  </svg>
  <span class="text_button">احجز استشارتك الآن</span>
</a>

  <!-- Mobile: hamburger -->
  <button id="menuBtn" type="button"
          class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border bg-primary border-gray-200"
          aria-label="فتح القائمة" aria-expanded="false" aria-controls="mobileMenu">
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M10 18h10" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </button>
</div>

<!-- Mobile Overlay (fade-in/out via opacity) -->
<div id="overlay"
     class="fixed inset-0 bg-secondary opacity-0 pointer-events-none transition-opacity duration-200 md:hidden"></div>

<!-- Mobile Drawer (slide from right via translate-x) -->
<aside id="mobileMenu"
       class="fixed top-0 bottom-0 right-0 w-[85%] max-w-sm shadow-2xl translate-x-full
              transition-transform duration-300 ease-out md:hidden flex flex-col shadow-lg"
       tabindex="-1" aria-hidden="true">
  <div class="flex items-center justify-between p-4 border-b border-gray-100 bg-secondary">
    <span class="font-semibold">القائمة</span>
    <button id="closeMenu" type="button"
            class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-primary"
            aria-label="إغلاق القائمة">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <nav class="flex-1 p-4 bg-secondary" aria-label="قائمة الموبايل">
    <ul class="space-y-2 text-base">
      <li><a class="m-link block rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800" href="/">الرئيسية</a></li>
      <li><a class="m-link block rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800" href="/services.html">خدمتنا</a></li>
      <li><a class="m-link block rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800" href="/pricing.html">تسعير</a></li>
      <li class="pt-2">
        <a href="/contact.html"
           class="m-link block text-center rounded-2xl bg-primary text-secondary px-4 py-3 font-medium">
          احجز استشارتك الآن
        </a>
      </li>
    </ul>
  </nav>

  <div class="p-4 text-xs text-gray-500 bg-secondary rounded-bl-[30px]">
    © <span id="year"></span> Moeen
  </div>
</aside>
  `;

  // وصّل الأحداث بعد الحقن
  wireHeader(el);
}

// توصيل منيو الموبايل بدون GSAP
function wireHeader(root) {
  // منع إعادة التهيئة لو اتندَهت تاني
  if (root.dataset.headerWired === "1") return;

  var menuBtn = root.querySelector("#menuBtn");
  var closeBtn = root.querySelector("#closeMenu");
  var drawer = root.querySelector("#mobileMenu");
  var overlay = root.querySelector("#overlay");
  var links = drawer ? drawer.querySelectorAll(".m-link") : [];
  var yearEl = root.querySelector("#year");
  var isOpen = false;

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

    drawer.classList.remove("translate-x-full");
    overlay.classList.remove("pointer-events-none");
    requestAnimationFrame(function () {
      overlay.style.opacity = "1";
    });

    lockScroll(true);
    setTimeout(function () {
      drawer && drawer.focus();
    }, 10);
  }

  function closeMenu() {
    if (!isOpen || !drawer || !overlay) return;
    isOpen = false;
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");

    drawer.classList.add("translate-x-full");
    overlay.style.opacity = "0";
    setTimeout(function () {
      overlay.classList.add("pointer-events-none");
    }, 200); // تطابق duration-200

    lockScroll(false);
    menuBtn && menuBtn.focus();
  }

  // Events
  menuBtn && menuBtn.addEventListener("click", openMenu);
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  overlay && overlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
  links.forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // فعل الـ active للروابط في الديسكتوب
  markActiveDesktopLink(root);

  // علّم إننا وصلنا الهيدر
  root.dataset.headerWired = "1";
}

// يطبق نفس ستايل الـ hover على الرابط النشط في الديسكتوب
function markActiveDesktopLink(root) {
  var current = location.pathname.replace(/\/index\.html?$/i, "/");
  try {
    var links = root.querySelectorAll(".site-nav .nav-link[href]");
    links.forEach(function (a) {
      var to = new URL(
        a.getAttribute("href"),
        location.origin
      ).pathname.replace(/\/index\.html?$/i, "/");
      if (to === current) {
        a.classList.add(
          "text-primary",
          "after:scale-x-100",
          "after:origin-left"
        );
        a.setAttribute("aria-current", "page");
      }
    });
  } catch (_) {
    /* ignore */
  }
}
