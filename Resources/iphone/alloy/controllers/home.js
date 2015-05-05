function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function refreshHeaderInfo() {
        var auth = require("login");
        removeAllChildren($.myInfo);
        if (auth.checkLogin()) {
            var me = usersModel.getUserByMemno();
            var logoutBtn = Ti.UI.createButton({
                backgroundImage: "/images/btn-logout.png",
                width: "40",
                left: 5,
                right: 5,
                zIndex: 20
            });
            logoutBtn.addEventListener("click", function() {
                var dialog = Ti.UI.createAlertDialog({
                    cancel: 1,
                    buttonNames: [ "Cancel", "Confirm" ],
                    message: "Would you like to logout?",
                    title: "Logout PLUX"
                });
                dialog.addEventListener("click", function(e) {
                    e.index === e.source.cancel;
                    1 === e.index && logoutUser();
                });
                dialog.show();
            });
            var welcomeTitle = $.UI.create("Label", {
                text: "Welcome, " + me.name,
                classes: [ "welcome_text" ]
            });
            $.myInfo.add(logoutBtn);
            $.myInfo.add(welcomeTitle);
        } else {
            var loginBtn = Ti.UI.createButton({
                backgroundImage: "/images/btn-login.png",
                width: "40",
                left: 5,
                right: 5,
                zIndex: 20
            });
            loginBtn.addEventListener("click", function() {
                nav.navigateWithArgs("login", {
                    target: "home"
                });
            });
            var welcomeTitle = $.UI.create("Label", {
                text: "Welcome guest",
                classes: [ "welcome_text" ]
            });
            $.myInfo.add(loginBtn);
            $.myInfo.add(welcomeTitle);
        }
    }
    function navWindow(e) {
        var target = e.source.mod;
        var nav = require("navigation");
        "m_eCard" == e.source.mod || "m_myClaim" == e.source.mod || "profile" == e.source.mod ? nav.navigationWindow(target, 1) : nav.navigationWindow(target);
    }
    function logoutUser() {
        Ti.App.Properties.setString("memno", "");
        refreshHeaderInfo();
    }
    function setBackground() {
        var home_background = Alloy.createCollection("home_background");
        var today = new Date();
        var hours = today.getHours();
        var bg = home_background.getCategoryByTime(hours);
        $.daily_background.setBackgroundImage(bg.img_path);
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
        backgroundColor: "#ffffff",
        fullscreen: true,
        id: "root",
        title: "",
        navBarHidden: "true"
    });
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.root.add($.__views.main);
    $.__views.daily_background = Ti.UI.createView({
        id: "daily_background",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
    $.__views.main.add($.__views.daily_background);
    $.__views.__alloyId106 = Ti.UI.createView({
        layout: "",
        id: "__alloyId106"
    });
    $.__views.main.add($.__views.__alloyId106);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png",
        zIndex: "5"
    });
    $.__views.__alloyId106.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "rgba(0,0,0,0.5)"
    });
    $.__views.__alloyId106.add($.__views.myinfo_view);
    $.__views.myInfo = Ti.UI.createView({
        layout: "horizontal",
        left: "110",
        width: "auto",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE,
        id: "myInfo"
    });
    $.__views.myinfo_view.add($.__views.myInfo);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId106.add($.__views.scrollboard);
    $.__views.__alloyId107 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId107"
    });
    $.__views.scrollboard.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createImageView({
        mod: "m_eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
        id: "__alloyId108"
    });
    $.__views.__alloyId107.add($.__views.__alloyId108);
    navWindow ? $.__views.__alloyId108.addEventListener("click", navWindow) : __defers["$.__views.__alloyId108!click!navWindow"] = true;
    $.__views.__alloyId109 = Ti.UI.createImageView({
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
        id: "__alloyId109"
    });
    $.__views.__alloyId107.add($.__views.__alloyId109);
    navWindow ? $.__views.__alloyId109.addEventListener("click", navWindow) : __defers["$.__views.__alloyId109!click!navWindow"] = true;
    $.__views.__alloyId110 = Ti.UI.createImageView({
        mod: "m_myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
        id: "__alloyId110"
    });
    $.__views.__alloyId107.add($.__views.__alloyId110);
    navWindow ? $.__views.__alloyId110.addEventListener("click", navWindow) : __defers["$.__views.__alloyId110!click!navWindow"] = true;
    $.__views.__alloyId111 = Ti.UI.createImageView({
        mod: "profile",
        top: "15",
        left: "15",
        width: "139",
        image: "/btn/btn_profile.png",
        id: "__alloyId111"
    });
    $.__views.__alloyId107.add($.__views.__alloyId111);
    navWindow ? $.__views.__alloyId111.addEventListener("click", navWindow) : __defers["$.__views.__alloyId111!click!navWindow"] = true;
    $.__views.__alloyId112 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
        id: "__alloyId112"
    });
    $.__views.__alloyId107.add($.__views.__alloyId112);
    navWindow ? $.__views.__alloyId112.addEventListener("click", navWindow) : __defers["$.__views.__alloyId112!click!navWindow"] = true;
    $.__views.__alloyId113 = Ti.UI.createImageView({
        mod: "leaflet",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
        id: "__alloyId113"
    });
    $.__views.__alloyId107.add($.__views.__alloyId113);
    navWindow ? $.__views.__alloyId113.addEventListener("click", navWindow) : __defers["$.__views.__alloyId113!click!navWindow"] = true;
    $.__views.__alloyId114 = Ti.UI.createImageView({
        mod: "m_myMedical",
        top: "15",
        width: "139",
        image: "/btn/btn_my_medical_record.png",
        id: "__alloyId114"
    });
    $.__views.__alloyId107.add($.__views.__alloyId114);
    navWindow ? $.__views.__alloyId114.addEventListener("click", navWindow) : __defers["$.__views.__alloyId114!click!navWindow"] = true;
    $.__views.__alloyId115 = Ti.UI.createImageView({
        mod: "clinicState",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId115"
    });
    $.__views.__alloyId107.add($.__views.__alloyId115);
    navWindow ? $.__views.__alloyId115.addEventListener("click", navWindow) : __defers["$.__views.__alloyId115!click!navWindow"] = true;
    $.__views.navMenu = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.root,
        id: "navMenu"
    });
    $.__views.navMenu && $.addTopLevelView($.__views.navMenu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    refreshHeaderInfo();
    var initBackground = [ {
        img_path: "images/background1.jpg",
        time: 0
    }, {
        img_path: "images/background2.jpg",
        time: 10
    }, {
        img_path: "images/background3.jpg",
        time: 18
    } ];
    var initBackgroundData = Ti.App.Properties.getString("initBackgroundData");
    initBackgroundData = 0;
    if ("1" != initBackgroundData) {
        Ti.App.Properties.setString("initBackgroundData", "1");
        var homebgModel = Alloy.createCollection("home_background");
        homebgModel.resetCategory();
        for (var i = 0; i < initBackground.length; i++) {
            var model = Alloy.createModel("home_background", {
                img_path: initBackground[i].img_path,
                time: initBackground[i].time
            });
            model.save();
        }
    }
    setBackground();
    Alloy.Globals.navMenu = $.navMenu;
    $.scrollboard.addEventListener("scroll", function(e) {
        var o = e.source.contentOffset;
        var ract = $.logo.rect;
        if (o.y > 139) {
            var pos = ract.top - (o.y - 139);
            $.logo.setTop(pos);
            $.myinfo_view.setTop(pos + 10);
            return;
        }
        if (o.y < 139 && o.y > 0) {
            $.logo.animate({
                top: 10,
                duration: 500
            }, function() {});
            $.myinfo_view.animate({
                top: 20,
                duration: 500
            }, function() {});
        }
    });
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
    __defers["$.__views.__alloyId108!click!navWindow"] && $.__views.__alloyId108.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId109!click!navWindow"] && $.__views.__alloyId109.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId110!click!navWindow"] && $.__views.__alloyId110.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId111!click!navWindow"] && $.__views.__alloyId111.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId112!click!navWindow"] && $.__views.__alloyId112.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId113!click!navWindow"] && $.__views.__alloyId113.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId114!click!navWindow"] && $.__views.__alloyId114.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId115!click!navWindow"] && $.__views.__alloyId115.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;