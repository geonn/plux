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
    $.__views.__alloyId190 = Ti.UI.createView({
        id: "__alloyId190"
    });
    $.__views.dashboard.add($.__views.__alloyId190);
=======
    $.__views.__alloyId205 = Ti.UI.createView({
        id: "__alloyId205"
    });
    $.__views.dashboard.add($.__views.__alloyId205);
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
    $.__views.__alloyId190.add($.__views.loadingBar);
=======
    $.__views.__alloyId205.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId191 = Ti.UI.createLabel({
=======
    $.__views.__alloyId206 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId191"
    });
    $.__views.loadingBar.add($.__views.__alloyId191);
=======
        id: "__alloyId206"
    });
    $.__views.loadingBar.add($.__views.__alloyId206);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: "0"
    });
<<<<<<< HEAD
    $.__views.__alloyId190.add($.__views.main);
    var __alloyId192 = [];
    var __alloyId195 = {
        title: "Month"
    };
    __alloyId192.push(__alloyId195);
    var __alloyId196 = {
        title: "Year"
    };
    __alloyId192.push(__alloyId196);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId192,
=======
    $.__views.__alloyId205.add($.__views.main);
    var __alloyId207 = [];
    var __alloyId210 = {
        title: "Month"
    };
    __alloyId207.push(__alloyId210);
    var __alloyId211 = {
        title: "Year"
    };
    __alloyId207.push(__alloyId211);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId207,
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
        height: "60%",
        width: "100%",
        backgroundColor: "#EBEBEB"
    });
    $.__views.main.add($.__views.bmiView);
<<<<<<< HEAD
    var __alloyId197 = [];
    $.__views.__alloyId198 = Ti.UI.createTableViewRow({
=======
    var __alloyId212 = [];
    $.__views.__alloyId213 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        backgroundSelectedColor: "#FFE1E1",
        title: "Add Data Point",
        hasChild: "true",
        id: "__alloyId213"
    });
<<<<<<< HEAD
    __alloyId197.push($.__views.__alloyId198);
    addData ? $.__views.__alloyId198.addEventListener("click", addData) : __defers["$.__views.__alloyId198!click!addData"] = true;
    $.__views.__alloyId199 = Ti.UI.createTableViewRow({
=======
    __alloyId212.push($.__views.__alloyId213);
    addData ? $.__views.__alloyId213.addEventListener("click", addData) : __defers["$.__views.__alloyId213!click!addData"] = true;
    $.__views.__alloyId214 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        backgroundSelectedColor: "#FFE1E1",
        title: "Show All Data",
        hasChild: "true",
        id: "__alloyId214"
    });
    __alloyId212.push($.__views.__alloyId214);
    editData ? $.__views.__alloyId214.addEventListener("click", editData) : __defers["$.__views.__alloyId214!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId212,
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
        url: url,
        height: Ti.UI.FILL,
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
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.dashboard);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId198!click!addData"] && $.__views.__alloyId198.addEventListener("click", addData);
    __defers["$.__views.__alloyId199!click!editData"] && $.__views.__alloyId199.addEventListener("click", editData);
=======
    __defers["$.__views.__alloyId213!click!addData"] && $.__views.__alloyId213.addEventListener("click", addData);
    __defers["$.__views.__alloyId214!click!editData"] && $.__views.__alloyId214.addEventListener("click", editData);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;