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
        var lib_login = require("login");
        var username = $.username.value;
        var password = $.password.value;
        if ("" == username || "" == password) {
            common.createAlert("Authentication warning", "Please fill in username and password");
            return;
        }
        lib_login.doLogin(username, password);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
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
    $.__views.root = Ti.UI.createWindow({
        backgroundColor: "#CC2228",
        layout: "vertical",
        width: Ti.UI.FILL,
        fullscreen: true,
        id: "root",
        title: "",
        navBarHidden: "true"
    });
    $.__views.root && $.addTopLevelView($.__views.root);
    $.__views.__alloyId38 = Ti.UI.createView({
        height: "95%",
        id: "__alloyId38"
    });
    $.__views.root.add($.__views.__alloyId38);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        height: "95%"
    });
    $.__views.__alloyId38.add($.__views.main);
    $.__views.loginScrollView = Ti.UI.createScrollView({
        layout: "vertical",
        showVerticalScrollIndicator: "true",
        id: "loginScrollView",
        showHorizontalScrollIndicator: "true",
        height: "260",
        width: "100%"
    });
    $.__views.main.add($.__views.loginScrollView);
    $.__views.username = Ti.UI.createTextField({
        font: {
            fontSize: "14dp"
        },
        color: "#000000",
        backgroundColor: "#CE1D1C",
        width: "90%",
        height: "35dp",
        bottom: 5,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "username",
        hintText: "Enter Username"
    });
    $.__views.loginScrollView.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        passwordMask: true,
        font: {
            fontSize: "14dp"
        },
        color: "#000000",
        backgroundColor: "#CE1D1C",
        width: "90%",
        height: "35dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "password",
        hintText: "Enter Password"
    });
    $.__views.loginScrollView.add($.__views.password);
    $.__views.loginAccountButton = Ti.UI.createButton({
        id: "loginAccountButton",
        borderRadius: "3",
        backgroundColor: "#ffffff",
        title: "Sign In",
        width: "90%",
        top: "20",
        height: "40",
        color: "#807C7C"
    });
    $.__views.main.add($.__views.loginAccountButton);
    doLogin ? $.__views.loginAccountButton.addEventListener("touchend", doLogin) : __defers["$.__views.loginAccountButton!touchend!doLogin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.navMenu;
    var isKeyboardFocus = 0;
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;