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
