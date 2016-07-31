function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function render_listing() {
        var model = Alloy.createCollection("medicalRecordsV2");
        var data = model.getData();
        var row_data = [];
        for (var i = 0; i < data.length; i++) {
            var row = $.UI.create("TableViewRow", {
                title: data[i].title + " " + data[i].message + " " + data[i].clinic,
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
                text: data[i].updated
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
            console.log(arr);
            model.saveArray(arr);
            setTimeout(render_listing, 1e3);
            loading.finish();
        });
    }
    function init() {
        $.win.add(loading.getView());
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Medical Record",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
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
    $.__views.win.rightNavButton = $.__views.__alloyId168;
    $.__views.__alloyId169 = Ti.UI.createView({
        id: "__alloyId169"
    });
    $.__views.win.add($.__views.__alloyId169);
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
    $.__views.__alloyId174 = Ti.UI.Android.createSearchView({
        tintColor: "#CE1D1C",
        backgroundColor: "#ffffff",
        id: "__alloyId174"
    });
    $.__views.recordTable = Ti.UI.createTableView({
        search: $.__views.__alloyId174,
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;