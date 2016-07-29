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
        var win = Alloy.createController("signup").getView();
        win.open();
    }
    function doASPSignup() {
        var win = Alloy.createController("asp/signup").getView();
        win.open();
    }
    function loginFacebook(e) {
        if (e.success) {
            loading.start();
            FACEBOOK.requestWithGraphPath("me", {
                fields: "id, email,name,link"
            }, "GET", function(e) {
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
        } else e.error ? loading.finish() : e.cancelled && loading.finish();
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        navTintColor: "#CE1D1C",
        title: "Login",
        id: "win",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId163 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId163"
    });
    $.__views.win.add($.__views.__alloyId163);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId163.add($.__views.pageTitle);
    $.__views.__alloyId164 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Login",
        textAlign: "center",
        id: "__alloyId164"
    });
    $.__views.pageTitle.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createView({
        id: "__alloyId165"
    });
    $.__views.win.add($.__views.__alloyId165);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId165.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
    $.__views.__alloyId165.add($.__views.main);
    $.__views.__alloyId166 = Ti.UI.createImageView({
        width: 120,
        borderRadius: 10,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/logo_plux.png",
        id: "__alloyId166"
    });
    $.__views.main.add($.__views.__alloyId166);
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
    $.__views.fbloginView = Ti.UI.createView({
        height: 60,
        id: "fbloginView",
        width: "70%"
    });
    $.__views.main.add($.__views.fbloginView);
    $.__views.registerAccountButton = Ti.UI.createButton({
        id: "registerAccountButton",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Register for PLUX",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.registerAccountButton);
    doSignup ? $.addListener($.__views.registerAccountButton, "touchend", doSignup) : __defers["$.__views.registerAccountButton!touchend!doSignup"] = true;
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
    arguments[0] || {};
    var singleton = true;
    console.log("login");
    common.construct($);
    var usersPluxModel = Alloy.createCollection("users_plux");
    var preset_email = Ti.App.Properties.getString("plux_email") || "";
    var loading = Alloy.createController("loading");
    $.email.value = preset_email;
    $.win.add(loading.getView());
    var isKeyboardFocus = 0;
    $.win.addEventListener("click", hideProductFormKeyboard);
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
    $.win.fbProxy = FACEBOOK.createActivityWorker({
        lifecycleContainer: $.win
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
            $.win.close();
            if ("undefined" == typeof Alloy.Globals.navMenu) {
                var win = Alloy.createController("home").getView();
                win.open();
            }
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
    $.win.addEventListener("android:back", function() {
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
<<<<<<< HEAD
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("touchLogin", touchLogin);
        Ti.App.removeEventListener("loginAfterRegister", loginAfterRegister);
        $.destroy();
        console.log("window close");
    });
=======
>>>>>>> origin/master
    __defers["$.__views.loginAccountButton!touchend!doLogin"] && $.addListener($.__views.loginAccountButton, "touchend", doLogin);
    __defers["$.__views.registerAccountButton!touchend!doSignup"] && $.addListener($.__views.registerAccountButton, "touchend", doSignup);
    __defers["$.__views.registerAccountButton!touchend!doASPSignup"] && $.addListener($.__views.registerAccountButton, "touchend", doASPSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;