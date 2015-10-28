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
<<<<<<< HEAD
    $.__views.__alloyId371 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId371"
    });
    $.__views.panelMapWin.add($.__views.__alloyId371);
    $.__views.__alloyId372 = Ti.UI.createView({
=======
    $.__views.__alloyId373 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId373"
    });
    $.__views.panelMapWin.add($.__views.__alloyId373);
    $.__views.__alloyId374 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId372"
    });
    $.__views.__alloyId371.add($.__views.__alloyId372);
    $.__views.__alloyId373 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId373"
    });
    $.__views.__alloyId372.add($.__views.__alloyId373);
=======
        id: "__alloyId374"
    });
    $.__views.__alloyId373.add($.__views.__alloyId374);
    $.__views.__alloyId375 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId375"
    });
    $.__views.__alloyId374.add($.__views.__alloyId375);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId373.add($.__views.btnBack);
=======
    $.__views.__alloyId375.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId372.add($.__views.pageTitle);
    $.__views.__alloyId374 = Ti.UI.createLabel({
=======
    $.__views.__alloyId374.add($.__views.pageTitle);
    $.__views.__alloyId376 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Map",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId374"
    });
    $.__views.pageTitle.add($.__views.__alloyId374);
=======
        id: "__alloyId376"
    });
    $.__views.pageTitle.add($.__views.__alloyId376);
>>>>>>> origin/master
    $.__views.panelMap = Ti.UI.createScrollView({
        id: "panelMap",
        scrollType: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId371.add($.__views.panelMap);
=======
    $.__views.__alloyId373.add($.__views.panelMap);
>>>>>>> origin/master
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