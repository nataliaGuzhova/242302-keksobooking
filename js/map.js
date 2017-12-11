'use strict';


// В момент открытия, страница должна находиться в следующем состоянии: карта затемнена 
// (добавлен класс map--faded) и форма неактивна
//  (добавлен класс notice__form--disabled и все поля формы недоступны, disabled)
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var mapPinMain = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var map = document.querySelector('.map');
var numbAds = 8;
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var ads = createArrAds(numbAds);

mapPinMain.addEventListener('mouseup', onMapPinMouseup);

// module4-tak1
function onMapPinMouseup() {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');

  createMapPins(ads);
  var mapPins = document.querySelectorAll('.map__pin');

  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].addEventListener('click', onMapPinClick);
    mapPins[i].addEventListener('keydown', onMapPinEnter);
  }
}

document.addEventListener('click', onButtonCloseClick);

// Первым шагом отключите показ по умолчанию первой карточки из набора объявлений
// При нажатии на любой из элементов .map__pin ему должен добавляться класс 
// map__pin--active и должен показываться элемент .popup
// Если до этого у другого элемента существовал класс pin--active, 
// то у этого элемента класс нужно убрать
// При нажатии на элемент .popup__close карточка объявления должна скрываться. 
// При этом должен деактивироваться элемент .map__pin, который был помечен 
// как активный

function onMapPinClick(evt) {
  openPopupCardAd(evt);
}

function onMapPinEnter(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopupCardAd(evt);
  }
}

function onButtonCloseClick(evt) {
  var target = evt.target;
  if (target.tagName === 'BUTTON' && target.className === 'popup__close') {
    closePopupCardAd(evt);
  }
}

function onButtonCloseEsc(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopupOnKeyboard();
  }
}

function onButtonCloseEnter(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopupOnKeyboard();
  }
}

function closePopupOnKeyboard() {
  hideElement(document.querySelector('article.popup:not(.hidden)'));
  removeActiveFlag();
}

function openPopupCardAd(evt) {
  var elem = evt.target.parentNode;
  removeActiveFlag();
  closePopup();

  if (elem.tagName === 'BUTTON') {
    elem.classList.add('map__pin--active');
  }

  createCardAd(ads[getRandom(0, ads.length - 1)], map);
  elem.addEventListener('keydown', onButtonCloseEsc);
  elem.addEventListener('keydown', onButtonCloseEnter);
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

  сardTemplate.querySelector('ul + p').TextContent = ad.offer.description;
  сardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;

  return сardTemplate;
}

function createMapPins(arrAds) {
  var canvas = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrAds.length; i++) {
    fragment.appendChild(renderMapPin(arrAds[i]));
  }

  canvas.appendChild(fragment);
}

function renderMapPin(ad) {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = ad.location.x.toString() + 'px';
  mapPinElement.style.top = ad.location.y.toString() + 'px';

  mapPinElement.querySelector('img').src = ad.author.avatar;

  // для задания на обработку событий добавляем табиндекс
  mapPinElement.setAttribute('tabindex', '0');

  return mapPinElement;
}

function createArrAds(numberAds) {
  var arrayAds = [];

  for (var i = 0; i < numberAds; i++) {
    arrayAds[i] = createAd(i);
  }

  return arrayAds;
}

function createAd(i) {
  var maxX = 900;
  var maxY = 500;
  var minX = 300;
  var minY = 100;

  var ad = {
    'author': {
      'avatar': getAvatar(i),
    },
    'location': {
      'x': getLocation(minX, maxX),
      'y': getLocation(minY, maxY),
    },
    'offer': {
      'title': getTitle(i),
      'price': getPrice(),
      'type': getType(),
      'rooms': getRooms(),
      'guests': getGuests(),
      'checkin': getChecks(),
      'checkout': getChecks(),
      'features': getFeatures(),
      'description': '',
      'photos': []
    },
  };

  ad.offer.address = ad.location.x + ',' + ad.location.y;

  return ad;
}

function getRandom(min, max) {

  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getAvatar(i) {
  var src = 'img/avatars/user' + '0' + (i + 1).toString() + '.png';

  return src;
}

function getFeatures() {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var numb = getRandom(0, features.length);
  var selectFeatures = features.slice(numb);

  return selectFeatures;
}

function getTitle() {
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  return titles[getRandom(0, titles.length - 1)];
}

function getPrice() {
  var maxPrice = 1000000;
  var minPrice = 1000;

  return getRandom(minPrice, maxPrice);
}

function getType() {
  var types = ['flat', 'house', 'bungalo'];
  var numbTypes = types.length - 1;
  var type = types[getRandom(0, numbTypes)];

  return type;
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

function getRooms() {
  var maxRooms = 5;
  var minRooms = 0;

  return getRandom(minRooms, maxRooms);
}

function getGuests() {
  var minGuests = 1;
  var maxGuests = 100;

  return getRandom(minGuests, maxGuests);
}

function getChecks() {
  var checks = ['12:00', '13:00', '14:00'];
  var maxVal = checks.length - 1;
  var checkTime = checks[getRandom(0, maxVal)];

  return checkTime;
}

function getLocation(min, max) {
  return getRandom(min, max);
}
