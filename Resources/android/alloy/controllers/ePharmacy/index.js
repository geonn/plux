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
  this.__controllerPath = 'ePharmacy/index';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "e-Pharmacy", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["win"].rightNavButton = undefined;$.__views["__alloyId488"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId488" });

  $.__views["win"].add($.__views["__alloyId488"]);
  if (true) {
    $.__views["__alloyId489"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId489" });

    $.__views["__alloyId488"].add($.__views["__alloyId489"]);
    $.__views["__alloyId490"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId490" });

    $.__views["__alloyId489"].add($.__views["__alloyId490"]);
    $.__views["__alloyId491"] = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId491" });

    $.__views["__alloyId490"].add($.__views["__alloyId491"]);
    closeWindow ? $.addListener($.__views["__alloyId491"], 'click', closeWindow) : __defers['$.__views["__alloyId491"]!click!closeWindow'] = true;$.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "79%" });

    $.__views["__alloyId489"].add($.__views["pageTitle"]);
    $.__views["__alloyId492"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'e-Pharmacy', textAlign: "center", id: "__alloyId492" });

    $.__views["pageTitle"].add($.__views["__alloyId492"]);
  }
  $.__views["container"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "container", backgroundColor: "#ffffff" });

  $.__views["__alloyId488"].add($.__views["container"]);
  $.__views["category_bar"] = Ti.UI.createScrollView(
  { layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.SIZE, id: "category_bar" });

  $.__views["container"].add($.__views["category_bar"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  init();

  function init() {
    //var health_data_firsttime = Ti.App.Properties.getString('health_data_firsttime') || false;
    refresh();

  }

  function render_menu(data) {
    for (var i = 0, j = data.length; i < j; i++) {
      var view_cat = $.UI.create("View", { classes: ['wsize', 'hsize', 'padding'], category: data[i] });
      view_cat.add($.UI.create("Label", { classes: ['wsize', 'hsize'], text: data[i] }));
      $.category_bar.add(view_cat);
    };
  }

  function navToAdd(e) {
    Alloy.Globals.nav.navigateWithArgs("myHealth/add", e.source.record);
  }

  function refresh() {
    Alloy.Globals.API.callByPost({ url: "getCategory", new: true, domain: "API_EPHARMACY", params: {} }, function (responseText) {
      var res = JSON.parse(responseText);
      var arr = res.data || null;
      render_menu(arr);
    });
  }

  function closeWindow() {
    $.win.close();
  }


  $.win.addEventListener("close", function (e) {

  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  if (true) {
    __defers['$.__views["__alloyId491"]!click!closeWindow'] && $.addListener($.__views["__alloyId491"], 'click', closeWindow);}


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/ePharmacy/index.js.map