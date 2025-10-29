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
  <div class="flex items-center justify-between gap-4 md:gap-12">
    <!-- Logo -->
    <a class="block shrink-0" href="/" aria-label="الرئيسية">
      <img src="/assets/Moeen-logo.png" class="site-logo w-auto h-18 lg:h-24" alt="الشعار" />
    </a>

    <!-- Desktop Nav -->
    <nav class="site-nav hidden md:flex items-center gap-4 sm:gap-6 font-medium" aria-label="التنقل الرئيسي">
      <a href="/" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors text-[#5d6481] hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-right after:transition-transform">الرئيسية</a>
      <a href="/services.html" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors text-[#5d6481] hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-right after:transition-transform">خدمتنا</a>
      <a href="/pricing.html" class="nav-link relative px-1 py-0.5 text-sm md:text-base transition-colors text-[#5d6481] hover:text-primary
         after:content-[''] after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-0.5 after:bg-primary
         after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-right after:transition-transform">تسعير</a>
    </nav>
  </div>

<a id="ctaBtn" href="/contact.html" class="mr-auto hidden md:inline-flex">
  <div class="dots_border"></div>
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

function markActiveDesktopLink(root) {
  if (!root) return;

  // تطبيع موحَّد: مفيش query/hash، مفيش .html/.htm، ومفيش slash في الآخر (غير "/")
  const normalize = (path) => {
    if (!path) return "/";
    // شيل query و hash
    path = path.split("#")[0].split("?")[0];

    // شيل index / index.html / index.htm في الآخر
    path = path.replace(/\/index(?:\.html?)?$/i, "");

    // شيل أي امتداد .html أو .htm في آخر المسار
    path = path.replace(/\.html?$/i, "");

    // شيل الـ slash الأخير (إلا الجذر "/")
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

    try {
      path = decodeURIComponent(path);
    } catch {}
    return path || "/";
  };

  const current = normalize(location.pathname);

  let links = [];
  try {
    links = root.querySelectorAll(".site-nav .nav-link[href]");
  } catch {
    return;
  }
  if (!links.length) return;

  links.forEach((a) => {
    try {
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
    } catch {}
  });
}
