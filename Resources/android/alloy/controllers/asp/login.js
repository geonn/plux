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
  this.__controllerPath = 'asp/login';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "Login", id: "win", layout: "vertical" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId349"] = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId349" });

  $.__views["win"].add($.__views["__alloyId349"]);
  $.__views["loadingBar"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "loadingBar", height: 0, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

  $.__views["__alloyId349"].add($.__views["loadingBar"]);
  $.__views["activityIndicator"] = Ti.UI.createActivityIndicator(
  { top: 10, left: 30, width: 60, id: "activityIndicator" });

  $.__views["loadingBar"].add($.__views["activityIndicator"]);
  $.__views["__alloyId350"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, top: 5, bottom: 10, text: "Loading", id: "__alloyId350" });

  $.__views["loadingBar"].add($.__views["__alloyId350"]);
  $.__views["__alloyId351"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "__alloyId351" });

  $.__views["__alloyId349"].add($.__views["__alloyId351"]);
  if (true) {
    $.__views["__alloyId352"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId352" });

    $.__views["__alloyId351"].add($.__views["__alloyId352"]);
    $.__views["__alloyId353"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId353" });

    $.__views["__alloyId352"].add($.__views["__alloyId353"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId353"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: Ti.UI.FILL });

    $.__views["__alloyId352"].add($.__views["pageTitle"]);
    $.__views["__alloyId354"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'ASP Login', textAlign: "center", id: "__alloyId354" });

    $.__views["pageTitle"].add($.__views["__alloyId354"]);
  }
  $.__views["main"] = Ti.UI.createScrollView(
  { id: "main", layout: "vertical", height: "100%", contentHeight: Ti.UI.SIZE });

  $.__views["__alloyId351"].add($.__views["main"]);
  $.__views["__alloyId355"] = Ti.UI.createImageView(
  { width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "50dp", top: "50dp", image: "/images/asp_logo.png", id: "__alloyId355" });

  $.__views["main"].add($.__views["__alloyId355"]);
  $.__views["username"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: "90%", height: "50dp", font: { fontSize: "14dp" }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#fff", borderColor: "#cccccc", paddingLeft: "20dp", paddingRight: "20dp", bottom: "5dp", keyboardType: Titanium.UI.KEYBOARD_DEFAULT, returnKeyType: Titanium.UI.RETURNKEY_NEXT, id: "username", hintText: "Enter Username", value: "" });

  $.__views["main"].add($.__views["username"]);
  $.__views["password"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: "90%", height: "50dp", font: { fontSize: "14dp" }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#fff", passwordMask: true, borderColor: "#cccccc", paddingLeft: "20dp", paddingRight: "20dp", keyboardType: Titanium.UI.KEYBOARD_DEFAULT, returnKeyType: Titanium.UI.RETURNKEY_DONE, id: "password", hintText: "Enter Password", value: "" });

  $.__views["main"].add($.__views["password"]);
  $.__views["loginAccountButton"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CC2228", height: 40, color: "#ffffff", width: "70%", id: "loginAccountButton", title: "Login", top: 20 });

  $.__views["main"].add($.__views["loginAccountButton"]);
  doLogin ? $.addListener($.__views["loginAccountButton"], 'touchend', doLogin) : __defers['$.__views["loginAccountButton"]!touchend!doLogin'] = true;$.__views["registerAccountButton"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", id: "registerAccountButton", title: "Register for ASP", top: 5 });

  $.__views["main"].add($.__views["registerAccountButton"]);
  doASPSignup ? $.addListener($.__views["registerAccountButton"], 'touchend', doASPSignup) : __defers['$.__views["registerAccountButton"]!touchend!doASPSignup'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  //var nav = Alloy.Globals.navMenu;
  var singleton = true;
  var loading = Alloy.createController("loading");
  $.win.add(loading.getView());

  $.username.value = "";
  /** To check if keyboard onfocus or onblur**/
  var isKeyboardFocus = 0;

  function doLogin(asp_email, asp_password) {
    loading.start();
    var username = $.username.value;
    var password = $.password.value;

    if (username == "" || password == "") {
      Alloy.Globals.common.createAlert('Authentication warning', 'Please fill in username and password');
      loading.finish();
      return;
    }
    if (singleton) {
      //singleton = false;
      Alloy.Globals.API.doLogin(username, password, $, args.target);
    }
  }

  function doASPSignup() {
    var nav = require('navigation');
    Alloy.Globals.nav.navigationWindow("asp/signup", 0);
  }

  function doRegister() {

  }

  function hideProductFormKeyboard(e) {
    if (e.source.id != 'TextField') {

      if (e.source.id == 'username') {
        return false;
      }
      if (e.source.id == 'password') {
        return false;
      }

      $.username.blur();
      $.password.blur();
    }
  };

  function doASPSignup() {
    var nav = require('navigation');
    Alloy.Globals.nav.navigationWindow("asp/signup", 0);
  }

  /** To fixed keyboard hide/show when textfield is activate**/
  $.win.addEventListener('click', hideProductFormKeyboard);

  $.username.addEventListener('touchend', function (e) {
    $.username.focus();
    isKeyboardFocus = 1;
  });

  $.password.addEventListener('touchend', function (e) {
    $.password.focus();
    isKeyboardFocus = 1;
  });

  $.username.addEventListener("return", function () {
    $.password.focus();
  });

  $.password.addEventListener("return", function () {
    doLogin();
  });

  if ("android" == "android") {
    var nav = require('navigation');
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["loginAccountButton"]!touchend!doLogin'] && $.addListener($.__views["loginAccountButton"], 'touchend', doLogin);__defers['$.__views["registerAccountButton"]!touchend!doASPSignup'] && $.addListener($.__views["registerAccountButton"], 'touchend', doASPSignup);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/asp/login.js.map