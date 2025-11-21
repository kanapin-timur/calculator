let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

const screen = document.querySelector('.calc-screen p');
const clear = document.querySelector('.ac');
const buttons = document.querySelector('.buttons');

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  screen.textContent = 0;
}

clear.addEventListener('click', clearAll);

buttons.addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn')) return;
  if (event.target.classList.contains('ac')) return;

  screen.textContent = '';

  const key = event.target.textContent;

  if (digit.includes(key)) {
    if (b === '' && sign === '') {
      a += key;
      screen.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      screen.textContent = b;
    } else {
      b += key;
      screen.textContent = b;
    }
    return;
  }

  if (action.includes(key)) {
    sign = key;
    screen.textContent = sign;
  }

  if (key === '=') {
    if (b === '') b = a;
    switch (sign) {
      case '+':
        a = +a + +b;
        break;
      case '-':
        a = a - b;
        break;
      case 'X':
        a = a * b;
        break;
      case '/':
        if (b === '0') {
          screen.textContent = 'Ошибка';
          a = '';
          b = '';
          sign = '';
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    screen.textContent = a;
  }
});
