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
            $.logo.image = "/images/logo_plux.png";
            var plux_user = usersPluxModel.getUserById(u_id);
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
                text: "Welcome " + plux_user.fullname,
                classes: [ "welcome_text" ]
            });
            $.myInfo.add(logoutBtn);
            $.myInfo.add(welcomeTitle);
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
    $.__views.root && $.addTopLevelView($.__views.root);
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
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "",
        id: "__alloyId15"
    });
    $.__views.main.add($.__views.__alloyId15);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        borderRadius: "10",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/images/logo_plux.png",
        zIndex: "5"
    });
    $.__views.__alloyId15.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "rgba(0,0,0,0.5)"
    });
    $.__views.__alloyId15.add($.__views.myinfo_view);
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
    $.__views.__alloyId15.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId16"
    });
    $.__views.loadingBar.add($.__views.__alloyId16);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId15.add($.__views.scrollboard);
    $.__views.__alloyId17 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        top: "239",
        left: "15",
        id: "__alloyId17"
    });
    $.__views.scrollboard.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createImageView({
        mod: "eCard",
        top: "15",
        width: "139",
        image: "/images/btn/btn_asp_e_card_pass.png",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    navWindow ? $.__views.__alloyId18.addEventListener("click", navWindow) : __defers["$.__views.__alloyId18!click!navWindow"] = true;
    $.__views.__alloyId19 = Ti.UI.createImageView({
        mod: "myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_health.png",
        id: "__alloyId19"
    });
    $.__views.__alloyId17.add($.__views.__alloyId19);
    navWindow ? $.__views.__alloyId19.addEventListener("click", navWindow) : __defers["$.__views.__alloyId19!click!navWindow"] = true;
    $.__views.__alloyId20 = Ti.UI.createImageView({
        mod: "myClaim",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_claim_detail.png",
        id: "__alloyId20"
    });
    $.__views.__alloyId17.add($.__views.__alloyId20);
    navWindow ? $.__views.__alloyId20.addEventListener("click", navWindow) : __defers["$.__views.__alloyId20!click!navWindow"] = true;
    $.__views.__alloyId21 = Ti.UI.createImageView({
        mod: "profile",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_profile.png",
        id: "__alloyId21"
    });
    $.__views.__alloyId17.add($.__views.__alloyId21);
    navWindow ? $.__views.__alloyId21.addEventListener("click", navWindow) : __defers["$.__views.__alloyId21!click!navWindow"] = true;
    $.__views.__alloyId22 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/images/btn/btn_healthInfo.png",
        id: "__alloyId22"
    });
    $.__views.__alloyId17.add($.__views.__alloyId22);
    navWindow ? $.__views.__alloyId22.addEventListener("click", navWindow) : __defers["$.__views.__alloyId22!click!navWindow"] = true;
    $.__views.__alloyId23 = Ti.UI.createImageView({
        mod: "leaflet",
        left: "15",
        top: "15",
        width: "139",
        image: "/images/btn/btn_leaflet.png",
        id: "__alloyId23"
    });
    $.__views.__alloyId17.add($.__views.__alloyId23);
    navWindow ? $.__views.__alloyId23.addEventListener("click", navWindow) : __defers["$.__views.__alloyId23!click!navWindow"] = true;
    $.__views.__alloyId24 = Ti.UI.createImageView({
        mod: "myMedicalRecord",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_medical_record.png",
        id: "__alloyId24"
    });
    $.__views.__alloyId17.add($.__views.__alloyId24);
    navWindow ? $.__views.__alloyId24.addEventListener("click", navWindow) : __defers["$.__views.__alloyId24!click!navWindow"] = true;
    $.__views.__alloyId25 = Ti.UI.createImageView({
        mod: "clinicLocator",
        left: "15",
        top: "15",
        width: "139",
        image: "/images/btn/btn_clinic_location.png",
        id: "__alloyId25"
    });
    $.__views.__alloyId17.add($.__views.__alloyId25);
    navWindow ? $.__views.__alloyId25.addEventListener("click", navWindow) : __defers["$.__views.__alloyId25!click!navWindow"] = true;
    $.__views.__alloyId26 = Ti.UI.createImageView({
        mod: "hra",
        top: "15",
        width: "139",
        image: "/images/btn/btn_hra.png",
        id: "__alloyId26"
    });
    $.__views.__alloyId17.add($.__views.__alloyId26);
    navWindow ? $.__views.__alloyId26.addEventListener("click", navWindow) : __defers["$.__views.__alloyId26!click!navWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var usersPluxModel = Alloy.createCollection("users_plux");
    refreshHeaderInfo();
    common.construct($);
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
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
    __defers["$.__views.__alloyId18!click!navWindow"] && $.__views.__alloyId18.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId19!click!navWindow"] && $.__views.__alloyId19.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId20!click!navWindow"] && $.__views.__alloyId20.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId21!click!navWindow"] && $.__views.__alloyId21.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId22!click!navWindow"] && $.__views.__alloyId22.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId23!click!navWindow"] && $.__views.__alloyId23.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId24!click!navWindow"] && $.__views.__alloyId24.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId25!click!navWindow"] && $.__views.__alloyId25.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId26!click!navWindow"] && $.__views.__alloyId26.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;