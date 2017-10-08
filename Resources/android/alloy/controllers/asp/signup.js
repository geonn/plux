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
        var memno = $.memno.value;
        var empno = $.empno.value;
        var params = {
            memno: memno,
            empno: empno
        };
        API.do_asp_presignup(params, $);
    }
    function hideProductFormKeyboard(e) {
        var exception = [ "email", "password", "name", "memno", "empno", "mobileno" ];
        if (exception.indexOf(e.source.id) >= 0) {
            console.log(e.source.id);
            return false;
        }
        $.memno.blur();
        $.empno.blur();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/signup";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.aspSignUpWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        navTintColor: "#CE1D1C",
        title: "ASP Signup",
        id: "aspSignUpWin",
        layout: "vertical"
    });
    $.__views.aspSignUpWin && $.addTopLevelView($.__views.aspSignUpWin);
    $.__views.__alloyId565 = Ti.UI.createView({
        top: 0,
        height: 50,
        backgroundColor: "#DEDEDE",
        id: "__alloyId565"
    });
    $.__views.aspSignUpWin.add($.__views.__alloyId565);
    $.__views.btnBack = Ti.UI.createView({
        left: 0,
        zIndex: 9,
        id: "btnBack",
        width: "20%"
    });
    $.__views.__alloyId565.add($.__views.btnBack);
    $.__views.__alloyId566 = Ti.UI.createImageView({
        left: 10,
        width: 25,
        height: 25,
        image: "/images/btn-back.png",
        id: "__alloyId566"
    });
    $.__views.btnBack.add($.__views.__alloyId566);
    $.__views.__alloyId567 = Ti.UI.createView({
        id: "__alloyId567"
    });
    $.__views.__alloyId565.add($.__views.__alloyId567);
    $.__views.titleLbl = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        text: "ASP Sign Up",
        id: "titleLbl",
        textAlign: "center"
    });
    $.__views.__alloyId567.add($.__views.titleLbl);
    $.__views.__alloyId568 = Ti.UI.createView({
        id: "__alloyId568"
    });
    $.__views.aspSignUpWin.add($.__views.__alloyId568);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId568.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.main = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        id: "main",
        layout: "vertical"
    });
    $.__views.__alloyId568.add($.__views.main);
    $.__views.__alloyId569 = Ti.UI.createImageView({
        width: 120,
        borderRadius: 10,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "20dp",
        top: "20dp",
        image: "/images/asp_logo.png",
        id: "__alloyId569"
    });
    $.__views.main.add($.__views.__alloyId569);
    $.__views.memno = Ti.UI.createTextField({
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
        id: "memno",
        hintText: "Enter Member Number or IC Number",
        value: ""
    });
    $.__views.main.add($.__views.memno);
    $.__views.empno = Ti.UI.createTextField({
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
        id: "empno",
        hintText: "Enter Employee Number",
        value: ""
    });
    $.__views.main.add($.__views.empno);
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
    Alloy.Globals.navMenu;
    common.construct($);
    $.aspSignUpWin.addEventListener("click", hideProductFormKeyboard);
    $.btnBack.addEventListener("click", function() {
        $.aspSignUpWin.close();
    });
    __defers["$.__views.asp_sign_btn!click!doAspSignup"] && $.addListener($.__views.asp_sign_btn, "click", doAspSignup);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;