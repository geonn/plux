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
    $.__views.tv = Ti.UI.createTableView({
        id: "tv"
    });
    $.__views.main.add($.__views.tv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var arg_name = "undefined" != typeof args.name ? args.name : "%";
    var title = "%" == arg_name ? "All Claim Records" : arg_name;
    $.claim_history.title = title;
    var claimDetailModel = Alloy.createCollection("claim_detail");
    var data = claimDetailModel.getClaimDetail({
        memno: args.memno,
        name: arg_name
    });
    data.forEach(function(entry) {
        console.log(entry);
        var row = $.UI.create("TableViewRow");
        var view_container = $.UI.create("View", {
            layout: "vertical",
            height: Ti.UI.SIZE,
            serial: entry.serial,
            top: 10,
            right: 10,
            left: 10,
            bottom: 10
        });
        var view_detail = $.UI.create("View", {
            height: Ti.UI.SIZE,
            serial: entry.serial
        });
        var label_clinic = $.UI.create("Label", {
            classes: [ "clinic_name" ],
            text: entry.clinicname,
            serial: entry.serial
        });
        var label_amount = $.UI.create("Label", {
            classes: [ "amount" ],
            serial: entry.serial,
            text: "RM " + entry.amount.toFixed(2)
        });
        var label_date = $.UI.create("Label", {
            classes: [ "date" ],
            serial: entry.serial,
            text: entry.visitdate
        });
        var label_name = $.UI.create("Label", {
            classes: [ "category" ],
            serial: entry.serial,
            text: "Name: " + entry.name
        });
        var label_category = $.UI.create("Label", {
            classes: [ "category" ],
            serial: entry.serial,
            text: "Category: " + entry.category
        });
        var label_mc = $.UI.create("Label", {
            classes: [ "mc" ],
            serial: entry.serial,
            text: "MC Days: " + entry.mcdays
        });
        view_detail.add(label_clinic);
        view_detail.add(label_amount);
        view_container.add(view_detail);
        view_container.add(label_date);
        view_container.add(label_name);
        view_container.add(label_category);
        view_container.add(label_mc);
        row.add(view_container);
        $.tv.appendRow(row);
        view_container.addEventListener("click", function(e) {
            var nav = require("navigation");
            nav.navigateWithArgs("asp/claimDetail", {
                serial: e.source.serial
            });
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;