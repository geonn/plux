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
    $.__views.__alloyId178 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
        id: "__alloyId178"
    });
    $.__views.main.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
        id: "__alloyId179"
    });
    $.__views.__alloyId178.add($.__views.__alloyId179);
    navWindow ? $.__views.__alloyId179.addEventListener("click", navWindow) : __defers["$.__views.__alloyId179!click!navWindow"] = true;
    $.__views.__alloyId180 = Ti.UI.createLabel({
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
        id: "__alloyId180"
    });
    $.__views.__alloyId179.add($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
        id: "__alloyId181"
    });
    $.__views.__alloyId179.add($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
        id: "__alloyId182"
    });
    $.__views.__alloyId178.add($.__views.__alloyId182);
    navWindow ? $.__views.__alloyId182.addEventListener("click", navWindow) : __defers["$.__views.__alloyId182!click!navWindow"] = true;
    $.__views.__alloyId183 = Ti.UI.createLabel({
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
        id: "__alloyId183"
    });
    $.__views.__alloyId182.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
        id: "__alloyId184"
    });
    $.__views.__alloyId182.add($.__views.__alloyId184);
    $.__views.__alloyId185 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId185"
    });
    $.__views.__alloyId178.add($.__views.__alloyId185);
    navWindow ? $.__views.__alloyId185.addEventListener("click", navWindow) : __defers["$.__views.__alloyId185!click!navWindow"] = true;
    $.__views.__alloyId186 = Ti.UI.createLabel({
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
        id: "__alloyId186"
    });
    $.__views.__alloyId185.add($.__views.__alloyId186);
    $.__views.__alloyId187 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId187"
    });
    $.__views.__alloyId185.add($.__views.__alloyId187);
    $.__views.__alloyId188 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId188"
    });
    $.__views.__alloyId178.add($.__views.__alloyId188);
    navWindow ? $.__views.__alloyId188.addEventListener("click", navWindow) : __defers["$.__views.__alloyId188!click!navWindow"] = true;
    $.__views.__alloyId189 = Ti.UI.createLabel({
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
        id: "__alloyId189"
    });
    $.__views.__alloyId188.add($.__views.__alloyId189);
    $.__views.__alloyId190 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId190"
    });
    $.__views.__alloyId188.add($.__views.__alloyId190);
    $.__views.__alloyId191 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId191"
    });
    $.__views.__alloyId178.add($.__views.__alloyId191);
    navWindow ? $.__views.__alloyId191.addEventListener("click", navWindow) : __defers["$.__views.__alloyId191!click!navWindow"] = true;
    $.__views.__alloyId192 = Ti.UI.createLabel({
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
        id: "__alloyId192"
    });
    $.__views.__alloyId191.add($.__views.__alloyId192);
    $.__views.__alloyId193 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId193"
    });
    $.__views.__alloyId191.add($.__views.__alloyId193);
    $.__views.__alloyId194 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId194"
    });
    $.__views.__alloyId178.add($.__views.__alloyId194);
    navWindow ? $.__views.__alloyId194.addEventListener("click", navWindow) : __defers["$.__views.__alloyId194!click!navWindow"] = true;
    $.__views.__alloyId195 = Ti.UI.createLabel({
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
        id: "__alloyId195"
    });
    $.__views.__alloyId194.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId196"
    });
    $.__views.__alloyId194.add($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
        id: "__alloyId197"
    });
    $.__views.__alloyId178.add($.__views.__alloyId197);
    navWindow ? $.__views.__alloyId197.addEventListener("click", navWindow) : __defers["$.__views.__alloyId197!click!navWindow"] = true;
    $.__views.__alloyId198 = Ti.UI.createLabel({
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
        id: "__alloyId198"
    });
    $.__views.__alloyId197.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
        id: "__alloyId199"
    });
    $.__views.__alloyId197.add($.__views.__alloyId199);
    $.__views.__alloyId200 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
        id: "__alloyId200"
    });
    $.__views.__alloyId178.add($.__views.__alloyId200);
    navWindow ? $.__views.__alloyId200.addEventListener("click", navWindow) : __defers["$.__views.__alloyId200!click!navWindow"] = true;
    $.__views.__alloyId201 = Ti.UI.createLabel({
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
        id: "__alloyId201"
    });
    $.__views.__alloyId200.add($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
        id: "__alloyId202"
    });
    $.__views.__alloyId200.add($.__views.__alloyId202);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId179!click!navWindow"] && $.__views.__alloyId179.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId182!click!navWindow"] && $.__views.__alloyId182.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId185!click!navWindow"] && $.__views.__alloyId185.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId188!click!navWindow"] && $.__views.__alloyId188.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId191!click!navWindow"] && $.__views.__alloyId191.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId194!click!navWindow"] && $.__views.__alloyId194.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId197!click!navWindow"] && $.__views.__alloyId197.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId200!click!navWindow"] && $.__views.__alloyId200.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;