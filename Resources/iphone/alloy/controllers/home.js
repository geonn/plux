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
<<<<<<< HEAD
    $.__views.__alloyId113 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
    $.__views.__alloyId150 = Ti.UI.createImageView({
=======
    $.__views.__alloyId151 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId151"
    });
    $.__views.main.add($.__views.__alloyId151);
<<<<<<< HEAD
=======
    $.__views.__alloyId112 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId113"
    });
    $.__views.main.add($.__views.__alloyId113);
<<<<<<< HEAD
    $.__views.__alloyId114 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId114"
    });
    $.__views.main.add($.__views.__alloyId114);
=======
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    $.__views.__alloyId152 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId152"
    });
    $.__views.main.add($.__views.__alloyId152);
>>>>>>> origin/master
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL
    });
<<<<<<< HEAD
<<<<<<< HEAD
    $.__views.__alloyId114.add($.__views.scrollboard);
=======
<<<<<<< HEAD
    $.__views.__alloyId151.add($.__views.scrollboard);
=======
    $.__views.__alloyId113.add($.__views.scrollboard);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    $.__views.__alloyId152.add($.__views.scrollboard);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId115 = Ti.UI.createView({
=======
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
>>>>>>> origin/master
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId115"
    });
<<<<<<< HEAD
    $.__views.scrollboard.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createImageView({
=======
    $.__views.scrollboard.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        mod: "m_eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
<<<<<<< HEAD
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
    navWindow ? $.__views.__alloyId116.addEventListener("click", navWindow) : __defers["$.__views.__alloyId116!click!navWindow"] = true;
    $.__views.__alloyId117 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
=======
    $.__views.__alloyId153 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
>>>>>>> origin/master
        id: "__alloyId153"
    });
    $.__views.scrollboard.add($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createImageView({
<<<<<<< HEAD
=======
        id: "__alloyId115"
    });
    $.__views.__alloyId114.add($.__views.__alloyId115);
    navWindow ? $.__views.__alloyId115.addEventListener("click", navWindow) : __defers["$.__views.__alloyId115!click!navWindow"] = true;
    $.__views.__alloyId116 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
<<<<<<< HEAD
        id: "__alloyId117"
    });
    $.__views.__alloyId115.add($.__views.__alloyId117);
    navWindow ? $.__views.__alloyId117.addEventListener("click", navWindow) : __defers["$.__views.__alloyId117!click!navWindow"] = true;
    $.__views.__alloyId118 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
=======
        mod: "m_eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
>>>>>>> origin/master
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
    navWindow ? $.__views.__alloyId154.addEventListener("click", navWindow) : __defers["$.__views.__alloyId154!click!navWindow"] = true;
    $.__views.__alloyId155 = Ti.UI.createImageView({
<<<<<<< HEAD
=======
        id: "__alloyId116"
    });
    $.__views.__alloyId114.add($.__views.__alloyId116);
    navWindow ? $.__views.__alloyId116.addEventListener("click", navWindow) : __defers["$.__views.__alloyId116!click!navWindow"] = true;
    $.__views.__alloyId117 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        mod: "m_myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
<<<<<<< HEAD
        id: "__alloyId118"
    });
    $.__views.__alloyId115.add($.__views.__alloyId118);
    navWindow ? $.__views.__alloyId118.addEventListener("click", navWindow) : __defers["$.__views.__alloyId118!click!navWindow"] = true;
    $.__views.__alloyId119 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
=======
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
>>>>>>> origin/master
        id: "__alloyId155"
    });
    $.__views.__alloyId153.add($.__views.__alloyId155);
    navWindow ? $.__views.__alloyId155.addEventListener("click", navWindow) : __defers["$.__views.__alloyId155!click!navWindow"] = true;
    $.__views.__alloyId156 = Ti.UI.createImageView({
<<<<<<< HEAD
=======
        id: "__alloyId117"
    });
    $.__views.__alloyId114.add($.__views.__alloyId117);
    navWindow ? $.__views.__alloyId117.addEventListener("click", navWindow) : __defers["$.__views.__alloyId117!click!navWindow"] = true;
    $.__views.__alloyId118 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        mod: "clinicLocator",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
