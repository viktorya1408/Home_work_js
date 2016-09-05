$(function() {
//обработка tab
  var $numActive = $('.tab-active').index('li');
  var $tab = $('.tab');

  $tab.click(function() {
    var $numThis = $(this).index('li');
    console.log($numThis);
      if ($numThis != $numActive) {
        changeClass($numActive);
        changeClass($numThis);
        $numActive = $numThis;

        function changeClass(num) {
         console.log('num ' + num);
          $('.tab').eq(num).toggleClass('tab-active');
          $('.item').eq(num).toggleClass('item-active');        
        }              
      }
  })

//обработка формы регистрации
// реакция на focus
$('.form-field').focusin(
  function() {
    hideTooltip();
    $(this).next().css('display', 'inline');   
  })

$('.form-field').focusout(
  function() {
    $(this).next().css('display', 'none');
  })

// реакция на hover
$('.form-field').hover(
  function() {
      $(this).next().css('display', 'inline');
   },
  function() {
    if (!$(this).is(':focus')) {
      $(this).next().css('display', 'none');
    }
   })


// реакция на нажития кнопки помощь
$('.show-help').click(
  function() {
    $('.tooltip').css('display', 'inline'); 
  })

//скрывет все подсказки 
function hideTooltip() {
  $('.tooltip').css('display', 'none');    
}  
})