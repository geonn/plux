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
    this.__controllerPath = "hra_detail";
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
    $.__views.hraDetailsWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "",
        backButtonTitle: "",
        id: "hraDetailsWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.hraDetailsWin && $.addTopLevelView($.__views.hraDetailsWin);
    $.__views.__alloyId73 = Ti.UI.createScrollView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId73"
    });
    $.__views.hraDetailsWin.add($.__views.__alloyId73);
    $.__views.input_box = Ti.UI.createView({
        id: "input_box",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId73.add($.__views.input_box);
    $.__views.description = Ti.UI.createView({
        id: "description",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId73.add($.__views.description);
    $.__views.picker = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "picker"
    });
    $.__views.hraDetailsWin.add($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var mod = args.mod;
    var module = require("hra/" + mod);
    module.construct($);
    $.hraDetailsWin.title = module.title;
    $.description.add(module.description());
    $.input_box.add(module.input_box());
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        COMMON.closeWindow($.hraDetailsWin);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;