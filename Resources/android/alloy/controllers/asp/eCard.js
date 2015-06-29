function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadPage() {
        var user = usersModel.getOwnerData();
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
            Ti.App.addEventListener("loadPage", loadPage);
            common.showLoading();
            API.doLogin(asp_email, asp_password, $, "refresh");
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
    $.__views.eCardWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        fullscreen: true,
        title: "ASP eCARD",
        backButtonTitle: "",
        layout: "",
        id: "eCardWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.eCardWin && $.addTopLevelView($.__views.eCardWin);
    $.__views.__alloyId78 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId78"
    });
    $.__views.eCardWin.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId80"
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId80.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId79.add($.__views.pageTitle);
    $.__views.__alloyId81 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "ASP eCARD",
        textAlign: "center",
        id: "__alloyId81"
    });
    $.__views.pageTitle.add($.__views.__alloyId81);
    $.__views.mainContainer = Ti.UI.createView({
        id: "mainContainer",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.__alloyId78.add($.__views.mainContainer);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "0",
        width: "120",
        borderRadius: "15",
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
    $.__views.__alloyId82 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId82"
    });
    $.__views.loadingBar.add($.__views.__alloyId82);
    $.__views.card = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "0",
        id: "card"
    });
    $.__views.mainContainer.add($.__views.card);
    $.__views.card_event = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "card_event"
    });
    $.__views.mainContainer.add($.__views.card_event);
    $.__views.unverified = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "80%",
        id: "unverified",
        visible: "false",
        top: "0",
        layout: "vertical"
    });
    $.__views.mainContainer.add($.__views.unverified);
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
        top: "40"
    });
    $.__views.unverified.add($.__views.unveriLbl);
    $.__views.__alloyId83 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "__alloyId83"
    });
    $.__views.unverified.add($.__views.__alloyId83);
    $.__views.__alloyId84 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#CE1D1C",
        left: "0",
        title: "Resend Verification",
        width: "55%",
        top: "10",
        height: "40",
        color: "#ffffff",
        id: "__alloyId84"
    });
    $.__views.__alloyId83.add($.__views.__alloyId84);
    resendVerificationEmail ? $.__views.__alloyId84.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId84!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId85 = Ti.UI.createButton({
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "35%",
        left: "10",
        top: "10",
        height: "40",
        color: "#ffffff",
        id: "__alloyId85"
    });
    $.__views.__alloyId83.add($.__views.__alloyId85);
    checkStatus ? $.__views.__alloyId85.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId85!touchend!checkStatus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var frontbackcounter = 0;
    common.construct($);
    var usersModel = Alloy.createCollection("users");
    var user = usersModel.getOwnerData();
    loadPage();
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
        bottom: "10dp",
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
        top: "125dp",
        left: "20dp",
        zIndex: 12,
        font: {
            fontSize: "11dp"
        },
        color: "#ffffff"
    });
    var ic_text = Ti.UI.createLabel({
        text: user.ic,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "125dp",
        right: "20dp",
        zIndex: 12,
        font: {
            fontSize: "11dp"
        },
        color: "#ffffff"
    });
    var front_bg = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "/eCard-front.png",
        currentAngle: 10,
        font: {
            fontSize: "11dp"
        },
        zIndex: 11,
        top: 0
    });
    front.add(front_bg);
    front.add(name_text);
    front.add(ic_text);
    front.add(memno_text);
    var back = Ti.UI.createImageView({
        name: "back",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "/eCard-back.png",
        currentAngle: 10,
        top: 0
    });
    $.card.add(back);
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
        var t;
        if (frontbackcounter % 2 == 0) {
            t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
            $.card.animate({
                view: back,
                transition: t
            });
        } else {
            t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
            $.card.animate({
                view: front,
                transition: t
            });
        }
        frontbackcounter++;
    });
    Ti.Gesture.addEventListener("orientationchange", function() {
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
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.eCardWin);
    });
    __defers["$.__views.__alloyId84!touchend!resendVerificationEmail"] && $.__views.__alloyId84.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId85!touchend!checkStatus"] && $.__views.__alloyId85.addEventListener("touchend", checkStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;