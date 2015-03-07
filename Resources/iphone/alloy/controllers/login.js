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
            console.log("login action");
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
<<<<<<< HEAD
    $.__views.__alloyId165 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
    $.__views.__alloyId202 = Ti.UI.createImageView({
=======
    $.__views.__alloyId164 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: "50%",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "50dp",
        top: "50dp",
        image: "appicon-76@2x.png",
<<<<<<< HEAD
        id: "__alloyId165"
    });
    $.__views.main.add($.__views.__alloyId165);
=======
<<<<<<< HEAD
        id: "__alloyId202"
    });
    $.__views.main.add($.__views.__alloyId202);
=======
        id: "__alloyId164"
    });
    $.__views.main.add($.__views.__alloyId164);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId166 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
    $.__views.__alloyId203 = Ti.UI.createLabel({
        font: {
            fontSize: "11dp"
        },
        height: Titanium.UI.SIZE,
        color: "#808080",
        text: "ASPplux",
        id: "__alloyId203"
    });
    $.__views.footer.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createLabel({
=======
    $.__views.__alloyId165 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        font: {
            fontSize: "11dp"
        },
        height: Titanium.UI.SIZE,
        color: "#808080",
<<<<<<< HEAD
        text: "|",
        id: "__alloyId204"
=======
        text: "ASPplux",
        id: "__alloyId165"
>>>>>>> FETCH_HEAD
    });
    $.__views.footer.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createLabel({
>>>>>>> origin/master
        font: {
            fontSize: "11dp"
        },
        color: "#808080",
<<<<<<< HEAD
        text: "ASPplux",
=======
<<<<<<< HEAD
        text: "Privacy & Terms",
        id: "__alloyId205"
=======
        text: "|",
>>>>>>> origin/master
        id: "__alloyId166"
>>>>>>> FETCH_HEAD
    });
<<<<<<< HEAD
    $.__views.footer.add($.__views.__alloyId166);
    $.__views.__alloyId167 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
=======
    $.__views.footer.add($.__views.__alloyId205);
    $.__views.__alloyId206 = Ti.UI.createLabel({
>>>>>>> origin/master
        font: {
            fontSize: "11dp"
        },
        color: "#808080",
<<<<<<< HEAD
        text: "|",
=======
<<<<<<< HEAD
        text: "|",
        id: "__alloyId206"
=======
        text: "Privacy & Terms",
>>>>>>> origin/master
        id: "__alloyId167"
>>>>>>> FETCH_HEAD
    });
<<<<<<< HEAD
    $.__views.footer.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
=======
    $.__views.footer.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createLabel({
>>>>>>> origin/master
        font: {
            fontSize: "11dp"
        },
        color: "#808080",
<<<<<<< HEAD
        text: "Privacy & Terms",
=======
<<<<<<< HEAD
        text: "Help",
        id: "__alloyId207"
    });
    $.__views.footer.add($.__views.__alloyId207);
=======
        text: "|",
>>>>>>> origin/master
        id: "__alloyId168"
    });
    $.__views.footer.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "11dp"
        },
        color: "#808080",
        text: "|",
        id: "__alloyId169"
    });
    $.__views.footer.add($.__views.__alloyId169);
<<<<<<< HEAD
    $.__views.__alloyId170 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "11dp"
        },
        color: "#808080",
        text: "Help",
        id: "__alloyId170"
    });
    $.__views.footer.add($.__views.__alloyId170);
=======
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
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