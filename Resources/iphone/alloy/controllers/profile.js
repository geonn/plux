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
    this.__controllerPath = "profile";
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
        title: "Profile",
        backButtonTitle: "",
        id: "healthProfileWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthProfileWin && $.addTopLevelView($.__views.healthProfileWin);
    var __alloyId205 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId205,
        id: "main"
    });
    $.__views.healthProfileWin.add($.__views.main);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;