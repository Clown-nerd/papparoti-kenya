const nav = document.querySelector("#site-navigation");
const navToggle = document.querySelector(".menu-toggle");
const reservationDialog = document.querySelector(".reservation-modal");
const reservationForm = document.querySelector("#reservation-form");
const reservationFormView = document.querySelector(".reservation-form-view");
const reservationSentView = document.querySelector(".reservation-sent");
const whatsappFallback = document.querySelector("#whatsapp-fallback");

document.querySelector("[data-year]").textContent = new Date().getFullYear();

function closeNavigation() {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  nav.classList.toggle("open", !isOpen);
});

nav.querySelectorAll("a, button").forEach((item) => item.addEventListener("click", closeNavigation));
document.addEventListener("click", (event) => {
  if (nav.classList.contains("open") && !nav.contains(event.target) && !navToggle.contains(event.target)) closeNavigation();
});

document.querySelectorAll("[data-open-reservation]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    closeNavigation();
    reservationForm.reset();
    reservationFormView.hidden = false;
    reservationSentView.hidden = true;
    reservationDialog.showModal();
  });
});

document.querySelectorAll("[data-close-reservation]").forEach((button) => {
  button.addEventListener("click", () => reservationDialog.close());
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;

  const form = new FormData(reservationForm);
  const branchPhones = { "Circle Mall": "254768612064", "Broadwalk Mall": "254741799330" };
  const branch = String(form.get("branch"));
  const message = [
    `Hello Papparoti, I’d like to request a table at ${branch}.`,
    `Name: ${form.get("name")}.`,
    `Phone: ${form.get("phone")}.`,
    `Guests: ${form.get("guests")}.`,
    `Preferred date and time: ${form.get("date")} .`,
  ].join(" ");
  const whatsappUrl = `https://wa.me/${branchPhones[branch]}?text=${encodeURIComponent(message)}`;

  whatsappFallback.href = whatsappUrl;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  reservationFormView.hidden = true;
  reservationSentView.hidden = false;
  reservationSentView.querySelector("[data-close-reservation]").focus();
});

reservationDialog.addEventListener("click", (event) => {
  if (event.target === reservationDialog) reservationDialog.close();
});

reservationDialog.addEventListener("close", () => {
  reservationFormView.hidden = false;
  reservationSentView.hidden = true;
});
