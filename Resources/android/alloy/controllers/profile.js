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
    $.__views.myProfile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        navTintColor: "#CE1D1C",
        title: "My Profile",
        id: "myProfile",
        layout: "vertical"
    });
    $.__views.myProfile && $.addTopLevelView($.__views.myProfile);
<<<<<<< HEAD
    $.__views.__alloyId264 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId264"
    });
    $.__views.myProfile.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createView({
=======
    $.__views.__alloyId252 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId252"
    });
    $.__views.myProfile.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId265"
    });
    $.__views.__alloyId264.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId266"
    });
    $.__views.__alloyId265.add($.__views.__alloyId266);
=======
        id: "__alloyId253"
    });
    $.__views.__alloyId252.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId254"
    });
    $.__views.__alloyId253.add($.__views.__alloyId254);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId266.add($.__views.btnBack);
=======
    $.__views.__alloyId254.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId265.add($.__views.pageTitle);
    $.__views.__alloyId267 = Ti.UI.createLabel({
=======
    $.__views.__alloyId253.add($.__views.pageTitle);
    $.__views.__alloyId255 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "My Profile",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId267"
    });
    $.__views.pageTitle.add($.__views.__alloyId267);
=======
        id: "__alloyId255"
    });
    $.__views.pageTitle.add($.__views.__alloyId255);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId264.add($.__views.description);
=======
    $.__views.__alloyId252.add($.__views.description);
>>>>>>> origin/master
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: 3
    });
<<<<<<< HEAD
    $.__views.__alloyId264.add($.__views.scrollboard);
    $.__views.__alloyId268 = Ti.UI.createView({
        layout: "horizontal",
        width: 293,
        top: 20,
        id: "__alloyId268"
    });
    $.__views.scrollboard.add($.__views.__alloyId268);
    $.__views.__alloyId269 = Ti.UI.createImageView({
=======
    $.__views.__alloyId252.add($.__views.scrollboard);
    $.__views.__alloyId256 = Ti.UI.createView({
        layout: "horizontal",
        width: 293,
        top: 20,
        id: "__alloyId256"
    });
    $.__views.scrollboard.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createImageView({
>>>>>>> origin/master
        top: "30dp",
        borderRadius: 10,
        width: 120,
        left: 15,
        height: 120,
        mod: "plux",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/logo_plux.png",
<<<<<<< HEAD
        id: "__alloyId269"
    });
    $.__views.__alloyId268.add($.__views.__alloyId269);
    navProfile ? $.addListener($.__views.__alloyId269, "click", navProfile) : __defers["$.__views.__alloyId269!click!navProfile"] = true;
    $.__views.__alloyId270 = Ti.UI.createImageView({
=======
        id: "__alloyId257"
    });
    $.__views.__alloyId256.add($.__views.__alloyId257);
    navProfile ? $.addListener($.__views.__alloyId257, "click", navProfile) : __defers["$.__views.__alloyId257!click!navProfile"] = true;
    $.__views.__alloyId258 = Ti.UI.createImageView({
>>>>>>> origin/master
        top: "30dp",
        borderRadius: 10,
        width: 120,
        left: 15,
        height: 120,
        mod: "asp",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId270"
    });
    $.__views.__alloyId268.add($.__views.__alloyId270);
    navProfile ? $.addListener($.__views.__alloyId270, "click", navProfile) : __defers["$.__views.__alloyId270!click!navProfile"] = true;
=======
        id: "__alloyId258"
    });
    $.__views.__alloyId256.add($.__views.__alloyId258);
    navProfile ? $.addListener($.__views.__alloyId258, "click", navProfile) : __defers["$.__views.__alloyId258!click!navProfile"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myProfile);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId269!click!navProfile"] && $.addListener($.__views.__alloyId269, "click", navProfile);
    __defers["$.__views.__alloyId270!click!navProfile"] && $.addListener($.__views.__alloyId270, "click", navProfile);
=======
    __defers["$.__views.__alloyId257!click!navProfile"] && $.addListener($.__views.__alloyId257, "click", navProfile);
    __defers["$.__views.__alloyId258!click!navProfile"] && $.addListener($.__views.__alloyId258, "click", navProfile);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;