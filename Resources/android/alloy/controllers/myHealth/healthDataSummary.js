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
    $.__views.__alloyId255 = Ti.UI.createView({
        id: "__alloyId255"
    });
    $.__views.dashboard.add($.__views.__alloyId255);
=======
    $.__views.__alloyId265 = Ti.UI.createView({
        id: "__alloyId265"
    });
    $.__views.dashboard.add($.__views.__alloyId265);
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
    $.__views.__alloyId255.add($.__views.loadingBar);
=======
    $.__views.__alloyId265.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId256 = Ti.UI.createLabel({
=======
    $.__views.__alloyId266 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId256"
    });
    $.__views.loadingBar.add($.__views.__alloyId256);
=======
        id: "__alloyId266"
    });
    $.__views.loadingBar.add($.__views.__alloyId266);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: "0"
    });
<<<<<<< HEAD
    $.__views.__alloyId255.add($.__views.main);
    $.__views.__alloyId257 = Ti.UI.createView({
=======
    $.__views.__alloyId265.add($.__views.main);
    $.__views.__alloyId267 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId257"
    });
    $.__views.main.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId258"
    });
    $.__views.__alloyId257.add($.__views.__alloyId258);
=======
        id: "__alloyId267"
    });
    $.__views.main.add($.__views.__alloyId267);
    $.__views.__alloyId268 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId268"
    });
    $.__views.__alloyId267.add($.__views.__alloyId268);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId258.add($.__views.btnBack);
=======
    $.__views.__alloyId268.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
<<<<<<< HEAD
    $.__views.__alloyId257.add($.__views.pageTitle);
    $.__views.__alloyId259 = Ti.UI.createLabel({
=======
    $.__views.__alloyId267.add($.__views.pageTitle);
    $.__views.__alloyId269 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "All Recorded Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId259"
    });
    $.__views.pageTitle.add($.__views.__alloyId259);
    var __alloyId260 = [];
    var __alloyId263 = {
        title: "Month"
    };
    __alloyId260.push(__alloyId263);
    var __alloyId264 = {
        title: "Year"
    };
    __alloyId260.push(__alloyId264);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId260,
=======
        id: "__alloyId269"
    });
    $.__views.pageTitle.add($.__views.__alloyId269);
    var __alloyId270 = [];
    var __alloyId273 = {
        title: "Month"
    };
    __alloyId270.push(__alloyId273);
    var __alloyId274 = {
        title: "Year"
    };
    __alloyId270.push(__alloyId274);
    $.__views.buttonbarData = (require("TabbedBar").createTabbedBar || Ti.UI.iOS.createTabbedBar)({
        labels: __alloyId270,
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
    var __alloyId265 = [];
    $.__views.__alloyId266 = Ti.UI.createTableViewRow({
=======
    var __alloyId275 = [];
    $.__views.__alloyId276 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        title: "Add Data Point",
        hasChild: "true",
<<<<<<< HEAD
        id: "__alloyId266"
    });
    __alloyId265.push($.__views.__alloyId266);
    addData ? $.__views.__alloyId266.addEventListener("click", addData) : __defers["$.__views.__alloyId266!click!addData"] = true;
    $.__views.__alloyId267 = Ti.UI.createTableViewRow({
=======
        id: "__alloyId276"
    });
    __alloyId275.push($.__views.__alloyId276);
    addData ? $.__views.__alloyId276.addEventListener("click", addData) : __defers["$.__views.__alloyId276!click!addData"] = true;
    $.__views.__alloyId277 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundSelectedColor: "#FFE1E1",
        title: "Show All Data",
        hasChild: "true",
<<<<<<< HEAD
        id: "__alloyId267"
    });
    __alloyId265.push($.__views.__alloyId267);
    editData ? $.__views.__alloyId267.addEventListener("click", editData) : __defers["$.__views.__alloyId267!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId265,
=======
        id: "__alloyId277"
    });
    __alloyId275.push($.__views.__alloyId277);
    editData ? $.__views.__alloyId277.addEventListener("click", editData) : __defers["$.__views.__alloyId277!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId275,
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
    __defers["$.__views.__alloyId266!click!addData"] && $.__views.__alloyId266.addEventListener("click", addData);
    __defers["$.__views.__alloyId267!click!editData"] && $.__views.__alloyId267.addEventListener("click", editData);
=======
    __defers["$.__views.__alloyId276!click!addData"] && $.__views.__alloyId276.addEventListener("click", addData);
    __defers["$.__views.__alloyId277!click!editData"] && $.__views.__alloyId277.addEventListener("click", editData);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;