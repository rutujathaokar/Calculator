let currentInput = '';
let previousInput = '';
let operator = '';
let lastOperation = ''; 

function updateDisplay(value) {
    const display = document.getElementById('box');
    display.textContent = value || '0';
}

function button_number(value) {
    if (value === '=' || value === 'Enter') {
        if (previousInput && currentInput && operator) {
            currentInput = calculateResult(previousInput, currentInput, operator);
            previousInput = '';
            operator = '';
            updateDisplay(currentInput);
        }
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
        if (currentInput === '' && value === '-') {
            currentInput = '-';
            updateDisplay(currentInput);
        } else {
            if (previousInput && currentInput && operator) {
                currentInput = calculateResult(previousInput, currentInput, operator);
                updateDisplay(currentInput);
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        }
    } else {
        currentInput += value;
        updateDisplay(currentInput);
    }
}
function clear_entry() {
    currentInput = '';
    updateDisplay('0');
}
function button_clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}
function backspace_remove() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
    if (currentInput === '') {
        updateDisplay('0');
    }
}
function plus_minus() {
    if (currentInput !== '') {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay(currentInput);
    }
}
function calculate_percentage() {
    if (currentInput !== '') {
        currentInput = String(parseFloat(currentInput) / 100);
        updateDisplay(currentInput);
    }
}
function power_of() {
    if (currentInput !== '') {
        currentInput = String(Math.pow(parseFloat(currentInput), 2));
        updateDisplay(currentInput);
    }
}
function square_root() {
    if (currentInput !== '') {
        currentInput = String(Math.sqrt(parseFloat(currentInput)));
        updateDisplay(currentInput);
    }
}
function division_one() {
    if (currentInput !== '') {
        currentInput = String(1 / parseFloat(currentInput));
        updateDisplay(currentInput);
    }
}
function calculateResult(first, second, operation) {
    const num1 = parseFloat(first);
    const num2 = parseFloat(second);

    switch (operation) {
        case '+':
            return String(num1 + num2);
        case '-':
            return String(num1 - num2);
        case '*':
            return String(num1 * num2);
        case '/':
            return num2 !== 0 ? String(num1 / num2) : 'Error';
        case '%':
            return String(num1 % num2);
        default:
            return second;
    }
}
function equalSign() {
    if (previousInput && currentInput && operator) {
        currentInput = calculateResult(previousInput, currentInput, operator);
        previousInput = '';
        operator = '';
        updateDisplay(currentInput);
    }
}
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        button_number(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        button_number(key);
    } else if (key === 'Enter' || key === '=') {
        button_number('=');
    } else if (key === 'Backspace') {
        backspace_remove();
    } else if (key === 'Escape') {
        button_clear();
    } else if (key === '.') {
        button_number('.');
    }
});
window.onload = () => {
    updateDisplay('0');
};
