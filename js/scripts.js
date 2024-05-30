const add = (op1, op2) => {
    return op1 + op2;
};

const subtract = (op1, op2) => {
    return op1 - op2;
};

const multiply = (op1, op2) => {
    return op1 * op2;
};

const divide = (op1, op2) => {
    return op1 / op2;
};

const updateUI = (calculation) => {
    const calculatorText = document.querySelector(".calculator-text");
    const calculatorOperationText = document.querySelector(
        ".calculator-operation"
    );
    if (calculation.length === 1) {
        calculatorText.textContent = calculation[0];
        calculatorOperationText.textContent = "";
    } else if (calculation.length === 2) {
        calculatorText.textContent = calculation[0];
        calculatorOperationText.textContent = calculation[1];
    } else {
        calculatorText.textContent = calculation[0];
        calculatorOperationText.textContent =
            calculation[1] + " " + calculation[2];
    }
};

const changeTheme = () => {};

const updateCalculation = (key, calculation) => {
    const operations = { "+": add, "-": subtract, x: multiply, "/": divide };
    const currentOperand = key;
    const lastOperand = calculation[calculation.length - 1];
    const isKeyOps = lastOperand in operations;
    switch (currentOperand) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (calculation.length === 4) {
                calculation.pop();
                calculation.pop();
                calculation.push(currentOperand);
                return;
            }
            if (currentOperand === "0" && lastOperand === "0") return;
            if (lastOperand === "0") {
                calculation[calculation.length - 1] = currentOperand;
                return;
            }
            isKeyOps
                ? calculation.push(currentOperand)
                : (calculation[calculation.length - 1] =
                      lastOperand + currentOperand);
            break;
        case "+":
        case "-":
        case "/":
        case "x":
            if (calculation.length == 3) {
                const midCalculation = operations[calculation[1]](
                    Number(calculation[0]),
                    Number(calculation[2])
                );
                calculation[0] = "" + midCalculation;

                calculation[1] = currentOperand;
                calculation.pop();
                return;
            }
            if (calculation.length === 4) {
                calculation.pop();
                calculation.pop();
                calculation[1] = currentOperand;
                return;
            }
            isKeyOps
                ? (calculation[calculation.length - 1] = currentOperand)
                : calculation.push(currentOperand);

            break;
        case ".":
            if (calculation.length === 4) return;
            if (isKeyOps) {
                calculation.push("0.");
                return;
            }
            if (!isKeyOps && !lastOperand.includes(".")) {
                calculation[calculation.length - 1] =
                    lastOperand + currentOperand;
            }
            break;
        case "RESET":
            while (calculation.length > 0) {
                calculation.pop();
            }
            calculation.push("0");
            break;
        case "DEL":
            if (!calculation.length) return;
            if (calculation.length === 4) {
                calculation.pop();
                return;
            }
            if (
                (calculation.length === 1 &&
                    calculation[calculation.length - 1].length === 1) ||
                (calculation.length === 1 &&
                    calculation[0].length == 2 &&
                    calculation[0][0] === "-")
            ) {
                calculation[calculation.length - 1] = "0";
                return;
            }

            if (isKeyOps) {
                calculation.pop();
            } else {
                if (lastOperand === "NaN" || lastOperand === "Infinity") {
                    calculation[calculation.length - 1] = "0";
                    return;
                }
                calculation[calculation.length - 1] = lastOperand.slice(
                    0,
                    lastOperand.length - 1
                );
                if (!calculation[calculation.length - 1]) calculation.pop();
            }
            break;
        case "=":
            if (calculation.length === 1) return;
            if (calculation.length === 2) {
                calculation.push(calculation[0]);
                updateCalculation("=", calculation);
            } else if (calculation.length === 3) {
                const midCalculation = operations[calculation[1]](
                    Number(calculation[0]),
                    Number(calculation[2])
                );
                calculation[0] = "" + midCalculation;
                calculation.push("=");
            } else {
                const midCalculation = operations[calculation[1]](
                    Number(calculation[0]),
                    Number(calculation[2])
                );
                calculation[0] = "" + midCalculation;
            }
            break;
    }
};

const setupCalculator = (calculation) => {
    const buttons = document.querySelectorAll("button");
    const themeSlider = document.querySelector(".theme-slider");
    const styleSheet = document.querySelector(".theme-sheet");
    for (let button of buttons) {
        button.addEventListener("click", (event) => {
            updateCalculation(event.target.textContent, calculation);
            updateUI(calculation);
        });
    }
    themeSlider.addEventListener("change", (event) => {
        const themeValue = event.target.value;
        switch (themeValue) {
            case "1":
                styleSheet.href = "css/themes/blue.css";
                break;
            case "2":
                styleSheet.href = "css/themes/gray.css";
                break;
            case "3":
                styleSheet.href = "css/themes/violet.css";
                break;
        }
    });
};

const calculator = () => {
    let calculation = ["0"];

    setupCalculator(calculation);
    updateUI(calculation);
};

const main = () => {
    calculator();
};

main();
