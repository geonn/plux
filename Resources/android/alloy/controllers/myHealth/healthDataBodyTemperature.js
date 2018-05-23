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
  this.__controllerPath = 'myHealth/healthDataBodyTemperature';
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
  $.__views.__alloyId806 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId806" });

  $.__views.saveButton = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ADADAD", width: Ti.UI.FILL, touchEnabled: false, id: "saveButton", title: "Save", right: 0 });

  $.__views.__alloyId806.add($.__views.saveButton);
  doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;$.__views.healthDBPWin.rightNavButton = $.__views.__alloyId806;$.__views.main = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical", backgroundColor: "#F6F6F6", height: "100%" });

  $.__views.healthDBPWin.add($.__views.main);
  if (true) {
    $.__views.__alloyId807 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId807" });

    $.__views.main.add($.__views.__alloyId807);
    $.__views.__alloyId808 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId808" });

    $.__views.__alloyId807.add($.__views.__alloyId808);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId808.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "60%" });

    $.__views.__alloyId807.add($.__views.pageTitle);
    $.__views.__alloyId809 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Add Data', textAlign: "center", id: "__alloyId809" });

    $.__views.pageTitle.add($.__views.__alloyId809);
    $.__views.__alloyId810 = Ti.UI.createView(
    { borderWidth: 0, width: "20%", id: "__alloyId810" });

    $.__views.__alloyId807.add($.__views.__alloyId810);
    $.__views.saveButton = Ti.UI.createButton(
    { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#000", width: Ti.UI.FILL, font: { fontSize: "10dp" }, touchEnabled: false, id: "saveButton", title: "Save", right: 0 });

    $.__views.__alloyId810.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;}
  $.__views.__alloyId811 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", height: 30, top: 10, id: "__alloyId811" });

  $.__views.main.add($.__views.__alloyId811);
  $.__views.description = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#878686", text: "Please fill in your information below", id: "description" });

  $.__views.__alloyId811.add($.__views.description);
  $.__views.table = Ti.UI.createView(
  { borderWidth: 0, id: "table", height: Ti.UI.SIZE, top: 10, backgroundColor: "#ffffff", layout: "vertical", scrollable: false });

  $.__views.main.add($.__views.table);
  $.__views.__alloyId812 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId812" });

  $.__views.table.add($.__views.__alloyId812);
  $.__views.__alloyId813 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff", id: "__alloyId813" });

  $.__views.table.add($.__views.__alloyId813);
  showDatePicker ? $.addListener($.__views.__alloyId813, 'click', showDatePicker) : __defers['$.__views.__alloyId813!click!showDatePicker'] = true;$.__views.__alloyId814 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", textAlign: "right", id: "__alloyId814" });

  $.__views.__alloyId813.add($.__views.__alloyId814);
  $.__views.__alloyId815 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Date", top: 12, id: "__alloyId815" });

  $.__views.__alloyId814.add($.__views.__alloyId815);
  $.__views.date_value = Ti.UI.createLabel(
  { width: "80%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "date_value", textAlign: "right" });

  $.__views.__alloyId814.add($.__views.date_value);
  $.__views.__alloyId816 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId816" });

  $.__views.table.add($.__views.__alloyId816);
  $.__views.__alloyId817 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff", id: "__alloyId817" });

  $.__views.table.add($.__views.__alloyId817);
  showTimePicker ? $.addListener($.__views.__alloyId817, 'click', showTimePicker) : __defers['$.__views.__alloyId817!click!showTimePicker'] = true;$.__views.__alloyId818 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", id: "__alloyId818" });

  $.__views.__alloyId817.add($.__views.__alloyId818);
  $.__views.__alloyId819 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Time", top: 12, id: "__alloyId819" });

  $.__views.__alloyId818.add($.__views.__alloyId819);
  $.__views.time_value = Ti.UI.createLabel(
  { width: "80%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "time_value", textAlign: "right" });

  $.__views.__alloyId818.add($.__views.time_value);
  $.__views.__alloyId820 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#F6F6F6", id: "__alloyId820" });

  $.__views.table.add($.__views.__alloyId820);
  $.__views.tvrField1 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, id: "tvrField1", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrField1);
  $.__views.__alloyId821 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 55, width: "100%", id: "__alloyId821" });

  $.__views.tvrField1.add($.__views.__alloyId821);
  $.__views.__alloyId822 = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "C", top: 12, id: "__alloyId822" });

  $.__views.__alloyId821.add($.__views.__alloyId822);
  $.__views.field1 = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", id: "field1", top: 5, bottom: 5, right: 5, borderColor: "#ffffff", textAlign: "right", value: "", keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD });

  $.__views.__alloyId821.add($.__views.field1);
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
  var formType = 4;
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
    if (e.value != "") {
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
    var s_date = date.split('/');
    var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];


    var amount = field1;
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
      amount: field1,
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
  __defers['$.__views.__alloyId813!click!showDatePicker'] && $.addListener($.__views.__alloyId813, 'click', showDatePicker);__defers['$.__views.__alloyId817!click!showTimePicker'] && $.addListener($.__views.__alloyId817, 'click', showTimePicker);__defers['$.__views.datePicker!change!changeDate'] && $.addListener($.__views.datePicker, 'change', changeDate);__defers['$.__views.timePicker!change!changeTime'] && $.addListener($.__views.timePicker, 'change', changeTime);



  _.extend($, exports);
}

module.exports = Controller;