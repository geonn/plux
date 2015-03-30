function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function navWindow(e) {
        var title = e.source.mod;
        var nav = require("navigation");
        nav.navigationWindow("leaflet", "", "", {
            title: title
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "leafletCategory";
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
    $.__views.leafletCategory = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Leaflet",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "leafletCategory"
    });
    $.__views.leafletCategory && $.addTopLevelView($.__views.leafletCategory);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#4A4A4A",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "main"
    });
    $.__views.leafletCategory.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId204 = Ti.UI.createScrollView({
=======
    $.__views.__alloyId110 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId204"
    });
    $.__views.main.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createView({
=======
        id: "__alloyId110"
    });
    $.__views.main.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
<<<<<<< HEAD
        id: "__alloyId205"
    });
    $.__views.__alloyId204.add($.__views.__alloyId205);
    navWindow ? $.__views.__alloyId205.addEventListener("click", navWindow) : __defers["$.__views.__alloyId205!click!navWindow"] = true;
    $.__views.__alloyId206 = Ti.UI.createLabel({
=======
        id: "__alloyId111"
    });
    $.__views.__alloyId110.add($.__views.__alloyId111);
    navWindow ? $.__views.__alloyId111.addEventListener("click", navWindow) : __defers["$.__views.__alloyId111!click!navWindow"] = true;
    $.__views.__alloyId112 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Bone Health",
        mod: "Bone Health",
<<<<<<< HEAD
        id: "__alloyId206"
    });
    $.__views.__alloyId205.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createImageView({
=======
        id: "__alloyId112"
    });
    $.__views.__alloyId111.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
<<<<<<< HEAD
        id: "__alloyId207"
    });
    $.__views.__alloyId205.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createView({
=======
        id: "__alloyId113"
    });
    $.__views.__alloyId111.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
<<<<<<< HEAD
        id: "__alloyId208"
    });
    $.__views.__alloyId204.add($.__views.__alloyId208);
    navWindow ? $.__views.__alloyId208.addEventListener("click", navWindow) : __defers["$.__views.__alloyId208!click!navWindow"] = true;
    $.__views.__alloyId209 = Ti.UI.createLabel({
=======
        id: "__alloyId114"
    });
    $.__views.__alloyId110.add($.__views.__alloyId114);
    navWindow ? $.__views.__alloyId114.addEventListener("click", navWindow) : __defers["$.__views.__alloyId114!click!navWindow"] = true;
    $.__views.__alloyId115 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Women Health",
        mod: "Women Health",
<<<<<<< HEAD
        id: "__alloyId209"
    });
    $.__views.__alloyId208.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createImageView({
=======
        id: "__alloyId115"
    });
    $.__views.__alloyId114.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
