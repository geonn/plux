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
    this.__controllerPath = "hraDetail";
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
        title: "",
        backButtonTitle: "",
        id: "win",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId151 = Ti.UI.createScrollView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId151"
    });
    $.__views.win.add($.__views.__alloyId151);
    $.__views.description = Ti.UI.createView({
        id: "description",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId151.add($.__views.description);
    $.__views.input_box = Ti.UI.createView({
        id: "input_box",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId151.add($.__views.input_box);
    $.__views.picker = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "picker"
    });
    $.__views.win.add($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var mod = args.mod;
    var module = require("hra/" + mod);
    module.construct($);
    $.win.title = module.title;
    $.description.add(module.description());
    $.input_box.add(module.input_box());
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;