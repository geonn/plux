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
        "m_eCard" == e.source.mod || "m_myClaim" == e.source.mod ? nav.navigationWindow(target, 1) : nav.navigationWindow(target);
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
        fullscreen: true,
        id: "root",
        title: "",
        navBarHidden: "true"
    });
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.root.add($.__views.main);
    $.__views.__alloyId152 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId152"
    });
    $.__views.main.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId153"
    });
    $.__views.main.add($.__views.__alloyId153);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL
    });
    $.__views.__alloyId153.add($.__views.scrollboard);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png"
    });
    $.__views.scrollboard.add($.__views.logo);
    $.__views.__alloyId154 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId154"
    });
    $.__views.scrollboard.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createImageView({
        mod: "m_eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
        id: "__alloyId155"
    });
    $.__views.__alloyId154.add($.__views.__alloyId155);
    navWindow ? $.__views.__alloyId155.addEventListener("click", navWindow) : __defers["$.__views.__alloyId155!click!navWindow"] = true;
    $.__views.__alloyId156 = Ti.UI.createImageView({
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
        id: "__alloyId156"
    });
    $.__views.__alloyId154.add($.__views.__alloyId156);
    navWindow ? $.__views.__alloyId156.addEventListener("click", navWindow) : __defers["$.__views.__alloyId156!click!navWindow"] = true;
    $.__views.__alloyId157 = Ti.UI.createImageView({
        mod: "m_myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
        id: "__alloyId157"
    });
    $.__views.__alloyId154.add($.__views.__alloyId157);
    navWindow ? $.__views.__alloyId157.addEventListener("click", navWindow) : __defers["$.__views.__alloyId157!click!navWindow"] = true;
    $.__views.__alloyId158 = Ti.UI.createImageView({
<<<<<<< HEAD
        mod: "clinicListing",
=======
        mod: "clinicLocator",
>>>>>>> origin/master
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId158"
    });
    $.__views.__alloyId154.add($.__views.__alloyId158);
    navWindow ? $.__views.__alloyId158.addEventListener("click", navWindow) : __defers["$.__views.__alloyId158!click!navWindow"] = true;
    $.__views.__alloyId159 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
        id: "__alloyId159"
    });
    $.__views.__alloyId154.add($.__views.__alloyId159);
    navWindow ? $.__views.__alloyId159.addEventListener("click", navWindow) : __defers["$.__views.__alloyId159!click!navWindow"] = true;
    $.__views.__alloyId160 = Ti.UI.createImageView({
        mod: "leafletCategory",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
        id: "__alloyId160"
    });
    $.__views.__alloyId154.add($.__views.__alloyId160);
    navWindow ? $.__views.__alloyId160.addEventListener("click", navWindow) : __defers["$.__views.__alloyId160!click!navWindow"] = true;
    $.__views.navMenu = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.root,
        id: "navMenu"
    });
    $.__views.navMenu && $.addTopLevelView($.__views.navMenu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var expandmode = false;
    Ti.App.Properties.setString("memno", null);
    API.loadPanelList();
    Alloy.Globals.navMenu = $.navMenu;
    $.scrollboard.addEventListener("scroll", function(e) {
        var o = e.source.contentOffset;
        if (o.y >= 139 && expandmode) $.logo.animate({
            top: -100,
            duration: 500
        }, function() {
            expandmode = false;
        }); else if (o.y < 139 && !expandmode) $.logo.animate({
            top: 10,
            duration: 500
        }, function() {
            expandmode = true;
        }); else if (o.y < 139) {
            $.logo.setTop(o.y + 10);
            return;
        }
    });
    __defers["$.__views.__alloyId155!click!navWindow"] && $.__views.__alloyId155.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId156!click!navWindow"] && $.__views.__alloyId156.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId157!click!navWindow"] && $.__views.__alloyId157.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId158!click!navWindow"] && $.__views.__alloyId158.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId159!click!navWindow"] && $.__views.__alloyId159.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId160!click!navWindow"] && $.__views.__alloyId160.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;