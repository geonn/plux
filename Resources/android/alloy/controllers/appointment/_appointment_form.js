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
  this.__controllerPath = 'appointment/_appointment_form';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.aView = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "aView", top: 10, contentWidth: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, backgroundColor: "#ffffff" });

  $.__views.aView && $.addTopLevelView($.__views.aView);
  $.__views.tvrName = Ti.UI.createView(
  { id: "tvrName", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.aView.add($.__views.tvrName);
  $.__views.__alloyId100 = Ti.UI.createView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, textAlign: "right", id: "__alloyId100" });

  $.__views.tvrName.add($.__views.__alloyId100);
  $.__views.__alloyId101 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#CE1D1C", font: { fontSize: 14 }, left: 10, text: "Patient Name", top: 12, id: "__alloyId101" });

  $.__views.__alloyId100.add($.__views.__alloyId101);
  $.__views.__alloyId102 = Ti.UI.createView(
  { height: Ti.UI.SIZE, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, width: "auto", id: "__alloyId102" });

  $.__views.__alloyId100.add($.__views.__alloyId102);
  $.__views.patient_name = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#000000", top: 12, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, text: "Date of visit a clinic", id: "patient_name" });

  $.__views.__alloyId102.add($.__views.patient_name);
  $.__views.__alloyId103 = Ti.UI.createView(
  { backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId103" });

  $.__views.aView.add($.__views.__alloyId103);
  $.__views.tvrEmail = Ti.UI.createView(
  { id: "tvrEmail", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.aView.add($.__views.tvrEmail);
  $.__views.__alloyId104 = Ti.UI.createView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, textAlign: "right", id: "__alloyId104" });

  $.__views.tvrEmail.add($.__views.__alloyId104);
  $.__views.__alloyId105 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#CE1D1C", font: { fontSize: 14 }, left: 10, text: "Patient Email", top: 12, id: "__alloyId105" });

  $.__views.__alloyId104.add($.__views.__alloyId105);
  $.__views.__alloyId106 = Ti.UI.createView(
  { height: Ti.UI.SIZE, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, width: "auto", id: "__alloyId106" });

  $.__views.__alloyId104.add($.__views.__alloyId106);
  $.__views.patient_email = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#000000", top: 12, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, text: "Date of visit a clinic", id: "patient_email" });

  $.__views.__alloyId106.add($.__views.patient_email);
  $.__views.__alloyId107 = Ti.UI.createView(
  { backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId107" });

  $.__views.aView.add($.__views.__alloyId107);
  $.__views.tvrDateVisit = Ti.UI.createView(
  { id: "tvrDateVisit", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.aView.add($.__views.tvrDateVisit);
  $.__views.__alloyId108 = Ti.UI.createView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, textAlign: "right", id: "__alloyId108" });

  $.__views.tvrDateVisit.add($.__views.__alloyId108);
  $.__views.__alloyId109 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#CE1D1C", font: { fontSize: 14 }, left: 10, text: "Appointment Date & Time", top: 12, id: "__alloyId109" });

  $.__views.__alloyId108.add($.__views.__alloyId109);
  $.__views.__alloyId110 = Ti.UI.createView(
  { height: Ti.UI.SIZE, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, width: "auto", id: "__alloyId110" });

  $.__views.__alloyId108.add($.__views.__alloyId110);
  $.__views.appointment_datetime = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#C8C8CD", top: 12, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, text: "Choose Date and Time", id: "appointment_datetime" });

  $.__views.__alloyId110.add($.__views.appointment_datetime);
  $.__views.__alloyId111 = Ti.UI.createView(
  { backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId111" });

  $.__views.aView.add($.__views.__alloyId111);
  $.__views.__alloyId112 = Ti.UI.createView(
  { height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff", id: "__alloyId112" });

  $.__views.aView.add($.__views.__alloyId112);
  $.__views.__alloyId113 = Ti.UI.createView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, textAlign: "right", id: "__alloyId113" });

  $.__views.__alloyId112.add($.__views.__alloyId113);
  $.__views.__alloyId114 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#CE1D1C", font: { fontSize: 14 }, left: 10, text: "Clinic", top: 12, id: "__alloyId114" });

  $.__views.__alloyId113.add($.__views.__alloyId114);
  $.__views.__alloyId115 = Ti.UI.createView(
  { height: Ti.UI.SIZE, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, width: "auto", id: "__alloyId115" });

  $.__views.__alloyId113.add($.__views.__alloyId115);
  $.__views.appointment_clinic = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#C8C8CD", top: 12, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, text: "Choose Clinic to attend", id: "appointment_clinic" });

  $.__views.__alloyId115.add($.__views.appointment_clinic);
  $.__views.__alloyId116 = Ti.UI.createView(
  { backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId116" });

  $.__views.aView.add($.__views.__alloyId116);
  $.__views.__alloyId117 = Ti.UI.createView(
  { layout: "vertical", height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff", id: "__alloyId117" });

  $.__views.aView.add($.__views.__alloyId117);
  $.__views.__alloyId118 = Ti.UI.createView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, textAlign: "right", id: "__alloyId118" });

  $.__views.__alloyId117.add($.__views.__alloyId118);
  $.__views.__alloyId119 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#CE1D1C", font: { fontSize: 14 }, left: 10, text: "Specialty", top: 12, id: "__alloyId119" });

  $.__views.__alloyId118.add($.__views.__alloyId119);
  $.__views.__alloyId120 = Ti.UI.createView(
  { height: Ti.UI.SIZE, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, width: "auto", id: "__alloyId120" });

  $.__views.__alloyId118.add($.__views.__alloyId120);
  $.__views.specialty = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#C8C8CD", top: 12, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT, text: "Choose Specialty", id: "specialty" });

  $.__views.__alloyId120.add($.__views.specialty);
  $.__views.__alloyId121 = Ti.UI.createView(
  { backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId121" });

  $.__views.aView.add($.__views.__alloyId121);
  $.__views.__alloyId122 = Ti.UI.createView(
  { layout: "vertical", height: Ti.UI.SIZE, selectedBackgroundColor: "#ffffff", id: "__alloyId122" });

  $.__views.aView.add($.__views.__alloyId122);
  $.__views.__alloyId123 = Ti.UI.createView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, textAlign: "right", id: "__alloyId123" });

  $.__views.__alloyId122.add($.__views.__alloyId123);
  $.__views.__alloyId124 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#CE1D1C", font: { fontSize: 14 }, left: 10, text: "Remark", top: 12, id: "__alloyId124" });

  $.__views.__alloyId123.add($.__views.__alloyId124);
  $.__views.remarkTextArea = Ti.UI.createTextArea(
  { font: { fontSize: 12 }, id: "remarkTextArea", color: "#000000", textAlign: "right", hintText: "Remark", value: "", width: Ti.UI.FILL, left: 10, right: 10, height: 100, suppressReturn: false });

  $.__views.__alloyId123.add($.__views.remarkTextArea);
  $.__views.__alloyId125 = Ti.UI.createView(
  { backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId125" });

  $.__views.aView.add($.__views.__alloyId125);
  $.__views.__alloyId126 = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, top: 10, id: "__alloyId126" });

  $.__views.aView.add($.__views.__alloyId126);
  $.__views.__alloyId127 = Ti.UI.createButton(
  { title: "Submit Appointment", borderRadius: 5, backgroundColor: "#7B7B7B", width: "70%", top: 5, height: 40, color: "#ffffff", id: "__alloyId127" });

  $.__views.__alloyId126.add($.__views.__alloyId127);
  saveRecord ? $.addListener($.__views.__alloyId127, 'click', saveRecord) : __defers['$.__views.__alloyId127!click!saveRecord'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var appointment_id = args.appointment_id || "";
  var appointmentModel = Alloy.createCollection('appointment');
  var panelListModel = Alloy.createCollection('panelList');
  var selectedClinic, specialty, doctor_panel_id;
  var appointmentDatetime;
  var toolbar;
  var duration = parseInt(Ti.App.Properties.getString('timeblock')) || 30;

  $.patient_name.text = Ti.App.Properties.getString('fullname') || "";
  $.patient_email.text = Ti.App.Properties.getString('plux_email') || "";
  var dpView = Titanium.UI.createView({
    layout: "vertical",
    height: 200,
    width: Ti.UI.FILL,
    visible: true });


  init();

  function saveRecord() {


    var remark = $.remarkTextArea.value;
    var appDate = $.appointment_datetime.text;

    if (appDate == "Choose Date and Time") {
      common.createAlert("Fail", "Please choose appointment date and time");
      Ti.App.fireEvent("appointment_index:loadingEnd");
      return false;
    }

    appDate = convertToDBDateFormat(appDate);

    remark = remark.replace(/\r?\n/g, '<br />');

    var param = {
      id: appointment_id,
      u_id: Ti.App.Properties.getString('u_id'),
      start_date: appDate,
      duration: duration,
      doctor_panel_id: doctor_panel_id,
      remark: remark.trim(),
      created: currentDateTime(),
      updated: currentDateTime() };


    console.log(doctor_panel_id);
    console.log(param);
    Ti.App.fireEvent("appointment_index:loadingStart");

    API.addAppointment({ param: param }, savedAppointment);


  }

  function savedAppointment(ex) {
    var result = ex.param;
    console.log(result);
    if (result.status == "error") {
      common.createAlert("Error", result.data);
      return false;
    } else {
      appointmentModel.saveArray(result.data);
    }

    Ti.App.fireEvent('displayRecords');
    Ti.App.fireEvent("appointment_index:loadingFinish");
    Ti.App.fireEvent("appointment_index:windowClose");
  }

  function init() {
    details = appointmentModel.getAppointmentById(appointment_id) || "";
    if (details != "") {
      var remark = details.remark;
      var regex = /<br\s*[\/]?>/gi;

      if (details.date >= currentDateTime()) {
        $.remarkTextArea.value = remark.replace(regex, "\n");
      } else {

        $.remarkTextArea.height = 0;
        $.remarkTextArea_readonly.height = Ti.UI.SIZE;
        $.remarkTextArea_readonly.text = remark.replace(regex, "\n");
      }

      $.appointment_datetime.text = timeFormat(details.date);
      $.appointment_datetime.color = "#000000";

      var clinic = panelListModel.getPanelListById(details.clinic_id);
      $.appointment_clinic.text = clinic.clinicName;
      $.appointment_clinic.color = "#000000";
      selectedClinic = details.clinic_id;

      var specialty_field = details.specialty;
      $.specialty.text = specialty_field;
    }
    if (false) {
      var done = Titanium.UI.createButton({
        title: 'Done',
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE });


      done.addEventListener('click', function () {


      });

      toolbar = Titanium.UI.iOS.createToolbar({
        items: [done],
        extendBackground: true,
        borderTop: true,
        borderBottom: false });


      dpView.add(toolbar);
    }

    var curDate = currentDateTime();
    var d = curDate.substr(0, 10);
    var cd = d.split("-");
    var t = curDate.substr(2, 16);
    var ct = t.split(":");


    var minDate = new Date();
    minDate.setFullYear(cd[0]);
    minDate.setMonth(parseInt(cd[1]) - 1);
    minDate.setDate(parseInt(cd[2]));

    if (details != "") {
      var selDate = details.date;
      d = selDate.substr(0, 10);
      cd = d.split("-");
      t = selDate.substr(2, 16);
      ct = t.split(":");
    }

    var value = new Date();
    value.setFullYear(cd[0]);
    value.setMonth(parseInt(cd[1]) - 1);
    value.setDate(parseInt(cd[2]));
    value.setHours(ct[0], ct[1], 0);




  }

  function removeAppointment() {
    appointmentModel.updateAppointmentStatus(appointment_id, 5);
    Ti.App.fireEvent('displayRecords');
  }

  $.update_selectClinic = function (e) {
    console.log(e.doctor_panel_id);
    selectedClinic = e.clinicId;
    doctor_panel_id = e.doctor_panel_id;
    $.appointment_clinic.text = e.clinicName;
    $.appointment_clinic.color = "#000000";
  };

  $.update_specialty = function (e) {
    $.specialty.text = e.specialty_name;
    $.specialty.color = "#000000";
  };

  $.update_chooseDateTime = function (e) {
    appointmentDatetime = e.date;
    $.appointment_datetime.text = e.date;
    $.appointment_datetime.color = "#000000";
  };

  function hideKeyboard() {
    $.remarkTextArea.blur();
  }

  $.appointment_datetime.addEventListener("click", function (e) {
    Ti.App.fireEvent("appointment_index:scrollToViewPage", { number: 2 });
  });

  $.appointment_clinic.addEventListener("click", function (e) {
    Ti.App.fireEvent("appointment_index:scrollToViewPage", { number: 0 });
  });





  __defers['$.__views.__alloyId127!click!saveRecord'] && $.addListener($.__views.__alloyId127, 'click', saveRecord);



  _.extend($, exports);
}

module.exports = Controller;