function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function autoLogin() {
        var asp_email = Ti.App.Properties.getString("asp_email");
        var asp_password = Ti.App.Properties.getString("asp_password");
        if (asp_email) {
            common.showLoading();
            API.doLogin(asp_email, asp_password, $, args.target);
        }
    }
    function doLogin() {
        common.showLoading();
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
    function doSignup() {
        var nav = require("navigation");
        nav.navigationWindow("asp/signup", 0);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/login";
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
        id: "loginWin",
        title: "Login",
        layout: "vertical"
    });
    $.__views.loginWin && $.addTopLevelView($.__views.loginWin);
<<<<<<< HEAD
    $.__views.__alloyId107 = Ti.UI.createView({
        id: "__alloyId107"
    });
    $.__views.loginWin.add($.__views.__alloyId107);
=======
    $.__views.__alloyId108 = Ti.UI.createView({
        id: "__alloyId108"
    });
    $.__views.loginWin.add($.__views.__alloyId108);
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
    $.__views.__alloyId107.add($.__views.loadingBar);
=======
    $.__views.__alloyId108.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId108 = Ti.UI.createLabel({
=======
    $.__views.__alloyId109 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId108"
    });
    $.__views.loadingBar.add($.__views.__alloyId108);
=======
        id: "__alloyId109"
    });
    $.__views.loadingBar.add($.__views.__alloyId109);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId107.add($.__views.main);
    $.__views.__alloyId109 = Ti.UI.createImageView({
=======
    $.__views.__alloyId108.add($.__views.main);
    $.__views.__alloyId110 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "50%",
        borderRadius: "10",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "50dp",
        top: "50dp",
        image: "/images/asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId109"
    });
    $.__views.main.add($.__views.__alloyId109);
=======
        id: "__alloyId110"
    });
    $.__views.main.add($.__views.__alloyId110);
>>>>>>> origin/master
    $.__views.username = Ti.UI.createTextField({
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
        id: "username",
        hintText: "Enter Username",
        value: ""
    });
    $.__views.main.add($.__views.username);
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
    doLogin ? $.__views.loginAccountButton.addEventListener("touchend", doLogin) : __defers["$.__views.loginAccountButton!touchend!doLogin"] = true;
    $.__views.registerAccountButton = Ti.UI.createButton({
        id: "registerAccountButton",
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "First-Time Login",
        width: "70%",
        top: "5",
        height: "40",
        color: "#ffffff"
    });
    $.__views.main.add($.__views.registerAccountButton);
    doSignup ? $.__views.registerAccountButton.addEventListener("touchend", doSignup) : __defers["$.__views.registerAccountButton!touchend!doSignup"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Alloy.Globals.navMenu;
    var singleton = true;
    common.construct($);
    $.username.value = Ti.App.Properties.getString("asp_email") || "";
    $.password.value = Ti.App.Properties.getString("asp_password") || "";
    autoLogin();
    var isKeyboardFocus = 0;
    $.loginWin.addEventListener("click", hideProductFormKeyboard);
    $.username.addEventListener("touchend", function() {
        $.username.focus();
        isKeyboardFocus = 1;
    });
    $.password.addEventListener("touchend", function() {
        $.password.focus();
        isKeyboardFocus = 1;
    });
    $.username.addEventListener("return", function() {
        $.password.focus();
    });
    $.password.addEventListener("return", function() {
        doLogin();
    });
    __defers["$.__views.loginAccountButton!touchend!doLogin"] && $.__views.loginAccountButton.addEventListener("touchend", doLogin);
    __defers["$.__views.registerAccountButton!touchend!doSignup"] && $.__views.registerAccountButton.addEventListener("touchend", doSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;