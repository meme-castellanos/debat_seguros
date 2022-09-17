const navToggle = document.querySelector(".nav_toggle");
const navMenu = document.querySelector(".nav_menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav_menu_visible");

  if (navMenu.classList.contains("nav_menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});