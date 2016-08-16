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
        var userInfo = usersModel.getPrincipleData();
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
        height: 0,
        width: 120,
        borderRadius: 15,
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
    $.__views.__alloyId518 = Ti.UI.createLabel({
=======
    $.__views.__alloyId506 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        text: "Loading",
<<<<<<< HEAD
        id: "__alloyId518"
    });
    $.__views.loadingBar.add($.__views.__alloyId518);
    $.__views.__alloyId519 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId519"
    });
    $.__views.asp_profile.add($.__views.__alloyId519);
    $.__views.__alloyId520 = Ti.UI.createView({
=======
        id: "__alloyId506"
    });
    $.__views.loadingBar.add($.__views.__alloyId506);
    $.__views.__alloyId507 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId507"
    });
    $.__views.asp_profile.add($.__views.__alloyId507);
    $.__views.__alloyId508 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId520"
    });
    $.__views.__alloyId519.add($.__views.__alloyId520);
    $.__views.__alloyId521 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId521"
    });
    $.__views.__alloyId520.add($.__views.__alloyId521);
=======
        id: "__alloyId508"
    });
    $.__views.__alloyId507.add($.__views.__alloyId508);
    $.__views.__alloyId509 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId509"
    });
    $.__views.__alloyId508.add($.__views.__alloyId509);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId521.add($.__views.btnBack);
=======
    $.__views.__alloyId509.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId520.add($.__views.pageTitle);
    $.__views.__alloyId522 = Ti.UI.createLabel({
=======
    $.__views.__alloyId508.add($.__views.pageTitle);
    $.__views.__alloyId510 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "ASP Profile",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId522"
    });
    $.__views.pageTitle.add($.__views.__alloyId522);
    $.__views.__alloyId523 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId523"
    });
    $.__views.__alloyId519.add($.__views.__alloyId523);
=======
        id: "__alloyId510"
    });
    $.__views.pageTitle.add($.__views.__alloyId510);
    $.__views.__alloyId511 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId511"
    });
    $.__views.__alloyId507.add($.__views.__alloyId511);
>>>>>>> origin/master
    $.__views.profileContainer = Ti.UI.createView({
        layout: "vertical",
        id: "profileContainer",
        visible: false
    });
<<<<<<< HEAD
    $.__views.__alloyId523.add($.__views.profileContainer);
    var __alloyId524 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId524,
=======
    $.__views.__alloyId511.add($.__views.profileContainer);
    var __alloyId512 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId512,
>>>>>>> origin/master
        id: "main",
        height: "80%",
        backgroundColor: "#ffffff"
    });
    $.__views.profileContainer.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId525 = Ti.UI.createButton({
=======
    $.__views.__alloyId513 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Change Password",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId525"
    });
    $.__views.profileContainer.add($.__views.__alloyId525);
    changePassword ? $.addListener($.__views.__alloyId525, "touchend", changePassword) : __defers["$.__views.__alloyId525!touchend!changePassword"] = true;
=======
        id: "__alloyId513"
    });
    $.__views.profileContainer.add($.__views.__alloyId513);
    changePassword ? $.addListener($.__views.__alloyId513, "touchend", changePassword) : __defers["$.__views.__alloyId513!touchend!changePassword"] = true;
>>>>>>> origin/master
    $.__views.verifyContainer = Ti.UI.createView({
        id: "verifyContainer",
        visible: false,
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId523.add($.__views.verifyContainer);
    $.__views.__alloyId526 = Ti.UI.createImageView({
=======
    $.__views.__alloyId511.add($.__views.verifyContainer);
    $.__views.__alloyId514 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "40%",
        borderRadius: 10,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId526"
    });
    $.__views.verifyContainer.add($.__views.__alloyId526);
=======
        id: "__alloyId514"
    });
    $.__views.verifyContainer.add($.__views.__alloyId514);
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
    $.__views.__alloyId527 = Ti.UI.createButton({
=======
    $.__views.__alloyId515 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: 5,
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: 10,
        height: 40,
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId527"
    });
    $.__views.verifyContainer.add($.__views.__alloyId527);
    resendVerificationEmail ? $.addListener($.__views.__alloyId527, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId527!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId528 = Ti.UI.createButton({
=======
        id: "__alloyId515"
    });
    $.__views.verifyContainer.add($.__views.__alloyId515);
    resendVerificationEmail ? $.addListener($.__views.__alloyId515, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId515!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId516 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: 10,
        height: 40,
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId528"
    });
    $.__views.verifyContainer.add($.__views.__alloyId528);
    checkStatus ? $.addListener($.__views.__alloyId528, "touchend", checkStatus) : __defers["$.__views.__alloyId528!touchend!checkStatus"] = true;
=======
        id: "__alloyId516"
    });
    $.__views.verifyContainer.add($.__views.__alloyId516);
    checkStatus ? $.addListener($.__views.__alloyId516, "touchend", checkStatus) : __defers["$.__views.__alloyId516!touchend!checkStatus"] = true;
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
    $.btnBack.addEventListener("click", function() {
        console.log("close!!");
        nav.closeWindow($.asp_profile);
    });
    $.asp_profile.addEventListener("close", function() {
        Ti.App.removeEventListener("loadPage", loadPage);
        $.destroy();
        console.log("window close");
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId525!touchend!changePassword"] && $.addListener($.__views.__alloyId525, "touchend", changePassword);
    __defers["$.__views.__alloyId527!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId527, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId528!touchend!checkStatus"] && $.addListener($.__views.__alloyId528, "touchend", checkStatus);
=======
    __defers["$.__views.__alloyId513!touchend!changePassword"] && $.addListener($.__views.__alloyId513, "touchend", changePassword);
    __defers["$.__views.__alloyId515!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId515, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId516!touchend!checkStatus"] && $.addListener($.__views.__alloyId516, "touchend", checkStatus);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;