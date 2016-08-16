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
    $.__views.__alloyId323 = Ti.UI.createView({
=======
    $.__views.__alloyId311 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId323"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId324"
    });
    $.__views.__alloyId323.add($.__views.__alloyId324);
=======
        id: "__alloyId311"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId311);
    $.__views.__alloyId312 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId312"
    });
    $.__views.__alloyId311.add($.__views.__alloyId312);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId324.add($.__views.btnBack);
=======
    $.__views.__alloyId312.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId323.add($.__views.pageTitle);
    $.__views.__alloyId325 = Ti.UI.createLabel({
=======
    $.__views.__alloyId311.add($.__views.pageTitle);
    $.__views.__alloyId313 = Ti.UI.createLabel({
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
        id: "__alloyId325"
    });
    $.__views.pageTitle.add($.__views.__alloyId325);
    $.__views.__alloyId326 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId326"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId326);
=======
        id: "__alloyId313"
    });
    $.__views.pageTitle.add($.__views.__alloyId313);
    $.__views.__alloyId314 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId314"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId314);
>>>>>>> origin/master
    $.__views.profileData = Ti.UI.createScrollView({
        id: "profileData",
        height: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId326.add($.__views.profileData);
=======
    $.__views.__alloyId314.add($.__views.profileData);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;