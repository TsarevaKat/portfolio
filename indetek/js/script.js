$(function(){
  $('.header-burger').on('click', function(){
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('.header-menu').removeClass('active');
      $('body').css('overflow', 'visible');
    } else {
      $(this).addClass('active');
      $('.header-menu').addClass('active');
      $('body').css('overflow', 'hidden');
    }
  });

  $('.header-menu__arrow').on('click', function(){
    let item = $(this).parents('.header-menu__link-wrap');
    if ($(item).hasClass('active')) {
      $(item).removeClass('active');
      $(item).parent().find('.header-submenu').stop().slideUp();
    } else {
      $(item).addClass('active');
      $(item).parent().find('.header-submenu').stop().slideDown();
    }
  });

  $('.btn-search').on('click', function () {
    $('.header__search').addClass('active');
  });
  
  $('.header__search-close').on('click', function () {
    $('.header__search').removeClass('active');
  });
});