class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.operations = [];
        this.numbers = [];
        this.currentNumber = [];
    }

    clear() {
        this.currentOperandTextElement.innerText = '0';
        this.previousOperandTextElement.innerText = '';
        this.numbers = [];
        this.operations = [];
        this.currentNumber = [];
    }

    delete() {
        if (this.numbers[this.numbers.length - 1] !== ' ') {
            this.numbers.pop();
            if (this.currentNumber != []) {
                this.currentNumber.pop();
            }
            this.currentOperandTextElement.innerText = this.currentOperandTextElement.innerText.toString().slice(0, -1);
        } else {
            this.operations.pop();
            this.currentOperandTextElement.innerText = this.currentOperandTextElement.innerText.toString().slice(0, -1);
        }
        if (this.currentOperandTextElement.innerText === '') {
            this.currentOperandTextElement.innerText = '0';
        }
    }

    appendNumber(number) {

        if (this.numbers[this.numbers.length - 1] !== '' && this.currentNumber[0] !== '0' && !(number == '.' && this.currentNumber.includes('.'))) {
            this.numbers.push(number);
            this.currentNumber.push(number);
            if (this.currentOperandTextElement.innerText === '0') {
                this.currentOperandTextElement.innerText = ''
            }
            this.currentOperandTextElement.innerText += this.numbers[this.numbers.length - 1];
        }
    }

    chooseOperation(operation) {
        if (this.numbers[this.numbers.length - 1] !== '') {
            this.numbers.push(' ');
            this.currentNumber = [];
            console.log("antes", this.operations);
            if ((this.numbers[this.numbers.length - 1] === this.numbers[this.numbers.length - 2]) && operation == this.operations[this.operations.length - 1]) {
                this.operations[this.operations.length - 1] = operation
                this.numbers.pop();
                console.log("reemplazar", this.operations);
                
            } else {
                this.operations.push(operation);
                console.log("agregar", this.operations);
            }
            console.log(this.operations);
            this.currentOperandTextElement.innerText += this.operations[this.operations.length - 1];
        }
    }

    compute() {
        if (this.numbers !== [] && this.operations !== []) {
            let computation = '';
            let splitNumbers = this.numbers.join('').split(' ');
            console.log(splitNumbers);
            let limit = splitNumbers.length - 1;
            for (let i = 0; i < limit; i++) {
    
                computation += splitNumbers.shift().toString();
                computation += this.operations.shift().toString();
                //console.log(computation);
                //}
            }
            computation += splitNumbers.pop().toString();
            //console.log(computation);
            this.previousOperandTextElement.innerText = computation;
            this.currentOperandTextElement.innerText = eval(computation);
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = '0';
    }
}

let numberButtons = document.querySelectorAll('[data-number]');
let operationButtons = document.querySelectorAll('[data-operation]');
let equalsButton = document.querySelector('[data-equals]');
let deleteButton = document.querySelector('[data-delete]');
let allClearButton = document.querySelector('[data-all-clear]');
let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    //calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    //calculator.updateDisplay();
})