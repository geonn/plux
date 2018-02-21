var Alloy = require('/alloy'),
    Backbone = Alloy.Backbone,
    _ = Alloy._;

function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
    delete obj[key];
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

  $.__views.myhealth = Ti.UI.createWindow({ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "MY HEALTH RECORD", id: "myhealth", backButtonTitle: "", navTintColor: "#CE1D1C" });
  $.__views.myhealth && $.addTopLevelView($.__views.myhealth);
  $.__views.__alloyId655 = Ti.UI.createView({ id: "__alloyId655" });
  $.__views.moreHealth = Ti.UI.createImageView({ right: 0, id: "moreHealth", width: 30, image: "/images/health_love.png" });
  $.__views.__alloyId655.add($.__views.moreHealth);
  $.__views.myhealth.rightNavButton = $.__views.__alloyId655;$.__views.main = Ti.UI.createView({ layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "main", backgroundColor: "#ffffff" });
  $.__views.myhealth.add($.__views.main);
  if (true) {
    $.__views.__alloyId656 = Ti.UI.createView({ layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId656" });
    $.__views.main.add($.__views.__alloyId656);
    $.__views.__alloyId657 = Ti.UI.createView({ left: 0, width: "10%", id: "__alloyId657" });
    $.__views.__alloyId656.add($.__views.__alloyId657);
    $.__views.btnBack = Ti.UI.createImageView({ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });
    $.__views.__alloyId657.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({ id: "pageTitle", width: "80%" });
    $.__views.__alloyId656.add($.__views.pageTitle);
    $.__views.__alloyId658 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Health Info', textAlign: "center", id: "__alloyId658" });
    $.__views.pageTitle.add($.__views.__alloyId658);
    $.__views.__alloyId659 = Ti.UI.createView({ width: "10%", id: "__alloyId659" });
    $.__views.__alloyId656.add($.__views.__alloyId659);
    $.__views.moreHealth = Ti.UI.createImageView({ id: "moreHealth", width: 30, image: "/images/health_love.png" });
    $.__views.__alloyId659.add($.__views.moreHealth);
  }
  $.__views.graphScrollView = Ti.UI.createScrollView({ id: "graphScrollView", layout: "vertical", height: "auto", width: "100%", backgroundColor: "#EBEBEB", contentWidth: Ti.UI.FILL });
  $.__views.main.add($.__views.graphScrollView);
  $.__views.bmiView = Ti.UI.createView({ id: "bmiView", gType: 1, height: Ti.UI.SIZE, layout: "vertical", left: 10, right: 10, top: 10, borderColor: "#dfe0e4", width: Ti.UI.FILL, backgroundColor: "#FFFFFF", visible: false });
  $.__views.graphScrollView.add($.__views.bmiView);
  navTo ? $.addListener($.__views.bmiView, 'click', navTo) : __defers['$.__views.bmiView!click!navTo'] = true;$.__views.bmiWebView = Ti.UI.createWebView({ touchEnabled: false, gType: 1, id: "bmiWebView", height: 230, width: Ti.UI.FILL, url: "/html/bmi.html", disableBounce: true });
  $.__views.bmiView.add($.__views.bmiWebView);
  getDataByType ? $.addListener($.__views.bmiWebView, 'load', getDataByType) : __defers['$.__views.bmiWebView!load!getDataByType'] = true;$.__views.__alloyId660 = Ti.UI.createView({ touchEnabled: false, height: 1, left: 10, right: 10, bottom: 0, backgroundColor: "#dfe0e4", width: Ti.UI.FILL, id: "__alloyId660" });
  $.__views.bmiView.add($.__views.__alloyId660);
  $.__views.__alloyId661 = Ti.UI.createView({ touchEnabled: false, height: Ti.UI.SIZE, left: 10, right: 10, top: 10, bottom: 10, id: "__alloyId661" });
  $.__views.bmiView.add($.__views.__alloyId661);
  $.__views.__alloyId662 = Ti.UI.createLabel({ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", text: 'Latest', touchEnabled: false, font: "fontSize: 12", left: 0, id: "__alloyId662" });
  $.__views.__alloyId661.add($.__views.__alloyId662);
  $.__views.bmiDetailLabel = Ti.UI.createLabel({ width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#9197a3", touchEnabled: false, font: "fontSize: 12", right: 0, id: "bmiDetailLabel" });
  $.__views.__alloyId661.add($.__views.bmiDetailLabel);
  exports.destroy = function () {};

  _.extend($, $.__views);

  var args = arguments[0] || {};
  var category = args.category || "";
  var nav = require('navigation');
  var hd = require('healthData');
  common.construct($);
  hd.construct($);

  init();

  function init() {
    filterList({ category: "all" });
  }

  function resetGraph() {
    var childs = $.graphScrollView.getChildren();
    for (var i = 0; i < childs.length; i++) {
      childs[i].setHeight("0");
    };
  }

  function filterList(e) {

    if (e.category == "measurement") {
      resetGraph();
      $.bmiView.setHeight(Ti.UI.SIZE);
      $.cholestrolView.setHeight(Ti.UI.SIZE);

      $.bmiView.setTop(10);
      $.cholestrolView.setTop(10);

      $.bmiView.show();
      $.cholestrolView.show();
    } else if (e.category == "vitals") {
      resetGraph();
      $.heartRateView.setHeight(Ti.UI.SIZE);
      $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
      $.bloodPressureView.setHeight(Ti.UI.SIZE);
      $.cholestrolView.setHeight(Ti.UI.SIZE);
      $.glucoseView.setHeight(Ti.UI.SIZE);

      $.heartRateView.setTop(10);
      $.bodyTemperatureView.setTop(10);
      $.bloodPressureView.setTop(10);
      $.cholestrolView.setTop(10);
      $.glucoseView.setTop(10);

      $.heartRateView.show();
      $.bodyTemperatureView.show();
      $.bloodPressureView.show();
      $.cholestrolView.show();
      $.glucoseView.show();
    } else {
      for (var a = 0; a < $.graphScrollView.children.length; a++) {
        var activityIndicator = createIndicator();
        $.graphScrollView.children[a].children[0].add(activityIndicator);
        activityIndicator.show();
      }
      $.bmiView.setHeight(Ti.UI.SIZE);

      $.bmiView.setTop(10);
      $.bmiView.show();
    }
  }

  function getDataByType(e) {
    var gType = e.source.gType;
    var u_id = Ti.App.Properties.getString('u_id') || 0;
    var checker = Alloy.createCollection('updateChecker');
    var isUpdate = checker.getCheckerById("14", u_id, gType);
    var last_updated = "";

    if (isUpdate != "") {
      last_updated = isUpdate.updated;
    }

    API.callByPost({ url: "getHealthDataByUser", params: { u_id: u_id, type: gType, last_updated: last_updated } }, function (responseText) {
      var model2 = Alloy.createCollection("health");
      var res2 = JSON.parse(responseText);

      var arr2 = res2.data || null;
      model2.saveArray(arr2);
      checker.updateModule(14, "getHealthDataByUser", res2.last_updated, u_id, gType);
      hd.loadInfo(gType, '', '1', e.source.parent.children[2].children[1]);
      e.source.children[0].hide();
    });
  }

  function navTo(e) {
    nav.navigateWithArgs("myHealth/healthDataSummary", { gType: e.source.gType });
  }

  $.moreHealth.addEventListener('click', function (e) {
    if ('android' == "android") {
      var dialog = Ti.UI.createOptionDialog({
        cancel: 2,
        options: ['Body Measurement', 'Vitals', 'Cancel'],
        title: 'More'
      });

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
        duration: 200
      });
    }
  });

  $.myhealth.addEventListener("close", function (e) {});

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.myhealth);
    });
  }

  __defers['$.__views.bmiView!click!navTo'] && $.addListener($.__views.bmiView, 'click', navTo);__defers['$.__views.bmiWebView!load!getDataByType'] && $.addListener($.__views.bmiWebView, 'load', getDataByType);

  _.extend($, exports);
}

module.exports = Controller;