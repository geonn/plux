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
            common.hideLoading();
            common.createAlert("Error", "Please fill in your password");
            return false;
        }
        if (confirm.trim() != password.trim()) {
            common.hideLoading();
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
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "0",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.changePasswordWin.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId207 = Ti.UI.createLabel({
=======
    $.__views.__alloyId213 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId207"
    });
    $.__views.loadingBar.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId208"
    });
    $.__views.changePasswordWin.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createView({
=======
        id: "__alloyId213"
    });
    $.__views.loadingBar.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId214"
    });
    $.__views.changePasswordWin.add($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId209"
    });
    $.__views.__alloyId208.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId210"
    });
    $.__views.__alloyId209.add($.__views.__alloyId210);
=======
        id: "__alloyId215"
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId216"
    });
    $.__views.__alloyId215.add($.__views.__alloyId216);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId210.add($.__views.btnBack);
=======
    $.__views.__alloyId216.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId209.add($.__views.pageTitle);
    $.__views.__alloyId211 = Ti.UI.createLabel({
=======
    $.__views.__alloyId215.add($.__views.pageTitle);
    $.__views.__alloyId217 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Change Password",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId211"
    });
    $.__views.pageTitle.add($.__views.__alloyId211);
=======
        id: "__alloyId217"
    });
    $.__views.pageTitle.add($.__views.__alloyId217);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId208.add($.__views.main);
    $.__views.__alloyId212 = Ti.UI.createImageView({
=======
    $.__views.__alloyId214.add($.__views.main);
    $.__views.__alloyId218 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "120",
        borderRadius: "10",
        height: "120",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId212"
    });
    $.__views.main.add($.__views.__alloyId212);
=======
        id: "__alloyId218"
    });
    $.__views.main.add($.__views.__alloyId218);
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
    $.__views.__alloyId213 = Ti.UI.createButton({
=======
    $.__views.__alloyId219 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Change Password",
        width: "70%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId213"
    });
    $.__views.main.add($.__views.__alloyId213);
    submitPassword ? $.addListener($.__views.__alloyId213, "touchend", submitPassword) : __defers["$.__views.__alloyId213!touchend!submitPassword"] = true;
=======
        id: "__alloyId219"
    });
    $.__views.main.add($.__views.__alloyId219);
    submitPassword ? $.addListener($.__views.__alloyId219, "touchend", submitPassword) : __defers["$.__views.__alloyId219!touchend!submitPassword"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var loginId = Ti.App.Properties.getString("asp_email");
    $.description.text = "You are about to change password for " + loginId;
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.changePasswordWin);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId213!touchend!submitPassword"] && $.addListener($.__views.__alloyId213, "touchend", submitPassword);
=======
    __defers["$.__views.__alloyId219!touchend!submitPassword"] && $.addListener($.__views.__alloyId219, "touchend", submitPassword);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;