import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'right-bottom',
  borderRadius: '22px',
  width: '480px',
  fontSize: '28px',
  distance: '15px',
  opacity: 0.5,
  success: {
    notiflixIconColor: 'rgba(0,0,0,0.983)',
    background: '#056923',
  },
  failure: {
    notiflixIconColor: 'rgba(0,0,0,0.983)',
    background: '#f91909',
  },
  info: {
    notiflixIconColor: 'rgba(0,0,0,0.983)',
    background: '#014c84',
  },
});

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const daysLeft = document.querySelector('span[data-days]');
const hoursLeft = document.querySelector('span[data-hours]');
const minutesLeft = document.querySelector('span[data-minutes]');
const secondsLeft = document.querySelector('span[data-seconds]');

let timeNow = new Date().getTime();
let timeChosen = 0;
let timeDiff = 0;
let timerId = null;

console.log('timeNow', timeNow);

btnStart.disabled = true;
btnStop.disabled = true;

const checkChosenDate = timeChosen => {
  if (timeDiff <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    console.log('checkChosenDate if timeChosen: 0:', timeChosen);
    console.log('timeChosen[0]: undefined:', timeChosen[0]);
    console.log('timeNow', timeNow);
    console.log('timeDiff', timeDiff);
  } else {
    Notiflix.Notify.info('Now you can click "Start"');
    btnStart.disabled = false;

    console.log('checkChosenDate else timeChosen', timeChosen);
    console.log('timeChosen[0]', timeChosen[0]);
    console.log('timeNow', timeNow);
    console.log('timeDiff', timeDiff);
  }
};

const updateTimer = ({ days, hours, minutes, seconds }) => {
  daysLeft.innerHTML = addLeadingZero(days);
  hoursLeft.innerHTML = addLeadingZero(hours);
  minutesLeft.innerHTML = addLeadingZero(minutes);
  secondsLeft.innerHTML = addLeadingZero(seconds);
};

const clearTimer = () => {
  console.log('stopCountdown timerId', timerId);
  timeDiff = 0;
  daysLeft.innerHTML = '00';
  hoursLeft.innerHTML = '00';
  minutesLeft.innerHTML = '00';
  secondsLeft.innerHTML = '00';
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

const startCountdown = () => {
  timerId = setInterval(() => {
    timeDiff -= 1000;
    if (timeDiff < 1000) {
      Notiflix.Report.success('the end!', 'You know nothing', 'Close');
      stopCountdown();
    } else {
      updateTimer(convertMs(timeDiff));
    }
  }, 1000);
  console.log('timerId', timerId);
  console.log('btnStart.addEventListener timeChosen[0]', timeChosen[0]);
  console.log('btnStart.addEventListener timeDiff', timeDiff);

  btnStop.disabled = false;
  btnStart.disabled = true;
};

const stopCountdown = () => {
  console.log('btnStop.addEventListener timeChosen[0]', timeChosen[0]);
  clearTimer();
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  weekNumbers: true,
  onClose(timeChosen) {
    console.log('onClose timeChosen[0] wybrano (string):', timeChosen[0]);
    console.log('onClose timeChosen wybrano (obiekt):', timeChosen);
    timeDiff = timeChosen[0] - timeNow;
    console.log('onClose roznica w ms timeDiff:', timeDiff);
    console.log('onClose convertMs(timeDiff)', convertMs(timeDiff));
    checkChosenDate(timeChosen);
  },
};

flatpickr('#date-selector', options);

btnStart.addEventListener('click', startCountdown);
btnStop.addEventListener('click', stopCountdown);
