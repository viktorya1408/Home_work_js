"use strict";
$(function() {

  var testObj = {//Объект с данными теста
    topic: 'Тест по программированию',
    data: [{
      task: 'Вопрос №1',
      variants: ['вариант ответа №1', 'вариант ответа №2', 'вариант ответа №3'],
      right: 2
    }, 
    {
      task: 'Вопрос №2',
      variants: ['вариант ответа №1', 'вариант ответа №2', 'вариант ответа №3'],
      right: 3
    },
    {
      task: 'Вопрос №3',
      variants: ['вариант ответа №1', 'вариант ответа №2', 'вариант ответа №3'],
      right: 1
    },
  ]};

  localStorage.setItem('test', JSON.stringify(testObj));
  var testData = JSON.parse(localStorage.getItem('test'));


  var tmpl = _.template($('#test').html());
  var content = tmpl(testData);
  $('.templ-test').append(content);

  var results = [];
  var counter, control;

  function showModal(e) {//Вывод модального окна на экран
    e.preventDefault();
    checkResult();
    formModal();
    $('.overlay, .modal-block').css('display','block');
  }


  function hideModal(e) {//Закрытие модального окна
    e.preventDefault();
    $('.overlay, .modal-block').css('display','none');
    $('input:checked').removeAttr('checked');
    results.length = 0;
    $('div.wrapper').remove();
  }
  
 
  function checkResult() {// Подсчет результатов теста
    var answers = $('input:checked');
    for (var i = 0; i < testData.data.length; i++) {
     counter = 0;
     control = false;
     for (var j = 0; j < answers.length; j++) {
        if (answers[j].name == 'test' + (i + 1)) {
          counter += 1;
          if (answers[j].value == testData.data[i].right) {
            control = true;
          }
          else {
            control = false;
            continue;
          }
        }
      }
      if (control && counter == 1) {
        results.push(1);
      }
      else {
        results.push(0);
      } 
    }
  }
  

  function formModal() {// Формирование содержимого модального окна
    var hModal, ulModal, liModal;
    $('.modal-block').prepend('<div class="wrapper"></div>');

    var sumRes = results.reduce(function(sum, current) {
      return sum + current;
    }, 0);
    if (sumRes == testData.data.length) {
      hModal = '<h2 class = "modal-h">' + 'Поздравляем! Тест пройден.' + '</h2>';
    }
    else {
      hModal = '<h2 class = "modal-h">' + 'Тест не пройден.' + '</h2>';
    }
    $('.wrapper').append(hModal);
    if (sumRes == 0 || sumRes > 4) {
      ulModal =  '<ul class="modal-list">' + 'У Вас ' + sumRes + ' правильных ответов из ' + testData.data.length + '</ul>';
    }
    else if (sumRes == 1) {
      ulModal =  '<ul class="modal-list">' + 'У Вас ' + sumRes + ' правильный ответ из ' + testData.data.length + '</ul>';     
    }
    else {
      ulModal =  '<ul class="modal-list">' + 'У Вас ' + sumRes + ' правильных ответа из ' + testData.data.length + '</ul>';
    }
    $('.wrapper').append(ulModal);
    for (var i = 0; i < testData.data.length; i++) {
      if (results[i] == 0) {
        liModal = '<li class="modal-item">' + testData.data[i].task + ' - 0 баллов' + '</li>';
      }          
      else {
        liModal = '<li class="modal-item">' + testData.data[i].task + ' - 1 балл' + '</li>';        
      }
      $('.modal-list').append(liModal);   
    }
  }


  $('.btn-info').on('click', showModal);
  $('#modal_close, .overlay, .btn-primary').on('click', hideModal);


});

