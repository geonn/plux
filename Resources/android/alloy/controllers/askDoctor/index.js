function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "askDoctor/index";
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
    var __alloyId419 = [];
    $.__views.__alloyId420 = Alloy.createController("askDoctor/find_doctor", {
        id: "__alloyId420"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId420.getViewEx({
            recurse: true
        }),
        id: "tab1",
        title: "Find Doctor"
    });
    __alloyId419.push($.__views.tab1);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId419,
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;