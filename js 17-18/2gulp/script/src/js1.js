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

