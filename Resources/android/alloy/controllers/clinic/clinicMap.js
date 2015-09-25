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
    this.__controllerPath = "clinic/clinicMap";
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
    $.__views.panelMapWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Panel Map",
        id: "panelMapWin",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.panelMapWin && $.addTopLevelView($.__views.panelMapWin);
    $.__views.__alloyId280 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId280"
    });
    $.__views.panelMapWin.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId281"
    });
    $.__views.__alloyId280.add($.__views.__alloyId281);
    $.__views.__alloyId282 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId282"
    });
    $.__views.__alloyId281.add($.__views.__alloyId282);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId282.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId281.add($.__views.pageTitle);
    $.__views.__alloyId283 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Map",
        textAlign: "center",
        id: "__alloyId283"
    });
    $.__views.pageTitle.add($.__views.__alloyId283);
    $.__views.panelMap = Ti.UI.createScrollView({
        id: "panelMap",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    });
    $.__views.__alloyId280.add($.__views.panelMap);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var maps = args.map_url;
    $.panelMap.add(Ti.UI.createWebView({
        url: maps,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    }));
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.panelMapWin);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;