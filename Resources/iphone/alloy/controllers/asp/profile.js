function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadPage() {
        var userInfo = usersModel.getOwnerData();
        if ("true" == userInfo.isver) {
            $.verifyContainer.hide();
            $.profileContainer.show();
        } else {
            $.description.text = "You need to verify your account in order to view claim details. If you didn't received verification email, please click 'Resend Verification' button below.";
            $.verifyContainer.show();
            $.profileContainer.hide();
        }
        Ti.App.removeEventListener("loadPage", loadPage);
    }
    function checkStatus() {
        var asp_email = Ti.App.Properties.getString("asp_email");
        var asp_password = Ti.App.Properties.getString("asp_password");
        if (asp_email) {
            Ti.App.addEventListener("loadPage", loadPage);
            common.showLoading();
            API.doLogin(asp_email, asp_password, $, "refresh");
        }
    }
    function changePassword() {
        var nav = require("navigation");
        nav.navigationWindow("asp/changePassword", 0);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/profile";
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
    $.__views.asp_profile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "ASP Profile",
        backButtonTitle: "",
        id: "asp_profile",
        navTintColor: "#CE1D1C"
    });
    $.__views.asp_profile && $.addTopLevelView($.__views.asp_profile);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "0",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.asp_profile.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId127 = Ti.UI.createLabel({
=======
    $.__views.__alloyId119 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId127"
    });
    $.__views.loadingBar.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId128"
    });
    $.__views.asp_profile.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
=======
        id: "__alloyId119"
    });
    $.__views.loadingBar.add($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId120"
    });
    $.__views.asp_profile.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
>>>>>>> origin/master
    $.__views.profileContainer = Ti.UI.createView({
        layout: "vertical",
        id: "profileContainer",
        visible: "false"
    });
<<<<<<< HEAD
    $.__views.__alloyId129.add($.__views.profileContainer);
    var __alloyId130 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId130,
=======
    $.__views.__alloyId121.add($.__views.profileContainer);
    var __alloyId122 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId122,
>>>>>>> origin/master
        id: "main",
        height: "80%",
        backgroundColor: "#ffffff"
    });
    $.__views.profileContainer.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId131 = Ti.UI.createButton({
=======
    $.__views.__alloyId123 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Change Password",
        width: "70%",
        top: "5",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId131"
    });
    $.__views.profileContainer.add($.__views.__alloyId131);
    changePassword ? $.__views.__alloyId131.addEventListener("touchend", changePassword) : __defers["$.__views.__alloyId131!touchend!changePassword"] = true;
=======
        id: "__alloyId123"
    });
    $.__views.profileContainer.add($.__views.__alloyId123);
    changePassword ? $.__views.__alloyId123.addEventListener("touchend", changePassword) : __defers["$.__views.__alloyId123!touchend!changePassword"] = true;
>>>>>>> origin/master
    $.__views.verifyContainer = Ti.UI.createView({
        id: "verifyContainer",
        visible: "false",
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId129.add($.__views.verifyContainer);
    $.__views.__alloyId132 = Ti.UI.createImageView({
=======
    $.__views.__alloyId121.add($.__views.verifyContainer);
    $.__views.__alloyId124 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "40%",
        borderRadius: "10",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId132"
    });
    $.__views.verifyContainer.add($.__views.__alloyId132);
=======
        id: "__alloyId124"
    });
    $.__views.verifyContainer.add($.__views.__alloyId124);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "80dp",
        color: "#6E6E6E",
        bottom: "10dp",
        textAlign: "center",
        font: {
            fontSize: "12dp"
        },
        id: "description"
    });
    $.__views.verifyContainer.add($.__views.description);
<<<<<<< HEAD
    $.__views.__alloyId133 = Ti.UI.createButton({
=======
    $.__views.__alloyId125 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId133"
    });
    $.__views.verifyContainer.add($.__views.__alloyId133);
    resendVerificationEmail ? $.__views.__alloyId133.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId133!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId134 = Ti.UI.createButton({
=======
        id: "__alloyId125"
    });
    $.__views.verifyContainer.add($.__views.__alloyId125);
    resendVerificationEmail ? $.__views.__alloyId125.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId125!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId126 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId134"
    });
    $.__views.verifyContainer.add($.__views.__alloyId134);
    checkStatus ? $.__views.__alloyId134.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId134!touchend!checkStatus"] = true;
=======
        id: "__alloyId126"
    });
    $.__views.verifyContainer.add($.__views.__alloyId126);
    checkStatus ? $.__views.__alloyId126.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId126!touchend!checkStatus"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    common.construct($);
    loadPage();
    var data = usersModel.getUserByEmpNo();
    var healthModel = Alloy.createCollection("personalInfo");
    var personal_health_data = healthModel.getOwnerData();
    data[0]["personal_health"] = personal_health_data;
    for (var i = 0; i < data.length; i++) {
        var profile_view = Alloy.createController("_profile_view", {
            profile_data: data[i]
        }).getView();
        $.main.addView(profile_view);
    }
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        console.log("close!!");
        nav.closeWindow($.asp_profile);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId131!touchend!changePassword"] && $.__views.__alloyId131.addEventListener("touchend", changePassword);
    __defers["$.__views.__alloyId133!touchend!resendVerificationEmail"] && $.__views.__alloyId133.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId134!touchend!checkStatus"] && $.__views.__alloyId134.addEventListener("touchend", checkStatus);
=======
    __defers["$.__views.__alloyId123!touchend!changePassword"] && $.__views.__alloyId123.addEventListener("touchend", changePassword);
    __defers["$.__views.__alloyId125!touchend!resendVerificationEmail"] && $.__views.__alloyId125.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId126!touchend!checkStatus"] && $.__views.__alloyId126.addEventListener("touchend", checkStatus);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;