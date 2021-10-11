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
