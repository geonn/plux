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
                    cancel: 0,
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
                    cancel: 0,
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
<<<<<<< HEAD
        "eCard" == e.source.mod || "eCard_list" == e.source.mod || "myClaim" == e.source.mod || "claimSubmission" == e.source.mod || "notification" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : "myHealth" == e.source.mod ? nav.navigationWindow(target + "/main") : "clinicLocator" == e.source.mod ? nav.navigateWithArgs("clinic/listing", 1) : nav.navigationWindow(target);
=======
        "eCard" == e.source.mod || "eCard_list" == e.source.mod || "myClaim" == e.source.mod || "claimSubmission" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : "myHealth" == e.source.mod ? nav.navigationWindow(target + "/main") : "clinicLocator" == e.source.mod ? nav.navigateWithArgs("clinic/listing", 1) : nav.navigationWindow(target);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId66 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId66"
    });
    $.__views.main.add($.__views.__alloyId66);
=======
    $.__views.__alloyId41 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId41"
    });
    $.__views.main.add($.__views.__alloyId41);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId66.add($.__views.logo);
=======
    $.__views.__alloyId41.add($.__views.logo);
>>>>>>> origin/master
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "#B3000000"
    });
<<<<<<< HEAD
    $.__views.__alloyId66.add($.__views.myinfo_view);
=======
    $.__views.__alloyId41.add($.__views.myinfo_view);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId66.add($.__views.loadingBar);
=======
    $.__views.__alloyId41.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId67 = Ti.UI.createLabel({
=======
    $.__views.__alloyId42 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId67"
    });
    $.__views.loadingBar.add($.__views.__alloyId67);
=======
        id: "__alloyId42"
    });
    $.__views.loadingBar.add($.__views.__alloyId42);
>>>>>>> origin/master
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
<<<<<<< HEAD
    $.__views.__alloyId66.add($.__views.scrollboard);
    $.__views.__alloyId68 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        top: "239",
        id: "__alloyId68"
    });
    $.__views.scrollboard.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createImageView({
=======
    $.__views.__alloyId41.add($.__views.scrollboard);
    $.__views.__alloyId43 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        top: "239",
        id: "__alloyId43"
    });
    $.__views.scrollboard.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "eCard_list",
        top: "15",
        width: "139",
        image: "/images/btn/btn_asp_e_card_pass.png",
<<<<<<< HEAD
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
    navWindow ? $.addListener($.__views.__alloyId69, "click", navWindow) : __defers["$.__views.__alloyId69!click!navWindow"] = true;
    $.__views.__alloyId70 = Ti.UI.createImageView({
=======
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    navWindow ? $.addListener($.__views.__alloyId44, "click", navWindow) : __defers["$.__views.__alloyId44!click!navWindow"] = true;
    $.__views.__alloyId45 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_health.png",
<<<<<<< HEAD
        id: "__alloyId70"
    });
    $.__views.__alloyId68.add($.__views.__alloyId70);
    navWindow ? $.addListener($.__views.__alloyId70, "click", navWindow) : __defers["$.__views.__alloyId70!click!navWindow"] = true;
    $.__views.__alloyId71 = Ti.UI.createImageView({
=======
        id: "__alloyId45"
    });
    $.__views.__alloyId43.add($.__views.__alloyId45);
    navWindow ? $.addListener($.__views.__alloyId45, "click", navWindow) : __defers["$.__views.__alloyId45!click!navWindow"] = true;
    $.__views.__alloyId46 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "myClaim",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_claim_detail.png",
<<<<<<< HEAD
        id: "__alloyId71"
    });
    $.__views.__alloyId68.add($.__views.__alloyId71);
    navWindow ? $.addListener($.__views.__alloyId71, "click", navWindow) : __defers["$.__views.__alloyId71!click!navWindow"] = true;
    $.__views.__alloyId72 = Ti.UI.createImageView({
=======
        id: "__alloyId46"
    });
    $.__views.__alloyId43.add($.__views.__alloyId46);
    navWindow ? $.addListener($.__views.__alloyId46, "click", navWindow) : __defers["$.__views.__alloyId46!click!navWindow"] = true;
    $.__views.__alloyId47 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "claimSubmission",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_claim_submission.png",
