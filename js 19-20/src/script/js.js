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
         }});
   

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

