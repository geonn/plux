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
    var __alloyId143 = [];
    $.__views.__alloyId144 = {
        properties: {
            link: "https://www.asp-medical-clinic.com.my/Employee/HRA/Form_BMI.aspx",
            title: "BMI Calculator",
            id: "__alloyId144"
        }
    };
    __alloyId143.push($.__views.__alloyId144);
    $.__views.__alloyId145 = {
        properties: {
            link: "https://www.asp-medical-clinic.com.my/Employee/HRA/Form_WHRatio.aspx",
            title: "Waist-To-Hips Ratio Calculator",
            id: "__alloyId145"
        }
    };
    __alloyId143.push($.__views.__alloyId145);
    $.__views.__alloyId146 = {
        properties: {
            link: "https://www.asp-medical-clinic.com.my/Employee/HRA/Form_NutritionalProfile.aspx",
            title: "Nutritional Profile",
            id: "__alloyId146"
        }
    };
    __alloyId143.push($.__views.__alloyId146);
    $.__views.__alloyId147 = {
        properties: {
            link: "https://www.asp-medical-clinic.com.my/Employee/HRA/Form_Smoking.aspx",
            title: "Smoking Cost Calculator",
            id: "__alloyId147"
        }
    };
    __alloyId143.push($.__views.__alloyId147);
    $.__views.__alloyId148 = {
        properties: {
            link: "https://www.asp-medical-clinic.com.my/Employee/HRA/Form_Diabetes.aspx",
            title: "Diabetes Risk Calculator",
            id: "__alloyId148"
        }
    };
    __alloyId143.push($.__views.__alloyId148);
    $.__views.__alloyId149 = {
        properties: {
            link: "https://www.asp-medical-clinic.com.my/Employee/HRA/Form_CHD.aspx",
            title: "Coronary Heart Disease Risk Calculator",
            id: "__alloyId149"
        }
    };
    __alloyId143.push($.__views.__alloyId149);
    $.__views.__alloyId141 = Ti.UI.createListSection({
        id: "__alloyId141"
    });
    $.__views.__alloyId141.items = __alloyId143;
    var __alloyId150 = [];
    __alloyId150.push($.__views.__alloyId141);
    $.__views.menu = Ti.UI.createListView({
        sections: __alloyId150,
        id: "menu"
    });
    $.__views.hra.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menu.addEventListener("itemclick", function(e) {
        var item = e.section.getItemAt(e.itemIndex);
        var webview = Titanium.UI.createWebView({
            url: item.properties.link
        });
        nav.navigationWebview(webview, item.properties.title);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;