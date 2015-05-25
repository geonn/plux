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
<<<<<<< HEAD
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
    function loginFacebook(e) {
        if (e.success) {
            common.showLoading();
            FACEBOOK.requestWithGraphPath("me", {}, "GET", function(e) {
                if (e.success) {
                    var fbRes = JSON.parse(e.result);
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
=======
        var username = $.username.value;
        var password = $.password.value;
        if ("" == username || "" == password) {
            common.createAlert("Authentication warning", "Please fill in username and password");
            common.hideLoading();
            return;
        }
        singleton && API.doLogin(username, password, $, args.target);
    }
    function hideProductFormKeyboard(e) {
        if ("TextField" != e.source.id) {
            if ("username" == e.source.id) return false;
            if ("password" == e.source.id) return false;
            $.username.blur();
            $.password.blur();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
>>>>>>> origin/master
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
        id: "loginWin",
        title: "Login",
        layout: "vertical"
    });
    $.__views.loginWin && $.addTopLevelView($.__views.loginWin);
<<<<<<< HEAD
    $.__views.__alloyId73 = Ti.UI.createView({
        left: "0",
        id: "__alloyId73"
    });
    $.__views.loginWin.leftNavButton = $.__views.__alloyId73;
    $.__views.__alloyId74 = Ti.UI.createView({
        id: "__alloyId74"
    });
    $.__views.loginWin.add($.__views.__alloyId74);
=======
    $.__views.__alloyId72 = Ti.UI.createView({
        id: "__alloyId72"
    });
    $.__views.loginWin.add($.__views.__alloyId72);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "0",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.__alloyId74.add($.__views.loadingBar);
=======
    $.__views.__alloyId72.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId75 = Ti.UI.createLabel({
=======
    $.__views.__alloyId73 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId75"
    });
    $.__views.loadingBar.add($.__views.__alloyId75);
=======
        id: "__alloyId73"
    });
    $.__views.loadingBar.add($.__views.__alloyId73);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId74.add($.__views.main);
    $.__views.__alloyId76 = Ti.UI.createImageView({
        width: "40%",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "appicon-76@2x.png",
        id: "__alloyId76"
    });
    $.__views.main.add($.__views.__alloyId76);
    $.__views.email = Ti.UI.createTextField({
=======
    $.__views.__alloyId72.add($.__views.main);
    $.__views.__alloyId74 = Ti.UI.createImageView({
        width: "50%",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "50dp",
        top: "50dp",
        image: "appicon-76@2x.png",
        id: "__alloyId74"
    });
    $.__views.main.add($.__views.__alloyId74);
    $.__views.username = Ti.UI.createTextField({
>>>>>>> origin/master
        font: {
            fontSize: "14dp"
        },
        color: "#000000",
        backgroundColor: "#fff",
        borderColor: "#cccccc",
        width: "90%",
        height: "50dp",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        bottom: "5dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
<<<<<<< HEAD
        id: "email",
        hintText: "Enter Email",
        value: "wongbh@live.com"
    });
    $.__views.main.add($.__views.email);
=======
        id: "username",
        hintText: "Enter Email",
        value: "asplux@corpdemo.com"
    });
    $.__views.main.add($.__views.username);
>>>>>>> origin/master
    $.__views.password = Ti.UI.createTextField({
        passwordMask: true,
        font: {
            fontSize: "14dp"
        },
        color: "#000000",
        backgroundColor: "#fff",
        borderColor: "#cccccc",
        width: "90%",
        height: "50dp",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "password",
        hintText: "Enter Password",
<<<<<<< HEAD
        value: "12345678"
=======
        value: "asplux123"
>>>>>>> origin/master
    });
    $.__views.main.add($.__views.password);
    $.__views.loginAccountButton = Ti.UI.createButton({
        id: "loginAccountButton",
        borderRadius: "15",
        backgroundColor: "#CC2228",
        title: "Login",
<<<<<<< HEAD
        width: "60%",
=======
        width: "90%",
>>>>>>> origin/master
        top: "20",
        height: "60",
        color: "#ffffff"
    });
    $.__views.main.add($.__views.loginAccountButton);
    doLogin ? $.__views.loginAccountButton.addEventListener("touchend", doLogin) : __defers["$.__views.loginAccountButton!touchend!doLogin"] = true;
<<<<<<< HEAD
    $.__views.fbloginView = Ti.UI.createView({
        height: "60",
        id: "fbloginView",
        width: "60%"
    });
    $.__views.main.add($.__views.fbloginView);
=======
>>>>>>> origin/master
    $.__views.doSignup = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Register",
        id: "doSignup",
        top: "10"
    });
    $.__views.main.add($.__views.doSignup);
    exports.destroy = function() {};
    _.extend($, $.__views);
<<<<<<< HEAD
    arguments[0] || {};
=======
    var args = arguments[0] || {};
    Alloy.Globals.navMenu;
>>>>>>> origin/master
    var singleton = true;
    common.construct($);
    var isKeyboardFocus = 0;
    $.doSignup.addEventListener("click", function() {
<<<<<<< HEAD
        nav.navigationWindow("signup", 0);
    });
    $.loginWin.addEventListener("click", hideProductFormKeyboard);
    $.email.addEventListener("touchend", function() {
        $.email.focus();
=======
        var nav = require("navigation");
        nav.navigationWindow("signup", 0);
    });
    $.loginWin.addEventListener("click", hideProductFormKeyboard);
    $.username.addEventListener("touchend", function() {
        $.username.focus();
>>>>>>> origin/master
        isKeyboardFocus = 1;
    });
    $.password.addEventListener("touchend", function() {
        $.password.focus();
        isKeyboardFocus = 1;
    });
<<<<<<< HEAD
    $.email.addEventListener("return", function() {
=======
    $.username.addEventListener("return", function() {
>>>>>>> origin/master
        $.password.focus();
    });
    $.password.addEventListener("return", function() {
        doLogin();
    });
<<<<<<< HEAD
    $.fbloginView.add(FACEBOOK.createLoginButton({
        top: 10,
        style: FACEBOOK.BUTTON_STYLE_WIDE
    }));
    FACEBOOK.addEventListener("login", loginFacebook);
    FACEBOOK.addEventListener("logout", function() {});
=======
>>>>>>> origin/master
    __defers["$.__views.loginAccountButton!touchend!doLogin"] && $.__views.loginAccountButton.addEventListener("touchend", doLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;