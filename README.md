Calculator

A responsive calculator built with vanilla HTML, CSS, and JavaScript — no frameworks or libraries. Features a retro LCD-style UI, full keyboard support, and BODMAS-based expression evaluation.

Preview

A dark-cased calculator ("Model CX-1") with a mint-green LCD display. The full expression is shown as you type (e.g. 2+3×4), and moves to the small line above once you press =, with the result shown below.

Features
Basic operations: addition, subtraction, multiplication, division
Correct order of operations (BODMAS/PEMDAS) — multiplication and division are evaluated before addition and subtraction
Percentage (%) and decimal point support
Negative number support
Backspace (DEL) and clear (AC)
Full keyboard support (number keys, + - * /, Enter, Backspace, Escape, %)
Auto-shrinking font size for long expressions
Project Structure
calculator-project/
├── calculator.html   # Page structure
├── style.css          # Styling (retro LCD calculator theme)
├── script.js          # Calculator logic
└── README.md
How to Run
Clone or download this repository.
Keep all three files (calculator.html, style.css, script.js) in the same folder.
Open calculator.html in any browser.

Note: The files link to each other using relative paths, so they must stay in the same folder to work correctly.

How It Works
expression (in script.js) stores the full input string as it's typed, e.g. "2+3×4".
tokenizeExpression() splits the expression into numbers and operators, correctly handling a leading negative sign.
evaluateExpression() evaluates the expression in two passes to respect order of operations:
Multiplication and division (left to right)
Addition and subtraction (left to right)
updateScreen() controls what's shown on the display: the full expression while typing, and the expression + result after = is pressed.
Known Limitations
No support for parentheses ().
No support for exponents or advanced scientific functions.
