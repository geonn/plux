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
<<<<<<< HEAD
<<<<<<< HEAD
        "eCard" == e.source.mod || "myClaim" == e.source.mod || "profile" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : nav.navigationWindow("myHealth" == e.source.mod ? target + "/main" : target);
=======
        "eCard" == e.source.mod || "myClaim" == e.source.mod || "profile" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : "state" == e.source.mod ? nav.navigationWindow("clinic/" + target, 1) : nav.navigationWindow(target);
>>>>>>> origin/master
=======
        "eCard" == e.source.mod || "myClaim" == e.source.mod || "profile" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : "state" == e.source.mod ? nav.navigationWindow("clinic/" + target, 1) : nav.navigationWindow(target);
>>>>>>> origin/master
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
    function loginFacebook(e) {
        if (e.success) {
            common.showLoading();
            FACEBOOK.requestWithGraphPath("me", {}, "GET", function(e) {
                if (e.success) {
                    var fbRes = JSON.parse(e.result);
                    API.updateUserFromFB({
                        email: fbRes.email,
                        fbid: fbRes.id,
                        link: fbRes.link,
                        name: fbRes.name,
                        gender: fbRes.gender
                    }, $);
                }
            });
            FACEBOOK.removeEventListener("login", loginFacebook);
        } else e.error || e.cancelled;
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
    $.__views.__alloyId53 = Ti.UI.createView({
        layout: "",
        id: "__alloyId53"
    });
    $.__views.main.add($.__views.__alloyId53);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png",
        zIndex: "5"
    });
    $.__views.__alloyId53.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "rgba(0,0,0,0.5)"
    });
    $.__views.__alloyId53.add($.__views.myinfo_view);
    $.__views.fbloginView = Ti.UI.createView({
        height: "40",
        id: "fbloginView"
    });
    $.__views.myinfo_view.add($.__views.fbloginView);
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
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "0",
        width: "120",
        borderRadius: "15",
        top: "0",
        opacity: "0",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId53.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId54 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId54"
    });
    $.__views.loadingBar.add($.__views.__alloyId54);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId53.add($.__views.scrollboard);
    $.__views.__alloyId55 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId55"
    });
    $.__views.scrollboard.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createImageView({
        mod: "eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    navWindow ? $.__views.__alloyId56.addEventListener("click", navWindow) : __defers["$.__views.__alloyId56!click!navWindow"] = true;
    $.__views.__alloyId57 = Ti.UI.createImageView({
        mod: "myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
        id: "__alloyId57"
    });
    $.__views.__alloyId55.add($.__views.__alloyId57);
    navWindow ? $.__views.__alloyId57.addEventListener("click", navWindow) : __defers["$.__views.__alloyId57!click!navWindow"] = true;
    $.__views.__alloyId58 = Ti.UI.createImageView({
        mod: "myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
        id: "__alloyId58"
    });
    $.__views.__alloyId55.add($.__views.__alloyId58);
    navWindow ? $.__views.__alloyId58.addEventListener("click", navWindow) : __defers["$.__views.__alloyId58!click!navWindow"] = true;
    $.__views.__alloyId59 = Ti.UI.createImageView({
        mod: "profile",
        top: "15",
        left: "15",
        width: "139",
        image: "/btn/btn_profile.png",
        id: "__alloyId59"
    });
    $.__views.__alloyId55.add($.__views.__alloyId59);
    navWindow ? $.__views.__alloyId59.addEventListener("click", navWindow) : __defers["$.__views.__alloyId59!click!navWindow"] = true;
    $.__views.__alloyId60 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
        id: "__alloyId60"
    });
    $.__views.__alloyId55.add($.__views.__alloyId60);
    navWindow ? $.__views.__alloyId60.addEventListener("click", navWindow) : __defers["$.__views.__alloyId60!click!navWindow"] = true;
    $.__views.__alloyId61 = Ti.UI.createImageView({
        mod: "leaflet",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
        id: "__alloyId61"
    });
    $.__views.__alloyId55.add($.__views.__alloyId61);
    navWindow ? $.__views.__alloyId61.addEventListener("click", navWindow) : __defers["$.__views.__alloyId61!click!navWindow"] = true;
    $.__views.__alloyId62 = Ti.UI.createImageView({
        mod: "myMedicalRecord",
        top: "15",
        width: "139",
        image: "/btn/btn_my_medical_record.png",
        id: "__alloyId62"
    });
<<<<<<< HEAD
    $.__views.__alloyId55.add($.__views.__alloyId62);
    navWindow ? $.__views.__alloyId62.addEventListener("click", navWindow) : __defers["$.__views.__alloyId62!click!navWindow"] = true;
    $.__views.__alloyId63 = Ti.UI.createImageView({
        mod: "clinicState",
=======
    $.__views.__alloyId123.add($.__views.__alloyId130);
    navWindow ? $.__views.__alloyId130.addEventListener("click", navWindow) : __defers["$.__views.__alloyId130!click!navWindow"] = true;
    $.__views.__alloyId131 = Ti.UI.createImageView({
        mod: "state",
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId63"
    });
    $.__views.__alloyId55.add($.__views.__alloyId63);
    navWindow ? $.__views.__alloyId63.addEventListener("click", navWindow) : __defers["$.__views.__alloyId63!click!navWindow"] = true;
    $.__views.__alloyId64 = Ti.UI.createImageView({
        mod: "hra",
        top: "15",
        width: "139",
        image: "/btn/btn_hra.png",
        id: "__alloyId64"
    });
    $.__views.__alloyId55.add($.__views.__alloyId64);
    navWindow ? $.__views.__alloyId64.addEventListener("click", navWindow) : __defers["$.__views.__alloyId64!click!navWindow"] = true;
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
    common.construct($);
    Alloy.Globals.navMenu = $.navMenu;
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
    $.fbloginView.add(FACEBOOK.createLoginButton({
        top: 10,
        style: FACEBOOK.BUTTON_STYLE_WIDE
    }));
    FACEBOOK.addEventListener("login", loginFacebook);
    FACEBOOK.addEventListener("logout", function() {
        alert("Logged out");
    });
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
    __defers["$.__views.__alloyId56!click!navWindow"] && $.__views.__alloyId56.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId57!click!navWindow"] && $.__views.__alloyId57.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId58!click!navWindow"] && $.__views.__alloyId58.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId59!click!navWindow"] && $.__views.__alloyId59.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId60!click!navWindow"] && $.__views.__alloyId60.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId61!click!navWindow"] && $.__views.__alloyId61.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId62!click!navWindow"] && $.__views.__alloyId62.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId63!click!navWindow"] && $.__views.__alloyId63.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId64!click!navWindow"] && $.__views.__alloyId64.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;