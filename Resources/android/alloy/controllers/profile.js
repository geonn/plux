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
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.myProfile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        navTintColor: "#CE1D1C",
        title: "My Profile",
        id: "myProfile",
        layout: "vertical"
    });
    $.__views.myProfile && $.addTopLevelView($.__views.myProfile);
    $.__views.__alloyId266 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId266"
    });
    $.__views.myProfile.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId267"
    });
    $.__views.__alloyId266.add($.__views.__alloyId267);
    $.__views.__alloyId268 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId268"
    });
    $.__views.__alloyId267.add($.__views.__alloyId268);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId268.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
    $.__views.__alloyId267.add($.__views.pageTitle);
    $.__views.__alloyId269 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "My Profile",
        textAlign: "center",
        id: "__alloyId269"
    });
    $.__views.pageTitle.add($.__views.__alloyId269);
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
    $.__views.__alloyId266.add($.__views.description);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: 3
    });
    $.__views.__alloyId266.add($.__views.scrollboard);
    $.__views.__alloyId270 = Ti.UI.createView({
        layout: "horizontal",
        width: 293,
        top: 20,
        id: "__alloyId270"
    });
    $.__views.scrollboard.add($.__views.__alloyId270);
    $.__views.__alloyId271 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: 10,
        width: 120,
        left: 15,
        height: 120,
        mod: "plux",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/logo_plux.png",
        id: "__alloyId271"
    });
    $.__views.__alloyId270.add($.__views.__alloyId271);
    navProfile ? $.addListener($.__views.__alloyId271, "click", navProfile) : __defers["$.__views.__alloyId271!click!navProfile"] = true;
    $.__views.__alloyId272 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: 10,
        width: 120,
        left: 15,
        height: 120,
        mod: "asp",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/asp_logo.png",
        id: "__alloyId272"
    });
    $.__views.__alloyId270.add($.__views.__alloyId272);
    navProfile ? $.addListener($.__views.__alloyId272, "click", navProfile) : __defers["$.__views.__alloyId272!click!navProfile"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myProfile);
    });
    __defers["$.__views.__alloyId271!click!navProfile"] && $.addListener($.__views.__alloyId271, "click", navProfile);
    __defers["$.__views.__alloyId272!click!navProfile"] && $.addListener($.__views.__alloyId272, "click", navProfile);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;