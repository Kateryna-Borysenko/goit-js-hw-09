
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

//вынесла повторение кода в отдельную ф-цию
function changeAttr(objAddAttr, objRemoveAttr) {
    
    //info -> element.setAttribute(name, value);
    objAddAttr.setAttribute('disabled', true);
    objRemoveAttr.removeAttribute('disabled');
}

//обработчики событий
function onStartChangeBgColor() {

    intervalId = setInterval(() => {
        const color = getRandomHexColor();
        refs.body.style.backgroundColor = color;
        changeAttr(refs.startBtn, refs.stopBtn)
    }, 1000)
}

function onStopChangeBgColor() {

    clearInterval(intervalId);
    changeAttr(refs.stopBtn, refs.startBtn);
}





