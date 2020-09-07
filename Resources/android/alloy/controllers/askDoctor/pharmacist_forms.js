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
  this.__controllerPath = 'askDoctor/pharmacist_forms';
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
  $.__views["__alloyId188"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId188" });

  $.__views["win"].add($.__views["__alloyId188"]);
  if (true) {
    $.__views["__alloyId189"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId189" });

    $.__views["__alloyId188"].add($.__views["__alloyId189"]);
    $.__views["__alloyId190"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId190" });

    $.__views["__alloyId189"].add($.__views["__alloyId190"]);
    $.__views["__alloyId191"] = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId191" });

    $.__views["__alloyId190"].add($.__views["__alloyId191"]);
    closeWindow ? $.addListener($.__views["__alloyId191"], 'click', closeWindow) : __defers['$.__views["__alloyId191"]!click!closeWindow'] = true;$.__views["__alloyId192"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId192" });

    $.__views["__alloyId189"].add($.__views["__alloyId192"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Patient Information', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId192"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId193"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "__alloyId193" });

  $.__views["__alloyId188"].add($.__views["__alloyId193"]);
  $.__views["__alloyId194"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#fff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, bottom: 10, textAlign: "center", text: L('pleasefillin_pharmacist'), id: "__alloyId194" });

  $.__views["__alloyId193"].add($.__views["__alloyId194"]);
  $.__views["forms"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "forms" });

  $.__views["__alloyId193"].add($.__views["forms"]);
  $.__views["name"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, hintText: L('name'), id: "name", required: 1, value: "" });

  $.__views["forms"].add($.__views["name"]);
  $.__views["ic"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, id: "ic", hintText: L('IC'), keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, required: 1, value: "" });

  $.__views["forms"].add($.__views["ic"]);
  $.__views["age"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('age'), newline: 1, keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, id: "age", required: 1, value: "" });

  $.__views["forms"].add($.__views["age"]);
  $.__views["gender_view"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, borderRadius: "5", required: 1, bottom: 10, newline: 1, left: 10, righ: 10, hintText: L('sex'), value: "", height: 40, id: "gender_view" });

  $.__views["forms"].add($.__views["gender_view"]);
  $.__views["__alloyId195"] = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, width: "50%", right: 1, gender: L('male'), backgroundColor: "#ffffff", id: "__alloyId195" });

  $.__views["gender_view"].add($.__views["__alloyId195"]);
  genderSelect ? $.addListener($.__views["__alloyId195"], 'click', genderSelect) : __defers['$.__views["__alloyId195"]!click!genderSelect'] = true;$.__views["__alloyId196"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, touchEnabled: false, textAlign: "center", text: L('male'), id: "__alloyId196" });

  $.__views["__alloyId195"].add($.__views["__alloyId196"]);
  $.__views["__alloyId197"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, right: 10, backgroundColor: "#ffffff", gender: L('female'), id: "__alloyId197" });

  $.__views["gender_view"].add($.__views["__alloyId197"]);
  genderSelect ? $.addListener($.__views["__alloyId197"], 'click', genderSelect) : __defers['$.__views["__alloyId197"]!click!genderSelect'] = true;$.__views["__alloyId198"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, touchEnabled: false, textAlign: "center", text: L('female'), id: "__alloyId198" });

  $.__views["__alloyId197"].add($.__views["__alloyId198"]);
  $.__views["__alloyId199"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('please_list_the_medication'), newline: 1, required: 1, value: "", id: "__alloyId199" });

  $.__views["forms"].add($.__views["__alloyId199"]);
  $.__views["__alloyId200"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('what_is_your_concern'), newline: 1, required: 1, value: "", id: "__alloyId200" });

  $.__views["forms"].add($.__views["__alloyId200"]);
  $.__views["__alloyId201"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('any_medical_condition_2'), newline: 1, required: 1, value: "", id: "__alloyId201" });

  $.__views["forms"].add($.__views["__alloyId201"]);
  $.__views["__alloyId202"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('any_other_medication'), newline: 1, required: 1, value: "", id: "__alloyId202" });

  $.__views["forms"].add($.__views["__alloyId202"]);
  $.__views["__alloyId203"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('pregnant_or_breastfeeding'), newline: 1, required: 1, value: "", id: "__alloyId203" });

  $.__views["forms"].add($.__views["__alloyId203"]);
  $.__views["__alloyId204"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('any_side_effect'), newline: 1, required: 1, value: "", id: "__alloyId204" });

  $.__views["forms"].add($.__views["__alloyId204"]);
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
    medicine_in_question_and_concerns: [L('Malay'), L('Chinese'), L('Indian'), L('Other'), L('Cancel')],
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
    e.source.opacity = 1;
    e.source.touchEnabled = true;
  }

  function popout(e) {
    if (e.source.data.length == null || e.source.data.length <= 0) {
      alert("Sorry, the " + e.source.children[0].hintText + " listing is empty. Please contact our helpdesk for help.");
      return;
    }
    var options_arr = e.source.data;

    var dialog = Ti.UI.createOptionDialog({
      cancel: options_arr.length - 1,
      options: options_arr,
      selectedIndex: e.source.selectedIndex || 0,
      title: e.source.HintText });


    dialog.show();
    dialog.addEventListener("click", function (ex) {
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
    $.name.value = name;
    $.ic.value = ic;
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
    for (var i = 0; i < forms.length - 1; i++) {
      if (forms[i].required == 1) {
        if (forms[i].value == "") {
          forms[i].borderWidth = 1;
          forms[i].borderColor = "red";
          required = 1;
        } else {
          forms[i].borderWidth = 0;
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
      alert("Please fill in all the required question");
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
    Alloy.Globals.API.callByPost({ url: "sendASPPatientMessage", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id, dr_id: dr_id, message: message, is_endUser: 1, category: "pharmacist", id: app_id, status: 4 } }, function (responseText) {
      Alloy.Globals.socket.refresh_patient_list({});
      //Ti.App.fireEvent("refresh_patient_list");
      var res = JSON.parse(responseText);
      Alloy.Globals.socket.setRoom({ room_id: res.data.room_id });
      //Ti.App.fireEvent("setRoom", {room_id: res.data.room_id});
      sending = false;
      setTimeout(function () {
        loading.finish();
        closeWindow();
        Alloy.Globals._.extend(res.data, { from: "Ask Pharmacist" });
        Alloy.Globals.nav.navigateWithArgs("askDoctor/conversation", res.data);
      }, 2000);
    });
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

  function closeWindow() {
    $.win.close();
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  if (true) {
    __defers['$.__views["__alloyId191"]!click!closeWindow'] && $.addListener($.__views["__alloyId191"], 'click', closeWindow);}
  __defers['$.__views["__alloyId195"]!click!genderSelect'] && $.addListener($.__views["__alloyId195"], 'click', genderSelect);__defers['$.__views["__alloyId197"]!click!genderSelect'] && $.addListener($.__views["__alloyId197"], 'click', genderSelect);__defers['$.__views["saveBtn"]!click!sendMessage'] && $.addListener($.__views["saveBtn"], 'click', sendMessage);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\askDoctor\pharmacist_forms.js.map