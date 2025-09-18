export function mountHeader(el) {
  if (!el) return;

  el.setAttribute(
    "class",
    "relative top-0 z-50 !bg-[image:var(--linear-gradient)] bg-cover bg-no-repeat backdrop-blur supports-[backdrop-filter]:bg-white/60"
  );

  el.innerHTML = `
          <div
            class="container mx-auto px-4 sm:px-6 md:px-16 py-6 md:py-16 flex h-16 sm:h-24 items-center justify-between gap-8"
          >
            <!-- Logo -->
            <a class="block shrink-0" href="/" aria-label="الرئيسية">
              <img
                src="/assets/Moeen-logo.png"
                class="w-auto h-18 lg:h-24"
                alt="الشعار"
              />
            </a>

                            <a
                  id="ctaBtn"
                  href="/contact.html"
                  class="inline-flex text-sm md:text-lg items-center justify-center rounded-3xl bg-primary text-secondary px-6 sm:px-10 py-3"
                >
                  احجز استشارتك الآن
                </a>
          </div>
  `;
}
