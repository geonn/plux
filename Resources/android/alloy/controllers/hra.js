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
    $.__views.__alloyId43 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId43"
    });
    $.__views.hra.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId45"
    });
    $.__views.__alloyId44.add($.__views.__alloyId45);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId45.add($.__views.btnBack);
    $.__views.__alloyId46 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId46"
    });
    $.__views.__alloyId44.add($.__views.__alloyId46);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Health Risk Assessment",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId46.add($.__views.pageTitle);
    var __alloyId49 = [];
    $.__views.__alloyId50 = {
        properties: {
            color: "#000",
            mod: "bmi",
            title: "BMI Calculator",
            id: "__alloyId50"
        }
    };
    __alloyId49.push($.__views.__alloyId50);
    $.__views.__alloyId51 = {
        properties: {
            color: "#000",
            mod: "whratio",
            title: "Waist-To-Hips Ratio Calculator",
            id: "__alloyId51"
        }
    };
    __alloyId49.push($.__views.__alloyId51);
    $.__views.__alloyId52 = {
        properties: {
            color: "#000",
            mod: "nutritional_profile",
            title: "Nutritional Profile",
            id: "__alloyId52"
        }
    };
    __alloyId49.push($.__views.__alloyId52);
    $.__views.__alloyId53 = {
        properties: {
            color: "#000",
            mod: "smokecost",
            title: "Smoking Cost Calculator",
            id: "__alloyId53"
        }
    };
    __alloyId49.push($.__views.__alloyId53);
    $.__views.__alloyId54 = {
        properties: {
            color: "#000",
            mod: "diabetes",
            title: "Diabetes Risk Calculator",
            id: "__alloyId54"
        }
    };
    __alloyId49.push($.__views.__alloyId54);
    $.__views.__alloyId47 = Ti.UI.createListSection({
        id: "__alloyId47"
    });
    $.__views.__alloyId47.items = __alloyId49;
    var __alloyId55 = [];
    __alloyId55.push($.__views.__alloyId47);
    $.__views.menu = Ti.UI.createListView({
        sections: __alloyId55,
        id: "menu"
    });
    $.__views.__alloyId43.add($.__views.menu);
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