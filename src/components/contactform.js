// src/components/contactform.js

// --------- النصوص حسب اللغة ----------
const CONTACT_FORM_TEXT = {
  ar: {
    dir: "rtl",
    align: "text-right",

    first_name_label: "الاسم الأول *",
    first_name_placeholder: "ادخل اسمك الأول",
    first_name_error: "فضلاً ادخل الاسم الأول.",

    last_name_label: "الاسم الأخير *",
    last_name_placeholder: "ادخل اسم عائلتك",
    last_name_error: "فضلاً ادخل الاسم الأخير.",

    email_label: "البريد الإلكتروني الرسمي *",
    email_placeholder: "ادخل بريدك الإلكتروني",
    email_error: "فضلاً ادخل بريد إلكتروني صحيح.",

    phone_label: "رقم الجوال *",
    phone_placeholder: "ادخل رقم جوالك",
    phone_error: "فضلاً ادخل رقم جوال صحيح.",

    company_label: "اسم الشركة *",
    company_placeholder: "اسم الشركة",
    company_error: "فضلاً ادخل اسم الشركة.",

    position_label: "المنصب *",
    position_placeholder: "اكتب منصبك",
    position_error: "فضلاً ادخل المنصب.",

    specialty_label: "اختصاص الموظف المطلوب *",
    specialty_placeholder: "اختر المنصب",
    specialty_error: "فضلاً اختر اختصاص الموظف المطلوب.",

    specialty_options: [
      "خدمة العملاء",
      "المبيعات",
      "تطوير المواقع",
      "الأمن السيبراني",
      "التصميم والإبداع",
      "تعديل الفيديوهات",
      "التسويق الرقمي",
      "تحليل البيانات",
      "التجارة الإلكترونية",
      "التحليل المالي",
      "إدارة المشاريع",
      "أخرى",
    ],

    work_mode_label: "نظام العمل",
    work_mode_value: "عن بُعد",

    submit_text: "احجز اجتماعاً",
    sending_text: "جارٍ الإرسال...",
    secure_text: "بياناتك محمية ومشفرة 100%",
    success_text: "تم إرسال البيانات بنجاح! سنعاود الاتصال بك قريبًا.",
  },

  en: {
    dir: "ltr",
    align: "text-left",

    first_name_label: "First name *",
    first_name_placeholder: "Enter your first name",
    first_name_error: "Please enter your first name.",

    last_name_label: "Last name *",
    last_name_placeholder: "Enter your last name",
    last_name_error: "Please enter your last name.",

    email_label: "Work email *",
    email_placeholder: "Enter your email address",
    email_error: "Please enter a valid email address.",

    phone_label: "Phone number *",
    phone_placeholder: "Enter your phone number",
    phone_error: "Please enter a valid phone number.",

    company_label: "Company name *",
    company_placeholder: "Company name",
    company_error: "Please enter the company name.",

    position_label: "Job title *",
    position_placeholder: "Write your job title",
    position_error: "Please enter your job title.",

    specialty_label: "Required employee specialty *",
    specialty_placeholder: "Choose position",
    specialty_error: "Please select the required specialty.",

    specialty_options: [
      "Customer service",
      "Sales",
      "Web development",
      "Cybersecurity",
      "Design & creativity",
      "Video editing",
      "Digital marketing",
      "Data analysis",
      "E-commerce",
      "Financial analysis",
      "Project management",
      "Other",
    ],

    work_mode_label: "Work mode",
    work_mode_value: "Remote",

    submit_text: "Book a meeting",
    sending_text: "Sending...",
    secure_text: "Your data is protected and encrypted",
    success_text: "Form submitted successfully! We will contact you soon.",
  },
};

