$(document).ready(function () {
  $('.cap-slider').slick({
    vertical: true,
    verticalSwiping: true,
    nextArrow: $('.cap-slider__next'),
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: 'ease',
    rows: 0,
    speed: 1500,
    cssEase: 'ease-in-out',
    vertical: true,
    touchMove: false,
    mobileFirst: true,
    swipe: true,
    swipeToSlide: true,
    verticalSwiping: true
  }).on('wheel', (function (e) {
    e.preventDefault();
    if (e.originalEvent.deltaY > 0) {
      $(this).slick('slickNext');
    } else {
      $(this).slick('slickPrev');
    }
  }));

  $('.cap-slider__btn').on('click', function (e) {
    e.preventDefault();
    $('.cap-slider').slick('slickNext');
  });
  $('.cap-shops').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    easing: 'ease',
    speed: 1500,
    cssEase: 'ease-in-out',
    arrows: false,
    // nextArrow: $('.cap-shops__next'),
    // prevArrow: $('.cap-shops__prev'),
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
  $('.cap-shops__next').on('click', function (e) {
    e.preventDefault();
    $('.cap-shops').slick('slickNext');
  });
  $('.cap-shops__prev').on('click', function (e) {
    e.preventDefault();
    $('.cap-shops').slick('slickPrev');
  });

  $('.cap-shop').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $('.cap-shop').each(function () {
        $(this).removeClass('active');
      });
      $(this).addClass('active');
    }
  });
})