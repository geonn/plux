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
    this.__controllerPath = "survey";
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
    $.__views.survey = Ti.UI.createWindow({
        fullscreen: true,
        title: "Survey",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "survey"
    });
    $.__views.survey && $.addTopLevelView($.__views.survey);
    $.__views.survey.rightNavButton = void 0;
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.survey.add($.__views.main);
    $.__views.__alloyId301 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId301"
    });
    $.__views.main.add($.__views.__alloyId301);
    $.__views.surveyView = Ti.UI.createWebView({
        id: "surveyView",
        url: "https://www.google.com.my/",
        height: "auto"
    });
    $.__views.survey.add($.__views.surveyView);
    $.__views.__alloyId302 = Ti.UI.createView({
        layout: "vertical",
        height: "auto",
        top: "5",
        id: "__alloyId302"
    });
    $.__views.survey.add($.__views.__alloyId302);
    $.__views.__alloyId303 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "No survey at the moment",
        id: "__alloyId303"
    });
    $.__views.__alloyId302.add($.__views.__alloyId303);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var url = args.url || "";
    "" != url ? $.surveyView.url = url : $.surveyView.height = 0;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;