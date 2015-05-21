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
        nav.navigateWithArgs("healthEditData", {
            gType: gType
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "healthDataSummary";
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
    $.__views.healthDataSummary = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Dashboard",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "healthDataSummary"
    });
    $.__views.healthDataSummary && $.addTopLevelView($.__views.healthDataSummary);
    $.__views.__alloyId106 = Ti.UI.createView({
        id: "__alloyId106"
    });
    $.__views.healthDataSummary.add($.__views.__alloyId106);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId106.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId107"
    });
    $.__views.loadingBar.add($.__views.__alloyId107);
    $.__views.main = Ti.UI.createView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: "0"
    });
    $.__views.__alloyId106.add($.__views.main);
    var __alloyId108 = [];
    var __alloyId111 = {
        title: "Month"
    };
    __alloyId108.push(__alloyId111);
    var __alloyId112 = {
        title: "Year"
    };
    __alloyId108.push(__alloyId112);
    $.__views.buttonbarData = Ti.UI.iOS.createTabbedBar({
        labels: __alloyId108,
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
    $.__views.graphWebView = Ti.UI.createWebView({
        id: "graphWebView",
        width: "100%",
        height: Ti.UI.FILL,
        backgroundColor: "#EBEBEB"
    });
    $.__views.bmiView.add($.__views.graphWebView);
    $.__views.__alloyId113 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId113"
    });
    $.__views.bmiView.add($.__views.__alloyId113);
    var __alloyId114 = [];
    $.__views.__alloyId115 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#FFE1E1",
        title: "Add Data Point",
        hasChild: "true",
        id: "__alloyId115"
    });
    __alloyId114.push($.__views.__alloyId115);
    addData ? $.__views.__alloyId115.addEventListener("click", addData) : __defers["$.__views.__alloyId115!click!addData"] = true;
    $.__views.__alloyId116 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#FFE1E1",
        title: "Show All Data",
        hasChild: "true",
        id: "__alloyId116"
    });
    __alloyId114.push($.__views.__alloyId116);
    editData ? $.__views.__alloyId116.addEventListener("click", editData) : __defers["$.__views.__alloyId116!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId114,
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
    common.showLoading();
    "1" == gType && $.graphWebView.setUrl("/html/bmi.html");
    "2" == gType && $.graphWebView.setUrl("/html/bloodPressure.html");
    "3" == gType && $.graphWebView.setUrl("/html/heartRate.html");
    "4" == gType && $.graphWebView.setUrl("/html/bodyTemperature.html");
    "5" == gType && $.graphWebView.setUrl("/html/height.html");
    "6" == gType && $.graphWebView.setUrl("/html/weight.html");
    "10" == gType && $.graphWebView.setUrl("/html/steps.html");
    $.buttonbarData.addEventListener("click", loadBarData);
    setTimeout(function() {
        loadGraph("month");
        common.hideLoading();
    }, 900);
    __defers["$.__views.__alloyId115!click!addData"] && $.__views.__alloyId115.addEventListener("click", addData);
    __defers["$.__views.__alloyId116!click!editData"] && $.__views.__alloyId116.addEventListener("click", editData);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;