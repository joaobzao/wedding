// ===== Contagem decrescente =====
// 14h00 em Portugal continental a 10/10/2026 (hora de verão, UTC+01:00)
const WEDDING_DATE = new Date("2026-10-10T14:00:00+01:00");

const cdEls = {
  dias: document.getElementById("cdDias"),
  horas: document.getElementById("cdHoras"),
  minutos: document.getElementById("cdMinutos"),
  segundos: document.getElementById("cdSegundos"),
};
const countdownEl = document.getElementById("countdown");
const countdownDoneEl = document.getElementById("countdownDone");

function updateCountdown() {
  const diff = WEDDING_DATE - Date.now();

  if (diff <= 0) {
    countdownEl.hidden = true;
    countdownDoneEl.hidden = false;
    clearInterval(countdownTimer);
    return;
  }

  const s = Math.floor(diff / 1000);
  cdEls.dias.textContent = Math.floor(s / 86400);
  cdEls.horas.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
  cdEls.minutos.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  cdEls.segundos.textContent = String(s % 60).padStart(2, "0");
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// ===== Navegação =====
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function onScroll() {
  nav.classList.toggle("nav--scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("nav--open");
  navToggle.setAttribute("aria-expanded", open);
});

// fecha o menu móvel ao escolher uma secção
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("nav--open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ===== Animação de entrada ao fazer scroll =====
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  document.body.classList.add("js-reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
}
