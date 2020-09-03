// пункт меню
$('a.menu__item').on('click', function (e) {
  e.preventDefault();
  $(this).addClass('active');
  let id = $(this).attr('href');
  if (id == '#home') {
    console.log('видео');
    $('.page').removeClass('active');
    $('.menu').removeClass('submenu-active');
    $('.menu__item').removeClass('active');
    $('.submenu').removeClass('active');
    $('.submenu__item').removeClass('active');
  };
  if ($(window).width() > 991) {
    $('.menu__item').removeClass('active');
    $(this).addClass('active');
    $('.page').removeClass('active');
    $(id).addClass('active');
  };
});

// вложеное меню
$('.submenu__item').on('click', function (e) {
  e.preventDefault();
  let id = $(this).attr('href');
  if ($(window).width() > 991) {
    $('.submenu__item').removeClass('active');
    $(this).addClass('active');
    $(this).parents('.menu').addClass('submenu-active');
    $(this).parent().addClass('active');
    $('.page').removeClass('active');
    $(id).addClass('active');
    videoMain();
  }
});

// закрытие вкладки
$('.page__close').on('click', function () {
  if ($(window).width() > 991) {
    $('.page').removeClass('active');
    $('.menu').removeClass('submenu-active');
    $('.menu__item').removeClass('active');
    $('.submenu').removeClass('active');
    $('.submenu__item').removeClass('active');
    videoMain();
  } else {
    $('.page').removeClass('active');
    $('.burger-menu__item').removeClass('active');
    $('.burger-submenu__item').removeClass('active');
    $('.burger-menu__item-wrap .burger-menu__item').each(function () {
      $(this).removeClass('active');
      $(this).next().stop().slideUp();
    });
    videoMain();
  }
});

// модалки с видео
$('[data-fancybox]').fancybox({
  youtube: {
    controls: 0,
    showinfo: 0
  },
  vimeo: {
    color: 'f00'
  }
});

$('[data-fancybox^="group"]').fancybox({
  loop: true
});

// фотогалерея
$('.media__item').on('mouseover', function () {
  let video = $(this).find('video')[0];
  $(this).find('.media__play').hide();
  video.play();
});

$('.media__item').on('mouseleave', function () {
  let video = $(this).find('video')[0];
  $(this).find('.media__play').show();
  video.pause();
  video.currentTime = 0;
});

// стизация скроллбара
$(".page__content").niceScroll({
  cursorcolor: "#f1f1f1",
  cursorwidth: 5,
  cursorborderradius: 100,
  autohidemode: false,
  autohidemode: true,
  zindex: 1
});

// размер и положение вкладки + положение бургер меню
function pageTop() {
  let h_height = $('.header').height();
  let p_height = $('body').height() - h_height;
  // if ($(window).width() < 991) {
  $('.page').css({
    'top': h_height,
    'height': p_height
  });
  $('.burger-menu').css('top', h_height);
  // } else {
  //   $('.page').css({
  //     'top': '',
  //     'height': ''
  //   });
  //   $('.burger-menu').css('top', '');
  // }
};

$(window).on('load resize', pageTop);

// вызов бургер меню
$('.header__burger').on('click', function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(".burger-menu").stop().slideUp();
  } else {
    $(this).addClass('active');
    $(".burger-menu").stop().slideDown();
  }
});

// разворачивание подменю в бургере
$('.burger-menu__item-wrap .burger-menu__item').on('click', function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active').next(".burger-submenu").stop().slideUp();
  } else {
    $('.burger-menu__item-wrap .burger-menu__item').each(function () {
      $(this).removeClass('active');
      $(this).next().stop().slideUp();
    });
    $(this).addClass('active');
    $(this).next().stop().slideDown();
  }
});

// вызов вкладки из бургер меню
$('a.burger-menu__item').on('click', function (e) {
  e.preventDefault();
  let id = $(this).attr('href');
  $('.burger-menu__item').removeClass('active');
  $('.burger-submenu__item').removeClass('active');
  $('.burger-menu__item-wrap .burger-menu__item').each(function () {
    $(this).removeClass('active');
    $(this).next().stop().slideUp();
  });
  $(this).addClass('active');
  $('.page').removeClass('active');
  $(id).addClass('active');
  $('.header__burger').removeClass('active');
  $(".burger-menu").stop().slideUp();
});

// вызов вкладки из подменю в бургере
$('a.burger-submenu__item').on('click', function (e) {
  e.preventDefault();
  let id = $(this).attr('href');
  $('.burger-menu__item').removeClass('active');
  $('.burger-submenu__item').removeClass('active');
  $(this).addClass('active');
  $('.page').removeClass('active');
  $(id).addClass('active');
  $('.header__burger').removeClass('active');
  $(".burger-menu").stop().slideUp();
  videoMain();
});

// замена фонового видео
function videoMain() {
  let vw = $('.video-wrap');
  // первая половина продуктов
  if ($('#product-1').hasClass('active') || $('#product-2').hasClass('active') || $('#product-3').hasClass('active')) {
    if (vw.hasClass('second') == false) {
      console.log(2);
      let video = vw.find('video')[0];
      video.pause();
      vw.removeClass('first').removeClass('third').addClass('second');
      vw.find('source').eq(0).attr('src', 'video/mp4/PMZ Loop 02 (10 mbps).mp4');
      vw.find('source').eq(1).attr('src', 'video/webm/PMZ Loop 02.webm');
      video.load();
    }
  } else {
    // вторая половина
    if ($('#product-4').hasClass('active') || $('#product-5').hasClass('active') || $('#product-6').hasClass('active')) {
      if (vw.hasClass('third') == false) {
        console.log(3);
        let video = vw.find('video')[0];
        video.pause();
        vw.removeClass('first').removeClass('second').addClass('third');
        vw.find('source').eq(0).attr('src', 'video/mp4/PMZ Loop 03 (10 mbps).mp4');
        vw.find('source').eq(1).attr('src', 'video/webm/PMZ Loop 03.webm');
        video.load();
      }
    } else {
      // возвращение исходного
      if (vw.hasClass('first') == false) {
        console.log(1);
        let video = vw.find('video')[0];
        video.pause();
        vw.removeClass('second').removeClass('third').addClass('first');
        vw.find('source').eq(0).attr('src', 'video/mp4/PMZ Loop 01 (10 mbps).mp4');
        vw.find('source').eq(1).attr('src', 'video/webm/PMZ Loop 01.webm');
        video.load();
      }
    }
  }
};