<<<<<<< HEAD
        id: "__alloyId210"
    });
    $.__views.__alloyId208.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createView({
=======
        id: "__alloyId116"
    });
    $.__views.__alloyId114.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId211"
    });
    $.__views.__alloyId204.add($.__views.__alloyId211);
    navWindow ? $.__views.__alloyId211.addEventListener("click", navWindow) : __defers["$.__views.__alloyId211!click!navWindow"] = true;
    $.__views.__alloyId212 = Ti.UI.createLabel({
=======
        id: "__alloyId117"
    });
    $.__views.__alloyId110.add($.__views.__alloyId117);
    navWindow ? $.__views.__alloyId117.addEventListener("click", navWindow) : __defers["$.__views.__alloyId117!click!navWindow"] = true;
    $.__views.__alloyId118 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId212"
    });
    $.__views.__alloyId211.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createImageView({
=======
        id: "__alloyId118"
    });
    $.__views.__alloyId117.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId213"
    });
    $.__views.__alloyId211.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createView({
=======
        id: "__alloyId119"
    });
    $.__views.__alloyId117.add($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId214"
    });
    $.__views.__alloyId204.add($.__views.__alloyId214);
    navWindow ? $.__views.__alloyId214.addEventListener("click", navWindow) : __defers["$.__views.__alloyId214!click!navWindow"] = true;
    $.__views.__alloyId215 = Ti.UI.createLabel({
=======
        id: "__alloyId120"
    });
    $.__views.__alloyId110.add($.__views.__alloyId120);
    navWindow ? $.__views.__alloyId120.addEventListener("click", navWindow) : __defers["$.__views.__alloyId120!click!navWindow"] = true;
    $.__views.__alloyId121 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId215"
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createImageView({
=======
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
    $.__views.__alloyId122 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId216"
    });
    $.__views.__alloyId214.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createView({
=======
        id: "__alloyId122"
    });
    $.__views.__alloyId120.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId217"
    });
    $.__views.__alloyId204.add($.__views.__alloyId217);
    navWindow ? $.__views.__alloyId217.addEventListener("click", navWindow) : __defers["$.__views.__alloyId217!click!navWindow"] = true;
    $.__views.__alloyId218 = Ti.UI.createLabel({
=======
        id: "__alloyId123"
    });
    $.__views.__alloyId110.add($.__views.__alloyId123);
    navWindow ? $.__views.__alloyId123.addEventListener("click", navWindow) : __defers["$.__views.__alloyId123!click!navWindow"] = true;
    $.__views.__alloyId124 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId218"
    });
    $.__views.__alloyId217.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createImageView({
=======
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId219"
    });
    $.__views.__alloyId217.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createView({
=======
        id: "__alloyId125"
    });
    $.__views.__alloyId123.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId220"
    });
    $.__views.__alloyId204.add($.__views.__alloyId220);
    navWindow ? $.__views.__alloyId220.addEventListener("click", navWindow) : __defers["$.__views.__alloyId220!click!navWindow"] = true;
    $.__views.__alloyId221 = Ti.UI.createLabel({
=======
        id: "__alloyId126"
    });
    $.__views.__alloyId110.add($.__views.__alloyId126);
    navWindow ? $.__views.__alloyId126.addEventListener("click", navWindow) : __defers["$.__views.__alloyId126!click!navWindow"] = true;
    $.__views.__alloyId127 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId221"
    });
    $.__views.__alloyId220.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createImageView({
=======
        id: "__alloyId127"
    });
    $.__views.__alloyId126.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId222"
    });
    $.__views.__alloyId220.add($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createView({
=======
        id: "__alloyId128"
    });
    $.__views.__alloyId126.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId223"
    });
    $.__views.__alloyId204.add($.__views.__alloyId223);
    navWindow ? $.__views.__alloyId223.addEventListener("click", navWindow) : __defers["$.__views.__alloyId223!click!navWindow"] = true;
    $.__views.__alloyId224 = Ti.UI.createLabel({
=======
        id: "__alloyId129"
    });
    $.__views.__alloyId110.add($.__views.__alloyId129);
    navWindow ? $.__views.__alloyId129.addEventListener("click", navWindow) : __defers["$.__views.__alloyId129!click!navWindow"] = true;
    $.__views.__alloyId130 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId224"
    });
    $.__views.__alloyId223.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createImageView({
=======
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId225"
    });
    $.__views.__alloyId223.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createView({
=======
        id: "__alloyId131"
    });
    $.__views.__alloyId129.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId226"
    });
    $.__views.__alloyId204.add($.__views.__alloyId226);
    navWindow ? $.__views.__alloyId226.addEventListener("click", navWindow) : __defers["$.__views.__alloyId226!click!navWindow"] = true;
    $.__views.__alloyId227 = Ti.UI.createLabel({
=======
        id: "__alloyId132"
    });
    $.__views.__alloyId110.add($.__views.__alloyId132);
    navWindow ? $.__views.__alloyId132.addEventListener("click", navWindow) : __defers["$.__views.__alloyId132!click!navWindow"] = true;
    $.__views.__alloyId133 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createImageView({
=======
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId228"
    });
    $.__views.__alloyId226.add($.__views.__alloyId228);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId205!click!navWindow"] && $.__views.__alloyId205.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId208!click!navWindow"] && $.__views.__alloyId208.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId211!click!navWindow"] && $.__views.__alloyId211.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId214!click!navWindow"] && $.__views.__alloyId214.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId217!click!navWindow"] && $.__views.__alloyId217.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId220!click!navWindow"] && $.__views.__alloyId220.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId223!click!navWindow"] && $.__views.__alloyId223.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId226!click!navWindow"] && $.__views.__alloyId226.addEventListener("click", navWindow);
=======
        id: "__alloyId134"
    });
    $.__views.__alloyId132.add($.__views.__alloyId134);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId111!click!navWindow"] && $.__views.__alloyId111.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId114!click!navWindow"] && $.__views.__alloyId114.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId117!click!navWindow"] && $.__views.__alloyId117.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId120!click!navWindow"] && $.__views.__alloyId120.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId123!click!navWindow"] && $.__views.__alloyId123.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId126!click!navWindow"] && $.__views.__alloyId126.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId129!click!navWindow"] && $.__views.__alloyId129.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId132!click!navWindow"] && $.__views.__alloyId132.addEventListener("click", navWindow);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;