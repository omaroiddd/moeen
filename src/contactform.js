// مساعدات بسيطة
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const form = $("#contact-form");
const successEl = $("#form-success");

// ======= عدّل دول =======
const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwKOGiLkrgaias2ea6PtpVW3BSTRgOVjNTmRikYe6au3sKmSHszcfiEciuRpZQd5Agk/exec";
const THANK_YOU_URL = "/thank-you.html"; // أو "/thank-you" حسب مشروعك
// ========================

// تفعيل أزرار الخيارات (متعددة/أحادية)
function initOptionGroups() {
  $$("[data-group]").forEach((group) => {
    const isMultiple = group.dataset.multiple === "true";
    const buttons = $$(".option-btn", group);
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (isMultiple) {
          const pressed = btn.getAttribute("aria-pressed") === "true";
          btn.setAttribute("aria-pressed", String(!pressed));
          btn.classList.toggle("is-selected", !pressed);
        } else {
          buttons.forEach((b) => {
            b.setAttribute("aria-checked", "false");
            b.classList.remove("is-selected");
          });
          btn.setAttribute("aria-checked", "true");
          btn.classList.add("is-selected");
        }
        const field = group.closest("[data-field]");
        if (field) field.setAttribute("aria-invalid", "false");
      });

      btn.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  });
}

// المناصب: إضافة/حذف سطور
function initPositions() {
  const addBtn = $("#add-position");
  const wrap = $("#positions-wrap");
  const tpl = $("#position-template");

  addBtn.addEventListener("click", () => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    wrap.appendChild(node);
    updateRemoveButtons();
  });

  function updateRemoveButtons() {
    const rows = $$("[data-row]", wrap);
    rows.forEach((row) => {
      const rm = $(".remove-btn", row);
      if (!rm) return;
      rm.hidden = rows.length === 1;
      rm.onclick = () => {
        row.remove();
        updateRemoveButtons();
      };
    });
  }

  // نستخدمها بعد الإرسال للرجوع لسطر واحد
  wrap._resetToSingle = function () {
    const rows = $$("[data-row]", wrap);
    rows.slice(1).forEach((r) => r.remove());
    const first = rows[0] || null;
    if (first) {
      $(".title", first).value = "";
      $(".qty", first).value = 1;
    }
    updateRemoveButtons();
  };

  updateRemoveButtons();
}

// تجميع القيم من المجموعات في الحقول الخفية
function collectHiddenValues() {
  const servicesGroup = $('[data-group="services"]');
  const selectedServices = $$(".option-btn.is-selected", servicesGroup).map(
    (b) => b.dataset.value
  );
  $('[name="services_values"]').value = selectedServices.join(", ");

  const durationGroup = $('[data-group="duration"]');
  const chosen = $(".option-btn.is-selected", durationGroup);
  $('[name="duration_value"]').value = chosen ? chosen.dataset.value : "";
}

// التحقق المخصص
function validateForm() {
  let firstErrorEl = null;
  const setFieldError = (fieldEl, hasError) => {
    if (!fieldEl) return;
    fieldEl.setAttribute("aria-invalid", hasError ? "true" : "false");
    if (hasError && !firstErrorEl) firstErrorEl = fieldEl;
  };

  const servicesField = $('[data-field="services"]');
  const servicesSelected = $$(
    ".option-btn.is-selected",
    $('[data-group="services"]')
  ).length;
  setFieldError(servicesField, servicesSelected < 1);

  const posField = $('[data-field="positions"]');
  const rows = $$("#positions-wrap [data-row]");
  let posOK = rows.length >= 1;
  if (posOK) {
    posOK = rows.every((row) => {
      const title = $(".title", row)?.value?.trim();
      const qty = parseInt($(".qty", row)?.value || "0", 10);
      return title && qty >= 1;
    });
  }
  setFieldError(posField, !posOK);

  const contractField = $('[data-field="contractModel"]');
  const contractOK = !!$('input[name="contractModel"]:checked');
  setFieldError(contractField, !contractOK);

  const durationField = $('[data-field="duration"]');
  const durationOK = !!$(
    ".option-btn.is-selected",
    $('[data-group="duration"]')
  );
  setFieldError(durationField, !durationOK);

  const locField = $('[data-field="location"]');
  const compField = $('[data-field="company"]');
  const locOK = $('[name="location"]').value.trim().length > 1;
  const compOK = $('[name="company"]').value.trim().length > 1;
  setFieldError(locField, !locOK);
  setFieldError(compField, !compOK);

  const callField = $('[data-field="call"]');
  const callOK = $('[name="free_call"]').checked;
  setFieldError(callField, !callOK);

  if (firstErrorEl)
    firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
  return !firstErrorEl;
}

