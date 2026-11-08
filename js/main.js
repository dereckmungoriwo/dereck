/* ==========================================================
   MAIN.JS - shared behaviour for every page
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {

  // 1. Highlight the current page in the nav
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(link => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  // 2. Mobile menu toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // 3. Save/bookmark buttons on images (remembered in the browser)
  const saved = JSON.parse(localStorage.getItem("savedItems") || "[]");
  document.querySelectorAll(".save-btn").forEach(btn => {
    const id = btn.dataset.id;
    if (saved.includes(id)) btn.setAttribute("aria-pressed", "true");
    btn.addEventListener("click", () => {
      const on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", on);
      const list = JSON.parse(localStorage.getItem("savedItems") || "[]").filter(x => x !== id);
      if (on) list.push(id);
      localStorage.setItem("savedItems", JSON.stringify(list));
    });
  });

  // 4. Footer year (optional element)
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

// 5. Expand/collapse panels: <button class="more-btn" aria-controls="id"> + <div class="details" id="id">
document.querySelectorAll(".more-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const open = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
});
