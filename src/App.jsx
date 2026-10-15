import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);

  const handleNumber = (value) => {
    setDisplay((prev) => {
      if (prev === "0" && value !== ".") return value;
      if (value === "." && prev.includes(".")) return prev;
      return prev + value;
    });
  };

  const clearAll = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
  };

  const deleteLast = () => {
    setDisplay((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
  };

  const handleOperator = (nextOperator) => {
    const currentValue = Number(display);

    if (storedValue !== null && operator !== null) {
      const result = calculate(storedValue, currentValue, operator);
      setStoredValue(result);
      setDisplay(String(result));
    } else {
      setStoredValue(currentValue);
    }

    setOperator(nextOperator);
    setDisplay("0");
  };

  const calculate = (a, b, op) => {
    if (op === null) return b;
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? "Error" : a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (storedValue === null || operator === null) return;

    const result = calculate(storedValue, Number(display), operator);

    setDisplay(String(result));
    setStoredValue(null);
    setOperator(null);
  };

  const handlePercent = () => {
    const value = Number(display) / 100;
    setDisplay(String(value));
  };

  const buttons = [
    { label: "C", action: clearAll, className: "operator" },
    { label: "⌫", action: deleteLast, className: "operator" },
    { label: "%", action: handlePercent, className: "operator" },
    { label: "÷", action: () => handleOperator("/"), className: "operator" },

    { label: "7", action: () => handleNumber("7") },
    { label: "8", action: () => handleNumber("8") },
    { label: "9", action: () => handleNumber("9") },
    { label: "×", action: () => handleOperator("*"), className: "operator" },

    { label: "4", action: () => handleNumber("4") },
    { label: "5", action: () => handleNumber("5") },
    { label: "6", action: () => handleNumber("6") },
    { label: "-", action: () => handleOperator("-"), className: "operator" },

    { label: "1", action: () => handleNumber("1") },
    { label: "2", action: () => handleNumber("2") },
    { label: "3", action: () => handleNumber("3") },
    { label: "+", action: () => handleOperator("+"), className: "operator" },

    { label: "±", action: () => setDisplay(String(Number(display) * -1)) },
    { label: "0", action: () => handleNumber("0") },
    { label: ".", action: () => handleNumber(".") },
    { label: "=", action: handleEquals, className: "equals" },
  ];

  return (
    <div className="app">
      <div className="calculator">
        <div className="display-wrap">
          <div className="display">{display}</div>
        </div>

        <div className="buttons">
          {buttons.map((button) => (
            <button
              key={button.label}
              className={`btn ${button.className || ""}`}
              onClick={button.action}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
