//= partials/_jquery.jcarousel.js
;
//= partials/_microTemplates.js
;
//= partials/_masonry.pkgd.js
;

$(function() {

// Carousel  
  $('.jcarousel').jcarousel({
    wrap: 'circular',
    animation: 600
  });
  $('.jcarousel-control-prev')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
    })
    .on('click', function(e) {
      e.preventDefault();
    })
    .jcarouselControl({
      target: '-=1'
  });
  $('.jcarousel-control-next')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
    })
    .on('click', function(e) {
      e.preventDefault();
    })
    .jcarouselControl({
      target: '+=1'
  });   


  var searchKey = '';
  var apiKey='3355133-ffdd9eccecc4a026fdd03c452';
  var searchOk = false;
  var firstLoad = true;

  function showModal() {
    $('.modal').css('display','block');
  }

  function hideModal(e) {
    e.preventDefault();
    $('.modal').css('display','none');
  }

  function getRandomInt() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function rewriteItems (data) {
    var itemLink;
    var $itemGrid = $('.grid-item');
    for (var i = 0; i < data.length; i++){
      var gridTmpl = $('#grid-tmpl').html();
      var content = tmplJR(gridTmpl, {data: data[i]});
      $($itemGrid[i]).html(content);
    }
  }

  function search(searchKey) {
    $.ajax({
      url: 'https://pixabay.com/api/?key=' + apiKey + '&q=' + searchKey + '&image_type=photo&page=' + getRandomInt() + '&per_page=7',
      dataType: 'jsonp',
      success: function (data) {
        if (data.hits.length != 0) {
          if (firstLoad) {
            var ideasGrid = $('#ideas-tmpl').html();
            var content = tmplJR(ideasGrid, {data: data.hits});
            $('.ideas__grid').html(content);
            firstLoad = false;
          }
          else {
            rewriteItems(data.hits);
          }
          searchOk = true;
        }
        else {
          searchOk = false;
          showModal();
        }
      },
      error: function () {
        searchOk = false;
        alert('Error!');
      }
    });
  }

  var searchText = $('.search__input-block__text');
  var searchBtn = $('.search__input-block__btn');

  var reloadIdeas = function (e) {
    e.preventDefault();
    searchKey = $.trim(searchText.val());
    if (searchKey.length === 0) {
      return;
    }
    search(searchKey);
    if (searchOk) {
      $('.ideas-grid').masonry('reloadItems');
    } 
  }
  
  $(window).load(function(){
      $('.ideas__grid').masonry({ 
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    })
  });
  
  search(searchKey);  

  searchBtn.on('click', reloadIdeas);
  $('.modal').on('click', hideModal);

});