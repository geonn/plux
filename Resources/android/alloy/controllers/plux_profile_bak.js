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
    $.__views.__alloyId193 = Ti.UI.createView({
=======
    $.__views.__alloyId167 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId193"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId193);
    $.__views.__alloyId194 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId194"
    });
    $.__views.__alloyId193.add($.__views.__alloyId194);
=======
        id: "__alloyId167"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId194.add($.__views.btnBack);
=======
    $.__views.__alloyId168.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId193.add($.__views.pageTitle);
    $.__views.__alloyId195 = Ti.UI.createLabel({
=======
    $.__views.__alloyId167.add($.__views.pageTitle);
    $.__views.__alloyId169 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "PLUX Profile",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId195"
    });
    $.__views.pageTitle.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId196"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId196);
=======
        id: "__alloyId169"
    });
    $.__views.pageTitle.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId170"
    });
    $.__views.pluxProfileWin.add($.__views.__alloyId170);
>>>>>>> origin/master
    $.__views.profileData = Ti.UI.createScrollView({
        id: "profileData",
        height: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId196.add($.__views.profileData);
=======
    $.__views.__alloyId170.add($.__views.profileData);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;