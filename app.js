let current = '0';
let previous = '';

function updateDisplay() {
    document.getElementById('current').textContent = current;
    document.getElementById('previous').textContent = previous;
}

function addNumber(num) {
    if (current === '0') current = num;
    else current += num;
    updateDisplay();
}

function addOperator(op) {
    previous = current + op;
    current = '0';
    updateDisplay();
}

function addFunction(func) {
    previous = func + current;
    current = '0';
    updateDisplay();
}

function clearAll() {
    current = '0';
    previous = '';
    updateDisplay();
}

function deleteLast() {
    current = current.slice(0, -1) || '0';
    updateDisplay();
}

function calculate() {
    try {
        let expression = previous + current;
        expression = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/\^/g, '**')
            .replace(/√/g, 'Math.sqrt')
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/log₁₀/g, 'Math.log10')
            .replace(/10\^/g, '10**')
            .replace(/e\^/g, 'Math.exp');

        if (expression.includes('!')) {
            const num = parseFloat(expression.replace('!', ''));
            current = factorial(num).toString();
        } else {
            current = eval(expression).toString();
        }

        previous = expression + '=';
        updateDisplay();
    } catch (error) {
        current = 'Error';
        previous = '';
        updateDisplay();
        setTimeout(clearAll, 1000);
    }
}

function factorial(n) {
    if (n < 0) throw new Error();
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') addNumber(e.key);
    if (e.key === '.') addNumber('.');
    if (['+', '-', '*', '/'].includes(e.key)) addOperator(e.key);
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearAll();
});