// src/contact-page.js
import { mountContactForm } from "./components/contactform.js";

// ممكن تاخد اللغة من <html lang="...">
const lang = document.documentElement.lang === "en" ? "en" : "ar";

mountContactForm({
  container: "#contact-form-wrapper",
  lang,
});
