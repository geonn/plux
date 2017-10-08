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
        var isver = Ti.App.Properties.getString("isver");
        Ti.App.Properties.getString("corpcode");
        Ti.App.Properties.getString("memno");
        Ti.App.Properties.getString("empno");
        if ("true" == isver || isver > 0) {
            $.verifyContainer.hide();
            $.profileContainer.show();
        } else {
            $.description.text = "You need to verify your account in order to view claim details. If you didn't received verification email, please click 'Resend Verification' button below.";
            $.verifyContainer.show();
            $.profileContainer.hide();
        }
        Ti.App.removeEventListener("loadPage", loadPage);
    }
    function changePassword() {
        var nav = require("navigation");
        nav.navigationWindow("asp/changePassword", 0);
    }
    function checkStatus() {
        var asp_email = Ti.App.Properties.getString("asp_email");
        if ("undefined" != typeof asp_email && "" != asp_email) {
            loading.start();
            loadPage();
        } else common.createAlert("Error", "Please login your ASP account", function(e) {
            $.win.close();
        });
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/profile";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.asp_profile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
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
    $.__views.__alloyId552 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
        id: "__alloyId552"
    });
    $.__views.loadingBar.add($.__views.__alloyId552);
    $.__views.__alloyId554 = Ti.UI.createView({
        id: "__alloyId554"
    });
    $.__views.moreBtn = Ti.UI.createImageView({
        right: 0,
        id: "moreBtn",
        width: 30,
        image: "/images/list.png"
    });
    $.__views.__alloyId554.add($.__views.moreBtn);
    $.__views.asp_profile.rightNavButton = $.__views.__alloyId554;
    $.__views.__alloyId555 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId555"
    });
    $.__views.asp_profile.add($.__views.__alloyId555);
    $.__views.__alloyId556 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId556"
    });
    $.__views.__alloyId555.add($.__views.__alloyId556);
    $.__views.__alloyId557 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId557"
    });
    $.__views.__alloyId556.add($.__views.__alloyId557);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId557.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "80%"
    });
    $.__views.__alloyId556.add($.__views.pageTitle);
    $.__views.__alloyId558 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "ASP Profile",
        textAlign: "center",
        id: "__alloyId558"
    });
    $.__views.pageTitle.add($.__views.__alloyId558);
    $.__views.__alloyId559 = Ti.UI.createView({
        width: "auto",
        id: "__alloyId559"
    });
    $.__views.__alloyId556.add($.__views.__alloyId559);
    $.__views.moreBtn = Ti.UI.createImageView({
        id: "moreBtn",
        width: 30,
        image: "/images/list.png"
    });
    $.__views.__alloyId559.add($.__views.moreBtn);
    $.__views.__alloyId560 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId560"
    });
    $.__views.__alloyId555.add($.__views.__alloyId560);
    $.__views.profileContainer = Ti.UI.createView({
        layout: "vertical",
        id: "profileContainer",
        visible: false
    });
    $.__views.__alloyId560.add($.__views.profileContainer);
    var __alloyId561 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId561,
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
    $.__views.__alloyId560.add($.__views.verifyContainer);
    $.__views.__alloyId562 = Ti.UI.createImageView({
        width: "40%",
        borderRadius: 10,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/asp_logo.png",
        id: "__alloyId562"
    });
    $.__views.verifyContainer.add($.__views.__alloyId562);
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
    $.__views.__alloyId563 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: 10,
        height: 40,
        color: "#ffffff",
        id: "__alloyId563"
    });
    $.__views.verifyContainer.add($.__views.__alloyId563);
    resendVerificationEmail ? $.addListener($.__views.__alloyId563, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId563!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId564 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: 10,
        height: 40,
        color: "#ffffff",
        id: "__alloyId564"
    });
    $.__views.verifyContainer.add($.__views.__alloyId564);
    checkStatus ? $.addListener($.__views.__alloyId564, "touchend", checkStatus) : __defers["$.__views.__alloyId564!touchend!checkStatus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    common.construct($);
    loadPage();
    var data = JSON.parse(Ti.App.Properties.getString("dependent"));
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
    $.moreBtn.addEventListener("click", function(e) {
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
    __defers["$.__views.__alloyId563!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId563, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId564!touchend!checkStatus"] && $.addListener($.__views.__alloyId564, "touchend", checkStatus);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;