function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/benefit";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "Flexi-Benefit",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
<<<<<<< HEAD
    $.__views.__alloyId452 = Ti.UI.createView({
=======
    $.__views.__alloyId450 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#f5f5f5",
<<<<<<< HEAD
        id: "__alloyId452"
    });
    $.__views.win.add($.__views.__alloyId452);
=======
        id: "__alloyId450"
    });
    $.__views.win.add($.__views.__alloyId450);
>>>>>>> origin/master
    $.__views.surveyView = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#f5f5f5",
        id: "surveyView",
        url: "http://flexi.freejini.com.my/"
    });
<<<<<<< HEAD
    $.__views.__alloyId452.add($.__views.surveyView);
=======
    $.__views.__alloyId450.add($.__views.surveyView);
>>>>>>> origin/master
    $.__views.defaultMsgView = Ti.UI.createView({
        layout: "vertical",
        height: "auto",
        id: "defaultMsgView",
        top: 5
    });
    $.__views.win.add($.__views.defaultMsgView);
<<<<<<< HEAD
    $.__views.__alloyId453 = Ti.UI.createLabel({
=======
    $.__views.__alloyId451 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#606060",
        text: "Page not found.",
<<<<<<< HEAD
        id: "__alloyId453"
    });
    $.__views.defaultMsgView.add($.__views.__alloyId453);
=======
        id: "__alloyId451"
    });
    $.__views.defaultMsgView.add($.__views.__alloyId451);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.App.Properties.getString("ic_no");
    var memno = Ti.App.Properties.getString("memno");
    var url = args.url || "http://flexi.freejini.com.my/main/appLogin?user=flexi&value=29175304721014532l49f7207c8943981&ic_no=" + memno;
    var HTMLcontent = '<html><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta name="viewport" content="width=device-width, initial-scale=1.0">' + args.html + "</html>" || "";
    if ("" != url) {
        $.surveyView.url = url;
        $.defaultMsgView.height = 0;
    } else if ("" != HTMLcontent) {
        HTMLcontent = HTMLcontent.replace(/\[\[/g, "<");
        HTMLcontent = HTMLcontent.replace(/\]\]/g, ">");
        $.surveyView.setHtml(HTMLcontent);
        $.defaultMsgView.height = 0;
    } else $.surveyView.height = 0;
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;