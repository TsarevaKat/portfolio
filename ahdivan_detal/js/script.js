var sliderBottom = new Swiper('.slider-bottom', {
	spaceBetween: 5,
	slidesPerView: 5,
	freeMode: true,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	breakpoints: {
		768: {
			spaceBetween: 10
		},
		992: {
			spaceBetween: 14
		}
	}
});

var sliderTop = new Swiper('.slider-top', {
	navigation: {
		nextEl: '.slider__next',
		prevEl: '.slider__prev',
	},

	thumbs: {
		swiper: sliderBottom,
	},
});

$('.detal-tab').on('click', (function () {
	tab = $(this).find('input').attr('id');
	var tabs = '#' + tab;
	var content = '#' + tab + '-content';
	console.log(tabs);
	console.log(content);
	console.log(tab.indexOf('_mob'));
	if (tab.indexOf('_mob') > -1) {
		console.log($(tabs).hasClass('active'));
		if ($(tabs).hasClass('active') == true) {
			$(tabs).removeClass('active');
			$(content).removeClass('active').stop().slideUp();

		} else {
			$(tabs).addClass('active');
			$(content).addClass('active').stop().slideDown();
		}
	} else {
		$('.detal-tab').find('input').removeClass('active');
		$('.detal-tab__content').removeClass('active');
		$(tabs).addClass('active');
		$(content).addClass('active');
	};
}));

$('.mechanism__img').hover(
	function () {
		$(this)
			.find('img').attr('src', 'img/mechanism.gif')
			.end().find('.mechanism__play').hide();
	},
	function () {
		$(this)
			.find('img').attr('src', 'img/mechanism.jpg')
			.end().find('.mechanism__play').show();
	});

$('.swiper-container').hover(
	function () {
		$(this)
			.css('z-index', '2');
	},
	function () {
		$(this)
			.css('z-index', '');
	});

$('.image-zoom').magnificPopup({
	type: 'image',
	mainClass: 'mfp-fade', // this class is for CSS animation below

	gallery: {
		enabled: true
	}
});

$('.popup-open').magnificPopup({
	type: 'inline',
	midClick: true
});

$('.detal-bottom').each(function () {
	var prev = $(this).find('.bottom-slider__prev');
	var next = $(this).find('.bottom-slider__next');

	var slider = $(this).find('.bottom-slider');
	maxheight = 0;
	maxcontent = 0;
	slider.find('.card-tov').each(function () {
		item = $(this).height();
		console.log(item);
		if (item > maxheight) {
			maxheight = item;
		}
	});
	slider.parent().css('height', maxheight + 90);
	slider.find('.card-tov').each(function () {
		$(this).css('min-height', maxheight + 55);
	});

	slider.find('.card-tov__content').each(function () {
		item = $(this).height();
		if (item > maxcontent) {
			maxcontent = item;
		}
	});
	slider.find('.card-tov__content').each(function () {
		$(this).css('min-height', maxcontent);
	});

	sliderCard = new Swiper(slider, {
		spaceBetween: 35,
		freeMode: true,
		// watchSlidesVisibility: true,
		// watchSlidesProgress: true,
		slidesPerView: 'auto',
		navigation: {
			nextEl: next,
			prevEl: prev,
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		}
	});

});


$('.popup-slider').each(function () {
	var prev = $(this).find('.bottom-slider__prev');
	var next = $(this).find('.bottom-slider__next');

	var slider = $(this).find('.bottom-slider');
	sliderCard = new Swiper(slider, {
		spaceBetween: 10,
		freeMode: true,
		// watchSlidesVisibility: true,
		// watchSlidesProgress: true,
		slidesPerView: 'auto',
		navigation: {
			nextEl: next,
			prevEl: prev,
		},
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		}
	});

});

$('.tooltip_material').tooltipster({
	maxWidth: 275,
	side: 'bottom',
	trigger: 'custom',
	triggerOpen: {
		mouseenter: true,
		touchstart: true,
		click: true
	},
	triggerClose: {
		mouseleave: true,
		originClick: true
		// touchleave: true
	}
});

$('.tooltip').tooltipster({
	maxWidth: 275,
	side: 'bottom',
	trigger: 'custom',
	triggerOpen: {
		mouseenter: true,
		// touchstart: true,
		click: true
	},
	triggerClose: {
		mouseleave: true,
		originClick: true
		// touchleave: true
	}
});

$('.tooltip_tkani').tooltipster({
	maxWidth: 271,
	theme: 'tooltipster-shadow',
	side: 'bottom',
	interactive: true,
	// trigger: 'custom',
	// triggerOpen: {
	// 	mouseenter: true,
	// 	touchstart: true,
	// 	click: true
	// },
	// triggerClose: {
	// 	mouseleave: true,
	// 	originClick: true,
	// 	touchleave: true
	// },
	functionPosition: function (instance, helper, position) {
		if ($(window).width() > 715) {
			position.coord.left += 120;
			return position;
		} else {
			position.coord.left += 20;
			return position;
		}
	}
});

$('.tkani a').on('click', function () {
	var id = $(this).attr('href');
	console.log(id);
	if ($(window).width() > 767) {
		$('.detal-tab').find('input').removeClass('active');
		$('.detal-tab__content').removeClass('active');
		$('#tab2').addClass('active');
		$('#tab2-content').addClass('active').stop().slideDown();
	} else {
		$('.detal-tab').find('input').removeClass('active');
		$('.detal-tab__content').removeClass('active');
		$('#tab2_mob').addClass('active');
		$('#tab2_mob-content').addClass('active').stop().slideDown();
	};
	length_top = $(id).offset().top - 100;
	$('html,body').stop().animate({
		scrollTop: length_top
	}, 1000);
	e.preventDefault();
});

$('.detal__link').on('click', function () {
	var id = $(this).attr('href');
	if (id == '#more-color') {
		length_top = $(id).offset().top - 20;
		$('html,body').stop().animate({
			scrollTop: length_top
		}, 1000);
		e.preventDefault();
	}
});

ymaps.ready(init);

function init() {
	var myMap = new ymaps.Map("map", {
		center: [45.023800, 39.055820],
		zoom: 10,
		controls: []
	}, {
		searchControlProvider: 'yandex#search'
	});


	myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
		// balloonContent: 'цвет <strong>носика Гены</strong>',
		iconCaption: 'г. Краснодар, ул. Сормоская 3/2'
	}, {
		preset: 'islands#redIcon'
	});
	myMap.geoObjects
		.add(myPlacemark)
};

$('.map-address__main').on('click', function () {
	$('.map-address__more').toggleClass('active');
});

$.magnificPopup.open({
  items: {
  	src: '#feedback__good',
  	type: 'inline'
  }
});

$('.popup_detal-form__drop input[type="file"]').on('change', function (event, files, label) {
	var file_name = this.value.replace(/\\/g, '/').replace(/.*\//, '')
	$('.popup_detal-form__drop label').text(file_name);
});