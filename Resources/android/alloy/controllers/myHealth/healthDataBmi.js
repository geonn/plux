var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
    delete obj[key];
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'myHealth/healthDataBmi';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.healthBmiWin = Ti.UI.createWindow(
  { backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Add Data", backButtonTitle: "", id: "healthBmiWin", navTintColor: "#CE1D1C" });

  $.__views.healthBmiWin && $.addTopLevelView($.__views.healthBmiWin);
  $.__views.__alloyId550 = Ti.UI.createView(
  { id: "__alloyId550" });

  $.__views.saveButton = Ti.UI.createButton(
  { touchEnabled: false, id: "saveButton", color: "#ADADAD", title: "Save", right: 0 });

  $.__views.__alloyId550.add($.__views.saveButton);
  doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;$.__views.healthBmiWin.rightNavButton = $.__views.__alloyId550;$.__views.loadingBar = Ti.UI.createView(
  { layout: "vertical", id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

  $.__views.healthBmiWin.add($.__views.loadingBar);
  $.__views.activityIndicator = Ti.UI.createActivityIndicator(
  { top: 10, left: 30, width: 60, id: "activityIndicator" });

  $.__views.loadingBar.add($.__views.activityIndicator);
  $.__views.__alloyId551 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId551" });

  $.__views.loadingBar.add($.__views.__alloyId551);
  $.__views.main = Ti.UI.createView(
  { id: "main", layout: "vertical", backgroundColor: "#F6F6F6", height: "100%" });

  $.__views.healthBmiWin.add($.__views.main);
  if (true) {
    $.__views.__alloyId552 = Ti.UI.createView(
    { layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId552" });

    $.__views.main.add($.__views.__alloyId552);
    $.__views.__alloyId553 = Ti.UI.createView(
    { left: 0, width: "20%", id: "__alloyId553" });

    $.__views.__alloyId552.add($.__views.__alloyId553);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId553.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { id: "pageTitle", width: "60%" });

    $.__views.__alloyId552.add($.__views.pageTitle);
    $.__views.__alloyId554 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Add Data', textAlign: "center", id: "__alloyId554" });

    $.__views.pageTitle.add($.__views.__alloyId554);
    $.__views.__alloyId555 = Ti.UI.createView(
    { width: "20%", id: "__alloyId555" });

    $.__views.__alloyId552.add($.__views.__alloyId555);
    $.__views.saveButton = Ti.UI.createButton(
    { font: { fontSize: "10dp" }, color: "#000", touchEnabled: false, id: "saveButton", title: "Save", right: 0 });

    $.__views.__alloyId555.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;}
  $.__views.__alloyId556 = Ti.UI.createView(
  { layout: "vertical", height: 30, top: 10, id: "__alloyId556" });

  $.__views.main.add($.__views.__alloyId556);
  $.__views.description = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#878686", text: "Please fill in your information below", id: "description" });

  $.__views.__alloyId556.add($.__views.description);
  $.__views.table = Ti.UI.createView(
  { id: "table", height: Ti.UI.SIZE, top: 10, backgroundColor: "#ffffff", layout: "vertical", scrollable: false });

  $.__views.main.add($.__views.table);
  $.__views.__alloyId557 = Ti.UI.createView(
  { width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId557" });

  $.__views.table.add($.__views.__alloyId557);
  $.__views.__alloyId558 = Ti.UI.createView(
  { selectedBackgroundColor: "#ffffff", height: Ti.UI.SIZE, id: "__alloyId558" });

  $.__views.table.add($.__views.__alloyId558);
  showDatePicker ? $.addListener($.__views.__alloyId558, 'click', showDatePicker) : __defers['$.__views.__alloyId558!click!showDatePicker'] = true;$.__views.__alloyId559 = Ti.UI.createView(
  { layout: "horizontal", height: 45, width: "100%", textAlign: "right", id: "__alloyId559" });

  $.__views.__alloyId558.add($.__views.__alloyId559);
  $.__views.__alloyId560 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Date", top: 12, id: "__alloyId560" });

  $.__views.__alloyId559.add($.__views.__alloyId560);
  $.__views.date_value = Ti.UI.createLabel(
  { width: "80%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "date_value", textAlign: "right" });

  $.__views.__alloyId559.add($.__views.date_value);
  $.__views.__alloyId561 = Ti.UI.createView(
  { width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId561" });

  $.__views.table.add($.__views.__alloyId561);
  $.__views.__alloyId562 = Ti.UI.createView(
  { selectedBackgroundColor: "#ffffff", height: Ti.UI.SIZE, id: "__alloyId562" });

  $.__views.table.add($.__views.__alloyId562);
  showTimePicker ? $.addListener($.__views.__alloyId562, 'click', showTimePicker) : __defers['$.__views.__alloyId562!click!showTimePicker'] = true;$.__views.__alloyId563 = Ti.UI.createView(
  { layout: "horizontal", height: 45, width: "100%", id: "__alloyId563" });

  $.__views.__alloyId562.add($.__views.__alloyId563);
  $.__views.__alloyId564 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Time", top: 12, id: "__alloyId564" });

  $.__views.__alloyId563.add($.__views.__alloyId564);
  $.__views.time_value = Ti.UI.createLabel(
  { width: "80%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "time_value", textAlign: "right" });

  $.__views.__alloyId563.add($.__views.time_value);
  $.__views.__alloyId565 = Ti.UI.createView(
  { width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId565" });

  $.__views.table.add($.__views.__alloyId565);
  $.__views.tvrField1 = Ti.UI.createView(
  { id: "tvrField1", height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrField1);
  $.__views.__alloyId566 = Ti.UI.createView(
  { layout: "horizontal", height: 45, width: "100%", id: "__alloyId566" });

  $.__views.tvrField1.add($.__views.__alloyId566);
  $.__views.__alloyId567 = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "KG", top: 12, id: "__alloyId567" });

  $.__views.__alloyId566.add($.__views.__alloyId567);
  $.__views.field1 = Ti.UI.createTextField(
  { verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER, height: "45dp", font: { fontSize: "14dp" }, color: "#222222", borderWidth: "1px", borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, width: Ti.UI.FILL, backgroundColor: "#ffffff", id: "field1", top: 5, bottom: 5, right: 5, borderColor: "#ffffff", textAlign: "right", value: "", keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD });

  $.__views.__alloyId566.add($.__views.field1);
  $.__views.__alloyId568 = Ti.UI.createView(
  { width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId568" });

  $.__views.table.add($.__views.__alloyId568);
  $.__views.tvrField2 = Ti.UI.createView(
  { id: "tvrField2", height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrField2);
  $.__views.__alloyId569 = Ti.UI.createView(
  { layout: "horizontal", height: 45, width: "100%", id: "__alloyId569" });

  $.__views.tvrField2.add($.__views.__alloyId569);
  $.__views.__alloyId570 = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Height(cm)", top: 12, id: "__alloyId570" });

  $.__views.__alloyId569.add($.__views.__alloyId570);
  $.__views.field2 = Ti.UI.createTextField(
  { verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER, height: "45dp", font: { fontSize: "14dp" }, color: "#222222", borderWidth: "1px", borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, width: Ti.UI.FILL, backgroundColor: "#ffffff", id: "field2", top: 5, bottom: 5, right: 5, borderColor: "#ffffff", textAlign: "right", value: "", keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD });

  $.__views.__alloyId569.add($.__views.field2);
  $.__views.selectorView = Ti.UI.createView(
  { height: Ti.UI.SIZE, id: "selectorView", bottom: 0 });

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
  var formType = 1;
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
    console.log(e.value);
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

  function doSaveRecords() {
    var date = $.date_value.text;
    var time = $.time_value.text;
    var field1 = $.field1.value;
    var field2 = $.field2.value;
    var s_date = date.split('/');
    var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];


    var amount = field1 / (field2 / 100 * (field2 / 100));
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
      field2: field2 / 100,
      amount: amount.toFixed(2),
      type: formType },
    function () {
      hd.loadInfo(formType);
    });

    nav.closeWindow($.healthBmiWin);
  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.healthBmiWin);
    });
  }





  __defers['$.__views.saveButton!touchend!doSaveRecords'] && $.addListener($.__views.saveButton, 'touchend', doSaveRecords);if (true) {
    __defers['$.__views.saveButton!touchend!doSaveRecords'] && $.addListener($.__views.saveButton, 'touchend', doSaveRecords);}
  __defers['$.__views.__alloyId558!click!showDatePicker'] && $.addListener($.__views.__alloyId558, 'click', showDatePicker);__defers['$.__views.__alloyId562!click!showTimePicker'] && $.addListener($.__views.__alloyId562, 'click', showTimePicker);__defers['$.__views.datePicker!change!changeDate'] && $.addListener($.__views.datePicker, 'change', changeDate);__defers['$.__views.timePicker!change!changeTime'] && $.addListener($.__views.timePicker, 'change', changeTime);



  _.extend($, exports);
}

module.exports = Controller;