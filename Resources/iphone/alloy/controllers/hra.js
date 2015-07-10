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
    $.__views.__alloyId63 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId63"
    });
    $.__views.hra.add($.__views.__alloyId63);
    var __alloyId66 = [];
    $.__views.__alloyId67 = {
        properties: {
            color: "#000",
            mod: "bmi",
            title: "BMI Calculator",
            id: "__alloyId67"
        }
    };
    __alloyId66.push($.__views.__alloyId67);
    $.__views.__alloyId68 = {
        properties: {
            color: "#000",
            mod: "whratio",
            title: "Waist-To-Hips Ratio Calculator",
            id: "__alloyId68"
        }
    };
    __alloyId66.push($.__views.__alloyId68);
    $.__views.__alloyId69 = {
        properties: {
            color: "#000",
            mod: "nutritional_profile",
            title: "Nutritional Profile",
            id: "__alloyId69"
        }
    };
    __alloyId66.push($.__views.__alloyId69);
    $.__views.__alloyId70 = {
        properties: {
            color: "#000",
            mod: "smokecost",
            title: "Smoking Cost Calculator",
            id: "__alloyId70"
        }
    };
    __alloyId66.push($.__views.__alloyId70);
    $.__views.__alloyId71 = {
        properties: {
            color: "#000",
            mod: "diabetes",
            title: "Diabetes Risk Calculator",
            id: "__alloyId71"
        }
    };
    __alloyId66.push($.__views.__alloyId71);
    $.__views.__alloyId64 = Ti.UI.createListSection({
        id: "__alloyId64"
    });
    $.__views.__alloyId64.items = __alloyId66;
    var __alloyId72 = [];
    __alloyId72.push($.__views.__alloyId64);
    $.__views.menu = Ti.UI.createListView({
        sections: __alloyId72,
        id: "menu"
    });
    $.__views.__alloyId63.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menu.addEventListener("itemclick", function(e) {
        var item = e.section.getItemAt(e.itemIndex);
        nav.navigateWithArgs("hra_detail", {
            mod: item.properties.mod
        });
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.hra);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;