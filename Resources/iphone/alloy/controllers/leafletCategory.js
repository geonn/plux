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
    $.__views.__alloyId195 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
        id: "__alloyId195"
    });
    $.__views.main.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
        id: "__alloyId196"
    });
    $.__views.__alloyId195.add($.__views.__alloyId196);
    navWindow ? $.__views.__alloyId196.addEventListener("click", navWindow) : __defers["$.__views.__alloyId196!click!navWindow"] = true;
    $.__views.__alloyId197 = Ti.UI.createLabel({
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
        id: "__alloyId197"
    });
    $.__views.__alloyId196.add($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
        id: "__alloyId198"
    });
    $.__views.__alloyId196.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
        id: "__alloyId199"
    });
    $.__views.__alloyId195.add($.__views.__alloyId199);
    navWindow ? $.__views.__alloyId199.addEventListener("click", navWindow) : __defers["$.__views.__alloyId199!click!navWindow"] = true;
    $.__views.__alloyId200 = Ti.UI.createLabel({
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
        id: "__alloyId200"
    });
    $.__views.__alloyId199.add($.__views.__alloyId200);
    $.__views.__alloyId201 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
        id: "__alloyId201"
    });
    $.__views.__alloyId199.add($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId202"
    });
    $.__views.__alloyId195.add($.__views.__alloyId202);
    navWindow ? $.__views.__alloyId202.addEventListener("click", navWindow) : __defers["$.__views.__alloyId202!click!navWindow"] = true;
    $.__views.__alloyId203 = Ti.UI.createLabel({
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
        id: "__alloyId203"
    });
    $.__views.__alloyId202.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId204"
    });
    $.__views.__alloyId202.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId205"
    });
    $.__views.__alloyId195.add($.__views.__alloyId205);
    navWindow ? $.__views.__alloyId205.addEventListener("click", navWindow) : __defers["$.__views.__alloyId205!click!navWindow"] = true;
    $.__views.__alloyId206 = Ti.UI.createLabel({
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
        id: "__alloyId206"
    });
    $.__views.__alloyId205.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId207"
    });
    $.__views.__alloyId205.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId208"
    });
    $.__views.__alloyId195.add($.__views.__alloyId208);
    navWindow ? $.__views.__alloyId208.addEventListener("click", navWindow) : __defers["$.__views.__alloyId208!click!navWindow"] = true;
    $.__views.__alloyId209 = Ti.UI.createLabel({
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
        id: "__alloyId209"
    });
    $.__views.__alloyId208.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId210"
    });
    $.__views.__alloyId208.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId211"
    });
    $.__views.__alloyId195.add($.__views.__alloyId211);
    navWindow ? $.__views.__alloyId211.addEventListener("click", navWindow) : __defers["$.__views.__alloyId211!click!navWindow"] = true;
    $.__views.__alloyId212 = Ti.UI.createLabel({
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
        id: "__alloyId212"
    });
    $.__views.__alloyId211.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId213"
    });
    $.__views.__alloyId211.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId214"
    });
    $.__views.__alloyId195.add($.__views.__alloyId214);
    navWindow ? $.__views.__alloyId214.addEventListener("click", navWindow) : __defers["$.__views.__alloyId214!click!navWindow"] = true;
    $.__views.__alloyId215 = Ti.UI.createLabel({
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
        id: "__alloyId215"
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId216"
    });
    $.__views.__alloyId214.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId217"
    });
    $.__views.__alloyId195.add($.__views.__alloyId217);
    navWindow ? $.__views.__alloyId217.addEventListener("click", navWindow) : __defers["$.__views.__alloyId217!click!navWindow"] = true;
    $.__views.__alloyId218 = Ti.UI.createLabel({
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
        id: "__alloyId218"
    });
    $.__views.__alloyId217.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId219"
    });
    $.__views.__alloyId217.add($.__views.__alloyId219);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId196!click!navWindow"] && $.__views.__alloyId196.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId199!click!navWindow"] && $.__views.__alloyId199.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId202!click!navWindow"] && $.__views.__alloyId202.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId205!click!navWindow"] && $.__views.__alloyId205.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId208!click!navWindow"] && $.__views.__alloyId208.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId211!click!navWindow"] && $.__views.__alloyId211.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId214!click!navWindow"] && $.__views.__alloyId214.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId217!click!navWindow"] && $.__views.__alloyId217.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;