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
    this.__controllerPath = "m_myMedical";
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
    $.__views.m_myMedical = Ti.UI.createWindow({
        fullscreen: true,
        title: "MY Medical Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myMedical"
    });
    $.__views.m_myMedical && $.addTopLevelView($.__views.m_myMedical);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.m_myMedical.add($.__views.main);
<<<<<<< HEAD
<<<<<<< HEAD
    $.__views.__alloyId199 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
    $.__views.__alloyId226 = Ti.UI.createImageView({
=======
    $.__views.__alloyId227 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId227"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId226);
=======
    $.__views.__alloyId185 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId199"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId199);
=======
    $.__views.main.add($.__views.__alloyId185);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    $.__views.main.add($.__views.__alloyId227);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;