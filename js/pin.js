'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var MAX_TOP_OFFSET = 100;
  var MAX_BOTTOM_OFFSET = 500;
  var MAX_LEFT_OFFSET = 1200;
  var MAX_RIGHT_OFFSET = 0;
  var pinSize = {
    height: mainPin.offsetHeight,
    halfWidth: Math.floor(mainPin.offsetWidth / 2)
  };

  window.pin = { };

  mainPin.addEventListener('mouseup', onMapPinMouseup);

  function onMapPinMouseup() {
    window.map.map.classList.remove('map--faded');
    window.form.noticeForm.classList.remove('notice__form--disabled');

    createMapPins(window.data.arrayAds);
    var mapPins = document.querySelectorAll('.map__pin');

    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', onMapPinClick);
      mapPins[i].addEventListener('keydown', onMapPinEnter);
    }

    getPinCoords();
    window.form.showPinAdress();

    window.form.noticeForm.addEventListener('change', window.form.sync);
    var submit = document.querySelector('.form__submit');
    submit.addEventListener('click', window.form.validation);

    mainPin.addEventListener('mousedown', onMapPinStartDrag);
  }

  var shift = {};

  function onMapPinStartDrag(evt) {
    evt.preventDefault();

    shift = {
      // pageX координата относительно документа (с учетом прокрутки) 
      x: evt.pageX - window.pin.x,
      y: evt.pageY - window.pin.y
    };

    document.addEventListener('mousemove', onMapPinMove);
    document.addEventListener('mouseup', onMapPinEndDrag);
  }

  function onMapPinMove(moveEvt) {
    moveEvt.preventDefault();

    var endY = moveEvt.pageY - shift.y;
    var endX = moveEvt.pageX - shift.x;

    if (endY < MAX_TOP_OFFSET) {
      mainPin.style.top = MAX_TOP_OFFSET + 'px';
    } else if (endY > MAX_BOTTOM_OFFSET) {
      mainPin.style.top = MAX_BOTTOM_OFFSET + 'px';
    } else {
      mainPin.style.top = endY + 'px';
    }

    if (endX < MAX_RIGHT_OFFSET - pinSize.halfWidth) {
      mainPin.style.left = MAX_RIGHT_OFFSET + 'px';
    } else if (endX > MAX_LEFT_OFFSET - pinSize.halfWidth) {
      mainPin.style.left = MAX_LEFT_OFFSET + 'px';
    } else {
      mainPin.style.left = endX + 'px';
    }

    getPinCoords();
    window.form.showPinAdress();
  }

  function getPinCoords() {
    // top и left даются относительно верхнего левого угла порта просмотра + скролл + размер эл-та
    window.pin.x = mainPin.getBoundingClientRect().left + pageXOffset + pinSize.halfWidth;
    window.pin.y = mainPin.getBoundingClientRect().top + pageYOffset + pinSize.height;
  }

  function onMapPinEndDrag(dropEvt) {
    dropEvt.preventDefault();

    document.removeEventListener('mousemove', onMapPinMove);
    document.removeEventListener('mouseup', onMapPinEndDrag);
  }

  function createMapPins(arrAds) {
    var canvas = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrAds.length; i++) {
      fragment.appendChild(renderMapPin(arrAds[i], i));
    }

    canvas.appendChild(fragment);
  }

  function renderMapPin(ad, userNumber) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = ad.location.x.toString() + 'px';
    mapPinElement.style.top = ad.location.y.toString() + 'px';

    mapPinElement.querySelector('img').src = ad.author.avatar;

    // для задания на обработку событий добавляем табиндекс
    mapPinElement.setAttribute('tabindex', '0');
    mapPinElement.setAttribute('data-userNumber', (userNumber + 1).toString());

    return mapPinElement;
  }

  function onMapPinClick(evt) {
    window.card.openCardAd(evt);
  }

  function onMapPinEnter(evt) {
    if (evt.keyCode === window.constants.enter) {
      window.card.openCardAd(evt);
    }
  }
})();
