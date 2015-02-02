function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function callNav(e) {
        var nav = require("navigation");
        nav.navigateWithArgs("news", {
            title: e.source.mod
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "healthInfo";
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
    $.__views.healthInfo = Ti.UI.createWindow({
        fullscreen: true,
        title: "Health Info",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "healthInfo"
    });
    $.__views.healthInfo && $.addTopLevelView($.__views.healthInfo);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "main"
    });
    $.__views.healthInfo.add($.__views.main);
    $.__views.__alloyId54 = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: "auto",
        id: "__alloyId54"
    });
    $.__views.main.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Bone Health",
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId58"
    });
    $.__views.__alloyId55.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Bone Health",
        id: "__alloyId59"
    });
    $.__views.__alloyId58.add($.__views.__alloyId59);
    callNav ? $.__views.__alloyId59.addEventListener("click", callNav) : __defers["$.__views.__alloyId59!click!callNav"] = true;
    $.__views.__alloyId60 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Bone Health For Life",
        mod: "Bone Health",
        id: "__alloyId61"
    });
    $.__views.__alloyId59.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Bone Health",
        id: "__alloyId62"
    });
    $.__views.__alloyId58.add($.__views.__alloyId62);
    callNav ? $.__views.__alloyId62.addEventListener("click", callNav) : __defers["$.__views.__alloyId62!click!callNav"] = true;
    $.__views.__alloyId63 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId63"
    });
    $.__views.__alloyId62.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "11 Foods for Healthy Bones",
        mod: "Bone Health",
        id: "__alloyId64"
    });
    $.__views.__alloyId62.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Bone Health",
        id: "__alloyId65"
    });
    $.__views.__alloyId58.add($.__views.__alloyId65);
    callNav ? $.__views.__alloyId65.addEventListener("click", callNav) : __defers["$.__views.__alloyId65!click!callNav"] = true;
    $.__views.__alloyId66 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId66"
    });
    $.__views.__alloyId65.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "10 Ways to Build Healthy Bones",
        mod: "Bone Health",
        id: "__alloyId67"
    });
    $.__views.__alloyId65.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Bone Health",
        id: "__alloyId68"
    });
    $.__views.__alloyId58.add($.__views.__alloyId68);
    callNav ? $.__views.__alloyId68.addEventListener("click", callNav) : __defers["$.__views.__alloyId68!click!callNav"] = true;
    $.__views.__alloyId69 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Bone Health For Life",
        mod: "Bone Health",
        id: "__alloyId70"
    });
    $.__views.__alloyId68.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Bone Health",
        id: "__alloyId71"
    });
    $.__views.__alloyId58.add($.__views.__alloyId71);
    callNav ? $.__views.__alloyId71.addEventListener("click", callNav) : __defers["$.__views.__alloyId71!click!callNav"] = true;
    $.__views.__alloyId72 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId72"
    });
    $.__views.__alloyId71.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "11 Foods for Healthy Bones",
        mod: "Bone Health",
        id: "__alloyId73"
    });
    $.__views.__alloyId71.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Bone Health",
        id: "__alloyId74"
    });
    $.__views.__alloyId58.add($.__views.__alloyId74);
    callNav ? $.__views.__alloyId74.addEventListener("click", callNav) : __defers["$.__views.__alloyId74!click!callNav"] = true;
    $.__views.__alloyId75 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "10 Ways to Build Healthy Bones",
        mod: "Bone Health",
        id: "__alloyId76"
    });
    $.__views.__alloyId74.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId77"
    });
    $.__views.__alloyId54.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Hearth Health",
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId80"
    });
    $.__views.__alloyId77.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Hearth Health",
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    callNav ? $.__views.__alloyId81.addEventListener("click", callNav) : __defers["$.__views.__alloyId81!click!callNav"] = true;
    $.__views.__alloyId82 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId82"
    });
    $.__views.__alloyId81.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "18 Superfoods For Your Heart",
        mod: "Hearth Health",
        id: "__alloyId83"
    });
    $.__views.__alloyId81.add($.__views.__alloyId83);
    $.__views.__alloyId84 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Hearth Health",
        id: "__alloyId84"
    });
    $.__views.__alloyId80.add($.__views.__alloyId84);
    callNav ? $.__views.__alloyId84.addEventListener("click", callNav) : __defers["$.__views.__alloyId84!click!callNav"] = true;
    $.__views.__alloyId85 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId85"
    });
    $.__views.__alloyId84.add($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Top Heart-Healthy Foods",
        mod: "Hearth Health",
        id: "__alloyId86"
    });
    $.__views.__alloyId84.add($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Hearth Health",
        id: "__alloyId87"
    });
    $.__views.__alloyId80.add($.__views.__alloyId87);
    callNav ? $.__views.__alloyId87.addEventListener("click", callNav) : __defers["$.__views.__alloyId87!click!callNav"] = true;
    $.__views.__alloyId88 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId88"
    });
    $.__views.__alloyId87.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "WebMD Heart Health Center",
        mod: "Hearth Health",
        id: "__alloyId89"
    });
    $.__views.__alloyId87.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Hearth Health",
        id: "__alloyId90"
    });
    $.__views.__alloyId80.add($.__views.__alloyId90);
    callNav ? $.__views.__alloyId90.addEventListener("click", callNav) : __defers["$.__views.__alloyId90!click!callNav"] = true;
    $.__views.__alloyId91 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId91"
    });
    $.__views.__alloyId90.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "18 Superfoods For Your Heart",
        mod: "Hearth Health",
        id: "__alloyId92"
    });
    $.__views.__alloyId90.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Hearth Health",
        id: "__alloyId93"
    });
    $.__views.__alloyId80.add($.__views.__alloyId93);
    callNav ? $.__views.__alloyId93.addEventListener("click", callNav) : __defers["$.__views.__alloyId93!click!callNav"] = true;
    $.__views.__alloyId94 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId94"
    });
    $.__views.__alloyId93.add($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Top Heart-Healthy Foods",
        mod: "Hearth Health",
        id: "__alloyId95"
    });
    $.__views.__alloyId93.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId96"
    });
    $.__views.__alloyId54.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId97"
    });
    $.__views.__alloyId96.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Children Health",
        id: "__alloyId98"
    });
    $.__views.__alloyId97.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId99"
    });
    $.__views.__alloyId96.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Children Health",
        id: "__alloyId100"
    });
    $.__views.__alloyId99.add($.__views.__alloyId100);
    callNav ? $.__views.__alloyId100.addEventListener("click", callNav) : __defers["$.__views.__alloyId100!click!callNav"] = true;
    $.__views.__alloyId101 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
        mod: "Children Health",
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    $.__views.__alloyId103 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Children Health",
        id: "__alloyId103"
    });
    $.__views.__alloyId99.add($.__views.__alloyId103);
    callNav ? $.__views.__alloyId103.addEventListener("click", callNav) : __defers["$.__views.__alloyId103!click!callNav"] = true;
    $.__views.__alloyId104 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId104"
    });
    $.__views.__alloyId103.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
        mod: "Children Health",
        id: "__alloyId105"
    });
    $.__views.__alloyId103.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Children Health",
        id: "__alloyId106"
    });
    $.__views.__alloyId99.add($.__views.__alloyId106);
    callNav ? $.__views.__alloyId106.addEventListener("click", callNav) : __defers["$.__views.__alloyId106!click!callNav"] = true;
    $.__views.__alloyId107 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId107"
    });
    $.__views.__alloyId106.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
        mod: "Children Health",
        id: "__alloyId108"
    });
    $.__views.__alloyId106.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Children Health",
        id: "__alloyId109"
    });
    $.__views.__alloyId99.add($.__views.__alloyId109);
    callNav ? $.__views.__alloyId109.addEventListener("click", callNav) : __defers["$.__views.__alloyId109!click!callNav"] = true;
    $.__views.__alloyId110 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId110"
    });
    $.__views.__alloyId109.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
        mod: "Children Health",
        id: "__alloyId111"
    });
    $.__views.__alloyId109.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Children Health",
        id: "__alloyId112"
    });
    $.__views.__alloyId99.add($.__views.__alloyId112);
    callNav ? $.__views.__alloyId112.addEventListener("click", callNav) : __defers["$.__views.__alloyId112!click!callNav"] = true;
    $.__views.__alloyId113 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId113"
    });
    $.__views.__alloyId112.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
        mod: "Children Health",
        id: "__alloyId114"
    });
    $.__views.__alloyId112.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId115"
    });
    $.__views.__alloyId54.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Men Health",
        id: "__alloyId117"
    });
    $.__views.__alloyId116.add($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId118"
    });
    $.__views.__alloyId115.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Men Health",
        id: "__alloyId119"
    });
    $.__views.__alloyId118.add($.__views.__alloyId119);
    callNav ? $.__views.__alloyId119.addEventListener("click", callNav) : __defers["$.__views.__alloyId119!click!callNav"] = true;
    $.__views.__alloyId120 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Men Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId120"
    });
    $.__views.__alloyId119.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Men's health",
        mod: "Men Health",
        id: "__alloyId121"
    });
    $.__views.__alloyId119.add($.__views.__alloyId121);
    $.__views.__alloyId122 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Men Health",
        id: "__alloyId122"
    });
    $.__views.__alloyId118.add($.__views.__alloyId122);
    callNav ? $.__views.__alloyId122.addEventListener("click", callNav) : __defers["$.__views.__alloyId122!click!callNav"] = true;
    $.__views.__alloyId123 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Men Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Men's health",
        mod: "Men Health",
        id: "__alloyId124"
    });
    $.__views.__alloyId122.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Men Health",
        id: "__alloyId125"
    });
    $.__views.__alloyId118.add($.__views.__alloyId125);
    callNav ? $.__views.__alloyId125.addEventListener("click", callNav) : __defers["$.__views.__alloyId125!click!callNav"] = true;
    $.__views.__alloyId126 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Men Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Men's health",
        mod: "Men Health",
        id: "__alloyId127"
    });
    $.__views.__alloyId125.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId128"
    });
    $.__views.__alloyId54.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Women Health",
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId131"
    });
    $.__views.__alloyId128.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Women Health",
        id: "__alloyId132"
    });
    $.__views.__alloyId131.add($.__views.__alloyId132);
    callNav ? $.__views.__alloyId132.addEventListener("click", callNav) : __defers["$.__views.__alloyId132!click!callNav"] = true;
    $.__views.__alloyId133 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
        mod: "Women Health",
        id: "__alloyId134"
    });
    $.__views.__alloyId132.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Women Health",
        id: "__alloyId135"
    });
    $.__views.__alloyId131.add($.__views.__alloyId135);
    callNav ? $.__views.__alloyId135.addEventListener("click", callNav) : __defers["$.__views.__alloyId135!click!callNav"] = true;
    $.__views.__alloyId136 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId136"
    });
    $.__views.__alloyId135.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
        mod: "Women Health",
        id: "__alloyId137"
    });
    $.__views.__alloyId135.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Women Health",
        id: "__alloyId138"
    });
    $.__views.__alloyId131.add($.__views.__alloyId138);
    callNav ? $.__views.__alloyId138.addEventListener("click", callNav) : __defers["$.__views.__alloyId138!click!callNav"] = true;
    $.__views.__alloyId139 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
        mod: "Women Health",
        id: "__alloyId140"
    });
    $.__views.__alloyId138.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Women Health",
        id: "__alloyId141"
    });
    $.__views.__alloyId131.add($.__views.__alloyId141);
    callNav ? $.__views.__alloyId141.addEventListener("click", callNav) : __defers["$.__views.__alloyId141!click!callNav"] = true;
    $.__views.__alloyId142 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
        mod: "Women Health",
        id: "__alloyId143"
    });
    $.__views.__alloyId141.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Women Health",
        id: "__alloyId144"
    });
    $.__views.__alloyId131.add($.__views.__alloyId144);
    callNav ? $.__views.__alloyId144.addEventListener("click", callNav) : __defers["$.__views.__alloyId144!click!callNav"] = true;
    $.__views.__alloyId145 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId145"
    });
    $.__views.__alloyId144.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
        mod: "Women Health",
        id: "__alloyId146"
    });
    $.__views.__alloyId144.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
        mod: "Women Health",
        id: "__alloyId147"
    });
    $.__views.__alloyId131.add($.__views.__alloyId147);
    callNav ? $.__views.__alloyId147.addEventListener("click", callNav) : __defers["$.__views.__alloyId147!click!callNav"] = true;
    $.__views.__alloyId148 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
        mod: "Women Health",
        id: "__alloyId149"
    });
    $.__views.__alloyId147.add($.__views.__alloyId149);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId59!click!callNav"] && $.__views.__alloyId59.addEventListener("click", callNav);
    __defers["$.__views.__alloyId62!click!callNav"] && $.__views.__alloyId62.addEventListener("click", callNav);
    __defers["$.__views.__alloyId65!click!callNav"] && $.__views.__alloyId65.addEventListener("click", callNav);
    __defers["$.__views.__alloyId68!click!callNav"] && $.__views.__alloyId68.addEventListener("click", callNav);
    __defers["$.__views.__alloyId71!click!callNav"] && $.__views.__alloyId71.addEventListener("click", callNav);
    __defers["$.__views.__alloyId74!click!callNav"] && $.__views.__alloyId74.addEventListener("click", callNav);
    __defers["$.__views.__alloyId81!click!callNav"] && $.__views.__alloyId81.addEventListener("click", callNav);
    __defers["$.__views.__alloyId84!click!callNav"] && $.__views.__alloyId84.addEventListener("click", callNav);
    __defers["$.__views.__alloyId87!click!callNav"] && $.__views.__alloyId87.addEventListener("click", callNav);
    __defers["$.__views.__alloyId90!click!callNav"] && $.__views.__alloyId90.addEventListener("click", callNav);
    __defers["$.__views.__alloyId93!click!callNav"] && $.__views.__alloyId93.addEventListener("click", callNav);
    __defers["$.__views.__alloyId100!click!callNav"] && $.__views.__alloyId100.addEventListener("click", callNav);
    __defers["$.__views.__alloyId103!click!callNav"] && $.__views.__alloyId103.addEventListener("click", callNav);
    __defers["$.__views.__alloyId106!click!callNav"] && $.__views.__alloyId106.addEventListener("click", callNav);
    __defers["$.__views.__alloyId109!click!callNav"] && $.__views.__alloyId109.addEventListener("click", callNav);
    __defers["$.__views.__alloyId112!click!callNav"] && $.__views.__alloyId112.addEventListener("click", callNav);
    __defers["$.__views.__alloyId119!click!callNav"] && $.__views.__alloyId119.addEventListener("click", callNav);
    __defers["$.__views.__alloyId122!click!callNav"] && $.__views.__alloyId122.addEventListener("click", callNav);
    __defers["$.__views.__alloyId125!click!callNav"] && $.__views.__alloyId125.addEventListener("click", callNav);
    __defers["$.__views.__alloyId132!click!callNav"] && $.__views.__alloyId132.addEventListener("click", callNav);
    __defers["$.__views.__alloyId135!click!callNav"] && $.__views.__alloyId135.addEventListener("click", callNav);
    __defers["$.__views.__alloyId138!click!callNav"] && $.__views.__alloyId138.addEventListener("click", callNav);
    __defers["$.__views.__alloyId141!click!callNav"] && $.__views.__alloyId141.addEventListener("click", callNav);
    __defers["$.__views.__alloyId144!click!callNav"] && $.__views.__alloyId144.addEventListener("click", callNav);
    __defers["$.__views.__alloyId147!click!callNav"] && $.__views.__alloyId147.addEventListener("click", callNav);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;