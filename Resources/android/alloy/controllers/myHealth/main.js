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
            $.bmiView.show();
            $.heightView.show();
            $.weightView.show();
        } else if ("vitals" == e.category) {
            resetGraph();
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.bloodPressureView.show();
        } else {
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
    $.__views.__alloyId100 = Ti.UI.createView({
        id: "__alloyId100"
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
    $.__views.__alloyId100.add($.__views.moreHealth);
    $.__views.main.rightNavButton = $.__views.__alloyId100;
    $.__views.__alloyId101 = Ti.UI.createView({
        id: "__alloyId101"
    });
    $.__views.main.add($.__views.__alloyId101);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId101.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId102 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId102"
    });
    $.__views.loadingBar.add($.__views.__alloyId102);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId101.add($.__views.main);
    $.__views.__alloyId103 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId103"
    });
    $.__views.main.add($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId104"
    });
    $.__views.__alloyId103.add($.__views.__alloyId104);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId104.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
    $.__views.__alloyId103.add($.__views.pageTitle);
    $.__views.__alloyId105 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Health Info",
        textAlign: "center",
        id: "__alloyId105"
    });
    $.__views.pageTitle.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createView({
        width: "10%",
        id: "__alloyId106"
    });
    $.__views.__alloyId103.add($.__views.__alloyId106);
    $.__views.moreHealth = Ti.UI.createImageView({
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
    $.__views.__alloyId106.add($.__views.moreHealth);
    $.__views.graphScrollView = Ti.UI.createScrollView({
        id: "graphScrollView",
        layout: "vertical",
        height: "auto",
        width: "100%"
    });
    $.__views.main.add($.__views.graphScrollView);
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        height: "200",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bmiView);
    $.__views.bmiWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bmiWebView",
        height: Ti.UI.FILL,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bmi.html",
        disableBounce: "true"
    });
    $.__views.bmiView.add($.__views.bmiWebView);
    $.__views.__alloyId107 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId107"
    });
    $.__views.bmiView.add($.__views.__alloyId107);
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        height: "200",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bloodPressureView);
    $.__views.__alloyId108 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        height: Ti.UI.FILL,
        backgroundColor: "#EBEBEB",
        url: "/html/bloodPressure.html",
        disableBounce: "true",
        id: "__alloyId108"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId109"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId109);
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        height: "200",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heartRateView);
    $.__views.__alloyId110 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        height: Ti.UI.FILL,
        backgroundColor: "#EBEBEB",
        url: "/html/heartRate.html",
        disableBounce: "true",
        id: "__alloyId110"
    });
    $.__views.heartRateView.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId111"
    });
    $.__views.heartRateView.add($.__views.__alloyId111);
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        height: "200",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bodyTemperatureView);
    $.__views.__alloyId112 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        height: Ti.UI.FILL,
        backgroundColor: "#EBEBEB",
        url: "/html/bodyTemperature.html",
        disableBounce: "true",
        id: "__alloyId112"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId113"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId113);
    $.__views.heightView = Ti.UI.createView({
        id: "heightView",
        height: "200",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heightView);
    $.__views.__alloyId114 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        height: Ti.UI.FILL,
        backgroundColor: "#EBEBEB",
        url: "/html/height.html",
        disableBounce: "true",
        id: "__alloyId114"
    });
    $.__views.heightView.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId115"
    });
    $.__views.heightView.add($.__views.__alloyId115);
    $.__views.weightView = Ti.UI.createView({
        id: "weightView",
        height: "200",
        width: "100%",
        backgroundColor: "#EBEBEB",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.weightView);
    $.__views.__alloyId116 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        height: Ti.UI.FILL,
        backgroundColor: "#EBEBEB",
        url: "/html/weight.html",
        disableBounce: "true",
        id: "__alloyId116"
    });
    $.__views.weightView.add($.__views.__alloyId116);
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
    }, 1e3);
    filterList({
        category: "all"
    });
    $.bmiView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 1
        });
    });
    $.bmiView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        $.bmiView.height = parseInt(actualHeight);
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 2
        });
    });
    $.bloodPressureView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        $.bloodPressureView.height = parseInt(actualHeight);
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 3
        });
    });
    $.heartRateView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        $.heartRateView.height = parseInt(actualHeight);
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 4
        });
    });
    $.bodyTemperatureView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        $.bodyTemperatureView.height = parseInt(actualHeight);
    });
    $.heightView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 5
        });
    });
    $.heightView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        $.heightView.height = parseInt(actualHeight);
    });
    $.weightView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 6
        });
    });
    $.weightView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        $.weightView.height = parseInt(actualHeight);
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