'use strict';

var numbAds = 8;
var ads = createArrAds(numbAds);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

createMapPins(ads);

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
createCardAd(ads[getRandom(0, ads.length - 1)], map);

function createCardAd(ad, canvas) {  
    var fragment = document.createDocumentFragment();
    var beforeElement = document.querySelector('.map__filters-container');
    
    fragment.appendChild(renderCardAd(ad, mapCardTemplate));    
    canvas.insertBefore(fragment, beforeElement);
}

function renderCardAd(ad, mapCardTemplate) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('h3').textContent = ad.offer.title;
  mapCardElement.querySelector('small').textContent = ad.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = ad.offer.price.toString() + String.fromCharCode(8381) + '/ночь';
  mapCardElement.querySelector('h4').textContent = translateType(ad.offer.type);
  mapCardElement.querySelector('h4 + p').textContent = ad.offer.rooms.toString() + ' комнаты для ' + ad.offer.guests.toString() + ' гостей';
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  
  var list = mapCardElement.querySelectorAll('.feature');
  var liElement = document.createElement('li');
  liElement.classList.add('.features');

  for(var i = 0; i < list.length; i++) {
  mapCardElement.querySelector('.popup__features').removeChild(list[i]); 
}

 for (var i = 0; i < ad.offer.features.length; i++) {
    var liElement = document.createElement('li');
    liElement.classList.add('feature');

    switch(ad.offer.features[i]) {
      case 'wifi':
        liElement.classList.add('feature--wifi');
        mapCardElement.querySelector('.popup__features').appendChild(liElement);      
        break;
      case 'dishwasher':
        liElement.classList.add('feature--dishwasher');
        mapCardElement.querySelector('.popup__features').appendChild(liElement);    
        break;
      case 'parking':
        liElement.classList.add('feature--parking');
        mapCardElement.querySelector('.popup__features').appendChild(liElement);    
        break;
      case 'washer':
        liElement.classList.add('feature--washer');
        mapCardElement.querySelector('.popup__features').appendChild(liElement);    
        break;
      case 'elevator':
        liElement.classList.add('feature--elevator');
        mapCardElement.querySelector('.popup__features').appendChild(liElement);
        break;
      case 'conditioner':
        liElement.classList.add('feature--conditioner');
        mapCardElement.querySelector('.popup__features').appendChild(liElement);
        break;
    }
  }

  mapCardElement.querySelector('ul + p').TextContent = ad.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return mapCardElement;
  
}

function createMapPins(ads) {
  var canvas = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  
  for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderMapPin(ads[i]));
  }
  
  canvas.appendChild(fragment);
}

function renderMapPin(ad) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPinElement = mapPinTemplate.cloneNode(true);
    
    mapPinElement.style.left = ad.location.x.toString() + 'px';
    mapPinElement.style.top = ad.location.y.toString() + 'px';
    
    mapPinElement.querySelector('img').src = ad.author.avatar;
  
    return mapPinElement;
  }

function createArrAds(numbAds) {    
    var ads = [];
    
    for (var i = 0; i < numbAds; i++) {  
      ads[i] = createAd(i);
    }

    return ads;
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
      'x': getLocation (minX, maxX),
      'y': getLocation (minY, maxY),
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
    
    return Math.floor(Math.random() * (max + 1 - min)) + min;;
}

function getAvatar(i) {
  var src = 'img/avatars/user' + '0' + (i+1).toString() + '.png';

  return src;
}

function getFeatures () {
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var numb = getRandom(0, features.length);
    var selectFeatures = features.slice(numb);

    return selectFeatures;
}

  function getTitle() {
    var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

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

    switch(type) {
      case 'flat': 
        value =  types[0];
        break;
      case 'house': 
        value =  types[1];
        break;
      case 'bungalo': 
        value =  types[2];
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

  function getLocation (min, max) {
      return getRandom(min, max);
  }