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
    $.__views.__alloyId138 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId138"
    });
    $.__views.hra.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId140"
    });
    $.__views.__alloyId139.add($.__views.__alloyId140);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId140.add($.__views.btnBack);
    $.__views.__alloyId141 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId141"
    });
    $.__views.__alloyId139.add($.__views.__alloyId141);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Health Risk Assessment",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId141.add($.__views.pageTitle);
    var __alloyId142 = [];
    $.__views.__alloyId143 = Ti.UI.createTableViewRow({
        mod: "bmi",
        height: 40,
        top: 5,
        bottom: 5,
        id: "__alloyId143"
    });
    __alloyId142.push($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "BMI Calculator",
        textAlign: "left",
        left: 15,
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createTableViewRow({
        mod: "whratio",
        height: 40,
        top: 5,
        bottom: 5,
        id: "__alloyId145"
    });
    __alloyId142.push($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Waist-To-Hips Ratio Calculator",
        textAlign: "left",
        left: 15,
        id: "__alloyId146"
    });
    $.__views.__alloyId145.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createTableViewRow({
        mod: "nutritional_profile",
        height: 40,
        top: 5,
        bottom: 5,
        id: "__alloyId147"
    });
    __alloyId142.push($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Nutritional Profile",
        textAlign: "left",
        left: 15,
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createTableViewRow({
        mod: "smokecost",
        height: 40,
        top: 5,
        bottom: 5,
        id: "__alloyId149"
    });
    __alloyId142.push($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Smoking Cost Calculator",
        textAlign: "left",
        left: 15,
        id: "__alloyId150"
    });
    $.__views.__alloyId149.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createTableViewRow({
        mod: "diabetes",
        height: 40,
        top: 5,
        bottom: 5,
        id: "__alloyId151"
    });
    __alloyId142.push($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Diabetes Risk Calculator",
        textAlign: "left",
        left: 15,
        id: "__alloyId152"
    });
    $.__views.__alloyId151.add($.__views.__alloyId152);
    $.__views.menu = Ti.UI.createTableView({
        data: __alloyId142,
        id: "menu"
    });
    $.__views.__alloyId138.add($.__views.menu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menu.addEventListener("click", function(e) {
        var elbl = JSON.stringify(e.rowData);
        var res = JSON.parse(elbl);
        nav.navigateWithArgs("hra_detail", {
            mod: res.mod
        });
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.hra);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;