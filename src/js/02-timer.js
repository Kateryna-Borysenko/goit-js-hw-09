import flatpickr from 'flatpickr'; // импорт самой библиотеки
import 'flatpickr/dist/flatpickr.min.css'; //стили библиотеки
import Notiflix from 'notiflix';

const options = { //настройка
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
    },
};

flatpickr('#datetime-picker', options); //инициализировала календарь в input

const refs = {
    date: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
};

class Timer {
    constructor() {
        this.intervalId = null;
        this.diff = 0;
    }

    start() {

        if (new Date(refs.date.value).getTime() < Date.now() ){
 
            Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }

        refs.startBtn.setAttribute('disabled', true);

        this.intervalId = setInterval(() => {
            //написать остановку таймера 
            const currentTime = Date.now(); 
            const futureTime = new Date(refs.date.value).getTime();

            const diff = futureTime - currentTime; //разница 

            if (diff < 0) {
                clearInterval(this.intervalId);
                Notiflix.Notify.success('Time is over.');
                return;
            }

            //Для подсчета значений используй готовую функцию convertMs (stuck overf)
            const convartDate = this.convertMs(diff);
            console.log("~ convartDate", convartDate);
            this.updateClockface(convartDate);

        }, 1000)
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    //ms - разница между конечной и текущей датой в миллисекундах
    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.pad(Math.floor(ms / day));
        // Remaining hours
        const hours = this.pad(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    //Вывожу интерфейс clock face -> циферблат
    updateClockface({ days, hours, minutes, seconds }) {
        refs.days.textContent = `${days}`
        refs.hours.textContent = `${hours}`
        refs.minutes.textContent = `${minutes}`
        refs.seconds.textContent = `${seconds}`
    }
}

const timer = new Timer();

refs.startBtn.addEventListener('click', timer.start.bind(timer));

















