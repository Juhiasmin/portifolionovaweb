
// NOVA/WEB — Interações do site

document.addEventListener("DOMContentLoaded", () => {

  // Menu mobile
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Ano automático no rodapé
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Animações ao rolar a página
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Formulário de contato pelo WhatsApp
  const contactForm = document.querySelector("#contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#name")?.value.trim() || "";
      const business = document.querySelector("#business")?.value.trim() || "";
      const service = document.querySelector("#service")?.value.trim() || "";
      const message = document.querySelector("#message")?.value.trim() || "";

      if (!name || !service || !message) {
        alert("Preencha os campos obrigatórios.");
        return;
      }

      const whatsappNumber = "5512997735290";

      const text = [
        "Olá! Vim pelo site da NOVA/WEB.",
        "",
        `Nome: ${name}`,
        `Negócio: ${business || "Não informado"}`,
        `Serviço: ${service}`,
        `Mensagem: ${message}`
      ].join("\n");

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

      window.open(whatsappURL, "_blank");
    });
  }

});
