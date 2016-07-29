function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function update_loading_text(e) {
        $.loading_text.text = e.text;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "loader";
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
    $.__views.rocket = Ti.UI.createWindow({
        backgroundColor: "#C41230",
        fullscreen: true,
        layout: "composite",
        id: "rocket",
        navBarHidden: true
    });
    $.__views.rocket && $.addTopLevelView($.__views.rocket);
    $.__views.overlay = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 0,
        left: 0,
        backgroundColor: "#CB2228",
        id: "overlay"
    });
    $.__views.rocket.add($.__views.overlay);
    $.__views.__alloyId161 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        borderRadius: 5,
        image: "/images/logo_plux.png",
        id: "__alloyId161"
    });
    $.__views.rocket.add($.__views.__alloyId161);
    $.__views.loading_text = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        id: "loading_text",
        bottom: 50
    });
    $.__views.rocket.add($.__views.loading_text);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.start = function() {
        $.overlay.animate({
            opacity: .7,
            duration: 250
        });
    };
    $.finish = function(_callback) {
        $.overlay.animate({
            opacity: 0,
            duration: 750
        }, function() {
            _callback && _callback();
        });
    };
    API.loadAPIBySequence();
    Ti.App.addEventListener("app:update_loading_text", update_loading_text);
<<<<<<< HEAD
    $.rocket.addEventListener("close", function() {
        Ti.App.removeEventListener("app:update_loading_text", update_loading_text);
        $.destroy();
        console.log("window close");
    });
=======
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;