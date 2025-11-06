export function initLangSwitcher() {
  const langSwitchers = document.querySelectorAll(".lang-switch");
  if (!langSwitchers.length) return;

  langSwitchers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const current = window.location.pathname;
      let targetPath;

      if (current.startsWith("/en/")) {
        targetPath = current.replace(/^\/en/, "");
      } else {
        targetPath = "/en" + current;
      }

      targetPath = targetPath.replace(/\/\//g, "/");
      window.location.href = targetPath;
    });
  });
}
