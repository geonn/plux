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
    $.__views.__alloyId224 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId224"
    });
    $.__views.main.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId225"
    });
    $.__views.__alloyId224.add($.__views.__alloyId225);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId225.add($.__views.btnBack);
    $.__views.__alloyId226 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId226"
    });
    $.__views.__alloyId224.add($.__views.__alloyId226);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "My Claim History",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId226.add($.__views.pageTitle);
    $.__views.tv = Ti.UI.createTableView({
        id: "tv"
    });
    $.__views.main.add($.__views.tv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var arg_name = "undefined" != typeof args.name ? args.name : "%";
    var title = "%" == arg_name ? "All Claim Records" : arg_name;
    console.log($.pageTitle);
    $.pageTitle.text = title;
    var claimDetailModel = Alloy.createCollection("claim_detail");
    var data = claimDetailModel.getClaimDetail({
        memno: args.memno,
        name: arg_name
    });
    console.log(data);
    data.forEach(function(entry) {
        var row = $.UI.create("TableViewRow");
        var view_container = $.UI.create("View", {
            layout: "vertical",
            height: Ti.UI.SIZE,
            claimType: entry.claimType,
            serial: entry.serial,
            top: 10,
            right: 10,
            left: 10,
            bottom: 10
        });
        var view_detail = $.UI.create("View", {
            height: Ti.UI.SIZE,
            serial: entry.serial,
            claimType: entry.claimType
        });
        var label_clinic = $.UI.create("Label", {
            classes: [ "clinic_name" ],
            text: entry.clinicname,
            claimType: entry.claimType,
            serial: entry.serial
        });
        var label_amount = $.UI.create("Label", {
            classes: [ "amount" ],
            serial: entry.serial,
            claimType: entry.claimType,
            text: "RM " + entry.amount.toFixed(2)
        });
        var label_date = $.UI.create("Label", {
            classes: [ "date" ],
            serial: entry.serial,
            claimType: entry.claimType,
            text: entry.visitdate
        });
        var label_name = $.UI.create("Label", {
            classes: [ "category" ],
            serial: entry.serial,
            claimType: entry.claimType,
            text: "Name: " + entry.name
        });
        var label_category = $.UI.create("Label", {
            classes: [ "category" ],
            serial: entry.serial,
            claimType: entry.claimType,
            text: "Category: " + entry.category
        });
        var label_mc = $.UI.create("Label", {
            classes: [ "mc" ],
            serial: entry.serial,
            claimType: entry.claimType,
            text: "MC Days: " + entry.mcdays
        });
        var label_claimType = $.UI.create("Label", {
            classes: [ "mc" ],
            serial: entry.serial,
            claimType: entry.claimType,
            text: "Claim Type: " + entry.claimType
        });
        var label_status = $.UI.create("Label", {
            classes: [ "mc" ],
            serial: entry.serial,
            claimType: entry.claimType,
            text: "Status: " + entry.status
        });
        view_detail.add(label_clinic);
        view_detail.add(label_amount);
        view_container.add(view_detail);
        view_container.add(label_date);
        view_container.add(label_name);
        view_container.add(label_category);
        view_container.add(label_mc);
        view_container.add(label_claimType);
        view_container.add(label_status);
        row.add(view_container);
        $.tv.appendRow(row);
        view_container.addEventListener("click", function(e) {
            if ("Reimbursement" == e.source.claimType) {
                common.createAlert("Claim Details", "Sorry, the claim details is not available.");
                return false;
            }
            var nav = require("navigation");
            nav.navigateWithArgs("asp/claimDetail", {
                serial: e.source.serial
            });
        });
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.claim_history);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;