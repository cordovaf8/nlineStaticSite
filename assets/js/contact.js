// contact.js
(() => {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const endpoint = String(cfg.FORMSPREE_ENDPOINT || "");

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");
  const sendBtn = document.getElementById("sendBtn");

  if (!form || !statusEl || !sendBtn) return;

  function setStatus(message, isError) {
    statusEl.textContent = message;
    statusEl.style.color = isError ? "var(--error)" : "var(--success)";
  }

  function validate(data) {
    if (!String(data.name || "").trim()) return "Name is required.";
    const email = String(data.email || "").trim();
    if (!email) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email.";
    if (!String(data.message || "").trim()) return "Message is required.";
    return null;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    setStatus("", false);

    // honeypot
    const hp = String(form.querySelector('input[name="website"]')?.value || "");
    if (hp.trim()) {
      setStatus("Message sent!", false);
      form.reset();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const err = validate(data);
    if (err) {
      setStatus(err, true);
      return;
    }

    if (!endpoint || endpoint.includes("REPLACE_ME")) {
      setStatus("Form submission is being configured. Please call us directly at (303) 702-1147.", true);
      return;
    }

    sendBtn.disabled = true;
    setStatus("Sending...", false);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: String(data.name || ""),
          email: String(data.email || ""),
          phone: String(data.phone || ""),
          company: String(data.company || ""),
          "preferred-contact": String(data["preferred-contact"] || ""),
          "job-location": String(data["job-location"] || ""),
          subject: String(data.subject || ""),
          message: String(data.message || "")
        })
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          (json && json.errors && json.errors[0] && json.errors[0].message) ||
          json.error ||
          "Something went wrong sending the message.";
        throw new Error(msg);
      }

      setStatus("Message sent!", false);
      form.reset();
    } catch (ex) {
      setStatus(ex && ex.message ? ex.message : "Failed to send message.", true);
    } finally {
      sendBtn.disabled = false;
    }
  });
})();
