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
    $.__views.__alloyId144 = Ti.UI.createLabel({
=======
    $.__views.__alloyId136 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId144"
    });
    $.__views.loadingBar.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId145"
    });
    $.__views.asp_profile.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createView({
=======
        id: "__alloyId136"
    });
    $.__views.loadingBar.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId137"
    });
    $.__views.asp_profile.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId146"
    });
    $.__views.__alloyId145.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId147"
    });
    $.__views.__alloyId146.add($.__views.__alloyId147);
=======
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId147.add($.__views.btnBack);
=======
    $.__views.__alloyId139.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId146.add($.__views.pageTitle);
    $.__views.__alloyId148 = Ti.UI.createLabel({
=======
    $.__views.__alloyId138.add($.__views.pageTitle);
    $.__views.__alloyId140 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "ASP Profile",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId148"
    });
    $.__views.pageTitle.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId149"
    });
    $.__views.__alloyId145.add($.__views.__alloyId149);
=======
        id: "__alloyId140"
    });
    $.__views.pageTitle.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId141"
    });
    $.__views.__alloyId137.add($.__views.__alloyId141);
>>>>>>> origin/master
    $.__views.profileContainer = Ti.UI.createView({
        layout: "vertical",
        id: "profileContainer",
        visible: "false"
    });
<<<<<<< HEAD
    $.__views.__alloyId149.add($.__views.profileContainer);
    var __alloyId150 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId150,
=======
    $.__views.__alloyId141.add($.__views.profileContainer);
    var __alloyId142 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId142,
>>>>>>> origin/master
        id: "main",
        height: "80%",
        backgroundColor: "#ffffff"
    });
    $.__views.profileContainer.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId151 = Ti.UI.createButton({
=======
    $.__views.__alloyId143 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Change Password",
        width: "70%",
        top: "5",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId151"
    });
    $.__views.profileContainer.add($.__views.__alloyId151);
    changePassword ? $.__views.__alloyId151.addEventListener("touchend", changePassword) : __defers["$.__views.__alloyId151!touchend!changePassword"] = true;
=======
        id: "__alloyId143"
    });
    $.__views.profileContainer.add($.__views.__alloyId143);
    changePassword ? $.__views.__alloyId143.addEventListener("touchend", changePassword) : __defers["$.__views.__alloyId143!touchend!changePassword"] = true;
>>>>>>> origin/master
    $.__views.verifyContainer = Ti.UI.createView({
        id: "verifyContainer",
        visible: "false",
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId149.add($.__views.verifyContainer);
    $.__views.__alloyId152 = Ti.UI.createImageView({
=======
    $.__views.__alloyId141.add($.__views.verifyContainer);
    $.__views.__alloyId144 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "40%",
        borderRadius: "10",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId152"
    });
    $.__views.verifyContainer.add($.__views.__alloyId152);
=======
        id: "__alloyId144"
    });
    $.__views.verifyContainer.add($.__views.__alloyId144);
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
    $.__views.__alloyId153 = Ti.UI.createButton({
=======
    $.__views.__alloyId145 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId153"
    });
    $.__views.verifyContainer.add($.__views.__alloyId153);
    resendVerificationEmail ? $.__views.__alloyId153.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId153!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId154 = Ti.UI.createButton({
=======
        id: "__alloyId145"
    });
    $.__views.verifyContainer.add($.__views.__alloyId145);
    resendVerificationEmail ? $.__views.__alloyId145.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId145!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId146 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId154"
    });
    $.__views.verifyContainer.add($.__views.__alloyId154);
    checkStatus ? $.__views.__alloyId154.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId154!touchend!checkStatus"] = true;
=======
        id: "__alloyId146"
    });
    $.__views.verifyContainer.add($.__views.__alloyId146);
    checkStatus ? $.__views.__alloyId146.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId146!touchend!checkStatus"] = true;
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
<<<<<<< HEAD
    __defers["$.__views.__alloyId151!touchend!changePassword"] && $.__views.__alloyId151.addEventListener("touchend", changePassword);
    __defers["$.__views.__alloyId153!touchend!resendVerificationEmail"] && $.__views.__alloyId153.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId154!touchend!checkStatus"] && $.__views.__alloyId154.addEventListener("touchend", checkStatus);
=======
    __defers["$.__views.__alloyId143!touchend!changePassword"] && $.__views.__alloyId143.addEventListener("touchend", changePassword);
    __defers["$.__views.__alloyId145!touchend!resendVerificationEmail"] && $.__views.__alloyId145.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId146!touchend!checkStatus"] && $.__views.__alloyId146.addEventListener("touchend", checkStatus);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;