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
    this.__controllerPath = "_plux_profile_view";
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
    $.__views.__alloyId16 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId16"
    });
    $.__views.main.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#CE1D1C",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Personal Information",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.profile_data = Ti.UI.createView({
        id: "profile_data",
        layout: "vertical",
        top: 10,
        bottom: 10,
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId16.add($.__views.profile_data);
    $.__views.__alloyId19 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        backgroundColor: "#CE1D1C",
        id: "__alloyId19"
    });
    $.__views.__alloyId16.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "My Health",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.my_health = Ti.UI.createView({
        id: "my_health",
        top: 10,
        bottom: 10,
        layout: "vertical",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId16.add($.__views.my_health);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var profile = args.profile_data;
    var personal_health = profile.personal_health;
    addField("Full Name : ", profile.fullname, $.profile_data);
    addField("Email : ", profile.email, $.profile_data);
    addField("Last Login : ", timeFormat(profile.last_login), $.profile_data);
    if ("undefined" != typeof profile.personal_health) {
        var dob = personal_health["birthDate"] || "Not Set";
        "Not Set" != dob && (personal_health["birthDate"] = timeFormat(personal_health["birthDate"]));
        addField("Birthday : ", personal_health["birthDate"], $.my_health);
        addField("BloodType : ", personal_health["bloodType"], $.my_health);
        addField("Gender : ", personal_health["gender"], $.my_health);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;