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
    this.__controllerPath = "m_ClaimHistory";
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
    $.__views.m_ClaimHistory = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim History",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_ClaimHistory"
    });
    $.__views.m_ClaimHistory && $.addTopLevelView($.__views.m_ClaimHistory);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.m_ClaimHistory.add($.__views.main);
<<<<<<< HEAD
    var __alloyId238 = [];
    $.__views.__alloyId239 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId239"
    });
    __alloyId238.push($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createView({
=======
    var __alloyId144 = [];
    $.__views.__alloyId145 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId145"
    });
    __alloyId144.push($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId240"
    });
    $.__views.__alloyId239.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId241"
    });
    $.__views.__alloyId240.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createLabel({
=======
        id: "__alloyId146"
    });
    $.__views.__alloyId145.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId147"
    });
    $.__views.__alloyId146.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 16
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
<<<<<<< HEAD
        id: "__alloyId242"
    });
    $.__views.__alloyId241.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createLabel({
=======
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: 10,
        widht: 70,
        top: 0,
        font: {
            fontSize: 16
        },
        color: "#ff0000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "RM 55.00",
<<<<<<< HEAD
        id: "__alloyId243"
    });
    $.__views.__alloyId241.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createLabel({
=======
        id: "__alloyId149"
    });
    $.__views.__alloyId147.add($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/27/2014, 12:00:00",
<<<<<<< HEAD
        id: "__alloyId244"
    });
    $.__views.__alloyId240.add($.__views.__alloyId244);
    $.__views.__alloyId245 = Ti.UI.createLabel({
=======
        id: "__alloyId150"
    });
    $.__views.__alloyId146.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
<<<<<<< HEAD
        id: "__alloyId245"
    });
    $.__views.__alloyId240.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
=======
        id: "__alloyId151"
    });
    $.__views.__alloyId146.add($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
<<<<<<< HEAD
        id: "__alloyId246"
    });
    $.__views.__alloyId240.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId247"
    });
    __alloyId238.push($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createView({
=======
        id: "__alloyId152"
    });
    $.__views.__alloyId146.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "__alloyId153"
    });
    __alloyId144.push($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "10",
        left: "10",
        right: "10",
        bottom: "10",
<<<<<<< HEAD
        id: "__alloyId248"
    });
    $.__views.__alloyId247.add($.__views.__alloyId248);
    $.__views.__alloyId249 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId249"
    });
    $.__views.__alloyId248.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createLabel({
=======
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId155"
    });
    $.__views.__alloyId154.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 80,
        font: {
            fontSize: 16
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "KLINIK SINGAPORE (RELAU)",
<<<<<<< HEAD
        id: "__alloyId250"
    });
    $.__views.__alloyId249.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createLabel({
=======
        id: "__alloyId156"
    });
    $.__views.__alloyId155.add($.__views.__alloyId156);
    $.__views.__alloyId157 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        right: 10,
        widht: 70,
        top: 0,
        font: {
            fontSize: 16
        },
        color: "#ff0000",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "RM 30.00",
<<<<<<< HEAD
        id: "__alloyId251"
    });
    $.__views.__alloyId249.add($.__views.__alloyId251);
    $.__views.__alloyId252 = Ti.UI.createLabel({
=======
        id: "__alloyId157"
    });
    $.__views.__alloyId155.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#ccc",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "8/28/2014, 12:00:00",
<<<<<<< HEAD
        id: "__alloyId252"
    });
    $.__views.__alloyId248.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
=======
        id: "__alloyId158"
    });
    $.__views.__alloyId154.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Category: GP",
<<<<<<< HEAD
        id: "__alloyId253"
    });
    $.__views.__alloyId248.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createLabel({
=======
        id: "__alloyId159"
    });
    $.__views.__alloyId154.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "MC Days: 1",
<<<<<<< HEAD
        id: "__alloyId254"
    });
    $.__views.__alloyId248.add($.__views.__alloyId254);
    $.__views.__alloyId237 = Ti.UI.createTableView({
        data: __alloyId238,
        id: "__alloyId237"
    });
    $.__views.main.add($.__views.__alloyId237);
=======
        id: "__alloyId160"
    });
    $.__views.__alloyId154.add($.__views.__alloyId160);
    $.__views.__alloyId143 = Ti.UI.createTableView({
        data: __alloyId144,
        id: "__alloyId143"
    });
    $.__views.main.add($.__views.__alloyId143);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;