// --------- HTML للفورم ----------
function getContactFormHTML(lang = "ar") {
  const t = CONTACT_FORM_TEXT[lang] || CONTACT_FORM_TEXT.ar;

  return `
    <form
      id="contact-form"
      class="space-y-4 ${t.align}"
      dir="${t.dir}"
      novalidate
    >
      <!-- الاسم الأول + الاسم الأخير -->
      <div class="grid grid-cols-2 gap-4">
        <div class="field" data-field="first_name" aria-invalid="false">
          <label class="block mb-1 text-xs sm:text-[14px] font-semibold text-primary">
            ${t.first_name_label}
          </label>
          <input
            name="first_name"
            type="text"
            placeholder="${t.first_name_placeholder}"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs ${
              t.align
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="field-error hidden text-xs text-red-500 mt-1">
            ${t.first_name_error}
          </div>
        </div>

        <div class="field" data-field="last_name" aria-invalid="false">
          <label class="block mb-1 text-xs sm:text-[14px] font-semibold text-primary">
            ${t.last_name_label}
          </label>
          <input
            name="last_name"
            type="text"
            placeholder="${t.last_name_placeholder}"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs ${
              t.align
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="field-error hidden text-xs text-red-500 mt-1">
            ${t.last_name_error}
          </div>
        </div>
      </div>

      <!-- الجوال + الإيميل -->
      <div class="grid grid-cols-2 gap-4">
        <div class="field" data-field="email" aria-invalid="false">
          <label class="block mb-1 text-xs sm:text-[14px] font-semibold text-primary">
            ${t.email_label}
          </label>
          <input
            name="email"
            type="email"
            inputmode="email"
            placeholder="${t.email_placeholder}"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs ${
              t.align
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="field-error hidden text-xs text-red-500 mt-1">
            ${t.email_error}
          </div>
        </div>

        <div class="field" data-field="phone" aria-invalid="false">
          <label class="block mb-1 text-xs sm:text-[14px] font-semibold text-primary">
            ${t.phone_label}
          </label>
          <input
            name="phone"
            type="tel"
            inputmode="tel"
            placeholder="${t.phone_placeholder}"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs ${
              t.align
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="field-error hidden text-xs text-red-500 mt-1">
            ${t.phone_error}
          </div>
        </div>
      </div>

      <!-- المنصب + الشركة -->
      <div class="grid grid-cols-2 gap-4">
        <div class="field" data-field="company" aria-invalid="false">
          <label class="block mb-1 text-xs sm:text-[14px] font-semibold text-primary">
            ${t.company_label}
          </label>
          <input
            name="company"
            type="text"
            placeholder="${t.company_placeholder}"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs ${
              t.align
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="field-error hidden text-xs text-red-500 mt-1">
            ${t.company_error}
          </div>
        </div>

        <div class="field" data-field="position" aria-invalid="false">
          <label class="block mb-1 text-xs sm:text-[14px] font-semibold text-primary">
            ${t.position_label}
          </label>
          <input
            name="position"
            type="text"
            placeholder="${t.position_placeholder}"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs ${
              t.align
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="field-error hidden text-xs text-red-500 mt-1">
            ${t.position_error}
          </div>
        </div>
      </div>

      <!-- اختصاص الموظف + نظام العمل -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="field" data-field="specialty" aria-invalid="false">
          <label class="block mb-1 text-xs sm:text-[14px] font-semibold text-primary">
            ${t.specialty_label}
          </label>
          <select
            name="specialty"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs ${
              t.align
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">${t.specialty_placeholder}</option>
            ${t.specialty_options
              .map((opt) => `<option value="${opt}">${opt}</option>`)
              .join("")}
          </select>
          <div class="field-error hidden text-xs text-red-500 mt-1">
            ${t.specialty_error}
          </div>
        </div>

        <div class="field" data-field="work_mode" aria-invalid="false">
          <label class="block mb-1 text-xs sm:text-[14px] font-semibold text-primary">
            ${t.work_mode_label}
          </label>
          <div class="w-full">
            <div
              class="work-mode-pill w-full inline-flex items-center justify-between rounded-xl border bg-emerald-50 border-emerald-400 px-3 py-2 text-xs font-semibold text-emerald-700"
            >
              <span>${t.work_mode_value}</span>
              <span
                class="work-mode-dot inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"
              ></span>
            </div>
            <input
              type="hidden"
              name="work_mode"
              value="${t.work_mode_value}"
            />
          </div>
        </div>
      </div>

      <!-- زر الإرسال -->
      <div class="pt-2">
        <button
          class="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-third text-xs font-semibold py-2.5 sm:py-3 hover:bg-primary/90 transition-colors"
          type="submit"
        >
          ${t.submit_text}
        </button>
      </div>

      <div class="pt-2 flex flex-row gap-2 justify-center items-center">
        <img
          src="/assets/checkmark-circle-03.png"
          alt="Secure"
          class="size-8"
        />
        <span class="text-base text-[#5D5D5D]">
          ${t.secure_text}
        </span>
      </div>

      <p
        id="form-success"
        class="mt-3 text-center text-xs text-green-600 hidden"
        role="status"
        aria-live="polite"
      >
        ${t.success_text}
      </p>
    </form>
  `;
}

