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
    $.__views.__alloyId15 = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: "auto",
        id: "__alloyId15"
    });
    $.__views.main.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Bone Health",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId19"
    });
    $.__views.__alloyId16.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId7"
=======
        id: "__alloyId20"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    callNav ? $.__views.__alloyId20.addEventListener("click", callNav) : __defers["$.__views.__alloyId20!click!callNav"] = true;
    $.__views.__alloyId21 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId8"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId21"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Bone Health For Life",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId9"
=======
        id: "__alloyId22"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId20.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId10"
=======
        id: "__alloyId23"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId19.add($.__views.__alloyId23);
    callNav ? $.__views.__alloyId23.addEventListener("click", callNav) : __defers["$.__views.__alloyId23!click!callNav"] = true;
    $.__views.__alloyId24 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId11"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId24"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "11 Foods for Healthy Bones",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId12"
=======
        id: "__alloyId25"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId23.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId13"
=======
        id: "__alloyId26"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId19.add($.__views.__alloyId26);
    callNav ? $.__views.__alloyId26.addEventListener("click", callNav) : __defers["$.__views.__alloyId26!click!callNav"] = true;
    $.__views.__alloyId27 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId14"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId27"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "10 Ways to Build Healthy Bones",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId15"
=======
        id: "__alloyId28"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId26.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId16"
=======
        id: "__alloyId29"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId19.add($.__views.__alloyId29);
    callNav ? $.__views.__alloyId29.addEventListener("click", callNav) : __defers["$.__views.__alloyId29!click!callNav"] = true;
    $.__views.__alloyId30 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId17"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId30"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Bone Health For Life",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId18"
=======
        id: "__alloyId31"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId29.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId19"
=======
        id: "__alloyId32"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId19.add($.__views.__alloyId32);
    callNav ? $.__views.__alloyId32.addEventListener("click", callNav) : __defers["$.__views.__alloyId32!click!callNav"] = true;
    $.__views.__alloyId33 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId20"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId33"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "11 Foods for Healthy Bones",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId21"
=======
        id: "__alloyId34"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId32.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId22"
=======
        id: "__alloyId35"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId19.add($.__views.__alloyId35);
    callNav ? $.__views.__alloyId35.addEventListener("click", callNav) : __defers["$.__views.__alloyId35!click!callNav"] = true;
    $.__views.__alloyId36 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Bone Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId23"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId36"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "10 Ways to Build Healthy Bones",
<<<<<<< HEAD
        mod: "Bone Health",
        id: "__alloyId24"
=======
        id: "__alloyId37"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId35.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId38"
    });
    $.__views.__alloyId15.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Hearth Health",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId41"
    });
    $.__views.__alloyId38.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId29"
=======
        id: "__alloyId42"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    callNav ? $.__views.__alloyId42.addEventListener("click", callNav) : __defers["$.__views.__alloyId42!click!callNav"] = true;
    $.__views.__alloyId43 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId30"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId43"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId42.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "18 Superfoods For Your Heart",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId31"
=======
        id: "__alloyId44"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId42.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId32"
=======
        id: "__alloyId45"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId41.add($.__views.__alloyId45);
    callNav ? $.__views.__alloyId45.addEventListener("click", callNav) : __defers["$.__views.__alloyId45!click!callNav"] = true;
    $.__views.__alloyId46 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId33"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId46"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Top Heart-Healthy Foods",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId34"
=======
        id: "__alloyId47"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId45.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId35"
=======
        id: "__alloyId48"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId41.add($.__views.__alloyId48);
    callNav ? $.__views.__alloyId48.addEventListener("click", callNav) : __defers["$.__views.__alloyId48!click!callNav"] = true;
    $.__views.__alloyId49 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId36"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId49"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "WebMD Heart Health Center",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId37"
=======
        id: "__alloyId50"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId48.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId38"
=======
        id: "__alloyId51"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId41.add($.__views.__alloyId51);
    callNav ? $.__views.__alloyId51.addEventListener("click", callNav) : __defers["$.__views.__alloyId51!click!callNav"] = true;
    $.__views.__alloyId52 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId39"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId52"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "18 Superfoods For Your Heart",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId40"
=======
        id: "__alloyId53"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId51.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId41"
=======
        id: "__alloyId54"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId41.add($.__views.__alloyId54);
    callNav ? $.__views.__alloyId54.addEventListener("click", callNav) : __defers["$.__views.__alloyId54!click!callNav"] = true;
    $.__views.__alloyId55 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Hearth Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId42"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId55"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Top Heart-Healthy Foods",
<<<<<<< HEAD
        mod: "Hearth Health",
        id: "__alloyId43"
=======
        id: "__alloyId56"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId54.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId57"
    });
    $.__views.__alloyId15.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Children Health",
        id: "__alloyId59"
    });
    $.__views.__alloyId58.add($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId60"
    });
    $.__views.__alloyId57.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId48"
