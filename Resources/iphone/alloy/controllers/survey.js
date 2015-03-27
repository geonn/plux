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
        backgroundColor: "#ffffff",
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
<<<<<<< HEAD
    $.__views.__alloyId344 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
    $.__views.__alloyId336 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId336"
    });
    $.__views.main.add($.__views.__alloyId336);
=======
    $.__views.__alloyId339 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId344"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId344);
=======
    $.__views.main.add($.__views.__alloyId339);
>>>>>>> origin/master
>>>>>>> origin/master
    $.__views.surveyView = Ti.UI.createWebView({
        id: "surveyView",
        url: "https://www.google.com.my/",
        height: "auto"
    });
    $.__views.survey.add($.__views.surveyView);
    $.__views.defaultMsgView = Ti.UI.createView({
        layout: "vertical",
        height: "auto",
        id: "defaultMsgView",
        top: "5"
    });
    $.__views.survey.add($.__views.defaultMsgView);
<<<<<<< HEAD
    $.__views.__alloyId345 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
    $.__views.__alloyId337 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "No survey at the moment",
        id: "__alloyId337"
    });
    $.__views.defaultMsgView.add($.__views.__alloyId337);
=======
    $.__views.__alloyId340 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "No survey at the moment",
        id: "__alloyId345"
    });
<<<<<<< HEAD
    $.__views.defaultMsgView.add($.__views.__alloyId345);
=======
    $.__views.defaultMsgView.add($.__views.__alloyId340);
>>>>>>> origin/master
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var url = args.url || "";
    if ("" != url) {
        $.surveyView.url = url;
        $.defaultMsgView.height = 0;
    } else $.surveyView.height = 0;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;