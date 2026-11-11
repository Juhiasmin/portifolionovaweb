
// CAFÉ AURORA — INTERAÇÕES

document.addEventListener("DOMContentLoaded", () => {

  // Atualizar automaticamente o ano do rodapé
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});

