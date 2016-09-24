//"use strict";
$(function() {

var $searchKey;


  $('.search-button').click(function(e) {
    e.preventDefault();
    var $searchKey = $('.search-field').val().trim();
    clearScreen();
    if ($searchKey.length != 0) {
      search($searchKey);
      $searchKey = '';
    }
    else {
      $('.search-field').val('');
    }    
  });

//click 'Enter'
  $('.search-field').keypress(function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();    
      var $searchKey = $('.search-field').val().trim();
      clearScreen();
      if ($searchKey.length != 0) {
        search($searchKey);
        $searchKey = '';
      }
      else {
        $('.search-field').val('');
      }
      return;
    };
  });

  function clearScreen() {
    if ($('.search-result').children().length > 0) {
      $('.search-result').empty();
    }
  }

  function search(searchKey) {
    $.ajax({
      url: 'https://pixabay.com/api/?key=3355133-ffdd9eccecc4a026fdd03c452&q=' + searchKey + '&image_type=photo',
      dataType: 'jsonp',
      success: function (data) {
        if (data.hits.length != 0) {
          var $searchResults = data.hits;
          for (var i = 0; i < data.hits.length; i++) {
            $('.search-result').append('<img src="' + $searchResults[i].previewURL + '">');
          } 
        }
        else {
          $('.search-result').append('<p class="info">По Вашему запросу ничего не найдено</p>')
        }
      },
      error: function () {
        alert('Error!');
      }
    });
  }

// вторая часть задания с прототипами

/*  function Human(name, age, gender, height, weight) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
  }

  function Worker(name, age, gender, height, weight, job, wage) {
    Human.apply(this, arguments);
    this.job = job;
    this.wage = wage;
  }

  function Student(name, age, gender, height, weight, studyPlace, grants) {
    Human.apply(this, arguments);
    this.studyPlace = studyPlace;
    this.grants = grants;
  }

  Worker.prototype = Object.create(Human.prototype);
  Worker.prototype.constructor = Worker;
  Student.prototype = Object.create(Human.prototype);
  Student.prototype.constructor = Student;
  
  Worker.prototype.work = function () {
    console.log(this.name + ' work at the ' + this.job);
  }
  Student.prototype.watchSeries = function() {
    console.log(this.name + ' likes to watch serials.');
  }

  var worker1 = new Worker('Jack', 35, 'male', '185', 85, 'Airline', '5000');
  console.log(worker1);
  worker1.work();
  var worker2 = new Worker('Nicolas', 42, 'male', 182, 88, 'Factory', '2500');
  console.log(worker2);
  worker2.work();
  var worker3 = new Worker('Mary', 29, 'female', 169, 61, 'Hotel', '4000');
  console.log(worker3);
  worker3.work();
  var student1 = new Student('Jenny', 21, 'female', 165, 59, 'University', 1000);
  console.log(student1);
  student1.watchSeries();
  var student2 = new Student('Piter', 22, 'male', 179, 87, 'University of Technology', 950);
  console.log(student2);
  student2.watchSeries();
  var student3 = new Student('Ann', 20, 'female', 160, 55, 'college', 600);
  console.log(student3);
  student3.watchSeries();*/

});

