function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeWin() {
        $.win.close();
    }
    function doSignup() {
        var fullname = $.fullname.value;
        var email = $.email.value;
        var ic_no = $.ic_no.value;
        var password = $.password.value;
        var confirm = $.confirm.value;
        var view_agreement = view_agreement_box.children[0].children[0].checked;
        if ("" == fullname.trim()) {
            common.createAlert("Error", "Please fill in your full name");
            return false;
        }
        if ("" == ic_no.trim()) {
            common.createAlert("Error", "Please fill in your IC number");
            return false;
        }
        if ("" == email.trim()) {
            common.createAlert("Error", "Please fill in your email");
            return false;
        }
        if ("1" != validateEmail(email)) {
            common.createAlert("Error", "Please fill in an valid email");
            return false;
        }
        if ("" == password.trim()) {
            common.createAlert("Error", "Please fill in your password");
            return false;
        }
        if (confirm.trim() != password.trim()) {
            common.createAlert("Error", "Your password are not match");
            return false;
        }
        if ("1" != view_agreement) {
            common.createAlert("Error", "You must agree to all the terms and conditions to register as Plux member.");
            return false;
        }
        loading.start();
        var params = {
            fullname: fullname,
            email: email,
            ic_no: ic_no,
            password: password,
            agreets: view_agreement
        };
        API.do_signup(params, $, function(success) {
            if (success) {
                $.win.close();
                Ti.App.fireEvent("loginAfterRegister", {
                    params: params
                });
            }
            loading.finish();
        });
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "signup";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        navTintColor: "#CE1D1C",
        title: "Plux Signup",
        id: "win",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId305 = Ti.UI.createView({
        top: 0,
        height: 50,
        backgroundColor: "#E8E8E8",
        id: "__alloyId305"
    });
    $.__views.win.add($.__views.__alloyId305);
    $.__views.backButton = Ti.UI.createView({
        left: 0,
        zIndex: 9,
        id: "backButton",
        width: "20%"
    });
    $.__views.__alloyId305.add($.__views.backButton);
    closeWin ? $.addListener($.__views.backButton, "click", closeWin) : __defers["$.__views.backButton!click!closeWin"] = true;
    $.__views.__alloyId306 = Ti.UI.createImageView({
        left: 10,
        width: 25,
        height: 25,
        image: "/images/btn-back.png",
        id: "__alloyId306"
    });
    $.__views.backButton.add($.__views.__alloyId306);
    $.__views.__alloyId307 = Ti.UI.createView({
        id: "__alloyId307"
    });
    $.__views.__alloyId305.add($.__views.__alloyId307);
    $.__views.titleLbl = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        text: "Sign Up PLUX",
        id: "titleLbl",
        textAlign: "center"
    });
    $.__views.__alloyId307.add($.__views.titleLbl);
    $.__views.__alloyId308 = Ti.UI.createView({
        id: "__alloyId308"
    });
    $.__views.win.add($.__views.__alloyId308);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId308.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
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
    $.__views.__alloyId308.add($.__views.main);
    $.__views.__alloyId309 = Ti.UI.createImageView({
        borderRadius: 10,
        width: 120,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "10dp",
        top: "10dp",
        image: "/images/logo_plux.png",
        id: "__alloyId309"
    });
    $.__views.main.add($.__views.__alloyId309);
    $.__views.fullname = Ti.UI.createTextField({
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
        id: "fullname",
        hintText: "Enter Full Name",
        value: ""
    });
    $.__views.main.add($.__views.fullname);
    $.__views.email = Ti.UI.createTextField({
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
        id: "email",
        hintText: "Enter Email",
        value: ""
    });
    $.__views.main.add($.__views.email);
    $.__views.ic_no = Ti.UI.createTextField({
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
        keyboardType: Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        id: "ic_no",
        hintText: "Enter Your IC",
        value: ""
    });
    $.__views.main.add($.__views.ic_no);
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
        bottom: "5dp",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "password",
        hintText: "Enter Password",
        value: ""
    });
    $.__views.main.add($.__views.password);
    $.__views.confirm = Ti.UI.createTextField({
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
        bottom: "5dp",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "confirm",
        hintText: "Enter Confirm Password",
        value: ""
    });
    $.__views.main.add($.__views.confirm);
    $.__views.tc_area = Ti.UI.createView({
        id: "tc_area",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.main.add($.__views.tc_area);
    $.__views.sign_btn = Ti.UI.createButton({
        id: "sign_btn",
        borderRadius: 5,
        backgroundColor: "#CC2228",
        title: "Sign Up",
        width: "60%",
        top: 20,
        height: 40,
        bottom: 20,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.sign_btn);
    doSignup ? $.addListener($.__views.sign_btn, "click", doSignup) : __defers["$.__views.sign_btn!click!doSignup"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.navMenu;
    common.construct($);
    var loading = Alloy.createController("loading");
    var view_agreement_box = common.CheckboxwithText("Agree to all the ", "terms and conditions", {
        name: "agreets"
    }, "tnc");
    $.tc_area.add(view_agreement_box);
    $.win.add(loading.getView());
    __defers["$.__views.backButton!click!closeWin"] && $.addListener($.__views.backButton, "click", closeWin);
    __defers["$.__views.sign_btn!click!doSignup"] && $.addListener($.__views.sign_btn, "click", doSignup);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;