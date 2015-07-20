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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataSummary";
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
    var __defers = {};
    $.__views.dashboard = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Dashboard",
        id: "dashboard",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.dashboard && $.addTopLevelView($.__views.dashboard);
<<<<<<< HEAD
    $.__views.__alloyId278 = Ti.UI.createView({
        id: "__alloyId278"
    });
    $.__views.dashboard.add($.__views.__alloyId278);
=======
    $.__views.__alloyId280 = Ti.UI.createView({
        id: "__alloyId280"
    });
    $.__views.dashboard.add($.__views.__alloyId280);
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
    $.__views.__alloyId278.add($.__views.loadingBar);
=======
    $.__views.__alloyId280.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId279 = Ti.UI.createLabel({
=======
    $.__views.__alloyId281 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId279"
    });
    $.__views.loadingBar.add($.__views.__alloyId279);
=======
        id: "__alloyId281"
    });
    $.__views.loadingBar.add($.__views.__alloyId281);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: "0"
    });
<<<<<<< HEAD
    $.__views.__alloyId278.add($.__views.main);
    $.__views.__alloyId280 = Ti.UI.createView({
=======
    $.__views.__alloyId280.add($.__views.main);
    $.__views.__alloyId282 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId280"
    });
    $.__views.main.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId281"
    });
    $.__views.__alloyId280.add($.__views.__alloyId281);
=======
        id: "__alloyId282"
    });
    $.__views.main.add($.__views.__alloyId282);
    $.__views.__alloyId283 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId283"
    });
    $.__views.__alloyId282.add($.__views.__alloyId283);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId281.add($.__views.btnBack);
=======
    $.__views.__alloyId283.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
<<<<<<< HEAD
    $.__views.__alloyId280.add($.__views.pageTitle);
    $.__views.__alloyId282 = Ti.UI.createLabel({
=======
    $.__views.__alloyId282.add($.__views.pageTitle);
    $.__views.__alloyId284 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "All Recorded Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId282"
    });
    $.__views.pageTitle.add($.__views.__alloyId282);
    var __alloyId283 = [];
    var __alloyId286 = {
        title: "Month"
    };
    __alloyId283.push(__alloyId286);
    var __alloyId287 = {
        title: "Year"
    };
    __alloyId283.push(__alloyId287);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId283,
=======
        id: "__alloyId284"
    });
    $.__views.pageTitle.add($.__views.__alloyId284);
    var __alloyId285 = [];
    var __alloyId288 = {
        title: "Month"
    };
    __alloyId285.push(__alloyId288);
    var __alloyId289 = {
        title: "Year"
    };
    __alloyId285.push(__alloyId289);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId285,
>>>>>>> origin/master
        id: "buttonbarData",
        backgroundColor: "#CE1D1C",
        index: "0",
        color: "#ffffff",
        borderColor: "#CE1D1C",
        height: "25",
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
<<<<<<< HEAD
    var __alloyId288 = [];
    $.__views.__alloyId289 = Ti.UI.createTableViewRow({
=======
    var __alloyId290 = [];
    $.__views.__alloyId291 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        title: "Add Data Point",
        hasChild: "true",
<<<<<<< HEAD
        id: "__alloyId289"
    });
    __alloyId288.push($.__views.__alloyId289);
    addData ? $.__views.__alloyId289.addEventListener("click", addData) : __defers["$.__views.__alloyId289!click!addData"] = true;
    $.__views.__alloyId290 = Ti.UI.createTableViewRow({
=======
        id: "__alloyId291"
    });
    __alloyId290.push($.__views.__alloyId291);
    addData ? $.__views.__alloyId291.addEventListener("click", addData) : __defers["$.__views.__alloyId291!click!addData"] = true;
    $.__views.__alloyId292 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        title: "Show All Data",
        hasChild: "true",
<<<<<<< HEAD
        id: "__alloyId290"
    });
    __alloyId288.push($.__views.__alloyId290);
    editData ? $.__views.__alloyId290.addEventListener("click", editData) : __defers["$.__views.__alloyId290!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId288,
=======
        id: "__alloyId292"
    });
    __alloyId290.push($.__views.__alloyId292);
    editData ? $.__views.__alloyId292.addEventListener("click", editData) : __defers["$.__views.__alloyId292!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId290,
>>>>>>> origin/master
        id: "healthTableData",
        height: Ti.UI.SIZE,
        width: "100%",
        scrollable: "false"
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
<<<<<<< HEAD
    __defers["$.__views.__alloyId289!click!addData"] && $.__views.__alloyId289.addEventListener("click", addData);
    __defers["$.__views.__alloyId290!click!editData"] && $.__views.__alloyId290.addEventListener("click", editData);
=======
    __defers["$.__views.__alloyId291!click!addData"] && $.__views.__alloyId291.addEventListener("click", addData);
    __defers["$.__views.__alloyId292!click!editData"] && $.__views.__alloyId292.addEventListener("click", editData);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;