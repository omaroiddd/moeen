// src/components/footer.js
const FOOTER_CONFIG = {
  ar: {
    dir: "rtl",
    brandName: "معين",
    brandUrl: "/",
    brandDescription:
      "توظيف عن بُعد متخصص لخدمة الشركات والمشاريع في المملكة العربية السعودية.",
    logo: {
      src: "/assets/footer-logo.png",
      alt: "Moeen Logo",
      heightClass: "h-[45.15px] md:h-[73px]",
    },

    // ✅ مثل الصورة: 3 أعمدة + بلوك الشعار
    quickLinks: {
      title: "روابط سريعة",
      links: [
        { label: "الرئيسية", href: "/" },
        { label: "خدماتنا", href: "/services.html" },
        { label: "التسعيرة", href: "/pricing.html" },
        { label: "احجز استشارتك الآن", href: "/contact.html" },
      ],
    },

    social: {
      title: "تابعنا على مواقع التواصل",
      items: [
        {
          name: "X",
          href: "https://x.com/MoeenTalents",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>`,
        },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/company/moeen-%D9%85%D8%B9%D9%8A%D9%86",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 448 512"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>`,
        },
      ],
    },

    contact: {
      title: "معلومات الاتصال",
      items: [
        {
          label: "البريد الإلكتروني",
          value: "moeen@moeen.co",
          href: "mailto:moeen@moeen.co",
        },
        {
          label: "الواتساب",
          value: "966552223246+",
          href: "https://wa.me/966552223246",
        },
      ],
    },

    rightsTemplate: "جميع الحقوق محفوظة © {year} معين",
  },

  en: {
    dir: "ltr",
    brandName: "Moeen",
    brandUrl: "/",
    brandDescription:
      "We help companies hire digital talents that save time and cost",
    logo: {
      src: "/assets/footer-logo.png",
      alt: "Moeen Logo",
      heightClass: "h-[45.15px] md:h-[73px]",
    },

    quickLinks: {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services.html" },
        { label: "Pricing", href: "/pricing.html" },
        { label: "Book a consultation", href: "/contact.html" },
      ],
    },

    social: {
      title: "Follow us",
      items: [
        {
          name: "X",
          href: "https://x.com/MoeenTalents",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>`,
        },
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/company/moeen-%D9%85%D8%B9%D9%8A%D9%86",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 448 512"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"/></svg>`,
        },
      ],
    },

    contact: {
      title: "Contact",
      items: [
        {
          label: "Email",
          value: "moeen@moeen.co",
          href: "mailto:moeen@moeen.co",
        },
        {
          label: "WhatsApp",
          value: "+966 55 222 3246",
          href: "https://wa.me/966552223246",
        },
      ],
    },

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
        `<li>
          <a href="${l.href}" class="text-primary font-medium hover:text-gray-900 transition-colors">
            ${l.label}
          </a>
        </li>`
    )
    .join("");
}

function renderContactItems(items = []) {
  return items
    .map(
      (it) => `
        <div class="space-y-1">
          <div class="text-sm font-medium text-primary">${it.label}</div>
          <a href="${it.href}" class="text-primary hover:text-gray-900 transition-colors">
            ${it.value}
          </a>
        </div>
      `
    )
    .join("");
}

function renderSocialItems(items = []) {
  return items
    .map(
      (s) => `
        <a href="${s.href}" target="_blank" rel="noopener"
           class="inline-flex items-center justify-center w-9 h-9 rounded-[14px]
                  bg-third text-primary hover:bg-primary/20 transition">
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
export function mountFooter(el, lang = "ar") {
  if (!el) return;

  const activeLang = safeLang(lang);
  const t = FOOTER_CONFIG[activeLang];

  const year = new Date().getFullYear();
  const rights = t.rightsTemplate.replace("{year}", year);

  el.setAttribute(
    "class",
    "!bg-[image:var(--linear-gradient-5)] bg-cover bg-no-repeat backdrop-blur supports-[backdrop-filter]:bg-white/60 border-t-1 border-[#DEDEE9]"
  );

  el.innerHTML = `
    <div class="container mx-auto px-10 md:px-16 py-10 md:py-16" dir="${t.dir}">
      <!-- ✅ Top content مثل الصورة -->
      <div class="grid grid-cols-1 gap-5 sm:gap-10 md:grid-cols-4 items-start sm:place-items-center sm:py-8">

        <!-- Brand (يطلع يمين في RTL) -->
        <div class="space-y-4 col-span-2 sm:col-auto h-full">
          <a href="${t.brandUrl}" class="inline-flex items-center">
            <img src="${t.logo.src}" class="${t.logo.heightClass}" alt="${
    t.logo.alt
  }" />
          </a>
          <p class="text-primary text-lg font-normal leading-relaxed max-w-full md:max-w-[250px]">
            ${t.brandDescription}
          </p>
        </div>

        <hr class="my-6 border-[#F0F0F0] w-full col-span-2 md:hidden" />

        <!-- Quick Links -->
        <div class="space-y-5 h-full">
          <h2 class="text-xl font-semibold text-primary">${
            t.quickLinks.title
          }</h2>
          <ul class="space-y-3">
            ${renderLinks(t.quickLinks.links)}
          </ul>
        </div>
        
        <hr class="my-6 border-[#F0F0F0] col-span-2 md:hidden" />
        <!-- Social -->
        <div class="space-y-5 col-span-2 md:col-span-1 h-full">
          <h2 class="text-xl font-semibold text-primary">${t.social.title}</h2>
          <div class="flex items-center gap-3">
            ${renderSocialItems(t.social.items)}
          </div>
          
        </div>

        <!-- Contact -->
        <div class="contact space-y-5 col-start-2 row-start-3 md:col-start-auto md:row-start-auto h-full">
          <h2 class="text-xl font-semibold text-primary">${t.contact.title}</h2>
          <div class="space-y-4">
            ${renderContactItems(t.contact.items)}
          </div>
        </div>

      </div>

      <!-- ✅ Bottom line + centered rights -->
      <div class="space-y-5">
        <img src="/assets/hr.svg" class="w-full h-full object-contain mt-10" />
        <div class="text-center text-sm text-primary">
          ${rights}
        </div>
      </div>
    </div>
  `;
}
