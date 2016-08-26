var switchButton = 0;
var timerPanel = document.getElementsByClassName('counter-main')[0];
var milisecPanel = document.getElementsByClassName('counter-branch')[0];
var hh = 0;
var mm = 0;
var ss = 0;
var ms = 0;
var timeNow = 0;
var timeStart = 0;
var timeDifference = 0;
var timePause = 0;


function switchStart() {//реакция на нажатие start
  if (switchButton == 0) {
    switchButton = 1;
    timeStart = Date.now();
    startTimer();
    document.getElementsByClassName('btn-success')[0].value = 'Pause';
  }
  else if (switchButton == 1) {
    switchButton = 2;
    timePause = Date.now();
    document.getElementsByClassName('btn-success')[0].value = 'Continue';
    clearTimeout(changeTime);
  }
  else {
    switchButton = 1;
    timeDifference = timeDifference + Date.now() - timePause;
    startTimer();
    document.getElementsByClassName('btn-success')[0].value = 'Pause';
  }
}

function clearStart() {//реакция на нажатие clear
  switchButton = 0;
  timePause = 0;
  timeDifference = 0;
  document.getElementsByClassName('btn-success')[0].value = 'Start';
  document.getElementsByClassName('counter-main')[0].innerHTML='00:00:00';
  document.getElementsByClassName('counter-branch')[0].innerHTML='0';
  clearTimeout(changeTime);
}

function startTimer() {//таймер
  if (switchButton == 1) {
    changeTime = setTimeout(
    function () {
      timeNow = Date.now() - timeStart - timeDifference;
      ms = timeNow % 1000;
      milisecPanel.innerHTML = ms;
      timeNow = (timeNow - ms) / 1000; // время в секундах
      ss = timeNow % 60 ;
      timeNow = (timeNow - ss) / 60;  // время в минутах
      mm = timeNow % 60;
      hh = (timeNow - mm) / 60; // время в часах
      updateTime();
      startTimer();
    },
    10)
  } 
}


function updateTime() {//вывод на экран значений таймера
  var s = ss;
  var m = mm;
  var h = hh;
  if (s < 10) {
      s = '0' + s;
  }
  if (m < 10) {
      m = '0' + m;
  }
  if (h < 10) {
      h = '0' + h;
  }
  timerPanel.innerHTML = h + ':' + m + ':' + s;
}

var startSwitch = document.getElementsByClassName('btn-success')[0];
startSwitch.addEventListener('click', switchStart);

var startClear = document.getElementsByClassName('btn-danger')[0];
startClear.addEventListener('click', clearStart);