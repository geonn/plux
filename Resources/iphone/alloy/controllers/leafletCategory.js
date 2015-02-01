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
    $.__views.__alloyId138 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
        id: "__alloyId138"
    });
    $.__views.main.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
    navWindow ? $.__views.__alloyId139.addEventListener("click", navWindow) : __defers["$.__views.__alloyId139!click!navWindow"] = true;
    $.__views.__alloyId140 = Ti.UI.createLabel({
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
        id: "__alloyId140"
    });
    $.__views.__alloyId139.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
        id: "__alloyId141"
    });
    $.__views.__alloyId139.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
        id: "__alloyId142"
    });
    $.__views.__alloyId138.add($.__views.__alloyId142);
    navWindow ? $.__views.__alloyId142.addEventListener("click", navWindow) : __defers["$.__views.__alloyId142!click!navWindow"] = true;
    $.__views.__alloyId143 = Ti.UI.createLabel({
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
        id: "__alloyId143"
    });
    $.__views.__alloyId142.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
        id: "__alloyId144"
    });
    $.__views.__alloyId142.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId145"
    });
    $.__views.__alloyId138.add($.__views.__alloyId145);
    navWindow ? $.__views.__alloyId145.addEventListener("click", navWindow) : __defers["$.__views.__alloyId145!click!navWindow"] = true;
    $.__views.__alloyId146 = Ti.UI.createLabel({
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
        id: "__alloyId146"
    });
    $.__views.__alloyId145.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId147"
    });
    $.__views.__alloyId145.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId148"
    });
    $.__views.__alloyId138.add($.__views.__alloyId148);
    navWindow ? $.__views.__alloyId148.addEventListener("click", navWindow) : __defers["$.__views.__alloyId148!click!navWindow"] = true;
    $.__views.__alloyId149 = Ti.UI.createLabel({
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
        id: "__alloyId149"
    });
    $.__views.__alloyId148.add($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId150"
    });
    $.__views.__alloyId148.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId151"
    });
    $.__views.__alloyId138.add($.__views.__alloyId151);
    navWindow ? $.__views.__alloyId151.addEventListener("click", navWindow) : __defers["$.__views.__alloyId151!click!navWindow"] = true;
    $.__views.__alloyId152 = Ti.UI.createLabel({
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
        id: "__alloyId152"
    });
    $.__views.__alloyId151.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId153"
    });
    $.__views.__alloyId151.add($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId154"
    });
    $.__views.__alloyId138.add($.__views.__alloyId154);
    navWindow ? $.__views.__alloyId154.addEventListener("click", navWindow) : __defers["$.__views.__alloyId154!click!navWindow"] = true;
    $.__views.__alloyId155 = Ti.UI.createLabel({
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
        id: "__alloyId155"
    });
    $.__views.__alloyId154.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId156"
    });
    $.__views.__alloyId154.add($.__views.__alloyId156);
    $.__views.__alloyId157 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId157"
    });
    $.__views.__alloyId138.add($.__views.__alloyId157);
    navWindow ? $.__views.__alloyId157.addEventListener("click", navWindow) : __defers["$.__views.__alloyId157!click!navWindow"] = true;
    $.__views.__alloyId158 = Ti.UI.createLabel({
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
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId159"
    });
    $.__views.__alloyId157.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "50%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId160"
    });
    $.__views.__alloyId138.add($.__views.__alloyId160);
    navWindow ? $.__views.__alloyId160.addEventListener("click", navWindow) : __defers["$.__views.__alloyId160!click!navWindow"] = true;
    $.__views.__alloyId161 = Ti.UI.createLabel({
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
        id: "__alloyId161"
    });
    $.__views.__alloyId160.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId162"
    });
    $.__views.__alloyId160.add($.__views.__alloyId162);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId139!click!navWindow"] && $.__views.__alloyId139.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId142!click!navWindow"] && $.__views.__alloyId142.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId145!click!navWindow"] && $.__views.__alloyId145.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId148!click!navWindow"] && $.__views.__alloyId148.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId151!click!navWindow"] && $.__views.__alloyId151.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId154!click!navWindow"] && $.__views.__alloyId154.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId157!click!navWindow"] && $.__views.__alloyId157.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId160!click!navWindow"] && $.__views.__alloyId160.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;