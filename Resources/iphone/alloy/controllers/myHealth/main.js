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
<<<<<<< HEAD
    $.__views.__alloyId169 = Ti.UI.createView({
        id: "__alloyId169"
=======
    $.__views.__alloyId167 = Ti.UI.createView({
        id: "__alloyId167"
>>>>>>> origin/master
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId169.add($.__views.moreHealth);
    $.__views.main.rightNavButton = $.__views.__alloyId169;
    $.__views.__alloyId170 = Ti.UI.createView({
        id: "__alloyId170"
    });
    $.__views.main.add($.__views.__alloyId170);
=======
    $.__views.__alloyId167.add($.__views.moreHealth);
    $.__views.main.rightNavButton = $.__views.__alloyId167;
    $.__views.__alloyId168 = Ti.UI.createView({
        id: "__alloyId168"
    });
    $.__views.main.add($.__views.__alloyId168);
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
    $.__views.__alloyId170.add($.__views.loadingBar);
=======
    $.__views.__alloyId168.add($.__views.loadingBar);
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
    $.__views.__alloyId171 = Ti.UI.createLabel({
=======
    $.__views.__alloyId169 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId171"
    });
    $.__views.loadingBar.add($.__views.__alloyId171);
=======
        id: "__alloyId169"
    });
    $.__views.loadingBar.add($.__views.__alloyId169);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    $.__views.__alloyId170.add($.__views.main);
=======
    $.__views.__alloyId168.add($.__views.main);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId172 = Ti.UI.createView({
=======
    $.__views.__alloyId170 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId172"
    });
    $.__views.stepsView.add($.__views.__alloyId172);
=======
        id: "__alloyId170"
    });
    $.__views.stepsView.add($.__views.__alloyId170);
>>>>>>> origin/master
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
    $.__views.__alloyId173 = Ti.UI.createView({
=======
    $.__views.__alloyId171 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId173"
    });
    $.__views.bmiView.add($.__views.__alloyId173);
=======
        id: "__alloyId171"
    });
    $.__views.bmiView.add($.__views.__alloyId171);
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
    $.__views.__alloyId174 = Ti.UI.createWebView({
=======
    $.__views.__alloyId172 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bloodPressure.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId174"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createView({
=======
        id: "__alloyId172"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId172);
    $.__views.__alloyId173 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId175"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId175);
=======
        id: "__alloyId173"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId173);
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
    $.__views.__alloyId176 = Ti.UI.createWebView({
=======
    $.__views.__alloyId174 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/heartRate.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId176"
    });
    $.__views.heartRateView.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createView({
=======
        id: "__alloyId174"
    });
    $.__views.heartRateView.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId177"
    });
    $.__views.heartRateView.add($.__views.__alloyId177);
=======
        id: "__alloyId175"
    });
    $.__views.heartRateView.add($.__views.__alloyId175);
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
    $.__views.__alloyId178 = Ti.UI.createWebView({
=======
    $.__views.__alloyId176 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bodyTemperature.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId178"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createView({
=======
        id: "__alloyId176"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId179"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId179);
=======
        id: "__alloyId177"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId177);
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
    $.__views.__alloyId180 = Ti.UI.createWebView({
=======
    $.__views.__alloyId178 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/height.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId180"
    });
    $.__views.heightView.add($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createView({
=======
        id: "__alloyId178"
    });
    $.__views.heightView.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createView({
>>>>>>> origin/master
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
<<<<<<< HEAD
        id: "__alloyId181"
    });
    $.__views.heightView.add($.__views.__alloyId181);
=======
        id: "__alloyId179"
    });
    $.__views.heightView.add($.__views.__alloyId179);
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
    $.__views.__alloyId182 = Ti.UI.createWebView({
=======
    $.__views.__alloyId180 = Ti.UI.createWebView({
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/weight.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId182"
    });
    $.__views.weightView.add($.__views.__alloyId182);
=======
        id: "__alloyId180"
    });
    $.__views.weightView.add($.__views.__alloyId180);
>>>>>>> origin/master
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