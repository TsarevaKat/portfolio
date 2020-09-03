$('.reviews-slider').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	nextArrow: '.reviews-slider__next',
	prevArrow: '.reviews-slider__prev',
	responsive: [{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1
			}
		}
	]
});