let displayValue = "0";
let waitingForOperand = false;

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = displayValue;
}

function appendValue(value) {
  if (displayValue === "0" || waitingForOperand) {
    displayValue = value;
    waitingForOperand = false;
  } else {
    displayValue += value;
  }
  updateDisplay();
}

function appendOperator(operator) {
  // If the last character is an operator, replace it
  const lastChar = displayValue.slice(-1);
  if (["+", "-", "*", "/"].includes(lastChar)) {
    displayValue = displayValue.slice(0, -1) + operator;
  } else {
    displayValue += operator;
  }
  waitingForOperand = false;
  updateDisplay();
}

function clearDisplay() {
  displayValue = "0";
  waitingForOperand = false;
  updateDisplay();
}

function backspace() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = "0";
  }
  updateDisplay();
}

function calculate() {
  try {
    // Use Function instead of eval for slightly better security
    const result = Function('"use strict"; return (' + displayValue + ")")();

    // Format the result
    displayValue = result.toString();
    waitingForOperand = true;
    updateDisplay();
  } catch (error) {
    displayValue = "Error";
    waitingForOperand = true;
    updateDisplay();

    // Reset after error display
    setTimeout(() => {
      clearDisplay();
    }, 1500);
  }
}
