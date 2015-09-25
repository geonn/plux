function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doLogin() {
        common.showLoading();
        var email = $.email.value;
        var password = $.password.value;
        if ("" == email || "" == password) {
            common.createAlert("Authentication warning", "Please fill in email and password");
            common.hideLoading();
            return;
        }
        if (singleton) {
            var params = {
                email: email,
                password: password
            };
            API.do_pluxLogin(params, $);
        }
    }
    function hideProductFormKeyboard(e) {
        if ("TextField" != e.source.id) {
            if ("email" == e.source.id) return false;
            if ("password" == e.source.id) return false;
            $.email.blur();
            $.password.blur();
        }
    }
    function doSignup() {
        nav.navigationWindow("signup", 0);
    }
    function loginFacebook(e) {
        if (e.success) {
            common.showLoading();
            FACEBOOK.requestWithGraphPath("me", {}, "GET", function(e) {
                if (e.success) {
                    var fbRes = JSON.parse(e.result);
                    Ti.App.Properties.setString("plux_email", fbRes.email);
                    API.updateUserFromFB({
                        email: fbRes.email,
                        fbid: fbRes.id,
                        link: fbRes.link,
                        name: fbRes.name,
                        gender: fbRes.gender
                    }, $);
                }
            });
            FACEBOOK.removeEventListener("login", loginFacebook);
        } else e.error || e.cancelled;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
    $.__views.loginWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        navTintColor: "#CE1D1C",
        title: "Login",
        id: "loginWin",
        layout: "vertical"
    });
    $.__views.loginWin && $.addTopLevelView($.__views.loginWin);
    $.__views.__alloyId92 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId92"
    });
    $.__views.loginWin.add($.__views.__alloyId92);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId92.add($.__views.pageTitle);
    $.__views.__alloyId93 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Login",
        textAlign: "center",
        id: "__alloyId93"
    });
    $.__views.pageTitle.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createView({
        id: "__alloyId94"
    });
    $.__views.loginWin.add($.__views.__alloyId94);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "0",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId94.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId95 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId95"
    });
    $.__views.loadingBar.add($.__views.__alloyId95);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
    $.__views.__alloyId94.add($.__views.main);
    $.__views.__alloyId96 = Ti.UI.createImageView({
        width: "120",
        borderRadius: "10",
        height: "120",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/logo_plux.png",
        id: "__alloyId96"
    });
    $.__views.main.add($.__views.__alloyId96);
    $.__views.email = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "90%",
        backgroundColor: "#fff",
        color: "#000000",
        borderColor: "#cccccc",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        bottom: "5dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        id: "email",
        hintText: "Enter Email",
        value: ""
    });
    $.__views.main.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "90%",
        backgroundColor: "#fff",
        passwordMask: true,
        color: "#000000",
        borderColor: "#cccccc",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "password",
        hintText: "Enter Password",
        value: ""
    });
    $.__views.main.add($.__views.password);
    $.__views.loginAccountButton = Ti.UI.createButton({
        id: "loginAccountButton",
        borderRadius: "5",
        backgroundColor: "#CC2228",
        title: "Login",
        width: "70%",
        top: "20",
        height: "40",
        color: "#ffffff"
    });
    $.__views.main.add($.__views.loginAccountButton);
    doLogin ? $.addListener($.__views.loginAccountButton, "touchend", doLogin) : __defers["$.__views.loginAccountButton!touchend!doLogin"] = true;
    $.__views.fbloginView = Ti.UI.createView({
        height: "60",
        id: "fbloginView",
        width: "70%"
    });
    $.__views.main.add($.__views.fbloginView);
    $.__views.registerAccountButton = Ti.UI.createButton({
        id: "registerAccountButton",
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Register",
        width: "70%",
        top: "5",
        height: "40",
        color: "#ffffff"
    });
    $.__views.main.add($.__views.registerAccountButton);
    doSignup ? $.addListener($.__views.registerAccountButton, "touchend", doSignup) : __defers["$.__views.registerAccountButton!touchend!doSignup"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var singleton = true;
    common.construct($);
    var usersPluxModel = Alloy.createCollection("users_plux");
    var preset_email = Ti.App.Properties.getString("plux_email") || "";
    $.email.value = preset_email;
    var isKeyboardFocus = 0;
    $.loginWin.addEventListener("click", hideProductFormKeyboard);
    $.email.addEventListener("touchend", function() {
        $.email.focus();
        isKeyboardFocus = 1;
    });
    $.password.addEventListener("touchend", function() {
        $.password.focus();
        isKeyboardFocus = 1;
    });
    $.email.addEventListener("return", function() {
        $.password.focus();
    });
    $.password.addEventListener("return", function() {
        doLogin();
    });
    $.fbloginView.add(FACEBOOK.createLoginButton({
        top: 10,
        readPermissions: [ "email", "public_profile", "user_friends" ],
        style: FACEBOOK.BUTTON_STYLE_WIDE
    }));
    FACEBOOK.addEventListener("login", loginFacebook);
    var touchLogin = function() {
        var email = $.email.value;
        var userData = usersPluxModel.getUserByEmail(email);
        if (userData && "" != email) {
            Ti.App.removeEventListener("touchLogin", touchLogin);
            API.getUserService({
                u_id: userData.id
            });
            Ti.App.Properties.setString("u_id", userData.id);
            Ti.App.Properties.setString("plux_email", userData.email);
            Ti.App.fireEvent("updateHeader");
            nav.closeWindow($.loginWin);
        }
    };
    var loginAfterRegister = function(e) {
        var email = e.params.email;
        var password = e.params.password;
        var params = {
            email: email,
            password: password
        };
        API.do_pluxLogin(params, $);
        common.createAlert("Success", "Plux account registration successful!");
        var win = Alloy.createController("home").getView();
        win.open();
        Ti.App.removeEventListener("loginAfterRegister", loginAfterRegister);
    };
    Ti.App.addEventListener("touchLogin", touchLogin);
    Ti.App.addEventListener("loginAfterRegister", loginAfterRegister);
    $.loginWin.addEventListener("android:back", function() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Cancel", "Confirm" ],
            message: "Would you like to exit Plux?",
            title: "Exit app"
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel;
            if (1 === e.index) {
                var activity = Titanium.Android.currentActivity;
                activity.finish();
            }
        });
        dialog.show();
    });
    __defers["$.__views.loginAccountButton!touchend!doLogin"] && $.addListener($.__views.loginAccountButton, "touchend", doLogin);
    __defers["$.__views.registerAccountButton!touchend!doSignup"] && $.addListener($.__views.registerAccountButton, "touchend", doSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;