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
        
        // new operation, need to set up first number (optional) and operation
        if(op === '' && opPressed !== '=') {
            // console.log("setting up first value (situation dependent) and operation");

            // may sometimes replace valA with the same value it already has
            valA = Number(screen.innerHTML);
            op = opPressed;
            numInput = false;
        }

        // first number and operation are known, second number is on screen but not in valB, need to perform current operation before putting in the new operation into op
        else if(valA !== -1 && op !== '') {
            // console.log("second number exists, calculating");

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
                    // rounds to the nearest thousandth's place
                    valA = Math.round(operate(valA, multiply, valB) * 1000) / 1000;
                    break;
                case "/":
                    if(valB == 0) {
                        alert("You disgust me with your arrogance. You think you are worthy enough to divide this mortal plane by zero? Laughable. In that case, let all return to zero.");
                        clearScreen();
                        return;
                    }
                    // rounds to the nearest thousandth's place
                    valA = Math.round(operate(valA, divide, valB) * 1000) / 1000;
                    break;
                default:
                    // shouldn't ever happen
                    console.log("op symbol not recognized: " + op);
                    break;
            }

            // put the calculated value on screen
            screen.innerHTML = valA;

            // update the operation
            if(opPressed !== '=') {
                op = opPressed;
                // ensures that user must put in another number before another operation is allowed
                numInput = false;
            }
            else {
                // next operation, treat it as if you're dealing with a first time calculation
                op = '';
                // equals operation just gave a number, next input can be an operation (doesn't have to be, can still input a number, which would forget the recently calculated result)
                numInput = true;
            }
            

            // reset valB for the next value
            valB = -1

        }

        // only triggers if you input '=' multiple times in a row
        else {
            // console.log("entered consecutive =");
        }

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

