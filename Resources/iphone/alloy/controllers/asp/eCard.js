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
        console.log(user.isver);
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
    function rotate_box(view_selected, back2front) {
        if ("android" == Ti.Platform.osname) {
            var matrix2d = Ti.UI.create2DMatrix();
            var m_front_to_back = matrix2d.scale(0);
        } else {
            var m_front_to_back = Ti.UI.create3DMatrix();
            m_front_to_back = m_front_to_back.rotate(-180, 0, 1, 0);
        }
        var a_front_to_back = Ti.UI.createAnimation({
            transform: m_front_to_back,
            duration: 200,
            box: view_selected
        });
        view_selected.animate(a_front_to_back);
        a_front_to_back.addEventListener("complete", function() {
            Ti.API.info("showFront: Animating the back to the front.");
            a_front_to_back.removeEventListener("complete", function() {});
            if ("android" == Ti.Platform.osname) {
                var matrix2d = Ti.UI.create2DMatrix();
                var m_front_to_back = matrix2d.scale(1);
            } else {
                var m_front_to_back = Ti.UI.create3DMatrix();
                m_front_to_back = m_front_to_back.rotate(0, 0, 1, 0);
            }
            var a_back_to_front = Ti.UI.createAnimation({
                transform: m_front_to_back,
                duration: 200,
                curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
            });
            var back = Ti.UI.createImageView({
                name: "back",
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE,
                image: "/eCard-back.png",
                currentAngle: 10,
                top: 0
            });
            back2front ? view_selected.remove(view_selected.children[1]) : view_selected.add(back);
            view_selected.animate(a_back_to_front);
        });
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
<<<<<<< HEAD
    $.__views.__alloyId103 = Ti.UI.createLabel({
=======
    $.__views.__alloyId104 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId103"
    });
    $.__views.loadingBar.add($.__views.__alloyId103);
=======
        id: "__alloyId104"
    });
    $.__views.loadingBar.add($.__views.__alloyId104);
>>>>>>> origin/master
    $.__views.card = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "0",
        id: "card"
    });
    $.__views.mainContainer.add($.__views.card);
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
<<<<<<< HEAD
    $.__views.__alloyId104 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "__alloyId104"
    });
    $.__views.unverified.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createButton({
=======
    $.__views.__alloyId105 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "__alloyId105"
    });
    $.__views.unverified.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#CE1D1C",
        left: "0",
        title: "Resend Verification",
        width: "55%",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId105"
    });
    $.__views.__alloyId104.add($.__views.__alloyId105);
    resendVerificationEmail ? $.__views.__alloyId105.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId105!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId106 = Ti.UI.createButton({
=======
        id: "__alloyId106"
    });
    $.__views.__alloyId105.add($.__views.__alloyId106);
    resendVerificationEmail ? $.__views.__alloyId106.addEventListener("touchend", resendVerificationEmail) : __defers["$.__views.__alloyId106!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId107 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "35%",
        left: "10",
        top: "10",
        height: "40",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId106"
    });
    $.__views.__alloyId104.add($.__views.__alloyId106);
    checkStatus ? $.__views.__alloyId106.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId106!touchend!checkStatus"] = true;
=======
        id: "__alloyId107"
    });
    $.__views.__alloyId105.add($.__views.__alloyId107);
    checkStatus ? $.__views.__alloyId107.addEventListener("touchend", checkStatus) : __defers["$.__views.__alloyId107!touchend!checkStatus"] = true;
>>>>>>> origin/master
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
    Ti.UI.createImageView({
        name: "back",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "/eCard-back.png",
        currentAngle: 10,
        top: 0
    });
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
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.eCardWin);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId105!touchend!resendVerificationEmail"] && $.__views.__alloyId105.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId106!touchend!checkStatus"] && $.__views.__alloyId106.addEventListener("touchend", checkStatus);
=======
    __defers["$.__views.__alloyId106!touchend!resendVerificationEmail"] && $.__views.__alloyId106.addEventListener("touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId107!touchend!checkStatus"] && $.__views.__alloyId107.addEventListener("touchend", checkStatus);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;