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
<<<<<<< HEAD
    $.__views.__alloyId99 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId99"
    });
    $.__views.main.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createView({
        layout: "",
        id: "__alloyId100"
    });
    $.__views.main.add($.__views.__alloyId100);
=======
    $.__views.daily_background = Ti.UI.createView({
        id: "daily_background",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
    $.__views.main.add($.__views.daily_background);
    $.__views.__alloyId101 = Ti.UI.createView({
        layout: "",
        id: "__alloyId101"
    });
    $.__views.main.add($.__views.__alloyId101);
>>>>>>> origin/master
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png",
        zIndex: "5"
    });
<<<<<<< HEAD
    $.__views.__alloyId100.add($.__views.logo);
=======
    $.__views.__alloyId101.add($.__views.logo);
>>>>>>> origin/master
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "rgba(0,0,0,0.5)"
    });
<<<<<<< HEAD
    $.__views.__alloyId100.add($.__views.myinfo_view);
=======
    $.__views.__alloyId101.add($.__views.myinfo_view);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId100.add($.__views.scrollboard);
    $.__views.__alloyId101 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId101"
    });
    $.__views.scrollboard.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createImageView({
=======
    $.__views.__alloyId101.add($.__views.scrollboard);
    $.__views.__alloyId102 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId102"
    });
    $.__views.scrollboard.add($.__views.__alloyId102);
    $.__views.__alloyId103 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "m_eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
<<<<<<< HEAD
        id: "__alloyId102"
    });
    $.__views.__alloyId101.add($.__views.__alloyId102);
    navWindow ? $.__views.__alloyId102.addEventListener("click", navWindow) : __defers["$.__views.__alloyId102!click!navWindow"] = true;
    $.__views.__alloyId103 = Ti.UI.createImageView({
=======
        id: "__alloyId103"
    });
    $.__views.__alloyId102.add($.__views.__alloyId103);
    navWindow ? $.__views.__alloyId103.addEventListener("click", navWindow) : __defers["$.__views.__alloyId103!click!navWindow"] = true;
    $.__views.__alloyId104 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
<<<<<<< HEAD
        id: "__alloyId103"
    });
    $.__views.__alloyId101.add($.__views.__alloyId103);
    navWindow ? $.__views.__alloyId103.addEventListener("click", navWindow) : __defers["$.__views.__alloyId103!click!navWindow"] = true;
    $.__views.__alloyId104 = Ti.UI.createImageView({
=======
        id: "__alloyId104"
    });
    $.__views.__alloyId102.add($.__views.__alloyId104);
    navWindow ? $.__views.__alloyId104.addEventListener("click", navWindow) : __defers["$.__views.__alloyId104!click!navWindow"] = true;
    $.__views.__alloyId105 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "m_myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
<<<<<<< HEAD
        id: "__alloyId104"
    });
    $.__views.__alloyId101.add($.__views.__alloyId104);
    navWindow ? $.__views.__alloyId104.addEventListener("click", navWindow) : __defers["$.__views.__alloyId104!click!navWindow"] = true;
    $.__views.__alloyId105 = Ti.UI.createImageView({
        mod: "clinicState",
        left: "15",
=======
        id: "__alloyId105"
    });
    $.__views.__alloyId102.add($.__views.__alloyId105);
    navWindow ? $.__views.__alloyId105.addEventListener("click", navWindow) : __defers["$.__views.__alloyId105!click!navWindow"] = true;
    $.__views.__alloyId106 = Ti.UI.createImageView({
        mod: "profile",
>>>>>>> origin/master
        top: "15",
        left: "15",
        width: "139",
<<<<<<< HEAD
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId105"
    });
    $.__views.__alloyId101.add($.__views.__alloyId105);
    navWindow ? $.__views.__alloyId105.addEventListener("click", navWindow) : __defers["$.__views.__alloyId105!click!navWindow"] = true;
    $.__views.__alloyId106 = Ti.UI.createImageView({
=======
        image: "/btn/btn_profile.png",
        id: "__alloyId106"
    });
    $.__views.__alloyId102.add($.__views.__alloyId106);
    navWindow ? $.__views.__alloyId106.addEventListener("click", navWindow) : __defers["$.__views.__alloyId106!click!navWindow"] = true;
    $.__views.__alloyId107 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
