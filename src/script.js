let startTime;
let expectedEndTime;

let isWorkSession = true;
let timerDuration = 25 * 60; 
let totalSession = 0
let resetFlag = false;

const timerDisplay = document.getElementById('timer-display');
const totalSessionDisplay=document.getElementById('total-session-display')

const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const shortBreakBtn = document.getElementById('short-break-btn')
const showTimeBtn = document.getElementById('show-time-btn')

const resetSound = new Audio('music/ding.mp3');
const startSound = new Audio('music/startding.mp3')
const breakSound = new Audio ('music/breakding.mp3')
const finishSound = new Audio ('music/finishline.mp3')


let timer = null;


function updateDisplay(timeInSeconds, display) {
    const minutes = Math.floor(Math.max(0, timeInSeconds) / 60);
    const seconds = Math.max(0, timeInSeconds) % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    display.textContent = formattedTime;
    if (display==totalSessionDisplay){
        display.textContent="Total Sessions: " + totalSession;
    }
    
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
        resetFlag=false;
        if (!startTime) {
            startTime = Date.now();
            expectedEndTime = startTime + timerDuration * 1000;
        }
        timer = setInterval(() => {
            const now = Date.now();
            const remaining = Math.round((expectedEndTime - now) / 1000);

            if (remaining <= 0) {
                resetFlag=true;
                clearInterval(timer);
                timer = null;
                startPauseBtn.textContent = 'Start';
                finishSound.play();
                if (isWorkSession && resetFlag==true) {
                    totalSession += 1;
                }
                isWorkSession = !isWorkSession;
                startTime = undefined; 
            }
            timerDuration = remaining;
            
            updateDisplay(totalSession, totalSessionDisplay);
            updateDisplay(timerDuration, timerDisplay);
            
        }, 1000);
    }
}


function resetTimer() {
    resetSound.play();
    clearInterval(timer);
    timer = null;
    startTime = undefined; 
    isWorkSession = true;
    resetFlag = true;
    timerDuration = 25 * 60; // Reset to 25 minutes
    updateDisplay(timerDuration, timerDisplay);
    updateDisplay(totalSession, totalSessionDisplay);
    startPauseBtn.textContent = 'Start';
}

function shortBreakTimer() {
    breakSound.play();
    clearInterval(timer);
    timer = null;
    startTime = undefined; // Clear the startTime for new session
    isWorkSession = false;
    timerDuration = 5 * 60; // Set for short break
    updateDisplay(timerDuration, timerDisplay);
    shortBreakBtn.textContent = 'Short Break';
}


function showtotalSession(){
    if (totalSessionDisplay.style.display === 'none') {
        // If the time is hidden, show it
        totalSessionDisplay.style.display = 'block';
        this.textContent = 'Hide Total Sessions'; 
    } else {
        // If the time is shown, hide it
        totalSessionDisplay.style.display = 'none';
        this.textContent = 'Show Total Sessions'; 
    }
}


showTimeBtn.addEventListener('click',showtotalSession)
startPauseBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
shortBreakBtn.addEventListener('click',shortBreakTimer);

// Initialize display
updateDisplay(timerDuration,timerDisplay);
updateDisplay(totalSession,totalSessionDisplay);
