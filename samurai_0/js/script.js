$(document).ready(function () {
  // главный слайдер
  $('.main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1
  });
  // сладйер разделов после доставки
  $('.slider-mini').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
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
      }]
  });

  // по блочная прокрутка
  $(window).on('load resize',
    function () {
      if ($(window).width() >= 768) {
        $.scrollify({
          section: ".section",
          //sectionName:false,
          // offset: $('header').height(''),
          overflowScroll: false,
          scrollSpeed: 1100,
          interstitialSection: ".footer"
        });
      } else {
        $.scrollify.update();
        $.scrollify.disable();
      };
    }
  );

  // уведомление о куках
  var delay_popup = 2000;
  setTimeout("document.getElementById('cookies').style.display='block'", delay_popup);
  $(".cookies-close").on("click", function () {
    $(".cookies").hide();
  });

  // вызов бургер меню
  $('.menu-burger').on('click', function (e) {
    e.preventDefault;
    if ($('.header').hasClass('header_active-burger')) {
      $('.header').removeClass('header_active-burger');
      $('.burger').removeClass('active');
      $('.burger-contacts__item').find('.submenu_light').removeClass('active');
    } else {
      $('.header').addClass('header_active-burger');
      $('.burger').addClass('active');
      $('.burger-contacts__item').removeClass('active');
    }
  });

  // расворачивающиеся подменю в бургере 
  $('.burger-contacts__item').on('click', function () {
    var sub = $(this).attr('href')
    $(sub).addClass('active');
    // $('.header').addClass('submenu_active');
  });

  $(window).on('load resize',
    function () {
      if ($(window).width() <= 991) {
        $('.header__lk-wrap').on('click', function () {
          $('.submenu_lk').addClass('active');
          // $('.header').addClass('submenu_active');
        });
      }
    });

  $('.submenu__close').on('click', function () {
    $(this).parent().removeClass('active');
    // setTimeout(function(){
      $('.header').removeClass('submenu_active');
    // }, 900);
  });
  $('.burger-menu__item-block').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').find(".burger-submenu").stop().slideUp("fast");
    } else {
      $('.burger-menu__item-block').each(function () {
        $(this).removeClass('active').find(".burger-submenu").stop().slideUp("fast");
      });
      $(this).addClass('active').find(".burger-submenu").stop().slideDown("fast");
    }
  });

  new SmartBanner({
    title: 'Самурай Доставка',
    button: 'СКАЧАТЬ',
    // appStoreLanguage: 'ru',
    store: {
      ios: 'в App Store',
      android: 'в Google Play',
      windows: 'в Windows store'
    },
    price: {
      ios: 'Бесплатно',
      android: 'Бесплатно',
      windows: 'Бесплатно'
    }
    // , theme: 'ios' // put platform type ('ios', 'android', etc.) here to force single theme on all device
    // , icon: '' // full path to icon image if not using website icon image
    // , force: 'ios' // Uncomment for platform emulation
  });
});