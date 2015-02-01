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
        if (singleton) {
            singleton = false;
            lib_login.doLogin(username, password, $, args.target);
        }
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
    $.__views.login = Ti.UI.createWindow({
        fullscreen: true,
        backgroundColor: "#ffffff",
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        id: "login",
        title: "Login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        height: "95%"
    });
    $.__views.login.add($.__views.main);
    $.__views.__alloyId163 = Ti.UI.createImageView({
        width: "50%",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "50dp",
        top: "50dp",
        image: "appicon-76@2x.png",
        id: "__alloyId163"
    });
    $.__views.main.add($.__views.__alloyId163);
    $.__views.username = Ti.UI.createTextField({
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
        id: "username",
        hintText: "Enter Username"
    });
    $.__views.main.add($.__views.username);
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
        hintText: "Enter Password"
    });
    $.__views.main.add($.__views.password);
    $.__views.loginAccountButton = Ti.UI.createButton({
        id: "loginAccountButton",
        borderRadius: "15",
        backgroundColor: "#CC2228",
        title: "Login",
        width: "90%",
        top: "20",
        height: "60",
        color: "#ffffff"
    });
    $.__views.main.add($.__views.loginAccountButton);
    doLogin ? $.__views.loginAccountButton.addEventListener("touchend", doLogin) : __defers["$.__views.loginAccountButton!touchend!doLogin"] = true;
    $.__views.footer = Ti.UI.createView({
        bottom: 0,
        left: "10dp",
        height: Titanium.UI.SIZE,
        id: "footer",
        layout: "horizontal"
    });
    $.__views.login.add($.__views.footer);
    $.__views.__alloyId164 = Ti.UI.createLabel({
        font: {
            fontSize: "11dp"
        },
        height: Titanium.UI.SIZE,
        color: "#808080",
        text: "ASPplux",
        id: "__alloyId164"
    });
    $.__views.footer.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createLabel({
        font: {
            fontSize: "11dp"
        },
        height: Titanium.UI.SIZE,
        color: "#808080",
        text: "|",
        id: "__alloyId165"
    });
    $.__views.footer.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createLabel({
        font: {
            fontSize: "11dp"
        },
        height: Titanium.UI.SIZE,
        color: "#808080",
        text: "Privacy & Terms",
        id: "__alloyId166"
    });
    $.__views.footer.add($.__views.__alloyId166);
    $.__views.__alloyId167 = Ti.UI.createLabel({
        font: {
            fontSize: "11dp"
        },
        height: Titanium.UI.SIZE,
        color: "#808080",
        text: "|",
        id: "__alloyId167"
    });
    $.__views.footer.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createLabel({
        font: {
            fontSize: "11dp"
        },
        height: Titanium.UI.SIZE,
        color: "#808080",
        text: "Help",
        id: "__alloyId168"
    });
    $.__views.footer.add($.__views.__alloyId168);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Alloy.Globals.navMenu;
    var singleton = true;
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