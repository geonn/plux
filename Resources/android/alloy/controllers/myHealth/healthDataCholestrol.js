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
  this.__controllerPath = 'myHealth/healthDataCholestrol';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.healthCholestrolWin = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Add Data", backButtonTitle: "", id: "healthCholestrolWin", navTintColor: "#CE1D1C" });

  $.__views.healthCholestrolWin && $.addTopLevelView($.__views.healthCholestrolWin);
  $.__views.__alloyId824 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId824" });

  $.__views.saveButton = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ADADAD", width: Ti.UI.FILL, touchEnabled: false, id: "saveButton", title: "Save", right: 0 });

  $.__views.__alloyId824.add($.__views.saveButton);
  doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;$.__views.healthCholestrolWin.rightNavButton = $.__views.__alloyId824;$.__views.loadingBar = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

  $.__views.healthCholestrolWin.add($.__views.loadingBar);
  $.__views.activityIndicator = Ti.UI.createActivityIndicator(
  { top: 10, left: 30, width: 60, id: "activityIndicator" });

  $.__views.loadingBar.add($.__views.activityIndicator);
  $.__views.__alloyId825 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId825" });

  $.__views.loadingBar.add($.__views.__alloyId825);
  $.__views.main = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical", backgroundColor: "#F6F6F6", height: "100%" });

  $.__views.healthCholestrolWin.add($.__views.main);
  if (true) {
    $.__views.__alloyId826 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId826" });

    $.__views.main.add($.__views.__alloyId826);
    $.__views.__alloyId827 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId827" });

    $.__views.__alloyId826.add($.__views.__alloyId827);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId827.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "60%" });

    $.__views.__alloyId826.add($.__views.pageTitle);
    $.__views.__alloyId828 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Add Data', textAlign: "center", id: "__alloyId828" });

    $.__views.pageTitle.add($.__views.__alloyId828);
    $.__views.__alloyId829 = Ti.UI.createView(
    { borderWidth: 0, width: "20%", id: "__alloyId829" });

    $.__views.__alloyId826.add($.__views.__alloyId829);
    $.__views.saveButton = Ti.UI.createButton(
    { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#000", width: Ti.UI.FILL, font: { fontSize: "10dp" }, touchEnabled: false, id: "saveButton", title: "Save", right: 0 });

    $.__views.__alloyId829.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;}
  $.__views.__alloyId830 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", height: 30, top: 10, id: "__alloyId830" });

  $.__views.main.add($.__views.__alloyId830);
  $.__views.description = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#878686", text: "Please fill in your information below", id: "description" });

  $.__views.__alloyId830.add($.__views.description);
  $.__views.table = Ti.UI.createView(
  { borderWidth: 0, id: "table", height: Ti.UI.SIZE, top: 10, backgroundColor: "#ffffff", layout: "vertical", scrollable: false });

  $.__views.main.add($.__views.table);
  $.__views.__alloyId831 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId831" });

  $.__views.table.add($.__views.__alloyId831);
  $.__views.__alloyId832 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff", id: "__alloyId832" });

  $.__views.table.add($.__views.__alloyId832);
  showDatePicker ? $.addListener($.__views.__alloyId832, 'click', showDatePicker) : __defers['$.__views.__alloyId832!click!showDatePicker'] = true;$.__views.__alloyId833 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", textAlign: "right", id: "__alloyId833" });

  $.__views.__alloyId832.add($.__views.__alloyId833);
  $.__views.__alloyId834 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Date", top: 12, id: "__alloyId834" });

  $.__views.__alloyId833.add($.__views.__alloyId834);
  $.__views.date_value = Ti.UI.createLabel(
  { width: "80%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "date_value", textAlign: "right" });

  $.__views.__alloyId833.add($.__views.date_value);
  $.__views.__alloyId835 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId835" });

  $.__views.table.add($.__views.__alloyId835);
  $.__views.__alloyId836 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff", id: "__alloyId836" });

  $.__views.table.add($.__views.__alloyId836);
  showTimePicker ? $.addListener($.__views.__alloyId836, 'click', showTimePicker) : __defers['$.__views.__alloyId836!click!showTimePicker'] = true;$.__views.__alloyId837 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", id: "__alloyId837" });

  $.__views.__alloyId836.add($.__views.__alloyId837);
  $.__views.__alloyId838 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Time", top: 12, id: "__alloyId838" });

  $.__views.__alloyId837.add($.__views.__alloyId838);
  $.__views.time_value = Ti.UI.createLabel(
  { width: "80%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "time_value", textAlign: "right" });

  $.__views.__alloyId837.add($.__views.time_value);
  $.__views.__alloyId839 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId839" });

  $.__views.table.add($.__views.__alloyId839);
  $.__views.tvrField1 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, id: "tvrField1", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrField1);
  $.__views.__alloyId840 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 55, width: "100%", id: "__alloyId840" });

  $.__views.tvrField1.add($.__views.__alloyId840);
  $.__views.__alloyId841 = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "HDL(mg/dL)", top: 12, id: "__alloyId841" });

  $.__views.__alloyId840.add($.__views.__alloyId841);
  $.__views.field1 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", id: "field1", top: 5, bottom: 5, right: 5, borderColor: "#ffffff", textAlign: "right", value: "", keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD });

  $.__views.__alloyId840.add($.__views.field1);
  $.__views.__alloyId842 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId842" });

  $.__views.table.add($.__views.__alloyId842);
  $.__views.tvrField2 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, id: "tvrField2", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrField2);
  $.__views.__alloyId843 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 55, width: "100%", id: "__alloyId843" });

  $.__views.tvrField2.add($.__views.__alloyId843);
  $.__views.__alloyId844 = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "LDL(mg/dL)", top: 12, id: "__alloyId844" });

  $.__views.__alloyId843.add($.__views.__alloyId844);
  $.__views.field2 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", id: "field2", top: 5, bottom: 5, right: 5, borderColor: "#ffffff", textAlign: "right", value: "", keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD });

  $.__views.__alloyId843.add($.__views.field2);
  $.__views.__alloyId845 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId845" });

  $.__views.table.add($.__views.__alloyId845);
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
  var formType = 7;
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

  function doSaveRecords() {
    var date = $.date_value.text;
    var time = $.time_value.text;
    var field1 = $.field1.value;
    var field2 = $.field2.value;
    var s_date = date.split('/');
    var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];


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
      amount: field1 + field2,
      type: formType },
    function () {
      hd.loadInfo(formType);
    });

    nav.closeWindow($.healthCholestrolWin);
  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.healthCholestrolWin);
    });
  }





  __defers['$.__views.saveButton!touchend!doSaveRecords'] && $.addListener($.__views.saveButton, 'touchend', doSaveRecords);if (true) {
    __defers['$.__views.saveButton!touchend!doSaveRecords'] && $.addListener($.__views.saveButton, 'touchend', doSaveRecords);}
  __defers['$.__views.__alloyId832!click!showDatePicker'] && $.addListener($.__views.__alloyId832, 'click', showDatePicker);__defers['$.__views.__alloyId836!click!showTimePicker'] && $.addListener($.__views.__alloyId836, 'click', showTimePicker);__defers['$.__views.datePicker!change!changeDate'] && $.addListener($.__views.datePicker, 'change', changeDate);__defers['$.__views.timePicker!change!changeTime'] && $.addListener($.__views.timePicker, 'change', changeTime);



  _.extend($, exports);
}

module.exports = Controller;