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
<<<<<<< HEAD
    $.__views.__alloyId164 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId164"
    });
    $.__views.hra.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createView({
=======
    $.__views.__alloyId152 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId152"
    });
    $.__views.hra.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId165"
    });
    $.__views.__alloyId164.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
=======
        id: "__alloyId153"
    });
    $.__views.__alloyId152.add($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId166.add($.__views.btnBack);
    $.__views.__alloyId167 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId167"
    });
    $.__views.__alloyId165.add($.__views.__alloyId167);
=======
    $.__views.__alloyId154.add($.__views.btnBack);
    $.__views.__alloyId155 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId155"
    });
    $.__views.__alloyId153.add($.__views.__alloyId155);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId167.add($.__views.pageTitle);
    var __alloyId168 = [];
    $.__views.__alloyId169 = Ti.UI.createTableViewRow({
=======
    $.__views.__alloyId155.add($.__views.pageTitle);
    var __alloyId156 = [];
    $.__views.__alloyId157 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        color: "#606060",
        top: 5,
        bottom: 5,
        mod: "bmi",
        height: 40,
<<<<<<< HEAD
        id: "__alloyId169"
    });
    __alloyId168.push($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createLabel({
=======
        id: "__alloyId157"
    });
    __alloyId156.push($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "BMI Calculator",
        textAlign: "left",
        left: 15,
<<<<<<< HEAD
        id: "__alloyId170"
    });
    $.__views.__alloyId169.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createTableViewRow({
=======
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        color: "#606060",
        top: 5,
        bottom: 5,
        mod: "whratio",
        height: 40,
<<<<<<< HEAD
        id: "__alloyId171"
    });
    __alloyId168.push($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createLabel({
=======
        id: "__alloyId159"
    });
    __alloyId156.push($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Waist-To-Hips Ratio Calculator",
        textAlign: "left",
        left: 15,
<<<<<<< HEAD
        id: "__alloyId172"
    });
    $.__views.__alloyId171.add($.__views.__alloyId172);
    $.__views.__alloyId173 = Ti.UI.createTableViewRow({
=======
        id: "__alloyId160"
    });
    $.__views.__alloyId159.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        color: "#606060",
        top: 5,
        bottom: 5,
        mod: "nutritional_profile",
        height: 40,
<<<<<<< HEAD
        id: "__alloyId173"
    });
    __alloyId168.push($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createLabel({
=======
        id: "__alloyId161"
    });
    __alloyId156.push($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Nutritional Profile",
        textAlign: "left",
        left: 15,
<<<<<<< HEAD
        id: "__alloyId174"
    });
    $.__views.__alloyId173.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createTableViewRow({
=======
        id: "__alloyId162"
    });
    $.__views.__alloyId161.add($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        color: "#606060",
        top: 5,
        bottom: 5,
        mod: "smokecost",
        height: 40,
<<<<<<< HEAD
        id: "__alloyId175"
    });
    __alloyId168.push($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createLabel({
=======
        id: "__alloyId163"
    });
    __alloyId156.push($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Smoking Cost Calculator",
        textAlign: "left",
        left: 15,
<<<<<<< HEAD
        id: "__alloyId176"
    });
    $.__views.__alloyId175.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createTableViewRow({
=======
        id: "__alloyId164"
    });
    $.__views.__alloyId163.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createTableViewRow({
>>>>>>> origin/master
        color: "#606060",
        top: 5,
        bottom: 5,
        mod: "diabetes",
        height: 40,
<<<<<<< HEAD
        id: "__alloyId177"
    });
    __alloyId168.push($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createLabel({
=======
        id: "__alloyId165"
    });
    __alloyId156.push($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Diabetes Risk Calculator",
        textAlign: "left",
        left: 15,
<<<<<<< HEAD
        id: "__alloyId178"
    });
    $.__views.__alloyId177.add($.__views.__alloyId178);
    $.__views.menu = Ti.UI.createTableView({
        data: __alloyId168,
        id: "menu"
    });
    $.__views.__alloyId164.add($.__views.menu);
=======
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    $.__views.menu = Ti.UI.createTableView({
        data: __alloyId156,
        id: "menu"
    });
    $.__views.__alloyId152.add($.__views.menu);
>>>>>>> origin/master
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