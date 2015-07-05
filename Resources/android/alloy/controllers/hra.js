function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "hra";
    this.args = arguments[0] || {};
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
    $.__views.hra = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Health Risk Assessment",
        id: "hra",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.hra && $.addTopLevelView($.__views.hra);
    $.__views.__alloyId26 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        id: "__alloyId26"
    });
    $.__views.hra.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId28.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId27.add($.__views.pageTitle);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Health Risk Assessment",
        textAlign: "center",
        id: "__alloyId29"
    });
    $.__views.pageTitle.add($.__views.__alloyId29);
    var __alloyId32 = [];
    $.__views.__alloyId33 = {
        properties: {
            mod: "bmi",
            height: "40",
            color: "#6B6B6B",
            title: "BMI Calculator",
            id: "__alloyId33"
        }
    };
    __alloyId32.push($.__views.__alloyId33);
    $.__views.__alloyId34 = {
        properties: {
            mod: "whratio",
            height: "40",
            color: "#6B6B6B",
            title: "Waist-To-Hips Ratio Calculator",
            id: "__alloyId34"
        }
    };
    __alloyId32.push($.__views.__alloyId34);
    $.__views.__alloyId35 = {
        properties: {
            mod: "nutritional_profile",
            height: "40",
            color: "#6B6B6B",
            title: "Nutritional Profile",
            id: "__alloyId35"
        }
    };
    __alloyId32.push($.__views.__alloyId35);
    $.__views.__alloyId36 = {
        properties: {
            mod: "smokecost",
            height: "40",
            color: "#6B6B6B",
            title: "Smoking Cost Calculator",
            id: "__alloyId36"
        }
    };
    __alloyId32.push($.__views.__alloyId36);
    $.__views.__alloyId37 = {
        properties: {
            mod: "diabetes",
            height: "40",
            color: "#6B6B6B",
            title: "Diabetes Risk Calculator",
            id: "__alloyId37"
        }
    };
    __alloyId32.push($.__views.__alloyId37);
    $.__views.__alloyId30 = Ti.UI.createListSection({
        id: "__alloyId30"
    });
    $.__views.__alloyId30.items = __alloyId32;
    var __alloyId38 = [];
    __alloyId38.push($.__views.__alloyId30);
    $.__views.menu = Ti.UI.createListView({
        sections: __alloyId38,
        id: "menu"
    });
    $.__views.__alloyId26.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menu.addEventListener("itemclick", function(e) {
        var item = e.section.getItemAt(e.itemIndex);
        nav.navigateWithArgs("hra_detail", {
            mod: item.properties.mod
        });
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.hra);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;