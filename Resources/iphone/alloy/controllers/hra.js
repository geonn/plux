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
    $.__views.__alloyId64 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId64"
    });
    $.__views.hra.add($.__views.__alloyId64);
    var __alloyId65 = [];
    $.__views.__alloyId66 = Ti.UI.createTableViewRow({
        mod: "bmi",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId66"
    });
    __alloyId65.push($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "BMI Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createTableViewRow({
        mod: "whratio",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId68"
    });
    __alloyId65.push($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Waist-To-Hips Ratio Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createTableViewRow({
        mod: "nutritional_profile",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId70"
    });
    __alloyId65.push($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Nutritional Profile",
        textAlign: "left",
        left: "15",
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createTableViewRow({
        mod: "smokecost",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId72"
    });
    __alloyId65.push($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Smoking Cost Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createTableViewRow({
        mod: "diabetes",
        height: "40",
        top: "5",
        bottom: "5",
        id: "__alloyId74"
    });
    __alloyId65.push($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        text: "Diabetes Risk Calculator",
        textAlign: "left",
        left: "15",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    $.__views.menu = Ti.UI.createTableView({
        data: __alloyId65,
        id: "menu"
    });
    $.__views.__alloyId64.add($.__views.menu);
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
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.hra);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;