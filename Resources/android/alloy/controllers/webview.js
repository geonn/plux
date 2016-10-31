function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeWindow() {
        $.win.close();
    }
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
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        title: "Notification Details",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId327 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#f5f5f5",
        id: "__alloyId327"
    });
    $.__views.win.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createImageView({
        width: 30,
        height: 30,
        right: 10,
        image: "/images/cross.png",
        id: "__alloyId328"
    });
    $.__views.__alloyId327.add($.__views.__alloyId328);
    closeWindow ? $.addListener($.__views.__alloyId328, "click", closeWindow) : __defers["$.__views.__alloyId328!click!closeWindow"] = true;
    $.__views.surveyView = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#f5f5f5",
        id: "surveyView"
    });
    $.__views.__alloyId327.add($.__views.surveyView);
    $.__views.defaultMsgView = Ti.UI.createView({
        layout: "vertical",
        height: "auto",
        id: "defaultMsgView",
        top: 5
    });
    $.__views.win.add($.__views.defaultMsgView);
    $.__views.__alloyId329 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#606060",
        text: "Page not found.",
        id: "__alloyId329"
    });
    $.__views.defaultMsgView.add($.__views.__alloyId329);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var url = args.url || "";
    var HTMLcontent = '<html><meta name="viewport" content="width=device-width, initial-scale=1.0">' + args.html + "</html>" || "";
    if ("" != url) {
        $.surveyView.url = url;
        $.defaultMsgView.height = 0;
    } else if ("" != HTMLcontent) {
        HTMLcontent = HTMLcontent.replace(/\[\[/g, "<");
        HTMLcontent = HTMLcontent.replace(/\]\]/g, ">");
        $.surveyView.html = HTMLcontent;
        $.defaultMsgView.height = 0;
    } else $.surveyView.height = 0;
    __defers["$.__views.__alloyId328!click!closeWindow"] && $.addListener($.__views.__alloyId328, "click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;