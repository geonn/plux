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
        var auth = require("auth_login");
        removeAllChildren($.myInfo);
        var u_id = Ti.App.Properties.getString("u_id");
        if (auth.checkLogin()) {
            $.logo.image = "/images/asp_logo.png";
            var me = usersModel.getUserByMemno();
            var button_view = $.UI.create("View", {
                width: Ti.UI.SIZE,
                height: Ti.UI.FILL
            });
            var logoutBtn = Ti.UI.createButton({
                backgroundImage: "/images/btn-logout.png",
                width: 40,
                height: 40,
                left: 5,
                right: 5
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
            var title_view = $.UI.create("View", {
                width: "auto",
                height: Ti.UI.FILL
            });
            var welcomeTitle = $.UI.create("Label", {
                text: "Welcome, " + me.name,
                classes: [ "welcome_text" ]
            });
            title_view.add(welcomeTitle);
            button_view.add(logoutBtn);
            $.myInfo.add(button_view);
            $.myInfo.add(title_view);
        } else {
            $.logo.image = "/images/logo_plux.png";
            var plux_user = usersPluxModel.getUserById(u_id);
            var logoutBtn = Ti.UI.createButton({
                backgroundImage: "/images/btn-logout.png",
                width: 40,
                height: 40,
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
            var title_view = $.UI.create("View", {
                width: "auto",
                height: Ti.UI.FILL
            });
            var welcomeTitle = $.UI.create("Label", {
                text: "Welcome, " + plux_user.fullname,
                classes: [ "welcome_text" ]
            });
            title_view.add(welcomeTitle);
            $.myInfo.add(logoutBtn);
            $.myInfo.add(title_view);
        }
    }
    function navWindow(e) {
        var target = e.source.mod;
        "eCard" == e.source.mod || "myClaim" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : "myHealth" == e.source.mod ? nav.navigationWindow(target + "/main") : "clinicLocator" == e.source.mod ? nav.navigateWithArgs("clinic/listing", 1) : nav.navigationWindow(target);
    }
    function logoutUser() {
        Ti.App.Properties.setString("memno", "");
        Ti.App.Properties.setString("empno", "");
        Ti.App.Properties.setString("corpcode", "");
        Ti.App.Properties.setString("u_id", "");
        Ti.App.Properties.removeProperty("asp_email");
        Ti.App.Properties.removeProperty("asp_password");
        refreshHeaderInfo();
        FACEBOOK.logout();
        nav.navigateWithArgs("login", {});
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
    this.args = arguments[0] || {};
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
    $.__views.__alloyId52 = Ti.UI.createView({
        layout: "",
        id: "__alloyId52"
    });
    $.__views.main.add($.__views.__alloyId52);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        borderRadius: "10",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png",
        zIndex: "5"
    });
    $.__views.__alloyId52.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "#B3000000"
    });
    $.__views.__alloyId52.add($.__views.myinfo_view);
    $.__views.myInfo = Ti.UI.createView({
        layout: "horizontal",
        left: "110",
        width: Ti.UI.FILL,
        top: "10",
        bottom: "10",
        height: "60",
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
    $.__views.__alloyId52.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId53 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId53"
    });
    $.__views.loadingBar.add($.__views.__alloyId53);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId52.add($.__views.scrollboard);
    $.__views.__alloyId54 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId54"
    });
    $.__views.scrollboard.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createImageView({
        mod: "eCard",
        top: "15",
        width: "139",
        image: "/images/btn/btn_asp_e_card_pass.png",
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    navWindow ? $.addListener($.__views.__alloyId55, "click", navWindow) : __defers["$.__views.__alloyId55!click!navWindow"] = true;
    $.__views.__alloyId56 = Ti.UI.createImageView({
        mod: "myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_health.png",
        id: "__alloyId56"
    });
    $.__views.__alloyId54.add($.__views.__alloyId56);
    navWindow ? $.addListener($.__views.__alloyId56, "click", navWindow) : __defers["$.__views.__alloyId56!click!navWindow"] = true;
    $.__views.__alloyId57 = Ti.UI.createImageView({
        mod: "myClaim",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_claim_detail.png",
        id: "__alloyId57"
    });
    $.__views.__alloyId54.add($.__views.__alloyId57);
    navWindow ? $.addListener($.__views.__alloyId57, "click", navWindow) : __defers["$.__views.__alloyId57!click!navWindow"] = true;
    $.__views.__alloyId58 = Ti.UI.createImageView({
        mod: "profile",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_profile.png",
        id: "__alloyId58"
    });
    $.__views.__alloyId54.add($.__views.__alloyId58);
    navWindow ? $.addListener($.__views.__alloyId58, "click", navWindow) : __defers["$.__views.__alloyId58!click!navWindow"] = true;
    $.__views.__alloyId59 = Ti.UI.createImageView({
        mod: "leaflet",
        top: "15",
        width: "139",
        image: "/images/btn/btn_leaflet.png",
        id: "__alloyId59"
    });
    $.__views.__alloyId54.add($.__views.__alloyId59);
    navWindow ? $.addListener($.__views.__alloyId59, "click", navWindow) : __defers["$.__views.__alloyId59!click!navWindow"] = true;
    $.__views.__alloyId60 = Ti.UI.createImageView({
        mod: "myMedicalRecord",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_my_medical_record.png",
        id: "__alloyId60"
    });
    $.__views.__alloyId54.add($.__views.__alloyId60);
    navWindow ? $.addListener($.__views.__alloyId60, "click", navWindow) : __defers["$.__views.__alloyId60!click!navWindow"] = true;
    $.__views.__alloyId61 = Ti.UI.createImageView({
        mod: "clinicLocator",
        top: "15",
        width: "139",
        image: "/images/btn/btn_clinic_location.png",
        id: "__alloyId61"
    });
    $.__views.__alloyId54.add($.__views.__alloyId61);
    navWindow ? $.addListener($.__views.__alloyId61, "click", navWindow) : __defers["$.__views.__alloyId61!click!navWindow"] = true;
    $.__views.__alloyId62 = Ti.UI.createImageView({
        mod: "hra",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_hra.png",
        id: "__alloyId62"
    });
    $.__views.__alloyId54.add($.__views.__alloyId62);
    navWindow ? $.addListener($.__views.__alloyId62, "click", navWindow) : __defers["$.__views.__alloyId62!click!navWindow"] = true;
    $.__views.__alloyId63 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/images/btn/btn_healthInfo.png",
        id: "__alloyId63"
    });
    $.__views.__alloyId54.add($.__views.__alloyId63);
    navWindow ? $.addListener($.__views.__alloyId63, "click", navWindow) : __defers["$.__views.__alloyId63!click!navWindow"] = true;
    $.__views.navMenu = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.root,
        id: "navMenu"
    });
    $.__views.navMenu && $.addTopLevelView($.__views.navMenu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var usersPluxModel = Alloy.createCollection("users_plux");
    refreshHeaderInfo();
    common.construct($);
    "android" != Ti.Platform.osname && (Alloy.Globals.navMenu = $.navMenu);
    var initBackground = [ {
        img_path: "/images/background1.jpg",
        time: 0
    }, {
        img_path: "/images/background2.jpg",
        time: 10
    }, {
        img_path: "/images/background3.jpg",
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
    "android" == Ti.Platform.osname && $.root.addEventListener("android:back", function() {
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
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
    __defers["$.__views.__alloyId55!click!navWindow"] && $.addListener($.__views.__alloyId55, "click", navWindow);
    __defers["$.__views.__alloyId56!click!navWindow"] && $.addListener($.__views.__alloyId56, "click", navWindow);
    __defers["$.__views.__alloyId57!click!navWindow"] && $.addListener($.__views.__alloyId57, "click", navWindow);
    __defers["$.__views.__alloyId58!click!navWindow"] && $.addListener($.__views.__alloyId58, "click", navWindow);
    __defers["$.__views.__alloyId59!click!navWindow"] && $.addListener($.__views.__alloyId59, "click", navWindow);
    __defers["$.__views.__alloyId60!click!navWindow"] && $.addListener($.__views.__alloyId60, "click", navWindow);
    __defers["$.__views.__alloyId61!click!navWindow"] && $.addListener($.__views.__alloyId61, "click", navWindow);
    __defers["$.__views.__alloyId62!click!navWindow"] && $.addListener($.__views.__alloyId62, "click", navWindow);
    __defers["$.__views.__alloyId63!click!navWindow"] && $.addListener($.__views.__alloyId63, "click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;