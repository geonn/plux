function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doAspSignup() {
        var email = $.email.value;
        var password = $.password.value;
        var name = $.email.value;
        var memno = $.memno.value;
        var empno = $.empno.value;
        var mobileno = $.mobileno.value;
        var view_sms = view_sms_box.children[0].children[0].checked;
        var view_agreement = view_agreement_box.children[0].children[0].checked;
        var params = {
            email: email,
            password: password,
            name: name,
            memno: memno,
            empno: empno,
            mobileno: mobileno,
            smsme: view_sms,
            agreets: view_agreement
        };
        console.log(params);
        API.do_asp_signup(params);
    }
    function hideProductFormKeyboard(e) {
        var exception = [ "email", "password", "name", "memno", "empno", "mobileno" ];
        if (exception.indexOf(e.source.id) >= 0) {
            console.log(e.source.id);
            return false;
        }
        $.email.blur();
        $.password.blur();
        $.name.blur();
        $.memno.blur();
        $.empno.blur();
        $.mobileno.blur();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/signup";
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
        title: "ASP Signup",
        layout: "vertical"
    });
    $.__views.loginWin && $.addTopLevelView($.__views.loginWin);
<<<<<<< HEAD
    $.__views.__alloyId92 = Ti.UI.createView({
        id: "__alloyId92"
    });
    $.__views.loginWin.add($.__views.__alloyId92);
=======
    $.__views.__alloyId90 = Ti.UI.createView({
        id: "__alloyId90"
    });
    $.__views.loginWin.add($.__views.__alloyId90);
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
    $.__views.__alloyId92.add($.__views.loadingBar);
=======
    $.__views.__alloyId90.add($.__views.loadingBar);
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
    $.__views.__alloyId93 = Ti.UI.createLabel({
=======
    $.__views.__alloyId91 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId93"
    });
    $.__views.loadingBar.add($.__views.__alloyId93);
=======
        id: "__alloyId91"
    });
    $.__views.loadingBar.add($.__views.__alloyId91);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId92.add($.__views.main);
    $.__views.__alloyId94 = Ti.UI.createImageView({
=======
    $.__views.__alloyId90.add($.__views.main);
    $.__views.__alloyId92 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "50%",
        height: Ti.UI.SIZE,
        backgroundColor: "#ff0000",
        bottom: "20dp",
        top: "20dp",
        image: "appicon-76@2x.png",
<<<<<<< HEAD
        id: "__alloyId94"
    });
    $.__views.main.add($.__views.__alloyId94);
=======
        id: "__alloyId92"
    });
    $.__views.main.add($.__views.__alloyId92);
>>>>>>> origin/master
    $.__views.email = Ti.UI.createTextField({
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
        id: "email",
        hintText: "Enter Email",
        value: "wongbh@live.com"
    });
    $.__views.main.add($.__views.email);
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
        bottom: "5dp",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "password",
        hintText: "Enter Password",
        value: "12345678"
    });
    $.__views.main.add($.__views.password);
    $.__views.name = Ti.UI.createTextField({
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
        id: "name",
        hintText: "Enter Name",
        value: "Wong Bee Heap"
    });
    $.__views.main.add($.__views.name);
    $.__views.memno = Ti.UI.createTextField({
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
        id: "memno",
        hintText: "Enter Member Number",
        value: "AGIL00012"
    });
    $.__views.main.add($.__views.memno);
    $.__views.empno = Ti.UI.createTextField({
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
        id: "empno",
        hintText: "Enter Employee Number",
        value: "00012"
    });
    $.__views.main.add($.__views.empno);
    $.__views.mobileno = Ti.UI.createTextField({
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
        id: "mobileno",
        hintText: "Enter Mobile Number",
        value: "01298765431"
    });
    $.__views.main.add($.__views.mobileno);
    $.__views.tc_area = Ti.UI.createView({
        id: "tc_area",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.main.add($.__views.tc_area);
    $.__views.asp_sign_btn = Ti.UI.createButton({
        id: "asp_sign_btn",
        borderRadius: "15",
        backgroundColor: "#CC2228",
        title: "Sign Up",
        width: "90%",
        top: "20",
        height: "60",
        bottom: "20",
        color: "#ffffff"
    });
    $.__views.main.add($.__views.asp_sign_btn);
    doAspSignup ? $.__views.asp_sign_btn.addEventListener("click", doAspSignup) : __defers["$.__views.asp_sign_btn!click!doAspSignup"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.navMenu;
    common.construct($);
    var view_sms_box = common.CheckboxwithText("Agree to receive SMS Service", {
        name: "smsme"
    });
    var view_agreement_box = common.CheckboxwithText("Agree to all the terms and conditions", {
        name: "agreets"
    });
    console.log(view_sms_box.children[0].children[0].name);
    console.log(view_agreement_box.children[0].children[0].name);
    $.tc_area.add(view_sms_box);
    $.tc_area.add(view_agreement_box);
    $.loginWin.addEventListener("click", hideProductFormKeyboard);
    __defers["$.__views.asp_sign_btn!click!doAspSignup"] && $.__views.asp_sign_btn.addEventListener("click", doAspSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;