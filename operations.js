/**
 * Member 1: Core Basic Arithmetic Operations
 * Git Branch: feature/member1-operations
 * Responsibility: Basic math functions (+, -, *, /) and expression evaluation
 */

const CalculatorOps = {
  add(a, b) {
    return a + b;
  },

  subtract(a, b) {
    return a - b;
  },

  multiply(a, b) {
    return a * b;
  },

  divide(a, b) {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  },

  calculate(firstOperand, operator, secondOperand) {
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      throw new Error("Invalid number");
    }

    let result;
    switch (operator) {
      case "+":
        result = this.add(a, b);
        break;
      case "-":
        result = this.subtract(a, b);
        break;
      case "*":
        result = this.multiply(a, b);
        break;
      case "/":
        result = this.divide(a, b);
        break;
      default:
        return b;
    }

    // Avoid floating-point precision artifacts like 0.1 + 0.2 = 0.30000000000000004
    return Math.round((result + Number.EPSILON) * 1e10) / 1e10;
  }
};