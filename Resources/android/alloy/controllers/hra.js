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
    $.__views.__alloyId104 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId104"
    });
    $.__views.hra.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId105"
    });
    $.__views.__alloyId104.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId106"
    });
    $.__views.__alloyId105.add($.__views.__alloyId106);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId106.add($.__views.btnBack);
    $.__views.__alloyId107 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId107"
    });
    $.__views.__alloyId105.add($.__views.__alloyId107);
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
    $.__views.__alloyId107.add($.__views.pageTitle);
    var __alloyId108 = [];
    $.__views.__alloyId109 = Ti.UI.createTableViewRow({
        mod: "bmi",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId109"
    });
    __alloyId108.push($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "BMI Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId110"
    });
    $.__views.__alloyId109.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createTableViewRow({
        mod: "whratio",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId111"
    });
    __alloyId108.push($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Waist-To-Hips Ratio Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId112"
    });
    $.__views.__alloyId111.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createTableViewRow({
        mod: "nutritional_profile",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId113"
    });
    __alloyId108.push($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Nutritional Profile",
        textAlign: "left",
        left: "15",
        id: "__alloyId114"
    });
    $.__views.__alloyId113.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createTableViewRow({
        mod: "smokecost",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId115"
    });
    __alloyId108.push($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Smoking Cost Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createTableViewRow({
        mod: "diabetes",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId117"
    });
    __alloyId108.push($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Diabetes Risk Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId118"
    });
    $.__views.__alloyId117.add($.__views.__alloyId118);
    $.__views.menu = Ti.UI.createTableView({
        data: __alloyId108,
        id: "menu"
    });
    $.__views.__alloyId104.add($.__views.menu);
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