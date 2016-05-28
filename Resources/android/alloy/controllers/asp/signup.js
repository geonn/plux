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
        common.showLoading();
        var email = $.email.value;
        var email2 = $.email2.value;
        var password = $.password.value;
        var name = $.email.value;
        var memno = $.memno.value;
        var empno = $.empno.value;
        var mobileno = $.mobileno.value;
        var view_agreement = view_agreement_box.children[0].children[0].checked;
        if ("1" != view_agreement) {
            common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP Plux member.");
            return false;
        }
        var params = {
            email: email,
            email2: email2,
            password: password,
            name: name,
            memno: memno,
            empno: empno,
            mobileno: mobileno,
            agreets: view_agreement
        };
        API.do_asp_signup(params, $);
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
    $.__views.aspSignUpWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        navTintColor: "#CE1D1C",
        title: "ASP Signup",
        id: "aspSignUpWin",
        layout: "vertical"
    });
    $.__views.aspSignUpWin && $.addTopLevelView($.__views.aspSignUpWin);
    $.__views.__alloyId500 = Ti.UI.createView({
        id: "__alloyId500"
    });
    $.__views.aspSignUpWin.add($.__views.__alloyId500);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId500.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId501 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId501"
    });
    $.__views.__alloyId500.add($.__views.__alloyId501);
    $.__views.__alloyId502 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId502"
    });
    $.__views.__alloyId501.add($.__views.__alloyId502);
    $.__views.__alloyId503 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId503"
    });
    $.__views.__alloyId502.add($.__views.__alloyId503);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId503.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId502.add($.__views.pageTitle);
    $.__views.__alloyId504 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "ASP Sign Up",
        textAlign: "center",
        id: "__alloyId504"
    });
    $.__views.pageTitle.add($.__views.__alloyId504);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
    $.__views.__alloyId501.add($.__views.main);
    $.__views.__alloyId505 = Ti.UI.createImageView({
        width: 120,
        borderRadius: 10,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "20dp",
        top: "20dp",
        image: "/images/asp_logo.png",
        id: "__alloyId505"
    });
    $.__views.main.add($.__views.__alloyId505);
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
    $.__views.email2 = Ti.UI.createTextField({
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
        id: "email2",
        hintText: "Secondary Email (Optional)",
        value: ""
    });
    $.__views.main.add($.__views.email2);
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
    $.__views.name = Ti.UI.createTextField({
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
        id: "name",
        hintText: "Enter Name",
        value: ""
    });
    $.__views.main.add($.__views.name);
    $.__views.memno = Ti.UI.createTextField({
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
        id: "memno",
        hintText: "Enter Member Number",
        value: ""
    });
    $.__views.main.add($.__views.memno);
    $.__views.empno = Ti.UI.createTextField({
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
        id: "empno",
        hintText: "Enter Employee Number",
        value: ""
    });
    $.__views.main.add($.__views.empno);
    $.__views.mobileno = Ti.UI.createTextField({
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
        id: "mobileno",
        hintText: "Enter Mobile Number",
        value: ""
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
        borderRadius: 5,
        backgroundColor: "#CC2228",
        title: "Sign Up",
        width: "70%",
        top: 20,
        height: 40,
        bottom: 20,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.asp_sign_btn);
    doAspSignup ? $.addListener($.__views.asp_sign_btn, "click", doAspSignup) : __defers["$.__views.asp_sign_btn!click!doAspSignup"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var nav = Alloy.Globals.navMenu;
    common.construct($);
    var view_agreement_box = common.CheckboxwithText("I have read and agree to the ", "Privacy Policy", {
        name: "agreets"
    }, "https://www.asp-medical-clinic.com.my/EmployeeReg.aspx");
    var preset_email = Ti.App.Properties.getString("plux_email") || "";
    var preset_password = Ti.App.Properties.getString("plux_password") || "";
    $.email.value = preset_email;
    $.email.password = preset_password;
    $.tc_area.add(view_agreement_box);
    $.aspSignUpWin.addEventListener("click", hideProductFormKeyboard);
    var nav = require("navigation");
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.aspSignUpWin);
    });
    __defers["$.__views.asp_sign_btn!click!doAspSignup"] && $.addListener($.__views.asp_sign_btn, "click", doAspSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;