<<<<<<< HEAD
        id: "__alloyId72"
    });
    $.__views.__alloyId68.add($.__views.__alloyId72);
    navWindow ? $.addListener($.__views.__alloyId72, "click", navWindow) : __defers["$.__views.__alloyId72!click!navWindow"] = true;
    $.__views.__alloyId73 = Ti.UI.createImageView({
=======
        id: "__alloyId47"
    });
    $.__views.__alloyId43.add($.__views.__alloyId47);
    navWindow ? $.addListener($.__views.__alloyId47, "click", navWindow) : __defers["$.__views.__alloyId47!click!navWindow"] = true;
    $.__views.__alloyId48 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "clinicLocator",
        top: "15",
        width: "139",
        image: "/images/btn/btn_clinic_location.png",
<<<<<<< HEAD
        id: "__alloyId73"
    });
    $.__views.__alloyId68.add($.__views.__alloyId73);
    navWindow ? $.addListener($.__views.__alloyId73, "click", navWindow) : __defers["$.__views.__alloyId73!click!navWindow"] = true;
    $.__views.__alloyId74 = Ti.UI.createImageView({
=======
        id: "__alloyId48"
    });
    $.__views.__alloyId43.add($.__views.__alloyId48);
    navWindow ? $.addListener($.__views.__alloyId48, "click", navWindow) : __defers["$.__views.__alloyId48!click!navWindow"] = true;
    $.__views.__alloyId49 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "appointment",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_appointment.png",
<<<<<<< HEAD
        id: "__alloyId74"
    });
    $.__views.__alloyId68.add($.__views.__alloyId74);
    navWindow ? $.addListener($.__views.__alloyId74, "click", navWindow) : __defers["$.__views.__alloyId74!click!navWindow"] = true;
    $.__views.__alloyId75 = Ti.UI.createImageView({
=======
        id: "__alloyId49"
    });
    $.__views.__alloyId43.add($.__views.__alloyId49);
    navWindow ? $.addListener($.__views.__alloyId49, "click", navWindow) : __defers["$.__views.__alloyId49!click!navWindow"] = true;
    $.__views.__alloyId50 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "myMedicalRecord",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_medical_record.png",
<<<<<<< HEAD
        id: "__alloyId75"
    });
    $.__views.__alloyId68.add($.__views.__alloyId75);
    navWindow ? $.addListener($.__views.__alloyId75, "click", navWindow) : __defers["$.__views.__alloyId75!click!navWindow"] = true;
    $.__views.__alloyId76 = Ti.UI.createImageView({
=======
        id: "__alloyId50"
    });
    $.__views.__alloyId43.add($.__views.__alloyId50);
    navWindow ? $.addListener($.__views.__alloyId50, "click", navWindow) : __defers["$.__views.__alloyId50!click!navWindow"] = true;
    $.__views.__alloyId51 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "hra",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_hra.png",
<<<<<<< HEAD
        id: "__alloyId76"
    });
    $.__views.__alloyId68.add($.__views.__alloyId76);
    navWindow ? $.addListener($.__views.__alloyId76, "click", navWindow) : __defers["$.__views.__alloyId76!click!navWindow"] = true;
    $.__views.__alloyId77 = Ti.UI.createImageView({
=======
        id: "__alloyId51"
    });
    $.__views.__alloyId43.add($.__views.__alloyId51);
    navWindow ? $.addListener($.__views.__alloyId51, "click", navWindow) : __defers["$.__views.__alloyId51!click!navWindow"] = true;
    $.__views.__alloyId52 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "leaflet",
        top: "15",
        width: "139",
        image: "/images/btn/btn_leaflet.png",
<<<<<<< HEAD
        id: "__alloyId77"
    });
    $.__views.__alloyId68.add($.__views.__alloyId77);
    navWindow ? $.addListener($.__views.__alloyId77, "click", navWindow) : __defers["$.__views.__alloyId77!click!navWindow"] = true;
    $.__views.__alloyId78 = Ti.UI.createImageView({
=======
        id: "__alloyId52"
    });
    $.__views.__alloyId43.add($.__views.__alloyId52);
    navWindow ? $.addListener($.__views.__alloyId52, "click", navWindow) : __defers["$.__views.__alloyId52!click!navWindow"] = true;
    $.__views.__alloyId53 = Ti.UI.createImageView({
>>>>>>> origin/master
        mod: "healthInfo",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_healthInfo.png",
<<<<<<< HEAD
        id: "__alloyId78"
    });
    $.__views.__alloyId68.add($.__views.__alloyId78);
    navWindow ? $.addListener($.__views.__alloyId78, "click", navWindow) : __defers["$.__views.__alloyId78!click!navWindow"] = true;
    $.__views.__alloyId79 = Ti.UI.createImageView({
        mod: "profile",
        top: "15",
        width: "139",
        image: "/images/btn/btn_profile.png",
        id: "__alloyId79"
    });
    $.__views.__alloyId68.add($.__views.__alloyId79);
    navWindow ? $.addListener($.__views.__alloyId79, "click", navWindow) : __defers["$.__views.__alloyId79!click!navWindow"] = true;
    $.__views.__alloyId80 = Ti.UI.createImageView({
        mod: "notification",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_notification.png",
        id: "__alloyId80"
    });
    $.__views.__alloyId68.add($.__views.__alloyId80);
    navWindow ? $.addListener($.__views.__alloyId80, "click", navWindow) : __defers["$.__views.__alloyId80!click!navWindow"] = true;
