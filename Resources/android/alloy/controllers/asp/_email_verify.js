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
  this.__controllerPath = 'asp/_email_verify';
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
  { barColor: "transparent", backgroundColor: "#fff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "Verify Your Email", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId205"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "__alloyId205" });

  $.__views["win"].add($.__views["__alloyId205"]);
  $.__views["__alloyId206"] = Ti.UI.createImageView(
  { width: "40%", borderRadius: 10, backgroundColor: "#ff0000", top: "30dp", image: "/images/asp_logo.png", id: "__alloyId206" });

  $.__views["__alloyId205"].add($.__views["__alloyId206"]);
  $.__views["__alloyId207"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, text: 'You need to verify your account in order to view claim details. If you didn\'t received verification email, please click \'Resend Verification\' button below.', left: 20, right: 20, bottom: 20, top: 20, id: "__alloyId207" });

  $.__views["__alloyId205"].add($.__views["__alloyId207"]);
  $.__views["__alloyId208"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#CE1D1C", height: 40, color: "#ffffff", width: "70%", title: "Resend Verification", top: 10, id: "__alloyId208" });

  $.__views["__alloyId205"].add($.__views["__alloyId208"]);
  resendVerificationEmail ? $.addListener($.__views["__alloyId208"], 'touchend', resendVerificationEmail) : __defers['$.__views["__alloyId208"]!touchend!resendVerificationEmail'] = true;$.__views["__alloyId209"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Refresh", top: 10, id: "__alloyId209" });

  $.__views["__alloyId205"].add($.__views["__alloyId209"]);
  checkStatus ? $.addListener($.__views["__alloyId209"], 'touchend', checkStatus) : __defers['$.__views["__alloyId209"]!touchend!checkStatus'] = true;$.__views["__alloyId210"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Back", top: 10, id: "__alloyId210" });

  $.__views["__alloyId205"].add($.__views["__alloyId210"]);
  closeWindow ? $.addListener($.__views["__alloyId210"], 'touchend', closeWindow) : __defers['$.__views["__alloyId210"]!touchend!closeWindow'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  function init() {
    $.win.add(loading.getView());
  }

  init();

  function resendVerificationEmail() {
    Alloy.Globals.API.resendVerificationEmail();
  }

  function checkStatus() {
    loading.start();
    var email = Ti.App.Properties.getString('email') || "";
    Alloy.Globals.API.callByPost({ url: "getASPUserDetails", domain: "FREEJINI_DOMAIN", new: true, params: { email: email } }, function (responseText) {
      var result = JSON.parse(responseText);
      if (result.status == "success") {
        Alloy.Globals._.each(result.data, function (value, key) {
          Ti.App.Properties.setString(key, value);
        });
        if (typeof result.data.user_service != "undefined") {
          Alloy.Globals._.each(result.data.user_service[0], function (value, key) {
            Ti.App.Properties.setString(key, value);
          });
        }
        if (typeof result.dependent != "undefined") {
          Ti.App.Properties.setString("dependent", JSON.stringify(result.dependent[0]));
        }
        $.win.close();
        if (result.data.isver > 0) {
          args.callback();
        }
        loading.finish();
      } else {
        loading.finish();
        alert(result.data);
      }
    });
  }

  function closeWindow() {
    $.win.close();
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId208"]!touchend!resendVerificationEmail'] && $.addListener($.__views["__alloyId208"], 'touchend', resendVerificationEmail);__defers['$.__views["__alloyId209"]!touchend!checkStatus'] && $.addListener($.__views["__alloyId209"], 'touchend', checkStatus);__defers['$.__views["__alloyId210"]!touchend!closeWindow'] && $.addListener($.__views["__alloyId210"], 'touchend', closeWindow);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\asp\_email_verify.js.map