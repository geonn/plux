function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doLogin(asp_email, asp_password) {
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
    function doASPSignup() {
        var nav = require("navigation");
        nav.navigationWindow("asp/signup", 0);
    }
    function hideProductFormKeyboard(e) {
        if ("TextField" != e.source.id) {
            if ("username" == e.source.id) return false;
            if ("password" == e.source.id) return false;
            $.username.blur();
            $.password.blur();
        }
    }
    function doASPSignup() {
        var nav = require("navigation");
        nav.navigationWindow("asp/signup", 0);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/login";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.aspLoginWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        navTintColor: "#CE1D1C",
        title: "Login",
        id: "aspLoginWin",
        layout: "vertical"
    });
    $.__views.aspLoginWin && $.addTopLevelView($.__views.aspLoginWin);
    $.__views.__alloyId517 = Ti.UI.createView({
        id: "__alloyId517"
    });
    $.__views.aspLoginWin.add($.__views.__alloyId517);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId517.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId518 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
        id: "__alloyId518"
    });
    $.__views.loadingBar.add($.__views.__alloyId518);
    $.__views.__alloyId519 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId519"
    });
    $.__views.__alloyId517.add($.__views.__alloyId519);
    $.__views.__alloyId520 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId520"
    });
    $.__views.__alloyId519.add($.__views.__alloyId520);
    $.__views.__alloyId521 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId521"
    });
    $.__views.__alloyId520.add($.__views.__alloyId521);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId521.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId520.add($.__views.pageTitle);
    $.__views.__alloyId522 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "ASP Login",
        textAlign: "center",
        id: "__alloyId522"
    });
    $.__views.pageTitle.add($.__views.__alloyId522);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
    $.__views.__alloyId519.add($.__views.main);
    $.__views.__alloyId523 = Ti.UI.createImageView({
        width: 120,
        borderRadius: 10,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "50dp",
        top: "50dp",
        image: "/images/asp_logo.png",
        id: "__alloyId523"
    });
    $.__views.main.add($.__views.__alloyId523);
    $.__views.username = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
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
        borderWidth: "1px",
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
        borderRadius: 5,
        backgroundColor: "#CC2228",
        title: "Login",
        width: "70%",
        top: 20,
        height: 40,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.loginAccountButton);
    doLogin ? $.addListener($.__views.loginAccountButton, "touchend", doLogin) : __defers["$.__views.loginAccountButton!touchend!doLogin"] = true;
    $.__views.registerAccountButton = Ti.UI.createButton({
        id: "registerAccountButton",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Register for ASP",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.registerAccountButton);
    doASPSignup ? $.addListener($.__views.registerAccountButton, "touchend", doASPSignup) : __defers["$.__views.registerAccountButton!touchend!doASPSignup"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var singleton = true;
    common.construct($);
    $.username.value = Ti.App.Properties.getString("asp_email") || "";
    var isKeyboardFocus = 0;
    $.aspLoginWin.addEventListener("click", hideProductFormKeyboard);
    $.username.addEventListener("touchend", function(e) {
        $.username.focus();
        isKeyboardFocus = 1;
    });
    $.password.addEventListener("touchend", function(e) {
        $.password.focus();
        isKeyboardFocus = 1;
    });
    $.username.addEventListener("return", function() {
        $.password.focus();
    });
    $.password.addEventListener("return", function() {
        doLogin();
    });
    var nav = require("navigation");
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.aspLoginWin);
    });
    __defers["$.__views.loginAccountButton!touchend!doLogin"] && $.addListener($.__views.loginAccountButton, "touchend", doLogin);
    __defers["$.__views.registerAccountButton!touchend!doASPSignup"] && $.addListener($.__views.registerAccountButton, "touchend", doASPSignup);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;