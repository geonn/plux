var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'myHealth/healthDataBloodPressure';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.healthDBPWin = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Add Data", backButtonTitle: "", id: "healthDBPWin", navTintColor: "#CE1D1C" });

  $.__views.healthDBPWin && $.addTopLevelView($.__views.healthDBPWin);
  $.__views.__alloyId763 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId763" });

  $.__views.saveButton = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ADADAD", width: Ti.UI.FILL, touchEnabled: false, id: "saveButton", title: "Save", right: 0 });

  $.__views.__alloyId763.add($.__views.saveButton);
  doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;$.__views.healthDBPWin.rightNavButton = $.__views.__alloyId763;$.__views.main = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical", backgroundColor: "#F6F6F6", height: "100%" });

  $.__views.healthDBPWin.add($.__views.main);
  if (true) {
    $.__views.__alloyId764 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId764" });

    $.__views.main.add($.__views.__alloyId764);
    $.__views.__alloyId765 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId765" });

    $.__views.__alloyId764.add($.__views.__alloyId765);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId765.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "60%" });

    $.__views.__alloyId764.add($.__views.pageTitle);
    $.__views.__alloyId766 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Add Data', textAlign: "center", id: "__alloyId766" });

    $.__views.pageTitle.add($.__views.__alloyId766);
    $.__views.__alloyId767 = Ti.UI.createView(
    { borderWidth: 0, width: "20%", id: "__alloyId767" });

    $.__views.__alloyId764.add($.__views.__alloyId767);
    $.__views.saveButton = Ti.UI.createButton(
    { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#000", width: Ti.UI.FILL, font: { fontSize: "10dp" }, touchEnabled: false, id: "saveButton", title: "Save", right: 0 });

    $.__views.__alloyId767.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;}
  $.__views.__alloyId768 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", height: 30, top: 10, id: "__alloyId768" });

  $.__views.main.add($.__views.__alloyId768);
  $.__views.description = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#878686", text: "Please fill in your information below", id: "description" });

  $.__views.__alloyId768.add($.__views.description);
  $.__views.table = Ti.UI.createView(
  { borderWidth: 0, id: "table", height: Ti.UI.SIZE, top: 10, backgroundColor: "#ffffff", layout: "vertical", scrollable: false });

  $.__views.main.add($.__views.table);
  $.__views.__alloyId769 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId769" });

  $.__views.table.add($.__views.__alloyId769);
  $.__views.__alloyId770 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff", id: "__alloyId770" });

  $.__views.table.add($.__views.__alloyId770);
  showDatePicker ? $.addListener($.__views.__alloyId770, 'click', showDatePicker) : __defers['$.__views.__alloyId770!click!showDatePicker'] = true;$.__views.__alloyId771 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", textAlign: "right", id: "__alloyId771" });

  $.__views.__alloyId770.add($.__views.__alloyId771);
  $.__views.__alloyId772 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Date", top: 12, id: "__alloyId772" });

  $.__views.__alloyId771.add($.__views.__alloyId772);
  $.__views.date_value = Ti.UI.createLabel(
  { width: "80%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "date_value", textAlign: "right" });

  $.__views.__alloyId771.add($.__views.date_value);
  $.__views.__alloyId773 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId773" });

  $.__views.table.add($.__views.__alloyId773);
  $.__views.__alloyId774 = Ti.UI.createView(
  { borderWidth: 0, selectedBackgroundColor: "#ffffff", height: Ti.UI.SIZE, id: "__alloyId774" });

  $.__views.table.add($.__views.__alloyId774);
  showTimePicker ? $.addListener($.__views.__alloyId774, 'click', showTimePicker) : __defers['$.__views.__alloyId774!click!showTimePicker'] = true;$.__views.__alloyId775 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", id: "__alloyId775" });

  $.__views.__alloyId774.add($.__views.__alloyId775);
  $.__views.__alloyId776 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Time", top: 12, id: "__alloyId776" });

  $.__views.__alloyId775.add($.__views.__alloyId776);
  $.__views.time_value = Ti.UI.createLabel(
  { width: "80%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "time_value", textAlign: "right" });

  $.__views.__alloyId775.add($.__views.time_value);
  $.__views.__alloyId777 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId777" });

  $.__views.table.add($.__views.__alloyId777);
  $.__views.tvrField1 = Ti.UI.createView(
  { borderWidth: 0, id: "tvrField1", height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrField1);
  $.__views.__alloyId778 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 55, width: "100%", id: "__alloyId778" });

  $.__views.tvrField1.add($.__views.__alloyId778);
  $.__views.__alloyId779 = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Systolic (mm Hg)", top: 12, id: "__alloyId779" });

  $.__views.__alloyId778.add($.__views.__alloyId779);
  $.__views.field1 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", id: "field1", top: 5, bottom: 5, right: 5, borderColor: "#ffffff", textAlign: "right", value: "", keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD });

  $.__views.__alloyId778.add($.__views.field1);
  $.__views.__alloyId780 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId780" });

  $.__views.table.add($.__views.__alloyId780);
  $.__views.tvrField2 = Ti.UI.createView(
  { borderWidth: 0, id: "tvrField2", height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrField2);
  $.__views.__alloyId781 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 55, width: "100%", id: "__alloyId781" });

  $.__views.tvrField2.add($.__views.__alloyId781);
  $.__views.__alloyId782 = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Diastolic (mm Hg)", top: 12, id: "__alloyId782" });

  $.__views.__alloyId781.add($.__views.__alloyId782);
  $.__views.field2 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", id: "field2", top: 5, bottom: 5, right: 5, borderColor: "#ffffff", textAlign: "right", value: "", keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD });

  $.__views.__alloyId781.add($.__views.field2);
  $.__views.selectorView = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, id: "selectorView", bottom: 0 });

  $.__views.main.add($.__views.selectorView);
  $.__views.datePicker = Ti.UI.createPicker(
  { format24: false, calendarViewShown: false, id: "datePicker", type: Ti.UI.PICKER_TYPE_DATE, visible: false });

  $.__views.selectorView.add($.__views.datePicker);
  changeDate ? $.addListener($.__views.datePicker, 'change', changeDate) : __defers['$.__views.datePicker!change!changeDate'] = true;$.__views.timePicker = Ti.UI.createPicker(
  { format24: false, calendarViewShown: false, id: "timePicker", type: Ti.UI.PICKER_TYPE_TIME, visible: false });

  $.__views.selectorView.add($.__views.timePicker);
  changeTime ? $.addListener($.__views.timePicker, 'change', changeTime) : __defers['$.__views.timePicker!change!changeTime'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var formType = 2;
  var lib_health = Alloy.createCollection('health');
  var hd = require('healthData');

  hd.construct($);
  hd.todayDate();
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var yyyy = today.getFullYear();

  function hideKeyboard() {
    $.field1.blur();
    $.field2.blur();
  }

  function showDatePicker(e) {
    if (true) {
      var datePicker = Ti.UI.createPicker({
        type: Ti.UI.PICKER_TYPE_DATE,
        minDate: new Date(1930, 0, 1),
        maxDate: new Date(yyyy, mm, dd),
        id: "datePicker",
        visible: false });

      datePicker.showDatePickerDialog({
        value: new Date(yyyy, parseInt(mm), dd),
        callback: function (e) {
          if (e.cancel) {} else {
            changeDate(e);
          }
        } });

    } else {
      hd.showDatePicker({ date: $.datePicker, time: $.timePicker });
    }
    hideKeyboard();
  }

  function showTimePicker(e) {
    if (true) {
      var timePicker = Ti.UI.createPicker({
        type: Ti.UI.PICKER_TYPE_TIME,
        id: "timePicker",
        visible: false });

      timePicker.showTimePickerDialog({

        callback: function (e) {
          if (e.cancel) {} else {
            changeTime(e);
          }
        } });

    } else {
      hd.showTimePicker({ date: $.datePicker, time: $.timePicker });
    }
    hideKeyboard();
  }

  function changeDate(e) {
    hd.changeDate({ date: e.value });
  }

  function changeTime(e) {
    hd.changeTime({ time: e.value });
  }

  $.field2.addEventListener('change', function (e) {

    var field2 = $.field2.value;
    if (e.value != "" && field2 != "") {
      hd.enableSaveButton();
    } else {
      hd.disableSaveButton();
    }
  });

  $.field1.addEventListener('change', function (e) {
    var field1 = $.field1.value;
    if (e.value != "" && field1 != "") {
      hd.enableSaveButton();
    } else {
      hd.disableSaveButton();
    }
  });

  $.tvrField1.addEventListener('click', function () {
    $.field1.focus();
  });

  $.tvrField2.addEventListener('click', function () {
    $.field2.focus();
  });

  function doSaveRecords() {
    var date = $.date_value.text;
    var time = $.time_value.text;
    var field1 = $.field1.value;
    var field2 = $.field2.value;
    var s_date = date.split('/');
    var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];


    var amount = (2 * parseInt(field2) + parseInt(field1)) / 3;
    var s_time = time.split(' ');
    var newTime = s_time[0];
    if (s_time[1] == "PM") {
      hm = newTime.split(':');
      newTime = parseInt(hm[0]) + 12 + ":" + hm[1];
    }

    lib_health.addHealthData({
      date: newDate,
      time: newTime,
      field1: field1,
      field2: field2,
      amount: amount.toFixed(2),
      type: formType },
    function () {
      hd.loadInfo(formType);
    });
    nav.closeWindow($.healthDBPWin);
  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.healthDBPWin);
    });
  }





  __defers['$.__views.saveButton!touchend!doSaveRecords'] && $.addListener($.__views.saveButton, 'touchend', doSaveRecords);if (true) {
    __defers['$.__views.saveButton!touchend!doSaveRecords'] && $.addListener($.__views.saveButton, 'touchend', doSaveRecords);}
  __defers['$.__views.__alloyId770!click!showDatePicker'] && $.addListener($.__views.__alloyId770, 'click', showDatePicker);__defers['$.__views.__alloyId774!click!showTimePicker'] && $.addListener($.__views.__alloyId774, 'click', showTimePicker);__defers['$.__views.datePicker!change!changeDate'] && $.addListener($.__views.datePicker, 'change', changeDate);__defers['$.__views.timePicker!change!changeTime'] && $.addListener($.__views.timePicker, 'change', changeTime);



  _.extend($, exports);
}

module.exports = Controller;