  if ($('.map-menu').length) {
  	$(".map-menu").niceScroll({
  		cursorcolor: "#062f73",
  		background: "#F1F1F1",
  		cursorwidth: 10,
  		cursorborderradius: 100,
  		autohidemode: false,
  		cursorminheight: 26,
  		zindex: 1
    });
    setTimeout(scrollBar, 1100);
  };
function scrollBar(){
  $(".map-menu").getNiceScroll().resize();
};
  ymaps.ready(function () {
  	var myMap = new ymaps.Map('map', {
  			center: [55.751574, 37.573856],
  			zoom: 4,
  			controls: []
  		}, {
  			searchControlProvider: 'yandex#search'
  		}),
  		clusterer = new ymaps.Clusterer({
  			preset: 'islands#invertedNightClusterIcons',
  			/**
  			 * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
  			 */
  			groupByCoordinates: false
  		}),
  		getPointData = function () {
  			return {
  				balloonContentHeader: '<div class="balloon__header">Город</div>',
  				balloonContentBody: '<div class="balloon__body"><div> ул.Нарвская, 112</div><div><span> ТЦ «БАЛТИЙСКАЯ ГАЛЕРЕЯ» </span>, 4 этаж,</div></div>',
  				balloonContentFooter: '<div class="balloon__footer"><a href = "tel:89622504499">т.8(962)250-44-99</a></div>'
  			};
  		},
  		getPointOptions = function () {
  			return {
  				// Опции.
  				// Необходимо указать данный тип макета.
  				iconLayout: 'default#image',
  				// Своё изображение иконки метки.
  				iconImageHref: '/bitrix/templates/main/img/mark.png',
  				// iconImageHref: '../img/mark.png',
  				// Размеры метки.
  				iconImageSize: [28, 50],
  				// Смещение левого верхнего угла иконки относительно
  				// её "ножки" (точки привязки).
  				iconImageOffset: [-14, -50]
  				// balloonPanelMaxMapArea: 0
  			};
  		},
  		points = [
  			[46.347869, 48.033574],
  			[44.894965, 37.316170],
  			[44.997655, 41.129644],
  			[43.175598, 44.295621],
  			[42.821749, 47.115927],
  			[51.660781, 39.200269],
  			[43.317881, 45.695358],
  			[55.597475, 38.119802],
  			[48.320515, 40.268923],
  			[54.707390, 20.507307],
  			[55.103152, 38.752917],
  			[45.434686, 40.575994],
  			[51.730361, 36.192647],
  			[43.485259, 43.607072],
  			[44.723912, 37.768974],
  			[44.638287, 41.936061],
  			[47.222078, 39.720349],
  			[44.616604, 33.525369],
  		],
  		geoObjects = [];


  	for (var i = 0, len = points.length; i < len; i++) {
  		geoObjects[i] = new ymaps.Placemark(points[i], getPointData(), getPointOptions());
  	}
  	clusterer.add(geoObjects);
  	myMap.geoObjects.add(clusterer);

  	myMap.setBounds(clusterer.getBounds(), {
  		checkZoomRange: true
  	});

  	// myPlacemark.balloon.open();
  	$('.map-menu__item').on('click', function () {
  		if ($(this).hasClass('active')) {
  			$(this).removeClass('active');
  			$('.map-menu__item:not(.active)').each(function () {
  				$(this).css('color', '#003073');
  			});

  		} else {
  			$('.map-menu__item').each(function () {
  				$(this).removeClass('active');
  			});
  			$('.map-menu__item:not(.active)').each(function () {
  				$(this).css('color', '#5f6366');
  			});
  			$(this).addClass('active');
  			var coord = $(this).data("coord");
  			console.log(coord);
  			myMap.setZoom(10);
  			myMap.panTo(coord);

  			// $(this).find('.map-menu__block').slideDown();
  		}
  	});
  });

  function observeEvents(map) {
  	var mapEventsGroup;
  	map.geoObjects.each(function (geoObject) {
  		geoObject.balloon.events
  			// При открытии балуна начинаем слушать изменение центра карты.
  			.add('open', function (e1) {
  				var placemark = e1.get('target');
  				// Вызываем функцию в двух случаях:
  				mapEventsGroup = map.events.group()
  					// 1) в начале движения (если балун во внешнем контейнере);
  					.add('actiontick', function (e2) {
  						if (placemark.options.get('balloonPane') == 'outerBalloon') {
  							setBalloonPane(map, placemark, e2.get('tick'));
  						}
  					})
  					// 2) в конце движения (если балун во внутреннем контейнере).
  					.add('actiontickcomplete', function (e2) {
  						if (placemark.options.get('balloonPane') != 'outerBalloon') {
  							setBalloonPane(map, placemark, e2.get('tick'));
  						}
  					});
  				// Вызываем функцию сразу после открытия.
  				setBalloonPane(map, placemark);
  			})
  			// При закрытии балуна удаляем слушатели.
  			.add('close', function () {
  				mapEventsGroup.removeAll();
  			});
  	});
  }

  function setBalloonPane(map, placemark, mapData) {
  	mapData = mapData || {
  		globalPixelCenter: map.getGlobalPixelCenter(),
  		zoom: map.getZoom()
  	};

  	var mapSize = map.container.getSize(),
  		mapBounds = [
  			[mapData.globalPixelCenter[0] - mapSize[0] / 2, mapData.globalPixelCenter[1] - mapSize[1] / 2],
  			[mapData.globalPixelCenter[0] + mapSize[0] / 2, mapData.globalPixelCenter[1] + mapSize[1] / 2]
  		],
  		balloonPosition = placemark.balloon.getPosition(),
  		// Используется при изменении зума.
  		zoomFactor = Math.pow(2, mapData.zoom - map.getZoom()),
  		// Определяем, попадает ли точка привязки балуна в видимую область карты.
  		pointInBounds = ymaps.util.pixelBounds.containsPoint(mapBounds, [
  			balloonPosition[0] * zoomFactor,
  			balloonPosition[1] * zoomFactor
  		]),
  		isInOutersPane = placemark.options.get('balloonPane') == 'outerBalloon';

  	// Если точка привязки не попадает в видимую область карты, переносим балун во внутренний контейнер
  	if (!pointInBounds && isInOutersPane) {
  		placemark.options.set({
  			balloonPane: 'balloon',
  			balloonShadowPane: 'shadows'
  		});
  		// и наоборот.
  	} else if (pointInBounds && !isInOutersPane) {
  		placemark.options.set({
  			balloonPane: 'outerBalloon',
  			balloonShadowPane: 'outerBalloon'
  		});
  	}
  };

  ymaps.ready(function () {
  	var myMap = new ymaps.Map('map-franchising', {
  			center: [55.751574, 37.573856],
  			zoom: 4,
  			controls: []
  		}, {
  			searchControlProvider: 'yandex#search'
  		}),
  		clusterer = new ymaps.Clusterer({
  			preset: 'islands#invertedNightClusterIcons',
  			/**
  			 * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
  			 */
  			groupByCoordinates: false
  		}),
  		getPointData = function () {
  			return {
  				balloonContentHeader: '<div class="balloon__header">Город</div>',
  				balloonContentBody: '<div class="balloon__body"><div> ул.Нарвская, 112</div><div><span> ТЦ «БАЛТИЙСКАЯ ГАЛЕРЕЯ» </span>, 4 этаж,</div></div>',
  				balloonContentFooter: '<div class="balloon__footer"><a href = "tel:89622504499">т.8(962)250-44-99</a></div>'
  			};
  		},
  		getPointOptions = function () {
  			return {
  				// Опции.
  				// Необходимо указать данный тип макета.
  				iconLayout: 'default#image',
  				// Своё изображение иконки метки.
  				iconImageHref: '/bitrix/templates/main/img/mark.png',
  				// iconImageHref: '../img/mark.png',
  				// Размеры метки.
  				iconImageSize: [28, 50],
  				// Смещение левого верхнего угла иконки относительно
  				// её "ножки" (точки привязки).
  				iconImageOffset: [-14, -50]
  				// balloonPanelMaxMapArea: 0
  			};
  		},
  		points = [
  			[46.347869, 48.033574],
  			[44.894965, 37.316170],
  			[44.997655, 41.129644],
  			[43.175598, 44.295621],
  			[42.821749, 47.115927],
  			[51.660781, 39.200269],
  			[43.317881, 45.695358],
  			[55.597475, 38.119802],
  			[48.320515, 40.268923],
  			[54.707390, 20.507307],
  			[55.103152, 38.752917],
  			[45.434686, 40.575994],
  			[51.730361, 36.192647],
  			[43.485259, 43.607072],
  			[44.723912, 37.768974],
  			[44.638287, 41.936061],
  			[47.222078, 39.720349],
  			[44.616604, 33.525369],
  		],
  		geoObjects = [];


  	for (var i = 0, len = points.length; i < len; i++) {
  		geoObjects[i] = new ymaps.Placemark(points[i], getPointData(), getPointOptions());
  	}
  	clusterer.add(geoObjects);
  	myMap.geoObjects.add(clusterer);

  	myMap.setBounds(clusterer.getBounds(), {
  		checkZoomRange: true
  	});

  	// myPlacemark.balloon.open();
  	$('.map-menu__item').on('click', function () {
  		if ($(this).hasClass('active')) {
  			$(this).removeClass('active');
  			$('.map-menu__item:not(.active)').each(function () {
  				$(this).css('color', '#003073');
  			});

  		} else {
  			$('.map-menu__item').each(function () {
  				$(this).removeClass('active');
  			});
  			$('.map-menu__item:not(.active)').each(function () {
  				$(this).css('color', '#5f6366');
  			});
  			$(this).addClass('active');
  			var coord = $(this).data("coord");
  			console.log(coord);
  			myMap.setZoom(10);
  			myMap.panTo(coord);

  			// $(this).find('.map-menu__block').slideDown();
  		}
  	});
  });

  function observeEvents(map) {
  	var mapEventsGroup;
  	map.geoObjects.each(function (geoObject) {
  		geoObject.balloon.events
  			// При открытии балуна начинаем слушать изменение центра карты.
  			.add('open', function (e1) {
  				var placemark = e1.get('target');
  				// Вызываем функцию в двух случаях:
  				mapEventsGroup = map.events.group()
  					// 1) в начале движения (если балун во внешнем контейнере);
  					.add('actiontick', function (e2) {
  						if (placemark.options.get('balloonPane') == 'outerBalloon') {
  							setBalloonPane(map, placemark, e2.get('tick'));
  						}
  					})
  					// 2) в конце движения (если балун во внутреннем контейнере).
  					.add('actiontickcomplete', function (e2) {
  						if (placemark.options.get('balloonPane') != 'outerBalloon') {
  							setBalloonPane(map, placemark, e2.get('tick'));
  						}
  					});
  				// Вызываем функцию сразу после открытия.
  				setBalloonPane(map, placemark);
  			})
  			// При закрытии балуна удаляем слушатели.
  			.add('close', function () {
  				mapEventsGroup.removeAll();
  			});
  	});
  }

  function setBalloonPane(map, placemark, mapData) {
  	mapData = mapData || {
  		globalPixelCenter: map.getGlobalPixelCenter(),
  		zoom: map.getZoom()
  	};

  	var mapSize = map.container.getSize(),
  		mapBounds = [
  			[mapData.globalPixelCenter[0] - mapSize[0] / 2, mapData.globalPixelCenter[1] - mapSize[1] / 2],
  			[mapData.globalPixelCenter[0] + mapSize[0] / 2, mapData.globalPixelCenter[1] + mapSize[1] / 2]
  		],
  		balloonPosition = placemark.balloon.getPosition(),
  		// Используется при изменении зума.
  		zoomFactor = Math.pow(2, mapData.zoom - map.getZoom()),
  		// Определяем, попадает ли точка привязки балуна в видимую область карты.
  		pointInBounds = ymaps.util.pixelBounds.containsPoint(mapBounds, [
  			balloonPosition[0] * zoomFactor,
  			balloonPosition[1] * zoomFactor
  		]),
  		isInOutersPane = placemark.options.get('balloonPane') == 'outerBalloon';

  	// Если точка привязки не попадает в видимую область карты, переносим балун во внутренний контейнер
  	if (!pointInBounds && isInOutersPane) {
  		placemark.options.set({
  			balloonPane: 'balloon',
  			balloonShadowPane: 'shadows'
  		});
  		// и наоборот.
  	} else if (pointInBounds && !isInOutersPane) {
  		placemark.options.set({
  			balloonPane: 'outerBalloon',
  			balloonShadowPane: 'outerBalloon'
  		});
  	}
  };