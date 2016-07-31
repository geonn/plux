function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/claimHistory";
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
    $.__views.claim_history = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim History",
        id: "claim_history",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.claim_history && $.addTopLevelView($.__views.claim_history);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.claim_history.add($.__views.main);
    $.__views.__alloyId400 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId400"
    });
    $.__views.main.add($.__views.__alloyId400);
    $.__views.__alloyId401 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId401"
    });
    $.__views.__alloyId400.add($.__views.__alloyId401);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId401.add($.__views.btnBack);
    $.__views.__alloyId402 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId402"
    });
    $.__views.__alloyId400.add($.__views.__alloyId402);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "My Claim History",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId402.add($.__views.pageTitle);
    $.__views.tv = Ti.UI.createTableView({
        id: "tv"
    });
    $.__views.main.add($.__views.tv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var arg_name = "undefined" != typeof args.name ? args.name : "%";
    var title = "%" == arg_name ? "All Claim Records" : arg_name;
    var nav = require("navigation");
    $.pageTitle.text = title;
    var claimDetailModel = Alloy.createCollection("claim_detail");
    var data = claimDetailModel.getClaimDetail({
        memno: args.memno,
        name: arg_name
    });
    data.reverse();
    data = _.sortBy(data, "visitdate");
    data.forEach(function(entry) {
        var row = $.UI.create("TableViewRow", {
            height: 130
        });
        var statusColor = "#CE1D1C";
        "Pending" == entry.status ? statusColor = "#8A6500" : "Approved" == entry.status && (statusColor = "#2C8A00");
        var horzView = $.UI.create("View", {
            classes: [ "horz", "hsize", "wfill" ],
            serial: entry.serial,
            appcode: entry.appcode
        });
        var statustView = $.UI.create("View", {
            height: 130,
            serial: entry.serial,
            appcode: entry.appcode,
            width: 10,
            backgroundColor: statusColor
        });
        horzView.add(statustView);
        var view_container = $.UI.create("View", {
            classes: [ "vert", "hsize" ],
            width: "auto",
            claimType: entry.claimType,
            serial: entry.serial,
            appcode: entry.appcode,
            top: 5,
            right: 5,
            left: 5,
            bottom: 5
        });
        var view_detail = $.UI.create("View", {
            height: 40,
            classes: [ "wfill" ],
            serial: entry.serial,
            appcode: entry.appcode,
            claimType: entry.claimType
        });
        var labelClinicView = $.UI.create("View", {
            height: Ti.UI.SIZE,
            serial: entry.serial,
            appcode: entry.appcode,
            height: 45,
            top: 0,
            claimType: entry.claimType
        });
        var label_clinic = $.UI.create("Label", {
            classes: [ "h5", "bold" ],
            text: entry.clinicname,
            claimType: entry.claimType,
            top: 0,
            left: 0,
            width: "70%",
            serial: entry.serial,
            appcode: entry.appcode
        });
        labelClinicView.add(label_clinic);
        var label_amount = $.UI.create("Label", {
            classes: [ "amount", "bold" ],
            serial: entry.serial,
            appcode: entry.appcode,
            claimType: entry.claimType,
            text: "RM " + entry.amount.toFixed(2)
        });
        var view_detail2 = $.UI.create("View", {
            serial: entry.serial,
            appcode: entry.appcode,
            claimType: entry.claimType,
            classes: [ "hsize" ]
        });
        var label_category = $.UI.create("Label", {
            classes: [ "h5", "hsize", "wsize", "left-align" ],
            serial: entry.serial,
            appcode: entry.appcode,
            left: 0,
            claimType: entry.claimType,
            text: "Category: " + entry.category
        });
        var label_date = $.UI.create("Label", {
            serial: entry.serial,
            appcode: entry.appcode,
            claimType: entry.claimType,
            text: timeFormat(entry.visitdate),
            right: 10,
            classes: [ "h5", "hsize", "wsize", "right-align" ]
        });
        var label_name = $.UI.create("Label", {
            classes: [ "h5", "hsize", "wfill", "left-align" ],
            serial: entry.serial,
            appcode: entry.appcode,
            claimType: entry.claimType,
            text: "Claim Under: " + entry.name
        });
        var label_mc = $.UI.create("Label", {
            classes: [ "mc" ],
            serial: entry.serial,
            appcode: entry.appcode,
            claimType: entry.claimType,
            text: "MC Days: " + entry.mcdays
        });
        var claim_type_text = "Reimbursement" == entry.claimType ? entry.claimType : entry.claimType + " [Detail]";
        var label_claimType = $.UI.create("Label", {
            classes: [ "h5", "hsize", "wfill", "left-align" ],
            serial: entry.serial,
            appcode: entry.appcode,
            claimType: entry.claimType,
            text: "Claim Type: " + claim_type_text
        });
        view_detail.add(labelClinicView);
        view_detail.add(label_amount);
        view_detail2.add(label_category);
        view_detail2.add(label_date);
        view_container.add(view_detail);
        view_container.add(view_detail2);
        view_container.add(label_name);
        view_container.add(label_mc);
        view_container.add(label_claimType);
        horzView.add(view_container);
        row.add(horzView);
        $.tv.appendRow(row);
        view_container.addEventListener("click", function(e) {
            if ("Reimbursement" == e.source.claimType) {
                nav.navigateWithArgs("asp/claimSubmission", {
                    serial: e.source.serial,
                    edit: 1
                });
                return false;
            }
            nav.navigateWithArgs("asp/claimDetail", {
                serial: e.source.serial,
                appcode: e.source.appcode
            });
        });
    });
    $.claim_history.addEventListener("close", function() {});
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.claim_history);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;