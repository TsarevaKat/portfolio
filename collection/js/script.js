$('.menu__item').on('click', function () {
  $('.menu__item').removeClass('active');
  $(this).addClass('active');
  var id = $(this).attr('href');
  length_top = $(id).offset().top - 40;
  $('html,body').stop().animate({
    scrollTop: length_top
  }, 1000);
  e.preventDefault();
});

$('.buy-tab').on('click', (function () {
  tab = $(this).find('input').attr('id');
  var tabs = '#' + tab;
  var content = '#' + tab + '__content';
  console.log(tabs);
  console.log(content);
  $('.buy-tab').find('input').removeClass('active');
  $('.buy-tab__content').removeClass('active');
  $(tabs).addClass('active');
  $(content).addClass('active');
}));


$('.buy-tab__content').each(function () {
  var prev = $(this).find('.slider__prev');
  var next = $(this).find('.slider__next');

  var slider = $(this).find('.slider');
  slider.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: next,
    prevArrow: prev,
    responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 544,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

$('.info-tab').on('click', (function () {
  tab = $(this).find('input').attr('id');
  var tabs = '#' + tab;
  var content = '#' + tab + '__content';
  console.log(tabs);
  console.log(content);
  $('.info-tab').find('input').removeClass('active');
  $('.info-tab__content').removeClass('active');
  $(tabs).addClass('active');
  $(content).addClass('active');
}));

$('.history-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: '.history-slider__next',
  prevArrow: '.history-slider__prev'
});

$('.info-tab').on('click', (function () {
  tab = $(this).find('input').attr('id');
  var tabs = '#' + tab;
  var content = '#' + tab + '__content';
  console.log(tabs);
  console.log(content);
  $('.buy-tab').find('input').removeClass('active');
  $('.buy-tab__content').removeClass('active');
  $(tabs).addClass('active');
  $(content).addClass('active');
}));

//формы
$('input[type="tel"]').inputmask({
  mask: "+7 (999) 999-99-99",
  showMaskOnHover: false,
  clearMaskOnLostFocus: true,
  clearIncomplete: true,
});

$('.header-menu_mobile').on('click', function (e) {
  e.preventDefault;
  if ($('.header').hasClass('header_active-burger')) {
    $('.header').removeClass('header_active-burger');
    $('.burger').hide();
  } else {
    $('.header').addClass('header_active-burger');
    $('.burger').show();
  }
});

$('.popup-open').magnificPopup({
  type: 'inline',
  midClick: true
});

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
      center: [56.321420, 44.005927],
      zoom: 18,
      controls: []
    }, {
      searchControlProvider: 'yandex#search'
    }),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: '../img/map-mark.png',
      // Размеры метки.
      iconImageSize: [30, 42],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-5, -38]
    });

  myMap.geoObjects
    .add(myPlacemark);

});

$('.menu_mobile').on('click', function (e) {
  e.preventDefault;
  if ($('.header').hasClass('header_active-burger')) {
    $('.header').removeClass('header_active-burger');
    $('.burger').hide();
  } else {
    $('.header').addClass('header_active-burger');
    $('.burger').show();
  }
});

$('.burger-menu__item').on('click', function () {
  $('.burger').hide();
  $('.header').removeClass('header_active-burger');
  var id = $(this).attr('href');
  length_top = $(id).offset().top - 40;
  $('html,body').stop().animate({
    scrollTop: length_top
  }, 1000);
  e.preventDefault();
});

$('.month').selectric();