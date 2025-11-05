const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const form = $("#contact-form");
const successEl = $("#form-success");

const THANK_YOU_URL = "/thank-you.html"; // ← أضف هذا السطر هنا

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
}

function isValidPhone(phone) {
  const s = String(phone || "").trim();
  const digits = s.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function validateForm() {
  let firstError = null;
  const fields = ["name", "phone", "email", "position", "company"];
  fields.forEach((f) => {
    const fieldEl = document.querySelector(`[data-field="${f}"]`);
    const val = (form.querySelector(`[name="${f}"]`)?.value || "").trim();
    let ok = val.length > 1;
    if (f === "email") ok = isValidEmail(val);
    if (f === "phone") ok = isValidPhone(val);
    fieldEl.setAttribute("aria-invalid", ok ? "false" : "true");
    if (!ok && !firstError) firstError = fieldEl;
  });
  if (firstError)
    firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  return !firstError;
}

async function postData(payload) {
  const SHEET_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbzYPZ2kM8Ok0j_iGXJLW8zRFl-iZkivOtiBmUMOBqHbMbUeB8dDfv2dvfycCyMOq6kSyQ/exec";
  const fd = new FormData();
  fd.append("payload", JSON.stringify(payload));
  await fetch(SHEET_ENDPOINT, { method: "POST", body: fd });
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    successEl.classList.remove("is-visible");
    if (!validateForm()) return;

    const btn = form.querySelector("button[type='submit']");
    const oldText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "جارٍ الإرسال...";

    const payload = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      position: form.position.value.trim(),
      company: form.company.value.trim(),
      userAgent: navigator.userAgent,
    };

    try {
      await postData(payload);
      window.location.assign(THANK_YOU_URL);
      return;
    } catch (err) {
      alert("حدث خطأ أثناء الإرسال.");
    } finally {
      btn.disabled = false;
      btn.textContent = oldText;
    }
  });
}
