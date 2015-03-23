function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
        fullscreen: true,
        title: "MY HEALTH RECORD",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myHealth"
    });
    $.__views.m_myHealth && $.addTopLevelView($.__views.m_myHealth);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
    $.__views.m_myHealth.add($.__views.main);
    $.__views.graphScrollView = Ti.UI.createScrollView({
        id: "graphScrollView",
        layout: "vertical",
        height: "100%",
        width: "100%"
    });
    $.__views.main.add($.__views.graphScrollView);
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        height: "40%",
        width: "100%",
        backgroundColor: "#EBEBEB"
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
    $.__views.__alloyId250 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId250"
    });
    $.__views.graphScrollView.add($.__views.__alloyId250);
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        height: "40%",
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.graphScrollView.add($.__views.bloodPressureView);
    $.__views.__alloyId251 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bloodPressure.html",
        disableBounce: "true",
        id: "__alloyId251"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId251);
    $.__views.__alloyId252 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId252"
    });
    $.__views.graphScrollView.add($.__views.__alloyId252);
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        height: "40%",
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.graphScrollView.add($.__views.heartRateView);
    $.__views.__alloyId253 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/heartRate.html",
        disableBounce: "true",
        id: "__alloyId253"
    });
    $.__views.heartRateView.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId254"
    });
    $.__views.graphScrollView.add($.__views.__alloyId254);
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        height: "40%",
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.graphScrollView.add($.__views.bodyTemperatureView);
    $.__views.__alloyId255 = Ti.UI.createWebView({
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bodyTemperature.html",
        disableBounce: "true",
        id: "__alloyId255"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId255);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var nav = require("navigation");
    var hd = require("healthData");
    setTimeout(function() {
        hd.populateData();
    }, 2e3);
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;