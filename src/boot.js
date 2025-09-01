import { mountHeader } from "./components/header.js";
import { mountFooter } from "./components/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  mountHeader(document.getElementById("site-header"));
  mountFooter(document.getElementById("site-footer"));
});
