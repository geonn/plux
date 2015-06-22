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
    this.__controllerPath = "plux_profile";
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
    $.__views.healthProfileWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "PLUX Profile",
        backButtonTitle: "",
        id: "healthProfileWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthProfileWin && $.addTopLevelView($.__views.healthProfileWin);
    $.__views.__alloyId86 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId86"
    });
    $.__views.healthProfileWin.add($.__views.__alloyId86);
    $.__views.profileData = Ti.UI.createScrollView({
        id: "profileData",
        height: "90%"
    });
    $.__views.__alloyId86.add($.__views.profileData);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users_plux");
    var u_id = Ti.App.Properties.getString("u_id");
    var data = usersModel.getUserById(u_id);
    var healthModel = Alloy.createCollection("personalInfo");
    data["personal_health"] = healthModel.getOwnerData();
    $.profileData.add(Alloy.createController("_plux_profile_view", {
        profile_data: data
    }).getView());
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;