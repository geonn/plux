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
    $.__views.__alloyId122 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
        id: "__alloyId122"
    });
    $.__views.main.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    navWindow ? $.__views.__alloyId123.addEventListener("click", navWindow) : __defers["$.__views.__alloyId123!click!navWindow"] = true;
    $.__views.__alloyId124 = Ti.UI.createLabel({
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
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
        id: "__alloyId125"
    });
    $.__views.__alloyId123.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
        id: "__alloyId126"
    });
    $.__views.__alloyId122.add($.__views.__alloyId126);
    navWindow ? $.__views.__alloyId126.addEventListener("click", navWindow) : __defers["$.__views.__alloyId126!click!navWindow"] = true;
    $.__views.__alloyId127 = Ti.UI.createLabel({
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
        id: "__alloyId127"
    });
    $.__views.__alloyId126.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
        id: "__alloyId128"
    });
    $.__views.__alloyId126.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId129"
    });
    $.__views.__alloyId122.add($.__views.__alloyId129);
    navWindow ? $.__views.__alloyId129.addEventListener("click", navWindow) : __defers["$.__views.__alloyId129!click!navWindow"] = true;
    $.__views.__alloyId130 = Ti.UI.createLabel({
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
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId131"
    });
    $.__views.__alloyId129.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId132"
    });
    $.__views.__alloyId122.add($.__views.__alloyId132);
    navWindow ? $.__views.__alloyId132.addEventListener("click", navWindow) : __defers["$.__views.__alloyId132!click!navWindow"] = true;
    $.__views.__alloyId133 = Ti.UI.createLabel({
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
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId134"
    });
    $.__views.__alloyId132.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId135"
    });
    $.__views.__alloyId122.add($.__views.__alloyId135);
    navWindow ? $.__views.__alloyId135.addEventListener("click", navWindow) : __defers["$.__views.__alloyId135!click!navWindow"] = true;
    $.__views.__alloyId136 = Ti.UI.createLabel({
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
        id: "__alloyId136"
    });
    $.__views.__alloyId135.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId137"
    });
    $.__views.__alloyId135.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId138"
    });
    $.__views.__alloyId122.add($.__views.__alloyId138);
    navWindow ? $.__views.__alloyId138.addEventListener("click", navWindow) : __defers["$.__views.__alloyId138!click!navWindow"] = true;
    $.__views.__alloyId139 = Ti.UI.createLabel({
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
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId140"
    });
    $.__views.__alloyId138.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId141"
    });
    $.__views.__alloyId122.add($.__views.__alloyId141);
    navWindow ? $.__views.__alloyId141.addEventListener("click", navWindow) : __defers["$.__views.__alloyId141!click!navWindow"] = true;
    $.__views.__alloyId142 = Ti.UI.createLabel({
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
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId143"
    });
    $.__views.__alloyId141.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId144"
    });
    $.__views.__alloyId122.add($.__views.__alloyId144);
    navWindow ? $.__views.__alloyId144.addEventListener("click", navWindow) : __defers["$.__views.__alloyId144!click!navWindow"] = true;
    $.__views.__alloyId145 = Ti.UI.createLabel({
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
        id: "__alloyId145"
    });
    $.__views.__alloyId144.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId146"
    });
    $.__views.__alloyId144.add($.__views.__alloyId146);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId123!click!navWindow"] && $.__views.__alloyId123.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId126!click!navWindow"] && $.__views.__alloyId126.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId129!click!navWindow"] && $.__views.__alloyId129.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId132!click!navWindow"] && $.__views.__alloyId132.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId135!click!navWindow"] && $.__views.__alloyId135.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId138!click!navWindow"] && $.__views.__alloyId138.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId141!click!navWindow"] && $.__views.__alloyId141.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId144!click!navWindow"] && $.__views.__alloyId144.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;