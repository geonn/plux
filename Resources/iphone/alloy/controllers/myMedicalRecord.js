function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function displayRecords(listing) {
        ("" == listing || "displayRecords" == listing.type) && (listing = medicalRecordsModel.getRecordsList());
        var data = [];
        if (listing.length < 1) $.recordTable.setData(common.noRecord()); else {
            listing.forEach(function(entry) {
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: 80,
                    source: entry.id,
                    backgroundSelectedColor: "#FFE1E1",
                    backgroundGradient: {
                        type: "linear",
                        colors: [ "#FEFEFB", "#F7F7F6" ],
                        startPoint: {
                            x: 0,
                            y: 0
                        },
                        endPoint: {
                            x: 0,
                            y: 80
                        },
                        backFillStart: false
                    }
                });
                var tblView = Ti.UI.createView({
                    layout: "horizontal",
                    height: "80",
                    width: "100%"
                });
                var leftView = Ti.UI.createView({
                    layout: "vertical",
                    height: "80",
                    width: "80%"
                });
                var rightView = Ti.UI.createView({
                    layout: "vertical",
                    height: "80",
                    width: "auto"
                });
                var title = entry.title;
                "" != title && (title = title.replace(/["']/g, "&quot;"));
                var clinic = entry.clinic;
                "" != clinic && (clinic = clinic.replace(/["']/g, "&quot;"));
                var message = entry.message;
                "" != message && (message = message.replace(/["']/g, "&quot;"));
                var recTitle = Titanium.UI.createLabel({
                    text: title,
                    font: {
                        fontSize: 16
                    },
                    source: entry.id,
                    color: "#848484",
                    width: "90%",
                    textAlign: "left",
                    top: 5,
                    left: 20,
                    height: Ti.UI.SIZE
                });
                var recClinic = Titanium.UI.createLabel({
                    text: clinic,
                    source: entry.id,
                    font: {
                        fontSize: 12,
                        fontWeight: "bold"
                    },
                    color: "#848484",
                    textAlign: "left",
                    width: "100%",
                    left: 20,
                    height: 15
                });
                var recMsg = Titanium.UI.createLabel({
                    text: message,
                    source: entry.id,
                    font: {
                        fontSize: 12,
                        fontWeight: "bold"
                    },
                    color: "#848484",
                    textAlign: "left",
                    width: "100%",
                    left: 20,
                    height: 15
                });
                var updatedRecord = Titanium.UI.createLabel({
                    text: timeFormat(entry.updated),
                    source: entry.id,
                    font: {
                        fontSize: 12,
                        fontWeight: "bold"
                    },
                    width: "auto",
                    color: "#848484",
                    textAlign: "left",
                    left: 20,
                    height: Ti.UI.SIZE
                });
                var rightForwardBtn = Titanium.UI.createImageView({
                    image: "/images/btn-forward.png",
                    source: entry.id,
                    height: 20,
                    top: 30,
                    right: 20
                });
                row.addEventListener("click", function(e) {
                    viewDetails(e.rowData.source);
                });
                leftView.add(recTitle);
                leftView.add(recClinic);
                leftView.add(recMsg);
                leftView.add(updatedRecord);
                rightView.add(rightForwardBtn);
                tblView.add(leftView);
                tblView.add(rightView);
                row.add(tblView);
                data.push(row);
            });
            $.recordTable.setData(data);
            $.recordTable.setHeight(Ti.UI.SIZE);
        }
        common.hideLoading();
    }
    function viewDetails(rec_id) {
        nav.navigateWithArgs("editMedical", {
            id: rec_id
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myMedicalRecord";
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
    $.__views.myMedicalRecord = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Medical Record",
        id: "myMedicalRecord",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.myMedicalRecord && $.addTopLevelView($.__views.myMedicalRecord);
    $.__views.__alloyId85 = Ti.UI.createView({
        id: "__alloyId85"
    });
    $.__views.newRecord = Ti.UI.createButton({
        id: "newRecord",
        title: "Add"
    });
    $.__views.__alloyId85.add($.__views.newRecord);
    $.__views.myMedicalRecord.rightNavButton = $.__views.__alloyId85;
    $.__views.__alloyId86 = Ti.UI.createView({
        id: "__alloyId86"
    });
    $.__views.myMedicalRecord.add($.__views.__alloyId86);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId86.add($.__views.loadingBar);
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
    $.__views.__alloyId86.add($.__views.aView);
    $.__views.searchItem = Ti.UI.createSearchBar({
        tintColor: "#CE1D1C",
        id: "searchItem",
        showCancel: "true",
        text: "",
        top: "0",
        height: "50",
        hintText: "Search medical data..."
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
    var medicalRecordsModel = Alloy.createCollection("medicalRecords");
    var MRECORDS = require("medicalRecords");
    MRECORDS.construct($);
    common.construct($);
    displayRecords("");
    Ti.App.addEventListener("displayRecords", displayRecords);
    $.newRecord.addEventListener("click", function() {
        medicalRecordsModel.addRecord({
            title: "",
            message: "",
            message: "",
            created: currentDateTime(),
            updated: currentDateTime()
        });
        var lastRec = medicalRecordsModel.getLastId();
        nav.navigateWithArgs("editMedical", {
            id: lastRec.id
        });
    });
    $.searchItem.addEventListener("focus", function() {
        $.searchItem.showCancel = true;
        $.recordView.opacity = 1;
        $.recordView.height = "auto";
    });
    $.searchItem.addEventListener("blur", function() {
        $.searchItem.showCancel = false;
    });
    $.searchItem.addEventListener("cancel", function() {
        $.searchItem.blur();
        var str = $.searchItem.getValue();
        if ("" == str) {
            $.recordTable.data = [];
            displayRecords("");
        }
    });
    var searchResult = function() {
        common.showLoading();
        $.searchItem.blur();
        var str = $.searchItem.getValue();
        var searchResult = medicalRecordsModel.searchRecord(str);
        $.recordTable.data = [];
        displayRecords(searchResult);
    };
    $.searchItem.addEventListener("return", searchResult);
    $.aView.addEventListener("touchend", function() {
        $.searchItem.blur();
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        console.log("close!!");
        nav.closeWindow($.myMedicalRecord);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;