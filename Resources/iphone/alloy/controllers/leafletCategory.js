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
    $.__views.__alloyId127 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
        id: "__alloyId127"
    });
    $.__views.main.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
        id: "__alloyId128"
    });
    $.__views.__alloyId127.add($.__views.__alloyId128);
    navWindow ? $.__views.__alloyId128.addEventListener("click", navWindow) : __defers["$.__views.__alloyId128!click!navWindow"] = true;
    $.__views.__alloyId129 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Bone Health",
        mod: "Bone Health",
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
        id: "__alloyId130"
    });
    $.__views.__alloyId128.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
        id: "__alloyId131"
    });
    $.__views.__alloyId127.add($.__views.__alloyId131);
    navWindow ? $.__views.__alloyId131.addEventListener("click", navWindow) : __defers["$.__views.__alloyId131!click!navWindow"] = true;
    $.__views.__alloyId132 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Women Health",
        mod: "Women Health",
        id: "__alloyId132"
    });
    $.__views.__alloyId131.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
        id: "__alloyId133"
    });
    $.__views.__alloyId131.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId134"
    });
    $.__views.__alloyId127.add($.__views.__alloyId134);
    navWindow ? $.__views.__alloyId134.addEventListener("click", navWindow) : __defers["$.__views.__alloyId134!click!navWindow"] = true;
    $.__views.__alloyId135 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId136"
    });
    $.__views.__alloyId134.add($.__views.__alloyId136);
    $.__views.__alloyId137 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId137"
    });
    $.__views.__alloyId127.add($.__views.__alloyId137);
    navWindow ? $.__views.__alloyId137.addEventListener("click", navWindow) : __defers["$.__views.__alloyId137!click!navWindow"] = true;
    $.__views.__alloyId138 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId139"
    });
    $.__views.__alloyId137.add($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId140"
    });
    $.__views.__alloyId127.add($.__views.__alloyId140);
    navWindow ? $.__views.__alloyId140.addEventListener("click", navWindow) : __defers["$.__views.__alloyId140!click!navWindow"] = true;
    $.__views.__alloyId141 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId142"
    });
    $.__views.__alloyId140.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId143"
    });
    $.__views.__alloyId127.add($.__views.__alloyId143);
    navWindow ? $.__views.__alloyId143.addEventListener("click", navWindow) : __defers["$.__views.__alloyId143!click!navWindow"] = true;
    $.__views.__alloyId144 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId145"
    });
    $.__views.__alloyId143.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId146"
    });
    $.__views.__alloyId127.add($.__views.__alloyId146);
    navWindow ? $.__views.__alloyId146.addEventListener("click", navWindow) : __defers["$.__views.__alloyId146!click!navWindow"] = true;
    $.__views.__alloyId147 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
        id: "__alloyId147"
    });
    $.__views.__alloyId146.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId148"
    });
    $.__views.__alloyId146.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId149"
    });
    $.__views.__alloyId127.add($.__views.__alloyId149);
    navWindow ? $.__views.__alloyId149.addEventListener("click", navWindow) : __defers["$.__views.__alloyId149!click!navWindow"] = true;
    $.__views.__alloyId150 = Ti.UI.createLabel({
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
        id: "__alloyId150"
    });
    $.__views.__alloyId149.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId151"
    });
    $.__views.__alloyId149.add($.__views.__alloyId151);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId128!click!navWindow"] && $.__views.__alloyId128.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId131!click!navWindow"] && $.__views.__alloyId131.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId134!click!navWindow"] && $.__views.__alloyId134.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId137!click!navWindow"] && $.__views.__alloyId137.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId140!click!navWindow"] && $.__views.__alloyId140.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId143!click!navWindow"] && $.__views.__alloyId143.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId146!click!navWindow"] && $.__views.__alloyId146.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId149!click!navWindow"] && $.__views.__alloyId149.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;