// تحضير Payload
function buildPayload() {
  const posRows = $$("#positions-wrap [data-row]");
  const positions = posRows
    .map((row) => ({
      title: $(".title", row)?.value?.trim() || "",
      qty: Number($(".qty", row)?.value || 0),
    }))
    .filter((p) => p.title && p.qty >= 1);

  return {
    servicesValues: $('[name="services_values"]').value.trim(),
    durationValue: $('[name="duration_value"]').value.trim(),
    contractModel: (
      $('input[name="contractModel"]:checked')?.value || ""
    ).trim(),
    location: $('[name="location"]').value.trim(),
    company: $('[name="company"]').value.trim(),
    ref: ($('[name="ref"]')?.value || "").trim(),
    freeCall: $('[name="free_call"]').checked,
    details: ($('[name="details"]')?.value || "").trim(),
    positions,
    userAgent: navigator.userAgent,
  };
}

// POST إلى Apps Script (FormData لتفادي preflight)
async function postToSheet(payload, { timeoutMs = 15000 } = {}) {
  const fd = new FormData();
  fd.append("payload", JSON.stringify(payload));

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);

  try {
    const res = await fetch(SHEET_ENDPOINT, {
      method: "POST",
      body: fd,
      signal: ctrl.signal,
    });
    clearTimeout(t);
    try {
      const data = await res.json();
      return { ok: !!data?.ok, id: data?.id || null };
    } catch {
      return { ok: res.ok, id: null };
    }
  } catch (err) {
    clearTimeout(t);
    throw err;
  }
}

// إرسال
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  successEl?.classList.remove("is-visible");

  collectHiddenValues();
  if (!validateForm()) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const origText = submitBtn?.textContent;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "جارٍ الإرسال...";
  }

  try {
    const { ok, id } = await postToSheet(buildPayload());
    if (ok) {
      // Redirect لصفحة الشكر
      if (THANK_YOU_URL) {
        const url = id
          ? `${THANK_YOU_URL}?id=${encodeURIComponent(id)}`
          : THANK_YOU_URL;
        window.location.assign(url);
        return; // مش هنكمل reset لأن الصفحة هتتغيّر
      }
      // بديل لو مفيش صفحة شكر
      successEl?.classList.add("is-visible");
      form.reset();
      $$(".option-btn.is-selected").forEach((b) =>
        b.classList.remove("is-selected")
      );
      $$('.option-btn[aria-pressed="true"]').forEach((b) =>
        b.setAttribute("aria-pressed", "false")
      );
      $$('.option-btn[aria-checked="true"]').forEach((b) =>
        b.setAttribute("aria-checked", "false")
      );
      const wrap = $("#positions-wrap");
      if (wrap && typeof wrap._resetToSingle === "function")
        wrap._resetToSingle();
    } else {
      alert("حصلت مشكلة أثناء الإرسال. جرّب تاني من فضلك.");
    }
  } catch (err) {
    console.error(err);
    alert("تعذّر الاتصال بالخادم. تأكّد من رابط الويب وحاول لاحقًا.");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
    }
  }
});

// إزالة الأخطاء فور التفاعل
form.addEventListener("input", (e) => {
  const field = e.target.closest("[data-field]");
  if (field) field.setAttribute("aria-invalid", "false");
});
form.addEventListener("change", (e) => {
  const field = e.target.closest("[data-field]");
  if (field) field.setAttribute("aria-invalid", "false");
});

// تهيئة
initOptionGroups();
initPositions();
