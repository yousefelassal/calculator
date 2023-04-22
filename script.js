// const buttons = document.querySelectorAll('.button');
// let screenOutput = document.querySelector('.screen__output');

// let add = (a, b) => a + b;
// let subtract = (a, b) => a - b;
// let multiply = (a, b) => a * b;
// let divide = (a, b) =>{
//     if(b == 0){
//         return 80085;
//     } else {
//         let ans = a / b;
//         return Math.round(ans *1000)/1000;
//     }
// };

// let percent = (a) => a / 100;
// let negate = (a) => a * -1;

// let operate = (operator, a, b) => {
//     switch(operator){
//         case '+':
//             return add(a, b);
//         case '-':
//             return subtract(a, b);
//         case '*':
//             return multiply(a, b);
//         case '/':
//             return divide(a, b);
//     }
// }

// let convert = (convertor, a) => {
//     switch(convertor){
//         case '%':
//             return percent(a);
//         case '+/-':
//             return negate(a);
//     }
// }

// let previousValue = 0;
// let currentValue = 0;
// let operator = '';

// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         let type = button.dataset.type;
//         let value = button.dataset.value;
//         if(type == 'number'){
//             if(screenOutput.textContent == '0'){
//                 screenOutput.textContent = value;
//             } else {
//                 screenOutput.textContent += value;
//             }
//         } else if(type == 'operator'){
//             if(operator == ''){
//                 previousValue = Number(screenOutput.textContent);
//                 operator = value;
//                 screenOutput.textContent = previousValue;
//             } else {
//                 currentValue = Number(screenOutput.textContent);
//                 previousValue = operate(operator, previousValue, currentValue);
//                 operator = value;
//                 screenOutput.textContent = previousValue;
//             }
//         } else if(type == 'convertor'){
//             currentValue = Number(screenOutput.textContent);
//             currentValue = convert(value, currentValue);
//             screenOutput.textContent = currentValue;
//         } else if(type == '='){
//             currentValue = Number(screenOutput.textContent);
//             screenOutput.textContent = operate(operator, previousValue, currentValue);
//             operator = '';
//             previousValue = 0;
//             currentValue = 0;
//         } else if(type == 'clear'){
//             screenOutput.textContent = '0';
//             previousValue = 0;
//             currentValue = 0;
//             operator = '';
//         }
//     })
// });

let displayValue = '0';
let firstOperand = '';
let secondOperand = '';
let firstOperator = '';
let secondOperator = '';
let result = '';
const buttons = document.querySelectorAll('.button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 15) {
        display.innerText = displayValue.substring(0, 15);
    }
}
  
updateDisplay();

// function clickButton() {
//     for(let i = 0; i < buttons.length; i++) {
//         let type = buttons[i].dataset.type;
//         let value = buttons[i].dataset.value;
//         buttons[i].addEventListener('click', function() {
//             if(type == 'number') {
//                 inputOperand(value);
//                 updateDisplay();
//             } else if(type == 'operator') {
//                 inputOperator(value);
//             } else if(type == 'equals') {
//                 inputEquals();
//                 updateDisplay();
//                 console.log(updateDisplay());
//             } else if(type == 'decimal') {
//                 inputDecimal(value);
//                 updateDisplay();
//             } else if(type == 'percent') {
//                 inputPercent(displayValue);
//                 updateDisplay();
//             } else if(type == 'sign') {
//                 inputSign(displayValue);
//                 updateDisplay();
//             } else if(type == 'clear') {
//                 clearDisplay();
//                 updateDisplay();
//             }
//         })
//     }
// }

// clickButton();

buttons.forEach(button => {
    let type = button.dataset.type;
    let value = button.dataset.value;
    button.addEventListener('click', () => {
        if(type == 'number') {
            inputOperand(value);
            updateDisplay();
        } else if(type == 'operator') {
            inputOperator(value);
        } else if(type == 'equals') {
            inputEquals();
            updateDisplay();
        } else if(type == 'decimal') {
            inputDecimal(value);
            updateDisplay();
        } else if(type == 'percent') {
            inputPercent(displayValue);
            updateDisplay();
        } else if(type == 'sign') {
            inputSign(displayValue);
            updateDisplay();
        } else if(type == 'clear') {
            clearDisplay();
            updateDisplay();
        }
    })
});

function inputOperand(operand) {
    if(firstOperator == '') {
        if(displayValue == '0') {
            //1st click - handles first operand input
            displayValue = operand;
        } else if(displayValue == firstOperand) {
            //starts new operation after inputEquals()
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        //3rd/5th click - inputs to secondOperand
        if(displayValue == firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != '' && secondOperator == '') {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        console.log(displayValue);
        firstOperand = displayValue;
        result = '';
        updateDisplay();
    } else if(firstOperator != '' && secondOperator != '') {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = '';
        updateDisplay();
    } else { 
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    //hitting equals doesn't display undefined before operate()
    if(firstOperator == '') {
        displayValue = displayValue;
    } else if(secondOperator != '') {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        console.log(result);
        if(result == '80085') {
            displayValue = '80085';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = '';
            firstOperator = '';
            secondOperator = '';
            result = '';
        }
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result == '80085') {
            displayValue = '80085';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = '';
            firstOperator = '';
            secondOperator = '';
            result = '';
        }
    }
}

function inputDecimal(dot) {
    if(displayValue == firstOperand || displayValue == secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = '';
    secondOperand = '';
    firstOperator = '';
    secondOperator = '';
    result = '';
}

function inputBackspace() {
    if(firstOperand != '') {
        firstOperand = '';
        updateDisplay();
    }
}

function operate(x, y, op) {
    if(op == '+') {
        console.log(x + y);
        return x + y;
    } else if(op == '-') {
        return x - y;
    } else if(op == '*') {
        return x * y;
    } else if(op == '/') {
        if(y == 0) {
            return '80085';
        } else {
        return x / y;
        }
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}