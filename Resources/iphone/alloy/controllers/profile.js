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
    $.__views.__alloyId86 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId86"
    });
    $.__views.myProfileWin.add($.__views.__alloyId86);
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
    $.__views.__alloyId86.add($.__views.description);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId86.add($.__views.scrollboard);
    $.__views.__alloyId87 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "20",
        id: "__alloyId87"
    });
    $.__views.scrollboard.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: "10",
        width: "120",
        left: "15",
        height: Ti.UI.SIZE,
        mod: "plux",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "appicon-60@2x.png",
        id: "__alloyId88"
    });
    $.__views.__alloyId87.add($.__views.__alloyId88);
    navProfile ? $.__views.__alloyId88.addEventListener("click", navProfile) : __defers["$.__views.__alloyId88!click!navProfile"] = true;
    $.__views.__alloyId89 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: "10",
        width: "120",
        left: "15",
        height: Ti.UI.SIZE,
        mod: "asp",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "asp_logo.png",
        id: "__alloyId89"
    });
    $.__views.__alloyId87.add($.__views.__alloyId89);
    navProfile ? $.__views.__alloyId89.addEventListener("click", navProfile) : __defers["$.__views.__alloyId89!click!navProfile"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId88!click!navProfile"] && $.__views.__alloyId88.addEventListener("click", navProfile);
    __defers["$.__views.__alloyId89!click!navProfile"] && $.__views.__alloyId89.addEventListener("click", navProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;