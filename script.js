const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

const OPERATORS = ["+", "-", "×", "÷"];

let expression = ""; // poora input jo type ho raha hai, e.g. "2+2"
let justEvaluated = false; // true jab "=" abhi abhi press hua ho

function fitFontSize() {
  const len = resultEl.textContent.length;
  let size = 40;
  if (len > 14) size = 20;
  else if (len > 10) size = 26;
  else if (len > 7) size = 32;
  resultEl.style.fontSize = size + "px";
}

function updateScreen() {
  if (justEvaluated) {
    // "=" ke baad: neeche answer, upar expression pehle hi set ho chuka hota hai
    resultEl.textContent = expression;
  } else {
    // typing ke dauran: poora expression neeche bold me, upar khali
    resultEl.textContent = expression === "" ? "0" : expression;
    expressionEl.textContent = "\u00A0";
  }
  fitFontSize();
}

function isOperator(ch) {
  return OPERATORS.includes(ch);
}

function lastNumberSegment() {
  const parts = expression.split(/[+\-×÷]/);
  return parts[parts.length - 1];
}

function inputNumber(num) {
  if (justEvaluated) {
    expression = "";
    justEvaluated = false;
  }
  // "0" ke aage sirf zero na lagay
  if (lastNumberSegment() === "0") {
    expression = expression.slice(0, -1) + num;
  } else {
    expression += num;
  }
  updateScreen();
}

function inputDecimal() {
  if (justEvaluated) {
    expression = "";
    justEvaluated = false;
  }
  const seg = lastNumberSegment();
  if (seg.includes(".")) return; // ek hi decimal point allow
  expression += seg === "" ? "0." : ".";
  updateScreen();
}

function chooseOperator(op) {
  if (justEvaluated) {
    justEvaluated = false; // result ke upar se hi agla operation chalu karo
  }

  if (expression === "") {
    if (op === "-") expression = "-"; // negative number shuru karne ke liye
    updateScreen();
    return;
  }

  const lastChar = expression.slice(-1);
  if (isOperator(lastChar)) {
    expression = expression.slice(0, -1) + op; // operator replace karo
  } else {
    expression += op;
  }
  updateScreen();
}

// Expression ko numbers aur operators ki tokens list me todta hai.
// Sirf shuru ka "-" hi unary (negative sign) ho sakta hai, kyunke
// UI kabhi do operators ek saath nahi lagne deta (chooseOperator me check hai).
function tokenizeExpression(expr) {
  let negFirst = false;
  if (expr[0] === "-") {
    negFirst = true;
    expr = expr.slice(1);
  }
  const tokens = expr.match(/(\d+\.?\d*)|[+\-×÷]/g) || [];
  if (negFirst && tokens.length > 0) {
    tokens[0] = "-" + tokens[0]; // pehle number ko negative bana do
  }
  return tokens;
}

// BODMAS ke mutabiq evaluate karta hai: pehle × aur ÷ (left-to-right),
// phir + aur - (left-to-right).
function evaluateExpression(expr) {
  const tokens = tokenizeExpression(expr);
  if (tokens.length === 0) return NaN;

  // Pass 1: Multiplication aur Division
  const stage1 = [parseFloat(tokens[0])];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const num = parseFloat(tokens[i + 1]);
    if (op === "×") {
      stage1.push(stage1.pop() * num);
    } else if (op === "÷") {
      const prev = stage1.pop();
      stage1.push(num === 0 ? NaN : prev / num);
    } else {
      stage1.push(op, num); // + aur - abhi ke liye jaisa hai waisa rakho
    }
  }

  // Pass 2: Addition aur Subtraction
  let result = stage1[0];
  for (let i = 1; i < stage1.length; i += 2) {
    const op = stage1[i];
    const num = stage1[i + 1];
    if (op === "+") result += num;
    else if (op === "-") result -= num;
  }

  return result;
}

function calculate() {
  if (expression === "" || expression === "-") return;

  let expr = expression;
  if (isOperator(expr.slice(-1))) {
    expr = expr.slice(0, -1); // trailing operator hata do
  }

  let result = evaluateExpression(expr);
  if (!isNaN(result)) {
    result = Math.round((result + Number.EPSILON) * 1e10) / 1e10;
  }

  expressionEl.textContent = expr + " =";
  expression = isNaN(result) ? "Error" : String(result);
  justEvaluated = true;
  updateScreen();
}

function clearAll() {
  expression = "";
  justEvaluated = false;
  expressionEl.textContent = "\u00A0";
  updateScreen();
}

function backspace() {
  if (justEvaluated) return;
  expression = expression.slice(0, -1);
  updateScreen();
}

function percent() {
  if (expression === "") return;
  const match = expression.match(/(\d+\.?\d*)$/);
  if (!match) return;
  const numVal = parseFloat(match[1]) / 100;
  expression = expression.slice(0, match.index) + String(numVal);
  updateScreen();
}

document.querySelector(".keys").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === "number") inputNumber(value);
  else if (action === "decimal") inputDecimal();
  else if (action === "operator") chooseOperator(value);
  else if (action === "equals") calculate();
  else if (action === "clear") clearAll();
  else if (action === "backspace") backspace();
  else if (action === "percent") percent();
});

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") inputNumber(e.key);
  else if (e.key === ".") inputDecimal();
  else if (e.key === "+") chooseOperator("+");
  else if (e.key === "-") chooseOperator("-");
  else if (e.key === "*") chooseOperator("×");
  else if (e.key === "/") {
    e.preventDefault();
    chooseOperator("÷");
  } else if (e.key === "Enter" || e.key === "=") calculate();
  else if (e.key === "Backspace") backspace();
  else if (e.key === "Escape") clearAll();
  else if (e.key === "%") percent();
});

updateScreen();
