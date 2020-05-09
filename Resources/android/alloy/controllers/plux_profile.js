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
  this.__controllerPath = 'plux_profile';
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
  $.__views["plux_profile"] = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "PLUX Profile", id: "plux_profile", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["plux_profile"] && $.addTopLevelView($.__views["plux_profile"]);
  $.__views["__alloyId671"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "__alloyId671" });

  $.__views["plux_profile"].add($.__views["__alloyId671"]);
  if (true) {
    $.__views["__alloyId672"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId672" });

    $.__views["__alloyId671"].add($.__views["__alloyId672"]);
    $.__views["__alloyId673"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId673" });

    $.__views["__alloyId672"].add($.__views["__alloyId673"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId673"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "90%" });

    $.__views["__alloyId672"].add($.__views["pageTitle"]);
    $.__views["__alloyId674"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'PLUX Profile', textAlign: "center", id: "__alloyId674" });

    $.__views["pageTitle"].add($.__views["__alloyId674"]);
  }
  $.__views["profileData"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "profileData", backgroundColor: "#ffffff" });

  $.__views["__alloyId671"].add($.__views["profileData"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var u_id = Ti.App.Properties.getString('u_id');
  var loading = Alloy.createController("loading");
  function render_profile(arr) {
    $.profileData.add(Alloy.createController("_plux_profile_view", { records: arr }).getView());
  }

  function refresh() {
    loading.start();
    var u_id = Ti.App.Properties.getString('u_id') || 0;

    Alloy.Globals.API.callByPost({ url: "getPersonalInfoRecords", params: { u_id: u_id } }, function (responseText) {
      var res = JSON.parse(responseText);
      var arr = res.data || null;
      render_profile(arr);
      loading.finish();
    });
  }

  function init() {
    $.plux_profile.add(loading.getView());
    refresh();
  }

  init();

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.plux_profile);
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/plux_profile.js.map