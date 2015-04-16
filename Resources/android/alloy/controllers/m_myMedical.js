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
                    height: 70,
                    source: entry.id,
                    selectedBackgroundColor: "#FFE1E1",
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
                    height: "70",
                    width: "100%"
                });
                var leftView = Ti.UI.createView({
                    layout: "vertical",
                    height: "70",
                    width: "80%"
                });
                var rightView = Ti.UI.createView({
                    layout: "vertical",
                    height: "70",
                    width: "auto"
                });
                var title = entry.title;
                "" != title && (title = title.replace(/["']/g, "&quot;"));
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
    this.__controllerPath = "m_myMedical";
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;