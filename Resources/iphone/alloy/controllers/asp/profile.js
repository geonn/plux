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
    $.__views.__alloyId205 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId205"
    });
    $.__views.loadingBar.add($.__views.__alloyId205);
    $.__views.__alloyId206 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId206"
    });
    $.__views.asp_profile.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId207"
    });
    $.__views.__alloyId206.add($.__views.__alloyId207);
    $.__views.profileContainer = Ti.UI.createView({
        layout: "vertical",
        id: "profileContainer",
        visible: "false"
    });
    $.__views.__alloyId207.add($.__views.profileContainer);
    var __alloyId208 = [];
    $.__views.main = Ti.UI.createScrollableView({
        views: __alloyId208,
        id: "main",
        height: "80%",
        backgroundColor: "#ffffff"
    });
    $.__views.profileContainer.add($.__views.main);
    $.__views.__alloyId209 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Change Password",
        width: "70%",
        top: "5",
        height: "40",
        color: "#ffffff",
        id: "__alloyId209"
    });
<<<<<<< HEAD
    $.__views.profileContainer.add($.__views.__alloyId186);
    changePassword ? $.addListener($.__views.__alloyId186, "touchend", changePassword) : __defers["$.__views.__alloyId186!touchend!changePassword"] = true;
=======
    $.__views.profileContainer.add($.__views.__alloyId209);
    changePassword ? $.addListener($.__views.__alloyId209, "touchend", changePassword) : __defers["$.__views.__alloyId209!touchend!changePassword"] = true;
>>>>>>> origin/master
    $.__views.verifyContainer = Ti.UI.createView({
        id: "verifyContainer",
        visible: "false",
        layout: "vertical"
    });
    $.__views.__alloyId207.add($.__views.verifyContainer);
    $.__views.__alloyId210 = Ti.UI.createImageView({
        width: "40%",
        borderRadius: "10",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "asp_logo.png",
        id: "__alloyId210"
    });
    $.__views.verifyContainer.add($.__views.__alloyId210);
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
    $.__views.__alloyId211 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#CE1D1C",
        title: "Resend Verification",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
        id: "__alloyId211"
    });
<<<<<<< HEAD
    $.__views.verifyContainer.add($.__views.__alloyId188);
    resendVerificationEmail ? $.addListener($.__views.__alloyId188, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId188!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId189 = Ti.UI.createButton({
=======
    $.__views.verifyContainer.add($.__views.__alloyId211);
    resendVerificationEmail ? $.addListener($.__views.__alloyId211, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId211!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId212 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
        id: "__alloyId212"
    });
<<<<<<< HEAD
    $.__views.verifyContainer.add($.__views.__alloyId189);
    checkStatus ? $.addListener($.__views.__alloyId189, "touchend", checkStatus) : __defers["$.__views.__alloyId189!touchend!checkStatus"] = true;
=======
    $.__views.verifyContainer.add($.__views.__alloyId212);
    checkStatus ? $.addListener($.__views.__alloyId212, "touchend", checkStatus) : __defers["$.__views.__alloyId212!touchend!checkStatus"] = true;
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
    __defers["$.__views.__alloyId186!touchend!changePassword"] && $.addListener($.__views.__alloyId186, "touchend", changePassword);
    __defers["$.__views.__alloyId188!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId188, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId189!touchend!checkStatus"] && $.addListener($.__views.__alloyId189, "touchend", checkStatus);
=======
    __defers["$.__views.__alloyId209!touchend!changePassword"] && $.addListener($.__views.__alloyId209, "touchend", changePassword);
    __defers["$.__views.__alloyId211!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId211, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId212!touchend!checkStatus"] && $.addListener($.__views.__alloyId212, "touchend", checkStatus);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;