// --------- نفس الفاليديشن القديم تقريباً ----------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
}

function isValidPhone(phone) {
  const s = String(phone || "").trim();
  const digits = s.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function validateForm(form) {
  let firstError = null;

  const fields = [
    "first_name",
    "last_name",
    "phone",
    "email",
    "position",
    "company",
    "specialty",
  ];

  fields.forEach((f) => {
    const fieldEl = form.querySelector(`[data-field="${f}"]`);
    const inputEl = form.querySelector(`[name="${f}"]`);
    const val = (inputEl?.value || "").trim();

    let ok = val.length > 1;
    if (f === "email") ok = isValidEmail(val);
    if (f === "phone") ok = isValidPhone(val);
    if (f === "specialty") ok = val.length > 0;

    fieldEl?.setAttribute("aria-invalid", ok ? "false" : "true");

    const errorEl = fieldEl?.querySelector(".field-error");
    if (!ok) {
      errorEl?.classList.remove("hidden");
      if (!firstError) firstError = fieldEl;
    } else {
      errorEl?.classList.add("hidden");
    }
  });

  if (firstError) {
    firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return !firstError;
}

async function postData(payload) {
  const SHEET_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbybfibkiesoF0zP_2Br1HPa6j2wZkRvnAzbZtk-JO5ydWWyanaW5sAZ9AofVNU-8EdJpA/exec";

  const fd = new FormData();
  fd.append("payload", JSON.stringify(payload));
  await fetch(SHEET_ENDPOINT, { method: "POST", body: fd });
}

// --------- الـ API اللي هتستخدمه في الصفحات ----------
// container: selector أو عنصر DOM
export function mountContactForm({ container, lang = "ar" } = {}) {
  const root =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!root) return;

  const t = CONTACT_FORM_TEXT[lang] || CONTACT_FORM_TEXT.ar;

  // حط الـ HTML
  root.innerHTML = getContactFormHTML(lang);

  const form = root.querySelector("#contact-form");
  const successEl = root.querySelector("#form-success");

  const isEnglish = lang === "en" || window.location.pathname.startsWith("/en");
  const THANK_YOU_URL = isEnglish ? "/en/thank-you.html" : "/thank-you.html";

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    successEl?.classList.add("hidden");

    if (!validateForm(form)) return;

    const btn = form.querySelector("button[type='submit']");
    const oldText = btn.textContent;
    btn.disabled = true;
    btn.textContent = t.sending_text;

    const firstName = form.first_name.value.trim();
    const lastName = form.last_name.value.trim();

    const payload = {
      name: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      position: form.position.value.trim(),
      company: form.company.value.trim(),
      specialty: form.specialty.value.trim(),
      workMode: (form.work_mode?.value || "").trim(),
      userAgent: navigator.userAgent,
    };

    try {
      await postData(payload);
      window.location.assign(THANK_YOU_URL);
      return;
    } catch (err) {
      alert(
        isEnglish
          ? "An error occurred while sending."
          : "حدث خطأ أثناء الإرسال."
      );
    } finally {
      btn.disabled = false;
      btn.textContent = oldText;
    }
  });
}
