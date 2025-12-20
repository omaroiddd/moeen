// src/components/footer.js
const FOOTER_CONFIG = {
  ar: {
    dir: "rtl",
    langSwitchLabel: "EN",
    brandName: "معين",
    brandUrl: "/",
    brandDescription:
      "نساعد الشركات على توظيف مواهب رقمية تختصر التكلفة والوقت",
    logo: {
      src: "/assets/Moeen-logo.png",
      alt: "Moeen Logo",
      heightClass: "h-20",
    },
    columns: [
      {
        title: "روابط سريعة",
        links: [
          { label: "الرئيسية", href: "/" },
          { label: "خدمتنا", href: "/services.html" },
          { label: "الأسعار", href: "/pricing.html" },
          { label: "تواصل معنا", href: "/contact.html" },
        ],
      },
      {
        title: "خدمتنا",
        links: [
          { label: "ادخال البيانات", href: "/services/data-analysis.html" },
          { label: "التصميم", href: "/services/graphic-design.html" },
          { label: "التسويق", href: "/services/digital-marketing" },
          { label: "المبيعات", href: "/services/sales-representative.html" },
        ],
      },
      {
        title: "تواصل معنا",
        links: [
          { label: "+966 55 222 3746", href: "tel:+966552223746" },
          { label: "moeen@moeen.co", href: "mailto:moeen@moeen.co" },
          { label: "المملكة العربية السعودية", href: "#" },
        ],
      },
    ],
    social: [
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/moeen-%D9%85%D8%B9%D9%8A%D9%86",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 448 512"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>`,
      },
      {
        name: "X",
        href: "https://x.com/MoeenTalents",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>`,
      },
    ],
    rightsTemplate: "© {year} Moeen. جميع الحقوق محفوظة.",
  },

  en: {
    dir: "ltr",
    langSwitchLabel: "AR",
    brandName: "Moeen",
    brandUrl: "/",
    brandDescription:
      "We help companies hire digital talents that save time and cost",
    logo: {
      src: "/assets/Moeen-logo.png",
      alt: "Moeen Logo",
      heightClass: "h-20",
    },
    columns: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", href: "/" },
          { label: "Services", href: "/services.html" },
          { label: "Pricing", href: "/pricing.html" },
          { label: "Contact", href: "/contact.html" },
        ],
      },
      {
        title: "Our Services",
        links: [
          { label: "Data Entry", href: "/services/data-analysis.html" },
          { label: "Design", href: "/services/graphic-design.html" },
          { label: "Marketing", href: "/services/digital-marketing" },
          { label: "Sales", href: "/services/sales-representative.html" },
        ],
      },
      {
        title: "Contact Us",
        links: [
          { label: "+966 55 222 3746", href: "tel:+966552223746" },
          { label: "moeen@moeen.co", href: "mailto:moeen@moeen.co" },
          { label: "Saudi Arabia", href: "#" },
        ],
      },
    ],
    social: [
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/moeen-%D9%85%D8%B9%D9%8A%D9%86",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 448 512"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>`,
      },
      {
        name: "X",
        href: "https://x.com/MoeenTalents",
        svg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>`,
      },
    ],
    rightsTemplate: "© {year} Moeen. All rights reserved.",
  },
};

// =======================
// Helpers
// =======================
function safeLang(lang) {
  return FOOTER_CONFIG[lang] ? lang : "ar";
}

function renderLinks(links = []) {
  return links
    .map(
      (l) =>
        `<a href="${l.href}" class="hover:text-gray-900 transition-colors">${l.label}</a>`
    )
    .join("");
}

function renderColumns(columns = []) {
  return columns
    .map(
      (col) => `
      <div>
        <h2 class="mb-6 text-base lg:text-xl font-semibold text-primary uppercase">${
          col.title
        }</h2>
        <ul class="text-gray-500 font-medium">
          <li class="mb-4 flex flex-col gap-3 text-base">
            ${renderLinks(col.links)}
          </li>
        </ul>
      </div>
    `
    )
    .join("");
}

function renderSocial(social = []) {
  return social
    .map(
      (s, idx) => `
      <a href="${
        s.href
      }" class="text-gray-500 hover:text-gray-900 social-icon ${
        idx ? "ms-5" : ""
      }">
        ${s.svg}
        <span class="sr-only">${s.name}</span>
      </a>
    `
    )
    .join("");
}

// =======================
// Footer Component
// =======================
export function mountFooter(el, lang = "ar", options = {}) {
  if (!el) return;

  const activeLang = safeLang(lang);
  const t = FOOTER_CONFIG[activeLang];

  const year = new Date().getFullYear();
  const rights = t.rightsTemplate.replace("{year}", year);

  // Optional override hooks (لو حبيت تربطها بنظام ترجمة/روتينج عندك)
  const onLangSwitch =
    typeof options.onLangSwitch === "function" ? options.onLangSwitch : null;
  const nextLang = activeLang === "ar" ? "en" : "ar";

  el.setAttribute(
    "class",
    "!bg-[image:var(--linear-gradient-5)] bg-cover bg-no-repeat backdrop-blur supports-[backdrop-filter]:bg-white/60"
  );

  el.innerHTML = `
    <div class="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8" dir="${t.dir}">
      <div class="md:flex md:justify-evenly">
        <div class="grid grid-cols-2 gap-4 sm:gap-12 sm:grid-cols-5 items-start">

          <div class="mb-6 md:mb-0 col-span-2">
            <a href="${
              t.brandUrl
            }" class="flex items-center mb-6 text-base lg:text-xl font-semibold text-primary uppercase">
              ${t.brandName}
            </a>
            <p class="text-[#616161] text-base sm:text-lg text-balance sm:max-w-1/2">
              ${t.brandDescription}
            </p>
          </div>

          ${renderColumns(t.columns)}

        </div>
      </div>

      <hr class="my-3 sm:my-6 border-primary sm:mx-auto lg:my-8" />

      <div class="flex flex-col sm:flex-row gap-5 items-center sm:justify-between">
        <a href="${t.brandUrl}" class="flex items-center">
          <img src="${t.logo.src}" class="${t.logo.heightClass} me-3" alt="${
    t.logo.alt
  }" />
        </a>

        <span class="text-sm text-gray-500 sm:text-center">${rights}</span>

        <div class="flex items-center gap-6">
          <a href="#" data-next-lang="${nextLang}" class="lang-switch text-primary font-semibold hover:underline mt-4 sm:mt-0">
            ${t.langSwitchLabel}
          </a>

          <div class="flex mt-4 sm:justify-center sm:mt-0">
            ${renderSocial(t.social)}
          </div>
        </div>
      </div>
    </div>
  `;

  // Dynamic Lang Switch hook
  const switchBtn = el.querySelector(".lang-switch");
  if (switchBtn) {
    switchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const nl = switchBtn.getAttribute("data-next-lang") || nextLang;

      // لو عندك Router / LocalStorage / URL param… اعملها هنا
      if (onLangSwitch) {
        onLangSwitch(nl);
        return;
      }

      // Default behavior: re-mount footer only
      mountFooter(el, nl, options);
    });
  }
}
