function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadBarData(e) {
        loadGraph("0" == e.index ? "month" : "year");
    }
    function loadGraph(dataPeriod) {
        hd.loadGraphByType(gType, dataPeriod);
    }
    function addData() {
        hd.navigateGraph(gType);
    }
    function editData() {
        nav.navigateWithArgs("myHealth/healthEditData", {
            gType: gType
        });
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataSummary";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.dashboard = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "Dashboard",
        id: "dashboard",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.dashboard && $.addTopLevelView($.__views.dashboard);
    $.__views.__alloyId775 = Ti.UI.createView({
        id: "__alloyId775"
    });
    $.__views.dashboard.add($.__views.__alloyId775);
    $.__views.main = Ti.UI.createView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: 0
    });
    $.__views.__alloyId775.add($.__views.main);
    $.__views.__alloyId776 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId776"
    });
    $.__views.main.add($.__views.__alloyId776);
    $.__views.__alloyId777 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId777"
    });
    $.__views.__alloyId776.add($.__views.__alloyId777);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId777.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
    $.__views.__alloyId776.add($.__views.pageTitle);
    $.__views.__alloyId778 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "All Recorded Data",
        textAlign: "center",
        id: "__alloyId778"
    });
    $.__views.pageTitle.add($.__views.__alloyId778);
    var __alloyId779 = [];
    var __alloyId782 = {
        font: {
            fontSize: "12dp"
        },
        title: "Month"
    };
    __alloyId779.push(__alloyId782);
    var __alloyId783 = {
        font: {
            fontSize: "12dp"
        },
        title: "Year"
    };
    __alloyId779.push(__alloyId783);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId779,
        id: "buttonbarData",
        backgroundColor: "#CE1D1C",
        index: 0,
        color: "#ffffff",
        borderColor: "#CE1D1C",
        height: 35,
        width: Ti.UI.FILL
    });
    $.__views.main.add($.__views.buttonbarData);
    $.__views.bmiView = Ti.UI.createView({
        id: "bmiView",
        height: Ti.UI.SIZE,
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.main.add($.__views.bmiView);
    var __alloyId784 = [];
    $.__views.addHealthData = Ti.UI.createTableViewRow({
        color: "#606060",
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        id: "addHealthData",
        title: "Add Data Point",
        hasChild: true
    });
    __alloyId784.push($.__views.addHealthData);
    addData ? $.addListener($.__views.addHealthData, "click", addData) : __defers["$.__views.addHealthData!click!addData"] = true;
    $.__views.__alloyId785 = Ti.UI.createTableViewRow({
        color: "#606060",
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        title: "Show All Data",
        hasChild: true,
        id: "__alloyId785"
    });
    __alloyId784.push($.__views.__alloyId785);
    editData ? $.addListener($.__views.__alloyId785, "click", editData) : __defers["$.__views.__alloyId785!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId784,
        id: "healthTableData",
        height: Ti.UI.SIZE,
        width: "100%",
        scrollable: false
    });
    $.__views.main.add($.__views.healthTableData);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var gType = args.gType || 1;
    var hd = require("healthData");
    common.construct($);
    if ("1" == gType) var url = "/html/bmi.html";
    if ("2" == gType) var url = "/html/bloodPressure.html";
    if ("3" == gType) var url = "/html/heartRate.html";
    if ("4" == gType) var url = "/html/bodyTemperature.html";
    if ("5" == gType) var url = "/html/height.html";
    if ("6" == gType) var url = "/html/weight.html";
    if ("7" == gType) var url = "/html/cholestrol.html";
    if ("8" == gType) var url = "/html/glucose.html";
    if ("10" == gType) var url = "/html/steps.html";
    var webview = $.UI.create("WebView", {
        id: "graphWebView",
        width: "100%",
        bottom: 10,
        url: url,
        height: Ti.UI.SIZE,
        backgroundColor: "#EBEBEB"
    });
    var line = $.UI.create("View", {
        height: 1,
        bottom: 0,
        backgroundColor: "#FC7474",
        width: "100%"
    });
    $.bmiView.add(webview);
    $.bmiView.add(line);
    $.buttonbarData.addEventListener("click", loadBarData);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.dashboard);
    });
    __defers["$.__views.addHealthData!click!addData"] && $.addListener($.__views.addHealthData, "click", addData);
    __defers["$.__views.__alloyId785!click!editData"] && $.addListener($.__views.__alloyId785, "click", editData);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;