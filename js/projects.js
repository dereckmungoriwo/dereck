/* ==========================================================
   PROJECTS.JS - dropdowns (dishes + IT projects) and dish filter
   ========================================================== */

// Open/close any dropdown: <button class="acc-btn" aria-controls="panel-id">
document.querySelectorAll(".acc-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const open = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
});

// Culinary filter: All / Main courses / Pastry
const filters = document.querySelectorAll(".filter");
const dishes = document.querySelectorAll(".dish");
filters.forEach(b => b.addEventListener("click", () => {
  const type = b.dataset.filter;
  filters.forEach(x => x.setAttribute("aria-pressed", x === b));
  dishes.forEach(d => { d.hidden = type !== "all" && d.dataset.cat !== type; });
}));
