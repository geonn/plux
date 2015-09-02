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
    $.__views.__alloyId213 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId213"
    });
    $.__views.loadingBar.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId214"
    });
    $.__views.asp_profile.add($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId215"
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId216"
    });
    $.__views.__alloyId215.add($.__views.__alloyId216);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId216.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
    $.__views.__alloyId215.add($.__views.pageTitle);
    $.__views.__alloyId217 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "ASP Profile",
        textAlign: "center",
        id: "__alloyId217"
    });
    $.__views.pageTitle.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId218"
    });
    $.__views.__alloyId214.add($.__views.__alloyId218);
    $.__views.profileContainer = Ti.UI.createView({
        layout: "vertical",
        id: "profileContainer",
        visible: "false"
    });
    $.__views.__alloyId218.add($.__views.profileContainer);
    var __alloyId219 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId219,
        id: "main",
        height: "80%",
        backgroundColor: "#ffffff"
    });
    $.__views.profileContainer.add($.__views.main);
    $.__views.__alloyId220 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Change Password",
        width: "70%",
        top: "5",
        height: "40",
        color: "#ffffff",
        id: "__alloyId220"
    });
    $.__views.profileContainer.add($.__views.__alloyId220);
    changePassword ? $.__views.__alloyId220.addEventListener("touchend", changePassword) : __defers["$.__views.__alloyId220!touchend!changePassword"] = true;
    $.__views.verifyContainer = Ti.UI.createView({
        id: "verifyContainer",
        visible: "false",
        layout: "vertical"
    });
    $.__views.__alloyId218.add($.__views.verifyContainer);
    $.__views.__alloyId221 = Ti.UI.createImageView({
        width: "40%",
        borderRadius: "10",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "asp_logo.png",
        id: "__alloyId221"
    });
    $.__views.verifyContainer.add($.__views.__alloyId221);
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
    $.__views.__alloyId222 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
        id: "__alloyId222"
    });
    $.__views.verifyContainer.add($.__views.__alloyId222);
    resendVerificationEmail ? $.__views.__alloyId222.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId222!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId223 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
        id: "__alloyId223"
    });
    $.__views.verifyContainer.add($.__views.__alloyId223);
    checkStatus ? $.__views.__alloyId223.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId223!touchend!checkStatus"] = true;
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
    __defers["$.__views.__alloyId220!touchend!changePassword"] && $.__views.__alloyId220.addEventListener("touchend", changePassword);
    __defers["$.__views.__alloyId222!touchend!resendVerificationEmail"] && $.__views.__alloyId222.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId223!touchend!checkStatus"] && $.__views.__alloyId223.addEventListener("touchend", checkStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;