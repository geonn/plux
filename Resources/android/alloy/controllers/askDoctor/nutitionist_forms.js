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
  this.__controllerPath = 'askDoctor/nutitionist_forms';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "Patient Information", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId166"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId166" });

  $.__views["win"].add($.__views["__alloyId166"]);
  if (true) {
    $.__views["__alloyId167"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, id: "__alloyId167" });

    $.__views["__alloyId166"].add($.__views["__alloyId167"]);
    $.__views["__alloyId168"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId168" });

    $.__views["__alloyId167"].add($.__views["__alloyId168"]);
    $.__views["__alloyId169"] = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId169" });

    $.__views["__alloyId168"].add($.__views["__alloyId169"]);
    closeWindow ? $.addListener($.__views["__alloyId169"], 'click', closeWindow) : __defers['$.__views["__alloyId169"]!click!closeWindow'] = true;$.__views["__alloyId170"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId170" });

    $.__views["__alloyId167"].add($.__views["__alloyId170"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Patient Information', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId170"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId171"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "__alloyId171" });

  $.__views["__alloyId166"].add($.__views["__alloyId171"]);
  $.__views["__alloyId172"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#fff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, bottom: 10, textAlign: "center", text: L('pleasefillin_nutritionist'), id: "__alloyId172" });

  $.__views["__alloyId171"].add($.__views["__alloyId172"]);
  $.__views["forms"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "forms" });

  $.__views["__alloyId171"].add($.__views["forms"]);
  $.__views["email"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, hintText: L('email'), id: "email", required: 1, value: "" });

  $.__views["forms"].add($.__views["email"]);
  $.__views["name"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, hintText: L('name'), id: "name", required: 1, value: "" });

  $.__views["forms"].add($.__views["name"]);
  $.__views["contact_no"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, hintText: L('contact_no'), keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, id: "contact_no", required: 1, value: "" });

  $.__views["forms"].add($.__views["contact_no"]);
  $.__views["gender_view"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, borderRadius: "5", required: 1, bottom: 10, newline: 1, left: 10, righ: 10, hintText: L('sex'), value: "", height: 40, id: "gender_view" });

  $.__views["forms"].add($.__views["gender_view"]);
  $.__views["__alloyId173"] = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, width: "50%", right: 1, gender: L('male'), backgroundColor: "#ffffff", id: "__alloyId173" });

  $.__views["gender_view"].add($.__views["__alloyId173"]);
  genderSelect ? $.addListener($.__views["__alloyId173"], 'click', genderSelect) : __defers['$.__views["__alloyId173"]!click!genderSelect'] = true;$.__views["__alloyId174"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, touchEnabled: false, textAlign: "center", text: L('male'), id: "__alloyId174" });

  $.__views["__alloyId173"].add($.__views["__alloyId174"]);
  $.__views["__alloyId175"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, right: 10, backgroundColor: "#ffffff", gender: L('female'), id: "__alloyId175" });

  $.__views["gender_view"].add($.__views["__alloyId175"]);
  genderSelect ? $.addListener($.__views["__alloyId175"], 'click', genderSelect) : __defers['$.__views["__alloyId175"]!click!genderSelect'] = true;$.__views["__alloyId176"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, touchEnabled: false, textAlign: "center", text: L('female'), id: "__alloyId176" });

  $.__views["__alloyId175"].add($.__views["__alloyId176"]);
  $.__views["Ethnic"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "Ethnic", hintText: L('Ethnic'), value: "" });

  $.__views["forms"].add($.__views["Ethnic"]);
  popout ? $.addListener($.__views["Ethnic"], 'click', popout) : __defers['$.__views["Ethnic"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["Ethnic"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["Ethnic"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId177"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('Ethnic'), id: "__alloyId177" });

  $.__views["Ethnic"].add($.__views["__alloyId177"]);
  $.__views["if_other"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, id: "if_other", required: 0, value: "" });

  $.__views["forms"].add($.__views["if_other"]);
  $.__views["age"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('age'), newline: 1, keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, id: "age", required: 1, value: "" });

  $.__views["forms"].add($.__views["age"]);
  $.__views["weight"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('weight'), newline: 1, keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, id: "weight", required: 1, value: "" });

  $.__views["forms"].add($.__views["weight"]);
  $.__views["height"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('height'), newline: 1, keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, id: "height", required: 1, value: "" });

  $.__views["forms"].add($.__views["height"]);
  $.__views["any_medical_condition"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "any_medical_condition", hintText: L('any_medical_condition'), value: "" });

  $.__views["forms"].add($.__views["any_medical_condition"]);
  popout ? $.addListener($.__views["any_medical_condition"], 'click', popout) : __defers['$.__views["any_medical_condition"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["any_medical_condition"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["any_medical_condition"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId178"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('any_medical_condition'), id: "__alloyId178" });

  $.__views["any_medical_condition"].add($.__views["__alloyId178"]);
  $.__views["__alloyId179"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, required: 0, value: "", id: "__alloyId179" });

  $.__views["forms"].add($.__views["__alloyId179"]);
  $.__views["find_your_diet_intake"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "find_your_diet_intake", hintText: L('find_your_diet_intake'), value: "" });

  $.__views["forms"].add($.__views["find_your_diet_intake"]);
  popout ? $.addListener($.__views["find_your_diet_intake"], 'click', popout) : __defers['$.__views["find_your_diet_intake"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["find_your_diet_intake"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["find_your_diet_intake"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId180"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('find_your_diet_intake'), id: "__alloyId180" });

  $.__views["find_your_diet_intake"].add($.__views["__alloyId180"]);
  $.__views["yes_please_state"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, id: "yes_please_state", required: 0, value: "" });

  $.__views["forms"].add($.__views["yes_please_state"]);
  $.__views["weight"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('meals_per_day'), newline: 1, keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, id: "weight", required: 1, value: "" });

  $.__views["forms"].add($.__views["weight"]);
  $.__views["glass_of_plain_water"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, id: "glass_of_plain_water", required: 1, hintText: L('glass_of_plain_water'), value: "" });

  $.__views["forms"].add($.__views["glass_of_plain_water"]);
  popout ? $.addListener($.__views["glass_of_plain_water"], 'click', popout) : __defers['$.__views["glass_of_plain_water"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["glass_of_plain_water"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["glass_of_plain_water"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId181"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('glass_of_plain_water'), id: "__alloyId181" });

  $.__views["glass_of_plain_water"].add($.__views["__alloyId181"]);
  $.__views["__alloyId182"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, required: 0, value: "", id: "__alloyId182" });

  $.__views["forms"].add($.__views["__alloyId182"]);
  $.__views["servings_of_fruits"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, hintText: L('servings_of_fruits'), id: "servings_of_fruits", value: "" });

  $.__views["forms"].add($.__views["servings_of_fruits"]);
  popout ? $.addListener($.__views["servings_of_fruits"], 'click', popout) : __defers['$.__views["servings_of_fruits"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["servings_of_fruits"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["servings_of_fruits"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId183"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('servings_of_fruits'), id: "__alloyId183" });

  $.__views["servings_of_fruits"].add($.__views["__alloyId183"]);
  $.__views["__alloyId184"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, required: 0, value: "", id: "__alloyId184" });

  $.__views["forms"].add($.__views["__alloyId184"]);
  $.__views["often_oder_food"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, id: "often_oder_food", required: 1, newline: 1, hintText: L('often_oder_food'), value: "" });

  $.__views["forms"].add($.__views["often_oder_food"]);
  popout ? $.addListener($.__views["often_oder_food"], 'click', popout) : __defers['$.__views["often_oder_food"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["often_oder_food"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["often_oder_food"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId185"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('often_oder_food'), id: "__alloyId185" });

  $.__views["often_oder_food"].add($.__views["__alloyId185"]);
  $.__views["exercise_regularly"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "exercise_regularly", hintText: L('exercise_regularly'), value: "" });

  $.__views["forms"].add($.__views["exercise_regularly"]);
  popout ? $.addListener($.__views["exercise_regularly"], 'click', popout) : __defers['$.__views["exercise_regularly"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["exercise_regularly"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["exercise_regularly"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId186"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('exercise_regularly'), id: "__alloyId186" });

  $.__views["exercise_regularly"].add($.__views["__alloyId186"]);
  $.__views["yes_please_state"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, id: "yes_please_state", required: 0, value: "" });

  $.__views["forms"].add($.__views["yes_please_state"]);
  $.__views["your_target"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "your_target", hintText: L('your_target'), value: "" });

  $.__views["forms"].add($.__views["your_target"]);
  popout ? $.addListener($.__views["your_target"], 'click', popout) : __defers['$.__views["your_target"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["your_target"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["your_target"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId187"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('your_target'), id: "__alloyId187" });

  $.__views["your_target"].add($.__views["__alloyId187"]);
  $.__views["yes_please_state"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, id: "yes_please_state", required: 0, value: "" });

  $.__views["forms"].add($.__views["yes_please_state"]);
  $.__views["saveBtn"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", bottom: 10, id: "saveBtn", title: L('submit') });

  $.__views["forms"].add($.__views["saveBtn"]);
  sendMessage ? $.addListener($.__views["saveBtn"], 'click', sendMessage) : __defers['$.__views["saveBtn"]!click!sendMessage'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var dr_id = "";
  var u_id = parseInt(Ti.App.Properties.getString('u_id'));
  var gender = "";
  var loading = Alloy.createController("loading");
  var combo_list = {
    Ethnic: [L('Malay'), L('Chinese'), L('Indian'), L('Other'), L('Cancel')],
    any_medical_condition: [L('Hypertension'), L('Diabetes'), L('Hyperlipidemia'), L('None'), L('Other'), L('Cancel')],
    find_your_diet_intake: [L('Proper_Meal_Time'), L('Skip_Meal'), L('Other'), L('Cancel')],
    exercise_regularly: [L('one_per_week'), L('two_per_week'), L('Everyday'), L('None'), L('Other'), L('Cancel')],
    your_target: [L('Cholesterol_Level'), L('Sugar_Level'), L('Weight_Loss'), L('Other'), L('Cancel')],
    often_oder_food: [L("Yes"), L("No"), L('Cancel')],
    servings_of_fruits: [L('one_2_per_week'), L('three_4_per_week'), L('None'), L('Other'), L('Cancel')],
    glass_of_plain_water: [L('one_3_per_week'), L('four_6_per_week'), L('seven_9_per_week'), L('None'), L('Other'), L('Cancel')] };


  function loadComboBoxLocal(e) {
    var arr = combo_list[e.source.id];
    e.source.data = arr;
    e.source.data_arr = arr;

    e.source.opacity = 1;
    e.source.touchEnabled = true;
  }

  function ValidateEmail(mail)
  {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat))
    {
      return true;
    } else {
      return false;
    }
  }

  function popout(e) {
    if (e.source.data.length == null || e.source.data.length <= 0) {
      alert("Sorry, the " + e.source.children[0].hintText + " listing is empty. Please contact our helpdesk for help.");
      return;
    }
    var options_arr = e.source.data_arr;
    var dialog = Ti.UI.createOptionDialog({
      cancel: options_arr.length - 1,
      options: options_arr,
      selectedIndex: e.source.selectedIndex || 0,
      title: e.source.HintText });


    dialog.show();
    dialog.addEventListener("click", function (ex) {
      console.log(ex.cancel + " " + ex.index);
      if (false ? ex.cancel != ex.index : !ex.cancel) {
        e.source.children[0].text = options_arr[ex.index];
        e.source.value = options_arr[ex.index];
        e.source.selectedIndex = ex.index;
      }
    });
  }

  function init() {
    $.win.add(loading.getView());
    preset();
  }

  init();

  function hinttextOnFocus(e) {
    if (e.source.value == e.source._hintText) {
      e.source.value = "";
    }
  }


  function hinttextOnBlur(e) {
    if (e.source.value == "") {
      e.source.value = e.source._hintText;
    }
  }

  function preset() {
    var name = Ti.App.Properties.getString('fullname') || Ti.App.Properties.getString('name');
    var ic = Ti.App.Properties.getString('ic_no') || Ti.App.Properties.getString('ic');
    var age = Ti.App.Properties.getString('age') || "";
    var email = Ti.App.Properties.getString('email') || "";
    $.email.value = email;
    $.name.value = name;
    $.age.value = age;
  }

  function genderSelect(e) {
    var gender_child = $.gender_view.getChildren();
    console.log(gender_child.length + " children! number");
    for (var i = 0; i < gender_child.length; i++) {
      gender_child[i].backgroundColor = "#ffffff";
      gender_child[i].children[0].color = "#606060";
    };

    e.source.parent.value = e.source.gender;

    e.source.children[0].color = "#ffffff";
    e.source.backgroundColor = "red";
  }
  var sending = false;
  function sendMessage() {
    var model = Alloy.createCollection("chat");

    loading.start();
    sending = true;

    var forms = $.forms.getChildren();
    var message = "";
    var required = 0;
    var error_message = "Please fill in all the required question";
    for (var i = 0; i < forms.length - 1; i++) {
      if (forms[i].required == 1) {
        if (forms[i].value == "") {
          forms[i].borderWidth = 1;
          forms[i].borderColor = "red";
          required = 1;
        } else {
          console.log(forms[i].value);
          forms[i].borderWidth = 0;
          if (forms[i].id == 'email') {
            if (!ValidateEmail(forms[i].value)) {
              forms[i].borderWidth = 1;
              forms[i].borderColor = "red";
              required = 1;
              error_message += "\r\nInvalid email address";
            }
          }
          if (forms[i].id == 'age') {
            if (forms[i].value < 1) {
              forms[i].borderWidth = 1;
              forms[i].borderColor = "red";
              required = 1;
              error_message += "\r\nAge cannot small than one";
            }
          }
        }
      }
      var msg = forms[i].value == "" ? "-" : forms[i].value;
      if (typeof forms[i].newline != "undefined") {
        message += forms[i].hintText + "\r\n " + msg + "\r\n\r\n";
      } else {
        message += forms[i].hintText + "\r\n " + msg + "\r\n";
      }

    };
    if (required) {
      loading.finish();
      alert(error_message);
      return;
    }
    var app_id = Math.random().toString(36).substr(2, 10);
    var local_save = [{
      "u_id": u_id,
      "id": app_id,
      "sender_id": u_id,
      "message": message,
      "created": Alloy.Globals.common.now(),
      "is_endUser": 1,
      "dr_id": "",
      "format": "text",
      "app_id": app_id,
      "status": 4,
      "sender_name": Ti.App.Properties.getString('fullname') || "" }];


    var id = model.saveArray(local_save);
    Alloy.Globals.API.callByPost({ url: "sendASPPatientMessage", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id, dr_id: dr_id, message: message, is_endUser: 1, category: "nutritionist", id: app_id, status: 4 } }, function (responseText) {
      Alloy.Globals.socket.refresh_patient_list({});
      //Ti.App.fireEvent("refresh_patient_list");
      var res = JSON.parse(responseText);
      Alloy.Globals.socket.setRoom({ room_id: res.data.room_id });
      //Ti.App.fireEvent("setRoom", {room_id: res.data.room_id});
      sending = false;
      setTimeout(function () {
        loading.finish();
        closeWindow();
        Alloy.Globals._.extend(res.data, { from: "Ask Nutritionist" });
        Alloy.Globals.nav.navigateWithArgs("askDoctor/conversation", res.data);
      }, 2000);
    });
  }

  function closeWindow() {
    $.win.close();
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  if (true) {
    __defers['$.__views["__alloyId169"]!click!closeWindow'] && $.addListener($.__views["__alloyId169"], 'click', closeWindow);}
  __defers['$.__views["__alloyId173"]!click!genderSelect'] && $.addListener($.__views["__alloyId173"], 'click', genderSelect);__defers['$.__views["__alloyId175"]!click!genderSelect'] && $.addListener($.__views["__alloyId175"], 'click', genderSelect);__defers['$.__views["Ethnic"]!click!popout'] && $.addListener($.__views["Ethnic"], 'click', popout);__defers['$.__views["Ethnic"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["Ethnic"], 'postlayout', loadComboBoxLocal);__defers['$.__views["any_medical_condition"]!click!popout'] && $.addListener($.__views["any_medical_condition"], 'click', popout);__defers['$.__views["any_medical_condition"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["any_medical_condition"], 'postlayout', loadComboBoxLocal);__defers['$.__views["find_your_diet_intake"]!click!popout'] && $.addListener($.__views["find_your_diet_intake"], 'click', popout);__defers['$.__views["find_your_diet_intake"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["find_your_diet_intake"], 'postlayout', loadComboBoxLocal);__defers['$.__views["glass_of_plain_water"]!click!popout'] && $.addListener($.__views["glass_of_plain_water"], 'click', popout);__defers['$.__views["glass_of_plain_water"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["glass_of_plain_water"], 'postlayout', loadComboBoxLocal);__defers['$.__views["servings_of_fruits"]!click!popout'] && $.addListener($.__views["servings_of_fruits"], 'click', popout);__defers['$.__views["servings_of_fruits"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["servings_of_fruits"], 'postlayout', loadComboBoxLocal);__defers['$.__views["often_oder_food"]!click!popout'] && $.addListener($.__views["often_oder_food"], 'click', popout);__defers['$.__views["often_oder_food"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["often_oder_food"], 'postlayout', loadComboBoxLocal);__defers['$.__views["exercise_regularly"]!click!popout'] && $.addListener($.__views["exercise_regularly"], 'click', popout);__defers['$.__views["exercise_regularly"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["exercise_regularly"], 'postlayout', loadComboBoxLocal);__defers['$.__views["your_target"]!click!popout'] && $.addListener($.__views["your_target"], 'click', popout);__defers['$.__views["your_target"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["your_target"], 'postlayout', loadComboBoxLocal);__defers['$.__views["saveBtn"]!click!sendMessage'] && $.addListener($.__views["saveBtn"], 'click', sendMessage);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\askDoctor\nutitionist_forms.js.map