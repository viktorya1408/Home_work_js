function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkNum(basis) {
  while (isNumeric(basis) == false) {
    basis = prompt('Вы ввели не число. Введите другое число', '');
  }
  basis = + basis;
  return (basis);  
}


function checkDegree(degree) {
  degree = + degree;
  while ((!isNumeric(degree)) == true || (Math.round(degree) != degree)) {
    degree = prompt('Вы ввели не целое число. Введите целое число для степени', '')
  }
  degree = + degree;
  return (degree);
}


function pow(basis, degree) {
  var myResult = 1;
  for (var i = 0; i < Math.abs(degree); i++) {
    myResult *= basis;
  }  
  if (degree > 0) {
    return myResult;
  }
  else {
    return (1/myResult);  	
  }    
}


var basis = prompt('Введите число','');
basis = checkNum(basis);

var degree = prompt('Введите степень', '');
degree = checkDegree(degree);

if ((degree == 0) && (basis == 0)) {
  console.log('0 в 0 степени не определяется')
}
else if ((degree != 0) && (basis == 0)) {
  console.log('0 в степени ' + degree + ' = 0');
  }
else {
  var myResult = pow(basis, degree);
  console.log(basis + ' в степени ' + degree + ' = ' + myResult)
}
