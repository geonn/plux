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
  this.__controllerPath = 'loading';
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
  $.__views["loadingBar"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", zIndex: 200, id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

  $.__views["loadingBar"] && $.addTopLevelView($.__views["loadingBar"]);
  if (true) {
    $.__views["activityIndicator"] = Ti.UI.createActivityIndicator(
    { top: 0, left: 30, width: 60, id: "activityIndicator", style: Ti.UI.ActivityIndicatorStyle.BIG });

    $.__views["loadingBar"].add($.__views["activityIndicator"]);
  }
  $.__views["__alloyId610"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, textAlign: "center", top: 5, text: "Loading", id: "__alloyId610" });

  $.__views["loadingBar"].add($.__views["__alloyId610"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  $.loadingBar.hide();
  $.activityIndicator.hide();
  /**
                                                           * function to start the loading animation
                                                           */
  $.start = function () {
    $.loadingBar.show();
    $.activityIndicator.show();
  };

  /*
         * exposed function to finish the loading animation. Animates the rocket off the screen.
         */
  $.finish = function (_callback) {
    $.loadingBar.hide();
    $.activityIndicator.hide();
    _callback && _callback();
  };

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/loading.js.map