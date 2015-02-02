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
<<<<<<< HEAD
    $.__views.__alloyId150 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId150"
    });
    $.__views.main.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId151"
    });
    $.__views.main.add($.__views.__alloyId151);
=======
    $.__views.__alloyId112 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId112"
    });
    $.__views.main.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId113"
    });
    $.__views.main.add($.__views.__alloyId113);
>>>>>>> FETCH_HEAD
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId151.add($.__views.scrollboard);
=======
    $.__views.__alloyId113.add($.__views.scrollboard);
>>>>>>> FETCH_HEAD
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png"
    });
    $.__views.scrollboard.add($.__views.logo);
<<<<<<< HEAD
    $.__views.__alloyId152 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId152"
    });
    $.__views.scrollboard.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createImageView({
=======
    $.__views.__alloyId114 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId114"
    });
    $.__views.scrollboard.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        mod: "m_eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
<<<<<<< HEAD
        id: "__alloyId153"
    });
    $.__views.__alloyId152.add($.__views.__alloyId153);
    navWindow ? $.__views.__alloyId153.addEventListener("click", navWindow) : __defers["$.__views.__alloyId153!click!navWindow"] = true;
    $.__views.__alloyId154 = Ti.UI.createImageView({
=======
        id: "__alloyId115"
    });
    $.__views.__alloyId114.add($.__views.__alloyId115);
    navWindow ? $.__views.__alloyId115.addEventListener("click", navWindow) : __defers["$.__views.__alloyId115!click!navWindow"] = true;
    $.__views.__alloyId116 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
<<<<<<< HEAD
        id: "__alloyId154"
    });
    $.__views.__alloyId152.add($.__views.__alloyId154);
    navWindow ? $.__views.__alloyId154.addEventListener("click", navWindow) : __defers["$.__views.__alloyId154!click!navWindow"] = true;
    $.__views.__alloyId155 = Ti.UI.createImageView({
=======
        id: "__alloyId116"
    });
    $.__views.__alloyId114.add($.__views.__alloyId116);
    navWindow ? $.__views.__alloyId116.addEventListener("click", navWindow) : __defers["$.__views.__alloyId116!click!navWindow"] = true;
    $.__views.__alloyId117 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        mod: "m_myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
<<<<<<< HEAD
        id: "__alloyId155"
    });
    $.__views.__alloyId152.add($.__views.__alloyId155);
    navWindow ? $.__views.__alloyId155.addEventListener("click", navWindow) : __defers["$.__views.__alloyId155!click!navWindow"] = true;
    $.__views.__alloyId156 = Ti.UI.createImageView({
=======
        id: "__alloyId117"
    });
    $.__views.__alloyId114.add($.__views.__alloyId117);
    navWindow ? $.__views.__alloyId117.addEventListener("click", navWindow) : __defers["$.__views.__alloyId117!click!navWindow"] = true;
    $.__views.__alloyId118 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        mod: "clinicLocator",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
<<<<<<< HEAD
        id: "__alloyId156"
    });
    $.__views.__alloyId152.add($.__views.__alloyId156);
    navWindow ? $.__views.__alloyId156.addEventListener("click", navWindow) : __defers["$.__views.__alloyId156!click!navWindow"] = true;
    $.__views.__alloyId157 = Ti.UI.createImageView({
=======
        id: "__alloyId118"
    });
    $.__views.__alloyId114.add($.__views.__alloyId118);
    navWindow ? $.__views.__alloyId118.addEventListener("click", navWindow) : __defers["$.__views.__alloyId118!click!navWindow"] = true;
    $.__views.__alloyId119 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
<<<<<<< HEAD
        id: "__alloyId157"
    });
    $.__views.__alloyId152.add($.__views.__alloyId157);
    navWindow ? $.__views.__alloyId157.addEventListener("click", navWindow) : __defers["$.__views.__alloyId157!click!navWindow"] = true;
    $.__views.__alloyId158 = Ti.UI.createImageView({
=======
        id: "__alloyId119"
    });
    $.__views.__alloyId114.add($.__views.__alloyId119);
    navWindow ? $.__views.__alloyId119.addEventListener("click", navWindow) : __defers["$.__views.__alloyId119!click!navWindow"] = true;
    $.__views.__alloyId120 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        mod: "leafletCategory",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
<<<<<<< HEAD
        id: "__alloyId158"
    });
    $.__views.__alloyId152.add($.__views.__alloyId158);
    navWindow ? $.__views.__alloyId158.addEventListener("click", navWindow) : __defers["$.__views.__alloyId158!click!navWindow"] = true;
=======
        id: "__alloyId120"
    });
    $.__views.__alloyId114.add($.__views.__alloyId120);
    navWindow ? $.__views.__alloyId120.addEventListener("click", navWindow) : __defers["$.__views.__alloyId120!click!navWindow"] = true;
>>>>>>> FETCH_HEAD
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
<<<<<<< HEAD
    __defers["$.__views.__alloyId153!click!navWindow"] && $.__views.__alloyId153.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId154!click!navWindow"] && $.__views.__alloyId154.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId155!click!navWindow"] && $.__views.__alloyId155.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId156!click!navWindow"] && $.__views.__alloyId156.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId157!click!navWindow"] && $.__views.__alloyId157.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId158!click!navWindow"] && $.__views.__alloyId158.addEventListener("click", navWindow);
=======
    __defers["$.__views.__alloyId115!click!navWindow"] && $.__views.__alloyId115.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId116!click!navWindow"] && $.__views.__alloyId116.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId117!click!navWindow"] && $.__views.__alloyId117.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId118!click!navWindow"] && $.__views.__alloyId118.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId119!click!navWindow"] && $.__views.__alloyId119.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId120!click!navWindow"] && $.__views.__alloyId120.addEventListener("click", navWindow);
>>>>>>> FETCH_HEAD
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;