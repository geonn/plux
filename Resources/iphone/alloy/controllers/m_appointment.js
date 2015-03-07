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
    this.__controllerPath = "m_appointment";
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
    $.__views.m_appointment = Ti.UI.createWindow({
        fullscreen: true,
        title: "Appointment",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_appointment"
    });
    $.__views.m_appointment && $.addTopLevelView($.__views.m_appointment);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.m_appointment.add($.__views.main);
<<<<<<< HEAD
<<<<<<< HEAD
    $.__views.__alloyId189 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
    $.__views.__alloyId208 = Ti.UI.createImageView({
=======
    $.__views.__alloyId209 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId209"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId208);
=======
    $.__views.__alloyId170 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId189"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId189);
=======
    $.__views.main.add($.__views.__alloyId170);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    $.__views.main.add($.__views.__alloyId209);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;