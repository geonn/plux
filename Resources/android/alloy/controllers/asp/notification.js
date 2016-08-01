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
        notificationModel.setAllAsRead({
            member_no: Ti.App.Properties.getString("memno")
        });
        displayList();
        syncFromServer();
    }
    function syncFromServer() {
        var checker = Alloy.createCollection("updateChecker");
        var isUpdate = checker.getCheckerById("2");
        var last_updated = "";
        "" != isUpdate && (last_updated = isUpdate.updated);
        var param = {
            member_no: Ti.App.Properties.getString("memno"),
            last_updated: last_updated
        };
        API.callByPost({
            url: "getNotificationUrl",
            params: param
        }, function(responseText) {
            var res = JSON.parse(responseText);
            if ("success" == res.status) {
                var record = res.data;
                if (record.length > 0) {
                    record.forEach(function(entry) {
                        var param = {
                            id: entry.id || "",
                            member_no: entry.member_no || "",
                            subject: entry.subject || "",
                            message: entry.message || "",
                            status: entry.status || 1,
                            url: entry.url || "",
                            isRead: "0",
                            status: entry.status || "",
                            expired: entry.expired || "",
                            created: entry.created,
                            updated: entry.updated
                        };
                        notificationModel.addData(param);
                    });
                    checker.updateModule("2", "notificationList", res.last_updated);
                    displayList();
                }
            }
        });
    }
    function displayList() {
        notificationList = notificationModel.getList({
            member_no: Ti.App.Properties.getString("memno")
        });
        var data = [];
        $.recordTable.setData(data);
        if (notificationList.length < 1) {
            common.hideLoading();
            $.recordTable.setData(common.noRecord());
        } else {
            notificationList.forEach(function(entry) {
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: Ti.UI.SIZE,
                    source: entry.id,
                    title: entry.subject,
                    url: entry.url,
                    backgroundSelectedColor: "#FFE1E1",
                    color: "transparent"
                });
                var contentView = $.UI.create("View", {
                    classes: [ "vert", "hsize", "wfill" ],
                    source: entry.id,
                    url: entry.url,
                    title: entry.subject,
                    top: 10,
                    bottom: 10
                });
                var clinicLbl = $.UI.create("Label", {
                    classes: [ "themeColor", "h5", "bold" ],
                    text: entry.subject || "",
                    font: {
                        fontSize: 14
                    },
                    source: entry.id,
                    title: entry.subject,
                    url: entry.url,
                    textAlign: "left",
                    left: 15,
                    width: "80%",
                    height: Ti.UI.SIZE
                });
                contentView.add(clinicLbl);
                var msgLbl = $.UI.create("Label", {
                    classes: [ "h6", "hsize" ],
                    text: entry.message,
                    source: entry.id,
                    url: entry.url,
                    title: entry.subject,
                    textAlign: "left",
                    left: 15,
                    width: "85%"
                });
                contentView.add(msgLbl);
                var updated = entry.updated;
                updated = updated.replace("  ", " ");
                var appLbl = $.UI.create("Label", {
                    classes: [ "h6" ],
                    text: "Last Updated : " + monthFormat(updated),
                    source: entry.id,
                    url: entry.url,
                    title: entry.subject,
                    textAlign: "left",
                    left: 15,
                    width: "85%",
                    height: Ti.UI.SIZE
                });
                contentView.add(appLbl);
                Titanium.UI.createImageView({
                    image: "/images/btn-forward.png",
                    source: entry.id,
                    title: entry.subject,
                    url: entry.url,
                    width: 15,
                    right: 20
                });
                row.add(contentView);
                "" != entry.url && row.addEventListener("click", function(e) {
                    viewDetails(e.rowData);
                });
                data.push(row);
            });
            $.recordTable.setData(data);
        }
        common.hideLoading();
    }
    function viewDetails(msg) {
        downloadBrochure(msg);
    }
    function downloadBrochure(content) {
        var indView = Ti.UI.createView({
            height: 100,
            layout: "vertical",
            backgroundColor: "#ffffff",
            bottom: 5,
            width: Ti.UI.SIZE
        });
        if ("1" == isDownloading) {
            var label = Ti.UI.createLabel({
                color: "#CE1D1C",
                font: {
                    fontSize: 10,
                    fontWeight: "bold"
                },
                text: "Please wait until current downloading is done.",
                bottom: 10,
                width: "100%",
                height: 10,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            if ("0" == isDownloadLbl) {
                $.bigView.add(label);
                setTimeout(function() {
                    isDownloadLbl = "0";
                    $.bigView.remove(label);
                }, 3e3);
            }
            isDownloadLbl = "1";
            return false;
        }
        isDownloading = "1";
        var ind = Titanium.UI.createProgressBar({
            width: "90%",
            height: 50,
            min: 0,
            max: 1,
            value: 0,
            top: 5,
            message: "Downloading " + content.title + "...",
            font: {
                fontSize: 12
            },
            color: "#CE1D1C"
        });
        var label = Ti.UI.createLabel({
            color: "#CE1D1C",
            font: {
                fontSize: 14,
                fontWeight: "bold"
            },
            text: "0%",
            top: 0,
            width: "100%",
            height: 30,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        if ("1" == content.isDownloaded) {
            indView.remove(ind);
            indView.remove(label);
            $.bigView.setVisible(false);
        } else {
            ind.show();
            indView.add(ind);
            indView.add(label);
            $.bigView.add(indView);
            $.bigView.setVisible(true);
        }
        PDF.createPdf(content.url, true, ind, label, indView, function(err, file) {
            if (err) alert(err); else {
                isDownloading = "0";
                indView.hide();
                $.bigView.remove(indView);
                console.log("file return : " + file.getNativePath());
                PDF.android_launch(file);
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/notification";
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
        title: "My Notification",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId503 = Ti.UI.createView({
        id: "__alloyId503"
    });
    $.__views.win.add($.__views.__alloyId503);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId503.add($.__views.loadingBar);
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
    $.__views.__alloyId503.add($.__views.aView);
    $.__views.__alloyId504 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId504"
    });
    $.__views.aView.add($.__views.__alloyId504);
    $.__views.__alloyId505 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId505"
    });
    $.__views.__alloyId504.add($.__views.__alloyId505);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId505.add($.__views.btnBack);
    $.__views.__alloyId506 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId506"
    });
    $.__views.__alloyId504.add($.__views.__alloyId506);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "My Notification",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId506.add($.__views.pageTitle);
    $.__views.recordTable = Ti.UI.createTableView({
        width: "100%",
        height: Ti.UI.FILL,
        id: "recordTable",
        top: 0,
        separatorColor: "#375540"
    });
    $.__views.aView.add($.__views.recordTable);
    $.__views.bigView = Ti.UI.createScrollView({
        id: "bigView",
        zIndex: 99,
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        opacity: .8,
        bottom: 0,
        width: "80%",
        visible: false
    });
    $.__views.__alloyId503.add($.__views.bigView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.id || "";
    var notificationModel = Alloy.createCollection("notification");
    var PDF = require("pdf");
    var notificationList;
    common.construct($);
    common.showLoading();
    init();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    Ti.App.addEventListener("displayRecords", displayList);
    $.win.addEventListener("close", function() {
        $.destroy();
        Ti.App.fireEvent("updateNotification");
        Ti.App.removeEventListener("displayRecords", displayList);
    });
    var isDownloading = "0";
    var isDownloadLbl = "0";
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("displayRecords", displayList);
        $.destroy();
        console.log("window close");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;