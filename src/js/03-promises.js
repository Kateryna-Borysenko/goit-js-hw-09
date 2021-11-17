import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector("input[name='delay']"),
  step: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
  btn: document.querySelector('button'),
};

refs.form.addEventListener('submit', updateTime); 

function updateTime(e) {
  e.preventDefault();

  const amount = +refs.amount.value;  //значиния полей
  console.log("~ amount", amount)
  const step = +refs.step.value;
  console.log("~ step", step)

  let firstDelay = +refs.firstDelay.value;
  console.log("~ firstDelay", firstDelay)

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, firstDelay) //на вход получит значения position, delay
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const shouldResolve = Math.random() > 0.3; //вероятность 

      if (shouldResolve) {
        
        resolve({ position, delay });
      } else {
       
        reject({ position, delay });
      }
    }, delay);
  });
}