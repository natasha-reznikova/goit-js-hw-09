import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");

form.addEventListener("submit", evt => {
  
  evt.preventDefault();
  
const { delay, step, amount } = evt.currentTarget;
   let firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountPromises = Number(amount.value);
  for (let i = 1;  i <= amountPromises; i++) {
    
    createPromise(i, firstDelay);

    console.log('delay', firstDelay, 'position', i);
    firstDelay += stepDelay;
    form.reset()  };

});
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {

      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      };
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
}
