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
<<<<<<< HEAD
        theme: "Theme.NoActionBar",
        layout: "composite",
        id: "rocket"
=======
        layout: "composite",
        id: "rocket",
        navBarHidden: true
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.rocketSmoke = Ti.UI.createImageView({
        width: 110,
        opacity: 0,
        duration: .02,
        images: "/images/logo_plux.png",
        id: "rocketSmoke"
    });
    $.__views.rocket.add($.__views.rocketSmoke);
    $.__views.rocketFlight = Ti.UI.createImageView({
        width: 110,
        height: 130,
        opacity: 0,
        duration: .02,
        images: "/images/logo_plux.png",
        id: "rocketFlight"
    });
    $.__views.rocket.add($.__views.rocketFlight);
=======
    $.__views.__alloyId162 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        image: "/images/logo_plux.png",
        id: "__alloyId162"
    });
    $.__views.rocket.add($.__views.__alloyId162);
>>>>>>> origin/master
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
<<<<<<< HEAD
        $.rocketSmoke.opacity = .1;
        $.rocketFlight.opacity = 0;
        $.rocketFlight.top = null;
        $.rocketFlight.stop();
        $.rocketSmoke.start();
=======
>>>>>>> origin/master
        $.overlay.animate({
            opacity: .7,
            duration: 250
        });
<<<<<<< HEAD
        $.rocketSmoke.animate({
            opacity: 1,
            duration: 500
        });
    };
    $.finish = function(_callback) {
        $.rocketSmoke.animate({
            duration: 500,
            delay: 500,
            right: -500,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN
        }, function() {
            $.overlay.animate({
                opacity: 0,
                duration: 750
            }, function() {
                $.rocketFlight.stop();
                _callback && _callback();
            });
=======
    };
    $.finish = function(_callback) {
        $.overlay.animate({
            opacity: 0,
            duration: 750
        }, function() {
            _callback && _callback();
>>>>>>> origin/master
        });
    };
    API.loadAPIBySequence();
    Ti.App.addEventListener("app:update_loading_text", update_loading_text);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;