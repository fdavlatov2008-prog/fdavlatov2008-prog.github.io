const toggle = document.querySelector(".theme-toggle");
const icon = toggle.querySelector(".theme-icon");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const storageKey = "student-portfolio-theme";

let selectedTheme;
try {
  const storedTheme = localStorage.getItem(storageKey);
  if (storedTheme === "light" || storedTheme === "dark") {
    selectedTheme = storedTheme;
  }
} catch {
  // The toggle still works when browser storage is unavailable.
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  toggle.setAttribute("aria-pressed", String(isDark));
  icon.textContent = isDark ? "☀" : "☾";
}

function syncTheme() {
  applyTheme(selectedTheme ?? (systemTheme.matches ? "dark" : "light"));
}

toggle.addEventListener("click", () => {
  selectedTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(selectedTheme);
  try {
    localStorage.setItem(storageKey, selectedTheme);
  } catch {
    // The current page keeps the selected theme.
  }
});

systemTheme.addEventListener("change", syncTheme);
syncTheme();
toggle.hidden = false;

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("entered");
        sectionObserver.unobserve(entry.target);
      }
    }
  });

  document.querySelectorAll(".section").forEach((section) => sectionObserver.observe(section));
}
