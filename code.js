function operate(a, op, b) {
    return op(a, b);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}


const screen = document.querySelector("#calc-screen");
const clearBtn = document.querySelector(".clear");
const components = document.getElementsByClassName("component");

let calcVal = 0;

// events
for(let i = 0; i < components.length; i++) {
    components[i].addEventListener("click", populateScreen);
}
function populateScreen(event) {
    // removes initial 0
    if(screen.innerHTML === '0') {
        screen.innerHTML = '';
    }
    // appends to screen text: current event target's text
    screen.innerHTML += event.currentTarget.innerHTML;
}

clearBtn.addEventListener("click", clearScreen);
function clearScreen() {
    screen.innerHTML = '0';
}

