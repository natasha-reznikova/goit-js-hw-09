import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from "flatpickr";


const btnStart = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker')
const dataDays = document.querySelector('[data-days]')
const dataHours = document.querySelector('[data-hours]')
const dataMinutes = document.querySelector('[data-minutes]')
const dataSeconds = document.querySelector('[data-seconds]')

console.log(datetimePicker);
console.log(btnStart)

let intervalId = '';
const delay = 1000;

const  options  =  { 
  enableTime : true , 
  time_24hr : true , 
  defaultDate : new  Date ( ) , 
  minuteIncrement : 1 , 
    onClose(selectedDates) {
        const dateNow = new Date();
        if (dateNow.getTime() <= selectedDates[0].getTime()) {
            btnStart.removeAttribute('disabled');
            console.log(selectedDates[0]);
        }
        else {
            btnStart.setAttribute('disabled', 'disabled')
            alert("Please choose a date in the future");
    } ;
  } , 
};


const timerFlatpickr = flatpickr(datetimePicker, options);


btnStart.addEventListener('click', onStart)

function onStart() {
    const selectedDate = timerFlatpickr.selectedDates[0];
    if (selectedDate <= Date.now()) {
    }
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedDate - currentTime;
           if ((deltaTime-delay) < 0) {
         clearInterval(intervalId)   
        }
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updateTime({ days, hours, minutes, seconds });
        }, delay);
        btnStart.setAttribute('disabled', 'disabled');
        datetimePicker.setAttribute('disabled', 'disabled');
        };
   
function updateTime({days, hours, minutes, seconds}) {
    dataDays.textContent = (`${days}`).padStart(2, '0');
    dataHours.textContent = (`${hours}`).padStart(2, '0');
    dataMinutes.textContent =(`${minutes}`).padStart(2, '0');
    dataSeconds.textContent =(`${seconds}`).padStart(2, '0');
}




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
