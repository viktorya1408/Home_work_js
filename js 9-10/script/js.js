$(function() {	
// dropdown menu jQuery
  var $dropMenu = $('.menu-header .dropdown');
  $dropMenu.hover(function() {
    $(this).find('.submenu').stop(true, true);  	
    $(this).find('.submenu').eq(0).slideDown(300)
    .animate({backgroundColor:"#9563CE",
    }, 400 );
    },
    function() {
	  $(this).find('.submenu').eq(0).slideUp(400)
    .animate({backgroundColor:"#B177F4",
    }, 300 );;
  })

// Carousel  
  $('.jcarousel').jcarousel({
    wrap: 'circular'
  });
  $('.jcarousel-control-prev')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
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
    .jcarouselControl({
      target: '+=1'
  });   
  $('.jcarousel-pagination')
    .on('jcarouselpagination:active', 'a', function() {
      $(this).addClass('active');
    })
    .on('jcarouselpagination:inactive', 'a', function() {
      $(this).removeClass('active');
    })
    .jcarouselPagination();
    
  $('.jcarousel').jcarouselAutoscroll({
    interval: 5000,
    target: '+=1',
    autostart: true
  });           
  
// Select 
  $('select').selectBox({
	menuTransition: 'slide',
	menuSpeed: 'fast'
  });


//jQuery checkbox
  var $inputs = $('.checkbox-jq input').wrap('<span></span>');
  $inputs.each(function() {
    var $parent = $(this).parent();
    var $check = $(this).attr('checked');
    var $disabl = $(this).attr('disabled');
    $parent.addClass('nicecheck');
    if ($check &&  $disabl){
      $parent.addClass('checked-disabled');
    }
    else if ($check) {
      $parent.addClass('checked');    	
    }
    else if ($disabl) {
      $parent.addClass('disabled');
    }
    else {
      $parent.addClass('clear');
    }
  });
  $inputs.hide();

  var $niceCheck = $('.nicecheck');
  $niceCheck.on('click', function() {
  	if ($(this).hasClass('checked') || $(this).hasClass('clear')) {
     $(this).toggleClass('checked').toggleClass('clear');
  	}
  });
 });

