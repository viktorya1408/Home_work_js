var switchButton = 0;
var timerPanel = document.getElementsByClassName('counter-main')[0];
var milisecPanel = document.getElementsByClassName('counter-branch')[0];
var resultBlock = document.getElementsByClassName('result-timer')[0];
var hh = 0;
var mm = 0;
var ss = 0;
var ms = 0;
var timeNow = 0;
var timeStart = 0;
var timeDifference = 0;
var timeStop = 0;
var firstStart = 0;
var prevStop = 0;


function switchStart() {//реакция на нажатие start stop
  if (switchButton == 0) {
    switchButton = 1;
    if (firstStart == 0) {
      timeStart = Date.now();
      firstStart = 1;
    }
    else {
      timeDifference = timeDifference + Date.now() - timeStop;
      prevStop = timeNow;
    }
    startTimer();
    document.getElementsByClassName('start-button')[0].value = 'Stop';
  }
  else {
    switchButton = 0;
    timeStop = Date.now();
    document.getElementsByClassName('start-button')[0].value = 'Start';
    clearTimeout(changeTime);
    pressStop();
  }
}


function pressSplit() {// реакция на нажатие Split
  if (switchButton) {
  var addElement = document.createElement('p');
  addElement.innerHTML  = (resultBlock.childNodes.length + 1) + ' Split: ' + timerPanel.innerHTML + milisecPanel.innerHTML;
  resultBlock.appendChild(addElement);   
  }
}


function pressStop() {// обработка Stop
  var addTime = timeNow - prevStop;
  console.log(addTime);
  countTime(addTime);
  if (ms < 10) { 
    ms = '.00' + ms;
  }
  else if (ms < 100) {
    ms = '.0' + ms;
  }
  else {
    ms = '.' + ms;
  }
  var addElement = document.createElement('p');
  addElement.innerHTML = (resultBlock.childNodes.length + 1) + ' Stop: ' + updateCounter() + ms;
  resultBlock.appendChild(addElement);
}


function clearStart() {//реакция на нажатие clear
  firstStart = 0;
  switchButton = 0;
  timeDifference = 0;
  timeStop = 0;
  prevStop = 0;
  document.getElementsByClassName('start-button')[0].value = 'Start';
  document.getElementsByClassName('counter-main')[0].innerHTML='00:00:00';
  document.getElementsByClassName('counter-branch')[0].innerHTML='.000';
  clearResult();
  clearTimeout(changeTime);
}


function clearResult () {// удаление промежуточных показаний с экрана
  while (resultBlock.lastChild) {
     resultBlock.removeChild(resultBlock.lastChild);
   } 
}


function startTimer() {//таймер
  if (switchButton == 1) {
    changeTime = setTimeout(
    function () {
      timeNow = Date.now() - timeStart - timeDifference;
      countTime(timeNow);
      if (ms < 10) { // вывод на экран миллисекунд
        milisecPanel.innerHTML = '.00' + ms;
      }
      else if (ms < 100) {
        milisecPanel.innerHTML = '.0' + ms;
      }
      else {
        milisecPanel.innerHTML = '.' + ms;
      }       
       timerPanel.innerHTML = updateCounter();
      startTimer();
      },
    10)
  } 
}


function countTime(timeWork) {// подсчет текущего показания таймера
  ms = timeWork % 1000;
  timeWork = (timeWork - ms) / 1000; // время в секундах
  ss = timeWork % 60 ;
  timeWork = (timeWork - ss) / 60;  // время в минутах
  mm = timeWork % 60;
  hh = (timeWork - mm) / 60; // время в часах
}

function updateCounter() {//приведение времени к строке для вывода на экран
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
  return (h + ':' + m + ':' + s);
}


var startSwitch = document.getElementsByClassName('start-button')[0];
startSwitch.addEventListener('click', switchStart);

var startSplit = document.getElementsByClassName('split-button')[0];
startSplit.addEventListener('click', pressSplit);

var startClear = document.getElementsByClassName('reset-button')[0];
startClear.addEventListener('click', clearStart);