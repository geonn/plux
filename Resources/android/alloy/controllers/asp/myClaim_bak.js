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
  this.__controllerPath = 'asp/myClaim_bak';
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
  $.__views["myClaim"] = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "My Claim Details", id: "myClaim", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["myClaim"] && $.addTopLevelView($.__views["myClaim"]);
  $.__views["__alloyId351"] = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId351" });

  $.__views["myClaim"].rightNavButton = $.__views["__alloyId351"];$.__views["loadingBar"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "loadingBar", height: 120, zIndex: 12, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

  $.__views["myClaim"].add($.__views["loadingBar"]);
  $.__views["activityIndicator"] = Ti.UI.createActivityIndicator(
  { top: 10, left: 30, width: 60, id: "activityIndicator" });

  $.__views["loadingBar"].add($.__views["activityIndicator"]);
  $.__views["__alloyId352"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, top: 5, bottom: 5, text: "Loading", id: "__alloyId352" });

  $.__views["loadingBar"].add($.__views["__alloyId352"]);
  $.__views["__alloyId353"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", backgroundColor: "#F6F6F6", height: "100%", id: "__alloyId353" });

  $.__views["myClaim"].add($.__views["__alloyId353"]);
  if (true) {
    $.__views["__alloyId354"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId354" });

    $.__views["__alloyId353"].add($.__views["__alloyId354"]);
    $.__views["__alloyId355"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId355" });

    $.__views["__alloyId354"].add($.__views["__alloyId355"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId355"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "90%" });

    $.__views["__alloyId354"].add($.__views["pageTitle"]);
    $.__views["__alloyId356"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'My Claim Details', textAlign: "center", id: "__alloyId356" });

    $.__views["pageTitle"].add($.__views["__alloyId356"]);
  }
  $.__views["__alloyId357"] = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.FILL, width: Ti.UI.FILL, id: "__alloyId357" });

  $.__views["__alloyId353"].add($.__views["__alloyId357"]);
  $.__views["claimContainer"] = Ti.UI.createView(
  { borderWidth: 0, id: "claimContainer", width: Ti.UI.FILL, height: Ti.UI.FILL, visible: false });

  $.__views["__alloyId357"].add($.__views["claimContainer"]);
  $.__views["main"] = Ti.UI.createScrollView(
  { id: "main", layout: "vertical", backgroundColor: "#ffffff", scrollType: "vertical" });

  $.__views["claimContainer"].add($.__views["main"]);
  $.__views["date"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, id: "date" });

  $.__views["main"].add($.__views["date"]);
  $.__views["__alloyId358"] = Ti.UI.createView(
  { borderWidth: 0, left: 10, right: 10, top: 10, bottom: 10, height: Ti.UI.SIZE, width: Ti.UI.FILL, id: "__alloyId358" });

  $.__views["main"].add($.__views["__alloyId358"]);
  $.__views["view_balance"] = Ti.UI.createView(
  { borderWidth: 0, borderColor: "#000000", width: Ti.UI.FILL, height: Ti.UI.SIZE, layout: "vertical", id: "view_balance" });

  $.__views["__alloyId358"].add($.__views["view_balance"]);
  $.__views["verifyContainer"] = Ti.UI.createView(
  { borderWidth: 0, id: "verifyContainer", visible: false, layout: "vertical" });

  $.__views["__alloyId357"].add($.__views["verifyContainer"]);
  $.__views["__alloyId359"] = Ti.UI.createImageView(
  { width: "40%", borderRadius: 10, height: Ti.UI.SIZE, backgroundColor: "#ff0000", bottom: "30dp", top: "30dp", image: "/images/asp_logo.png", id: "__alloyId359" });

  $.__views["verifyContainer"].add($.__views["__alloyId359"]);
  $.__views["description"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, id: "description" });

  $.__views["verifyContainer"].add($.__views["description"]);
  $.__views["__alloyId360"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CE1D1C", height: 40, color: "#ffffff", width: "70%", title: "Resend Verification", top: 10, id: "__alloyId360" });

  $.__views["verifyContainer"].add($.__views["__alloyId360"]);
  resendVerificationEmail ? $.addListener($.__views["__alloyId360"], 'touchend', resendVerificationEmail) : __defers['$.__views["__alloyId360"]!touchend!resendVerificationEmail'] = true;$.__views["__alloyId361"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Refresh", top: 10, id: "__alloyId361" });

  $.__views["verifyContainer"].add($.__views["__alloyId361"]);
  checkStatus ? $.addListener($.__views["__alloyId361"], 'touchend', checkStatus) : __defers['$.__views["__alloyId361"]!touchend!checkStatus'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file


  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId360"]!touchend!resendVerificationEmail'] && $.addListener($.__views["__alloyId360"], 'touchend', resendVerificationEmail);__defers['$.__views["__alloyId361"]!touchend!checkStatus'] && $.addListener($.__views["__alloyId361"], 'touchend', checkStatus);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/asp/myClaim_bak.js.map