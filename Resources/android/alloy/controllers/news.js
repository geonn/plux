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
  this.__controllerPath = 'news';
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
  $.__views["news"] = Ti.UI.createWindow(
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "", backButtonTitle: "", id: "news", navTintColor: "#CE1D1C" });

  $.__views["news"] && $.addTopLevelView($.__views["news"]);
  $.__views["main"] = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical" });

  $.__views["news"].add($.__views["main"]);
  if (true) {
    $.__views["__alloyId702"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId702" });

    $.__views["main"].add($.__views["__alloyId702"]);
    $.__views["__alloyId703"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId703" });

    $.__views["__alloyId702"].add($.__views["__alloyId703"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId703"].add($.__views["btnBack"]);
    $.__views["__alloyId704"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId704" });

    $.__views["__alloyId702"].add($.__views["__alloyId704"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Health Article', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId704"].add($.__views["pageTitle"]);
  }
  var __alloyId706 = [];
  $.__views["myContentView"] = Ti.UI.createScrollView(
  { id: "myContentView", contentHeight: "auto", contentWidth: Ti.UI.FILL });

  __alloyId706.push($.__views["myContentView"]);
  $.__views["newsTitle"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, id: "newsTitle" });

  $.__views["myContentView"].add($.__views["newsTitle"]);
  $.__views["newsImage"] = Ti.UI.createImageView(
  { id: "newsImage", image: "" });

  $.__views["myContentView"].add($.__views["newsImage"]);
  $.__views["newsDate"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, id: "newsDate" });

  $.__views["myContentView"].add($.__views["newsDate"]);
  $.__views["__alloyId705"] = Ti.UI.createScrollableView(
  { views: __alloyId706, showPagingControl: false, id: "__alloyId705" });

  $.__views["main"].add($.__views["__alloyId705"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file


  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/news.js.map