=======
        id: "__alloyId53"
    });
    $.__views.__alloyId43.add($.__views.__alloyId53);
    navWindow ? $.addListener($.__views.__alloyId53, "click", navWindow) : __defers["$.__views.__alloyId53!click!navWindow"] = true;
    $.__views.__alloyId54 = Ti.UI.createImageView({
        mod: "profile",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_profile.png",
        id: "__alloyId54"
    });
    $.__views.__alloyId43.add($.__views.__alloyId54);
    navWindow ? $.addListener($.__views.__alloyId54, "click", navWindow) : __defers["$.__views.__alloyId54!click!navWindow"] = true;
>>>>>>> origin/master
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
    $.root.addEventListener("android:back", function() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Cancel", "Confirm" ],
            message: "Would you like to logout?",
            title: "Logout PLUX"
        });
        dialog.addEventListener("click", function(e) {
            1 == e.index && logoutUser();
        });
        dialog.show();
    });
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
<<<<<<< HEAD
    __defers["$.__views.__alloyId69!click!navWindow"] && $.addListener($.__views.__alloyId69, "click", navWindow);
    __defers["$.__views.__alloyId70!click!navWindow"] && $.addListener($.__views.__alloyId70, "click", navWindow);
    __defers["$.__views.__alloyId71!click!navWindow"] && $.addListener($.__views.__alloyId71, "click", navWindow);
    __defers["$.__views.__alloyId72!click!navWindow"] && $.addListener($.__views.__alloyId72, "click", navWindow);
    __defers["$.__views.__alloyId73!click!navWindow"] && $.addListener($.__views.__alloyId73, "click", navWindow);
    __defers["$.__views.__alloyId74!click!navWindow"] && $.addListener($.__views.__alloyId74, "click", navWindow);
    __defers["$.__views.__alloyId75!click!navWindow"] && $.addListener($.__views.__alloyId75, "click", navWindow);
    __defers["$.__views.__alloyId76!click!navWindow"] && $.addListener($.__views.__alloyId76, "click", navWindow);
    __defers["$.__views.__alloyId77!click!navWindow"] && $.addListener($.__views.__alloyId77, "click", navWindow);
    __defers["$.__views.__alloyId78!click!navWindow"] && $.addListener($.__views.__alloyId78, "click", navWindow);
    __defers["$.__views.__alloyId79!click!navWindow"] && $.addListener($.__views.__alloyId79, "click", navWindow);
    __defers["$.__views.__alloyId80!click!navWindow"] && $.addListener($.__views.__alloyId80, "click", navWindow);
=======
    __defers["$.__views.__alloyId44!click!navWindow"] && $.addListener($.__views.__alloyId44, "click", navWindow);
    __defers["$.__views.__alloyId45!click!navWindow"] && $.addListener($.__views.__alloyId45, "click", navWindow);
    __defers["$.__views.__alloyId46!click!navWindow"] && $.addListener($.__views.__alloyId46, "click", navWindow);
    __defers["$.__views.__alloyId47!click!navWindow"] && $.addListener($.__views.__alloyId47, "click", navWindow);
    __defers["$.__views.__alloyId48!click!navWindow"] && $.addListener($.__views.__alloyId48, "click", navWindow);
    __defers["$.__views.__alloyId49!click!navWindow"] && $.addListener($.__views.__alloyId49, "click", navWindow);
    __defers["$.__views.__alloyId50!click!navWindow"] && $.addListener($.__views.__alloyId50, "click", navWindow);
    __defers["$.__views.__alloyId51!click!navWindow"] && $.addListener($.__views.__alloyId51, "click", navWindow);
    __defers["$.__views.__alloyId52!click!navWindow"] && $.addListener($.__views.__alloyId52, "click", navWindow);
    __defers["$.__views.__alloyId53!click!navWindow"] && $.addListener($.__views.__alloyId53, "click", navWindow);
    __defers["$.__views.__alloyId54!click!navWindow"] && $.addListener($.__views.__alloyId54, "click", navWindow);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;