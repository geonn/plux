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
    this.__controllerPath = "m_workout";
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
    $.__views.m_workout = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Workout Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_workout"
    });
    $.__views.m_workout && $.addTopLevelView($.__views.m_workout);
    $.__views.main = Ti.UI.createView({
        id: "main",
        width: Ti.UI.FILL
    });
    $.__views.m_workout.add($.__views.main);
    $.__views.myText = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "myText"
    });
    $.__views.main.add($.__views.myText);
    $.__views.button = Ti.UI.createView({
        id: "button",
        width: Ti.UI.SIZE
    });
    $.__views.main.add($.__views.button);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var gStep = Ti.App.Properties.getString("step") || 0;
    $.myText.text = "You walked " + gStep + " by far .";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;