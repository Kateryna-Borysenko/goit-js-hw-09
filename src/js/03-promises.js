import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector("input[name='delay']"),
  step: document.querySelector("input[name='step']"),
  amount: document.querySelector("input[name='amount']"),
  btn: document.querySelector('button')
}

// refs.form.addEventListener('submit', createPromise)
// console.log(refs.delay.value)
// console.log(refs.step.value)
// console.log(refs.amount.value)

refs.form.addEventListener('submit', createPromise);


function createPromise() {
    
  for (let i = 1; i <= refs.amount.value; i += 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log(i);

        const shouldResolve = Math.random() > 0.3;
        
        if (shouldResolve) {
          // Fulfill
          resolve({ position: i,  delay: refs.step.value})
        } else {
          // Reject
          reject({ position: i, delay: refs.step.value });
        }
        
      }, Number(refs.firstDelay.value))
      
    })
  }
}


createPromise(2, 1500)
  .then(({ position, delay }) => {
    
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch(({ position, delay }) => {
   
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });