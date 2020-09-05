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
  this.__controllerPath = 'asp/profile';
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
  $.__views["asp_profile"] = Ti.UI.createWindow(
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "ASP Profile", backButtonTitle: "", id: "asp_profile", navTintColor: "#CE1D1C" });

  $.__views["asp_profile"] && $.addTopLevelView($.__views["asp_profile"]);
  $.__views["loadingBar"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "loadingBar", height: 0, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });

  $.__views["asp_profile"].add($.__views["loadingBar"]);
  $.__views["activityIndicator"] = Ti.UI.createActivityIndicator(
  { top: 10, left: 30, width: 60, id: "activityIndicator" });

  $.__views["loadingBar"].add($.__views["activityIndicator"]);
  $.__views["__alloyId403"] = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial" }, top: 5, bottom: 10, text: "Loading", id: "__alloyId403" });

  $.__views["loadingBar"].add($.__views["__alloyId403"]);
  $.__views["__alloyId405"] = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId405" });

  $.__views["moreBtn"] = Ti.UI.createImageView(
  { right: 0, id: "moreBtn", width: 30, image: "/images/list.png" });

  $.__views["__alloyId405"].add($.__views["moreBtn"]);
  $.__views["asp_profile"].rightNavButton = $.__views["__alloyId405"];$.__views["__alloyId406"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId406" });

  $.__views["asp_profile"].add($.__views["__alloyId406"]);
  if (true) {
    $.__views["__alloyId407"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId407" });

    $.__views["__alloyId406"].add($.__views["__alloyId407"]);
    $.__views["__alloyId408"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId408" });

    $.__views["__alloyId407"].add($.__views["__alloyId408"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId408"].add($.__views["btnBack"]);
    $.__views["pageTitle"] = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "80%" });

    $.__views["__alloyId407"].add($.__views["pageTitle"]);
    $.__views["__alloyId409"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'ASP Profile', textAlign: "center", id: "__alloyId409" });

    $.__views["pageTitle"].add($.__views["__alloyId409"]);
    $.__views["__alloyId410"] = Ti.UI.createView(
    { borderWidth: 0, width: "auto", id: "__alloyId410" });

    $.__views["__alloyId407"].add($.__views["__alloyId410"]);
    $.__views["moreBtn"] = Ti.UI.createImageView(
    { id: "moreBtn", width: 30, image: "/images/list.png" });

    $.__views["__alloyId410"].add($.__views["moreBtn"]);
  }
  $.__views["__alloyId411"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId411" });

  $.__views["__alloyId406"].add($.__views["__alloyId411"]);
  $.__views["profileContainer"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "profileContainer", visible: false });

  $.__views["__alloyId411"].add($.__views["profileContainer"]);
  var __alloyId412 = [];
  $.__views["main"] = Ti.UI.createScrollableView(
  { views: __alloyId412, id: "main", height: "80%", backgroundColor: "#ffffff" });

  $.__views["profileContainer"].add($.__views["main"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  Alloy.Globals.common.construct($);
  loadPage();
  function loadPage() {
    var isver = Ti.App.Properties.getString('isver');
    var corpcode = Ti.App.Properties.getString('corpcode');
    var memno = Ti.App.Properties.getString('memno');
    var empno = Ti.App.Properties.getString('empno');
    if (isver == "true" || isver > 0) {
      $.profileContainer.show();
    }
    Ti.App.removeEventListener('loadPage', loadPage);
  }
  var data = JSON.parse(Ti.App.Properties.getString('dependent'));
  var profile_view = Alloy.createController("_profile_view", { profile_data: data }).getView();
  $.main.addView(profile_view);

  function changePassword() {
    var nav = require('navigation');
    Alloy.Globals.nav.navigationWindow("asp/changePassword", 0);
  }

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.asp_profile);
    });
  }

  $.moreBtn.addEventListener('click', function (e) {
    var dialog = Ti.UI.createOptionDialog({
      cancel: 1,
      options: ['Change Password', 'Cancel'],
      title: 'More' });


    dialog.show();

    dialog.addEventListener("click", function (e) {
      if (e.index == 0) {
        changePassword();
        //Alloy.Globals.API.loadCategory({types: "popular"});
      }
    });
  });

  $.asp_profile.addEventListener("close", function () {
    Ti.App.removeEventListener('loadPage', loadPage);
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
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\asp\profile.js.map