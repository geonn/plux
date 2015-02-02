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
    this.__controllerPath = "m_doctor";
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
    $.__views.m_doctor = Ti.UI.createWindow({
        fullscreen: true,
        title: "Ask Doctor",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_doctor"
    });
    $.__views.m_doctor && $.addTopLevelView($.__views.m_doctor);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.m_doctor.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId209 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId209"
    });
    $.__views.main.add($.__views.__alloyId209);
=======
    $.__views.__alloyId171 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId171"
    });
    $.__views.main.add($.__views.__alloyId171);
>>>>>>> FETCH_HEAD
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;