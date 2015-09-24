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
    this.__controllerPath = "webview";
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
    $.__views.webview = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        title: "Survey",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "webview"
    });
    $.__views.webview && $.addTopLevelView($.__views.webview);
    $.__views.webview.rightNavButton = void 0;
    $.__views.surveyView = Ti.UI.createWebView({
        id: "surveyView",
        url: "https://www.google.com.my/",
        height: "auto"
    });
    $.__views.webview.add($.__views.surveyView);
    $.__views.defaultMsgView = Ti.UI.createView({
        layout: "vertical",
        height: "auto",
        id: "defaultMsgView",
        top: "5"
    });
    $.__views.webview.add($.__views.defaultMsgView);
    $.__views.__alloyId172 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Page not found.",
        id: "__alloyId172"
    });
    $.__views.defaultMsgView.add($.__views.__alloyId172);
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