/**
 * Member 2: Display & Number Formatting
 * Git Branch: feature/member2-display
 * Responsibility: Screen updates, expression preview, number formatting, and error display
 */

const CalculatorDisplay = {
  getElements() {
    return {
      expressionEl: document.getElementById("expression"),
      resultEl: document.getElementById("result")
    };
  },

  formatNumber(value) {
    if (value === "Error" || value === "") return value;
    const str = String(value);
    if (str.endsWith(".")) return str;

    const num = Number(str);
    if (Number.isNaN(num)) return str;

    const [intPart, decPart] = str.split(".");
    const formattedInt = Number(intPart).toLocaleString("en-US");
    return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
  },

  updateScreen(currentValue, expressionText = "") {
    const { expressionEl, resultEl } = this.getElements();
    expressionEl.textContent = expressionText;
    resultEl.textContent = this.formatNumber(currentValue || "0");
    resultEl.classList.remove("error");
  },

  showError(message) {
    const { expressionEl, resultEl } = this.getElements();
    expressionEl.textContent = "";
    resultEl.textContent = message;
    resultEl.classList.add("error");
  }
};