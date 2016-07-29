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
        checkDataSync();
        displayRecords("");
    }
    function checkDataSync() {
        var param = {
            u_id: Ti.App.Properties.getString("u_id")
        };
        API.checkMedicalDataSync({
            param: param
        }, savedRecords);
    }
    function savedRecords(ex) {
        var result = ex.param;
        var info = result.data;
        if (info.length > 0) {
            info.forEach(function(entry) {
                var dataFromApp = medicalRecordsModel.getRecordById(entry.app_id);
                if ("" != dataFromApp) {
                    var arr = {
                        id: entry.app_id,
                        server_id: entry.id,
                        title: entry.title,
                        message: entry.message,
                        clinic: entry.clinic,
                        treatment: entry.treatment,
                        updated: entry.updated
                    };
                    medicalRecordsModel.updateRecord(arr);
                } else {
                    var arr = {
                        id: entry.app_id,
                        server_id: entry.id,
                        title: entry.title,
                        message: entry.message,
                        clinic: entry.clinic,
                        treatment: entry.treatment,
                        created: entry.created,
                        updated: entry.updated
                    };
                    medicalRecordsModel.addRecordFromServer(arr);
                }
                var att = entry.attachment;
                medicalAttachmentModel.removeRecordByRec(entry.app_id);
                medicalAttachmentModel.addFromServer(entry.app_id, att);
            });
            displayRecords("");
        }
        syncToServer();
    }
    function syncToServer() {
        var unsyncList = medicalRecordsModel.getUnsyncList();
        unsyncList.length > 0 && unsyncList.forEach(function(entry) {
            if ("" != entry.title && "" != entry.message) {
                var param = {
                    app_id: entry.id,
                    u_id: Ti.App.Properties.getString("u_id"),
                    clinic: entry.clinic,
                    title: entry.title,
                    message: entry.message,
                    treatment: entry.treatment,
                    created: entry.created,
                    updated: entry.updated
                };
                API.syncMedicalRecords({
                    param: param
                }, updatedRecords);
                var attachments = medicalAttachmentModel.getUnuploadAttachment(entry.id);
                attachments.length > 0 && attachments.forEach(function(att) {
                    att.blob;
                    var param = {
                        app_id: att.id,
                        medical_id: att.medical_id,
                        u_id: Ti.App.Properties.getString("u_id"),
                        caption: att.category,
                        Filedata: Ti.Utils.base64decode(att.blob)
                    };
                    API.syncAttachments({
                        param: param
                    }, savedAttachment);
                });
            }
        });
    }
    function savedAttachment(ex) {
        var result = ex.param;
        medicalAttachmentModel.updateFromServer(result.data);
    }
    function updatedRecords(ex) {
        var result = ex.param;
        var param = {
            server_id: result.data.id,
            id: result.data.app_id
        };
        medicalRecordsModel.updateFromServer(param);
    }
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
                var recTitle = $.UI.create("Label", {
                    classes: [ "themeColor" ],
                    text: title,
                    font: {
                        fontSize: 14
                    },
                    source: entry.id,
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
            $.recordTable.setHeight(Ti.UI.FILL);
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
    $.__views.__alloyId168 = Ti.UI.createView({
        id: "__alloyId168"
    });
    $.__views.newRecord = Ti.UI.createImageView({
        left: 10,
        id: "newRecord",
        width: 25,
        height: 20,
        image: "/images/add.png"
    });
    $.__views.__alloyId168.add($.__views.newRecord);
    $.__views.myMedicalRecord.rightNavButton = $.__views.__alloyId168;
    $.__views.__alloyId169 = Ti.UI.createView({
        id: "__alloyId169"
    });
    $.__views.myMedicalRecord.add($.__views.__alloyId169);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId169.add($.__views.loadingBar);
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
        color: "#ffffff",
        id: "loading",
        top: 5,
        text: "Loading"
    });
    $.__views.loadingBar.add($.__views.loading);
    $.__views.aView = Ti.UI.createView({
        id: "aView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical"
    });
    $.__views.__alloyId169.add($.__views.aView);
    $.__views.__alloyId170 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId170"
    });
    $.__views.aView.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId171"
    });
    $.__views.__alloyId170.add($.__views.__alloyId171);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId171.add($.__views.btnBack);
    $.__views.__alloyId172 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId172"
    });
    $.__views.__alloyId170.add($.__views.__alloyId172);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "My Medical Record",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId172.add($.__views.pageTitle);
    $.__views.__alloyId173 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId173"
    });
    $.__views.__alloyId170.add($.__views.__alloyId173);
    $.__views.newRecord = Ti.UI.createImageView({
        left: 10,
        id: "newRecord",
        width: 25,
        height: 20,
        image: "/images/add.png"
    });
    $.__views.__alloyId173.add($.__views.newRecord);
    $.__views.searchItem = Ti.UI.createSearchBar({
        tintColor: "#CE1D1C",
        id: "searchItem",
        showCancel: true,
        text: "",
        top: 0,
        height: 50,
        hintText: "Search medical data..."
    });
    $.__views.aView.add($.__views.searchItem);
    $.__views.recordTable = Ti.UI.createTableView({
        id: "recordTable",
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        separatorColor: "#375540"
    });
    $.__views.aView.add($.__views.recordTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var medicalRecordsModel = Alloy.createCollection("medicalRecords");
    var medicalAttachmentModel = Alloy.createCollection("medicalAttachment");
    var MRECORDS = require("medicalRecords");
    MRECORDS.construct($);
    common.construct($);
    init();
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
        $.recordTable.opacity = 1;
        $.recordTable.height = "auto";
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
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myMedicalRecord);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;