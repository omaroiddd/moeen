export function mountFooter(el) {
  if (!el) return;
  el.setAttribute("class", "bg-white");
  el.innerHTML = `
          <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-evenly">
              <div class="mb-6 md:mb-0">
                <a
                  href="/"
                  class="flex items-center"
                >
                  <img
                    src="/assets/Moeen-logo.png"
                    class="h-24 me-3"
                    alt="Moeen Logo"
                  />
                </a>
              </div>
              <div
                class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 items-center"
              >
                <div class="border-l-[1px] border-gray-200 pl-6">
                  <h2
                    class="mb-6 text-m lg:text-xl font-semibold text-primary uppercase"
                  >
                    روابط مهمة
                  </h2>
                  <ul class="text-gray-500 text-m lg:text-xl font-medium">
                    <li class="mb-4">
                      <a href="/contact.html">تواصل معنا</a>
                    </li>
                  </ul>
                </div>
                <div class="sm:border-l-[1px] sm:border-gray-200 pl-6">
                  <h2
                    class="mb-6 text-m lg:text-xl font-semibold text-primary uppercase"
                  >
                    البريد الالكتروني
                  </h2>
                  <ul class="text-gray-500 font-medium">
                    <li class="mb-4">
                      <a href="mailto:moeen@moeen.co">moeen@moeen.co</a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2
                    class="mb-6 text-m lg:text-xl font-semibold text-primary uppercase"
                  >
                    واتساب
                  </h2>
                  <ul class="text-gray-500 font-medium">
                    <li class="mb-4">
                      <a href="/contact.html" dir="ltr">+966 55 222 3746</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr class="my-1  sm:my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <div class="flex flex-col-reverse sm:flex-row gap-5 items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center"
                >© 2025 <a href="/" class="hover:underline">Moeen</a>. جميع الحقوق محفوظة.
              </span>

              <div class="flex items-center gap-6">
              <a href="#" class="lang-switch text-primary font-semibold hover:underline mt-4 sm:mt-0">EN</a>
              <div class="flex mt-4 sm:justify-center sm:mt-0">
                <a href="https://www.linkedin.com/company/moeen-%D9%85%D8%B9%D9%8A%D9%86
" class="text-gray-500 hover:text-gray-900 social-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                    />
                  </svg>
                  <span class="sr-only">Linkdin</span>
                </a>
                <a href="https://x.com/MoeenTalents" class="text-gray-500 hover:text-gray-900 ms-5 social-icon">
  <svg
    xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 512 512">
    <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
    <path
      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
                  </svg>
                  <span class="sr-only">Twitter page</span>
                </a>
              </div>
              </div>
            </div>
          </div>
       `;
}
