/* ==========================================================
   RESUME.JS - project filter (All / IT / Culinary)
   (expand/collapse is handled in main.js)
   ========================================================== */
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

function applyFilter(type) {
  filters.forEach(b => b.setAttribute("aria-pressed", b.dataset.filter === type));
  projects.forEach(p => { p.hidden = type !== "all" && p.dataset.type !== type; });
}
filters.forEach(b => b.addEventListener("click", () => applyFilter(b.dataset.filter)));

// Open a filter directly from a link such as resume.html#it or #culinary
const hash = location.hash.replace("#", "");
if (hash === "it" || hash === "culinary") applyFilter(hash);
