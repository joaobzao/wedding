// ===== Bilingue (PT / EN) =====
// Por defeito assume PT; assume EN se o sistema/navegador estiver em inglês.
// A escolha manual fica guardada em localStorage.

const I18N = {
  pt: {
    __title: "Sofia & João · Casamento & Baptizado da Maria Luísa · 10 de Outubro de 2026",
    wedding: "Casamento",
    baptism: "Baptizado",
    date: "10 de Outubro de 2026 · Porto",
    countdownAria: "Contagem decrescente para o casamento",
    days: "Dias",
    hours: "Horas",
    min: "Min",
    sec: "Seg",
    countdownDone: "Já casámos e baptizámos a nossa Maria Luísa! Obrigado por celebrarem connosco. ♥",
    ceremonyLabel: "Cerimónia & Baptizado",
    ceremonyMeta: "Porto · 13h30",
    receptionLabel: "Recepção",
    receptionMeta: "Maia",
    viewMap: "Ver no mapa",
    moreInfo: "Mais informações",
    gift: "Presente",
    rsvpAction: "Confirmar presença",
    close: "Fechar",
    honeymoonEyebrow: "A nossa próxima aventura",
    honeymoonTitle: "Lua de Mel",
    honeymoonIntro: "A vossa presença no nosso grande dia é, para nós, o presente mais bonito. Mas se quiserem oferecer-nos algo mais, podem contribuir para a nossa lua de mel — adoraríamos levar-vos connosco em cada passo desta viagem.",
    stopLaNote: "O início da aventura",
    stopVegasNote: "O que acontece em Vegas fica em Vegas",
    stopCanyonNote: "Diante de uma maravilha do mundo",
    stopSf: "São Francisco",
    stopSfNote: "A cidade da ponte mais famosa",
    stopPacific: "Costa do Pacífico",
    stopPacificNote: "Road trip pela estrada mais bonita",
    stopHawaiiNote: "O paraíso para terminar",
    bankTransfer: "Transferência bancária",
    copyBank: "Copiar IBAN",
    copyMbway: "Copiar número MB WAY",
    openRevolut: "Abrir Revolut",
    copied: "Copiado!",
    thanks: "Obrigado ♥",
    rsvpEyebrow: "Contamos consigo",
    rsvpTitle: "Confirme a sua presença",
    rsvpNote: "Por favor confirme até <strong>10 de Setembro de 2026</strong>.",
    fieldName: "Nome *",
    fieldEmail: "Email *",
    fieldAttend: "Vai estar presente? *",
    attendYes: "Sim, claro!",
    attendNo: "Infelizmente não",
    fieldGuests: "Nº de acompanhantes",
    fieldDiet: "Restrições alimentares",
    dietPlaceholder: "Vegetariano, alergias, …",
    fieldMessage: "Mensagem para os noivos",
    messagePlaceholder: "Deixe-nos umas palavras ♥",
  },
  en: {
    __title: "Sofia & João · Wedding & Baptism of Maria Luísa · October 10, 2026",
    wedding: "Wedding",
    baptism: "Baptism",
    date: "October 10, 2026 · Porto",
    countdownAria: "Countdown to the wedding",
    days: "Days",
    hours: "Hours",
    min: "Min",
    sec: "Sec",
    countdownDone: "We've married and baptised our Maria Luísa! Thank you for celebrating with us. ♥",
    ceremonyLabel: "Ceremony & Baptism",
    ceremonyMeta: "Porto · 1:30 PM",
    receptionLabel: "Reception",
    receptionMeta: "Maia",
    viewMap: "View on map",
    moreInfo: "More information",
    gift: "Gift",
    rsvpAction: "RSVP",
    close: "Close",
    honeymoonEyebrow: "Our next adventure",
    honeymoonTitle: "Honeymoon",
    honeymoonIntro: "Your presence on our big day is, to us, the most beautiful gift. But if you'd like to give us something more, you can contribute to our honeymoon — we'd love to take you along on every step of this journey.",
    stopLaNote: "The start of the adventure",
    stopVegasNote: "What happens in Vegas stays in Vegas",
    stopCanyonNote: "Before a wonder of the world",
    stopSf: "San Francisco",
    stopSfNote: "The city of the most famous bridge",
    stopPacific: "Pacific Coast",
    stopPacificNote: "Road trip along the most beautiful road",
    stopHawaiiNote: "Paradise to finish",
    bankTransfer: "Bank transfer",
    copyBank: "Copy IBAN",
    copyMbway: "Copy MB WAY number",
    openRevolut: "Open Revolut",
    copied: "Copied!",
    thanks: "Thank you ♥",
    rsvpEyebrow: "We're counting on you",
    rsvpTitle: "Confirm your attendance",
    rsvpNote: "Please RSVP by <strong>10 September 2026</strong>.",
    fieldName: "Name *",
    fieldEmail: "Email *",
    fieldAttend: "Will you attend? *",
    attendYes: "Yes, of course!",
    attendNo: "Unfortunately, no",
    fieldGuests: "Number of guests",
    fieldDiet: "Dietary restrictions",
    dietPlaceholder: "Vegetarian, allergies, …",
    fieldMessage: "Message for the couple",
    messagePlaceholder: "Leave us a few words ♥",
  },
};

const LANG_STORAGE_KEY = "wedding-lang";

function detectLang() {
  // Por defeito PT (ignora o idioma do navegador); respeita a escolha guardada.
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch (_) { /* localStorage indisponível */ }

  return "pt";
}

function applyLang(lang) {
  const dict = I18N[lang] || I18N.pt;

  document.documentElement.lang = lang;
  if (dict.__title) document.title = dict.__title;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n")];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-html")];
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-aria")];
    if (v != null) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-placeholder")];
    if (v != null) el.setAttribute("placeholder", v);
  });

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    const active = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function setLang(lang) {
  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (_) { /* ignore */ }
  applyLang(lang);
}

applyLang(detectLang());

document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
});
