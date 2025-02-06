// cronometro-temporizador.js

// Cronômetro
let timerInterval;
let running = false;
let seconds = 0, minutes = 0, hours = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);

function startStop() {
    if (running) {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Iniciar';
    } else {
        timerInterval = setInterval(updateTimer, 1000);
        startStopButton.textContent = 'Pausar';
    }
    running = !running;
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Iniciar';
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Temporizador

let countdownInterval;
let countdownRunning = false;
let countdownSeconds, countdownMinutes, countdownHours;

const countdownDisplay = document.getElementById('countdownDisplay');
const startCountdownButton = document.getElementById('startCountdown');
const resetCountdownButton = document.getElementById('resetCountdown');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

startCountdownButton.addEventListener('click', startCountdown);
resetCountdownButton.addEventListener('click', resetCountdown);

function startCountdown() {
    countdownHours = parseInt(hoursInput.value) || 0;
    countdownMinutes = parseInt(minutesInput.value) || 0;
    countdownSeconds = parseInt(secondsInput.value) || 0;

	//Validacao dos campos
	 if (countdownHours < 0 || countdownMinutes < 0 || countdownSeconds < 0) {
        alert("Por favor, insira valores positivos para o temporizador.");
        return; 
    }

      if (countdownHours === 0 && countdownMinutes === 0 && countdownSeconds === 0) {
        alert("Por favor, defina um tempo para o temporizador.");
        return; 
    }

    if (countdownRunning) {
        return;
    }

    updateCountdownDisplay();
    countdownInterval = setInterval(updateCountdown, 1000);
    countdownRunning = true;
    startCountdownButton.textContent = 'Pausar';
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    startCountdownButton.textContent = 'Iniciar';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    countdownDisplay.textContent = '00:00:00';
}

function updateCountdown() {
    if (countdownSeconds > 0) {
        countdownSeconds--;
    } else {
        if (countdownMinutes > 0) {
            countdownMinutes--;
            countdownSeconds = 59;
        } else {
            if (countdownHours > 0) {
                countdownHours--;
                countdownMinutes = 59;
                countdownSeconds = 59;
            } else {
                clearInterval(countdownInterval);
                countdownRunning = false;
                startCountdownButton.textContent = 'Iniciar';
                alert('TEMPO ESGOTADO!');
                return;
            }
        }
    }

    updateCountdownDisplay();
}

function updateCountdownDisplay() {
    const formattedHours = String(countdownHours).padStart(2, '0');
    const formattedMinutes = String(countdownMinutes).padStart(2, '0');
    const formattedSeconds = String(countdownSeconds).padStart(2, '0');

    countdownDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})