=======
        id: "__alloyId61"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    callNav ? $.__views.__alloyId61.addEventListener("click", callNav) : __defers["$.__views.__alloyId61!click!callNav"] = true;
    $.__views.__alloyId62 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId49"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId62"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId61.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId50"
=======
        id: "__alloyId63"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId61.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId51"
=======
        id: "__alloyId64"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId60.add($.__views.__alloyId64);
    callNav ? $.__views.__alloyId64.addEventListener("click", callNav) : __defers["$.__views.__alloyId64!click!callNav"] = true;
    $.__views.__alloyId65 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId52"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId65"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId53"
=======
        id: "__alloyId66"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId64.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId54"
=======
        id: "__alloyId67"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId60.add($.__views.__alloyId67);
    callNav ? $.__views.__alloyId67.addEventListener("click", callNav) : __defers["$.__views.__alloyId67!click!callNav"] = true;
    $.__views.__alloyId68 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId55"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId68"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId67.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId56"
=======
        id: "__alloyId69"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId67.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId57"
=======
        id: "__alloyId70"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId60.add($.__views.__alloyId70);
    callNav ? $.__views.__alloyId70.addEventListener("click", callNav) : __defers["$.__views.__alloyId70!click!callNav"] = true;
    $.__views.__alloyId71 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId58"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId71"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId59"
=======
        id: "__alloyId72"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId70.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId60"
=======
        id: "__alloyId73"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId60.add($.__views.__alloyId73);
    callNav ? $.__views.__alloyId73.addEventListener("click", callNav) : __defers["$.__views.__alloyId73!click!callNav"] = true;
    $.__views.__alloyId74 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Children Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId61"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId74"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee children's health",
<<<<<<< HEAD
        mod: "Children Health",
        id: "__alloyId62"
=======
        id: "__alloyId75"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId73.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId76"
    });
    $.__views.__alloyId15.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Men Health",
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId79"
    });
    $.__views.__alloyId76.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Men Health",
        id: "__alloyId67"
=======
        id: "__alloyId80"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    callNav ? $.__views.__alloyId80.addEventListener("click", callNav) : __defers["$.__views.__alloyId80!click!callNav"] = true;
    $.__views.__alloyId81 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Men Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId68"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId81"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Men's health",
<<<<<<< HEAD
        mod: "Men Health",
        id: "__alloyId69"
=======
        id: "__alloyId82"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId80.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Men Health",
        id: "__alloyId70"
=======
        id: "__alloyId83"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId79.add($.__views.__alloyId83);
    callNav ? $.__views.__alloyId83.addEventListener("click", callNav) : __defers["$.__views.__alloyId83!click!callNav"] = true;
    $.__views.__alloyId84 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Men Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId71"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId84"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId83.add($.__views.__alloyId84);
    $.__views.__alloyId85 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Men's health",
<<<<<<< HEAD
        mod: "Men Health",
        id: "__alloyId72"
=======
        id: "__alloyId85"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId83.add($.__views.__alloyId85);
    $.__views.__alloyId86 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Men Health",
        id: "__alloyId73"
=======
        id: "__alloyId86"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId79.add($.__views.__alloyId86);
    callNav ? $.__views.__alloyId86.addEventListener("click", callNav) : __defers["$.__views.__alloyId86!click!callNav"] = true;
    $.__views.__alloyId87 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Men Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId74"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId87"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId86.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Men's health",
<<<<<<< HEAD
        mod: "Men Health",
        id: "__alloyId75"
