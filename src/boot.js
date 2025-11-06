import { initLangSwitcher } from "./lang-switch.js";

document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  // تحديد اللغة الحالية من الـ URL
  const isEnglish = window.location.pathname.startsWith("/en");

  try {
    if (isEnglish) {
      // تحميل الهيدر والفوتر الإنجليزيين
      const [{ mountHeader }, { mountFooter }] = await Promise.all([
        import("./components/header-en.js"),
        import("./components/footer-en.js"),
      ]);
      header && mountHeader(header);
      footer && mountFooter(footer);
    } else {
      // تحميل الهيدر والفوتر العربيين
      const [{ mountHeader }, { mountFooter }] = await Promise.all([
        import("./components/header.js"),
        import("./components/footer.js"),
      ]);
      header && mountHeader(header);
      footer && mountFooter(footer);
    }
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }

  // تفعيل زر تغيير اللغة بعد تحميل الهيدر والفوتر فعليًا
  initLangSwitcher();
});
