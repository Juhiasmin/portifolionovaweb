
document.addEventListener("DOMContentLoaded", () => {
  // MENU MOBILE
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ANO AUTOMÁTICO NO RODAPÉ
  const currentYear = document.querySelector("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // FORMULÁRIO MULTIETAPAS
  const formContainer = document.querySelector(".briefing-form");
  const form = formContainer?.tagName === "FORM"
    ? formContainer
    : formContainer?.querySelector("form");

  const steps = form?.querySelectorAll(".form-step");
  const counter = document.querySelector(".form-counter");
  const progressBar = document.querySelector(".progress-bar");
  const successMessage = document.querySelector("#formSuccess");
  const restartButton = document.querySelector("#restartForm");

  if (!form || !steps?.length) return;

  let currentStep = 0;

  // Impede o navegador de validar campos de etapas ainda não abertas.
  form.noValidate = true;

  function showStep(index) {
    currentStep = index;

    steps.forEach((step, i) => {
      step.classList.toggle("active", i === index);
      step.style.display = i === index ? "" : "none";
    });

    if (counter) {
      counter.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
    }

    if (progressBar) {
      progressBar.style.width =
        `${((index + 1) / steps.length) * 100}%`;
    }
  }

  function validateStep(index) {
    const fields = steps[index].querySelectorAll(
      "input, select, textarea"
    );

    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }

    return true;
  }

  // BOTÃO CONTINUAR
  form.querySelectorAll(".next-step").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      if (!validateStep(currentStep)) return;

      if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
      }
    });
  });

  // BOTÃO VOLTAR
  form.querySelectorAll(".previous-step").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  // FINALIZAÇÃO DEMONSTRATIVA
  function finishForm() {
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        showStep(i);
        return;
      }
    }

    steps.forEach((step) => {
      step.style.display = "none";
      step.classList.remove("active");
    });

    const formTop = form.querySelector(".form-top");
    const formProgress = form.querySelector(".form-progress");

    if (formTop) formTop.style.display = "none";
    if (formProgress) formProgress.style.display = "none";

    if (successMessage) {
      successMessage.style.display = "block";
      successMessage.hidden = false;
      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    finishForm();
  });

  const submitButton = form.querySelector(".submit-briefing");

  if (submitButton) {
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      finishForm();
    });
  }

  // REINICIAR FORMULÁRIO
  if (restartButton) {
    restartButton.addEventListener("click", () => {
      form.reset();

      if (successMessage) {
        successMessage.style.display = "none";
        successMessage.hidden = true;
      }

      const formTop = form.querySelector(".form-top");
      const formProgress = form.querySelector(".form-progress");

      if (formTop) formTop.style.display = "";
      if (formProgress) formProgress.style.display = "";

      showStep(0);
    });
  }

  // INICIA NA PRIMEIRA ETAPA
  if (successMessage) {
    successMessage.style.display = "none";
    successMessage.hidden = true;
  }

  showStep(0);
});