=======
        id: "__alloyId88"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId86.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        layout: "vertical",
        left: "10dp",
        id: "__alloyId89"
    });
    $.__views.__alloyId15.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId90"
    });
    $.__views.__alloyId89.add($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        color: "#E4001D",
        left: "0",
        bottom: "5dp",
        top: "5dp",
        text: "Women Health",
        id: "__alloyId91"
    });
    $.__views.__alloyId90.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createScrollView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        contentWidth: "auto",
        id: "__alloyId92"
    });
    $.__views.__alloyId89.add($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId80"
=======
        id: "__alloyId93"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    callNav ? $.__views.__alloyId93.addEventListener("click", callNav) : __defers["$.__views.__alloyId93!click!callNav"] = true;
    $.__views.__alloyId94 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId81"
=======
        mod: "Courts guarantee Women's health",
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId94"
>>>>>>> FETCH_HEAD
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
        text: "Courts guarantee Women's health",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId82"
=======
        mod: "Courts guarantee Women's health",
        id: "__alloyId95"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId93.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId83"
=======
        id: "__alloyId96"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId92.add($.__views.__alloyId96);
    callNav ? $.__views.__alloyId96.addEventListener("click", callNav) : __defers["$.__views.__alloyId96!click!callNav"] = true;
    $.__views.__alloyId97 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId84"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId97"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId96.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId85"
=======
        id: "__alloyId98"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId96.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId86"
=======
        id: "__alloyId99"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId92.add($.__views.__alloyId99);
    callNav ? $.__views.__alloyId99.addEventListener("click", callNav) : __defers["$.__views.__alloyId99!click!callNav"] = true;
    $.__views.__alloyId100 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId87"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId100"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId99.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId88"
=======
        id: "__alloyId101"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId99.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId89"
=======
        id: "__alloyId102"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId92.add($.__views.__alloyId102);
    callNav ? $.__views.__alloyId102.addEventListener("click", callNav) : __defers["$.__views.__alloyId102!click!callNav"] = true;
    $.__views.__alloyId103 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId90"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId103"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId102.add($.__views.__alloyId103);
    $.__views.__alloyId104 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId91"
=======
        id: "__alloyId104"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId102.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId92"
=======
        id: "__alloyId105"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId92.add($.__views.__alloyId105);
    callNav ? $.__views.__alloyId105.addEventListener("click", callNav) : __defers["$.__views.__alloyId105!click!callNav"] = true;
    $.__views.__alloyId106 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId93"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId106"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId105.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId94"
=======
        id: "__alloyId107"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId105.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createView({
        height: "120dp",
        width: "120dp",
        backgroundColor: "#000000",
        right: "10dp",
        bottom: "10dp",
        layout: "vertical",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId95"
=======
        id: "__alloyId108"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId92.add($.__views.__alloyId108);
    callNav ? $.__views.__alloyId108.addEventListener("click", callNav) : __defers["$.__views.__alloyId108!click!callNav"] = true;
    $.__views.__alloyId109 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
<<<<<<< HEAD
        mod: "Women Health",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId96"
=======
        image: "/images/news-default-thumb.jpg",
        id: "__alloyId109"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId108.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createLabel({
        wordWrap: true,
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        color: "#ffffff",
        left: "5dp",
        font: {
            fontSize: "11dp"
        },
        text: "Courts guarantee Women's health",
<<<<<<< HEAD
        mod: "Women Health",
        id: "__alloyId97"
=======
        id: "__alloyId110"
>>>>>>> FETCH_HEAD
    });
    $.__views.__alloyId108.add($.__views.__alloyId110);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId20!click!callNav"] && $.__views.__alloyId20.addEventListener("click", callNav);
    __defers["$.__views.__alloyId23!click!callNav"] && $.__views.__alloyId23.addEventListener("click", callNav);
    __defers["$.__views.__alloyId26!click!callNav"] && $.__views.__alloyId26.addEventListener("click", callNav);
    __defers["$.__views.__alloyId29!click!callNav"] && $.__views.__alloyId29.addEventListener("click", callNav);
    __defers["$.__views.__alloyId32!click!callNav"] && $.__views.__alloyId32.addEventListener("click", callNav);
    __defers["$.__views.__alloyId35!click!callNav"] && $.__views.__alloyId35.addEventListener("click", callNav);
    __defers["$.__views.__alloyId42!click!callNav"] && $.__views.__alloyId42.addEventListener("click", callNav);
    __defers["$.__views.__alloyId45!click!callNav"] && $.__views.__alloyId45.addEventListener("click", callNav);
    __defers["$.__views.__alloyId48!click!callNav"] && $.__views.__alloyId48.addEventListener("click", callNav);
    __defers["$.__views.__alloyId51!click!callNav"] && $.__views.__alloyId51.addEventListener("click", callNav);
    __defers["$.__views.__alloyId54!click!callNav"] && $.__views.__alloyId54.addEventListener("click", callNav);
    __defers["$.__views.__alloyId61!click!callNav"] && $.__views.__alloyId61.addEventListener("click", callNav);
    __defers["$.__views.__alloyId64!click!callNav"] && $.__views.__alloyId64.addEventListener("click", callNav);
    __defers["$.__views.__alloyId67!click!callNav"] && $.__views.__alloyId67.addEventListener("click", callNav);
    __defers["$.__views.__alloyId70!click!callNav"] && $.__views.__alloyId70.addEventListener("click", callNav);
    __defers["$.__views.__alloyId73!click!callNav"] && $.__views.__alloyId73.addEventListener("click", callNav);
    __defers["$.__views.__alloyId80!click!callNav"] && $.__views.__alloyId80.addEventListener("click", callNav);
    __defers["$.__views.__alloyId83!click!callNav"] && $.__views.__alloyId83.addEventListener("click", callNav);
    __defers["$.__views.__alloyId86!click!callNav"] && $.__views.__alloyId86.addEventListener("click", callNav);
    __defers["$.__views.__alloyId93!click!callNav"] && $.__views.__alloyId93.addEventListener("click", callNav);
    __defers["$.__views.__alloyId96!click!callNav"] && $.__views.__alloyId96.addEventListener("click", callNav);
    __defers["$.__views.__alloyId99!click!callNav"] && $.__views.__alloyId99.addEventListener("click", callNav);
    __defers["$.__views.__alloyId102!click!callNav"] && $.__views.__alloyId102.addEventListener("click", callNav);
    __defers["$.__views.__alloyId105!click!callNav"] && $.__views.__alloyId105.addEventListener("click", callNav);
    __defers["$.__views.__alloyId108!click!callNav"] && $.__views.__alloyId108.addEventListener("click", callNav);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;