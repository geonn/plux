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
        $.heightView.setHeight("0");
        $.weightView.setHeight("0");
        $.bmiView.hide();
        $.bloodPressureView.hide();
        $.heartRateView.hide();
        $.bodyTemperatureView.hide();
        $.heightView.hide();
        $.weightView.hide();
    }
    function filterList(e) {
        if ("measurement" == e.category) {
            resetGraph();
            $.bmiView.setHeight("40%");
            $.bmiView.show();
            $.heightView.setHeight("40%");
            $.heightView.show();
            $.weightView.setHeight("40%");
            $.weightView.show();
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
            $.heightView.setHeight("40%");
            $.weightView.setHeight("40%");
            $.weightView.show();
            $.heightView.show();
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
    $.__views.__alloyId200 = Ti.UI.createView({
        id: "__alloyId200"
=======
    $.__views.__alloyId202 = Ti.UI.createView({
        id: "__alloyId202"
>>>>>>> origin/master
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId200.add($.__views.moreHealth);
    $.__views.m_myHealth.rightNavButton = $.__views.__alloyId200;
    $.__views.__alloyId201 = Ti.UI.createView({
        id: "__alloyId201"
    });
    $.__views.m_myHealth.add($.__views.__alloyId201);
=======
    $.__views.__alloyId202.add($.__views.moreHealth);
    $.__views.m_myHealth.rightNavButton = $.__views.__alloyId202;
    $.__views.__alloyId203 = Ti.UI.createView({
        id: "__alloyId203"
    });
    $.__views.m_myHealth.add($.__views.__alloyId203);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.__alloyId201.add($.__views.loadingBar);
=======
    $.__views.__alloyId203.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId202 = Ti.UI.createLabel({
=======
    $.__views.__alloyId204 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId202"
    });
    $.__views.loadingBar.add($.__views.__alloyId202);
=======
        id: "__alloyId204"
    });
    $.__views.loadingBar.add($.__views.__alloyId204);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    $.__views.__alloyId201.add($.__views.main);
=======
    $.__views.__alloyId203.add($.__views.main);
>>>>>>> origin/master
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
    $.__views.__alloyId203 = Ti.UI.createView({
=======
    $.__views.__alloyId205 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId203"
    });
    $.__views.bmiView.add($.__views.__alloyId203);
=======
        id: "__alloyId205"
    });
    $.__views.bmiView.add($.__views.__alloyId205);
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
    $.__views.__alloyId204 = Ti.UI.createWebView({
=======
    $.__views.__alloyId206 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bloodPressure.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId204"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createView({
=======
        id: "__alloyId206"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId205"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId205);
=======
        id: "__alloyId207"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId207);
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
    $.__views.__alloyId206 = Ti.UI.createWebView({
=======
    $.__views.__alloyId208 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/heartRate.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId206"
    });
    $.__views.heartRateView.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createView({
=======
        id: "__alloyId208"
    });
    $.__views.heartRateView.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId207"
    });
    $.__views.heartRateView.add($.__views.__alloyId207);
=======
        id: "__alloyId209"
    });
    $.__views.heartRateView.add($.__views.__alloyId209);
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
    $.__views.__alloyId208 = Ti.UI.createWebView({
=======
    $.__views.__alloyId210 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bodyTemperature.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId208"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createView({
=======
        id: "__alloyId210"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId209"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId209);
=======
        id: "__alloyId211"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId211);
>>>>>>> origin/master
    $.__views.heightView = Ti.UI.createView({
        id: "heightView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heightView);
<<<<<<< HEAD
    $.__views.__alloyId210 = Ti.UI.createWebView({
=======
    $.__views.__alloyId212 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/height.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId210"
    });
    $.__views.heightView.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createView({
=======
        id: "__alloyId212"
    });
    $.__views.heightView.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId211"
    });
    $.__views.heightView.add($.__views.__alloyId211);
=======
        id: "__alloyId213"
    });
    $.__views.heightView.add($.__views.__alloyId213);
>>>>>>> origin/master
    $.__views.weightView = Ti.UI.createView({
        id: "weightView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.weightView);
<<<<<<< HEAD
    $.__views.__alloyId212 = Ti.UI.createWebView({
=======
    $.__views.__alloyId214 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/weight.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId212"
    });
    $.__views.weightView.add($.__views.__alloyId212);
=======
        id: "__alloyId214"
    });
    $.__views.weightView.add($.__views.__alloyId214);
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
    }, 800);
    filterList({
        category: "all"
    });
    $.bmiView.addEventListener("click", function() {
        nav.navigateWithArgs("healthDataSummary", {
            gType: 1
        });
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigateWithArgs("healthDataSummary", {
            gType: 2
        });
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigateWithArgs("healthDataSummary", {
            gType: 3
        });
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigateWithArgs("healthDataSummary", {
            gType: 4
        });
    });
    $.heightView.addEventListener("click", function() {
        nav.navigateWithArgs("healthDataSummary", {
            gType: 5
        });
    });
    $.weightView.addEventListener("click", function() {
        nav.navigateWithArgs("healthDataSummary", {
            gType: 6
        });
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