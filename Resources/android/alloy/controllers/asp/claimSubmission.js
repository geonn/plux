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
  this.__controllerPath = 'asp/claimSubmission';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Claim Submission", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId311"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId311" });

  $.__views["win"].add($.__views["__alloyId311"]);
  if (true) {
    $.__views["__alloyId312"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId312" });

    $.__views["__alloyId311"].add($.__views["__alloyId312"]);
    $.__views["__alloyId313"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId313" });

    $.__views["__alloyId312"].add($.__views["__alloyId313"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId313"].add($.__views["btnBack"]);
    $.__views["__alloyId314"] = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId314" });

    $.__views["__alloyId312"].add($.__views["__alloyId314"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Claim Submission', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId314"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId315"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, text: 'Please fill in below info to claim from ASP', id: "__alloyId315" });

  $.__views["__alloyId311"].add($.__views["__alloyId315"]);
  $.__views["__alloyId316"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 11 }, top: 0, left: 10, right: 10, bottom: 10, text: '* COMPULSORY', id: "__alloyId316" });

  $.__views["__alloyId311"].add($.__views["__alloyId316"]);
  $.__views["forms"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "forms" });

  $.__views["__alloyId311"].add($.__views["forms"]);
  $.__views["receipt"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#ffffff", id: "receipt", format: "photo", hintText: "Recepit", attached: 0 });

  $.__views["forms"].add($.__views["receipt"]);
  $.__views["__alloyId317"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Receipt Attachment *', touchEnabled: false, top: 10, left: 10, value: "", required: 1, hintText: "Recepit Attachment", id: "__alloyId317" });

  $.__views["receipt"].add($.__views["__alloyId317"]);
  $.__views["__alloyId318"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#ccc", top: 10, left: 10, right: 10, id: "__alloyId318" });

  $.__views["receipt"].add($.__views["__alloyId318"]);
  $.__views["camera"] = Alloy.createWidget('com.geonn.camera', 'widget', { id: "camera", __parentSymbol: $.__views["receipt"] });
  $.__views["camera"].setParent($.__views["receipt"]);
  $.__views["RECNO"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "RECNO", value: "" });

  $.__views["forms"].add($.__views["RECNO"]);
  $.__views["__alloyId319"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Receipt Number *", required: 1, left: 5, value: "", id: "__alloyId319" });

  $.__views["RECNO"].add($.__views["__alloyId319"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId319"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId319"]!blur!textFieldOnBlur'] = true;$.__views["CATEGORY"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", touchEnabled: false, id: "CATEGORY", option_key: "catID", option_name: "catDesc", opacity: 0.5, url: "claimcategory.aspx" });

  $.__views["forms"].add($.__views["CATEGORY"]);
  popout ? $.addListener($.__views["CATEGORY"], 'click', popout) : __defers['$.__views["CATEGORY"]!click!popout'] = true;loadComboBox ? $.addListener($.__views["CATEGORY"], 'postlayout', loadComboBox) : __defers['$.__views["CATEGORY"]!postlayout!loadComboBox'] = true;$.__views["__alloyId320"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Category", value: "", left: 5, id: "__alloyId320" });

  $.__views["CATEGORY"].add($.__views["__alloyId320"]);
  $.__views["__alloyId321"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Category *', touchEnabled: false, left: 10, id: "__alloyId321" });

  $.__views["__alloyId320"].add($.__views["__alloyId321"]);
  $.__views["MEMNO"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", touchEnabled: false, id: "MEMNO", option_key: "memno", option_name: "name", opacity: 0.5, url: "claimunder.aspx" });

  $.__views["forms"].add($.__views["MEMNO"]);
  popout ? $.addListener($.__views["MEMNO"], 'click', popout) : __defers['$.__views["MEMNO"]!click!popout'] = true;loadComboBox ? $.addListener($.__views["MEMNO"], 'postlayout', loadComboBox) : __defers['$.__views["MEMNO"]!postlayout!loadComboBox'] = true;$.__views["__alloyId322"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Claim Under", value: "", left: 5, id: "__alloyId322" });

  $.__views["MEMNO"].add($.__views["__alloyId322"]);
  $.__views["__alloyId323"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Claim Under *', touchEnabled: false, left: 10, id: "__alloyId323" });

  $.__views["__alloyId322"].add($.__views["__alloyId323"]);
  $.__views["AMT"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "AMT", value: "" });

  $.__views["forms"].add($.__views["AMT"]);
  $.__views["__alloyId324"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Receipt Amount (RM) *", keyboardType: Titanium.UI.KEYBOARD_TYPE_DECIMAL_PAD, required: 1, left: 5, value: "", id: "__alloyId324" });

  $.__views["AMT"].add($.__views["__alloyId324"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId324"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId324"]!blur!textFieldOnBlur'] = true;$.__views["VISITDT"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#fba81c", id: "VISITDT" });

  $.__views["forms"].add($.__views["VISITDT"]);
  datePicker ? $.addListener($.__views["VISITDT"], 'click', datePicker) : __defers['$.__views["VISITDT"]!click!datePicker'] = true;$.__views["__alloyId325"] = Ti.UI.createView(
  { borderWidth: 0, padding: { left: 10, right: 10, bottom: 10, top: 10 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: "Date Visit", value: "", left: 5, id: "__alloyId325" });

  $.__views["VISITDT"].add($.__views["__alloyId325"]);
  $.__views["__alloyId326"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Date Visit *', touchEnabled: false, left: 10, id: "__alloyId326" });

  $.__views["__alloyId325"].add($.__views["__alloyId326"]);
  $.__views["NCLINIC"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "NCLINIC", value: "" });

  $.__views["forms"].add($.__views["NCLINIC"]);
  $.__views["__alloyId327"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 40, hintText: "Clinic / Hospital Name *", required: 1, left: 5, value: "", id: "__alloyId327" });

  $.__views["NCLINIC"].add($.__views["__alloyId327"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId327"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId327"]!blur!textFieldOnBlur'] = true;$.__views["REMARKS"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "REMARKS", value: "" });

  $.__views["forms"].add($.__views["REMARKS"]);
  $.__views["__alloyId328"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Remarks / Illness", required: 0, left: 5, value: "", id: "__alloyId328" });

  $.__views["REMARKS"].add($.__views["__alloyId328"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId328"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId328"]!blur!textFieldOnBlur'] = true;$.__views["GSTAMT"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "GSTAMT", value: "" });

  $.__views["forms"].add($.__views["GSTAMT"]);
  $.__views["__alloyId329"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "GST Amount", keyboardType: Titanium.UI.KEYBOARD_TYPE_DECIMAL_PAD, required: 0, left: 5, value: "", id: "__alloyId329" });

  $.__views["GSTAMT"].add($.__views["__alloyId329"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId329"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId329"]!blur!textFieldOnBlur'] = true;$.__views["MCDAYS"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "MCDAYS", value: "" });

  $.__views["forms"].add($.__views["MCDAYS"]);
  $.__views["__alloyId330"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "MC Issued (Days)", keyboardType: Titanium.UI.KEYBOARD_TYPE_DECIMAL_PAD, required: 0, left: 5, value: "", id: "__alloyId330" });

  $.__views["MCDAYS"].add($.__views["__alloyId330"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId330"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId330"]!blur!textFieldOnBlur'] = true;$.__views["DIAGNOSIS"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "DIAGNOSIS", value: "" });

  $.__views["forms"].add($.__views["DIAGNOSIS"]);
  $.__views["__alloyId331"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Diagnosis *", required: 1, left: 5, value: "", id: "__alloyId331" });

  $.__views["DIAGNOSIS"].add($.__views["__alloyId331"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId331"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId331"]!blur!textFieldOnBlur'] = true;$.__views["MEDICATION"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "MEDICATION", value: "" });

  $.__views["forms"].add($.__views["MEDICATION"]);
  $.__views["__alloyId332"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Medication", required: 0, left: 5, value: "", id: "__alloyId332" });

  $.__views["MEDICATION"].add($.__views["__alloyId332"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId332"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId332"]!blur!textFieldOnBlur'] = true;$.__views["TREATMENT"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "TREATMENT", value: "" });

  $.__views["forms"].add($.__views["TREATMENT"]);
  $.__views["__alloyId333"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "Treatment", required: 0, left: 5, value: "", id: "__alloyId333" });

  $.__views["TREATMENT"].add($.__views["__alloyId333"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId333"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId333"]!blur!textFieldOnBlur'] = true;$.__views["GLAMT"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "GLAMT", value: "" });

  $.__views["forms"].add($.__views["GLAMT"]);
  $.__views["__alloyId334"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", hintText: "GL Amount (If applicable)", keyboardType: Titanium.UI.KEYBOARD_TYPE_DECIMAL_PAD, required: 0, left: 5, value: "", id: "__alloyId334" });

  $.__views["GLAMT"].add($.__views["__alloyId334"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId334"], 'blur', textFieldOnBlur) : __defers['$.__views["__alloyId334"]!blur!textFieldOnBlur'] = true;$.__views["tnc"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "tnc", value: "" });

  $.__views["forms"].add($.__views["tnc"]);
  $.__views["infineon_tnc"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "infineon_tnc" });

  $.__views["tnc"].add($.__views["infineon_tnc"]);
  $.__views["__alloyId335"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'Terms and Conditions:', id: "__alloyId335" });

  $.__views["infineon_tnc"].add($.__views["__alloyId335"]);
  $.__views["tnc_value"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "tnc_value" });

  $.__views["infineon_tnc"].add($.__views["tnc_value"]);
  $.__views["__alloyId336"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, hintText: "tnc", required: 1, value: "", id: "__alloyId336" });

  $.__views["infineon_tnc"].add($.__views["__alloyId336"]);
  $.__views["__alloyId337"] = Ti.UI.createView(
  { borderWidth: 1, width: 20, height: 20, left: 10, top: 10, bottom: 10, borderColor: "#ffffff", id: "__alloyId337" });

  $.__views["__alloyId336"].add($.__views["__alloyId337"]);
  checkedTnc ? $.addListener($.__views["__alloyId337"], 'click', checkedTnc) : __defers['$.__views["__alloyId337"]!click!checkedTnc'] = true;$.__views["__alloyId338"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'I have read and agree to the Terms and Conditions above', left: 35, top: 10, bottom: 10, id: "__alloyId338" });

  $.__views["__alloyId336"].add($.__views["__alloyId338"]);
  $.__views["__alloyId339"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", bottom: 10, title: "SUBMIT", id: "__alloyId339" });

  $.__views["forms"].add($.__views["__alloyId339"]);
  doSubmit ? $.addListener($.__views["__alloyId339"], 'click', doSubmit) : __defers['$.__views["__alloyId339"]!click!doSubmit'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var mode = args.mode == "update" ? "UPDATE" : "INSERT";
  var serial = args.serial || "";
  var corpcode = Ti.App.Properties.getString('corpcode');
  var empno = Ti.App.Properties.getString('empno');
  var memno = Ti.App.Properties.getString('memno');
  var name = Ti.App.Properties.getString('fullname');
  var loading = Alloy.createController('loading');
  var error_message = "";
  var filedata = "";

  function init() {
    console.log(corpcode + " check corpcode");
    var forms_arr = $.forms.getChildren();
    Alloy.Globals.API.callByGet({ url: "tnc.aspx", params: "corpcode=" + corpcode }, {
      onload: function (responseText) {
        var result = JSON.parse(responseText);
        console.log(result);
        for (var i = 0; i < result.length; i++) {
          var tnc = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], bottom: 5, color: "#fff", text: result[i] });
          $.tnc_value.add(tnc);
        };
      } });


    if (corpcode == "IFMY" || corpcode == "IFLP") {
      for (var i = 0; forms_arr.length > i; i++) {
        console.log(forms_arr[i].id);
        if (forms_arr[i].id == "REMARKS" || forms_arr[i].id == "GSTAMT" || forms_arr[i].id == "MCDAYS" || forms_arr[i].id == "GLAMT" || forms_arr[i].id == "GLAMT") {

          $.forms.remove(forms_arr[i]);
        }
      }
    } else if (corpcode == "SYNTHO") {
      for (var i = 0; forms_arr.length > i; i++) {
        console.log(forms_arr[i].id);
        if (forms_arr[i].id == "GSTAMT" || forms_arr[i].id == "MCDAYS" || forms_arr[i].id == "GLAMT" || forms_arr[i].id == "GLAMT") {
          $.forms.remove(forms_arr[i]);
        }
      }
    } else if (corpcode == "SEAPG" || corpcode == "SEAJB" || corpcode == "SEASYS") {
      for (var i = 0; $.forms.children.length > i; i++) {
        console.log(forms_arr[i].id);
        if ($.forms.children[i].id == "MEDICATION" || $.forms.children[i].id == "TREATMENT") {
          $.forms.remove($.forms.children[i]);
        } else if ($.forms.children[i].id == 'DIAGNOSIS') {
          console.log($.forms.children[i].children[0].hintText);
          console.log($.forms.children[i].children[0].required);
          $.forms.children[i].children[0].hintText = "Diagnosis";
          console.log($.forms.children[i].children[0].hintText);
          $.forms.children[i].children[0].required = 0;
          console.log($.forms.children[i].children[0].required);
        }
      }

    } else {
      console.log($.forms.children.length);
      for (var i = 0; $.forms.children.length > i; i++) {
        console.log(forms_arr[i].id);
        if ($.forms.children[i].id == "receipt" || $.forms.children[i].id == "MEDICATION" || $.forms.children[i].id == "TREATMENT" || $.forms.children[i].id == "tnc") {
          $.forms.remove($.forms.children[i]);
        } else if ($.forms.children[i].id == 'DIAGNOSIS') {
          console.log($.forms.children[i].children[0].hintText);
          console.log($.forms.children[i].children[0].required);
          $.forms.children[i].children[0].hintText = "Diagnosis";
          console.log($.forms.children[i].children[0].hintText);
          $.forms.children[i].children[0].required = 0;
          console.log($.forms.children[i].children[0].required);
        }
      }
    }
    //loading.start();
    $.win.add(loading.getView());
    $.camera.init({});
  }
  init();

  function textFieldOnBlur(e) {
    checkRequired(e.source);
  }

  function checkRequired(obj) {
    if (obj.required && obj.value == "") {
      error_message += obj.hintText + " cannot be empty\n";
      obj.parent.backgroundColor = "#e8534c";
    } else {
      obj.parent.backgroundColor = "#55a939";
    }
  }

  function doSubmit() {
    var forms_arr = $.forms.getChildren();
    var params = { CORPCODE: corpcode, EMPNO: empno, MODE: "INSERT" };
    var error_message = "";
    for (var i = 0; i < forms_arr.length - 1; i++) {
      if (forms_arr[i].format == "photo" && forms_arr[i].children[2].attached) {
        console.log(forms_arr[i].children[2].filedata.nativePath + " see what is the file name");
        Alloy.Globals._.extend(params, { B64FS: Ti.Utils.base64encode(forms_arr[i].children[2].filedata).toString() });
        Alloy.Globals._.extend(params, { RCPFILE: Math.random().toString(36).slice(-10) + ".jpg" });
      } else {

        if (forms_arr[i].children[0].required && forms_arr[i].children[0].value == "") {
          if (forms_arr[i].id == "tnc") {
            error_message += "You must agree with the Terms and Conditions\n";
          } else {
            error_message += forms_arr[i].children[0].hintText + " cannot be empty\n";
          }
        } else {
          params[forms_arr[i].id] = forms_arr[i].children[0].value;
        }
      }
    };
    if (error_message != "") {
      alert(error_message);
      return;
    }
    params["u_id"] = Ti.App.Properties.getString('u_id');
    loading.start();
    console.log(params);
    Alloy.Globals.API.callByPost({ url: "https://appsapi.aspmedic.com/aida/claimsubmission_post.aspx", fullurl: true, params: params }, function (responseText) {
      var result = JSON.parse(responseText);
      if (result[0]['code'] == "02") {
        Alloy.Globals.common.createAlert("Success", result[0]['message'], function () {
          $.win.close();
        });
      } else {
        Alloy.Globals.common.createAlert("Error", result[0]['message']);
      }
      console.log(result); /*
                           var dialog = Ti.UI.createAlertDialog({
                           cancel: 1,
                           buttonNames: ['Ok'],
                           status: result.status,
                           message: (result.status == "success")?"Your referral has been successfully submitted":result.data.join("\n"),
                           title: (result.status == "success")?"Success":"Error"
                           });
                           dialog.addEventListener('click', function(e) {
                           if(e.source.status == "success"){
                           $.win.close();
                           }
                           });
                           dialog.show();*/
      loading.finish();
    });
  }

  function doSubmitBack() {
    loading.start();
    var childs = $.forms.getChildren();
    var params = "CORPCODE=" + corpcode + "&empno=" + empno + "&MODE=" + mode;

    for (var i = 0; i < childs.length - 1; i++) {
      if (forms_arr[i].format == "photo" && forms_arr[i].children[2].attached) {
        filedata = forms_arr[i].children[2].filedata;
      } else {
        checkRequired(childs[i].children[0]);
        params += "&" + childs[i].id + "=" + childs[i].children[0].value;
      }

    };
    if (error_message.length > 0) {
      alert(error_message);
      loading.finish();
    } else {
      Alloy.Globals.API.callByGet({ url: "ClaimSubmission.aspx", params: params }, {
        onload: function (responseText) {
          var result = JSON.parse(responseText);
          /*if(result[0]['code'] == "02"){
                                                                                            /*if(filedata != ""){
                                                                                                Alloy.Globals.API.callByPost({url: "eReceiptInsert.aspx", new: true, domain: "ERECEIPT_DOMAIN", params: {
                                                                                                    B64Fs: filedata,
                                                                                                    FileName: ,
                                                                                                    Serial: ,
                                                                                                    UserID: empno,
                                                                                                }}, function(responseText){
                                                                                                Alloy.Globals.common.createAlert("Success", result[0]['message'],function(){
                                                                                                    $.win.close();
                                                                                                });
                                                                                              });
                                                                                            }else{
                                                                                                Alloy.Globals.common.createAlert("Success", result[0]['message'],function(){
                                                                                                    $.win.close();
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                            
                                                                                        }else{
                                                                                            Alloy.Globals.common.createAlert("Error", result[0]['message'] );
                                                                                        } */

        }, onfinish: function () {
          loading.finish();
        }, onerror: function () {

        } });

    }
    error_message = "";
  }
  var checked = $.UI.create("ImageView", { image: "images/checkbox.png", width: 40, height: 40, left: 0, top: 0, touchEnabled: false });
  function checkedTnc(e) {
    console.log(e.source.parent.parent.value + ' e.source.parent.parent.value');

    if (e.source.parent.value == "") {
      e.source.parent.value = 1;
      e.source.parent.add(checked);
      //e.source.backgroundColor = "#FFFFFF";
    } else {
      e.source.parent.value = "";
      e.source.parent.remove(checked);
      //e.source.backgroundColor = "transparent";
    }
  }

  function datePicker(e) {
    var val_date = typeof e.source.children[0].date != "undefined" ? e.source.children[0].date : new Date();
    var view_container = $.UI.create("View", { classes: ['wfill', 'hfill'], zIndex: 50 });
    var mask = $.UI.create("View", {
      classes: ['wfill', 'hfill'],
      backgroundColor: "#80000000" });

    var view_box = $.UI.create("View", { classes: ['wfill', 'hsize', 'vert'],
      backgroundGradient: {
        type: 'linear',
        colors: [{ color: '#ffffff', offset: 0.0 }, { color: '#67b6e1', offset: 0.4 }, { color: '#67b6e1', offset: 0.6 }, { color: '#ffffff', offset: 1.0 }] },
      zIndex: 50 });
    var picker = $.UI.create("Picker", {
      type: Ti.UI.PICKER_TYPE_DATE,
      value: val_date,
      backgroundColor: "Transparent",
      dateTimeColor: "#ffffff",
      top: 10 });

    var ok_button = $.UI.create("Button", { classes: ['wfill'], borderRadius: 0, height: 50, title: "Select a Date" });
    view_box.add(picker);
    view_box.add(ok_button);
    view_container.add(view_box);
    view_container.add(mask);
    $.win.add(view_container);

    mask.addEventListener("click", function () {
      $.win.remove(view_container);
    });

    ok_button.addEventListener("click", function (ex) {
      var dd = picker.value.getDate();
      var mm = picker.value.getMonth() + 1;
      var yyyy = picker.value.getFullYear();
      e.source.children[0].value = mm + '/' + dd + '/' + yyyy;
      e.source.children[0].date = picker.value;
      e.source.children[0].children[0].text = mm + '/' + dd + '/' + yyyy;
      e.source.children[0].children[0].color = "#000000";
      e.source.backgroundColor = "#55a939";
      $.win.remove(view_container);
    });
  }

  function popout(e) {
    if (e.source.data.length == null || e.source.data.length <= 0) {
      alert("Sorry, the " + e.source.children[0].hintText + " listing is empty. Please contact our helpdesk for help.");
      return;
    }
    var options_arr = Alloy.Globals._.pluck(e.source.data, e.source.option_name);
    options_arr.push("Cancel");
    var dialog = Ti.UI.createOptionDialog({
      cancel: options_arr.length > 0 ? options_arr.length - 1 : 0,
      options: options_arr,
      selectedIndex: e.source.value || 0,
      title: e.source.children[0].text });


    dialog.show();
    dialog.addEventListener("click", function (ex) {
      if (false ? ex.cancel != ex.index : !ex.cancel) {
        e.source.children[0].children[0].text = options_arr[ex.index];
        e.source.children[0].value = e.source.data[ex.index][e.source.option_key];
        e.source.children[0].children[0].color = "#000000";
        e.source.backgroundColor = "#55a939";
      }
    });
  }

  function loadComboBox(e) {
    var indicator = $.UI.create("ActivityIndicator", { classes: ['wsize', 'hsize'], style: Ti.UI.ActivityIndicatorStyle.DARK });
    indicator.show();
    e.source.add(indicator);
    var params = "CORPCODE=" + corpcode + "&memno=" + memno + "&empno=" + empno;
    Alloy.Globals.API.callByGet({ url: e.source.url, params: params }, {
      onload: function (responseText) {
        var result = JSON.parse(responseText);
        e.source.data = result;
      }, onfinish: function () {
        e.source.opacity = 1;
        e.source.touchEnabled = true;
        indicator.hide();
      }, onerror: function () {

      } });

  }

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId319"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId319"], 'blur', textFieldOnBlur);__defers['$.__views["CATEGORY"]!click!popout'] && $.addListener($.__views["CATEGORY"], 'click', popout);__defers['$.__views["CATEGORY"]!postlayout!loadComboBox'] && $.addListener($.__views["CATEGORY"], 'postlayout', loadComboBox);__defers['$.__views["MEMNO"]!click!popout'] && $.addListener($.__views["MEMNO"], 'click', popout);__defers['$.__views["MEMNO"]!postlayout!loadComboBox'] && $.addListener($.__views["MEMNO"], 'postlayout', loadComboBox);__defers['$.__views["__alloyId324"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId324"], 'blur', textFieldOnBlur);__defers['$.__views["VISITDT"]!click!datePicker'] && $.addListener($.__views["VISITDT"], 'click', datePicker);__defers['$.__views["__alloyId327"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId327"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId328"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId328"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId329"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId329"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId330"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId330"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId331"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId331"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId332"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId332"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId333"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId333"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId334"]!blur!textFieldOnBlur'] && $.addListener($.__views["__alloyId334"], 'blur', textFieldOnBlur);__defers['$.__views["__alloyId337"]!click!checkedTnc'] && $.addListener($.__views["__alloyId337"], 'click', checkedTnc);__defers['$.__views["__alloyId339"]!click!doSubmit'] && $.addListener($.__views["__alloyId339"], 'click', doSubmit);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\asp\claimSubmission.js.map