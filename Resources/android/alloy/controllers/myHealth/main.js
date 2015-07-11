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
        $.cholestrolView.setHeight("0");
        $.bmiView.setTop("0");
        $.bloodPressureView.setTop("0");
        $.heartRateView.setTop("0");
        $.bodyTemperatureView.setTop("0");
        $.cholestrolView.setTop("0");
    }
    function filterList(e) {
        if ("measurement" == e.category) {
            resetGraph();
            $.bmiView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.bmiView.setTop(10);
            $.cholestrolView.setTop(10);
            $.bmiView.show();
            $.cholestrolView.show();
        } else if ("vitals" == e.category) {
            resetGraph();
            $.heartRateView.setHeight(Ti.UI.SIZE);
            $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
            $.bloodPressureView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.heartRateView.setTop(10);
            $.bodyTemperatureView.setTop(10);
            $.bloodPressureView.setTop(10);
            $.cholestrolView.setTop(10);
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.bloodPressureView.show();
            $.cholestrolView.show();
        } else {
            for (var a = 0; a < $.graphScrollView.children.length; a++) {
                var activityIndicator = createIndicator();
                $.graphScrollView.children[a].children[0].add(activityIndicator);
                activityIndicator.show();
            }
            $.bmiView.setHeight(Ti.UI.SIZE);
            $.heartRateView.setHeight(Ti.UI.SIZE);
            $.bodyTemperatureView.setHeight(Ti.UI.SIZE);
            $.bloodPressureView.setHeight(Ti.UI.SIZE);
            $.cholestrolView.setHeight(Ti.UI.SIZE);
            $.bmiView.setTop(10);
            $.heartRateView.setTop(10);
            $.bodyTemperatureView.setTop(10);
            $.bloodPressureView.setTop(10);
            $.cholestrolView.setTop(10);
            $.bmiView.show();
            $.bloodPressureView.show();
            $.heartRateView.show();
            $.bodyTemperatureView.show();
            $.cholestrolView.show();
        }
    }
    function loadLatest(e) {
        var graph_view = children({
            name: "gType",
            value: e.gType
        }, $.graphScrollView);
        graph_view.children[2].children[1].text = e.text;
    }
    function graphLoaded(e) {
        var graph_view = children({
            name: "gType",
            value: e.id
        }, $.graphScrollView);
        graph_view.children[0].children[0].hide();
    }
    function populateDataById(e) {
        hd.loadInfo(e.id, "", "1");
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
    $.__views.__alloyId267 = Ti.UI.createView({
        id: "__alloyId267"
    });
    $.__views.moreHealth = Ti.UI.createImageView({
        right: "0",
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
    $.__views.__alloyId267.add($.__views.moreHealth);
    $.__views.myhealth.rightNavButton = $.__views.__alloyId267;
    $.__views.__alloyId268 = Ti.UI.createView({
        id: "__alloyId268"
    });
    $.__views.myhealth.add($.__views.__alloyId268);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId268.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId269 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId269"
    });
    $.__views.loadingBar.add($.__views.__alloyId269);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId268.add($.__views.main);
    $.__views.__alloyId270 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId270"
    });
    $.__views.main.add($.__views.__alloyId270);
    $.__views.__alloyId271 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId271"
    });
    $.__views.__alloyId270.add($.__views.__alloyId271);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId271.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
    $.__views.__alloyId270.add($.__views.pageTitle);
    $.__views.__alloyId272 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Health Info",
        textAlign: "center",
        id: "__alloyId272"
    });
    $.__views.pageTitle.add($.__views.__alloyId272);
    $.__views.__alloyId273 = Ti.UI.createView({
        width: "10%",
        id: "__alloyId273"
    });
    $.__views.__alloyId270.add($.__views.__alloyId273);
    $.__views.moreHealth = Ti.UI.createImageView({
        id: "moreHealth",
        width: "30",
        image: "/images/health_love.png"
    });
    $.__views.__alloyId273.add($.__views.moreHealth);
    $.__views.graphScrollView = Ti.UI.createScrollView({
        id: "graphScrollView",
        layout: "vertical",
        height: "auto",
        width: "100%",
        backgroundColor: "#EBEBEB",
        contentWidth: Ti.UI.FILL
    });
    $.__views.main.add($.__views.graphScrollView);
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        gType: "1",
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
    $.__views.__alloyId274 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId274"
    });
    $.__views.bmiView.add($.__views.__alloyId274);
    $.__views.__alloyId275 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId275"
    });
    $.__views.bmiView.add($.__views.__alloyId275);
    $.__views.__alloyId276 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId276"
    });
    $.__views.__alloyId275.add($.__views.__alloyId276);
    $.__views.bmiDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "bmiDetailLabel"
    });
    $.__views.__alloyId275.add($.__views.bmiDetailLabel);
    $.__views.bloodPressureView = Ti.UI.createView({
        id: "bloodPressureView",
        gType: "2",
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
    $.__views.__alloyId277 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId277"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId277);
    $.__views.__alloyId278 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId278"
    });
    $.__views.bloodPressureView.add($.__views.__alloyId278);
    $.__views.__alloyId279 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId279"
    });
    $.__views.__alloyId278.add($.__views.__alloyId279);
    $.__views.bloodPressureDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "bloodPressureDetailLabel"
    });
    $.__views.__alloyId278.add($.__views.bloodPressureDetailLabel);
    $.__views.heartRateView = Ti.UI.createView({
        id: "heartRateView",
        gType: "3",
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
    $.__views.__alloyId280 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId280"
    });
    $.__views.heartRateView.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId281"
    });
    $.__views.heartRateView.add($.__views.__alloyId281);
    $.__views.__alloyId282 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId282"
    });
    $.__views.__alloyId281.add($.__views.__alloyId282);
    $.__views.heartRateDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "heartRateDetailLabel"
    });
    $.__views.__alloyId281.add($.__views.heartRateDetailLabel);
    $.__views.bodyTemperatureView = Ti.UI.createView({
        id: "bodyTemperatureView",
        gType: "4",
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
    $.__views.__alloyId283 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId283"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId283);
    $.__views.__alloyId284 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId284"
    });
    $.__views.bodyTemperatureView.add($.__views.__alloyId284);
    $.__views.__alloyId285 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId285"
    });
    $.__views.__alloyId284.add($.__views.__alloyId285);
    $.__views.bodyTempDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "bodyTempDetailLabel"
    });
    $.__views.__alloyId284.add($.__views.bodyTempDetailLabel);
    $.__views.cholestrolView = Ti.UI.createView({
        id: "cholestrolView",
        gType: "7",
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
    $.__views.graphScrollView.add($.__views.cholestrolView);
    $.__views.cholestrolWebView = Ti.UI.createWebView({
        touchEnabled: false,
        id: "cholestrolWebView",
        height: "200",
        width: "100%",
        url: "/html/cholestrol.html",
        disableBounce: "true"
    });
    $.__views.cholestrolView.add($.__views.cholestrolWebView);
    $.__views.__alloyId286 = Ti.UI.createView({
        height: "1",
        left: "10",
        right: "10",
        bottom: "0",
        backgroundColor: "#dfe0e4",
        width: Ti.UI.FILL,
        id: "__alloyId286"
    });
    $.__views.cholestrolView.add($.__views.__alloyId286);
    $.__views.__alloyId287 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        id: "__alloyId287"
    });
    $.__views.cholestrolView.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Latest",
        color: "#9197a3",
        font: "fontSize: 12",
        left: "0",
        id: "__alloyId288"
    });
    $.__views.__alloyId287.add($.__views.__alloyId288);
    $.__views.cholestrolDetailLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#9197a3",
        font: "fontSize: 12",
        right: "0",
        id: "cholestrolDetailLabel"
    });
    $.__views.__alloyId287.add($.__views.cholestrolDetailLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.category || "";
    var nav = require("navigation");
    var hd = require("healthData");
    common.construct($);
    hd.construct($);
    Ti.App.addEventListener("filterList", filterList);
    Ti.App.addEventListener("loadLatest", loadLatest);
    Ti.App.addEventListener("populateDataById", graphLoaded);
    Ti.App.addEventListener("populateDataById", populateDataById);
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
    $.cholestrolView.addEventListener("click", function() {
        nav.navigateWithArgs("myHealth/healthDataSummary", {
            gType: 7
        });
    });
    $.cholestrolView.addEventListener("load", function(e) {
        var actualHeight = e.source.evalJS("document.height;");
        e.source.height = parseInt(actualHeight);
    });
    $.moreHealth.addEventListener("click", function() {
        var dialog = Ti.UI.createOptionDialog({
            cancel: 3,
            options: [ "Me", "Body Measurement", "Vitals", "Cancel" ],
            title: "More"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            0 == e.index ? nav.navigationWindow("myHealth/profile") : 1 == e.index ? Ti.App.fireEvent("filterList", {
                category: "measurement"
            }) : 2 == e.index && Ti.App.fireEvent("filterList", {
                category: "vitals"
            });
        });
    });
    $.myhealth.addEventListener("close", function() {
        Ti.App.removeEventListener("filterList", filterList);
        Ti.App.removeEventListener("populateDataById", populateDataById);
        Ti.App.removeEventListener("loadLatest", loadLatest);
        Ti.App.removeEventListener("populateDataById", graphLoaded);
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myhealth);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;