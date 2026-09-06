const modal = document.getElementById("modal");
const authForm = document.getElementById("authForm");
const authUser = document.getElementById("authUser");
const authEmail = document.getElementById("authEmail");
const emailLabel = document.getElementById("emailLabel");
const modalTitle = document.getElementById("modalTitle");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalCopy = document.getElementById("modalCopy");
const authSubmit = document.getElementById("authSubmit");
const sessionActions = document.getElementById("sessionActions");
const guestActions = document.getElementById("guestActions");
const sessionName = document.getElementById("sessionName");
const memberCount = document.getElementById("memberCount");

let authMode = "login";

function openModal(mode){
  authMode = mode;
  const register = mode === "register";
  modalEyebrow.textContent = register ? "NUEVA CUENTA" : "ACCESO";
  modalTitle.textContent = register ? "Crear cuenta" : "Iniciar sesión";
  modalCopy.textContent = register
    ? "Completa los datos para probar la interfaz de registro."
    : "Interfaz preparada para conectar con autenticación real.";
  emailLabel.hidden = !register;
  authEmail.required = register;
  authSubmit.textContent = register ? "Crear cuenta" : "Continuar";
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => authUser.focus(), 50);
}

function closeModal(){
  modal.hidden = true;
  document.body.style.overflow = "";
  authForm.reset();
}

document.querySelectorAll("[data-open]").forEach(el => {
  el.addEventListener("click", () => openModal(el.dataset.open));
});

document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape" && !modal.hidden) closeModal(); });

authForm.addEventListener("submit", e => {
  e.preventDefault();
  const raw = authUser.value.trim().replace(/^@/, "");
  if(!raw) return;
  const username = "@" + raw;

  sessionName.textContent = username;
  guestActions.hidden = true;
  sessionActions.hidden = false;
  memberCount.textContent = "3,851";
  closeModal();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionActions.hidden = true;
  guestActions.hidden = false;
  memberCount.textContent = "3,850";
});

const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const cards = [...document.querySelectorAll(".channel-card")];
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

function filterChannels(){
  const q = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const match = !q || card.dataset.search.includes(q);
    card.hidden = !match;
    if(match) visible++;
  });

  resultCount.textContent = `${visible} resultado${visible === 1 ? "" : "s"}`;
  emptyState.hidden = visible !== 0;
}

searchInput.addEventListener("input", filterChannels);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  filterChannels();
  searchInput.focus();
});
