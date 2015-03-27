function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function resetGraph() {
        $.bmiView.setHeight("0");
        $.bloodPressureView.setHeight("0");
        $.heartRateView.setHeight("0");
        $.bodyTemperatureView.setHeight("0");
        $.bmiView.hide();
        $.bloodPressureView.hide();
        $.heartRateView.hide();
        $.bodyTemperatureView.hide();
    }
    function filterList(e) {
        if ("measurement" == e.category) {
            resetGraph();
            $.bmiView.setHeight("40%");
            $.bmiView.show();
        } else if ("vitals" == e.category) {
            resetGraph();
            $.heartRateView.setHeight("40%");
            $.bodyTemperatureView.setHeight("40%");
            $.bloodPressureView.setHeight("40%");
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.bloodPressureView.show();
        } else {
            $.bmiView.setHeight("40%");
            $.bloodPressureView.setHeight("40%");
            $.heartRateView.setHeight("40%");
            $.bodyTemperatureView.setHeight("40%");
            $.bmiView.show();
            $.bloodPressureView.show();
            $.heartRateView.show();
            $.bodyTemperatureView.show();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "m_myHealth";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.m_myHealth = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "MY HEALTH RECORD",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myHealth"
    });
    $.__views.m_myHealth && $.addTopLevelView($.__views.m_myHealth);
<<<<<<< HEAD
    $.__views.__alloyId287 = Ti.UI.createView({
        id: "__alloyId287"
=======
    $.__views.__alloyId285 = Ti.UI.createView({
        id: "__alloyId285"
>>>>>>> origin/master
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId287.add($.__views.moreHealth);
    $.__views.m_myHealth.rightNavButton = $.__views.__alloyId287;
    $.__views.__alloyId288 = Ti.UI.createView({
        id: "__alloyId288"
=======
<<<<<<< HEAD
    $.__views.__alloyId285.add($.__views.moreHealth);
    $.__views.m_myHealth.rightNavButton = $.__views.__alloyId285;
=======
    $.__views.__alloyId286.add($.__views.moreHealth);
    $.__views.m_myHealth.rightNavButton = $.__views.__alloyId286;
    $.__views.__alloyId287 = Ti.UI.createView({
        id: "__alloyId287"
>>>>>>> origin/master
    });
    $.__views.m_myHealth.add($.__views.__alloyId288);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId288.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId289 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId289"
    });
<<<<<<< HEAD
    $.__views.loadingBar.add($.__views.__alloyId289);
=======
    $.__views.loadingBar.add($.__views.__alloyId288);
>>>>>>> origin/master
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId288.add($.__views.main);
    $.__views.graphScrollView = Ti.UI.createScrollView({
        id: "graphScrollView",
        layout: "vertical",
        height: "100%",
        width: "100%"
    });
    $.__views.main.add($.__views.graphScrollView);
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bmiView);
    $.__views.bmiWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bmiWebView",
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bmi.html",
        disableBounce: "true"
    });
    $.__views.bmiView.add($.__views.bmiWebView);
<<<<<<< HEAD
    $.__views.__alloyId290 = Ti.UI.createView({
=======
<<<<<<< HEAD
    $.__views.__alloyId286 = Ti.UI.createView({
=======
    $.__views.__alloyId289 = Ti.UI.createView({
>>>>>>> origin/master
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId290"
    });
    $.__views.bmiView.add($.__views.__alloyId290);
=======
<<<<<<< HEAD
        id: "__alloyId286"
    });
    $.__views.graphScrollView.add($.__views.__alloyId286);
=======
        id: "__alloyId289"
    });
    $.__views.bmiView.add($.__views.__alloyId289);
>>>>>>> origin/master
>>>>>>> origin/master
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bloodPressureView);
<<<<<<< HEAD
    $.__views.__alloyId291 = Ti.UI.createWebView({
=======
<<<<<<< HEAD
    $.__views.__alloyId287 = Ti.UI.createWebView({
=======
    $.__views.__alloyId290 = Ti.UI.createWebView({
>>>>>>> origin/master
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bloodPressure.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId291"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId291);
    $.__views.__alloyId292 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId287"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createView({
=======
        id: "__alloyId290"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId290);
    $.__views.__alloyId291 = Ti.UI.createView({
>>>>>>> origin/master
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId292"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId292);
=======
<<<<<<< HEAD
        id: "__alloyId288"
    });
    $.__views.graphScrollView.add($.__views.__alloyId288);
=======
        id: "__alloyId291"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId291);
>>>>>>> origin/master
>>>>>>> origin/master
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heartRateView);
<<<<<<< HEAD
    $.__views.__alloyId293 = Ti.UI.createWebView({
=======
<<<<<<< HEAD
    $.__views.__alloyId289 = Ti.UI.createWebView({
=======
    $.__views.__alloyId292 = Ti.UI.createWebView({
>>>>>>> origin/master
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/heartRate.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId293"
    });
    $.__views.heartRateView.add($.__views.__alloyId293);
    $.__views.__alloyId294 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId289"
    });
    $.__views.heartRateView.add($.__views.__alloyId289);
    $.__views.__alloyId290 = Ti.UI.createView({
=======
        id: "__alloyId292"
    });
    $.__views.heartRateView.add($.__views.__alloyId292);
    $.__views.__alloyId293 = Ti.UI.createView({
>>>>>>> origin/master
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId294"
    });
    $.__views.heartRateView.add($.__views.__alloyId294);
=======
<<<<<<< HEAD
        id: "__alloyId290"
    });
    $.__views.graphScrollView.add($.__views.__alloyId290);
=======
        id: "__alloyId293"
    });
    $.__views.heartRateView.add($.__views.__alloyId293);
>>>>>>> origin/master
>>>>>>> origin/master
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bodyTemperatureView);
<<<<<<< HEAD
    $.__views.__alloyId295 = Ti.UI.createWebView({
=======
<<<<<<< HEAD
    $.__views.__alloyId291 = Ti.UI.createWebView({
=======
    $.__views.__alloyId294 = Ti.UI.createWebView({
>>>>>>> origin/master
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bodyTemperature.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId295"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId295);
=======
<<<<<<< HEAD
        id: "__alloyId291"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId291);
=======
        id: "__alloyId294"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId294);
>>>>>>> origin/master
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.category || "";
    var nav = require("navigation");
    var hd = require("healthData");
    common.construct($);
    common.showLoading();
    Ti.App.addEventListener("filterList", filterList);
    setTimeout(function() {
        hd.populateData();
        common.hideLoading();
    }, 900);
    filterList({
        category: "all"
    });
    $.bmiView.addEventListener("click", function() {
        nav.navigationWindow("healthDataBmi");
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigationWindow("healthDataBloodPressure");
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigationWindow("healthDataHeartRate");
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigationWindow("healthDataBodyTemperature");
    });
    $.moreHealth.addEventListener("click", function() {
        var page = Alloy.createController("healthMenu").getView();
        page.open();
        page.animate({
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
            opacity: 1,
            duration: 200
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;