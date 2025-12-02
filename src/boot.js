import { initLangSwitcher } from "./lang-switch.js";
import { mountHeader } from "./components/header.js";
import { mountFooter } from "./components/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  const isEnglish = window.location.pathname.startsWith("/en");
  const lang = isEnglish ? "en" : "ar";

  try {
    header && (await mountHeader(header, lang));
    footer && mountFooter(footer, lang);
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }

  initLangSwitcher();
});
