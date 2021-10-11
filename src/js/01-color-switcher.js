const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStop.disabled = true;

let timerId = null;

btnStart.addEventListener('click', () => {
  timerId = setInterval(changeBgColor, 1000);
  btnStop.disabled = false;
  btnStart.disabled = true;
});

btnStop.addEventListener('click', () => {
  clearTimeout(timerId);
  btnStop.disabled = true;
  btnStart.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeBgColor = () => {
  body.style.backgroundColor = getRandomHexColor();
};
