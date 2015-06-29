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
        $.bmiView.setTop("0");
        $.bloodPressureView.setTop("0");
        $.heartRateView.setTop("0");
        $.bodyTemperatureView.setTop("0");
        $.heightView.setTop("0");
        $.weightView.setTop("0");
    }
    function filterList(e) {
        if ("measurement" == e.category) {
            resetGraph();
            $.bmiView.setHeight(Ti.UI.SIZE);
            $.heightView.setHeight(Ti.UI.SIZE);
            $.weightView.setHeight(Ti.UI.SIZE);
            $.bmiView.setTop(10);
            $.heightView.setTop(10);
            $.weightView.setTop(10);
            $.bmiView.show();
            $.heightView.show();
            $.weightView.show();
        } else if ("vitals" == e.category) {
            resetGraph();
            $.heartRateView.setHeight(Ti.UI.SIZE);
            $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
            $.bloodPressureView.setHeight(Ti.UI.SIZE);
            $.heartRateView.setTop(10);
            $.bodyTemperatureView.setTop(10);
            $.bloodPressureView.setTop(10);
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.bloodPressureView.show();
        } else {
            $.stepsView.setHeight(Ti.UI.SIZE);
            $.bmiView.setHeight(Ti.UI.SIZE);
            $.heightView.setHeight(Ti.UI.SIZE);
            $.weightView.setHeight(Ti.UI.SIZE);
            $.heartRateView.setHeight(Ti.UI.SIZE);
            $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
            $.bloodPressureView.setHeight(Ti.UI.SIZE);
            $.stepsView.setTop(10);
            $.bmiView.setTop(10);
            $.heightView.setTop(10);
            $.weightView.setTop(10);
            $.heartRateView.setTop(10);
            $.bodyTemperatureView.setTop(10);
            $.bloodPressureView.setTop(10);
            $.stepsView.show();
            $.weightView.show();
            $.heightView.show();
            $.bmiView.show();
            $.bloodPressureView.show();
            $.heartRateView.show();
            $.bodyTemperatureView.show();
        }
    }
    function populateDataById(e) {
        hd.loadInfo(e.id);
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
    $.__views.myhealth = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "MY HEALTH RECORD",
        id: "myhealth",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.myhealth && $.addTopLevelView($.__views.myhealth);
    $.__views.__alloyId206 = Ti.UI.createView({
        id: "__alloyId206"
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
    $.__views.__alloyId206.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId206;
    $.__views.__alloyId207 = Ti.UI.createView({
        id: "__alloyId207"
    });
    $.__views.myhealth.add($.__views.__alloyId207);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId207.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId208 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId208"
    });
    $.__views.loadingBar.add($.__views.__alloyId208);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId207.add($.__views.main);
    $.__views.graphScrollView = Ti.UI.createScrollView({
        id: "graphScrollView",
        layout: "vertical",
        height: "auto",
        width: "100%",
        backgroundColor: "#EBEBEB",
        contentWidth: Ti.UI.FILL
    });
    $.__views.main.add($.__views.graphScrollView);
    $.__views.stepsView = Ti.UI.createView({
        id: "stepsView",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.stepsView);
    $.__views.stepsWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "stepsWebView",
        height: "200",
        width: "100%",
        url: "/html/steps.html",
        disableBounce: "true"
    });
    $.__views.stepsView.add($.__views.stepsWebView);
    $.__views.__alloyId209 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId209"
    });
    $.__views.stepsView.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId210"
    });
    $.__views.stepsView.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Detail",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId211"
    });
    $.__views.__alloyId210.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "10000 Steps",
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "__alloyId212"
    });
    $.__views.__alloyId210.add($.__views.__alloyId212);
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bmiView);
    $.__views.bmiWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bmiWebView",
        height: "200",
        width: "100%",
        url: "/html/bmi.html",
        disableBounce: "true"
    });
    $.__views.bmiView.add($.__views.bmiWebView);
    $.__views.__alloyId213 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId213"
    });
    $.__views.bmiView.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId214"
    });
    $.__views.bmiView.add($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Detail",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId215"
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "10000 Steps",
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "__alloyId216"
    });
    $.__views.__alloyId214.add($.__views.__alloyId216);
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bloodPressureView);
    $.__views.bloodPressureWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bloodPressureWebView",
        height: "200",
        width: "100%",
        url: "/html/bloodPressure.html",
        disableBounce: "true"
    });
    $.__views.bloodPressureView.add($.__views.bloodPressureWebView);
    $.__views.__alloyId217 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId217"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId218"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Detail",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId219"
    });
    $.__views.__alloyId218.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "10000 Steps",
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "__alloyId220"
    });
    $.__views.__alloyId218.add($.__views.__alloyId220);
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heartRateView);
    $.__views.heartRateWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "heartRateWebView",
        height: "200",
        width: "100%",
        url: "/html/heartRate.html",
        disableBounce: "true"
    });
    $.__views.heartRateView.add($.__views.heartRateWebView);
    $.__views.__alloyId221 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId221"
    });
    $.__views.heartRateView.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId222"
    });
    $.__views.heartRateView.add($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Detail",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId223"
    });
    $.__views.__alloyId222.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "10000 Steps",
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "__alloyId224"
    });
    $.__views.__alloyId222.add($.__views.__alloyId224);
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.bodyTemperatureView);
    $.__views.bodyTemperatureWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "bodyTemperatureWebView",
        height: "200",
        width: "100%",
        url: "/html/bodyTemperature.html",
        disableBounce: "true"
    });
    $.__views.bodyTemperatureView.add($.__views.bodyTemperatureWebView);
    $.__views.__alloyId225 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId225"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId226"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Detail",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "10000 Steps",
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "__alloyId228"
    });
    $.__views.__alloyId226.add($.__views.__alloyId228);
    $.__views.heightView = Ti.UI.createView({
        id: "heightView",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.heightView);
    $.__views.heightWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "heightWebView",
        height: "200",
        width: "100%",
        url: "/html/height.html",
        disableBounce: "true"
    });
    $.__views.heightView.add($.__views.heightWebView);
    $.__views.__alloyId229 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId229"
    });
    $.__views.heightView.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId230"
    });
    $.__views.heightView.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Detail",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId231"
    });
    $.__views.__alloyId230.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "10000 Steps",
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "__alloyId232"
    });
    $.__views.__alloyId230.add($.__views.__alloyId232);
    $.__views.weightView = Ti.UI.createView({
        id: "weightView",
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: "5",
        bottom: "10",
        left: "10",
        right: "10",
        top: "10",
        borderColor: "#dfe0e4",
        width: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        visible: "false"
    });
    $.__views.graphScrollView.add($.__views.weightView);
    $.__views.weightWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "weightWebView",
        height: "200",
        width: "100%",
        url: "/html/weight.html",
        disableBounce: "true"
    });
    $.__views.weightView.add($.__views.weightWebView);
    $.__views.__alloyId233 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId233"
    });
    $.__views.weightView.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId234"
    });
    $.__views.weightView.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Detail",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId235"
    });
    $.__views.__alloyId234.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "10000 Steps",
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "__alloyId236"
    });
    $.__views.__alloyId234.add($.__views.__alloyId236);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.category || "";
    var nav = require("navigation");
    var hd = require("healthData");
    common.construct($);
    hd.stepsMotion();
    Ti.App.addEventListener("filterList", filterList);
    Ti.App.addEventListener("populateDataById", populateDataById);
    filterList({
        category: "all"
    });
    $.stepsView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 10
        });
    });
    $.stepsView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.bmiView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 1
        });
    });
    $.bmiView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.bloodPressureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 2
        });
    });
    $.bloodPressureView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.heartRateView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 3
        });
    });
    $.heartRateView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.bodyTemperatureView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 4
        });
    });
    $.bodyTemperatureView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.heightView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 5
        });
    });
    $.heightView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.weightView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 6
        });
    });
    $.weightWebView.addEventListener("load", function(e) {
        hd.loadInfo(6);
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
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
    $.myhealth.addEventListener("close", function() {
        Ti.App.removeEventListener("filterList", filterList);
        Ti.App.removeEventListener("populateDataById", populateDataById);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;