function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        var user = usersModel.getOwnerData(u_id);
        if ("true" == user.isver) {
            $.unverified.hide();
            $.card.opacity = "1";
        } else {
            var t1 = Ti.UI.create2DMatrix({
                rotate: 335
            });
            var a1 = Ti.UI.createAnimation();
            a1.transform = t1;
            $.unveriLbl.animate(a1);
            $.unverified.show();
            $.card.opacity = "0.1";
        }
    }
    function checkStatus() {
        var asp_email = Ti.App.Properties.getString("asp_email");
        var asp_password = Ti.App.Properties.getString("asp_password");
        if (asp_email) {
            Ti.App.addEventListener("loadPage", init);
            common.showLoading();
            API.doLogin(asp_email, asp_password, $, "refresh");
        }
    }
    function rotate_box(view_selected, back2front) {
        var m_front_to_back;
        var matrix2d = Ti.UI.create2DMatrix();
        var m_front_to_back = matrix2d.scale(0);
        var a_front_to_back = Ti.UI.createAnimation({
            transform: m_front_to_back,
            duration: 200,
            box: view_selected
        });
        view_selected.animate(a_front_to_back);
        a_front_to_back.addEventListener("complete", function() {
            Ti.API.info("showFront: Animating the back to the front.");
            a_front_to_back.removeEventListener("complete", function() {});
            var m_front_to_back;
            var matrix2d = Ti.UI.create2DMatrix();
            var m_front_to_back = matrix2d.scale(1);
            var a_back_to_front = Ti.UI.createAnimation({
                transform: m_front_to_back,
                duration: 200,
                curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
            });
            var back = Ti.UI.createImageView({
                name: "back",
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                image: "/images/eCard-back.png",
                currentAngle: 10,
                top: 0
            });
            back2front ? view_selected.remove(view_selected.children[1]) : view_selected.add(back);
            view_selected.animate(a_back_to_front);
        });
    }
    function orientationchange() {
        Ti.API.info("Ti.Platform.displayCaps.platformHeight: " + Ti.Platform.displayCaps.platformHeight);
        Ti.API.info("Ti.Platform.displayCaps.platformWidth: " + Ti.Platform.displayCaps.platformWidth);
        if (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) {
            name_text.top = "160dp";
            name_text.left = "80dp";
            memno_text.top = "125dp";
            memno_text.left = "80dp";
        } else {
            name_text.top = "125dp";
            name_text.left = "20dp";
            memno_text.top = "90dp";
            memno_text.left = "20dp";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/eCard";
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
    $.__views.eCard = Ti.UI.createWindow({
        backgroundColor: "#fff",
        fullscreen: true,
        title: "ASP eCARD",
        backButtonTitle: "",
        layout: "",
        id: "eCard",
        navTintColor: "#CE1D1C"
    });
    $.__views.eCard && $.addTopLevelView($.__views.eCard);
    $.__views.mainContainer = Ti.UI.createView({
        id: "mainContainer",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.eCard.add($.__views.mainContainer);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.mainContainer.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId444 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        text: "Loading",
        id: "__alloyId444"
    });
    $.__views.loadingBar.add($.__views.__alloyId444);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.mainContainer.add($.__views.main);
    $.__views.__alloyId445 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId445"
    });
    $.__views.main.add($.__views.__alloyId445);
    $.__views.__alloyId446 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId446"
    });
    $.__views.__alloyId445.add($.__views.__alloyId446);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId446.add($.__views.btnBack);
    $.__views.__alloyId447 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId447"
    });
    $.__views.__alloyId445.add($.__views.__alloyId447);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "ASP eCARD",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId447.add($.__views.pageTitle);
    $.__views.card = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: 0,
        id: "card"
    });
    $.__views.main.add($.__views.card);
    $.__views.qrCode = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        bottom: 50,
        id: "qrCode"
    });
    $.__views.main.add($.__views.qrCode);
    $.__views.unverified = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "80%",
        id: "unverified",
        visible: false,
        top: 0,
        layout: "vertical"
    });
    $.__views.main.add($.__views.unverified);
    $.__views.unveriLbl = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "80dp",
        color: "#CE1D1C",
        bottom: "10dp",
        textAlign: "center",
        font: {
            fontWeight: "bold",
            fontSize: "14dp"
        },
        text: "You need to verify your account in order to use eCard.",
        id: "unveriLbl",
        top: 40
    });
    $.__views.unverified.add($.__views.unveriLbl);
    $.__views.__alloyId448 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "__alloyId448"
    });
    $.__views.unverified.add($.__views.__alloyId448);
    $.__views.__alloyId449 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#CE1D1C",
        left: 0,
        title: "Resend Verification",
        width: "55%",
        top: 10,
        height: 40,
        color: "#ffffff",
        id: "__alloyId449"
    });
    $.__views.__alloyId448.add($.__views.__alloyId449);
    resendVerificationEmail ? $.addListener($.__views.__alloyId449, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId449!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId450 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "35%",
        left: 10,
        top: 10,
        height: 40,
        color: "#ffffff",
        id: "__alloyId450"
    });
    $.__views.__alloyId448.add($.__views.__alloyId450);
    checkStatus ? $.addListener($.__views.__alloyId450, "touchend", checkStatus) : __defers["$.__views.__alloyId450!touchend!checkStatus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var u_id = args.u_id || 0;
    var frontbackcounter = 0;
    common.construct($);
    var usersModel = Alloy.createCollection("users");
    var user = usersModel.getOwnerData(u_id);
    var qrcode = require("qrcode");
    init();
    var front = Ti.UI.createView({
        name: "front",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 0,
        currentAngle: 10
    });
    var memno_text = Ti.UI.createLabel({
        text: user.memno,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "105dp",
        left: "20dp",
        zIndex: 12,
        font: {
            fontSize: "14dp"
        },
        color: "#ffffff"
    });
    var name_text = Ti.UI.createLabel({
        text: user.name,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "90dp",
        left: "20dp",
        zIndex: 12,
        font: {
            fontSize: "14dp"
        },
        color: "#ffffff"
    });
    Ti.UI.createLabel({
        text: user.ic,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "125dp",
        right: "20dp",
        zIndex: 12,
        font: {
            fontSize: "14dp"
        },
        color: "#ffffff"
    });
    var front_bg = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "/images/eCard-front.png",
        font: {
            fontSize: "11dp"
        },
        zIndex: 11,
        top: 0,
        bottom: 10
    });
    front.add(front_bg);
    front.add(name_text);
    front.add(memno_text);
    Ti.UI.createImageView({
        name: "back",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "/images/eCard-back.png",
        currentAngle: 10,
        top: 0
    });
    user.icno || "";
    var genCode = setInterval(function() {
        var dateTimeNow = currentDateTime();
        var userQR = qrcode.QRCode({
            typeNumber: 10,
            errorCorrectLevel: "M"
        });
        var qrcodeView = userQR.createQRCodeView({
            width: 200,
            height: 200,
            margin: 4,
            text: user.name + "||" + user.id + "||" + user.icno + "||" + user.memno + "||" + user.empno + "||" + user.relation + "||" + user.corpcode + "||" + user.corpname + "||" + user.costcenter + "||" + user.dept + "||" + user.allergy + "||" + user.isver + "||" + user.verno + "||" + dateTimeNow + "||" + Ti.App.Properties.getString("cardno")
        });
        $.qrCode.removeAllChildren();
        $.qrCode.add(qrcodeView);
    }, 1e3);
    $.card.add(front);
    var cover = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#ffffff",
        opacity: "0.5",
        zIndex: 100,
        top: 0
    });
    $.mainContainer.add(cover);
    $.card.addEventListener("click", function() {
        console.log("card events");
        frontbackcounter % 2 == 0 ? rotate_box($.card, frontbackcounter % 2) : rotate_box($.card, frontbackcounter % 2);
        frontbackcounter++;
    });
    Ti.Gesture.addEventListener("orientationchange", orientationchange);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.eCard);
    });
    $.eCard.addEventListener("close", function() {
        console.log("close ecard");
        Ti.Gesture.removeEventListener("orientationchange", orientationchange);
        clearInterval(genCode);
    });
    __defers["$.__views.__alloyId449!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId449, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId450!touchend!checkStatus"] && $.addListener($.__views.__alloyId450, "touchend", checkStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;