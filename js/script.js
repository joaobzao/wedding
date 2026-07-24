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

// ===== Copiar dados de pagamento (IBAN / MB WAY) =====
// Toca no valor para copiar; mostra uma confirmação breve e traduzida.
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // Alternativa para contextos não seguros / navegadores antigos
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
    document.body.removeChild(ta);
    ok ? resolve() : reject();
  });
}

let copyToastTimer;
function showCopyToast(msg) {
  let toast = document.getElementById("copyToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "copyToast";
    toast.className = "copy-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(copyToastTimer);
  copyToastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
}

function copiedLabel() {
  const lang = document.documentElement.lang === "en" ? "en" : "pt";
  return (typeof I18N !== "undefined" && I18N[lang] && I18N[lang].copied) || "Copiado!";
}

document.querySelectorAll("[data-copy]").forEach((btn) => {
  const textEl = btn.querySelector(".gift__copy-text") || btn;
  btn.addEventListener("click", () => {
    copyText(textEl.textContent.trim())
      .then(() => {
        showCopyToast(copiedLabel());
        btn.classList.add("is-copied");
        setTimeout(() => btn.classList.remove("is-copied"), 1500);
      })
      .catch(() => { /* silencioso: o valor continua visível para cópia manual */ });
  });
});
