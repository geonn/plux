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
    $.__views.__alloyId66 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId66"
    });
    $.__views.myProfileWin.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId67.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId66.add($.__views.pageTitle);
    $.__views.__alloyId68 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Profile",
        textAlign: "center",
        id: "__alloyId68"
    });
    $.__views.pageTitle.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId69"
    });
    $.__views.myProfileWin.add($.__views.__alloyId69);
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
    $.__views.__alloyId69.add($.__views.description);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId69.add($.__views.scrollboard);
    $.__views.__alloyId70 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "20",
        id: "__alloyId70"
    });
    $.__views.scrollboard.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: "10",
        width: "120",
        left: "15",
        height: Ti.UI.SIZE,
        mod: "plux",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/logo_plux.png",
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    navProfile ? $.__views.__alloyId71.addEventListener("click", navProfile) : __defers["$.__views.__alloyId71!click!navProfile"] = true;
    $.__views.__alloyId72 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: "10",
        width: "120",
        left: "15",
        height: Ti.UI.SIZE,
        mod: "asp",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/asp_logo.png",
        id: "__alloyId72"
    });
    $.__views.__alloyId70.add($.__views.__alloyId72);
    navProfile ? $.__views.__alloyId72.addEventListener("click", navProfile) : __defers["$.__views.__alloyId72!click!navProfile"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myProfileWin);
    });
    __defers["$.__views.__alloyId71!click!navProfile"] && $.__views.__alloyId71.addEventListener("click", navProfile);
    __defers["$.__views.__alloyId72!click!navProfile"] && $.__views.__alloyId72.addEventListener("click", navProfile);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;