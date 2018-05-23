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
  this.__controllerPath = 'myHealth/main';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.win = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "MY HEALTH RECORD", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId905 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId905" });

  $.__views.moreHealth = Ti.UI.createImageView(
  { right: 0, id: "moreHealth", width: 30, image: "/images/health_love.png" });

  $.__views.__alloyId905.add($.__views.moreHealth);
  $.__views.win.rightNavButton = $.__views.__alloyId905;$.__views.main = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "main", backgroundColor: "#ffffff" });

  $.__views.win.add($.__views.main);
  if (true) {
    $.__views.__alloyId906 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId906" });

    $.__views.main.add($.__views.__alloyId906);
    $.__views.__alloyId907 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId907" });

    $.__views.__alloyId906.add($.__views.__alloyId907);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId907.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: "80%" });

    $.__views.__alloyId906.add($.__views.pageTitle);
    $.__views.__alloyId908 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Health Info', textAlign: "center", id: "__alloyId908" });

    $.__views.pageTitle.add($.__views.__alloyId908);
    $.__views.__alloyId909 = Ti.UI.createView(
    { borderWidth: 0, width: "10%", id: "__alloyId909" });

    $.__views.__alloyId906.add($.__views.__alloyId909);
    $.__views.moreHealth = Ti.UI.createImageView(
    { id: "moreHealth", width: 30, image: "/images/health_love.png" });

    $.__views.__alloyId909.add($.__views.moreHealth);
  }
  $.__views.graphScrollView = Ti.UI.createScrollView(
  { id: "graphScrollView", layout: "vertical", height: "auto", width: "100%", backgroundColor: "#EBEBEB", contentWidth: Ti.UI.FILL });

  $.__views.main.add($.__views.graphScrollView);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var category = args.category || "";

  init();

  function init() {
    refresh();
  }

  function refresh() {
    var u_id = Ti.App.Properties.getString('u_id') || 0;
    var checker = Alloy.createCollection('updateChecker');
    var isUpdate = checker.getCheckerById("14", u_id);
    var last_updated = "";

    if (isUpdate != "") {
      last_updated = isUpdate.updated;
    }

    API.callByPost({ url: "getHealthDataByUser", params: { u_id: u_id, last_updated: last_updated } }, function (responseText) {
      var model2 = Alloy.createCollection("health");
      var res2 = JSON.parse(responseText);
      console.log(res.data);
      var arr2 = res2.data || null;
      model2.saveArray(arr2);
      checker.updateModule(14, "getHealthDataByUser", res2.last_updated, u_id);
      render_graph();
    });
  }

  function render_graph() {
    var model2 = Alloy.createCollection("health");
    var data = model2.getData();
  }

  function navTo(e) {
    nav.navigateWithArgs("myHealth/healthDataSummary", { gType: e.source.gType });
  }

  $.moreHealth.addEventListener('click', function (e) {
    if ('android' == "android") {
      var dialog = Ti.UI.createOptionDialog({
        cancel: 2,
        options: ['Body Measurement', 'Vitals', 'Cancel'],
        title: 'More' });


      dialog.show();

      dialog.addEventListener("click", function (e) {
        if (e.index == 0) {
          filterList({ category: "measurement" });
        } else if (e.index == 1) {
          filterList({ category: "vitals" });
        }
      });
    } else {
      var page = Alloy.createController('myHealth/_menu').getView();
      page.open();
      page.animate({
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
        opacity: 1,
        duration: 200 });

    }
  });

  $.win.addEventListener("close", function (e) {});

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }









  _.extend($, exports);
}

module.exports = Controller;