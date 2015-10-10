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
        API.syncAppointmentData(savedAppointment);
        displayAppointmentList();
    }
    function savedAppointment(ex) {
        var result = ex.param;
        if ("error" == result.status) {
            common.createAlert("Error", result.data);
            return false;
        }
        appointmentModel.saveArray(result.data);
        displayAppointmentList();
    }
    function displayAppointmentList() {
        appointmentList = appointmentModel.getAppointmentList({
            u_id: Ti.App.Properties.getString("u_id")
        });
        var data = [];
        $.recordTable.setData(data);
        if (appointmentList.length < 1) {
            common.hideLoading();
            $.recordTable.setData(common.noRecord());
        } else {
            appointmentList.forEach(function(entry) {
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: Ti.UI.SIZE,
                    source: entry.id,
                    backgroundSelectedColor: "#FFE1E1",
                    color: "transparent"
                });
                var statusText = "Pending";
                var statusColor = "#8A6500";
                if ("2" == entry.status) {
                    statusText = "Rejected";
                    statusColor = "#CE1D1C";
                } else if ("3" == entry.status) {
                    statusText = "Accepted";
                    statusColor = "#2C8A00";
                } else if ("4" == entry.status) {
                    statusText = "Suggested Another Date And Time";
                    statusColor = "#005E8A";
                }
                if (entry.date < currentDateTime()) {
                    statusText = "Expired";
                    statusColor = "#CE1D1C";
                }
                var horzView = $.UI.create("View", {
                    classes: [ "horz", "hsize", "wfill" ],
                    source: entry.id,
                    top: 5,
                    bottom: 5
                });
                var statustView = $.UI.create("View", {
                    height: 50,
                    source: entry.id,
                    width: 10,
                    backgroundColor: statusColor
                });
                horzView.add(statustView);
                var contentView = Ti.UI.createView({
                    layout: "vertical",
                    height: Ti.UI.SIZE,
                    source: entry.id,
                    width: Ti.UI.FILL
                });
                panel = panelListModel.getPanelListById(entry.clinic_id);
                var clinicLbl = $.UI.create("Label", {
                    classes: [ "themeColor", "h5", "bold" ],
                    text: panel.clinicName || "",
                    font: {
                        fontSize: 14
                    },
                    source: entry.id,
                    textAlign: "left",
                    left: 15,
                    width: "80%",
                    height: Ti.UI.SIZE
                });
                contentView.add(clinicLbl);
                var appLbl = $.UI.create("Label", {
                    classes: [ "h6" ],
                    text: "Appt. date : " + monthFormat(entry.date),
                    font: {
                        fontSize: 12
                    },
                    source: entry.id,
                    color: "#848484",
                    textAlign: "left",
                    left: 15,
                    width: "85%",
                    height: Ti.UI.SIZE
                });
                contentView.add(appLbl);
                var rightForwardBtn = Titanium.UI.createImageView({
                    image: "/images/btn-forward.png",
                    source: entry.id,
                    width: 15,
                    right: 20
                });
                horzView.add(contentView);
                row.add(horzView);
                row.add(rightForwardBtn);
                row.addEventListener("click", function(e) {
                    viewDetails(e.rowData.source);
                });
                data.push(row);
            });
            $.recordTable.setData(data);
        }
        common.hideLoading();
    }
    function viewDetails(rec_id) {
        nav.navigateWithArgs("appointmentForm", {
            id: rec_id
        });
    }
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
    $.__views.__alloyId14 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId14"
    });
    $.__views.aView.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId15.add($.__views.btnBack);
    $.__views.__alloyId16 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId16"
    });
    $.__views.__alloyId14.add($.__views.__alloyId16);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "My Appointment Records",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId16.add($.__views.pageTitle);
    $.__views.__alloyId17 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId17"
    });
    $.__views.__alloyId14.add($.__views.__alloyId17);
    $.__views.newRecord = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        id: "newRecord",
        title: "Add"
    });
    $.__views.__alloyId17.add($.__views.newRecord);
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
        height: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        separatorColor: "#375540"
    });
    $.__views.recordView.add($.__views.recordTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var appointmentModel = Alloy.createCollection("appointment");
    var panelListModel = Alloy.createCollection("panelList");
    var appointmentList;
    common.construct($);
    common.showLoading();
    init();
    $.newRecord.addEventListener("click", function() {
        nav.navigateWithArgs("appointmentForm", {
            id: ""
        });
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    Ti.App.addEventListener("displayRecords", displayAppointmentList);
    $.win.addEventListener("close", function() {
        $.destroy();
        Ti.App.removeEventListener("displayRecords", displayAppointmentList);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;