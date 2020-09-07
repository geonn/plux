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
  this.__controllerPath = 'voucher/forms';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  // Generated code that must be executed before all UI and/or
  // controller code. One example is all model and collection
  // declarations from markup.


  // Generated UI code
  $.__views["win"] = Ti.UI.createWindow(
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Health Screening Voucher", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId878"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId878" });

  $.__views["win"].add($.__views["__alloyId878"]);
  if (true) {
    $.__views["__alloyId879"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId879" });

    $.__views["__alloyId878"].add($.__views["__alloyId879"]);
    $.__views["__alloyId880"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId880" });

    $.__views["__alloyId879"].add($.__views["__alloyId880"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId880"].add($.__views["btnBack"]);
    $.__views["__alloyId881"] = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId881" });

    $.__views["__alloyId879"].add($.__views["__alloyId881"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Health Screening Voucher', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId881"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId882"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, text: 'Please fill in below info to request Outpatient GL from ASP', id: "__alloyId882" });

  $.__views["__alloyId878"].add($.__views["__alloyId882"]);
  $.__views["__alloyId883"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 11 }, top: 0, left: 10, right: 10, bottom: 10, text: '* COMPULSORY', id: "__alloyId883" });

  $.__views["__alloyId878"].add($.__views["__alloyId883"]);
  $.__views["forms"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "forms" });

  $.__views["__alloyId878"].add($.__views["forms"]);
  $.__views["__alloyId884"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#ffffff", format: "photo", hintText: "Recepit", attached: 0, required: 1, id: "__alloyId884" });

  $.__views["forms"].add($.__views["__alloyId884"]);
  $.__views["__alloyId885"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'REFERRAL LETTER *', touchEnabled: false, top: 10, left: 10, id: "__alloyId885" });

  $.__views["__alloyId884"].add($.__views["__alloyId885"]);
  $.__views["__alloyId886"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#ccc", top: 10, left: 10, right: 10, id: "__alloyId886" });

  $.__views["__alloyId884"].add($.__views["__alloyId886"]);
  $.__views["camera"] = Alloy.createWidget('com.geonn.camera', 'widget', { id: "camera", __parentSymbol: $.__views["__alloyId884"] });
  $.__views["camera"].setParent($.__views["__alloyId884"]);
  $.__views["patient_name"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", touchEnabled: false, id: "patient_name", option_key: "name", option_name: "name", opacity: 0.5, url: "claimunder.aspx" });

  $.__views["forms"].add($.__views["patient_name"]);
  popout ? $.addListener($.__views["patient_name"], 'click', popout) : __defers['$.__views["patient_name"]!click!popout'] = true;loadComboBox ? $.addListener($.__views["patient_name"], 'postlayout', loadComboBox) : __defers['$.__views["patient_name"]!postlayout!loadComboBox'] = true;$.__views["__alloyId887"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Patient Name", value: "", left: 5, id: "__alloyId887" });

  $.__views["patient_name"].add($.__views["__alloyId887"]);
  $.__views["__alloyId888"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Patient Name *', touchEnabled: false, left: 10, id: "__alloyId888" });

  $.__views["__alloyId887"].add($.__views["__alloyId888"]);
  $.__views["employee_name"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", touchEnabled: false, id: "employee_name", option_key: "name", option_name: "name", opacity: 0.5, url: "claimunder.aspx" });

  $.__views["forms"].add($.__views["employee_name"]);
  popout ? $.addListener($.__views["employee_name"], 'click', popout) : __defers['$.__views["employee_name"]!click!popout'] = true;loadComboBox ? $.addListener($.__views["employee_name"], 'postlayout', loadComboBox) : __defers['$.__views["employee_name"]!postlayout!loadComboBox'] = true;$.__views["__alloyId889"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Employee Name", value: "", left: 5, id: "__alloyId889" });

  $.__views["employee_name"].add($.__views["__alloyId889"]);
  $.__views["__alloyId890"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Employee Name *', touchEnabled: false, left: 10, id: "__alloyId890" });

  $.__views["__alloyId889"].add($.__views["__alloyId890"]);
  $.__views["employee_ic"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "employee_ic", value: "" });

  $.__views["forms"].add($.__views["employee_ic"]);
  $.__views["__alloyId891"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Employee IC number *", required: 1, left: 5, value: "", id: "__alloyId891" });

  $.__views["employee_ic"].add($.__views["__alloyId891"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId891"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId891"]!change!textFieldOnBlur'] = true;$.__views["hospital_name"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "hospital_name", value: "" });

  $.__views["forms"].add($.__views["hospital_name"]);
  $.__views["__alloyId892"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 50, hintText: "Name of Hospital *", required: 1, left: 5, value: "", id: "__alloyId892" });

  $.__views["hospital_name"].add($.__views["__alloyId892"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId892"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId892"]!change!textFieldOnBlur'] = true;$.__views["visit_date"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", id: "visit_date" });

  $.__views["forms"].add($.__views["visit_date"]);
  datePicker ? $.addListener($.__views["visit_date"], 'click', datePicker) : __defers['$.__views["visit_date"]!click!datePicker'] = true;$.__views["__alloyId893"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Date Visit", value: "", left: 5, id: "__alloyId893" });

  $.__views["visit_date"].add($.__views["__alloyId893"]);
  $.__views["__alloyId894"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Date of Visit *', touchEnabled: false, left: 10, id: "__alloyId894" });

  $.__views["__alloyId893"].add($.__views["__alloyId894"]);
  $.__views["diagnosis"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "diagnosis", value: "" });

  $.__views["forms"].add($.__views["diagnosis"]);
  $.__views["__alloyId895"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 50, hintText: "Diagnosis", required: 0, left: 5, value: "", id: "__alloyId895" });

  $.__views["diagnosis"].add($.__views["__alloyId895"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId895"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId895"]!change!textFieldOnBlur'] = true;$.__views["dr_name"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "dr_name", value: "" });

  $.__views["forms"].add($.__views["dr_name"]);
  $.__views["__alloyId896"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 50, hintText: "Dr Name", required: 0, left: 5, value: "", id: "__alloyId896" });

  $.__views["dr_name"].add($.__views["__alloyId896"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId896"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId896"]!change!textFieldOnBlur'] = true;$.__views["__alloyId897"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", bottom: 10, title: "SUBMIT", id: "__alloyId897" });

  $.__views["forms"].add($.__views["__alloyId897"]);
  doSubmit ? $.addListener($.__views["__alloyId897"], 'click', doSubmit) : __defers['$.__views["__alloyId897"]!click!doSubmit'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file


  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["patient_name"]!click!popout'] && $.addListener($.__views["patient_name"], 'click', popout);__defers['$.__views["patient_name"]!postlayout!loadComboBox'] && $.addListener($.__views["patient_name"], 'postlayout', loadComboBox);__defers['$.__views["employee_name"]!click!popout'] && $.addListener($.__views["employee_name"], 'click', popout);__defers['$.__views["employee_name"]!postlayout!loadComboBox'] && $.addListener($.__views["employee_name"], 'postlayout', loadComboBox);__defers['$.__views["__alloyId891"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId891"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId892"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId892"], 'change', textFieldOnBlur);__defers['$.__views["visit_date"]!click!datePicker'] && $.addListener($.__views["visit_date"], 'click', datePicker);__defers['$.__views["__alloyId895"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId895"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId896"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId896"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId897"]!click!doSubmit'] && $.addListener($.__views["__alloyId897"], 'click', doSubmit);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\voucher\forms.js.map