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
    this.__controllerPath = "home";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var expandmode = false;
    Alloy.Globals.navMenu = $.navMenu;
    $.scrollboard.addEventListener("scroll", function(e) {
        var o = e.source.contentOffset;
        if (o.y <= 0) $.scrollboard.animate({
            top: "45%",
            duration: 500
        }, function() {
            expandmode = false;
        }); else {
            if (expandmode) return;
            $.scrollboard.animate({
                top: 0,
                height: "100%",
                duration: 500
            }, function() {
                expandmode = true;
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;