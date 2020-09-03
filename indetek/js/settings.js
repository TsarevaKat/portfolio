$(function(){
  if ($('.main-slider').length) {
    $('.main-slider').slick({
      arrow: TransitionEvent,
      nextArrow: '.main-slider__arrow_next',
      prevArrow: '.main-slider__arrow_prev',
      dots: true,
      dotsClass: 'main-slider__dots',
      zIndex: 0
    });
  }
});