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
  this.__controllerPath = 'asp/editProfile';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, navTintColor: "#CE1D1C", title: "Edit Profile", id: "win" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId343"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId343" });

  $.__views["win"].add($.__views["__alloyId343"]);
  if (true) {
    $.__views["__alloyId344"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId344" });

    $.__views["__alloyId343"].add($.__views["__alloyId344"]);
    $.__views["__alloyId345"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId345" });

    $.__views["__alloyId344"].add($.__views["__alloyId345"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId345"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "60%" });

    $.__views["__alloyId344"].add($.__views["pageTitle"]);
    $.__views["__alloyId346"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Edit Profile', textAlign: "center", id: "__alloyId346" });

    $.__views["pageTitle"].add($.__views["__alloyId346"]);
  }
  $.__views["main"] = Ti.UI.createScrollView(
  { id: "main", layout: "vertical", height: "100%", contentHeight: Ti.UI.SIZE });

  $.__views["__alloyId343"].add($.__views["main"]);
  $.__views["__alloyId347"] = Ti.UI.createImageView(
  { width: 120, borderRadius: 10, height: 120, backgroundColor: "#ff0000", bottom: "30dp", top: "30dp", image: "/images/asp_logo.png", id: "__alloyId347" });

  $.__views["main"].add($.__views["__alloyId347"]);
  $.__views["email"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", id: "email", hintText: "Enter New Email", value: "" });

  $.__views["main"].add($.__views["email"]);
  $.__views["hp"] = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 14 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", id: "hp", hintText: "Enter New Mobile Number", top: 10, value: "" });

  $.__views["main"].add($.__views["hp"]);
  $.__views["__alloyId348"] = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", title: "Save", top: 10, id: "__alloyId348" });

  $.__views["main"].add($.__views["__alloyId348"]);
  submitPassword ? $.addListener($.__views["__alloyId348"], 'touchend', submitPassword) : __defers['$.__views["__alloyId348"]!touchend!submitPassword'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  $.win.add(loading.getView());

  function submitPassword() {
    loading.start();
    var email = $.email.value;
    var hp = $.hp.value;
    if (email.trim() != "") {
      var param = "&value=" + email;
      var target = "EMAIL";
      callAPI(param, target);
    }

    if (hp.trim() != "") {
      var param = "&value=" + hp;
      var target = "MOBILE";
      callAPI(param, target);
    }

    if (param == "") {
      loading.finish();
      return;
    }

  }

  function callAPI(param, target) {
    var LOGINID = Ti.App.Properties.getString('email');
    Alloy.Globals.API.callByGet({ url: "updateemailhp.aspx", params: "LOGINID=" + LOGINID + param + "&TARGET=" + target }, {
      onload: function (responseText) {
        var res = JSON.parse(responseText);
        if (res.length == null || res.length <= 0) {
        } else if (typeof res[0] !== "undefined" && typeof res[0].message !== "undefined") {
          //console.log('got error message');
          Alloy.Globals.common.createAlert(res[0].message);
        } else {
          Ti.App.Properties.setString('email', email);
          Alloy.Globals.common.createAlert("Done", res.message);
        }
      }, onfinish: function () {
        loading.finish();
      }, onerror: function (e) {
        alert("Server busy, please try again later.");
        //$.win.close();
      } });

  }

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId348"]!touchend!submitPassword'] && $.addListener($.__views["__alloyId348"], 'touchend', submitPassword);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\asp\editProfile.js.map