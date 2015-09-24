function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        displayAppointmentList();
    }
    function displayAppointmentList() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointment";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Appointment Records",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId12 = Ti.UI.createView({
        id: "__alloyId12"
    });
    $.__views.newRecord = Ti.UI.createButton({
        id: "newRecord",
        title: "Add"
    });
    $.__views.__alloyId12.add($.__views.newRecord);
    $.__views.win.rightNavButton = $.__views.__alloyId12;
    $.__views.__alloyId13 = Ti.UI.createView({
        id: "__alloyId13"
    });
    $.__views.win.add($.__views.__alloyId13);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId13.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.loading = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "loading",
        top: "5",
        text: "Loading",
        color: "#ffffff"
    });
    $.__views.loadingBar.add($.__views.loading);
    $.__views.aView = Ti.UI.createView({
        id: "aView",
        height: Ti.UI.SIZE,
        top: "0",
        layout: "vertical"
    });
    $.__views.__alloyId13.add($.__views.aView);
    $.__views.searchItem = Ti.UI.createSearchBar({
        tintColor: "#CE1D1C",
        id: "searchItem",
        showCancel: "true",
        text: "",
        top: "0",
        height: "50",
        hintText: "Search appointment data..."
    });
    $.__views.aView.add($.__views.searchItem);
    $.__views.recordView = Ti.UI.createView({
        id: "recordView",
        layout: "vertical",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    });
    $.__views.aView.add($.__views.recordView);
    $.__views.recordTable = Ti.UI.createTableView({
        width: Ti.UI.FILL,
        id: "recordTable",
        top: "0",
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        separatorColor: "#375540"
    });
    $.__views.recordView.add($.__views.recordTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var appointmentModel = Alloy.createCollection("appointment");
    appointmentModel.getAppointmentList({
        u_id: Ti.App.Properties.getString("u_id")
    });
    init();
    $.newRecord.addEventListener("click", function() {
        nav.navigateWithArgs("appointmentForm", {
            isEdit: 0
        });
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;