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
    this.__controllerPath = "m_myClaim";
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
    $.__views.m_myClaim = Ti.UI.createWindow({
        title: "My Claim Details",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myClaim"
    });
    $.__views.m_myClaim && $.addTopLevelView($.__views.m_myClaim);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.m_myClaim.add($.__views.main);
    $.__views.__alloyId24 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-myClaim.jpg",
        id: "__alloyId24"
    });
    $.__views.main.add($.__views.__alloyId24);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;