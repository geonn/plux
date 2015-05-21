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
    var __alloyId144 = [];
    $.__views.__alloyId145 = {
        properties: {
            mod: "bmi",
            title: "BMI Calculator",
            id: "__alloyId145"
        }
    };
    __alloyId144.push($.__views.__alloyId145);
    $.__views.__alloyId146 = {
        properties: {
            mod: "whratio",
            title: "Waist-To-Hips Ratio Calculator",
            id: "__alloyId146"
        }
    };
    __alloyId144.push($.__views.__alloyId146);
    $.__views.__alloyId147 = {
        properties: {
            mod: "nutritional_profile",
            title: "Nutritional Profile",
            id: "__alloyId147"
        }
    };
    __alloyId144.push($.__views.__alloyId147);
    $.__views.__alloyId148 = {
        properties: {
            mod: "smokecost",
            title: "Smoking Cost Calculator",
            id: "__alloyId148"
        }
    };
    __alloyId144.push($.__views.__alloyId148);
    $.__views.__alloyId149 = {
        properties: {
            mod: "diabetes",
            title: "Diabetes Risk Calculator",
            id: "__alloyId149"
        }
    };
    __alloyId144.push($.__views.__alloyId149);
    $.__views.__alloyId150 = {
        properties: {
            mod: "chd",
            title: "Coronary Heart Disease Risk Calculator",
            id: "__alloyId150"
        }
    };
    __alloyId144.push($.__views.__alloyId150);
    $.__views.__alloyId142 = Ti.UI.createListSection({
        id: "__alloyId142"
    });
    $.__views.__alloyId142.items = __alloyId144;
    var __alloyId151 = [];
    __alloyId151.push($.__views.__alloyId142);
    $.__views.menu = Ti.UI.createListView({
        sections: __alloyId151,
        id: "menu"
    });
    $.__views.hra.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menu.addEventListener("itemclick", function(e) {
        var item = e.section.getItemAt(e.itemIndex);
        console.log(item.properties.mod);
        nav.navigateWithArgs("hraDetail", {
            mod: item.properties.mod
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;