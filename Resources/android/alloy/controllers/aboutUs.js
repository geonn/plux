function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "aboutUs";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        navTintColor: "#CE1D1C",
        title: "About PLUX",
        id: "win",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId48 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId48"
    });
    $.__views.win.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId50"
    });
    $.__views.__alloyId49.add($.__views.__alloyId50);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId50.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId49.add($.__views.pageTitle);
    $.__views.__alloyId51 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "About PLUX",
        textAlign: "center",
        id: "__alloyId51"
    });
    $.__views.pageTitle.add($.__views.__alloyId51);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
    $.__views.__alloyId48.add($.__views.main);
    $.__views.__alloyId52 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 95,
        id: "__alloyId52"
    });
    $.__views.main.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createImageView({
        borderRadius: 10,
        width: 80,
        height: 80,
        left: 10,
        top: 10,
        image: "/images/logo_plux.png",
        id: "__alloyId53"
    });
    $.__views.__alloyId52.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        top: 10,
        id: "__alloyId54"
    });
    $.__views.__alloyId52.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "PLUX",
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Version 1.1.8",
        id: "__alloyId56"
    });
    $.__views.__alloyId54.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Copyright ©2016. All Rights Reserved.",
        id: "__alloyId57"
    });
    $.__views.__alloyId54.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux is an app by ASP Medical Group that is reinventing the way companies manage their health care benefits programmes.",
        top: 10,
        id: "__alloyId58"
    });
    $.__views.main.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "The ASP Medical Group is committed to improving the quality of health care through the use of technology. Our expertise is in providing comprehensive, hassle-free support for corporate medical benefit programmes. Hundreds of companies have already benefitted from our powerful employee medical benefit administration system, which makes cashless consultations available at a network of over 1000 clinics in Malaysia via our comprehensive claim management service.",
        bottom: 5,
        id: "__alloyId59"
    });
    $.__views.main.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Now, we are making administrating corporate health care programmes even simpler, with Plux.",
        bottom: 5,
        id: "__alloyId60"
    });
    $.__views.main.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux is a FREE app that automates most of the management, claims and tracking functions that are performed by companies’ HR departments. Plux also helps employees keep track of their own medical claims with just a few taps on their smartphones. In addition, Plux members enjoy amazing convenience at their fingertips – they can speak to doctors live via video, as well as access tips and tools to help them manage their health and feel good every day!",
        bottom: 5,
        id: "__alloyId61"
    });
    $.__views.main.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#CC2228",
        font: {
            fontSize: "18"
        },
        left: "10",
        right: "10",
        text: "FEATURES:",
        top: 10,
        id: "__alloyId62"
    });
    $.__views.main.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- for the maintenance of customer database and customer service related processes;",
        bottom: 3,
        id: "__alloyId63"
    });
    $.__views.main.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId64"
    });
    $.__views.main.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Save Time",
        id: "__alloyId65"
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux takes the pain out of administering a medical benefits programme! No more paper forms, manual claims, or calling the doctor. Much of the paperwork is automated with Plux.",
        id: "__alloyId66"
    });
    $.__views.__alloyId64.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId67"
    });
    $.__views.main.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Save Money",
        id: "__alloyId68"
    });
    $.__views.__alloyId67.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux powerful back-end support automates much of the administration process involved in medical benefits programmes, freeing up company resources that can be used more effectively elsewhere.",
        id: "__alloyId69"
    });
    $.__views.__alloyId67.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId70"
    });
    $.__views.main.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Smart Claims Tracking",
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members can keep track of their benefits entitlements via their smartphone so that they can manage their claim levels themselves. Access details of entitlements, claims made, claims remaining, etc.",
        id: "__alloyId72"
    });
    $.__views.__alloyId70.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId73"
    });
    $.__views.main.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Convenient Live Virtual Consults",
        id: "__alloyId74"
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members can connect with any doctor in the ASP Medical Group via video for an affordable pay-as-you-go fee. Doctors can then decide on the best course of action for the employee immediately. This way, employees can get medical advice from doctors without having to take time off to wait at the doctor’s clinic.",
        id: "__alloyId75"
    });
    $.__views.__alloyId73.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId76"
    });
    $.__views.main.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Simple Doctor Appointment Booking",
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members can easily book appointments with any doctor in the ASP Medical Group via their mobile phones. Employees can choose from a panel of thousands of doctors for unparalleled convenience.",
        id: "__alloyId78"
    });
    $.__views.__alloyId76.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId79"
    });
    $.__views.main.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Easy Clinic Locator",
        id: "__alloyId80"
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members can easily search for a clinic closest to them through our comprehensive clinic listing. Search through our panel of thousands of doctors, located all over Malaysia.",
        id: "__alloyId81"
    });
    $.__views.__alloyId79.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId82"
    });
    $.__views.main.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Powerful Health Checklists",
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    $.__views.__alloyId84 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Every Plux member has access to health checklists that help them manage their own health goals. Healthier employees translates to happier and more productive employees. It also means less resources spent on therapy.",
        id: "__alloyId84"
    });
    $.__views.__alloyId82.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId85"
    });
    $.__views.main.add($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Personalized Health Tracking",
        id: "__alloyId86"
    });
    $.__views.__alloyId85.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "A personal digital map of health and well-being is automatically created for all Plux members, so they are aware if their lifestyles needs to change to become healthier.",
        id: "__alloyId87"
    });
    $.__views.__alloyId85.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId88"
    });
    $.__views.main.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- Health tips delivered regularly",
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Plux members receive health news tips to help them make better lifestyle choices and stay healthy.",
        id: "__alloyId90"
    });
    $.__views.__alloyId88.add($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 10,
        bottom: 3,
        id: "__alloyId91"
    });
    $.__views.main.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontWeight: "bold",
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "- IT’S FREE",
        id: "__alloyId92"
    });
    $.__views.__alloyId91.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#6E6E6E",
        font: {
            fontSize: "14"
        },
        left: "10",
        textAlign: "left",
        right: "10",
        text: "Companies and members get all the benefits of this powerful app at no charge!",
        id: "__alloyId93"
    });
    $.__views.__alloyId91.add($.__views.__alloyId93);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;