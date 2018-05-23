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
  this.__controllerPath = 'appointment/index';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.win = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "Appointment Form", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId142 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId142" });

  $.__views.win.add($.__views.__alloyId142);
  if (true) {
    $.__views.__alloyId143 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId143" });

    $.__views.__alloyId142.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId144" });

    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId145" });

    $.__views.__alloyId144.add($.__views.__alloyId145);
    closeWindow ? $.addListener($.__views.__alloyId145, 'click', closeWindow) : __defers['$.__views.__alloyId145!click!closeWindow'] = true;$.__views.__alloyId146 = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId146" });

    $.__views.__alloyId143.add($.__views.__alloyId146);
    $.__views.pageTitle = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'New Appointment', id: "pageTitle", textAlign: "center" });

    $.__views.__alloyId146.add($.__views.pageTitle);
  }
  $.__views.__alloyId147 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, backgroundColor: "#f0f5f8", id: "__alloyId147" });

  $.__views.__alloyId142.add($.__views.__alloyId147);
  $.__views.__alloyId148 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId148" });

  $.__views.__alloyId147.add($.__views.__alloyId148);
  $.__views.__alloyId149 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId149" });

  $.__views.__alloyId147.add($.__views.__alloyId149);
  $.__views.sub_back = Ti.UI.createImageView(
  { left: 10, id: "sub_back", width: 25, height: 25, image: "/images/btn-back.png" });

  $.__views.__alloyId149.add($.__views.sub_back);
  $.__views.sub_title = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#2a363a", font: { fontSize: 14 }, text: 'SELECT A SPECIALTY', id: "sub_title", top: 10, bottom: 10, textAlign: "center" });

  $.__views.__alloyId149.add($.__views.sub_title);
  $.__views.__alloyId150 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId150" });

  $.__views.__alloyId147.add($.__views.__alloyId150);
  var __alloyId151 = [];
  $.__views._specialty_list = Alloy.createController('appointment/_specialty_list', { id: "_specialty_list" });
  __alloyId151.push($.__views._specialty_list.getViewEx({ recurse: true }));
  $.__views._clinic_list = Alloy.createController('appointment/_clinic_list', { id: "_clinic_list" });
  __alloyId151.push($.__views._clinic_list.getViewEx({ recurse: true }));
  $.__views._available_timeslot = Alloy.createController('appointment/_available_timeslot', { id: "_available_timeslot" });
  __alloyId151.push($.__views._available_timeslot.getViewEx({ recurse: true }));
  $.__views._appointment_form = Alloy.createController('appointment/_appointment_form', { id: "_appointment_form" });
  __alloyId151.push($.__views._appointment_form.getViewEx({ recurse: true }));
  $.__views.inner_box = Ti.UI.createScrollableView(
  { views: __alloyId151, id: "inner_box", scrollingEnabled: false });

  $.__views.__alloyId142.add($.__views.inner_box);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var appointment_id = args.id || 0;
  var page_container = [{ title: "SELECT A SPECIALTY" }, { title: "SELECT A DOCTOR" }, { title: "SELECT AN AVAILABLE TIME" }, { title: "CREATE THIS APPOINTMENT" }];
  var loading = Alloy.createController("loading");

  function init() {
    $.win.add(loading.getView());
    loading.start();
    $.sub_back.hide();
  }

  init();
  function postlayout() {
    $.win.removeEventListener("postlayout", postlayout);
    if (appointment_id) {
      var appointmentModel = Alloy.createCollection('appointment');
      var clinicModel = Alloy.createCollection('panelList');

      var data_appointment = appointmentModel.getAppointmentById(appointment_id);
      var data_clinic = clinicModel.getDataByID(data_appointment.clinic_id);

      Ti.App.fireEvent('selectClinic', { clinicName: data_clinic.clinicName, clinicId: data_appointment.clinic_id });
      Ti.App.fireEvent('update_specialty', { specialty_id: data_appointment.specialty_id });
      Ti.App.fireEvent("update_chooseDateTime", { date: timeFormat(data_appointment.start_date) });
      scrollToViewPage({ number: 3 });
    }
    loading.finish();
  }

  function update_subheader(e) {
    var current_page = $.inner_box.currentPage;
    $.sub_title.text = page_container[current_page].title;
    if (current_page) {
      $.sub_back.show();
    } else {
      $.sub_back.hide();
    }
  }

  function closeWindow() {
    $.win.close();
  }

  function scrollToViewPage(e) {
    $.inner_box.scrollToView(e.number);
  }

  function moveNext() {
    $.inner_box.moveNext();
  }

  function movePrevious() {
    $.inner_box.movePrevious();
  }

  function selectClinic(e) {
    console.log(e.clinicName + " clinic update");
    $._available_timeslot.set_doctor_panel_id({ doctor_panel_id: e.doctor_panel_id });
    $._appointment_form.update_selectClinic({ clinicName: e.clinicName, clinicId: e.clinicId, doctor_panel_id: e.doctor_panel_id });
  }

  function update_chooseDateTime(e) {
    $._appointment_form.update_chooseDateTime({ date: e.date });
  }

  function update_specialty(e) {
    console.log(e.specialty_name + " update specialty");
    $._appointment_form.update_specialty({ specialty_id: e.specialty_id, specialty_name: e.specialty_name });
    $._available_timeslot.set_specialty({ specialty_id: e.specialty_id });
    $._clinic_list.set_specialty({ specialty_id: e.specialty_id });
  }

  function loadingStart() {
    loading.start();
  }

  function loadingFinish() {
    loading.finish();
  }

  $.inner_box.addEventListener("scrollend", update_subheader);
  $.sub_back.addEventListener("click", movePrevious);

  Ti.App.addEventListener("update_specialty", update_specialty);
  Ti.App.addEventListener("update_chooseDateTime", update_chooseDateTime);
  Ti.App.addEventListener("selectClinic", selectClinic);

  Ti.App.addEventListener("appointment_index:windowClose", closeWindow);
  Ti.App.addEventListener("appointment_index:loadingStart", loadingStart);
  Ti.App.addEventListener("appointment_index:loadingFinish", loadingFinish);
  Ti.App.addEventListener("appointment_index:moveNext", moveNext);
  Ti.App.addEventListener("appointment_index:movePrevious", movePrevious);
  Ti.App.addEventListener("appointment_index:scrollToViewPage", scrollToViewPage);

  $.win.addEventListener("postlayout", postlayout);

  $.win.addEventListener("close", function () {
    Ti.App.removeEventListener("update_specialty", update_specialty);
    Ti.App.removeEventListener("update_chooseDateTime", update_chooseDateTime);
    Ti.App.removeEventListener("selectClinic", selectClinic);
    Ti.App.removeEventListener("appointment_index:windowClose", closeWindow);
    Ti.App.removeEventListener("appointment_index:loadingStart", loadingStart);
    Ti.App.removeEventListener("appointment_index:loadingFinish", loadingFinish);
    Ti.App.removeEventListener("appointment_index:moveNext", moveNext);
    Ti.App.removeEventListener("appointment_index:movePrevious", movePrevious);
    Ti.App.removeEventListener("appointment_index:scrollToViewPage", scrollToViewPage);
  });





  if (true) {
    __defers['$.__views.__alloyId145!click!closeWindow'] && $.addListener($.__views.__alloyId145, 'click', closeWindow);}




  _.extend($, exports);
}

module.exports = Controller;