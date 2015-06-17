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
        $.stepsView.setHeight("0");
        $.bmiView.setHeight("0");
        $.bloodPressureView.setHeight("0");
        $.heartRateView.setHeight("0");
        $.bodyTemperatureView.setHeight("0");
        $.heightView.setHeight("0");
        $.weightView.setHeight("0");
        $.stepsView.hide();
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
            $.stepsView.setHeight("40%");
            $.bmiView.setHeight("40%");
            $.bloodPressureView.setHeight("40%");
            $.heartRateView.setHeight("40%");
            $.bodyTemperatureView.setHeight("40%");
            $.heightView.setHeight("40%");
            $.weightView.setHeight("40%");
            $.stepsView.show();
            $.weightView.show();
            $.heightView.show();
            $.bmiView.show();
            $.bloodPressureView.show();
            $.heartRateView.show();
            $.bodyTemperatureView.show();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/main";
    this.args = arguments[0] || {};
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
    $.__views.main = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "MY HEALTH RECORD",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "main"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.__alloyId198 = Ti.UI.createView({
        id: "__alloyId198"
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
    $.__views.__alloyId198.add($.__views.moreHealth);
    $.__views.main.rightNavButton = $.__views.__alloyId198;
    $.__views.__alloyId199 = Ti.UI.createView({
        id: "__alloyId199"
    });
    $.__views.main.add($.__views.__alloyId199);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId199.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId200 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId200"
    });
    $.__views.loadingBar.add($.__views.__alloyId200);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId199.add($.__views.main);
    $.__views.graphScrollView = Ti.UI.createScrollView({
        id: "graphScrollView",
        layout: "vertical",
        height: "100%",
        width: "100%"
    });
    $.__views.main.add($.__views.graphScrollView);
    $.__views.stepsView = Ti.UI.createView({
        id: "stepsView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.stepsView);
    $.__views.stepsWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "stepsWebView",
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/steps.html",
        disableBounce: "true"
    });
    $.__views.stepsView.add($.__views.stepsWebView);
    $.__views.__alloyId201 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId201"
    });
    $.__views.stepsView.add($.__views.__alloyId201);
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
    $.__views.__alloyId202 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId202"
    });
    $.__views.bmiView.add($.__views.__alloyId202);
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bloodPressureView);
    $.__views.__alloyId203 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bloodPressure.html",
        disableBounce: "true",
        id: "__alloyId203"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId204"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId204);
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heartRateView);
    $.__views.__alloyId205 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/heartRate.html",
        disableBounce: "true",
        id: "__alloyId205"
    });
    $.__views.heartRateView.add($.__views.__alloyId205);
    $.__views.__alloyId206 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId206"
    });
    $.__views.heartRateView.add($.__views.__alloyId206);
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bodyTemperatureView);
    $.__views.__alloyId207 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bodyTemperature.html",
        disableBounce: "true",
        id: "__alloyId207"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId208"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId208);
    $.__views.heightView = Ti.UI.createView({
        id: "heightView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heightView);
    $.__views.__alloyId209 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/height.html",
        disableBounce: "true",
        id: "__alloyId209"
    });
    $.__views.heightView.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId210"
    });
    $.__views.heightView.add($.__views.__alloyId210);
    $.__views.weightView = Ti.UI.createView({
        id: "weightView",
        height: "0",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.weightView);
    $.__views.__alloyId211 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/weight.html",
        disableBounce: "true",
        id: "__alloyId211"
    });
    $.__views.weightView.add($.__views.__alloyId211);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.category || "";
    var nav = require("navigation");
    var hd = require("healthData");
    common.construct($);
    common.showLoading();
    hd.stepsMotion();
    Ti.App.addEventListener("filterList", filterList);
    setTimeout(function() {
        hd.populateData();
        common.hideLoading();
    }, 800);
    filterList({
        category: "all"
    });
    $.stepsView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 10
        });
    });
    $.bmiView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 1
        });
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 2
        });
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 3
        });
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 4
        });
    });
    $.heightView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 5
        });
    });
    $.weightView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 6
        });
    });
    $.moreHealth.addEventListener("click", function() {
        var page = Alloy.createController("myHealth/_menu").getView();
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