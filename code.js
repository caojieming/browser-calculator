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
const components = document.querySelectorAll(".number,.operation");

let valA = -1;
let op = '';
let valB = -1;

// whether the current number on screen should be erased (after an operation) to make room for a new number
let valChange = true;
// ensures that after an operation, user must put in another number before another operation is allowed
let numInput = false;


// events
for(let i = 0; i < components.length; i++) {
    components[i].addEventListener("click", populateScreen);
}
function populateScreen(event) {
    const curElement = event.currentTarget;
    
    // removes initial 0
    // if(screen.innerHTML === '0') {
    //     screen.innerHTML = '';
    // }

    if(curElement.classList.contains('number')) {
        if(valChange) {
            screen.innerHTML = '';
            valChange = false;
        }
    
        screen.innerHTML += curElement.innerHTML;
        numInput = true;
    }
    
    if(curElement.classList.contains('operation') && numInput) {
        valChange = true;
        let opPressed = curElement.innerHTML;
        // first calculation, need to set up first number and operation
        if(valA === -1) {
            console.log("first calculation if entered");

            valA = Number(screen.innerHTML);
            op = opPressed;
        }
        // first number and operation are known, second number is on screen but not in valB, need to perform current operation before putting in the new operation into op
        else if(valB === -1) {
            console.log("second+ calculation if entered");

            // get valB from screen
            valB = Number(screen.innerHTML);

            // now calculate, storing result in valA (for later calculations)
            switch(op) {
                case "+":
                    valA = operate(valA, add, valB);
                    break;
                case "-":
                    valA = operate(valA, subtract, valB);
                    break;
                case "*":
                    valA = operate(valA, multiply, valB);
                    break;
                case "/":
                    valA = operate(valA, divide, valB);
                    break;
                default:
                    // equals sign, work on this logic later
                    console.log("op symbol not recognized: " + opPressed);
                    break;
            }

            // put the calculated value on screen
            screen.innerHTML = valA;

            // update the operation
            op = opPressed;

            // reset valB for the next value
            valB = -1

        }

        // ensures that user must put in another number before another operation is allowed
        numInput = false;
    }
    
    
}

clearBtn.addEventListener("click", clearScreen);
function clearScreen() {
    screen.innerHTML = '0';

    valA = -1;
    op = '';
    valB = -1;

    valChange = true;
    numInput = false;
}

