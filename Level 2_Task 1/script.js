const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener('click', () => {
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == "=") {
      const result = eval(PrepareInput(input));
      display_output.innerHTML = CleanOutput(result);
    } else if (value == "brackets") {
      const openBracket = input.indexOf("(");
      const closeBracket = input.indexOf(")");

      if (openBracket == -1 || (openBracket != -1 && closeBracket != -1 && openBracket < closeBracket)) {
        input += "(";
      } else if (openBracket != -1 && closeBracket == -1 || (openBracket != -1 && closeBracket != -1 && openBracket > closeBracket)) {
        input += ")";
      }

      display_input.innerHTML = CleanInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = CleanInput(input);
      }
    }
  });
}

function CleanInput(input) {
  const operators = {
    "*": "<span class='operator'>x</span>",
    "/": "<span class='operator'>÷</span>",
    "+": "<span class='operator'>+</span>",
    "-": "<span class='operator'>-</span>",
    "(": "<span class='brackets'>(</span>",
    ")": "<span class='brackets'>)</span>",
    "%": "<span class='percent'>%</span>"
  };

  const cleanedInput = input.split("").map(char => operators[char] || char).join("");
  return cleanedInput;
}

function CleanOutput(output) {
  let [outputString, decimal] = output.toString().split(".");
  outputString = outputString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimal) {
    outputString += `.${decimal}`;
  }

  return outputString;
}

function ValidateInput(value) {
  const lastInput = input.slice(-1);
  const operators = ["+", "-", "*", "/"];

  if (value == "." && lastInput == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(lastInput)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PrepareInput(input) {
  return input.split("").map(char => (char == "%") ? "/100" : char).join("");
}
