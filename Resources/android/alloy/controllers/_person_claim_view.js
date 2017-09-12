function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function create_field(key, title) {
        var view = $.UI.create("View", {
            classes: [ "small_padding" ],
            height: Titanium.UI.SIZE,
            width: Ti.UI.FILL
        });
        var entidv_label = $.UI.create("Label", {
            text: title,
            height: Titanium.UI.SIZE,
            left: 0
        });
        var entidv_val_label = $.UI.create("Label", {
            text: key,
            right: 0,
            height: Titanium.UI.SIZE,
            color: "#CE1D1C"
        });
        view.add(entidv_label);
        view.add(entidv_val_label);
        return view;
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "_person_claim_view";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.main = Ti.UI.createScrollView({
        borderColor: "#cccccc",
        height: Titanium.UI.SIZE,
        top: "10dp",
        left: "10dp",
        right: "10dp",
        id: "main",
        layout: "vertical"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.__alloyId16 = Ti.UI.createView({
        backgroundColor: "#ddd",
        height: Ti.UI.SIZE,
        id: "__alloyId16"
    });
    $.__views.main.add($.__views.__alloyId16);
    $.__views.name = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: 30,
        color: "#606060",
        font: {
            fontSize: 16
        },
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "name",
        wordWrap: false,
        ellipsize: true
    });
    $.__views.__alloyId16.add($.__views.name);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var data = args.claim_data;
    var name = args.name;
    $.name.text = name;
    for (var a = 0; data.length > a; a++) {
        var benefit_view = $.UI.create("View", {
            classes: [ "padding" ],
            height: Titanium.UI.SIZE,
            bottom: 0
        });
        var benefit_label = $.UI.create("Label", {
            classes: [ "benefit_label" ],
            height: Titanium.UI.SIZE,
            text: data[a]["benefittype"]
        });
        benefit_view.add(benefit_label);
        var line = $.UI.create("View", {
            classes: [ "line" ]
        });
        $.main.add(benefit_view);
        $.main.add(line);
        if (99999 != data[a]["entidv"]) {
            var val = 9999 == data[a]["entidv"] ? "Unlimited" : "RM" + data[a]["entidv"];
            var view = create_field(val, "Personal");
            $.main.add(view);
        }
        if (99999 != data[a]["entidvbal"]) var view = create_field("RM" + data[a]["entidvbal"], "Personal " + data[a]["entTitle"]);
        if (99999 != data[a]["entsha"]) {
            var val = 9999 == data[a]["entsha"] ? "Unlimited" : "RM" + data[a]["entsha"];
            var view = create_field(val, "Shared");
            $.main.add(view);
        }
        if (99999 != data[a]["entshabal"]) var view = create_field("RM" + data[a]["entshabal"], "Shared " + data[a]["entTitle"]);
        if (99999 != data[a]["maxperclaim"]) {
            var val = 9999 == data[a]["maxperclaim"] ? "Unlimited" : "RM" + data[a]["maxperclaim"];
            var view = create_field(val, "Max Per Claim");
            $.main.add(view);
        }
        if (99999 != data[a]["vstidv"]) {
            var val = 9999 == data[a]["vstidv"] ? "Unlimited" : "RM" + data[a]["vstidv"];
            var view = create_field(val, "Visitation");
            $.main.add(view);
        }
        if (99999 != data[a]["vstidvbal"]) var view = create_field(data[a]["vstidvbal"], "Visitation " + data[a]["vstTitle"]);
        if (99999 != data[a]["vstsha"]) {
            var val = 9999 == data[a]["vstsha"] ? "Unlimited" : "RM" + data[a]["vstsha"];
            var view = create_field(val, "Visitation Shared");
            $.main.add(view);
        }
        if (99999 != data[a]["vstshabal"]) var view = create_field(data[a]["vstshabal"], "Visitation Shared " + data[a]["vstTitle"]);
    }
    $.main.addEventListener("click", function(e) {
        var nav = require("navigation");
        nav.navigateWithArgs("asp/claimHistory", {
            name: name
        });
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;