function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function displayRecords() {
        var listing = medicalRecordsModel.getRecordsList();
        var data = [];
        if (listing.length < 1) $.recordTable.setData(common.noRecord()); else {
            listing.forEach(function(entry) {
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: 70,
                    source: entry.id,
                    selectedBackgroundColor: "#ECFFF9",
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
                title = title.replace(/&quot;/g, "'");
                var message = entry.message;
                message = message.replace(/&quot;/g, "'");
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
        }
    }
    function viewDetails(rec_id) {
        var res_rec = medicalRecordsModel.getRecordById(rec_id);
        console.log(res_rec);
        var title = res_rec.title;
        title = title.replace(/&quot;/g, "'");
        res_rec.message;
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
    $.__views.m_myMedical = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "MY Medical Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myMedical"
    });
    $.__views.m_myMedical && $.addTopLevelView($.__views.m_myMedical);
    $.__views.__alloyId296 = Ti.UI.createView({
        id: "__alloyId296"
    });
    $.__views.newRecord = Ti.UI.createButton({
        id: "newRecord",
        title: "Add"
    });
    $.__views.__alloyId296.add($.__views.newRecord);
    $.__views.m_myMedical.rightNavButton = $.__views.__alloyId296;
    $.__views.aView = Ti.UI.createView({
        id: "aView",
        layout: "vertical"
    });
    $.__views.m_myMedical.add($.__views.aView);
    $.__views.searchItem = Ti.UI.createSearchBar({
        tintColor: "#CE1D1C",
        id: "searchItem",
        text: "",
        top: "0",
        height: "50",
        hintText: "Search medical data..."
    });
    $.__views.aView.add($.__views.searchItem);
    $.__views.recordView = Ti.UI.createScrollView({
        id: "recordView",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%"
    });
    $.__views.aView.add($.__views.recordView);
    $.__views.recordTable = Ti.UI.createTableView({
        width: "100%",
        id: "recordTable",
        height: Ti.UI.SIZE,
        top: "0",
        separatorColor: "#375540"
    });
    $.__views.recordView.add($.__views.recordTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    common.construct($);
    var medicalRecordsModel = Alloy.createCollection("medicalRecords");
    displayRecords();
    Ti.App.addEventListener("displayRecords", displayRecords);
    $.newRecord.addEventListener("click", function() {
        nav.navigationWindow("newMedical");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;