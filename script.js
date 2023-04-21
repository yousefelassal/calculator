const buttons = document.querySelectorAll('.button');
let screenCurrent = document.querySelector('.screen__output--current');
let screenPrevious = document.querySelector('.screen__output--previous');

// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         console.log('Button clicked');
//         console.log(screenCurrent);
//         // screenCurrent.textContent = button.textContent;

//     });
// });

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) =>{
    if(b === 0){
        return 80085;
    } else {
        return a / b;
    }
};

let operate = (operator, a, b) => {
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

let previousValue = 0;
let currentValue = 0;
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.dataset.type === 'number'){
            if(screenCurrent.textContent === '0'){
                screenCurrent.textContent = button.dataset.value;
            } else {
                screenCurrent.textContent += button.dataset.value;
            }
        } else if(button.dataset.type === 'operator'){
            operator = button.dataset.value;
            previousValue = Number(screenCurrent.textContent);
            screenPrevious.textContent = `${previousValue} ${operator}`;
            screenCurrent.textContent = '0';
        } else if(button.dataset.type === 'equal'){
            currentValue = Number(screenCurrent.textContent);
            screenCurrent.textContent = operate(operator, previousValue, currentValue);
            screenPrevious.textContent = '';
        } else if(button.dataset.type === 'clear'){
            screenCurrent.textContent = '0';
            screenPrevious.textContent = '';
        }
    });
});