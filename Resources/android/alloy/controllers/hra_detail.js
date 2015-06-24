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
    $.__views.__alloyId40 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId40"
    });
    $.__views.hraDetailsWin.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId41"
    });
    $.__views.__alloyId40.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId42.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId41.add($.__views.pageTitle);
    $.__views.__alloyId43 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Health Info",
        textAlign: "center",
        id: "__alloyId43"
    });
    $.__views.pageTitle.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createScrollView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId44"
    });
    $.__views.__alloyId40.add($.__views.__alloyId44);
    $.__views.input_box = Ti.UI.createView({
        id: "input_box",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId44.add($.__views.input_box);
    $.__views.description = Ti.UI.createView({
        id: "description",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId44.add($.__views.description);
    $.__views.picker = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "picker"
    });
    $.__views.__alloyId40.add($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var mod = args.mod;
    var module = require("hra/" + mod);
    module.construct($);
    $.hraDetailsWin.title = module.title;
    $.description.add(module.description());
    $.input_box.add(module.input_box());
    $.btnBack.addEventListener("click", function() {
        COMMON.closeWindow($.hraDetailsWin);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;