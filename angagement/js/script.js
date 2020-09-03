// $("body").niceScroll({
//   cursorcolor: "#062f73",
//   background: "#F1F1F1",
//   cursorwidth: 10,
//   cursorborderradius: 100,
//   autohidemode: false,
//   cursorminheight: 26,
//   zindex: 1
// });

jQuery(document).ready(function ($) {
  //главны слайдер
  $('.main-slider').slick({
    vertical: true,
    verticalSwiping: true,
    nextArrow: $('.main-slider__next'),
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
    verticalSwiping: true,
    dots: true
  }).on('wheel', (function (e) {
    e.preventDefault();
    if (e.originalEvent.deltaY > 0) {
      $(this).slick('slickNext');
    } else {
      $(this).slick('slickPrev');
    }
  }));


  //бургер
  $('.burger-menu__item span').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      // $(this).find('.burger-submenu').slideUp();
    } else {
      $('.burger-menu__item').each(function () {
        $(this).removeClass('active');
      });
      $(this).addClass('active');
      // $(this).find('.burger-submenu').slideDown();
    }
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

  //разворачивание вопросов
  $('.faq-block').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').find(".faq-block__content").stop().slideUp("fast");
    } else {
      $('.faq-block').each(function () {
        $(this).removeClass('active').find(".faq-block__content").stop().slideUp("fast");
      });
      $(this).addClass('active').find(".faq-block__content").stop().slideDown("fast");
    }
  });

  //формы
  // $('input[type="tel"]').inputmask("+7 (999) 999-99-99");

  var valid = {
    messages: {
      tel: {
        required: "Поле 'Телефон' обязательно к заполнению"
      }
    }
  }

  $('form').each(function () {
    $(this).validate(valid);
  });

  $('.popup-open').magnificPopup({
    type: 'inline',
    midClick: true
  });

  // $('#popup-contact__form').validate({
  //   messages: {
  //     tel: {
  //       required: "Поле 'Телефон' обязательно к заполнению"
  //     }
  //   }
  // });
  // $('#error-form').validate({
  //   messages: {
  //     tel: {
  //       required: "Поле 'Телефон' обязательно к заполнению"
  //     }
  //   }
  // });

  $('.slider__honors').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
    ]
  });

  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1
  });

  //рубрикатор 
  if ($('.catalog-menu').length) {
    var menu = $('.catalog-menu');
    var menu__content = $('.catalog-menu__content');
    var menu_width = menu.width();
    var menu__content_width = (menu__content.find('.catalog-menu__item:not(.catalog-menu__item_collection)').outerWidth() + 20) * (menu__content.children().length - 1) + menu__content.find('.catalog-menu__item_collection').outerWidth() + 10;
    var btn_next = $('.catalog-menu__btn_next');
    var btn_prev = $('.catalog-menu__btn_prev');
    if (menu__content_width > menu_width) {
      btn_next.addClass('active');
    }
    $(menu).scroll(function () {
      var scroll = $(menu).scrollLeft();
      if (scroll > 0) {
        btn_prev.addClass("active");
      };
      if (scroll == 0) {
        btn_prev.removeClass("active");
      };
      var newscroll = menu__content_width - menu_width - scroll;
      // console.log(newscroll);
      if (newscroll == 0) {
        btn_next.removeClass("active");
      } else {
        if (newscroll > 0) {
          btn_next.addClass('active');
        }
      };
    });

    btn_next.on('click', function () {
      menu.animate({
        scrollLeft: "+=" + 250 + "px"
      });
    });
    btn_prev.on('click', function () {
      menu.animate({
        scrollLeft: "-=" + 250 + "px"
      });
    });
  };

  //увеличение картинок из большого слайдера
  $('.slider__item').magnificPopup({
    type: 'image',
    mainClass: 'mfp-fade', // this class is for CSS animation below

    gallery: {
      enabled: true
    }
  });

  //деталка галерея схем
  $('.scheme-block').magnificPopup({
    type: 'image',
    mainClass: 'mfp-fade scheme-block__popup', // this class is for CSS animation below

    gallery: {
      enabled: true
    }
  });

  //преимущества слайдер на мобилках
  function sliderInint() {
    if ($(window).width() <= 991) {
      $('.franchising-advantage__blocks').slick({
        slidesToShow: 1,
        slidesToScroll: 1
      });
      $('.upholstery').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 544,
          settings: {
            slidesToShow: 2
          }
        }
        ]
      });
    } else {
      $('.franchising-advantage__blocks').slick('unslick');
      $('.upholstery').slick('unslick');
    };
  };

  $(window).on('load resize', sliderInint);

  //деталка слайдеры
  $('.slider-big').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true,
    asNavFor: '.slider-small'
  });

  $('.slider-small').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-big',
    arrows: false,
    // centerMode: true,
    focusOnSelect: true,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    }]
  });

  //деталка разворачивание схем
  $('.scheme__arrow').on('click', function () {
    $(this).toggleClass('active');
    $('.scheme-blocks').toggleClass('active');
  });

  // прокрутка чисел
  if ($('.info-block__num').length) {
    let show = true;
    const countbox = ".info-block__num";
    const startNumb = function () {
      if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
      let w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      let e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      let w_height = $(window).height(); // Высота окна браузера
      let d_height = $(document).height(); // Высота всего документа
      let e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
      if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
        //
        // скрипт который должен выполниться
        //
        $('.info-block__num').css('opacity', '1');
        $('.info-block__num').spincrement({
          thousandSeparator: " ",
          duration: 1200
        });
        show = false;
      }
    }
    $(window).on("load", startNumb);
    $(window).on("scroll", startNumb);
    $(window).on("resize", startNumb);
  }

  //всплывашки
  if ($('.tooltip').length) {
    $('.tooltip').tooltipster({
      contentCloning: false,
      theme: 'tooltipster-light'
      // functionInit: function (instance, helper) {
      //   var content = $(helper.origin).find('.upholstery-block__descr').detach();
      //   instance.content(content);
      // },
    });
  };

});