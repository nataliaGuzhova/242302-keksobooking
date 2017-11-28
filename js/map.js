'use strict';

var numbAds = 8;
var ads = createArrAds(numbAds);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

createMapPins(ads);

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
createCardsAd(ads);

function createCardsAd(ads) {    
    var fragment = document.createDocumentFragment();
    var map = document.querySelector('.map');
    var beforeElement = document.querySelector('.map__filters-container');
    
    for (var i = 0; i < ads.length; i++) {
        fragment.appendChild(renderCardAd(ads[i], mapCardTemplate));
    }

    map.insertBefore(fragment, beforeElement);
    // [В] Не понимаю в чем ошибка, fragment приходит с измененными значениями, но после вставки все обнуляется и отображается шаблонное. ПОЧЕМУ????
}

function renderCardAd(ad, mapCardTemplate) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('h3').TextContent = ad.offer.title;
  mapCardElement.querySelector('small').TextContent = ad.offer.address;
  mapCardElement.querySelector('.popup__price').TextContent = ad.offer.price.toString + '&#x20bd;/ночь';
  mapCardElement.querySelector('h4').TextContent = translateType(ad.offer.type);
  mapCardElement.querySelector('h4 + p').TextContent = ad.offer.rooms.toString + ' комнаты для ' + ad.offer.guests.toString + ' гостей';
  mapCardElement.querySelector('h4 ~ p').TextContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  
//   var list = mapCardElement.querySelectorAll('.feature');
//   for (var j=0; j < list.length; j++)
//   {list[j].classList.add('hidden');}
//   for (var i = 0; i < ad.offer.features.length; i++) {
//     switch(ad.offer.features[i]) {
//     case 'wifi':
//       mapCardElement.querySelector('.feature--wifi').classList.remove('hidden');
//       break;
//     case 'dishwasher':
//       mapCardElement.querySelector('.feature--dishwasher').classList.remove('hidden');
//       break;
//     case 'parking':
//       mapCardElement.querySelector('.feature--parking').classList.remove('hidden');
//       break;
//     case 'washer':
//       mapCardElement.querySelector('.feature--washer').classList.remove('hidden');
//       break;
//     case 'elevator':
//       mapCardElement.querySelector('.feature--elevator').classList.remove('hidden');
//       break;
//     case 'conditioner':
//       mapCardElement.querySelector('.feature--conditioner').classList.remove('hidden');
//       break;
//     default: 
//       mapCardElement.querySelector('.feature').classList.add('hidden');
//     }
//   }

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

  function getTitle(i) {
    var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 
    'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 
    'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

    return titles[i];
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
    var value = 'неизвестно';

    switch(type) {
      case 'flat': 
        value =  types[1];
        break;
      case 'house': 
        value =  types[2];
        break;
      case 'bungalo': 
        value =  types[3];
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
    var minGuests = 100;

    return getRandom(minGuests, minGuests);
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