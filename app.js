class Calculator {
    constructor(prevOpTextElement, currOpTextElement) {
        this.prevOpTextElement = prevOpTextElement
        this.currOpTextElement = currOpTextElement
        this.clear()
    }

    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand += number.toString()
    }

    chooseOperation(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    compute() {
        let result
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)

        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '/':
                result = prev / curr
                break
            default:
                return
        }
        this.currOperand = result
        this.operation = undefined
        this.prevOperand = ''
    }
    getDisplayNumber(num) {
        const stringNum = num.toString()
        const intDigits = parseFloat(stringNum.split('.')[0])
        const decDigits = stringNum.split('.')[1]

        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decDigits != null) {
            return `${intDisplay}.${decDigits}`
        }
        return intDisplay
    }

    updateDisplay() {
        this.currOpTextElement.innerText = this.getDisplayNumber(this.currOperand)
        if(this.operation != null) {
            this.prevOpTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOpTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOpTextElement = document.querySelector('[data-prev-operand]')
const currOpTextElement = document.querySelector('[data-curr-operand]')

const calculator = new Calculator(prevOpTextElement, currOpTextElement)

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
});

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
});

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', btn => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', btn => {
    calculator.delete()
    calculator.updateDisplay()
})