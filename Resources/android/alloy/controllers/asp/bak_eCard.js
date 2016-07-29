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
    $.__views.__alloyId299 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId299"
    });
    $.__views.eCardWin.add($.__views.__alloyId299);
    $.__views.__alloyId300 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId300"
    });
    $.__views.__alloyId299.add($.__views.__alloyId300);
    $.__views.__alloyId301 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId301"
    });
    $.__views.__alloyId300.add($.__views.__alloyId301);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId301.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId300.add($.__views.pageTitle);
    $.__views.__alloyId302 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "ASP eCARD",
        textAlign: "center",
        id: "__alloyId302"
    });
    $.__views.pageTitle.add($.__views.__alloyId302);
    $.__views.mainContainer = Ti.UI.createView({
        id: "mainContainer",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.__alloyId299.add($.__views.mainContainer);
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
    $.__views.__alloyId303 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        text: "Loading",
        id: "__alloyId303"
    });
    $.__views.loadingBar.add($.__views.__alloyId303);
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
    $.__views.__alloyId304 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "__alloyId304"
    });
    $.__views.unverified.add($.__views.__alloyId304);
    $.__views.__alloyId305 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#CE1D1C",
        left: 0,
        title: "Resend Verification",
        width: "55%",
        top: 10,
        height: 40,
        color: "#ffffff",
        id: "__alloyId305"
    });
    $.__views.__alloyId304.add($.__views.__alloyId305);
    resendVerificationEmail ? $.addListener($.__views.__alloyId305, "touchend", resendVerificationEmail) : __defers["$.__views.__alloyId305!touchend!resendVerificationEmail"] = true;
    $.__views.__alloyId306 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Refresh",
        width: "35%",
        left: 10,
        top: 10,
        height: 40,
        color: "#ffffff",
        id: "__alloyId306"
    });
    $.__views.__alloyId304.add($.__views.__alloyId306);
    checkStatus ? $.addListener($.__views.__alloyId306, "touchend", checkStatus) : __defers["$.__views.__alloyId306!touchend!checkStatus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId305!touchend!resendVerificationEmail"] && $.addListener($.__views.__alloyId305, "touchend", resendVerificationEmail);
    __defers["$.__views.__alloyId306!touchend!checkStatus"] && $.addListener($.__views.__alloyId306, "touchend", checkStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;