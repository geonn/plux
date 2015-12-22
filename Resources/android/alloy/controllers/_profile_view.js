function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addField(title_text, value_text, view) {
        if ("undefined" == typeof value_text || "" == value_text) return;
        var parent = $.UI.create("View", {
            layout: "horizontal",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        var title = $.UI.create("Label", {
            width: "100sp",
            top: 0,
            bottom: "10sp",
            height: Ti.UI.SIZE,
            font: {
                fontSize: "14sp"
            },
            text: title_text,
            color: "#000000",
            textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT
        });
        var value = $.UI.create("Label", {
            width: "auto",
            top: 0,
            bottom: "10sp",
            left: "10sp",
            font: {
                fontSize: "14sp"
            },
            text: value_text,
            color: "#000000",
            height: Ti.UI.SIZE
        });
        parent.add(title);
        parent.add(value);
        view.add(parent);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "_profile_view";
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
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical"
    });
    $.__views.main && $.addTopLevelView($.__views.main);
    $.__views.__alloyId6 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId6"
    });
    $.__views.main.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#CE1D1C",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Personal Information",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.profile_data = Ti.UI.createView({
        id: "profile_data",
        layout: "vertical",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId6.add($.__views.profile_data);
    $.__views.__alloyId9 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#CE1D1C",
        id: "__alloyId9"
    });
    $.__views.__alloyId6.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "My Health Records",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.my_health_records = Ti.UI.createView({
        id: "my_health_records",
        top: "10",
        bottom: "10",
        layout: "vertical",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId6.add($.__views.my_health_records);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var profile = args.profile_data;
    profile.personal_health;
    addField("Corporate Name : ", profile.corpname, $.profile_data);
    addField("Name : ", profile.name, $.profile_data);
    addField("Member No : ", profile.memno, $.profile_data);
    addField("IC : ", profile.icno, $.profile_data);
    addField("Relation : ", profile.relation, $.profile_data);
    addField("Allergies : ", profile.allergy, $.my_health_records);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;