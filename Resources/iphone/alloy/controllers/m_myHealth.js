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
    $.__views.__alloyId220 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId220"
    });
    $.__views.graphScrollView.add($.__views.__alloyId220);
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        height: "40%",
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.graphScrollView.add($.__views.bloodPressureView);
<<<<<<< HEAD
    $.__views.__alloyId196 = Ti.UI.createWebView({
=======
<<<<<<< HEAD
    $.__views.__alloyId221 = Ti.UI.createWebView({
=======
    $.__views.__alloyId182 = Ti.UI.createWebView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bloodPressure.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId196"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId196);
=======
<<<<<<< HEAD
        id: "__alloyId221"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId222"
    });
    $.__views.graphScrollView.add($.__views.__alloyId222);
=======
        id: "__alloyId182"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId182);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        height: "40%",
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.graphScrollView.add($.__views.heartRateView);
<<<<<<< HEAD
    $.__views.__alloyId197 = Ti.UI.createWebView({
=======
<<<<<<< HEAD
    $.__views.__alloyId223 = Ti.UI.createWebView({
=======
    $.__views.__alloyId183 = Ti.UI.createWebView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/heartRate.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId197"
    });
    $.__views.heartRateView.add($.__views.__alloyId197);
=======
<<<<<<< HEAD
        id: "__alloyId223"
    });
    $.__views.heartRateView.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId224"
    });
    $.__views.graphScrollView.add($.__views.__alloyId224);
=======
        id: "__alloyId183"
    });
    $.__views.heartRateView.add($.__views.__alloyId183);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        height: "40%",
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.graphScrollView.add($.__views.bodyTemperatureView);
<<<<<<< HEAD
    $.__views.__alloyId198 = Ti.UI.createWebView({
=======
<<<<<<< HEAD
    $.__views.__alloyId225 = Ti.UI.createWebView({
=======
    $.__views.__alloyId184 = Ti.UI.createWebView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        touchEnabled: false,
        width: "100%",
        backgroundColor: "#EBEBEB",
        url: "/html/bodyTemperature.html",
        disableBounce: "true",
<<<<<<< HEAD
        id: "__alloyId198"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId198);
=======
<<<<<<< HEAD
        id: "__alloyId225"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId225);
=======
        id: "__alloyId184"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId184);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
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