function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadGraph() {
        hd.loadGraphByType(gType);
    }
    function addData() {
        "1" == gType && nav.navigationWindow("healthDataBmi");
        "2" == gType && nav.navigationWindow("healthDataBloodPressure");
        "3" == gType && nav.navigationWindow("healthDataHeartRate");
        "4" == gType && nav.navigationWindow("healthDataBodyTemperature");
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
    $.__views.__alloyId74 = Ti.UI.createView({
        id: "__alloyId74"
    });
    $.__views.healthDataSummary.add($.__views.__alloyId74);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId74.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId75"
    });
    $.__views.loadingBar.add($.__views.__alloyId75);
    $.__views.main = Ti.UI.createView({
        id: "main",
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        top: "0"
    });
    $.__views.__alloyId74.add($.__views.main);
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
    $.__views.__alloyId76 = Ti.UI.createView({
        height: "1",
        bottom: "0",
        backgroundColor: "#FC7474",
        width: "100%",
        id: "__alloyId76"
    });
    $.__views.bmiView.add($.__views.__alloyId76);
    var __alloyId77 = [];
    $.__views.__alloyId78 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#FFE1E1",
        title: "Add Data Point",
        hasChild: "true",
        id: "__alloyId78"
    });
    __alloyId77.push($.__views.__alloyId78);
    addData ? $.__views.__alloyId78.addEventListener("click", addData) : __defers["$.__views.__alloyId78!click!addData"] = true;
    $.__views.__alloyId79 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#FFE1E1",
        title: "Show All Data",
        hasChild: "true",
        id: "__alloyId79"
    });
    __alloyId77.push($.__views.__alloyId79);
    editData ? $.__views.__alloyId79.addEventListener("click", editData) : __defers["$.__views.__alloyId79!click!editData"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId77,
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
    setTimeout(function() {
        loadGraph();
        common.hideLoading();
    }, 900);
    __defers["$.__views.__alloyId78!click!addData"] && $.__views.__alloyId78.addEventListener("click", addData);
    __defers["$.__views.__alloyId79!click!editData"] && $.__views.__alloyId79.addEventListener("click", editData);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;