function checkName(nameUser, arrNames) {
  for (var i = 0; i < 5; i++) {
  	if (nameUser === arrNames[i]) {
  	  return alert(nameUser + ', Вы успешно вошли.');
  	}
  }
  return alert('Пользователь ' + nameUser + ' не зарегестрирован.');
}


var arrNames = [];
for (var i = 0; i < 5; i++) {
  arrNames[i] = prompt('Введите, пожалуйста, имя', '');
}

var nameUser = prompt('Введите, пожалуйста, свое имя', '');
checkName(nameUser, arrNames);