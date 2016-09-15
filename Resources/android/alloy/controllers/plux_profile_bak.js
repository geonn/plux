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
    this.__controllerPath = "plux_profile_bak";
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
    $.__views.pluxProfileWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "PLUX Profile",
        backButtonTitle: "",
        id: "pluxProfileWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.pluxProfileWin && $.addTopLevelView($.__views.pluxProfileWin);
<<<<<<< HEAD
    $.__views.__alloyId341 = Ti.UI.createView({
=======
    $.__views.__alloyId339 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId341"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId341);
    $.__views.__alloyId342 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId342"
    });
    $.__views.__alloyId341.add($.__views.__alloyId342);
=======
        id: "__alloyId339"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId340"
    });
    $.__views.__alloyId339.add($.__views.__alloyId340);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId342.add($.__views.btnBack);
=======
    $.__views.__alloyId340.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId341.add($.__views.pageTitle);
    $.__views.__alloyId343 = Ti.UI.createLabel({
=======
    $.__views.__alloyId339.add($.__views.pageTitle);
    $.__views.__alloyId341 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "PLUX Profile",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId343"
    });
    $.__views.pageTitle.add($.__views.__alloyId343);
    $.__views.__alloyId344 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId344"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId344);
=======
        id: "__alloyId341"
    });
    $.__views.pageTitle.add($.__views.__alloyId341);
    $.__views.__alloyId342 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId342"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId342);
>>>>>>> origin/master
    $.__views.profileData = Ti.UI.createScrollView({
        id: "profileData",
        height: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId344.add($.__views.profileData);
=======
    $.__views.__alloyId342.add($.__views.profileData);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;