function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function newRecord() {
        loading.start();
        API.callByPost({
            url: "addUpdateMedicalRecord",
            params: {
                title: "untitled - " + common.now(),
                u_id: u_id
            }
        }, function(responseText) {
            var model = Alloy.createCollection("medicalRecordsV2");
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            model.saveArray(arr);
            loading.finish();
            nav.navigateWithArgs("editMedical", {
                id: arr[0].id
            });
        });
    }
    function render_listing() {
        var model = Alloy.createCollection("medicalRecordsV2");
        var data = model.getData();
        var row_data = [];
        for (var i = 0; i < data.length; i++) {
            var row = $.UI.create("TableViewRow", {
                keyword: data[i].title + " " + data[i].message + " " + data[i].clinic,
                id: data[i].id
            });
            var container = $.UI.create("View", {
                classes: [ "wfill", "hsize", "padding" ]
            });
            var left_info = $.UI.create("View", {
                classes: [ "wfill", "hsize", "vert" ],
                right: 30
            });
            var right_arrow = $.UI.create("ImageView", {
                classes: [ "hsize" ],
                image: "/images/btn-forward.png",
                right: 10,
                width: 15
            });
            var title = $.UI.create("Label", {
                classes: [ "wfill", "hsize", "h4", "themeColor" ],
                textAlign: "left",
                text: data[i].title.replace(/["']/g, "&quot;")
            });
            var message = $.UI.create("Label", {
                classes: [ "wfill", "h5" ],
                height: 20,
                textAlign: "left",
                text: data[i].message.replace(/["']/g, "&quot;")
            });
            var clinic = $.UI.create("Label", {
                classes: [ "wfill", "h5" ],
                height: 20,
                textAlign: "left",
                text: data[i].clinic.replace(/["']/g, "&quot;")
            });
            var updated = $.UI.create("Label", {
                classes: [ "wfill", "hsize", "h5" ],
                textAlign: "left",
                text: timeFormat(data[i].updated)
            });
            left_info.add(title);
            left_info.add(message);
            left_info.add(clinic);
            left_info.add(updated);
            container.add(left_info);
            container.add(right_arrow);
            row.add(container);
            row_data.push(row);
        }
        $.recordTable.data = row_data;
    }
    function refresh() {
        loading.start();
        API.callByPost({
            url: "getMedicalRecords",
            params: {
                u_id: u_id
            }
        }, function(responseText) {
            var model = Alloy.createCollection("medicalRecordsV2");
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            model.saveArray(arr);
            API.callByPost({
                url: "getMedicalAttachment",
                params: {
                    u_id: u_id
                }
            }, function(responseText) {
                var model2 = Alloy.createCollection("medicalAttachmentV2");
                var res2 = JSON.parse(responseText);
                var arr2 = res2.data || null;
                model2.saveArray(arr2);
                render_listing();
                loading.finish();
            });
        });
    }
    function init() {
        $.win.add(loading.getView());
        $.recordTable.search = $.searchItem;
        refresh();
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
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Medical Record",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId198 = Ti.UI.createView({
        id: "__alloyId198"
    });
    $.__views.__alloyId199 = Ti.UI.createImageView({
        left: 10,
        width: 25,
        height: 20,
        image: "/images/add.png",
        id: "__alloyId199"
    });
    $.__views.__alloyId198.add($.__views.__alloyId199);
    newRecord ? $.addListener($.__views.__alloyId199, "click", newRecord) : __defers["$.__views.__alloyId199!click!newRecord"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId198;
    $.__views.__alloyId200 = Ti.UI.createView({
        id: "__alloyId200"
    });
    $.__views.win.add($.__views.__alloyId200);
    $.__views.aView = Ti.UI.createView({
        id: "aView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical"
    });
    $.__views.__alloyId200.add($.__views.aView);
    $.__views.__alloyId201 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId201"
    });
    $.__views.aView.add($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId202"
    });
    $.__views.__alloyId201.add($.__views.__alloyId202);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId202.add($.__views.btnBack);
    $.__views.__alloyId203 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId203"
    });
    $.__views.__alloyId201.add($.__views.__alloyId203);
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
    $.__views.__alloyId203.add($.__views.pageTitle);
    $.__views.__alloyId204 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId204"
    });
    $.__views.__alloyId201.add($.__views.__alloyId204);
    $.__views.newRecord = Ti.UI.createImageView({
        left: 10,
        id: "newRecord",
        width: 25,
        height: 20,
        image: "/images/add.png"
    });
    $.__views.__alloyId204.add($.__views.newRecord);
    newRecord ? $.addListener($.__views.newRecord, "click", newRecord) : __defers["$.__views.newRecord!click!newRecord"] = true;
    $.__views.searchItem = Ti.UI.Android.createSearchView({
        id: "searchItem",
        tintColor: "#CE1D1C",
        backgroundColor: "#ffffff"
    });
    $.__views.recordTable = Ti.UI.createTableView({
        search: $.__views.searchItem,
        filterAtribute: "keyword",
        backgroundRepeat: true,
        backgroundImage: "/images/grey-patern-bg.png",
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
    Alloy.createCollection("medicalAttachment");
    var loading = Alloy.createController("loading");
    var u_id = Ti.App.Properties.getString("u_id");
    $.recordTable.addEventListener("click", function(e) {
        nav.navigateWithArgs("editMedical", {
            id: e.rowData.id
        });
    });
    init();
    $.btnBack.addEventListener("click", function() {
        $.win.close();
    });
    Ti.App.addEventListener("myMedicalRecord:refresh", refresh);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("myMedicalRecord:refresh", refresh);
        $.destroy();
        console.log("window close");
    });
    __defers["$.__views.__alloyId199!click!newRecord"] && $.addListener($.__views.__alloyId199, "click", newRecord);
    __defers["$.__views.newRecord!click!newRecord"] && $.addListener($.__views.newRecord, "click", newRecord);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;