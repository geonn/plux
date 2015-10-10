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
    $.__views.__alloyId81 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId81"
    });
    $.__views.hra.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId82"
    });
    $.__views.__alloyId81.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId83.add($.__views.btnBack);
    $.__views.__alloyId84 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId84"
    });
    $.__views.__alloyId82.add($.__views.__alloyId84);
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
    $.__views.__alloyId84.add($.__views.pageTitle);
    var __alloyId85 = [];
    $.__views.__alloyId86 = Ti.UI.createTableViewRow({
        mod: "bmi",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId86"
    });
    __alloyId85.push($.__views.__alloyId86);
    $.__views.__alloyId87 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "BMI Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId87"
    });
    $.__views.__alloyId86.add($.__views.__alloyId87);
    $.__views.__alloyId88 = Ti.UI.createTableViewRow({
        mod: "whratio",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId88"
    });
    __alloyId85.push($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Waist-To-Hips Ratio Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createTableViewRow({
        mod: "nutritional_profile",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId90"
    });
    __alloyId85.push($.__views.__alloyId90);
    $.__views.__alloyId91 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Nutritional Profile",
        textAlign: "left",
        left: "15",
        id: "__alloyId91"
    });
    $.__views.__alloyId90.add($.__views.__alloyId91);
    $.__views.__alloyId92 = Ti.UI.createTableViewRow({
        mod: "smokecost",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId92"
    });
    __alloyId85.push($.__views.__alloyId92);
    $.__views.__alloyId93 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Smoking Cost Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId93"
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createTableViewRow({
        mod: "diabetes",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId94"
    });
    __alloyId85.push($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Diabetes Risk Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId95"
    });
    $.__views.__alloyId94.add($.__views.__alloyId95);
    $.__views.menu = Ti.UI.createTableView({
        data: __alloyId85,
        id: "menu"
    });
    $.__views.__alloyId81.add($.__views.menu);
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