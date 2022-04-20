const btnPlayPause = document.querySelector('#play-pause-btn');
const btnStop = document.querySelector('#stop-btn');
const btnRecord = document.querySelector('#record-btn');
const timer = document.querySelector('#timer');
const ol = document.querySelector('#tour');

let state = 0;
let intervalID;

const date = {
    offsetTime: 0,
    lastRecord: 0,
};

function getTime() {
    return (Date.now() - (date.startDate - date.offsetTime));
}

function toggleState()
{
    if (state === 0) {
        btnStop.removeAttribute('disabled');
        btnRecord.removeAttribute('disabled');
        btnPlayPause.textContent = "⏸️";
        state = 1;
    }
    else {
        btnStop.setAttribute('disabled', true);
        btnRecord.setAttribute('disabled', true);
        btnPlayPause.textContent = "▶";
        state = 0;
    }
}

function startTime(){
    date.startDate = Date.now();
    intervalID = setInterval(displayTime, 1000);
}

function displayTime(){
    timer.textContent = formatTime(getTime());
}

function formatTime(milliSeconds){
    let date = new Date(0);
    date.setMilliseconds(milliSeconds);
    return (date.toISOString().substring(11, 19));
}
function playPause(event) {
    if (state === 0) {
        startTime()
    }
    else {
        clearInterval(intervalID);
        displayTime()
        date.offsetTime = getTime();
    }
    toggleState();
}

function deleteChild(element) {
    let elem = document.querySelector(element);
    
    let child = elem.lastChild;
    while(child) {
        elem.removeChild(child);
        child = elem.lastChild;
    }
}

function stop(event) {
    if (intervalID) {
        toggleState()
        clearInterval(intervalID);
        intervalID = null;
        timer.textContent = formatTime(0);  
        deleteChild('ol');
        date.lastRecord = 0;
        date.offsetTime = 0;
    }
}
function record(event) {
    let newli = document.createElement('li');
    let rec = getTime()
    if (date.lastRecord)
        newli.textContent = formatTime(rec - date.lastRecord);
    else 
        newli.textContent = formatTime(rec);
    date.lastRecord = rec;
    ol.appendChild(newli);
}
btnPlayPause.addEventListener('click', playPause);
btnStop.addEventListener('click', stop);
btnRecord.addEventListener('click', record);