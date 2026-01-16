const display = document.getElementById("display");
let currentInput = "";

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function handleInput(value) {
  if(value === "C") {
    currentInput = "";
  }
  else if(value === "DEL") {
    currentInput = currentInput.slice(0, -1);
  }
  else if(value === "=") {
    try{
      if(currentInput.includes("/0")) throw "Math Error";
      currentInput = eval(currentInput).toString();
    }catch{
      currentInput = "Error";
      setTimeout(() => {
        currentInput = "";
        updateDisplay();
      }, 1000);
    }
  }
  else {
    currentInput += value;
  }
  updateDisplay();
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.dataset.value));
});

// Keyboard Input
window.addEventListener("keydown", e => {
  if((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) {
    currentInput += e.key;
  }
  else if(e.key === "Enter") {
    handleInput("=");
    return;
  }
  else if(e.key === "Backspace") {
    handleInput("DEL");
    return;
  }
  else if(e.key === "Escape") {
    handleInput("C");
    return;
  }
  updateDisplay();
});

updateDisplay();
