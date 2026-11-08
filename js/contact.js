/* ==========================================================
   CONTACT.JS - form validation and sending
   ----------------------------------------------------------
   HOW SENDING WORKS
   1. If the form's data-endpoint is a real URL (e.g. a Formspree
      address like https://formspree.io/f/xxxxxxx) the message is
      sent there and arrives in your inbox.
   2. If data-endpoint is still "YOUR_FORM_ENDPOINT", the form falls
      back to opening the visitor's email app with the message filled in.
   ========================================================== */
const form = document.getElementById("contact-form");
const statusBox = document.getElementById("form-status");
const TO_EMAIL = "dereck@dereckmungoriwo.com";

function showStatus(text, type) {
  statusBox.textContent = text;
  statusBox.className = "form-status show " + type;
}

function validate() {
  let ok = true;
  form.querySelectorAll(".field").forEach(f => {
    const input = f.querySelector("input, select, textarea");
    if (!input) return;
    const bad = !input.checkValidity() || !input.value.trim();
    f.classList.toggle("invalid", bad);
    if (bad) ok = false;
  });
  return ok;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusBox.className = "form-status";
  if (!validate()) { showStatus("Please fix the highlighted fields.", "err"); return; }
  if (form.website.value) return;   // honeypot filled = bot

  const data = Object.fromEntries(new FormData(form));
  const endpoint = form.dataset.endpoint;
  const btn = form.querySelector("button[type=submit]");

  if (endpoint && !endpoint.includes("YOUR_FORM_ENDPOINT")) {
    btn.disabled = true;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
      form.reset();
      showStatus("Thank you. Your message has been sent, and I'll reply soon.", "ok");
    } catch {
      showStatus("The message could not be sent. Please email me directly at " + TO_EMAIL + ".", "err");
    }
    btn.disabled = false;
  } else {
    const body = `${data.message}\n\nFrom: ${data.name} (${data.email})`;
    location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(data.subject + " - " + data.name)}&body=${encodeURIComponent(body)}`;
    showStatus("Your email app should open with the message ready to send.", "ok");
  }
});

// Clear the error as soon as a field is corrected
form.addEventListener("input", (e) => {
  const f = e.target.closest(".field");
  if (f && e.target.checkValidity() && e.target.value.trim()) f.classList.remove("invalid");
});
