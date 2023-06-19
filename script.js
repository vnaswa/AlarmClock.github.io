const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const AmPm = document.querySelector('#ampm');
const setAlarmBtn = document.querySelector('#setBtn');
const content = document.querySelector('#content');
const ringTone = new Audio('files/ringtone.mp3');
const secondBtn = document.querySelector('#secondBtn');
const body = document.querySelector('body');
const resumeBtn = document.querySelector('#resumeBtn');
const welcomeBackScreen = document.querySelector('#welcomeBack');
const alarmTimeIndicator = document.querySelector('#alarmText');
let CurrentTime = document.querySelector('#currentTime');

if (!localStorage.getItem('userExited')) {
    localStorage.setItem('userExited', 'false');
} else {
    // Check if user has returned to webpage and had previously set an alarm then show him resume button
    if (localStorage.getItem('userExited') == 'true' && localStorage.getItem('isAlarmSet') == 'true') {
        welcomeBackScreen.className = 'welcomeBack flex';
    }
}


if (!localStorage.getItem('wantToPlay')) {
    localStorage.setItem('wantToPlay', 'no');
}


if (localStorage.getItem('alarmTime') == "00:00:AM")
    alarmTimeIndicator.className = "d-none";


if (!localStorage.getItem('contentClass')) {
    localStorage.setItem('contentClass', 'content flex');
    content.className = localStorage.getItem('contentClass');
} else {
    content.className = localStorage.getItem('contentClass');
}


if (!localStorage.getItem('btnText')) {
    localStorage.setItem('btnText', 'Set Alarm');
    setAlarmBtn.textContent = localStorage.getItem('btnText');
} else {
    setAlarmBtn.textContent = localStorage.getItem('btnText');
}


if (!localStorage.getItem('isAlarmSet')) {
    localStorage.setItem('isAlarmSet', 'false');
}


if (!localStorage.getItem('alarmTime')) {
    localStorage.setItem('alarmTime', '00:00:PM');
}


for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">${i}</option>`;
    hour.firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">${i}</option>`;
    minute.firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let am_pm = i == 1 ? "AM" : "PM";
    let option = `<option value="${am_pm}">${am_pm}</option>`;
    AmPm.firstElementChild.insertAdjacentHTML("afterend", option);
}



const playAlarm = () => {
    if ((localStorage.getItem('userExited') == 'xxx') || (localStorage.getItem('wantToPlay' == 'yes'))) {
        ringTone.play();
    }
    // console.log(localStorage.getItem('userExited'));
    ringTone.loop = true;
}

setInterval(() => {
    let date = new Date();
    // var h = ((date.getHours() - 12));
    let h = date.getHours(); 
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

   
    if (h > 11) {
    h = h - 12;
    // ampm = (date.getHours()) < 12 ? 'AM' : 'PM';
    ampm = 'PM'
    }

    
    h = h == 0 ? h = 12 : h;
    // Adding 0 before h , m ,s 
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    
    currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

    
    if ((localStorage.getItem('alarmTime') == `${h}:${m}:${ampm}`) || (localStorage.getItem('wantToPlay') == 'yes')) {
        playAlarm();
    }
}, 1000);



 
const setAlarm = () => {


    if (localStorage.getItem('isAlarmSet') == 'true') {
        
        localStorage.setItem('alarmTime', "00:00:AM");
        ringTone.pause();
        
        localStorage.setItem('contentClass', 'content flex')
        content.className = localStorage.getItem('contentClass');
        
        localStorage.setItem('btnText', 'Set Alarm')
        setAlarmBtn.textContent = localStorage.getItem('btnText');
        
        resumeBtn.hidden = true
        
        alarmTimeIndicator.textContent = "Alarm Time set to: ";
        alarmTimeIndicator.className = "d-none";
        
        localStorage.setItem('wantToPlay', 'no')
        
        return localStorage.setItem('isAlarmSet', 'false');
    }

    
    let time = `${hour.value}:${minute.value}:${AmPm.value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        alert("Please select a valid time");
        return;
    }

    
    localStorage.setItem('isAlarmSet', 'true');
    
    localStorage.setItem('alarmTime', time);
    
    localStorage.setItem('contentClass', 'content flex disable');
    content.className = localStorage.getItem('contentClass');
    
    localStorage.setItem('btnText', 'Clear Alarm')
    setAlarmBtn.textContent = localStorage.getItem('btnText');
    
    alarmTimeIndicator.textContent = "Alarm Time set to: " + localStorage.getItem('alarmTime');
    alarmTimeIndicator.className = "";
    
    localStorage.setItem('userExited', 'xxx');
}




const hideWelcomeScreen = () => {
    
    welcomeBackScreen.className = 'd-none';
    
    alarmTimeIndicator.textContent = "Alarm Time set to: " + localStorage.getItem('alarmTime');
    
    localStorage.setItem('userExited', 'xxx');
    
    localStorage.setItem('wantToPlay', 'yes');
}

setAlarmBtn.addEventListener('click', setAlarm);

resumeBtn.addEventListener('click', hideWelcomeScreen);


const beforeUnloadListener = (event) => {
    localStorage.setItem('userExited', 'true');
};
window.addEventListener("beforeunload", beforeUnloadListener);
