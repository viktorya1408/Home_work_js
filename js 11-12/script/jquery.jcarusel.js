(function($) {

  $.fn.jcarusel = function (options) {
 
    var $carusel = this;
    console.log($carusel);
    var defaults = {
      showItem : 3 // Количество слайдов для показа по умолчанию
    }
    var settings = $.extend(defaults, options);
    var $caruselList = $carusel.find('ul');  //добавляем необходимые элементы и добавляем классы
    $caruselList.addClass('jcarusel-list');
    $caruselList.wrap('<div class="jcarusel-wrapper"></div>');
    var $caruselItem = $caruselList.find('li');
    $caruselItem.addClass('jcarusel-item');
    $caruselLenght = $caruselItem.length; 
    $carusel.append('<a class="jcarusel-control-prev" href="#">&lsaquo;</a>');
    $carusel.append('<a class="jcarusel-control-next" href="#">&rsaquo;</a>');
    $caruselWrapper =  $carusel.find('.jcarusel-wrapper');
    var $caruselWidth =  parseInt($carusel.css('width'));
    var $wrapperWidth = $caruselLenght * 100/ settings.showItem; //вычисляем ширину списка и ширину картинок
    $caruselWrapper.css('width', $wrapperWidth + '%');
    var $itemWidth = 100 / $caruselLenght;
    $caruselItem.css('width', $itemWidth + '%');

    var step =  $itemWidth;
    var $left = $carusel.find('.jcarusel-control-prev');
    var $right = $carusel.find('.jcarusel-control-next');

    $left.click(function(e) {// реакция на левую стрелку
      e.preventDefault();
      $('.jcarusel-list .jcarusel-item').eq(-1).clone().prependTo($caruselList);
      $caruselList.css({left: (-step) + '%'}); 
      $caruselList.animate({left: '0'}, 400); 
      $('.jcarusel-list .jcarusel-item').eq(-1).remove(); 
    });


    $right.click(function(e) {// реакция на правую стрелку
      e.preventDefault();
      $caruselList.animate({left : (-step) + '%'}, 400);
      setTimeout(function () { 
        $('.jcarusel-list .jcarusel-item').eq(0).clone().appendTo($caruselList);
        $('.jcarusel-list .jcarusel-item').eq(0).remove();
        $caruselList.css({'left': '0'});
        }, 500);
    });

  return this;
  }

}) (jQuery);