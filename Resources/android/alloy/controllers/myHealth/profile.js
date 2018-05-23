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
  this.__controllerPath = 'myHealth/profile';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.healthProfileWin = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Me", backButtonTitle: "", id: "healthProfileWin", navTintColor: "#CE1D1C" });

  $.__views.healthProfileWin && $.addTopLevelView($.__views.healthProfileWin);
  $.__views.__alloyId946 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId946" });

  $.__views.editButton = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: Ti.UI.FILL, touchEnabled: true, id: "editButton", title: "Edit", right: 0, visible: true });

  $.__views.__alloyId946.add($.__views.editButton);
  doEditRecords ? $.addListener($.__views.editButton, 'touchend', doEditRecords) : __defers['$.__views.editButton!touchend!doEditRecords'] = true;$.__views.saveButton = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: Ti.UI.FILL, touchEnabled: true, id: "saveButton", title: "Save", right: 0, visible: false });

  $.__views.__alloyId946.add($.__views.saveButton);
  doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;$.__views.healthProfileWin.rightNavButton = $.__views.__alloyId946;$.__views.main = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical", backgroundColor: "#F6F6F6", height: "100%" });

  $.__views.healthProfileWin.add($.__views.main);
  if (true) {
    $.__views.__alloyId947 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId947" });

    $.__views.main.add($.__views.__alloyId947);
    $.__views.__alloyId948 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId948" });

    $.__views.__alloyId947.add($.__views.__alloyId948);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId948.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "70%" });

    $.__views.__alloyId947.add($.__views.pageTitle);
    $.__views.__alloyId949 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Me', textAlign: "center", id: "__alloyId949" });

    $.__views.pageTitle.add($.__views.__alloyId949);
    $.__views.__alloyId950 = Ti.UI.createView(
    { borderWidth: 0, width: "20%", id: "__alloyId950" });

    $.__views.__alloyId947.add($.__views.__alloyId950);
    $.__views.editButton = Ti.UI.createButton(
    { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#000", width: Ti.UI.FILL, font: { fontSize: "10dp" }, touchEnabled: true, id: "editButton", title: "Edit", right: 0, visible: true });

    $.__views.__alloyId950.add($.__views.editButton);
    doEditRecords ? $.addListener($.__views.editButton, 'touchend', doEditRecords) : __defers['$.__views.editButton!touchend!doEditRecords'] = true;$.__views.saveButton = Ti.UI.createButton(
    { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#000", width: Ti.UI.FILL, font: { fontSize: "10dp" }, touchEnabled: true, id: "saveButton", title: "Save", right: 0, visible: false });

    $.__views.__alloyId950.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, 'touchend', doSaveRecords) : __defers['$.__views.saveButton!touchend!doSaveRecords'] = true;}
  var __alloyId951 = [];$.__views.tvrFieldDate = Ti.UI.createTableViewRow(
  { color: "#606060", top: 10, bottom: 10, id: "tvrFieldDate", selectedBackgroundColor: "#ffffff" });

  __alloyId951.push($.__views.tvrFieldDate);showDatePicker ? $.addListener($.__views.tvrFieldDate, 'click', showDatePicker) : __defers['$.__views.tvrFieldDate!click!showDatePicker'] = true;$.__views.__alloyId952 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", textAlign: "right", id: "__alloyId952" });

  $.__views.tvrFieldDate.add($.__views.__alloyId952);
  $.__views.__alloyId953 = Ti.UI.createLabel(
  { width: "40%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Birth Date", top: 12, id: "__alloyId953" });

  $.__views.__alloyId952.add($.__views.__alloyId953);
  $.__views.date_value = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#707070", text: "Not Set", top: 12, id: "date_value", textAlign: "right" });

  $.__views.__alloyId952.add($.__views.date_value);
  $.__views.tvrFieldGender = Ti.UI.createTableViewRow(
  { color: "#606060", top: 10, bottom: 10, id: "tvrFieldGender", selectedBackgroundColor: "#ffffff" });

  __alloyId951.push($.__views.tvrFieldGender);showGenderPicker ? $.addListener($.__views.tvrFieldGender, 'click', showGenderPicker) : __defers['$.__views.tvrFieldGender!click!showGenderPicker'] = true;$.__views.__alloyId954 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", id: "__alloyId954" });

  $.__views.tvrFieldGender.add($.__views.__alloyId954);
  $.__views.__alloyId955 = Ti.UI.createLabel(
  { width: "40%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "Gender", top: 12, id: "__alloyId955" });

  $.__views.__alloyId954.add($.__views.__alloyId955);
  $.__views.gender_value = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "gender_value", textAlign: "right" });

  $.__views.__alloyId954.add($.__views.gender_value);
  $.__views.tvrFieldBloodType = Ti.UI.createTableViewRow(
  { color: "#606060", top: 10, bottom: 10, id: "tvrFieldBloodType", selectedBackgroundColor: "#ffffff" });

  __alloyId951.push($.__views.tvrFieldBloodType);showBloodTypePicker ? $.addListener($.__views.tvrFieldBloodType, 'click', showBloodTypePicker) : __defers['$.__views.tvrFieldBloodType!click!showBloodTypePicker'] = true;$.__views.__alloyId956 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", height: 45, width: "100%", id: "__alloyId956" });

  $.__views.tvrFieldBloodType.add($.__views.__alloyId956);
  $.__views.__alloyId957 = Ti.UI.createLabel(
  { width: "40%", height: Titanium.UI.SIZE, color: "#A8A8A8", left: 20, font: { fontSize: "16dp" }, text: "BloodType", top: 12, id: "__alloyId957" });

  $.__views.__alloyId956.add($.__views.__alloyId957);
  $.__views.bloodType_value = Ti.UI.createLabel(
  { width: "50%", height: Titanium.UI.SIZE, color: "#707070", text: "", top: 12, id: "bloodType_value", textAlign: "right" });

  $.__views.__alloyId956.add($.__views.bloodType_value);
  $.__views.table = Ti.UI.createTableView(
  { data: __alloyId951, id: "table", height: 135, top: 30, scrollable: false });

  $.__views.main.add($.__views.table);
  $.__views.selectorView = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, id: "selectorView", bottom: 0 });

  $.__views.main.add($.__views.selectorView);
  $.__views.genderPicker = Ti.UI.createPicker(
  { id: "genderPicker", visible: false });

  $.__views.selectorView.add($.__views.genderPicker);
  changeGender ? $.addListener($.__views.genderPicker, 'change', changeGender) : __defers['$.__views.genderPicker!change!changeGender'] = true;$.__views.bloodTypePicker = Ti.UI.createPicker(
  { id: "bloodTypePicker", visible: false });

  $.__views.selectorView.add($.__views.bloodTypePicker);
  changeBloodType ? $.addListener($.__views.bloodTypePicker, 'change', changeBloodType) : __defers['$.__views.bloodTypePicker!change!changeBloodType'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var formType = 1;
  var lib_health = Alloy.createCollection('personalInfo');
  var hd = require('healthData');
  var myData = lib_health.getOwnerData();
  hd.construct($);

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var yyyy = today.getFullYear();
  var datePicker = Ti.UI.createPicker({
    type: Ti.UI.PICKER_TYPE_DATE,
    minDate: new Date(1930, 0, 1),
    maxDate: new Date(yyyy, mm, dd),
    id: "datePicker",
    visible: false });



  function setupPersonalData() {
    $.selectorView.add(datePicker);

    datePicker.addEventListener("change", changeDate);

    var all_picker = $.selectorView.children;
    if (myData.length == 0) {
      myData = lib_health.getOwnerData();
      setupPersonalData();
      return false;
    }


    var genderValue = ["Not Set", "Female", "Male"];
    var myGender;
    for (var i = 0; i < genderValue.length; i++) {
      if (genderValue[i] == myData.gender) {
        myGender = i;
      }

      var genderData = genderValue[i];
      var gendata = Ti.UI.createPickerRow({
        title: genderData.toString() });

      all_picker[0].add(gendata);
    }
    all_picker[0].setSelectedRow(0, myGender, true);


    var bloodTypeValue = ["Not Set", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    var myBloodType;
    for (var i = 0; i < bloodTypeValue.length; i++) {
      if (bloodTypeValue[i] == myData.bloodType) {
        myBloodType = i;
      }

      var bloodTypeData = bloodTypeValue[i];
      var blooddata = Ti.UI.createPickerRow({
        title: bloodTypeData.toString() });

      all_picker[1].add(blooddata);
    }


    var myBDay = myData.birthDate;
    var sBday = myBDay.split("-");
    var showBday = "Not Set";
    if (sBday.length > 1) {
      var myAge = hd.getAge(myBDay);
      showBday = sBday[2] + "/" + sBday[1] + "/" + sBday[0] + "(" + myAge + ")";
      all_picker[2].setValue(new Date(sBday[0], sBday[1], sBday[2]));
    }



    $.bloodTypePicker.setSelectedRow(0, myBloodType, true);

    $.date_value.text = showBday;
    $.gender_value.text = myData.gender;
    $.bloodType_value.text = myData.bloodType;
    $.tvrFieldDate.setTouchEnabled(false);
    $.tvrFieldGender.setTouchEnabled(false);
    $.tvrFieldBloodType.setTouchEnabled(false);
  }

  setupPersonalData();

  var leftCancel = Ti.UI.createButton({
    title: "Cancel",
    left: 0 });

  var leftNavView = Titanium.UI.createView();
  var cancelEdit = function () {
    var all_picker = $.selectorView.children;

    resetTextColor();
    $.tvrFieldDate.setTouchEnabled(false);
    $.tvrFieldGender.setTouchEnabled(false);
    $.tvrFieldBloodType.setTouchEnabled(false);
    $.editButton.visible = "true";
    $.saveButton.visible = "false";
    for (var i = 0; i < all_picker.length; i++) {
      all_picker[i].hide();
    };



    leftNavView.removeEventListener('click', cancelEdit);
    $.healthProfileWin.leftNavButton = null;
  };

  function doEditRecords(e) {
    $.date_value.color = "#CE1D1C";
    $.tvrFieldDate.setTouchEnabled(true);
    $.tvrFieldGender.setTouchEnabled(true);
    $.tvrFieldBloodType.setTouchEnabled(true);
    leftNavView.add(leftCancel);
    leftNavView.addEventListener('click', cancelEdit);
    $.editButton.visible = "false";
    $.saveButton.visible = "true";



    $.healthProfileWin.leftNavButton = leftNavView;
    var all_picker = $.selectorView.children;
    if (false) {
      all_picker[2].show();
    }

    showDatePicker();
    for (var i = 0; i < all_picker.length; i++) {

    };
  }

  function showDatePicker(e) {
    var all_picker = $.selectorView.children;
    var isEnabled = $.tvrFieldDate.getTouchEnabled();
    if (isEnabled) {
      if (true) {
        myData = lib_health.getOwnerData();
        var myBDay = myData.birthDate;
        var sBday = myBDay.split("-");

        datePicker.showDatePickerDialog({
          value: new Date(sBday[0], parseInt(sBday[1]) - 1, parseInt(sBday[2])),
          callback: function (e) {
            if (e.cancel) {} else {
              changeDate(e);
            }
          } });

      } else {
        hd.showBirthDatePicker({ date: all_picker[2], gender: all_picker[0], bloodType: all_picker[1] });
      }
      resetTextColor();
      $.date_value.color = "#CE1D1C";
    }
  }

  function resetTextColor() {
    $.date_value.color = "#757575";
    $.gender_value.color = "#757575";
    $.bloodType_value.color = "#757575";
  }

  function showGenderPicker(e) {
    var all_picker = $.selectorView.children;
    var isEnabled = $.tvrFieldGender.getTouchEnabled();
    if (isEnabled) {
      resetTextColor();
      $.gender_value.color = "#CE1D1C";
      hd.showGenderPicker({ gender: all_picker[0], bloodType: all_picker[1], date: all_picker[2] });
    }
  }

  function showBloodTypePicker(e) {
    var all_picker = $.selectorView.children;
    var isEnabled = $.tvrFieldBloodType.getTouchEnabled();
    if (isEnabled) {
      resetTextColor();
      $.bloodType_value.color = "#CE1D1C";
      hd.showBloodTypePicker({ bloodType: all_picker[1], gender: all_picker[0], date: all_picker[2] });
    }
  }

  function changeDate(e) {
    console.log("changeDate : " + e.value);

    hd.changeDate({ date: e.value, age: 1 });
  }

  function changeGender(e) {
    hd.changeGender({ gender: e.selectedValue[0] });
  }

  function changeBloodType(e) {
    hd.changeBloodType({ bloodType: e.selectedValue[0] });
  }

  function doSaveRecords() {
    var birthdate = $.date_value.text;
    var gender = $.gender_value.text;
    var bloodType = $.bloodType_value.text;

    if (birthdate != "Not Set") {
      var bdate = birthdate.split('(');
      var s_date = bdate[0].split('/');
      var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];
    }

    var debug = JSON.stringify($.date_value);
    console.log("newDate :" + debug);
    lib_health.addPersonalData({
      id: myData.id,
      name: "",
      gender: gender,
      bloodType: bloodType,
      birthDate: newDate });



    common.createAlert('Updates Profile', 'Your personal information are saved!');
    cancelEdit();

  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.healthProfileWin);
    });
  }





  __defers['$.__views.editButton!touchend!doEditRecords'] && $.addListener($.__views.editButton, 'touchend', doEditRecords);__defers['$.__views.saveButton!touchend!doSaveRecords'] && $.addListener($.__views.saveButton, 'touchend', doSaveRecords);if (true) {
    __defers['$.__views.editButton!touchend!doEditRecords'] && $.addListener($.__views.editButton, 'touchend', doEditRecords);}
  if (true) {
    __defers['$.__views.saveButton!touchend!doSaveRecords'] && $.addListener($.__views.saveButton, 'touchend', doSaveRecords);}
  __defers['$.__views.tvrFieldDate!click!showDatePicker'] && $.addListener($.__views.tvrFieldDate, 'click', showDatePicker);__defers['$.__views.tvrFieldGender!click!showGenderPicker'] && $.addListener($.__views.tvrFieldGender, 'click', showGenderPicker);__defers['$.__views.tvrFieldBloodType!click!showBloodTypePicker'] && $.addListener($.__views.tvrFieldBloodType, 'click', showBloodTypePicker);__defers['$.__views.genderPicker!change!changeGender'] && $.addListener($.__views.genderPicker, 'change', changeGender);__defers['$.__views.bloodTypePicker!change!changeBloodType'] && $.addListener($.__views.bloodTypePicker, 'change', changeBloodType);



  _.extend($, exports);
}

module.exports = Controller;