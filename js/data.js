'use strict';

(function () {
  var numbAds = 8;

  window.data = {
    arrayAds: createArrAds(numbAds)
  };

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
      author: {
        avatar: getAvatar(i),
      },
      location: {
        x: getLocation(minX, maxX),
        y: getLocation(minY, maxY),
      },
      offer: {
        title: getTitle(),
        price: getPrice(),
        type: getType(),
        rooms: getRooms(),
        guests: getGuests(),
        checkin: getChecks(),
        checkout: getChecks(),
        features: getFeatures(),
        description: '',
        photos: []
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

    return titles[getRandom(0, titles.length - 1)].toString();
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

})();
