'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');

  window.form = {
    noticeForm: noticeForm,
    sync:
      function (e) {
        syncInputs(e);
      },
    validation:
      function (e) {
        validation(e);
      },
    showPinAdress:
      function () {
        setPinAddress();
      }
  };

  function setPinAddress() {
    noticeForm.querySelector('#address').value = 'x: ' + window.pin.x + ', y: ' + window.pin.y;
  }

  function syncInputs(evt) {
    var inputValue = evt.target.value;
    var inputId = evt.target.id;

    switch (inputId) {
      case 'timein':
      case 'timeout':
        syncTimeInOut(inputId, inputValue);
        break;
      case 'type':
        syncTypeHouseMinPrice(inputValue);
        break;
      case 'room_number':
        syncRoomsGuests(inputValue);
        break;
    }
  }

  function syncTimeInOut(inputId, selectedTime) {
    var timeOut = 'timeout';
    var timeIn = 'timein';
    var timeId = timeIn;

    if (inputId === timeIn) {
      timeId = timeOut;
    }

    var selector = '#' + timeId;
    var time = document.querySelector(selector);
    time.value = selectedTime;
  }

  function syncTypeHouseMinPrice(selectedTypeHouse) {
    var inputPrice = document.querySelector('#price');

    switch (selectedTypeHouse) {
      case 'bungalo':
        inputPrice.min = '0';
        break;
      case 'flat':
        inputPrice.min = '1000';
        break;
      case 'house':
        inputPrice.min = '5000';
        break;
      case 'palace':
        inputPrice.min = '10000';
        break;
    }
  }
  // Количество комнат связано с количеством гостей:
  // 1 комната — «для одного гостя»
  // 2 комнаты — «для 2-х или 1-го гостя»
  // 3 комнаты — «для 2-х, 1-го или 3-х гостей»
  // 100 комнат — «не для гостей»
  function syncRoomsGuests(selectedNumbRooms) {
    var guests = document.querySelector('#capacity');

    switch (selectedNumbRooms) {
      case '1':
        guests.value = '1';
        setDisabled(guests, [0, 1, 3]);
        break;
      case '2':
        guests.value = '2';
        setDisabled(guests, [0, 3]);
        break;
      case '3':
        guests.value = '3';
        setDisabled(guests, [3]);
        break;
      case '100':
        guests.value = '0';
        setDisabled(guests, [0, 1, 2]);
        break;
    }
  }

  function setDisabled(input, value) {
    if (input.tagName === 'SELECT') {
      for (var j = 0; j < input.options.length; j++) {
        input.options[j].removeAttribute('hidden', '');
      }

      for (var i = 0; i < value.length; i++) {
        input.options[value[i]].setAttribute('hidden', '');
      }
    }
  }
  // валидация формы объявления
  function validation() {
    var inputs = noticeForm.elements;

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      if (!input.checkValidity()) {
        input.style.border = 'solid 2px rgb(255, 0, 0)';
      } else {
        input.style.border = 'none';
      }
    }
  }
})();
