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
    this.__controllerPath = "hra_detail";
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
    $.__views.hraDetailsWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "",
        backButtonTitle: "",
        id: "hraDetailsWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.hraDetailsWin && $.addTopLevelView($.__views.hraDetailsWin);
<<<<<<< HEAD
    $.__views.__alloyId179 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId179"
    });
    $.__views.hraDetailsWin.add($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createView({
=======
    $.__views.__alloyId167 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId167"
    });
    $.__views.hraDetailsWin.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId180"
    });
    $.__views.__alloyId179.add($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId181"
    });
    $.__views.__alloyId180.add($.__views.__alloyId181);
=======
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId169"
    });
    $.__views.__alloyId168.add($.__views.__alloyId169);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId181.add($.__views.btnBack);
=======
    $.__views.__alloyId169.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId180.add($.__views.pageTitle);
=======
    $.__views.__alloyId168.add($.__views.pageTitle);
>>>>>>> origin/master
    $.__views.hraTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        id: "hraTitle",
        textAlign: "center"
    });
    $.__views.pageTitle.add($.__views.hraTitle);
<<<<<<< HEAD
    $.__views.__alloyId182 = Ti.UI.createScrollView({
=======
    $.__views.__alloyId170 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        layout: "vertical",
<<<<<<< HEAD
        id: "__alloyId182"
    });
    $.__views.__alloyId179.add($.__views.__alloyId182);
=======
        id: "__alloyId170"
    });
    $.__views.__alloyId167.add($.__views.__alloyId170);
>>>>>>> origin/master
    $.__views.input_box = Ti.UI.createView({
        id: "input_box",
        height: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId182.add($.__views.input_box);
=======
    $.__views.__alloyId170.add($.__views.input_box);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createView({
        id: "description",
        height: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId182.add($.__views.description);
=======
    $.__views.__alloyId170.add($.__views.description);
>>>>>>> origin/master
    $.__views.picker = Ti.UI.createView({
        bottom: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "picker"
    });
    $.__views.hraDetailsWin.add($.__views.picker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var mod = args.mod;
    var module = require("hra/" + mod);
    module.construct($);
    $.hraTitle.text = module.title;
    $.description.add(module.description());
    $.input_box.add(module.input_box());
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.hraDetailsWin);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;