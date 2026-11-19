/**
 * Member 3: State Controller & Event Handling
 * Git Branch: feature/member3-controller
 * Responsibility: Calculator state machine, button clicks, and keyboard shortcuts
 */

const CalculatorApp = {
  state: {
    currentInput: "0",
    previousInput: null,
    operator: null,
    shouldResetInput: false
  },

  init() {
    const keysContainer = document.querySelector(".calculator-keys");

    if (keysContainer) {
      keysContainer.addEventListener("click", (event) => {
        const btn = event.target.closest("button");
        if (!btn) return;
        this.handleButton(btn.dataset.action, btn.dataset.value);
      });
    }

    document.addEventListener("keydown", (event) => this.handleKeyboard(event));
    CalculatorDisplay.updateScreen(this.state.currentInput);
  },

  handleButton(action, value) {
    switch (action) {
      case "digit":
        this.inputDigit(value);
        break;
      case "decimal":
        this.inputDecimal();
        break;
      case "operator":
        this.chooseOperator(value);
        break;
      case "equals":
        this.evaluate();
        break;
      case "clear":
        this.reset();
        break;
      case "backspace":
        this.backspace();
        break;
    }
  },

  inputDigit(digit) {
    if (this.state.shouldResetInput) {
      this.state.currentInput = digit;
      this.state.shouldResetInput = false;
    } else {
      this.state.currentInput =
        this.state.currentInput === "0" ? digit : this.state.currentInput + digit;
    }
    this.refreshScreen();
  },

  inputDecimal() {
    if (this.state.shouldResetInput) {
      this.state.currentInput = "0.";
      this.state.shouldResetInput = false;
    } else if (!this.state.currentInput.includes(".")) {
      this.state.currentInput += ".";
    }
    this.refreshScreen();
  },

  chooseOperator(nextOperator) {
    if (this.state.operator && !this.state.shouldResetInput) {
      this.evaluate(false);
    }
    this.state.previousInput = this.state.currentInput;
    this.state.operator = nextOperator;
    this.state.shouldResetInput = true;
    this.refreshScreen();
  },

  evaluate(showCompleteExpression = true) {
    if (!this.state.operator || this.state.previousInput === null) return;

    const expression = `${this.state.previousInput} ${this.formatOperatorSymbol(
      this.state.operator
    )} ${this.state.currentInput}`;

    try {
      const result = CalculatorOps.calculate(
        this.state.previousInput,
        this.state.operator,
        this.state.currentInput
      );

      this.state.currentInput = String(result);
      this.state.previousInput = null;
      this.state.operator = null;
      this.state.shouldResetInput = true;
      CalculatorDisplay.updateScreen(
        this.state.currentInput,
        showCompleteExpression ? `${expression} =` : ""
      );
    } catch (err) {
      CalculatorDisplay.showError(err.message);
      this.state.currentInput = "0";
      this.state.previousInput = null;
      this.state.operator = null;
      this.state.shouldResetInput = true;
    }
  },

  backspace() {
    if (this.state.shouldResetInput) return;
    this.state.currentInput =
      this.state.currentInput.length > 1
        ? this.state.currentInput.slice(0, -1)
        : "0";
    this.refreshScreen();
  },

  reset() {
    this.state = {
      currentInput: "0",
      previousInput: null,
      operator: null,
      shouldResetInput: false
    };
    CalculatorDisplay.updateScreen("0", "");
  },

  formatOperatorSymbol(op) {
    const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
    return symbols[op] || op;
  },

  refreshScreen() {
    const exp =
      this.state.previousInput !== null && this.state.operator
        ? `${this.state.previousInput} ${this.formatOperatorSymbol(this.state.operator)}`
        : "";
    CalculatorDisplay.updateScreen(this.state.currentInput, exp);
  },

  handleKeyboard(event) {
    const { key } = event;
    if (/^[0-9]$/.test(key)) this.inputDigit(key);
    else if (key === ".") this.inputDecimal();
    else if (["+", "-", "*", "/"].includes(key)) this.chooseOperator(key);
    else if (key === "Enter" || key === "=") {
      event.preventDefault();
      this.evaluate();
    } else if (key === "Backspace") this.backspace();
    else if (key === "Escape") this.reset();
  }
};

document.addEventListener("DOMContentLoaded", () => CalculatorApp.init());