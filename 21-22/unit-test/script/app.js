var app = {

  isNumeric: function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },

  isInteger: function (n) {
    return (Math.round(n) == n);
  },

  checkNum: function (basis) {
    while (!app.isNumeric(basis)) {
      basis = prompt('Вы ввели не число. Введите другое число', '');
    }
    basis = + basis;
    return (basis);  
  },

 checkDegree: function (degree) {
    degree = + degree;
    while (!app.isNumeric(degree) || !app.isInteger(degree)) {
      degree = prompt('Вы ввели не целое число. Введите целое число для степени', '')
    }
    degree = + degree;
    return (degree);
  },

  pow: function (basis, degree) {
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
  },

  init: function () {
    var basis = prompt('Введите число','');
    basis = app.checkNum(basis);

    var degree = prompt('Введите степень', '');
    degree = app.checkDegree(degree);

    if ((degree == 0) && (basis == 0)) {
      console.log('0 в 0 степени не определяется')
    }
    else if ((degree != 0) && (basis == 0)) {
      console.log('0 в степени ' + degree + ' = 0');
    }
    else {
      var myResult = app.pow(basis, degree);
      console.log(basis + ' в степени ' + degree + ' = ' + myResult)
    }
  }
};

try {
  module.exports = app;
} catch (e) {}
