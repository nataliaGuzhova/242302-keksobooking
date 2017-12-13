'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

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

    window.form.noticeForm.addEventListener('change', window.form.sync);
    var submit = document.querySelector('.form__submit');
    submit.addEventListener('click', window.form.validation);
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
    if (evt.keyCode === ENTER_KEYCODE) {
      window.card.openCardAd(evt);
    }
  }
})();
