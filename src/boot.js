import { mountHeader } from "./components/header.js";
import { mountFooter } from "./components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  if (header) mountHeader(header);

  const footer = document.getElementById("site-footer");
  if (footer) mountFooter(footer);
});
