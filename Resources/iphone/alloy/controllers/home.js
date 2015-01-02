function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function navWindow(e) {
        var target = e.source.mod;
        var nav = require("navigation");
        nav.navigationWindow(target);
    }
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
    var __defers = {};
    $.__views.root = Ti.UI.createWindow({
        id: "root",
        title: "",
        navBarHidden: "true"
    });
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.root.add($.__views.main);
    $.__views.__alloyId8 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId8"
    });
    $.__views.main.add($.__views.__alloyId8);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        bottom: "0",
        width: Titanium.UI.FILL,
        height: "100%",
        top: "0",
        layout: "vertical"
    });
    $.__views.main.add($.__views.scrollboard);
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId9"
    });
    $.__views.scrollboard.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createImageView({
        mod: "m_eCard",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    navWindow ? $.__views.__alloyId10.addEventListener("click", navWindow) : __defers["$.__views.__alloyId10!click!navWindow"] = true;
    $.__views.__alloyId11 = Ti.UI.createImageView({
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
        id: "__alloyId11"
    });
    $.__views.__alloyId9.add($.__views.__alloyId11);
    navWindow ? $.__views.__alloyId11.addEventListener("click", navWindow) : __defers["$.__views.__alloyId11!click!navWindow"] = true;
    $.__views.__alloyId12 = Ti.UI.createImageView({
        mod: "m_myClaim",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
        id: "__alloyId12"
    });
    $.__views.__alloyId9.add($.__views.__alloyId12);
    navWindow ? $.__views.__alloyId12.addEventListener("click", navWindow) : __defers["$.__views.__alloyId12!click!navWindow"] = true;
    $.__views.__alloyId13 = Ti.UI.createImageView({
        mod: "clinicLocator",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId13"
    });
    $.__views.__alloyId9.add($.__views.__alloyId13);
    navWindow ? $.__views.__alloyId13.addEventListener("click", navWindow) : __defers["$.__views.__alloyId13!click!navWindow"] = true;
    $.__views.__alloyId14 = Ti.UI.createImageView({
        mod: "healthInfo",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
        id: "__alloyId14"
    });
    $.__views.__alloyId9.add($.__views.__alloyId14);
    navWindow ? $.__views.__alloyId14.addEventListener("click", navWindow) : __defers["$.__views.__alloyId14!click!navWindow"] = true;
    $.__views.__alloyId15 = Ti.UI.createImageView({
        mod: "healthInfo",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
        id: "__alloyId15"
    });
    $.__views.__alloyId9.add($.__views.__alloyId15);
    navWindow ? $.__views.__alloyId15.addEventListener("click", navWindow) : __defers["$.__views.__alloyId15!click!navWindow"] = true;
    $.__views.navMenu = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.root,
        id: "navMenu"
    });
    $.__views.navMenu && $.addTopLevelView($.__views.navMenu);
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
    __defers["$.__views.__alloyId10!click!navWindow"] && $.__views.__alloyId10.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId11!click!navWindow"] && $.__views.__alloyId11.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId12!click!navWindow"] && $.__views.__alloyId12.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId13!click!navWindow"] && $.__views.__alloyId13.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId14!click!navWindow"] && $.__views.__alloyId14.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId15!click!navWindow"] && $.__views.__alloyId15.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;