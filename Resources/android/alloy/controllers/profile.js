function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function navProfile(e) {
        var target = e.source.mod;
        "asp" == target ? nav.navigationWindow(target + "/profile", 1) : nav.navigateWithArgs("plux_profile", {});
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
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
    var __defers = {};
    $.__views.myProfileWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        navTintColor: "#CE1D1C",
        id: "myProfileWin",
        title: "My Profile",
        layout: "vertical"
    });
    $.__views.myProfileWin && $.addTopLevelView($.__views.myProfileWin);
    $.__views.__alloyId54 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId54"
    });
    $.__views.myProfileWin.add($.__views.__alloyId54);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId54.add($.__views.pageTitle);
    $.__views.__alloyId55 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Profile",
        textAlign: "center",
        id: "__alloyId55"
    });
    $.__views.pageTitle.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId56"
    });
    $.__views.myProfileWin.add($.__views.__alloyId56);
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        color: "#6E6E6E",
        top: "10dp",
        textAlign: "center",
        font: {
            fontSize: "14dp"
        },
        id: "description",
        text: "Please choose profile of the below services"
    });
    $.__views.__alloyId56.add($.__views.description);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId56.add($.__views.scrollboard);
    $.__views.__alloyId57 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "20",
        id: "__alloyId57"
    });
    $.__views.scrollboard.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: "10",
        width: "120",
        left: "15",
        height: Ti.UI.SIZE,
        mod: "plux",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/logo_plux.png",
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    navProfile ? $.__views.__alloyId58.addEventListener("click", navProfile) : __defers["$.__views.__alloyId58!click!navProfile"] = true;
    $.__views.__alloyId59 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: "10",
        width: "120",
        left: "15",
        height: Ti.UI.SIZE,
        mod: "asp",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/asp_logo.png",
        id: "__alloyId59"
    });
    $.__views.__alloyId57.add($.__views.__alloyId59);
    navProfile ? $.__views.__alloyId59.addEventListener("click", navProfile) : __defers["$.__views.__alloyId59!click!navProfile"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId58!click!navProfile"] && $.__views.__alloyId58.addEventListener("click", navProfile);
    __defers["$.__views.__alloyId59!click!navProfile"] && $.__views.__alloyId59.addEventListener("click", navProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;