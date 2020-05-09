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
  this.__controllerPath = 'hospital/search';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Search", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId563"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId563" });

  $.__views["win"].add($.__views["__alloyId563"]);
  if (true) {
    $.__views["__alloyId564"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId564" });

    $.__views["__alloyId563"].add($.__views["__alloyId564"]);
    $.__views["__alloyId565"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId565" });

    $.__views["__alloyId564"].add($.__views["__alloyId565"]);
    $.__views["__alloyId566"] = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId566" });

    $.__views["__alloyId565"].add($.__views["__alloyId566"]);
    closeWindow ? $.addListener($.__views["__alloyId566"], 'click', closeWindow) : __defers['$.__views["__alloyId566"]!click!closeWindow'] = true;$.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: Ti.UI.FILL });

    $.__views["__alloyId564"].add($.__views["pageTitle"]);
    $.__views["__alloyId567"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Search', textAlign: "center", id: "__alloyId567" });

    $.__views["pageTitle"].add($.__views["__alloyId567"]);
  }
  $.__views["result"] = Ti.UI.createTableView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, backgroundColor: "transparent", id: "result" });

  $.__views["__alloyId563"].add($.__views["result"]);
  navTo ? $.addListener($.__views["result"], 'click', navTo) : __defers['$.__views["result"]!click!navTo'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");

  function init() {
    $.win.add(loading.getView());
    loading.start();
    var u_id = Ti.App.Properties.getString('u_id') || "";
    var corpcode = Ti.App.Properties.getString('corpcode') || "";
    Alloy.Globals.API.callByPost({ url: "getClinicLocator3", params: { u_id: u_id, isRefresh: 0, corpcode: corpcode, keyword: args.keyword } }, function (responseText) {
      var result = JSON.parse(responseText);
      loadClinic(result.data || []);
    });
  }

  init();

  function loadClinic(data) {

    var arr_filter = [];
    for (var i = 0; i < data.length; i++) {
      var tvr = $.UI.create("TableViewRow", { classes: ['wfill', 'hsize'], backgroundColor: "#fff", record: data[i] });
      var row = $.UI.create("View", { classes: ['wsize', 'hsize', 'padding'], left: 0, touchEnabled: false });
      var lab_category_name = $.UI.create("Label", { classes: ['wsize', 'hsize', 'h6'], text: data[i].clinicName, touchEnabled: false });
      row.add(lab_category_name);
      tvr.add(row);
      arr_filter.push(tvr);
    };
    $.result.setData(arr_filter);
    loading.finish();
  }

  function navTo(e) {
    type = e.source.record;
    Ti.App.fireEvent("clinic/index:navTo", { record: e.source.record });
    closeWindow();
  }

  function closeWindow() {
    $.win.close();
  }
  $.win.addEventListener("close", function () {
    $.destroy();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  if (true) {
    __defers['$.__views["__alloyId566"]!click!closeWindow'] && $.addListener($.__views["__alloyId566"], 'click', closeWindow);}
  __defers['$.__views["result"]!click!navTo'] && $.addListener($.__views["result"], 'click', navTo);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/hospital/search.js.map