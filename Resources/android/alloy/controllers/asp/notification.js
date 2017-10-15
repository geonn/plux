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
        $.win.add(loading.getView());
        loading.start();
        notificationModel.setAllAsRead({
            u_id: u_id
        });
        displayList();
    }
    function displayList() {
        notificationList = notificationModel.getList({
            u_id: u_id
        });
        var data = [];
        $.recordTable.setData(data);
        if (notificationList.length < 1) loading.finish(); else {
            notificationList.forEach(function(entry) {
                var row = $.UI.create("TableViewRow", {
                    classes: [ "hsize", "wfill" ],
                    record: entry,
                    backgroundSelectedColor: "#FFE1E1"
                });
                var contentView = $.UI.create("View", {
                    classes: [ "vert", "hsize", "wfill", "padding" ],
                    touchEnabled: false
                });
                var label_subject = $.UI.create("Label", {
                    classes: [ "themeColor", "wfill", "h5", "bold", "hsize" ],
                    maxLines: 3,
                    touchEnabled: false,
                    text: entry.subject || ""
                });
                var label_message = $.UI.create("Label", {
                    classes: [ "h6", "wfill", "hsize" ],
                    maxLines: 3,
                    touchEnabled: false,
                    text: entry.content || ""
                });
                var updated = entry.updated;
                updated = updated.replace("  ", " ");
                var label_updated_time = $.UI.create("Label", {
                    classes: [ "themeColor", "wfill", "h6", "hsize" ],
                    touchEnabled: false,
                    text: "Last Updated : " + monthFormat(updated)
                });
                contentView.add(label_subject);
                contentView.add(label_message);
                contentView.add(label_updated_time);
                row.add(contentView);
                row.addEventListener("click", function(e) {
                    var source = e.source.record;
                    console.log(source);
                    nav.navigationWindow(source.target, "", "", source);
                });
                data.push(row);
            });
            $.recordTable.setData(data);
        }
        loading.finish();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/notification";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "My Notification",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId546 = Ti.UI.createView({
        id: "__alloyId546"
    });
    $.__views.win.add($.__views.__alloyId546);
    $.__views.aView = Ti.UI.createView({
        id: "aView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical"
    });
    $.__views.__alloyId546.add($.__views.aView);
    $.__views.__alloyId547 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId547"
    });
    $.__views.aView.add($.__views.__alloyId547);
    $.__views.__alloyId548 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId548"
    });
    $.__views.__alloyId547.add($.__views.__alloyId548);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId548.add($.__views.btnBack);
    $.__views.__alloyId549 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId549"
    });
    $.__views.__alloyId547.add($.__views.__alloyId549);
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
    $.__views.__alloyId549.add($.__views.pageTitle);
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
    $.__views.__alloyId546.add($.__views.bigView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.id || "";
    var notificationModel = Alloy.createCollection("notificationV2");
    require("pdf");
    var notificationList;
    var u_id = Ti.App.Properties.getString("u_id");
    var loading = Alloy.createController("loading");
    init();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    Ti.App.addEventListener("displayRecords", displayList);
    $.win.addEventListener("close", function() {
        $.destroy();
        Ti.App.fireEvent("updateNotification", {
            target: "notification",
            model: "notificationV2"
        });
        Ti.App.removeEventListener("displayRecords", displayList);
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("displayRecords", displayList);
        $.destroy();
        console.log("window close");
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;