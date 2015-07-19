function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function submitPassword() {
        common.showLoading();
        var password = $.password.value;
        var confirm = $.password2.value;
        if ("" == password.trim()) {
            common.createAlert("Error", "Please fill in your password");
            return false;
        }
        if (confirm.trim() != password.trim()) {
            common.createAlert("Error", "Your password are not match");
            return false;
        }
        var params = {
            username: loginId,
            password: password
        };
        API.doChangePassword(params, $);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/changePassword";
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
    $.__views.changePasswordWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        navTintColor: "#CE1D1C",
        id: "changePasswordWin",
        title: "Login",
        layout: "vertical"
    });
    $.__views.changePasswordWin && $.addTopLevelView($.__views.changePasswordWin);
<<<<<<< HEAD
    $.__views.__alloyId98 = Ti.UI.createView({
        id: "__alloyId98"
    });
    $.__views.changePasswordWin.add($.__views.__alloyId98);
=======
    $.__views.__alloyId99 = Ti.UI.createView({
        id: "__alloyId99"
    });
    $.__views.changePasswordWin.add($.__views.__alloyId99);
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
    $.__views.__alloyId98.add($.__views.loadingBar);
=======
    $.__views.__alloyId99.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId99 = Ti.UI.createLabel({
=======
    $.__views.__alloyId100 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId99"
    });
    $.__views.loadingBar.add($.__views.__alloyId99);
=======
        id: "__alloyId100"
    });
    $.__views.loadingBar.add($.__views.__alloyId100);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId98.add($.__views.main);
    $.__views.__alloyId100 = Ti.UI.createImageView({
=======
    $.__views.__alloyId99.add($.__views.main);
    $.__views.__alloyId101 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "40%",
        borderRadius: "10",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId100"
    });
    $.__views.main.add($.__views.__alloyId100);
=======
        id: "__alloyId101"
    });
    $.__views.main.add($.__views.__alloyId101);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        color: "#6E6E6E",
        bottom: "10dp",
        textAlign: "center",
        font: {
            fontSize: "12dp"
        },
        id: "description"
    });
    $.__views.main.add($.__views.description);
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
    $.__views.password2 = Ti.UI.createTextField({
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
        id: "password2",
        hintText: "Enter Confirm Password",
        top: "10",
        value: ""
    });
    $.__views.main.add($.__views.password2);
<<<<<<< HEAD
    $.__views.__alloyId101 = Ti.UI.createButton({
=======
    $.__views.__alloyId102 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Change Password",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId101"
    });
    $.__views.main.add($.__views.__alloyId101);
    submitPassword ? $.__views.__alloyId101.addEventListener("touchend", submitPassword) : __defers["$.__views.__alloyId101!touchend!submitPassword"] = true;
=======
        id: "__alloyId102"
    });
    $.__views.main.add($.__views.__alloyId102);
    submitPassword ? $.__views.__alloyId102.addEventListener("touchend", submitPassword) : __defers["$.__views.__alloyId102!touchend!submitPassword"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var loginId = Ti.App.Properties.getString("asp_email");
    $.description.text = "You are about to change password for " + loginId;
<<<<<<< HEAD
    __defers["$.__views.__alloyId101!touchend!submitPassword"] && $.__views.__alloyId101.addEventListener("touchend", submitPassword);
=======
    __defers["$.__views.__alloyId102!touchend!submitPassword"] && $.__views.__alloyId102.addEventListener("touchend", submitPassword);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;