<<<<<<< HEAD
        id: "__alloyId106"
    });
    $.__views.__alloyId101.add($.__views.__alloyId106);
    navWindow ? $.__views.__alloyId106.addEventListener("click", navWindow) : __defers["$.__views.__alloyId106!click!navWindow"] = true;
    $.__views.__alloyId107 = Ti.UI.createImageView({
=======
        id: "__alloyId107"
    });
    $.__views.__alloyId102.add($.__views.__alloyId107);
    navWindow ? $.__views.__alloyId107.addEventListener("click", navWindow) : __defers["$.__views.__alloyId107!click!navWindow"] = true;
    $.__views.__alloyId108 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "leaflet",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
<<<<<<< HEAD
        id: "__alloyId107"
    });
    $.__views.__alloyId101.add($.__views.__alloyId107);
    navWindow ? $.__views.__alloyId107.addEventListener("click", navWindow) : __defers["$.__views.__alloyId107!click!navWindow"] = true;
    $.__views.__alloyId108 = Ti.UI.createImageView({
=======
        id: "__alloyId108"
    });
    $.__views.__alloyId102.add($.__views.__alloyId108);
    navWindow ? $.__views.__alloyId108.addEventListener("click", navWindow) : __defers["$.__views.__alloyId108!click!navWindow"] = true;
    $.__views.__alloyId109 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "m_myMedical",
        top: "15",
        width: "139",
        image: "/btn/btn_my_medical_record.png",
<<<<<<< HEAD
        id: "__alloyId108"
    });
    $.__views.__alloyId101.add($.__views.__alloyId108);
    navWindow ? $.__views.__alloyId108.addEventListener("click", navWindow) : __defers["$.__views.__alloyId108!click!navWindow"] = true;
=======
        id: "__alloyId109"
    });
    $.__views.__alloyId102.add($.__views.__alloyId109);
    navWindow ? $.__views.__alloyId109.addEventListener("click", navWindow) : __defers["$.__views.__alloyId109!click!navWindow"] = true;
    $.__views.__alloyId110 = Ti.UI.createImageView({
        mod: "clinicState",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId110"
    });
    $.__views.__alloyId102.add($.__views.__alloyId110);
    navWindow ? $.__views.__alloyId110.addEventListener("click", navWindow) : __defers["$.__views.__alloyId110!click!navWindow"] = true;
>>>>>>> origin/master
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
        img_path: "/dummy/dummy-home.jpg",
        time: 0
    }, {
        img_path: "/dummy/dummy-home-pm.jpg",
        time: 12
    } ];
    var initBackgroundData = Ti.App.Properties.getString("initBackgroundData");
    if ("1" != initBackgroundData) {
        Ti.App.Properties.setString("initBackgroundData", "1");
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
<<<<<<< HEAD
    __defers["$.__views.__alloyId102!click!navWindow"] && $.__views.__alloyId102.addEventListener("click", navWindow);
=======
>>>>>>> origin/master
    __defers["$.__views.__alloyId103!click!navWindow"] && $.__views.__alloyId103.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId104!click!navWindow"] && $.__views.__alloyId104.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId105!click!navWindow"] && $.__views.__alloyId105.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId106!click!navWindow"] && $.__views.__alloyId106.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId107!click!navWindow"] && $.__views.__alloyId107.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId108!click!navWindow"] && $.__views.__alloyId108.addEventListener("click", navWindow);
<<<<<<< HEAD
=======
    __defers["$.__views.__alloyId109!click!navWindow"] && $.__views.__alloyId109.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId110!click!navWindow"] && $.__views.__alloyId110.addEventListener("click", navWindow);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;