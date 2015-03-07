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
    this.__controllerPath = "m_rx";
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
    $.__views.m_rx = Ti.UI.createWindow({
        fullscreen: true,
        title: "RX",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_rx"
    });
    $.__views.m_rx && $.addTopLevelView($.__views.m_rx);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.m_rx.add($.__views.main);
<<<<<<< HEAD
<<<<<<< HEAD
    $.__views.__alloyId204 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
    $.__views.__alloyId231 = Ti.UI.createImageView({
=======
    $.__views.__alloyId232 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId232"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId231);
=======
    $.__views.__alloyId190 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId204"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId204);
=======
    $.__views.main.add($.__views.__alloyId190);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    $.__views.main.add($.__views.__alloyId232);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;