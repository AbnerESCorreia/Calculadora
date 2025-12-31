const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const sciSection = document.getElementById("scientific-section");
const themeIcon = document.getElementById("theme-icon");
const casioLogo = document.getElementById("casio-logo"); // Seleciona a logo aqui fora

function calculate() {
  try {
    let expr = display.value.replace(/÷/g, "/").replace(/×/g, "*");
    expr = expr
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log10");

    const result = eval(expr);
    display.value = Number.isInteger(result) ? result : result.toFixed(4);
  } catch {
    display.value = "Erro";
    setTimeout(() => (display.value = "0"), 1000);
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.getAttribute("data-val") || btn.innerText.trim();

    // --- TEMA (UNIFICADO) ---
    if (btn.id === "theme-toggle") {
      document.body.classList.toggle("strong-theme");

      // Inicia animação de giro do ícone
      themeIcon.classList.add("rotate-icon");

      // Verifica se mudou para dark ou light
      const isDark = document.body.classList.contains("strong-theme");

      // Troca o ícone e a LOGO no meio da animação
      setTimeout(() => {
        if (isDark) {
          themeIcon.className = "ri-moon-line";
          casioLogo.src = "img/casio-seeklogoWhite.png"; // Logo Branca
        } else {
          themeIcon.className = "ri-sun-line";
          casioLogo.src = "img/casio-seeklogo.png"; // Logo Preta
        }
      }, 100);

      // Remove a classe de rotação
      setTimeout(() => {
        themeIcon.classList.remove("rotate-icon");
      }, 400);
      return;
    }

    // --- CIENTÍFICO ---
    if (btn.id === "toggle-sci") {
      sciSection.classList.toggle("d-none");
      return;
    }

    // --- LOGICA DOS BOTÕES ---
    switch (val) {
      case "C":
        display.value = "0";
        break;
      case "del":
        display.value = display.value.slice(0, -1) || "0";
        break;
      case "=":
        calculate();
        break;
      case "sin":
      case "cos":
      case "tan":
      case "log":
        display.value =
          display.value === "0" ? val + "(" : display.value + val + "(";
        break;
      default:
        if (display.value === "0" && val !== ".") display.value = val;
        else display.value += val;
    }
  });
});
