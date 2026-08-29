# Calculator

A sleek, web-based calculator built with HTML, CSS, and vanilla JavaScript. It features a dark, retro digital-screen aesthetic with correct order-of-operations (BODMAS) support.

## ✨ Features

- **Basic Arithmetic:** Addition, Subtraction, Multiplication, Division.
- **Correct Order of Operations:** Multiplication and division are evaluated before addition and subtraction (BODMAS/PEMDAS).
- **Percentage Calculation:** Easily calculate percentages.
- **Negative Numbers:** Supports expressions that start with a negative number.
- **Dynamic Screen:** The expression is shown as you type (e.g. `2+3×4`) and moves to the top line once you press `=`, with the result shown below. Font size auto-shrinks for long expressions.
- **Keyboard Support:** Full support for number keys and standard keyboard inputs (`Enter`, `Backspace`, `Escape`, `%`).
- **Modern UI:** Dark-cased, retro LCD-inspired design with distinct functional and operator buttons.

## 🚀 Technologies Used

- **HTML5:** For the basic structure and semantic layout.
- **CSS3:** Custom properties (variables), CSS Grid for the keypad layout, and modern styling techniques like gradients and box-shadows.
- **JavaScript (Vanilla):** DOM manipulation, event listeners, and calculation logic.

## 🛠️ How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/Naaima21/-calculator-project.git
   ```
2. Navigate into the project folder:
   ```bash
   cd  -calculator-project
   ```
3. Open `index.html` in your browser.

> Note: `index.html`, `style.css`, and `script.js` must stay in the same folder — they link to each other using relative paths.

## 🧠 How It Works

- `expression` (in `script.js`) stores the full input string as it's typed, e.g. `"2+3×4"`.
- `tokenizeExpression()` splits the expression into numbers and operators, correctly handling a leading negative sign.
- `evaluateExpression()` evaluates the expression in two passes to respect order of operations:
  1. Multiplication and division (left to right)
  2. Addition and subtraction (left to right)
- `updateScreen()` controls what's shown on the display: the full expression while typing, and the expression + result after `=` is pressed.

## 📁 Project Structure

```
-calculator-project/
├── index.html        # Page structure
├── style.css         # Styling (retro LCD calculator theme)
├── script.js         # Calculator logic
└── README.md
```

## ⚠️ Known Limitations

- No support for parentheses `()`.
- No support for exponents or advanced scientific functions.