<<<<<<< HEAD
        id: "__alloyId119"
    });
    $.__views.__alloyId115.add($.__views.__alloyId119);
    navWindow ? $.__views.__alloyId119.addEventListener("click", navWindow) : __defers["$.__views.__alloyId119!click!navWindow"] = true;
    $.__views.__alloyId120 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
=======
        mod: "m_myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
>>>>>>> origin/master
        id: "__alloyId156"
    });
    $.__views.__alloyId153.add($.__views.__alloyId156);
    navWindow ? $.__views.__alloyId156.addEventListener("click", navWindow) : __defers["$.__views.__alloyId156!click!navWindow"] = true;
    $.__views.__alloyId157 = Ti.UI.createImageView({
<<<<<<< HEAD
=======
        id: "__alloyId118"
    });
    $.__views.__alloyId114.add($.__views.__alloyId118);
    navWindow ? $.__views.__alloyId118.addEventListener("click", navWindow) : __defers["$.__views.__alloyId118!click!navWindow"] = true;
    $.__views.__alloyId119 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
<<<<<<< HEAD
        id: "__alloyId120"
    });
    $.__views.__alloyId115.add($.__views.__alloyId120);
    navWindow ? $.__views.__alloyId120.addEventListener("click", navWindow) : __defers["$.__views.__alloyId120!click!navWindow"] = true;
    $.__views.__alloyId121 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
=======
        mod: "clinicLocator",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
>>>>>>> origin/master
        id: "__alloyId157"
    });
    $.__views.__alloyId153.add($.__views.__alloyId157);
    navWindow ? $.__views.__alloyId157.addEventListener("click", navWindow) : __defers["$.__views.__alloyId157!click!navWindow"] = true;
    $.__views.__alloyId158 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
        id: "__alloyId158"
    });
<<<<<<< HEAD
    $.__views.__alloyId114.add($.__views.__alloyId119);
    navWindow ? $.__views.__alloyId119.addEventListener("click", navWindow) : __defers["$.__views.__alloyId119!click!navWindow"] = true;
    $.__views.__alloyId120 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    $.__views.__alloyId153.add($.__views.__alloyId158);
    navWindow ? $.__views.__alloyId158.addEventListener("click", navWindow) : __defers["$.__views.__alloyId158!click!navWindow"] = true;
    $.__views.__alloyId159 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "leafletCategory",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId121"
    });
    $.__views.__alloyId115.add($.__views.__alloyId121);
    navWindow ? $.__views.__alloyId121.addEventListener("click", navWindow) : __defers["$.__views.__alloyId121!click!navWindow"] = true;
=======
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
>>>>>>> origin/master
=======
        id: "__alloyId159"
    });
    $.__views.__alloyId153.add($.__views.__alloyId159);
    navWindow ? $.__views.__alloyId159.addEventListener("click", navWindow) : __defers["$.__views.__alloyId159!click!navWindow"] = true;
>>>>>>> origin/master
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
    __defers["$.__views.__alloyId153!click!navWindow"] && $.__views.__alloyId153.addEventListener("click", navWindow);
=======
>>>>>>> origin/master
    __defers["$.__views.__alloyId154!click!navWindow"] && $.__views.__alloyId154.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId155!click!navWindow"] && $.__views.__alloyId155.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId156!click!navWindow"] && $.__views.__alloyId156.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId157!click!navWindow"] && $.__views.__alloyId157.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId158!click!navWindow"] && $.__views.__alloyId158.addEventListener("click", navWindow);
<<<<<<< HEAD
=======
    __defers["$.__views.__alloyId115!click!navWindow"] && $.__views.__alloyId115.addEventListener("click", navWindow);
>>>>>>> origin/master
    __defers["$.__views.__alloyId116!click!navWindow"] && $.__views.__alloyId116.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId117!click!navWindow"] && $.__views.__alloyId117.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId118!click!navWindow"] && $.__views.__alloyId118.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId119!click!navWindow"] && $.__views.__alloyId119.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId120!click!navWindow"] && $.__views.__alloyId120.addEventListener("click", navWindow);
<<<<<<< HEAD
    __defers["$.__views.__alloyId121!click!navWindow"] && $.__views.__alloyId121.addEventListener("click", navWindow);
=======
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    __defers["$.__views.__alloyId159!click!navWindow"] && $.__views.__alloyId159.addEventListener("click", navWindow);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;