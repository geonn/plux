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
        id: "root",
        title: "",
        navBarHidden: "true"
    });
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.root.add($.__views.main);
    $.__views.__alloyId98 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId98"
    });
    $.__views.main.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createImageView({
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png",
        id: "__alloyId99"
    });
    $.__views.main.add($.__views.__alloyId99);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        top: "40%",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL
    });
    $.__views.main.add($.__views.scrollboard);
    $.__views.__alloyId100 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        id: "__alloyId100"
    });
    $.__views.scrollboard.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createImageView({
        mod: "m_eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    navWindow ? $.__views.__alloyId101.addEventListener("click", navWindow) : __defers["$.__views.__alloyId101!click!navWindow"] = true;
    $.__views.__alloyId102 = Ti.UI.createImageView({
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    navWindow ? $.__views.__alloyId102.addEventListener("click", navWindow) : __defers["$.__views.__alloyId102!click!navWindow"] = true;
    $.__views.__alloyId103 = Ti.UI.createImageView({
        mod: "m_myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
        id: "__alloyId103"
    });
    $.__views.__alloyId100.add($.__views.__alloyId103);
    navWindow ? $.__views.__alloyId103.addEventListener("click", navWindow) : __defers["$.__views.__alloyId103!click!navWindow"] = true;
    $.__views.__alloyId104 = Ti.UI.createImageView({
        mod: "clinicLocator",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId104"
    });
    $.__views.__alloyId100.add($.__views.__alloyId104);
    navWindow ? $.__views.__alloyId104.addEventListener("click", navWindow) : __defers["$.__views.__alloyId104!click!navWindow"] = true;
    $.__views.__alloyId105 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
        id: "__alloyId105"
    });
    $.__views.__alloyId100.add($.__views.__alloyId105);
    navWindow ? $.__views.__alloyId105.addEventListener("click", navWindow) : __defers["$.__views.__alloyId105!click!navWindow"] = true;
    $.__views.__alloyId106 = Ti.UI.createImageView({
        mod: "leafletCategory",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
        id: "__alloyId106"
    });
    $.__views.__alloyId100.add($.__views.__alloyId106);
    navWindow ? $.__views.__alloyId106.addEventListener("click", navWindow) : __defers["$.__views.__alloyId106!click!navWindow"] = true;
    $.__views.navMenu = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.root,
        id: "navMenu"
    });
    $.__views.navMenu && $.addTopLevelView($.__views.navMenu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    API.loadPanelList();
    Alloy.Globals.navMenu = $.navMenu;
    $.scrollboard.addEventListener("scroll", function(e) {
        e.source.contentOffset;
    });
    __defers["$.__views.__alloyId101!click!navWindow"] && $.__views.__alloyId101.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId102!click!navWindow"] && $.__views.__alloyId102.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId103!click!navWindow"] && $.__views.__alloyId103.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId104!click!navWindow"] && $.__views.__alloyId104.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId105!click!navWindow"] && $.__views.__alloyId105.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId106!click!navWindow"] && $.__views.__alloyId106.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;