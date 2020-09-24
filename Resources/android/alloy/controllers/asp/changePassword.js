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
  this.__controllerPath = 'asp/changePassword';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, navTintColor: "#CE1D1C", title: "Change Password", id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId219"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId219" });

  $.__views["win"].add($.__views["__alloyId219"]);
  if (true) {
    $.__views["__alloyId220"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId220" });

    $.__views["__alloyId219"].add($.__views["__alloyId220"]);
    $.__views["__alloyId221"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId221" });

    $.__views["__alloyId220"].add($.__views["__alloyId221"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId221"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "60%" });

    $.__views["__alloyId220"].add($.__views["pageTitle"]);
    $.__views["__alloyId222"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Change Password', textAlign: "center", id: "__alloyId222" });

    $.__views["pageTitle"].add($.__views["__alloyId222"]);
  }
  $.__views["main"] = Ti.UI.createScrollView(
  { id: "main", layout: "vertical", height: "100%", contentHeight: Ti.UI.SIZE });

  $.__views["__alloyId219"].add($.__views["main"]);
  $.__views["__alloyId223"] = Ti.UI.createImageView(
  { width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "30dp", top: "30dp", image: "/images/asp_logo.png", id: "__alloyId223" });

  $.__views["main"].add($.__views["__alloyId223"]);
  $.__views["password"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: "90%", height: "50dp", font: { fontSize: "14dp" }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#fff", passwordMask: true, borderColor: "#cccccc", paddingLeft: "20dp", paddingRight: "20dp", keyboardType: Titanium.UI.KEYBOARD_DEFAULT, returnKeyType: Titanium.UI.RETURNKEY_DONE, id: "password", hintText: "Enter Password", value: "" });

  $.__views["main"].add($.__views["password"]);
  $.__views["password2"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: "90%", height: "50dp", font: { fontSize: "14dp" }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#fff", passwordMask: true, borderColor: "#cccccc", paddingLeft: "20dp", paddingRight: "20dp", keyboardType: Titanium.UI.KEYBOARD_DEFAULT, returnKeyType: Titanium.UI.RETURNKEY_DONE, id: "password2", hintText: "Enter Confirm Password", top: 10, value: "" });

  $.__views["main"].add($.__views["password2"]);
  $.__views["__alloyId224"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Change Password", top: 10, id: "__alloyId224" });

  $.__views["main"].add($.__views["__alloyId224"]);
  submitPassword ? $.addListener($.__views["__alloyId224"], 'touchend', submitPassword) : __defers['$.__views["__alloyId224"]!touchend!submitPassword'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  $.win.add(loading.getView());

  function submitPassword() {
    loading.start();
    var password = $.password.value;
    var confirm = $.password2.value;

    if (password.trim() == "") {
      loading.finish();
      Alloy.Globals.common.createAlert("Error", "Please fill in your password");
      return false;
    }

    if (confirm.trim() != password.trim()) {
      loading.finish();
      Alloy.Globals.common.createAlert("Error", "Your password are not match");
      return false;
    }

    var params = {
      password: password };

    Alloy.Globals.API.doChangePassword(params, $, function () {
      loading.finish();
    });
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
  __defers['$.__views["__alloyId224"]!touchend!submitPassword'] && $.addListener($.__views["__alloyId224"], 'touchend', submitPassword);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\asp\changePassword.js.map