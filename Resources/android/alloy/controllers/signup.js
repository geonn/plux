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
  this.__controllerPath = 'signup';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "Plux Signup", id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId817"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId817" });

  $.__views["win"].add($.__views["__alloyId817"]);
  $.__views["__alloyId818"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, height: 50, backgroundColor: "#E8E8E8", id: "__alloyId818" });

  $.__views["__alloyId817"].add($.__views["__alloyId818"]);
  $.__views["backButton"] = Ti.UI.createView(
  { borderWidth: 0, left: 0, zIndex: 9, id: "backButton", width: "20%" });

  $.__views["__alloyId818"].add($.__views["backButton"]);
  closeWin ? $.addListener($.__views["backButton"], 'click', closeWin) : __defers['$.__views["backButton"]!click!closeWin'] = true;$.__views["__alloyId819"] = Ti.UI.createImageView(
  { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId819" });

  $.__views["backButton"].add($.__views["__alloyId819"]);
  $.__views["__alloyId820"] = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId820" });

  $.__views["__alloyId818"].add($.__views["__alloyId820"]);
  $.__views["titleLbl"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#A52430", font: { fontFamily: "Roboto-Regular, arial" }, text: 'Signup', id: "titleLbl", textAlign: "center" });

  $.__views["__alloyId820"].add($.__views["titleLbl"]);
  $.__views["__alloyId821"] = Ti.UI.createImageView(
  { borderRadius: 10, width: 120, height: 120, backgroundColor: "#ff0000", bottom: "10dp", top: "10dp", image: "/images/asp_logo.png", id: "__alloyId821" });

  $.__views["__alloyId817"].add($.__views["__alloyId821"]);
  $.__views["forms"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "forms" });

  $.__views["__alloyId817"].add($.__views["forms"]);
  $.__views["fullname"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "fullname", value: "" });

  $.__views["forms"].add($.__views["fullname"]);
  $.__views["__alloyId822"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Full Name *", required: 1, left: 5, value: "", id: "__alloyId822" });

  $.__views["fullname"].add($.__views["__alloyId822"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId822"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId822"]!change!textFieldOnBlur'] = true;$.__views["email"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "email", value: "" });

  $.__views["forms"].add($.__views["email"]);
  $.__views["__alloyId823"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Email *", required: 1, left: 5, value: "", id: "__alloyId823" });

  $.__views["email"].add($.__views["__alloyId823"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId823"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId823"]!change!textFieldOnBlur'] = true;$.__views["mobile"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "mobile", value: "" });

  $.__views["forms"].add($.__views["mobile"]);
  $.__views["__alloyId824"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "Mobile *", keyboardType: Titanium.UI.KEYBOARD_TYPE_PHONE_PAD, required: 1, left: 5, value: "", id: "__alloyId824" });

  $.__views["mobile"].add($.__views["__alloyId824"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId824"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId824"]!change!textFieldOnBlur'] = true;$.__views["ic_no"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "ic_no", value: "" });

  $.__views["forms"].add($.__views["ic_no"]);
  $.__views["__alloyId825"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, hintText: "IC / Passport *", required: 1, left: 5, value: "", id: "__alloyId825" });

  $.__views["ic_no"].add($.__views["__alloyId825"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId825"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId825"]!change!textFieldOnBlur'] = true;$.__views["password"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "password", value: "" });

  $.__views["forms"].add($.__views["password"]);
  $.__views["__alloyId826"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, passwordMask: true, hintText: "Password *", required: 1, left: 5, value: "", id: "__alloyId826" });

  $.__views["password"].add($.__views["__alloyId826"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId826"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId826"]!change!textFieldOnBlur'] = true;$.__views["password2"] = Ti.UI.createView(
  { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#fba81c", id: "password2", value: "" });

  $.__views["forms"].add($.__views["password2"]);
  $.__views["__alloyId827"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 30, passwordMask: true, hintText: "Confirm Password *", required: 1, left: 5, value: "", id: "__alloyId827" });

  $.__views["password2"].add($.__views["__alloyId827"]);
  textFieldOnBlur ? $.addListener($.__views["__alloyId827"], 'change', textFieldOnBlur) : __defers['$.__views["__alloyId827"]!change!textFieldOnBlur'] = true;$.__views["sign_btn"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", id: "sign_btn", title: "Sign Up", top: 10, bottom: 10 });

  $.__views["forms"].add($.__views["sign_btn"]);
  doSubmit ? $.addListener($.__views["sign_btn"], 'click', doSubmit) : __defers['$.__views["sign_btn"]!click!doSubmit'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var nav = Alloy.Globals.navMenu;
  var loading = Alloy.createController('loading');
  var error_message = "";


  /** To check if keyboard onfocus or onblur**/
  var isKeyboardFocus = 0;
  $.win.add(loading.getView());

  function closeWin() {
    $.win.close();
  }

  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function doSignup() {
    var fullname = $.fullname.value;
    var email = $.email.value;
    var ic_no = $.ic_no.value;
    var mobile = $.mobile.value;
    var password = $.password.value;
    var confirm = $.confirm.value;
    var view_agreement = view_agreement_box.children[0].children[0].checked;

    if (fullname.trim() == "") {
      Alloy.Globals.common.createAlert("Error", "Please fill in your full name");
      return false;
    }

    if (ic_no.trim() == "") {
      Alloy.Globals.common.createAlert("Error", "Please fill in your IC number");
      return false;
    }

    if (email.trim() == "") {
      Alloy.Globals.common.createAlert("Error", "Please fill in your email");
      return false;
    } else if (validateEmail(email) != "1") {
      Alloy.Globals.common.createAlert("Error", "Please fill in an valid email");
      return false;
    }

    if (password.trim() == "") {
      Alloy.Globals.common.createAlert("Error", "Please fill in your password");
      return false;
    }

    if (confirm.trim() != password.trim()) {
      Alloy.Globals.common.createAlert("Error", "Your password are not match");
      return false;
    }

    if (view_agreement != "1") {
      Alloy.Globals.common.createAlert("Error", "You must agree to all the terms and conditions to register as ASP member.");
      return false;
    }

    loading.start();
    var params = {
      fullname: fullname,
      email: email,
      ic_no: ic_no,
      password: password,
      agreets: view_agreement };


    Alloy.Globals.API.do_signup(params, $, function (success) {
      if (success) {
        $.win.close();
        Ti.App.fireEvent('loginAfterRegister', { params: params });
      } else {

      }
      loading.finish();
    });
  }

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
    var params = {};
    var error_message = "";
    for (var i = 0; i < forms_arr.length - 1; i++) {

      if (forms_arr[i].format == "photo" && forms_arr[i].children[2].attached) {
        _.extend(params, { Filedata: forms_arr[i].children[2].filedata });
      } else if (forms_arr[i].format == "photo" && !forms_arr[i].children[2].attached) {
        error_message += "Please upload your referral letter\n";
      } else {
        if (forms_arr[i].children[0].required && forms_arr[i].children[0].value == "") {
          error_message += forms_arr[i].children[0].hintText + " cannot be empty\n";
        } else {
          params[forms_arr[i].id] = forms_arr[i].children[0].value.trim();
        }
      }
      if (forms_arr[i].id == "password2") {
        if (forms_arr[i].children[0].value != forms_arr[i - 1].children[0].value) {
          error_message += "Your password are not match\n";
        }
      }
    };
    if (error_message != "") {
      alert(error_message);
      return;
    }
    params["agreets"] = 1;
    loading.start();
    Alloy.Globals.API.callByPost({ url: "pluxSignUp", new: true, domain: "FREEJINI_DOMAIN", params: params }, function (responseText) {
      var result = JSON.parse(responseText);
      if (result.status == "error") {
        Alloy.Globals.common.createAlert("Error", result.data);
      } else {
        $.win.close();
        Ti.App.fireEvent('loginAfterRegister', { params: params });
        loading.finish();
      }
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["backButton"]!click!closeWin'] && $.addListener($.__views["backButton"], 'click', closeWin);__defers['$.__views["__alloyId822"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId822"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId823"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId823"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId824"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId824"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId825"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId825"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId826"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId826"], 'change', textFieldOnBlur);__defers['$.__views["__alloyId827"]!change!textFieldOnBlur'] && $.addListener($.__views["__alloyId827"], 'change', textFieldOnBlur);__defers['$.__views["sign_btn"]!click!doSubmit'] && $.addListener($.__views["sign_btn"], 'click', doSubmit);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://C:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\signup.js.map