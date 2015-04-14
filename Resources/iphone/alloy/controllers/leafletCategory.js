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
    $.__views.__alloyId111 = Ti.UI.createScrollView({
=======
    $.__views.__alloyId113 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId111"
    });
    $.__views.main.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createView({
=======
        id: "__alloyId113"
    });
    $.__views.main.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
<<<<<<< HEAD
        id: "__alloyId112"
    });
    $.__views.__alloyId111.add($.__views.__alloyId112);
    navWindow ? $.__views.__alloyId112.addEventListener("click", navWindow) : __defers["$.__views.__alloyId112!click!navWindow"] = true;
    $.__views.__alloyId113 = Ti.UI.createLabel({
=======
        id: "__alloyId114"
    });
    $.__views.__alloyId113.add($.__views.__alloyId114);
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
        text: "Bone Health",
        mod: "Bone Health",
<<<<<<< HEAD
        id: "__alloyId113"
    });
    $.__views.__alloyId112.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createImageView({
=======
        id: "__alloyId115"
    });
    $.__views.__alloyId114.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
<<<<<<< HEAD
        id: "__alloyId114"
    });
    $.__views.__alloyId112.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createView({
=======
        id: "__alloyId116"
    });
    $.__views.__alloyId114.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
<<<<<<< HEAD
        id: "__alloyId115"
    });
    $.__views.__alloyId111.add($.__views.__alloyId115);
    navWindow ? $.__views.__alloyId115.addEventListener("click", navWindow) : __defers["$.__views.__alloyId115!click!navWindow"] = true;
    $.__views.__alloyId116 = Ti.UI.createLabel({
=======
        id: "__alloyId117"
    });
    $.__views.__alloyId113.add($.__views.__alloyId117);
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
        text: "Women Health",
        mod: "Women Health",
<<<<<<< HEAD
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createImageView({
=======
        id: "__alloyId118"
    });
    $.__views.__alloyId117.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
<<<<<<< HEAD
        id: "__alloyId117"
    });
    $.__views.__alloyId115.add($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createView({
=======
        id: "__alloyId119"
    });
    $.__views.__alloyId117.add($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId118"
    });
    $.__views.__alloyId111.add($.__views.__alloyId118);
    navWindow ? $.__views.__alloyId118.addEventListener("click", navWindow) : __defers["$.__views.__alloyId118!click!navWindow"] = true;
    $.__views.__alloyId119 = Ti.UI.createLabel({
=======
        id: "__alloyId120"
    });
    $.__views.__alloyId113.add($.__views.__alloyId120);
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
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId119"
    });
    $.__views.__alloyId118.add($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createImageView({
=======
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
    $.__views.__alloyId122 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId120"
    });
    $.__views.__alloyId118.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createView({
=======
        id: "__alloyId122"
    });
    $.__views.__alloyId120.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId121"
    });
    $.__views.__alloyId111.add($.__views.__alloyId121);
    navWindow ? $.__views.__alloyId121.addEventListener("click", navWindow) : __defers["$.__views.__alloyId121!click!navWindow"] = true;
    $.__views.__alloyId122 = Ti.UI.createLabel({
=======
        id: "__alloyId123"
    });
    $.__views.__alloyId113.add($.__views.__alloyId123);
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
        text: "Children Health",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId122"
    });
    $.__views.__alloyId121.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createImageView({
=======
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId123"
    });
    $.__views.__alloyId121.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createView({
=======
        id: "__alloyId125"
    });
    $.__views.__alloyId123.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId124"
    });
    $.__views.__alloyId111.add($.__views.__alloyId124);
    navWindow ? $.__views.__alloyId124.addEventListener("click", navWindow) : __defers["$.__views.__alloyId124!click!navWindow"] = true;
    $.__views.__alloyId125 = Ti.UI.createLabel({
=======
        id: "__alloyId126"
    });
    $.__views.__alloyId113.add($.__views.__alloyId126);
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
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createImageView({
=======
        id: "__alloyId127"
    });
    $.__views.__alloyId126.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId126"
    });
    $.__views.__alloyId124.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createView({
=======
        id: "__alloyId128"
    });
    $.__views.__alloyId126.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId127"
    });
    $.__views.__alloyId111.add($.__views.__alloyId127);
    navWindow ? $.__views.__alloyId127.addEventListener("click", navWindow) : __defers["$.__views.__alloyId127!click!navWindow"] = true;
    $.__views.__alloyId128 = Ti.UI.createLabel({
=======
        id: "__alloyId129"
    });
    $.__views.__alloyId113.add($.__views.__alloyId129);
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
        text: "Children Health",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId128"
    });
    $.__views.__alloyId127.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createImageView({
=======
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId129"
    });
    $.__views.__alloyId127.add($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createView({
=======
        id: "__alloyId131"
    });
    $.__views.__alloyId129.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId130"
    });
    $.__views.__alloyId111.add($.__views.__alloyId130);
    navWindow ? $.__views.__alloyId130.addEventListener("click", navWindow) : __defers["$.__views.__alloyId130!click!navWindow"] = true;
    $.__views.__alloyId131 = Ti.UI.createLabel({
=======
        id: "__alloyId132"
    });
    $.__views.__alloyId113.add($.__views.__alloyId132);
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
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId131"
    });
    $.__views.__alloyId130.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createImageView({
=======
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId132"
    });
    $.__views.__alloyId130.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createView({
=======
        id: "__alloyId134"
    });
    $.__views.__alloyId132.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createView({
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId133"
    });
    $.__views.__alloyId111.add($.__views.__alloyId133);
    navWindow ? $.__views.__alloyId133.addEventListener("click", navWindow) : __defers["$.__views.__alloyId133!click!navWindow"] = true;
    $.__views.__alloyId134 = Ti.UI.createLabel({
=======
        id: "__alloyId135"
    });
    $.__views.__alloyId113.add($.__views.__alloyId135);
    navWindow ? $.__views.__alloyId135.addEventListener("click", navWindow) : __defers["$.__views.__alloyId135!click!navWindow"] = true;
    $.__views.__alloyId136 = Ti.UI.createLabel({
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
        id: "__alloyId134"
    });
    $.__views.__alloyId133.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createImageView({
=======
        id: "__alloyId136"
    });
    $.__views.__alloyId135.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId135"
    });
    $.__views.__alloyId133.add($.__views.__alloyId135);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId112!click!navWindow"] && $.__views.__alloyId112.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId115!click!navWindow"] && $.__views.__alloyId115.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId118!click!navWindow"] && $.__views.__alloyId118.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId121!click!navWindow"] && $.__views.__alloyId121.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId124!click!navWindow"] && $.__views.__alloyId124.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId127!click!navWindow"] && $.__views.__alloyId127.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId130!click!navWindow"] && $.__views.__alloyId130.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId133!click!navWindow"] && $.__views.__alloyId133.addEventListener("click", navWindow);
=======
        id: "__alloyId137"
    });
    $.__views.__alloyId135.add($.__views.__alloyId137);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId114!click!navWindow"] && $.__views.__alloyId114.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId117!click!navWindow"] && $.__views.__alloyId117.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId120!click!navWindow"] && $.__views.__alloyId120.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId123!click!navWindow"] && $.__views.__alloyId123.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId126!click!navWindow"] && $.__views.__alloyId126.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId129!click!navWindow"] && $.__views.__alloyId129.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId132!click!navWindow"] && $.__views.__alloyId132.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId135!click!navWindow"] && $.__views.__alloyId135.addEventListener("click", navWindow);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;