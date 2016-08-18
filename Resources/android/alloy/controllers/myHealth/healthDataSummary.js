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
    $.__views.__alloyId719 = Ti.UI.createView({
        id: "__alloyId719"
    });
    $.__views.dashboard.add($.__views.__alloyId719);
=======
    $.__views.__alloyId723 = Ti.UI.createView({
        id: "__alloyId723"
    });
    $.__views.dashboard.add($.__views.__alloyId723);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: 0
    });
<<<<<<< HEAD
    $.__views.__alloyId719.add($.__views.main);
    $.__views.__alloyId720 = Ti.UI.createView({
=======
    $.__views.__alloyId723.add($.__views.main);
    $.__views.__alloyId724 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId720"
    });
    $.__views.main.add($.__views.__alloyId720);
    $.__views.__alloyId721 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId721"
    });
    $.__views.__alloyId720.add($.__views.__alloyId721);
=======
        id: "__alloyId724"
    });
    $.__views.main.add($.__views.__alloyId724);
    $.__views.__alloyId725 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId725"
    });
    $.__views.__alloyId724.add($.__views.__alloyId725);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId721.add($.__views.btnBack);
=======
    $.__views.__alloyId725.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
<<<<<<< HEAD
    $.__views.__alloyId720.add($.__views.pageTitle);
    $.__views.__alloyId722 = Ti.UI.createLabel({
=======
    $.__views.__alloyId724.add($.__views.pageTitle);
    $.__views.__alloyId726 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "All Recorded Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId722"
    });
    $.__views.pageTitle.add($.__views.__alloyId722);
    var __alloyId723 = [];
    var __alloyId726 = {
=======
        id: "__alloyId726"
    });
    $.__views.pageTitle.add($.__views.__alloyId726);
    var __alloyId727 = [];
    var __alloyId730 = {
>>>>>>> origin/master
        font: {
            fontSize: "12dp"
        },
        title: "Month"
    };
<<<<<<< HEAD
    __alloyId723.push(__alloyId726);
    var __alloyId727 = {
=======
    __alloyId727.push(__alloyId730);
    var __alloyId731 = {
>>>>>>> origin/master
        font: {
            fontSize: "12dp"
        },
        title: "Year"
    };
<<<<<<< HEAD
    __alloyId723.push(__alloyId727);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId723,
=======
    __alloyId727.push(__alloyId731);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId727,
>>>>>>> origin/master
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
<<<<<<< HEAD
    var __alloyId728 = [];
=======
    var __alloyId732 = [];
>>>>>>> origin/master
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
<<<<<<< HEAD
    __alloyId728.push($.__views.addHealthData);
    addData ? $.addListener($.__views.addHealthData, "click", addData) : __defers["$.__views.addHealthData!click!addData"] = true;
    $.__views.__alloyId729 = Ti.UI.createTableViewRow({
=======
    __alloyId732.push($.__views.addHealthData);
    addData ? $.addListener($.__views.addHealthData, "click", addData) : __defers["$.__views.addHealthData!click!addData"] = true;
    $.__views.__alloyId733 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        color: "#606060",
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        title: "Show All Data",
        hasChild: true,
<<<<<<< HEAD
        id: "__alloyId729"
    });
    __alloyId728.push($.__views.__alloyId729);
    editData ? $.addListener($.__views.__alloyId729, "click", editData) : __defers["$.__views.__alloyId729!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId728,
=======
        id: "__alloyId733"
    });
    __alloyId732.push($.__views.__alloyId733);
    editData ? $.addListener($.__views.__alloyId733, "click", editData) : __defers["$.__views.__alloyId733!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId732,
>>>>>>> origin/master
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
<<<<<<< HEAD
    __defers["$.__views.__alloyId729!click!editData"] && $.addListener($.__views.__alloyId729, "click", editData);
=======
    __defers["$.__views.__alloyId733!click!editData"] && $.addListener($.__views.__alloyId733, "click", editData);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;