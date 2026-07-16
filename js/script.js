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

// ===== Sobreposições (controladas pelo # do endereço) =====
// Usar o hash mantém o botão "voltar" e permite partilhar ligações diretas.
const OVERLAY_IDS = ["luademel", "rsvp"];
const overlays = OVERLAY_IDS
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function syncOverlays() {
  const current = decodeURIComponent(location.hash.slice(1));
  let anyOpen = false;

  overlays.forEach((el) => {
    const open = el.id === current;
    el.classList.toggle("is-open", open);
    el.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) {
      anyOpen = true;
      const scroll = el.querySelector(".overlay__scroll");
      if (scroll) scroll.scrollTop = 0;
    }
  });

  // garante que o conteúdo por trás não é focável enquanto há modal aberto
  document.querySelector(".invite").toggleAttribute("inert", anyOpen);
}

window.addEventListener("hashchange", syncOverlays);
syncOverlays();

// Fechar: ligações com [data-close] limpam o hash; Esc faz o mesmo.
function closeOverlay() {
  if (OVERLAY_IDS.includes(decodeURIComponent(location.hash.slice(1)))) {
    history.pushState("", document.title, location.pathname + location.search);
    syncOverlays();
  }
}

document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    closeOverlay();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeOverlay();
});
