
const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector("body")
};

let intervalId = null;

//слушатели событий
refs.startBtn.addEventListener('click', onStartChangeBgColor);
refs.stopBtn.addEventListener('click', onStopChangeBgColor);

//ф-ция генерации случайного цвета
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//обработчики событий
function onStartChangeBgColor() {

   intervalId = setInterval(() => {
        const color = getRandomHexColor();
       refs.body.style.backgroundColor = color;
         //element.setAttribute(name, value);
       refs.startBtn.setAttribute('disabled', true);
       refs.stopBtn.removeAttribute('disabled');
    }, 1000)
}

function onStopChangeBgColor() {

    clearInterval(intervalId);
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', true);   
}





