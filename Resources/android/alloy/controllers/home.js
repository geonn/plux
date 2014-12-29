function Controller() {
    function navWindow(e) {
        var target = e.source.mod;
        var nav = require("navigation");
        nav.navigationWindow(target);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var expandmode = false;
    Alloy.Globals.navMenu = $.navMenu;
    $.scrollboard.addEventListener("scroll", function(e) {
        var o = e.source.contentOffset;
        if (0 >= o.y) $.scrollboard.animate({
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
    __defers["$.__views.__alloyId10!click!navWindow"] && $.__views.__alloyId10.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId11!click!navWindow"] && $.__views.__alloyId11.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId12!click!navWindow"] && $.__views.__alloyId12.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId13!click!navWindow"] && $.__views.__alloyId13.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId14!click!navWindow"] && $.__views.__alloyId14.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId15!click!navWindow"] && $.__views.__alloyId15.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId16!click!navWindow"] && $.__views.__alloyId16.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId17!click!navWindow"] && $.__views.__alloyId17.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId18!click!navWindow"] && $.__views.__alloyId18.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId19!click!navWindow"] && $.__views.__alloyId19.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;