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
    this.__controllerPath = "m_ClaimHistory";
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
    $.__views.m_ClaimHistory = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim History",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_ClaimHistory"
    });
    $.__views.m_ClaimHistory && $.addTopLevelView($.__views.m_ClaimHistory);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.m_ClaimHistory.add($.__views.main);
    $.__views.tv = Ti.UI.createTableView({
        id: "tv"
    });
    $.__views.main.add($.__views.tv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var arg_category = "undefined" != typeof args.category ? args.category : "%";
    var usersModel = Alloy.createCollection("claim_detail");
    var data = usersModel.getClaimDetail({
        memno: args.memno,
        category: arg_category
    });
    data.forEach(function(entry) {
        var row = $.UI.create("TableViewRow");
        var view_container = $.UI.create("View", {
            layout: "vertical",
            height: Ti.UI.SIZE,
            top: 10,
            right: 10,
            left: 10,
            bottom: 10
        });
        var view_detail = $.UI.create("View", {
            height: Ti.UI.SIZE
        });
        var label_clinic = $.UI.create("Label", {
            classes: [ "clinic_name" ],
            text: entry.clinicname
        });
        var label_amount = $.UI.create("Label", {
            classes: [ "amount" ],
            text: "RM " + entry.amount.toFixed(2)
        });
        var label_date = $.UI.create("Label", {
            classes: [ "date" ],
            text: entry.visitdate
        });
        var label_name = $.UI.create("Label", {
            classes: [ "category" ],
            text: "Name: " + entry.name
        });
        var label_category = $.UI.create("Label", {
            classes: [ "category" ],
            text: "Category: " + entry.category
        });
        var label_mc = $.UI.create("Label", {
            classes: [ "mc" ],
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
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;