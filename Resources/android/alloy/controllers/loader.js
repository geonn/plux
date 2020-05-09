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
  this.__controllerPath = 'loader';
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
  $.__views["rocket"] = Ti.UI.createWindow(
  { backgroundColor: "#C41230", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, layout: "composite", id: "rocket", navBarHidden: true });

  $.__views["rocket"] && $.addTopLevelView($.__views["rocket"]);
  $.__views["overlay"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, top: 0, left: 0, backgroundColor: "#CB2228", id: "overlay" });

  $.__views["rocket"].add($.__views["overlay"]);
  $.__views["__alloyId609"] = Ti.UI.createImageView(
  { width: 160, borderRadius: 5, image: "/images/asp_logo.png", id: "__alloyId609" });

  $.__views["rocket"].add($.__views["__alloyId609"]);
  $.__views["loading_text"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, id: "loading_text", bottom: 50 });

  $.__views["rocket"].add($.__views["loading_text"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};

  /**
                                                                 * function to start the loading animation
                                                                 */
  $.start = function () {
    //$.overlay.opacity = 0;
    $.overlay.animate({
      opacity: 0.7,
      duration: 250 });

  };

  /*
         * exposed function to finish the loading animation. Animates the rocket off the screen.
         */
  $.finish = function (_callback) {
    /*$.rocketFlight.opacity = 0.1;
                                                                  
                                                                  $.rocketFlight.start();
                                                                  
                                                                  $.rocketFlight.animate({
                                                                  	opacity: 1,
                                                                  	duration: 500
                                                                  });
                                                                  */

    /*$.rocketFlight.animate({
                                                                                                       	top: -130,
                                                                                                       	duration: 750,
                                                                                                       	curve: Ti.UI.ANIMATION_CURVE_EASE_IN
                                                                                                       });*/

    $.overlay.animate({
      opacity: 0,
      duration: 750 },
    function () {
      _callback && _callback();
    });
  };

  //load API loadAPIBySequence
  //Alloy.Globals.API.bannerListing();
  Alloy.Globals.API.loadAPIBySequence();

  Ti.App.addEventListener('app:update_loading_text', update_loading_text);

  function update_loading_text(e) {
    $.loading_text.text = e.text;
  }

  $.rocket.addEventListener("close", function () {
    Ti.App.removeEventListener('app:update_loading_text', update_loading_text);
    $.destroy();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/loader.js.map