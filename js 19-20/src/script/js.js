"use strict";
$(function() {


// Carousel  
  $('.jcarousel').jcarousel({
    wrap: 'circular'
  });
  $('.jcarousel-pagination')
     .on('jcarouselpagination:active', 'a', function(e) {
         $(this).addClass('active');
     })
     .on('jcarouselpagination:inactive', 'a', function(e) {
         $(this).removeClass('active');
     })
     .on('click', function(e) {
         e.preventDefault();
     })
     .jcarouselPagination({
         perPage: 1,
         item: function(page) {
             return '<a href="#"></a>';
         }
    });

// Overlay
  $('.services__item').hover (
    function () {
       $(this).append('<div class="overlay"></div>');
       $(this).find('.services__item__text').css('color','#f4b60d');
    },
    function () {
       $(this).find('.overlay').remove();
       $(this).find('.services__item__text').css('color','#fff');       
    });
   
// Accordion
  var $head = $('.banner').find('.banner__accordion__h');
  $head.eq(0).addClass('banner__accordion__h--open');
  $head.eq(0).next('.banner__accordion__text').show();
  $head.on('click', function(e) {
    var $text = $(this).next('.banner__accordion__text');
    if ($(this).hasClass('banner__accordion__h--open')) {
      $($head).removeClass('banner__accordion__h--open');
      $text.hide();
    }
    else {
      $('.banner').find('.banner__accordion__h--open').next('.banner__accordion__text').hide();
      $($head).removeClass('banner__accordion__h--open');
      $(this).addClass('banner__accordion__h--open');
      $text.show();
    }
  });


// Json & Lodash
  $.getJSON('data.json', function(data) {
    var dataSkills = _.map(data, 'skills');
    dataSkills = _.flatten(dataSkills);
    dataSkills = _.uniq(dataSkills);
    dataSkills = _.orderBy(dataSkills);
    console.log('Массив скиллов (поле skills) всех людей, отсортированный по алфавиту, без повторяющихся скиллов:');
    console.log(dataSkills);
    console.log(' ');

    var dataName = _.map(data, function(x) {return _.pick(x, 'name','friends')});
    dataName = _.sortBy(dataName, function (x) {return x.friends.length});
    dataName = _.map(dataName, 'name');
    console.log(' Массив имен (поле name) людей, отсортированных в зависимости от количества их друзей (friends):');
    console.log(dataName);
    console.log(' ');

    var dataFriends = _.map(data, 'friends');
    dataFriends = _.flatten(dataFriends);
    dataFriends = _.map(dataFriends, 'name');
    dataFriends = _.uniq(dataFriends);
    console.log('Массив всех друзей всех пользователей, без повторяющихся людей:');
    console.log(dataFriends);
    console.log(' ');

  });
  
});

