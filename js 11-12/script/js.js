$(function() {	

// подключаем плагин для карусели

  $('.jcarusel').jcarusel();

// данные для шаблона
var data = {
  name: 'Крикливец Виктория Дмитриевна',
  photo: 'myphoto.png',
  past:'Бывший сотрудник строительной компании',
  why: 'Хочу учить фронтенд, потому что:',
  reason: ['Хочу поменять сферу деятельности', 'Хочу получать достойную оплату за свой труд', 'Мне интересно этим заниматься'],
  phone: '+380664592194',
  link: 'https://www.facebook.com/profile.php?id=100010665587984',
  feedback: 'Mогу дать консультацию по строительным материалам, а могу и вкусным тортом угостить'
};


// шаблонизатор Джона резига
  var html = $('#template-profile').html();
  var content = tmplJR(html, data);
  $('#templ').append(content);

// шаблонизатор Lodash
  var tmpl = _.template($('#template-profile').html());
  var content1 = tmpl(data);
  $('#lodash').append(content1);

 });

