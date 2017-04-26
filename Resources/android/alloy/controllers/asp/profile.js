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
        if ("true" == userInfo.isver || userInfo.isver > 0) {
            $.verifyContainer.hide();
            $.profileContainer.show();
            console.log("a");
        } else {
            console.log("a");
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
            API.doLogin(asp_email, asp_password, $, "refresh", loadPage);
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
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
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
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId527 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
        id: "__alloyId527"
    });
    $.__views.loadingBar.add($.__views.__alloyId527);
    $.__views.__alloyId529 = Ti.UI.createView({
        id: "__alloyId529"
    });
    $.__views.moreBtn = Ti.UI.createImageView({
        right: 0,
        id: "moreBtn",
        width: 30,
        image: "/images/list.png"
    });
    $.__views.__alloyId529.add($.__views.moreBtn);
    $.__views.asp_profile.rightNavButton = $.__views.__alloyId529;
    $.__views.__alloyId530 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId530"
    });
    $.__views.asp_profile.add($.__views.__alloyId530);
    $.__views.__alloyId531 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId531"
    });
    $.__views.__alloyId530.add($.__views.__alloyId531);
    $.__views.__alloyId532 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId532"
    });
    $.__views.__alloyId531.add($.__views.__alloyId532);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId532.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
    $.__views.__alloyId531.add($.__views.pageTitle);
    $.__views.__alloyId533 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "ASP Profile",
        textAlign: "center",
        id: "__alloyId533"
    });
    $.__views.pageTitle.add($.__views.__alloyId533);
    $.__views.__alloyId534 = Ti.UI.createView({
        width: "auto",
        id: "__alloyId534"
    });
    $.__views.__alloyId531.add($.__views.__alloyId534);
    $.__views.moreBtn = Ti.UI.createImageView({
        id: "moreBtn",
        width: 30,
        image: "/images/list.png"
    });
    $.__views.__alloyId534.add($.__views.moreBtn);
    $.__views.__alloyId535 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId535"
    });
    $.__views.__alloyId530.add($.__views.__alloyId535);
    $.__views.profileContainer = Ti.UI.createView({
        layout: "vertical",
        id: "profileContainer",
        visible: false
    });
    $.__views.__alloyId535.add($.__views.profileContainer);
    var __alloyId536 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId536,
        id: "main",
        height: "80%",
        backgroundColor: "#ffffff"
    });
    $.__views.profileContainer.add($.__views.main);
    $.__views.verifyContainer = Ti.UI.createView({
        id: "verifyContainer",
        visible: false,
        layout: "vertical"
    });
    $.__views.__alloyId535.add($.__views.verifyContainer);
    $.__views.__alloyId537 = Ti.UI.createImageView({
        width: "40%",
        borderRadius: 10,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/asp_logo.png",
        id: "__alloyId537"
    });
    $.__views.verifyContainer.add($.__views.__alloyId537);
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
    $.__views.__alloyId538 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: 10,
        height: 40,
        color: "#ffffff",
        id: "__alloyId538"
    });
    $.__views.verifyContainer.add($.__views.__alloyId538);
    resendVerificationEmail ? $.addListener($.__views.__alloyId538, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId538!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId539 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: 10,
        height: 40,
        color: "#ffffff",
        id: "__alloyId539"
    });
    $.__views.verifyContainer.add($.__views.__alloyId539);
    checkStatus ? $.addListener($.__views.__alloyId539, "touchend", checkStatus) : __defers["$.__views.__alloyId539!touchend!checkStatus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    common.construct($);
    loadPage();
    var data = usersModel.getUserByEmpNo();
    for (var i = 0; i < data.length; i++) {
        console.log(i);
        var profile_view = Alloy.createController("_profile_view", {
            profile_data: data[i]
        }).getView();
        $.main.addView(profile_view);
    }
    $.btnBack.addEventListener("click", function() {
        console.log("close!!");
        nav.closeWindow($.asp_profile);
    });
    $.moreBtn.addEventListener("click", function() {
        var dialog = Ti.UI.createOptionDialog({
            cancel: 1,
            options: [ "Change Password", "Cancel" ],
            title: "More"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            0 == e.index && changePassword();
        });
    });
    $.asp_profile.addEventListener("close", function() {
        Ti.App.removeEventListener("loadPage", loadPage);
        $.destroy();
        console.log("window close");
    });
    __defers["$.__views.__alloyId538!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId538, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId539!touchend!checkStatus"] && $.addListener($.__views.__alloyId539, "touchend", checkStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;