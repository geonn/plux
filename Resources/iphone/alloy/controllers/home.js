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
        "eCard" == e.source.mod || "myClaim" == e.source.mod || "profile" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : nav.navigationWindow(target);
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
    $.__views.__alloyId130 = Ti.UI.createView({
        layout: "",
        id: "__alloyId130"
    });
    $.__views.main.add($.__views.__alloyId130);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png",
        zIndex: "5"
    });
    $.__views.__alloyId130.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "rgba(0,0,0,0.5)"
    });
    $.__views.__alloyId130.add($.__views.myinfo_view);
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
    $.__views.__alloyId130.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId131 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId131"
    });
    $.__views.loadingBar.add($.__views.__alloyId131);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId130.add($.__views.scrollboard);
    $.__views.__alloyId132 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId132"
    });
    $.__views.scrollboard.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createImageView({
        mod: "eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    navWindow ? $.__views.__alloyId133.addEventListener("click", navWindow) : __defers["$.__views.__alloyId133!click!navWindow"] = true;
    $.__views.__alloyId134 = Ti.UI.createImageView({
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
        id: "__alloyId134"
    });
    $.__views.__alloyId132.add($.__views.__alloyId134);
    navWindow ? $.__views.__alloyId134.addEventListener("click", navWindow) : __defers["$.__views.__alloyId134!click!navWindow"] = true;
    $.__views.__alloyId135 = Ti.UI.createImageView({
        mod: "myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
        id: "__alloyId135"
    });
    $.__views.__alloyId132.add($.__views.__alloyId135);
    navWindow ? $.__views.__alloyId135.addEventListener("click", navWindow) : __defers["$.__views.__alloyId135!click!navWindow"] = true;
    $.__views.__alloyId136 = Ti.UI.createImageView({
        mod: "profile",
        top: "15",
        left: "15",
        width: "139",
        image: "/btn/btn_profile.png",
        id: "__alloyId136"
    });
    $.__views.__alloyId132.add($.__views.__alloyId136);
    navWindow ? $.__views.__alloyId136.addEventListener("click", navWindow) : __defers["$.__views.__alloyId136!click!navWindow"] = true;
    $.__views.__alloyId137 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
        id: "__alloyId137"
    });
    $.__views.__alloyId132.add($.__views.__alloyId137);
    navWindow ? $.__views.__alloyId137.addEventListener("click", navWindow) : __defers["$.__views.__alloyId137!click!navWindow"] = true;
    $.__views.__alloyId138 = Ti.UI.createImageView({
        mod: "leaflet",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
        id: "__alloyId138"
    });
    $.__views.__alloyId132.add($.__views.__alloyId138);
    navWindow ? $.__views.__alloyId138.addEventListener("click", navWindow) : __defers["$.__views.__alloyId138!click!navWindow"] = true;
    $.__views.__alloyId139 = Ti.UI.createImageView({
        mod: "m_myMedical",
        top: "15",
        width: "139",
        image: "/btn/btn_my_medical_record.png",
        id: "__alloyId139"
    });
    $.__views.__alloyId132.add($.__views.__alloyId139);
    navWindow ? $.__views.__alloyId139.addEventListener("click", navWindow) : __defers["$.__views.__alloyId139!click!navWindow"] = true;
    $.__views.__alloyId140 = Ti.UI.createImageView({
        mod: "clinicState",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId140"
    });
    $.__views.__alloyId132.add($.__views.__alloyId140);
    navWindow ? $.__views.__alloyId140.addEventListener("click", navWindow) : __defers["$.__views.__alloyId140!click!navWindow"] = true;
    $.__views.__alloyId141 = Ti.UI.createImageView({
        mod: "hra",
        top: "15",
        width: "139",
        image: "/btn/btn_hra.png",
        id: "__alloyId141"
    });
    $.__views.__alloyId132.add($.__views.__alloyId141);
    navWindow ? $.__views.__alloyId141.addEventListener("click", navWindow) : __defers["$.__views.__alloyId141!click!navWindow"] = true;
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
    __defers["$.__views.__alloyId133!click!navWindow"] && $.__views.__alloyId133.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId134!click!navWindow"] && $.__views.__alloyId134.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId135!click!navWindow"] && $.__views.__alloyId135.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId136!click!navWindow"] && $.__views.__alloyId136.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId137!click!navWindow"] && $.__views.__alloyId137.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId138!click!navWindow"] && $.__views.__alloyId138.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId139!click!navWindow"] && $.__views.__alloyId139.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId140!click!navWindow"] && $.__views.__alloyId140.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId141!click!navWindow"] && $.__views.__alloyId141.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;