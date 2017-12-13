'use strict';

(function () {
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.card = {
    openCardAd: function (e) {
      openPopupCardAd(e);
    }
  };

  document.addEventListener('click', onButtonCloseClick);

  function openPopupCardAd(evt) {
    var elem = evt.target.parentNode;
    var avatarNumber = 1;

    removeActiveFlag();
    closePopup();

    if (elem.tagName === 'BUTTON') {
      elem.classList.add('map__pin--active');
    }

    if (elem.hasAttribute('data-userNumber')) {
      avatarNumber = parseInt(elem.getAttribute('data-userNumber'), 10);
    }

    if (!elem.classList.contains('map__pin--main')) {
      createCardAd(window.data.arrayAds[avatarNumber - 1], window.map.map);
      elem.addEventListener('keydown', onButtonCloseEsc);
      elem.addEventListener('keydown', onButtonCloseEnter);
    }
  }
  // module3-tak1
  function createCardAd(ad, canvas) {
    var fragment = document.createDocumentFragment();
    var beforeElement = document.querySelector('.map__filters-container');

    fragment.appendChild(renderCardAd(ad, mapCardTemplate));
    fragment.querySelector('.popup__close').setAttribute('tabindex', '0');
    canvas.insertBefore(fragment, beforeElement);
  }

  function renderCardAd(ad, template) {
    var сardTemplate = template.cloneNode(true);

    сardTemplate.querySelector('h3').textContent = ad.offer.title;
    сardTemplate.querySelector('small').textContent = ad.offer.address;
    сardTemplate.querySelector('.popup__price').textContent = ad.offer.price.toString() + String.fromCharCode(8381) + '/ночь';
    сardTemplate.querySelector('h4').textContent = translateType(ad.offer.type);
    сardTemplate.querySelector('h4 + p').textContent = ad.offer.rooms.toString() + ' комнаты для ' + ad.offer.guests.toString() + ' гостей';
    сardTemplate.querySelector('h4 + p + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var list = сardTemplate.querySelectorAll('.feature');

    for (var j = 0; j < list.length; j++) {
      сardTemplate.querySelector('.popup__features').removeChild(list[j]);
    }

    for (var i = 0; i < ad.offer.features.length; i++) {
      var liElement = document.createElement('li');
      liElement.classList.add('feature');

      switch (ad.offer.features[i]) {
        case 'wifi':
          liElement.classList.add('feature--wifi');
          break;
        case 'dishwasher':
          liElement.classList.add('feature--dishwasher');
          break;
        case 'parking':
          liElement.classList.add('feature--parking');
          break;
        case 'washer':
          liElement.classList.add('feature--washer');
          break;
        case 'elevator':
          liElement.classList.add('feature--elevator');
          break;
        case 'conditioner':
          liElement.classList.add('feature--conditioner');
          break;
      }
      сardTemplate.querySelector('.popup__features').appendChild(liElement);
    }

    сardTemplate.querySelector('ul + p').textContent = ad.offer.description;
    сardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;

    return сardTemplate;
  }

  function translateType(type) {
    var types = ['Квартира', 'Дом', 'Бунгало'];
    var value = '';

    switch (type) {
      case 'flat':
        value = types[0];
        break;
      case 'house':
        value = types[1];
        break;
      case 'bungalo':
        value = types[2];
        break;
    }

    return value;
  }

  function closePopupCardAd(evt) {
    hideElement(evt.target.parentNode);
    removeActiveFlag();
  }

  function removeActiveFlag() {
    var preventActiveElment = document.querySelector('.map__pin--active');
    if (preventActiveElment) {
      preventActiveElment.classList.remove('map__pin--active');
    }
  }

  function closePopup() {
    hideElement(document.querySelector('article.popup:not(.hidden)'));
  }

  function hideElement(element) {
    if (element) {
      element.classList.add('hidden');
    }
  }

  function closePopupOnKeyboard() {
    hideElement(document.querySelector('article.popup:not(.hidden)'));
    removeActiveFlag();
  }

  function onButtonCloseClick(evt) {
    var target = evt.target;
    if (target.tagName === 'BUTTON' && target.className === 'popup__close') {
      closePopupCardAd(evt);
    }
  }

  function onButtonCloseEsc(evt) {
    if (evt.keyCode === window.constants.esc) {
      closePopupOnKeyboard();
    }
  }

  function onButtonCloseEnter(evt) {
    if (evt.keyCode === window.constants.enter) {
      closePopupOnKeyboard();
    }
  }
})();
