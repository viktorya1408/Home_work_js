var timeCounter = 0;
var switchButton = 0;
var timerPanel = document.getElementsByClassName('counter-main')[0];
var milisecPanel = document.getElementsByClassName('counter-branch')[0];
var hh = 0;
var mm = 0;
var ss = 0;

function switchStart() {//реакция на нажатие start
  if (switchButton == 0) {
    switchButton = 1;
    startTimer();
    document.getElementsByClassName('btn-success')[0].value = 'Pause';
  }
  else {
    switchButton = 0;
    document.getElementsByClassName('btn-success')[0].value = 'Continue'; 
  }
}

function clearStart() {//реакция на нажатие clear
  timeCounter = 0;
  switchButton = 0;
  document.getElementsByClassName('btn-success')[0].value = 'Start';
  document.getElementsByClassName('counter-main')[0].innerHTML='00:00:00';
  document.getElementsByClassName('counter-branch')[0].innerHTML='0';
  hh = 0;
  mm = 0;
  ss = 0;
}

function startTimer() {//таймер
  if (switchButton == 1) {
     setTimeout(
      function () {
        milisecPanel.innerHTML = timeCounter;
        timeCounter +=25;
        if (timeCounter == 1000) {
          timeCounter = 0;
          ss += 1;                   
          if (ss == 60) {
            ss = 0;
            mm += 1;
            if (mm == 60) {
              mm = 0;
              hh += 1;
            }
          }
          updateCounter();
        }
        startTimer();
      },
    25)
  } 
}

function updateCounter() {//вывод на экран значений таймера
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