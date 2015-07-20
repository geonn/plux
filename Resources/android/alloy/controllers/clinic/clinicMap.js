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
    $.__views.__alloyId181 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId181"
    });
    $.__views.panelMapWin.add($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createView({
=======
    $.__views.__alloyId183 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId183"
    });
    $.__views.panelMapWin.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId182"
    });
    $.__views.__alloyId181.add($.__views.__alloyId182);
    $.__views.__alloyId183 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId183"
    });
    $.__views.__alloyId182.add($.__views.__alloyId183);
=======
        id: "__alloyId184"
    });
    $.__views.__alloyId183.add($.__views.__alloyId184);
    $.__views.__alloyId185 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId185"
    });
    $.__views.__alloyId184.add($.__views.__alloyId185);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId183.add($.__views.btnBack);
=======
    $.__views.__alloyId185.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId182.add($.__views.pageTitle);
    $.__views.__alloyId184 = Ti.UI.createLabel({
=======
    $.__views.__alloyId184.add($.__views.pageTitle);
    $.__views.__alloyId186 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Map",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId184"
    });
    $.__views.pageTitle.add($.__views.__alloyId184);
=======
        id: "__alloyId186"
    });
    $.__views.pageTitle.add($.__views.__alloyId186);
>>>>>>> origin/master
    $.__views.panelMap = Ti.UI.createScrollView({
        backgroundColor: "red",
        id: "panelMap",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId181.add($.__views.panelMap);
=======
    $.__views.__alloyId183.add($.__views.panelMap);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var maps = args.map_url;
    console.log(maps);
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