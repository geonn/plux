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
  this.__controllerPath = 'askDoctor/counsellor_forms';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "Patient Information", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId87"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId87" });

  $.__views["win"].add($.__views["__alloyId87"]);
  if (true) {
    $.__views["__alloyId88"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId88" });

    $.__views["__alloyId87"].add($.__views["__alloyId88"]);
    $.__views["__alloyId89"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId89" });

    $.__views["__alloyId88"].add($.__views["__alloyId89"]);
    $.__views["__alloyId90"] = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId90" });

    $.__views["__alloyId89"].add($.__views["__alloyId90"]);
    closeWindow ? $.addListener($.__views["__alloyId90"], 'click', closeWindow) : __defers['$.__views["__alloyId90"]!click!closeWindow'] = true;$.__views["__alloyId91"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId91" });

    $.__views["__alloyId88"].add($.__views["__alloyId91"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Patient Information', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId91"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId92"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "__alloyId92" });

  $.__views["__alloyId87"].add($.__views["__alloyId92"]);
  $.__views["__alloyId93"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#fff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, bottom: 10, textAlign: "center", text: L('pleasefillin_psychologist'), id: "__alloyId93" });

  $.__views["__alloyId92"].add($.__views["__alloyId93"]);
  $.__views["forms"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "forms" });

  $.__views["__alloyId92"].add($.__views["forms"]);
  $.__views["name"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, hintText: L('name'), id: "name", required: 1, value: "" });

  $.__views["forms"].add($.__views["name"]);
  $.__views["age"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, hintText: L('age'), required: 1, keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, id: "age", value: "" });

  $.__views["forms"].add($.__views["age"]);
  $.__views["gender_view"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, borderRadius: "5", required: 1, bottom: 10, newline: 1, left: 10, righ: 10, hintText: L('sex'), value: "", height: 40, id: "gender_view" });

  $.__views["forms"].add($.__views["gender_view"]);
  $.__views["__alloyId94"] = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, width: "50%", right: 1, gender: L('male'), backgroundColor: "#ffffff", id: "__alloyId94" });

  $.__views["gender_view"].add($.__views["__alloyId94"]);
  genderSelect ? $.addListener($.__views["__alloyId94"], 'click', genderSelect) : __defers['$.__views["__alloyId94"]!click!genderSelect'] = true;$.__views["__alloyId95"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, touchEnabled: false, textAlign: "center", text: L('male'), id: "__alloyId95" });

  $.__views["__alloyId94"].add($.__views["__alloyId95"]);
  $.__views["__alloyId96"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, right: 10, backgroundColor: "#ffffff", gender: L('female'), id: "__alloyId96" });

  $.__views["gender_view"].add($.__views["__alloyId96"]);
  genderSelect ? $.addListener($.__views["__alloyId96"], 'click', genderSelect) : __defers['$.__views["__alloyId96"]!click!genderSelect'] = true;$.__views["__alloyId97"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, top: 10, left: 10, right: 10, bottom: 10, touchEnabled: false, textAlign: "center", text: L('female'), id: "__alloyId97" });

  $.__views["__alloyId96"].add($.__views["__alloyId97"]);
  $.__views["Ethnic"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "Ethnic", hintText: L('Ethnic'), value: "" });

  $.__views["forms"].add($.__views["Ethnic"]);
  popout ? $.addListener($.__views["Ethnic"], 'click', popout) : __defers['$.__views["Ethnic"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["Ethnic"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["Ethnic"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId98"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('Ethnic'), id: "__alloyId98" });

  $.__views["Ethnic"].add($.__views["__alloyId98"]);
  $.__views["if_other"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, id: "if_other", required: 0, value: "" });

  $.__views["forms"].add($.__views["if_other"]);
  $.__views["occupation"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, hintText: L('occupation'), id: "occupation", required: 1, value: "" });

  $.__views["forms"].add($.__views["occupation"]);
  $.__views["Status"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "Status", hintText: L('Status'), value: "" });

  $.__views["forms"].add($.__views["Status"]);
  popout ? $.addListener($.__views["Status"], 'click', popout) : __defers['$.__views["Status"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["Status"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["Status"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId99"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('Status'), id: "__alloyId99" });

  $.__views["Status"].add($.__views["__alloyId99"]);
  $.__views["email"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, required: 1, newline: 1, hintText: L('email'), id: "email", value: "" });

  $.__views["forms"].add($.__views["email"]);
  $.__views["contact_no"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, newline: 1, hintText: L('contact_no'), keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, id: "contact_no", required: 1, value: "" });

  $.__views["forms"].add($.__views["contact_no"]);
  $.__views["any_medical_condition"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "any_medical_condition", hintText: L('any_medical_condition'), value: "" });

  $.__views["forms"].add($.__views["any_medical_condition"]);
  popout ? $.addListener($.__views["any_medical_condition"], 'click', popout) : __defers['$.__views["any_medical_condition"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["any_medical_condition"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["any_medical_condition"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId100"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('any_medical_condition'), id: "__alloyId100" });

  $.__views["any_medical_condition"].add($.__views["__alloyId100"]);
  $.__views["yes_please_state"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('yes_please_state'), newline: 1, id: "yes_please_state", value: "" });

  $.__views["forms"].add($.__views["yes_please_state"]);
  $.__views["wish_to_share"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "wish_to_share", hintText: L('wish_to_share'), value: "" });

  $.__views["forms"].add($.__views["wish_to_share"]);
  popout ? $.addListener($.__views["wish_to_share"], 'click', popout) : __defers['$.__views["wish_to_share"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["wish_to_share"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["wish_to_share"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId101"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('wish_to_share'), id: "__alloyId101" });

  $.__views["wish_to_share"].add($.__views["__alloyId101"]);
  $.__views["yes_please_state"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000", backgroundColor: "#ffffff", borderRadius: "5", left: 10, right: 10, bottom: 10, borderWidth: 0, hintText: L('if_other'), newline: 1, id: "yes_please_state", required: 0, value: "" });

  $.__views["forms"].add($.__views["yes_please_state"]);
  $.__views["attended_any_counseling"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 0, hintTextColor: "#E89114", backgroundColor: "#ffffff", touchEnabled: false, required: 1, id: "attended_any_counseling", hintText: L('attended_any_counseling'), value: "" });

  $.__views["forms"].add($.__views["attended_any_counseling"]);
  popout ? $.addListener($.__views["attended_any_counseling"], 'click', popout) : __defers['$.__views["attended_any_counseling"]!click!popout'] = true;loadComboBoxLocal ? $.addListener($.__views["attended_any_counseling"], 'postlayout', loadComboBoxLocal) : __defers['$.__views["attended_any_counseling"]!postlayout!loadComboBoxLocal'] = true;$.__views["__alloyId102"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('attended_any_counseling'), id: "__alloyId102" });

  $.__views["attended_any_counseling"].add($.__views["__alloyId102"]);
  $.__views["if_yes_when_was_last"] = Ti.UI.createView(
  { borderWidth: 0, borderRadius: "5", width: Ti.UI.FILL, height: 40, left: 10, right: 10, bottom: 10, hintTextColor: "#E89114", backgroundColor: "#ffffff", newline: 1, id: "if_yes_when_was_last", hintText: L('if_yes_when_was_last'), value: "" });

  $.__views["forms"].add($.__views["if_yes_when_was_last"]);
  datePicker ? $.addListener($.__views["if_yes_when_was_last"], 'click', datePicker) : __defers['$.__views["if_yes_when_was_last"]!click!datePicker'] = true;$.__views["__alloyId103"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 14 }, touchEnabled: false, left: 10, text: L('if_yes_when_was_last'), id: "__alloyId103" });

  $.__views["if_yes_when_was_last"].add($.__views["__alloyId103"]);
  $.__views["saveBtn"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", top: 10, bottom: 10, id: "saveBtn", title: L('submit') });

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
    Ethnic: [L('Malay'), L('Chinese'), L('Indian'), L("Other"), L('Cancel')],
    Status: [L('Single'), L('Married'), L('Divorced'), L('Widowed'), L('Cancel')],
    any_medical_condition: [L('Yes'), L('No'), L('Cancel')],
    wish_to_share: [L('Stress'), L('Depression'), L('Loneliness'), L('Anger'), L('Worries'), L('Personality'), L('Family'), L('Career'), L('Financial'), L('Motivation'), L('Health'), L('Other'), L('Cancel')],
    attended_any_counseling: [L('Yes'), L('No'), L('Cancel')] };


  console.log(combo_list['Ethnic']);

  function init() {
    $.win.add(loading.getView());
    preset();
  }

  init();

  function loadComboBoxLocal(e) {
    var arr = combo_list[e.source.id];
    e.source.data = arr;
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

  function datePicker(e) {
    console.log("datePicker clicked");
    var val_date = typeof e.source.date != "undefined" ? e.source.date : new Date();
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
    console.log("datepicker added");
    mask.addEventListener("click", function () {
      $.win.remove(view_container);
    });

    ok_button.addEventListener("click", function (ex) {
      var dd = picker.value.getDate();
      var mm = picker.value.getMonth() + 1;
      var yyyy = picker.value.getFullYear();
      e.source.value = dd + '/' + mm + '/' + yyyy;
      e.source.date = picker.value;
      e.source.children[0].text = mm + '/' + dd + '/' + yyyy;
      $.win.remove(view_container);
    });
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
      "is_endUser": 1,
      "dr_id": "",
      "format": "text",
      "app_id": app_id,
      "status": 4,
      "sender_name": Ti.App.Properties.getString('fullname') || "" }];


    var id = model.saveArray(local_save);
    Alloy.Globals.API.callByPost({ url: "sendASPPatientMessage", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id, dr_id: dr_id, category: "phycologist", message: message, is_endUser: 1, id: app_id, status: 4 } }, function (responseText) {
      Alloy.Globals.socket.refresh_patient_list({});
      //Ti.App.fireEvent("refresh_patient_list");
      var res = JSON.parse(responseText);
      //Alloy.Globals.socket.setRoom({room_id: res.data.room_id});
      //Ti.App.fireEvent("setRoom", {room_id: res.data.room_id});
      sending = false;
      setTimeout(function () {
        loading.finish();
        Alloy.Globals._.extend(res.data, { from: "Ask Psychologist" });
        closeWindow();
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
    __defers['$.__views["__alloyId90"]!click!closeWindow'] && $.addListener($.__views["__alloyId90"], 'click', closeWindow);}
  __defers['$.__views["__alloyId94"]!click!genderSelect'] && $.addListener($.__views["__alloyId94"], 'click', genderSelect);__defers['$.__views["__alloyId96"]!click!genderSelect'] && $.addListener($.__views["__alloyId96"], 'click', genderSelect);__defers['$.__views["Ethnic"]!click!popout'] && $.addListener($.__views["Ethnic"], 'click', popout);__defers['$.__views["Ethnic"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["Ethnic"], 'postlayout', loadComboBoxLocal);__defers['$.__views["Status"]!click!popout'] && $.addListener($.__views["Status"], 'click', popout);__defers['$.__views["Status"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["Status"], 'postlayout', loadComboBoxLocal);__defers['$.__views["any_medical_condition"]!click!popout'] && $.addListener($.__views["any_medical_condition"], 'click', popout);__defers['$.__views["any_medical_condition"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["any_medical_condition"], 'postlayout', loadComboBoxLocal);__defers['$.__views["wish_to_share"]!click!popout'] && $.addListener($.__views["wish_to_share"], 'click', popout);__defers['$.__views["wish_to_share"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["wish_to_share"], 'postlayout', loadComboBoxLocal);__defers['$.__views["attended_any_counseling"]!click!popout'] && $.addListener($.__views["attended_any_counseling"], 'click', popout);__defers['$.__views["attended_any_counseling"]!postlayout!loadComboBoxLocal'] && $.addListener($.__views["attended_any_counseling"], 'postlayout', loadComboBoxLocal);__defers['$.__views["if_yes_when_was_last"]!click!datePicker'] && $.addListener($.__views["if_yes_when_was_last"], 'click', datePicker);__defers['$.__views["saveBtn"]!click!sendMessage'] && $.addListener($.__views["saveBtn"], 'click', sendMessage);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/askDoctor/counsellor_forms.js.map