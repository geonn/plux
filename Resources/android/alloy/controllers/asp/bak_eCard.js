function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/bak_eCard";
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
<<<<<<< HEAD
    $.__views.__alloyId345 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId345"
    });
    $.__views.eCardWin.add($.__views.__alloyId345);
    $.__views.__alloyId346 = Ti.UI.createView({
=======
    $.__views.__alloyId343 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId343"
    });
    $.__views.eCardWin.add($.__views.__alloyId343);
    $.__views.__alloyId344 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId346"
    });
    $.__views.__alloyId345.add($.__views.__alloyId346);
    $.__views.__alloyId347 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId347"
    });
    $.__views.__alloyId346.add($.__views.__alloyId347);
=======
        id: "__alloyId344"
    });
    $.__views.__alloyId343.add($.__views.__alloyId344);
    $.__views.__alloyId345 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId345"
    });
    $.__views.__alloyId344.add($.__views.__alloyId345);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId347.add($.__views.btnBack);
=======
    $.__views.__alloyId345.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId346.add($.__views.pageTitle);
    $.__views.__alloyId348 = Ti.UI.createLabel({
=======
    $.__views.__alloyId344.add($.__views.pageTitle);
    $.__views.__alloyId346 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "ASP eCARD",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId348"
    });
    $.__views.pageTitle.add($.__views.__alloyId348);
=======
        id: "__alloyId346"
    });
    $.__views.pageTitle.add($.__views.__alloyId346);
>>>>>>> origin/master
    $.__views.mainContainer = Ti.UI.createView({
        id: "mainContainer",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId345.add($.__views.mainContainer);
=======
    $.__views.__alloyId343.add($.__views.mainContainer);
>>>>>>> origin/master
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
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId349 = Ti.UI.createLabel({
=======
    $.__views.__alloyId347 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        text: "Loading",
<<<<<<< HEAD
        id: "__alloyId349"
    });
    $.__views.loadingBar.add($.__views.__alloyId349);
=======
        id: "__alloyId347"
    });
    $.__views.loadingBar.add($.__views.__alloyId347);
>>>>>>> origin/master
    $.__views.card = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        id: "card",
        zIndex: 12
    });
    $.__views.mainContainer.add($.__views.card);
    $.__views.qrCode = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        bottom: 50,
        id: "qrCode"
    });
    $.__views.mainContainer.add($.__views.qrCode);
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
        visible: false,
        top: 0,
        layout: "vertical"
    });
    $.__views.mainContainer.add($.__views.unverified);
    $.__views.unveriLbl = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#606060",
        text: "You need to verify your account in order to use eCard.",
        id: "unveriLbl",
        top: 40
    });
    $.__views.unverified.add($.__views.unveriLbl);
<<<<<<< HEAD
    $.__views.__alloyId350 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "__alloyId350"
    });
    $.__views.unverified.add($.__views.__alloyId350);
    $.__views.__alloyId351 = Ti.UI.createButton({
=======
    $.__views.__alloyId348 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "__alloyId348"
    });
    $.__views.unverified.add($.__views.__alloyId348);
    $.__views.__alloyId349 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: 5,
        backgroundColor: "#CE1D1C",
        left: 0,
        title: "Resend Verification",
        width: "55%",
        top: 10,
        height: 40,
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId351"
    });
    $.__views.__alloyId350.add($.__views.__alloyId351);
    resendVerificationEmail ? $.addListener($.__views.__alloyId351, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId351!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId352 = Ti.UI.createButton({
=======
        id: "__alloyId349"
    });
    $.__views.__alloyId348.add($.__views.__alloyId349);
    resendVerificationEmail ? $.addListener($.__views.__alloyId349, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId349!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId350 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "35%",
        left: 10,
        top: 10,
        height: 40,
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId352"
    });
    $.__views.__alloyId350.add($.__views.__alloyId352);
    checkStatus ? $.addListener($.__views.__alloyId352, "touchend", checkStatus) : __defers["$.__views.__alloyId352!touchend!checkStatus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId351!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId351, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId352!touchend!checkStatus"] && $.addListener($.__views.__alloyId352, "touchend", checkStatus);
=======
        id: "__alloyId350"
    });
    $.__views.__alloyId348.add($.__views.__alloyId350);
    checkStatus ? $.addListener($.__views.__alloyId350, "touchend", checkStatus) : __defers["$.__views.__alloyId350!touchend!checkStatus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId349!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId349, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId350!touchend!checkStatus"] && $.addListener($.__views.__alloyId350, "touchend", checkStatus);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;