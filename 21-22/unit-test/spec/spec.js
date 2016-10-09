var app = require('../script/app.js');

describe("Проверка на то, что введенное значение - это число", function() {
	it("Введено не число", function() {
		var result;

		result = app.isNumeric('123mm');

		expect(result).toBeFalsy();
	});

	it("Введено число", function() {
		var result;

		result = app.isNumeric(2);

		expect(result).toBeTruthy();
	});
});

describe("Проверка на то, что введенное значение - это целое число", function() {
	it("Введено не целое число", function() {
		var result;

		result = app.isInteger(3.45);

		expect(result).toBeFalsy();
	});

	it("Введено целое число", function() {
		var result;

		result = app.isInteger(2);

		expect(result).toBeTruthy();
	});
});

describe("Проверка возведения целого числа в целую степень", function() {
  var result;
  it("Основание отрицательное число -3 в степени 2 равно 9", function() {
    result = app.pow(-3, 2);
    expect(result).toBe(9);
  });
  it("Степень отрицательное число 5 в степени -2 равно 0,04", function() {
    result = app.pow(5, -2);
    expect(result).toBe(0.04);
  });
  it("Основание и степень положительные числа 7 в степени 5 равно 16807", function() {
    result = app.pow(7, 5);
    expect(result).toBe(16807);
  });
  it("Единица в любой степени равна 1", function() {
    result = app.pow(1, 25);
    expect(result).toBe(1);
  });
  it("Любое число, кроме 0, возведенное в 0 степень равно 1", function() {
    result = app.pow(36, 0);
    expect(result).toBe(1);
  });
});
