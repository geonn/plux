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
    $.__views.__alloyId206 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
        id: "__alloyId206"
    });
    $.__views.main.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
        id: "__alloyId207"
    });
    $.__views.__alloyId206.add($.__views.__alloyId207);
    navWindow ? $.__views.__alloyId207.addEventListener("click", navWindow) : __defers["$.__views.__alloyId207!click!navWindow"] = true;
    $.__views.__alloyId208 = Ti.UI.createLabel({
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
        id: "__alloyId208"
    });
    $.__views.__alloyId207.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
        id: "__alloyId209"
    });
    $.__views.__alloyId207.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
        id: "__alloyId210"
    });
    $.__views.__alloyId206.add($.__views.__alloyId210);
    navWindow ? $.__views.__alloyId210.addEventListener("click", navWindow) : __defers["$.__views.__alloyId210!click!navWindow"] = true;
    $.__views.__alloyId211 = Ti.UI.createLabel({
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
        id: "__alloyId211"
    });
    $.__views.__alloyId210.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
        id: "__alloyId212"
    });
    $.__views.__alloyId210.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId213"
    });
    $.__views.__alloyId206.add($.__views.__alloyId213);
    navWindow ? $.__views.__alloyId213.addEventListener("click", navWindow) : __defers["$.__views.__alloyId213!click!navWindow"] = true;
    $.__views.__alloyId214 = Ti.UI.createLabel({
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
        id: "__alloyId214"
    });
    $.__views.__alloyId213.add($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId215"
    });
    $.__views.__alloyId213.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId216"
    });
    $.__views.__alloyId206.add($.__views.__alloyId216);
    navWindow ? $.__views.__alloyId216.addEventListener("click", navWindow) : __defers["$.__views.__alloyId216!click!navWindow"] = true;
    $.__views.__alloyId217 = Ti.UI.createLabel({
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
        id: "__alloyId217"
    });
    $.__views.__alloyId216.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId218"
    });
    $.__views.__alloyId216.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId219"
    });
    $.__views.__alloyId206.add($.__views.__alloyId219);
    navWindow ? $.__views.__alloyId219.addEventListener("click", navWindow) : __defers["$.__views.__alloyId219!click!navWindow"] = true;
    $.__views.__alloyId220 = Ti.UI.createLabel({
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
        id: "__alloyId220"
    });
    $.__views.__alloyId219.add($.__views.__alloyId220);
    $.__views.__alloyId221 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId221"
    });
    $.__views.__alloyId219.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId222"
    });
    $.__views.__alloyId206.add($.__views.__alloyId222);
    navWindow ? $.__views.__alloyId222.addEventListener("click", navWindow) : __defers["$.__views.__alloyId222!click!navWindow"] = true;
    $.__views.__alloyId223 = Ti.UI.createLabel({
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
        id: "__alloyId223"
    });
    $.__views.__alloyId222.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId224"
    });
    $.__views.__alloyId222.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId225"
    });
    $.__views.__alloyId206.add($.__views.__alloyId225);
    navWindow ? $.__views.__alloyId225.addEventListener("click", navWindow) : __defers["$.__views.__alloyId225!click!navWindow"] = true;
    $.__views.__alloyId226 = Ti.UI.createLabel({
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
        id: "__alloyId226"
    });
    $.__views.__alloyId225.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId227"
    });
    $.__views.__alloyId225.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId228"
    });
    $.__views.__alloyId206.add($.__views.__alloyId228);
    navWindow ? $.__views.__alloyId228.addEventListener("click", navWindow) : __defers["$.__views.__alloyId228!click!navWindow"] = true;
    $.__views.__alloyId229 = Ti.UI.createLabel({
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
        id: "__alloyId229"
    });
    $.__views.__alloyId228.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId230"
    });
    $.__views.__alloyId228.add($.__views.__alloyId230);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId207!click!navWindow"] && $.__views.__alloyId207.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId210!click!navWindow"] && $.__views.__alloyId210.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId213!click!navWindow"] && $.__views.__alloyId213.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId216!click!navWindow"] && $.__views.__alloyId216.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId219!click!navWindow"] && $.__views.__alloyId219.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId222!click!navWindow"] && $.__views.__alloyId222.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId225!click!navWindow"] && $.__views.__alloyId225.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId228!click!navWindow"] && $.__views.__alloyId228.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;