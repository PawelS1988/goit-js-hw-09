import Notiflix from 'notiflix';

Notiflix.Notify.init({
  rtl: true,
  position: 'right-bottom',
  borderRadius: '30px',
  width: '400px',
  fontSize: '20px',
  distance: '15px',
  cssAnimationDuration: '8000',
});

const btnSubmit = document.querySelector('button[type="submit"]');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

const createMultiplePromises = e => {
  e.preventDefault();

  let delay = Number(inputDelay.value);
  let step = Number(inputStep.value);
  let amount = Number(inputAmount.value);

  for (let position = 1; position <= amount; position++) {
    console.log('position', position);
    console.log('delay', delay);
    console.log('amount', amount);
    console.log('step', step);
    console.log('****');
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
};

btnSubmit.addEventListener('click', createMultiplePromises);
