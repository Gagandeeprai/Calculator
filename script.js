const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let expression = '';
let openBrackets = 0;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.innerText.trim();

    if (value === 'AC') {
      expression = '';
      openBrackets = 0;
    } else if (value === 'DEL') {
      if (expression.length > 0) {
        const lastChar = expression.slice(-1);
        if (lastChar === '(') openBrackets--;
        else if (lastChar === ')') openBrackets++;
        expression = expression.slice(0, -1);
      }
    } else if (value === '=') {
      if (expression) {
        try {
          expression = new Function(`return ${expression}`)().toString();
          openBrackets = 0;
        } catch (error) {
          expression = 'Error';
          setTimeout(() => (expression = ''), 1500);
        }
      }
    } else if (value === '( )') {
      if (openBrackets === 0 || ![')', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(expression.slice(-1))) {
        expression += '(';
        openBrackets++;
      } else if (openBrackets > 0 && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ')'].includes(expression.slice(-1))) {
        expression += ')';
        openBrackets--;
      }
    } else {
      expression += value;
    }

    display.value = expression;
  });
});