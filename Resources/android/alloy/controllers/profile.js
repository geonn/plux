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
  this.__controllerPath = 'profile';
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
  $.__views["myProfile"] = Ti.UI.createWindow(
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, navTintColor: "#CE1D1C", title: "My Profile", id: "myProfile", layout: "vertical" });

  $.__views["myProfile"] && $.addTopLevelView($.__views["myProfile"]);
  $.__views["__alloyId812"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", height: "100%", id: "__alloyId812" });

  $.__views["myProfile"].add($.__views["__alloyId812"]);
  if (true) {
    $.__views["__alloyId813"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId813" });

    $.__views["__alloyId812"].add($.__views["__alloyId813"]);
    $.__views["__alloyId814"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId814" });

    $.__views["__alloyId813"].add($.__views["__alloyId814"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId814"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "90%" });

    $.__views["__alloyId813"].add($.__views["pageTitle"]);
    $.__views["__alloyId815"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'My Profile', textAlign: "center", id: "__alloyId815" });

    $.__views["pageTitle"].add($.__views["__alloyId815"]);
  }
  $.__views["description"] = Ti.UI.createLabel(
  { width: Titanium.UI.FILL, height: "40dp", color: "#6E6E6E", font: { fontFamily: "Roboto-Regular, arial", fontSize: "14dp" }, top: "10dp", textAlign: "center", id: "description", text: "Please choose profile of the below services" });

  $.__views["__alloyId812"].add($.__views["description"]);
  $.__views["scrollboard"] = Ti.UI.createScrollView(
  { id: "scrollboard", width: Titanium.UI.FILL, height: Ti.UI.FILL, zIndex: 3 });

  $.__views["__alloyId812"].add($.__views["scrollboard"]);
  $.__views["__alloyId816"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: 293, top: 20, id: "__alloyId816" });

  $.__views["scrollboard"].add($.__views["__alloyId816"]);
  $.__views["plux_logo"] = Ti.UI.createImageView(
  { top: "30dp", borderRadius: 10, width: 120, left: 15, height: 120, id: "plux_logo", mod: "plux", backgroundColor: "#ff0000", bottom: "30dp", image: "/images/logo_plux.png" });

  $.__views["__alloyId816"].add($.__views["plux_logo"]);
  navProfile ? $.addListener($.__views["plux_logo"], 'click', navProfile) : __defers['$.__views["plux_logo"]!click!navProfile'] = true;$.__views["asp_logo"] = Ti.UI.createImageView(
  { top: "30dp", borderRadius: 10, width: 120, left: 15, height: 120, id: "asp_logo", mod: "asp", backgroundColor: "#ff0000", bottom: "30dp", image: "/images/asp_logo.png" });

  $.__views["__alloyId816"].add($.__views["asp_logo"]);
  navProfile ? $.addListener($.__views["asp_logo"], 'click', navProfile) : __defers['$.__views["asp_logo"]!click!navProfile'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};

  function navProfile(e) {
    var target = e.source.mod;

    if (target == "asp") {
      Alloy.Globals.nav.navigationWindow(target + "/profile", 1);
    } else {
      Alloy.Globals.nav.navigateWithArgs("plux_profile", {});
    }
  }

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.myProfile);
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["plux_logo"]!click!navProfile'] && $.addListener($.__views["plux_logo"], 'click', navProfile);__defers['$.__views["asp_logo"]!click!navProfile'] && $.addListener($.__views["asp_logo"], 'click', navProfile);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\profile.js.map