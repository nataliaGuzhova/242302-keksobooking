'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var MAX_LEFT_OFFSET = 300;
  var MAX_RIGHT_OFFSET = 900;
  var MAX_TOP_OFFSET = 100;
  var MAX_BOTTOM_OFFSET = 500;
  var mouseStartCoords;
  var pinSize;

  window.pin = { };

  mainPin.addEventListener('mouseup', onMapPinMouseup);

  function onMapPinCapture(evt) {
    evt.preventDefault();

    mouseStartCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    pinSize = {
      height: mainPin.offsetHeight,
      halfWidth: Math.floor(mainPin.offsetWidth / 2)
    };

    document.addEventListener('mousemove', onMapPinMove);
    document.addEventListener('mouseup', onMapPinDrop);
  }

  function onMapPinMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: mouseStartCoords.x - moveEvt.clientX,
      y: mouseStartCoords.y - moveEvt.clientY
    };

    mouseStartCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var endY = mainPin.offsetTop - shift.y;

    if (endY < MAX_TOP_OFFSET) {
      mainPin.style.top = MAX_TOP_OFFSET + 'px';
    } else if (endY > MAX_BOTTOM_OFFSET) {
      mainPin.style.top = MAX_BOTTOM_OFFSET + 'px';
    } else {
      mainPin.style.top = endY + 'px';
    }

    var endX = mainPin.offsetLeft - shift.x;

    if (endX < MAX_LEFT_OFFSET) {
      mainPin.style.top = MAX_LEFT_OFFSET + 'px';
    } else if (endX > MAX_RIGHT_OFFSET) {
      mainPin.style.top = MAX_RIGHT_OFFSET + 'px';
    } else {
      mainPin.style.left = endX + 'px';
    }

    var pointerX = parseInt(mainPin.style.left, 10) + pinSize.halfWidth;
    var pointerY = parseInt(mainPin.style.top, 10) + pinSize.height;

    window.pin.x = pointerX;
    window.pin.y = pointerY;
  }

  function onMapPinDrop(dropEvt) {
    dropEvt.preventDefault();

    document.removeEventListener('mousemove', onMapPinMove);
    document.removeEventListener('mouseup', onMapPinDrop);

    window.form.showPinAdress();
  }

  function onMapPinMouseup() {
    window.map.map.classList.remove('map--faded');
    window.form.noticeForm.classList.remove('notice__form--disabled');

    createMapPins(window.data.arrayAds);
    var mapPins = document.querySelectorAll('.map__pin');

    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', onMapPinClick);
      mapPins[i].addEventListener('keydown', onMapPinEnter);
    }

    window.form.noticeForm.addEventListener('change', window.form.sync);
    var submit = document.querySelector('.form__submit');
    submit.addEventListener('click', window.form.validation);

    mainPin.addEventListener('mousedown', onMapPinCapture);
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
