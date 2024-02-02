let isWorkSession = true;
let timerDuration = 25 * 60; 
let totalTime = 0

const timerDisplay = document.getElementById('timer-display');
const totalTimeDisplay=document.getElementById('total-time-display')

const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const shortBreakBtn = document.getElementById('short-break-btn')
const showTimeBtn = document.getElementById('show-time-btn')

const resetSound = new Audio('music/ding.mp3');
const startSound = new Audio('music/startding.mp3')
const breakSound = new Audio ('music/breakding.mp3')
const finishSound = new Audio ('music/finishline.mp3')


let timer = null;


function updateDisplay(timeInSeconds,display) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    display.textContent = formattedTime;
    document.title = formattedTime + " - Pomodoro Timer";
}

function toggleTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        startPauseBtn.textContent = 'Start';
    } else {
        startSound.play();
        startPauseBtn.textContent = 'Pause';
        timer = setInterval(() => {
            timerDuration--;
            if (isWorkSession){
                totalTime++;
            }
            updateDisplay(totalTime,totalTimeDisplay);
            updateDisplay(timerDuration,timerDisplay);
            

            if (timerDuration <= 0) {
                clearInterval(timer);
                timer = null;
                startPauseBtn.textContent = 'Start';
                finishSound.play();
            }
        }, 1000);
    }
}

function resetTimer() {
    resetSound.play();
    clearInterval(timer);
    timer = null;
    isWorkSession = true;
    timerDuration = 25 * 60; // Reset to 25 minutes
    updateDisplay(timerDuration,timerDisplay);
    startPauseBtn.textContent = 'Start';
}

function shortBreakTimer(){
    breakSound.play();
    clearInterval(timer);
    timer=null;
    isWorkSession = false;
    timerDuration = 5 * 60;
    updateDisplay(timerDuration,timerDisplay);
    shortBreakBtn.textContent = 'Short Break'

}

function showTotalTime(){
    if (totalTimeDisplay.style.display === 'none') {
        // If the time is hidden, show it
        totalTimeDisplay.style.display = 'block';
        this.textContent = 'Hide Total Time'; 
    } else {
        // If the time is shown, hide it
        totalTimeDisplay.style.display = 'none';
        this.textContent = 'Show Total Time'; 
    }
}


showTimeBtn.addEventListener('click',showTotalTime)
startPauseBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
shortBreakBtn.addEventListener('click',shortBreakTimer);

// Initialize display
updateDisplay(timerDuration,timerDisplay);
updateDisplay(totalTime,totalTimeDisplay);
