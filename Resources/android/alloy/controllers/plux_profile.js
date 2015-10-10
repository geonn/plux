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
    this.__controllerPath = "plux_profile";
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
    $.__views.plux_profile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "PLUX Profile",
        id: "plux_profile",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.plux_profile && $.addTopLevelView($.__views.plux_profile);
<<<<<<< HEAD
    $.__views.__alloyId124 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId124"
    });
    $.__views.plux_profile.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createView({
=======
    $.__views.__alloyId98 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId98"
    });
    $.__views.plux_profile.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
=======
        id: "__alloyId99"
    });
    $.__views.__alloyId98.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId100"
    });
    $.__views.__alloyId99.add($.__views.__alloyId100);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId126.add($.__views.btnBack);
=======
    $.__views.__alloyId100.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId125.add($.__views.pageTitle);
    $.__views.__alloyId127 = Ti.UI.createLabel({
=======
    $.__views.__alloyId99.add($.__views.pageTitle);
    $.__views.__alloyId101 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "PLUX Profile",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId127"
    });
    $.__views.pageTitle.add($.__views.__alloyId127);
=======
        id: "__alloyId101"
    });
    $.__views.pageTitle.add($.__views.__alloyId101);
>>>>>>> origin/master
    $.__views.profileData = Ti.UI.createScrollView({
        id: "profileData",
        height: Ti.UI.FILL,
        backgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    $.__views.__alloyId124.add($.__views.profileData);
=======
    $.__views.__alloyId98.add($.__views.profileData);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users_plux");
    var u_id = Ti.App.Properties.getString("u_id");
    var data = usersModel.getUserById(u_id);
    var healthModel = Alloy.createCollection("personalInfo");
    data["personal_health"] = healthModel.getOwnerData();
    $.profileData.add(Alloy.createController("_plux_profile_view", {
        profile_data: data
    }).getView());
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.plux_profile);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;