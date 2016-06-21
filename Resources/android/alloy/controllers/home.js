function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        $.win.add(loading.getView());
        loading.start();
        syncFromServer();
        refreshHeaderInfo();
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
        loading.finish();
        setTimeout(function() {
            PUSH.setInApp();
        }, 2e3);
    }
    function syncFromServer() {
        var checker = Alloy.createCollection("updateChecker");
        var isUpdate = checker.getCheckerById("2");
        var last_updated = "";
        "" != isUpdate && (last_updated = isUpdate.updated);
        var param = {
            member_no: Ti.App.Properties.getString("memno"),
            last_updated: last_updated
        };
        API.callByPost({
            url: "getNotificationUrl",
            params: param
        }, function(responseText) {
            var res = JSON.parse(responseText);
            if ("success" == res.status) {
                var record = res.data;
                if (record.length > 0) {
                    record.forEach(function(entry) {
                        var param = {
                            id: entry.id || "",
                            member_no: entry.member_no || "",
                            subject: entry.subject || "",
                            message: entry.message || "",
                            status: entry.status || 1,
                            url: entry.url || "",
                            status: entry.status || "",
                            expired: entry.expired || "",
                            created: entry.created,
                            updated: entry.updated,
                            from: "home"
                        };
                        notificationModel.addData(param);
                    });
                    checker.updateModule("2", "notificationList", res.last_updated);
                    updateNotification();
                }
            }
        });
    }
    function updateNotification() {
        var ismemno = Ti.App.Properties.getString("memno") || "";
        if ("" != ismemno) {
            var gotNotification = notificationModel.getCountUnread({
                member_no: Ti.App.Properties.getString("memno")
            });
            parseInt(gotNotification) > 0 ? $.notificationText.text = gotNotification : $.notificationIcon.visible = false;
        } else $.notificationIcon.visible = false;
    }
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
            $.logo.addEventListener("click", function() {
                nav.navigationWindow("aboutUs");
            });
        }
    }
    function navWindow(e) {
        var target = e.source.mod;
        "eCard" == e.source.mod || "eCard_list" == e.source.mod || "myClaim" == e.source.mod || "claimSubmission" == e.source.mod || "notification" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : "myHealth" == e.source.mod ? nav.navigationWindow(target + "/main") : "clinicLocator" == e.source.mod ? nav.navigateWithArgs("clinic/listing", 1) : nav.navigationWindow(target);
    }
    function logoutUser() {
        loading.start();
        var isCorpCode = Ti.App.Properties.getString("corpcode", "");
        if ("" != isCorpCode) {
            Ti.App.Properties.removeProperty("memno");
            Ti.App.Properties.removeProperty("empno");
            Ti.App.Properties.removeProperty("corpcode");
            Ti.App.Properties.removeProperty("asp_email");
            Ti.App.Properties.removeProperty("asp_password");
        } else {
            Ti.App.Properties.setString("u_id", "");
            FACEBOOK.logout();
            nav.navigateWithArgs("login", {});
        }
        refreshHeaderInfo();
        loading.finish();
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        id: "win",
        title: "",
        navBarHidden: true
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.win.add($.__views.main);
    $.__views.daily_background = Ti.UI.createView({
        id: "daily_background",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
    $.__views.main.add($.__views.daily_background);
    $.__views.__alloyId123 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId123"
    });
    $.__views.main.add($.__views.__alloyId123);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        borderRadius: 10,
        width: 100,
        height: 100,
        top: 10,
        left: 10,
        image: "/images/logo_plux.png",
        zIndex: 5
    });
    $.__views.__alloyId123.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: 4,
        id: "myinfo_view",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 20,
        backgroundColor: "#B3000000"
    });
    $.__views.__alloyId123.add($.__views.myinfo_view);
    $.__views.myInfo = Ti.UI.createView({
        layout: "horizontal",
        left: 110,
        width: Ti.UI.FILL,
        top: 10,
        bottom: 10,
        height: 60,
        id: "myInfo"
    });
    $.__views.myinfo_view.add($.__views.myInfo);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        top: 0,
        opacity: 0,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId123.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId124 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        text: "Loading",
        id: "__alloyId124"
    });
    $.__views.loadingBar.add($.__views.__alloyId124);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: 3
    });
    $.__views.__alloyId123.add($.__views.scrollboard);
    $.__views.__alloyId125 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        top: 239,
        id: "__alloyId125"
    });
    $.__views.scrollboard.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createImageView({
        mod: "eCard_list",
        top: 15,
        width: 139,
        image: "/images/btn/btn_asp_e_card_pass.png",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    navWindow ? $.addListener($.__views.__alloyId126, "click", navWindow) : __defers["$.__views.__alloyId126!click!navWindow"] = true;
    $.__views.__alloyId127 = Ti.UI.createImageView({
        mod: "myHealth",
        left: 15,
        top: 15,
        width: 139,
        image: "/images/btn/btn_my_health.png",
        id: "__alloyId127"
    });
    $.__views.__alloyId125.add($.__views.__alloyId127);
    navWindow ? $.addListener($.__views.__alloyId127, "click", navWindow) : __defers["$.__views.__alloyId127!click!navWindow"] = true;
    $.__views.__alloyId128 = Ti.UI.createImageView({
        mod: "myClaim",
        top: 15,
        width: 139,
        image: "/images/btn/btn_my_claim_detail.png",
        id: "__alloyId128"
    });
    $.__views.__alloyId125.add($.__views.__alloyId128);
    navWindow ? $.addListener($.__views.__alloyId128, "click", navWindow) : __defers["$.__views.__alloyId128!click!navWindow"] = true;
    $.__views.__alloyId129 = Ti.UI.createImageView({
        mod: "claimSubmission",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_claim_submission.png",
        id: "__alloyId129"
    });
    $.__views.__alloyId125.add($.__views.__alloyId129);
    navWindow ? $.addListener($.__views.__alloyId129, "click", navWindow) : __defers["$.__views.__alloyId129!click!navWindow"] = true;
    $.__views.__alloyId130 = Ti.UI.createImageView({
        mod: "profile",
        top: 15,
        width: 139,
        image: "/images/btn/btn_profile.png",
        id: "__alloyId130"
    });
    $.__views.__alloyId125.add($.__views.__alloyId130);
    navWindow ? $.addListener($.__views.__alloyId130, "click", navWindow) : __defers["$.__views.__alloyId130!click!navWindow"] = true;
    $.__views.__alloyId131 = Ti.UI.createImageView({
        mod: "hra",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_hra.png",
        id: "__alloyId131"
    });
    $.__views.__alloyId125.add($.__views.__alloyId131);
    navWindow ? $.addListener($.__views.__alloyId131, "click", navWindow) : __defers["$.__views.__alloyId131!click!navWindow"] = true;
    $.__views.__alloyId132 = Ti.UI.createImageView({
        mod: "myMedicalRecord",
        top: 15,
        width: 139,
        image: "/images/btn/btn_my_medical_record.png",
        id: "__alloyId132"
    });
    $.__views.__alloyId125.add($.__views.__alloyId132);
    navWindow ? $.addListener($.__views.__alloyId132, "click", navWindow) : __defers["$.__views.__alloyId132!click!navWindow"] = true;
    $.__views.__alloyId133 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId133"
    });
    $.__views.__alloyId125.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createImageView({
        mod: "notification",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_notification.png",
        id: "__alloyId134"
    });
    $.__views.__alloyId133.add($.__views.__alloyId134);
    navWindow ? $.addListener($.__views.__alloyId134, "click", navWindow) : __defers["$.__views.__alloyId134!click!navWindow"] = true;
    $.__views.notificationIcon = Ti.UI.createView({
        width: 30,
        height: 30,
        borderRadius: 15,
        id: "notificationIcon",
        backgroundColor: "#CE1D1C",
        top: 20,
        right: 15
    });
    $.__views.__alloyId133.add($.__views.notificationIcon);
    $.__views.notificationText = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        id: "notificationText",
        text: 0
    });
    $.__views.notificationIcon.add($.__views.notificationText);
    $.__views.__alloyId135 = Ti.UI.createImageView({
        mod: "conversation",
        top: 15,
        width: 139,
        image: "/images/btn/btn_ask_me.png",
        id: "__alloyId135"
    });
    $.__views.__alloyId125.add($.__views.__alloyId135);
    navWindow ? $.addListener($.__views.__alloyId135, "click", navWindow) : __defers["$.__views.__alloyId135!click!navWindow"] = true;
    $.__views.__alloyId136 = Ti.UI.createImageView({
        mod: "feedback",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_feedback.png",
        id: "__alloyId136"
    });
    $.__views.__alloyId125.add($.__views.__alloyId136);
    navWindow ? $.addListener($.__views.__alloyId136, "click", navWindow) : __defers["$.__views.__alloyId136!click!navWindow"] = true;
    $.__views.__alloyId137 = Ti.UI.createImageView({
        mod: "clinicLocator",
        top: 15,
        width: 139,
        image: "/images/btn/btn_clinic_location.png",
        id: "__alloyId137"
    });
    $.__views.__alloyId125.add($.__views.__alloyId137);
    navWindow ? $.addListener($.__views.__alloyId137, "click", navWindow) : __defers["$.__views.__alloyId137!click!navWindow"] = true;
    $.__views.__alloyId138 = Ti.UI.createImageView({
        mod: "appointment",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_appointment.png",
        id: "__alloyId138"
    });
    $.__views.__alloyId125.add($.__views.__alloyId138);
    navWindow ? $.addListener($.__views.__alloyId138, "click", navWindow) : __defers["$.__views.__alloyId138!click!navWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var loading = Alloy.createController("loading");
    var usersPluxModel = Alloy.createCollection("users_plux");
    var notificationModel = Alloy.createCollection("notification");
    common.construct($);
    init();
    $.win.addEventListener("android:back", function() {
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
    Titanium.App.addEventListener("resumed", function() {
        syncFromServer();
    });
    Ti.App.addEventListener("updateNotification", updateNotification);
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
    __defers["$.__views.__alloyId126!click!navWindow"] && $.addListener($.__views.__alloyId126, "click", navWindow);
    __defers["$.__views.__alloyId127!click!navWindow"] && $.addListener($.__views.__alloyId127, "click", navWindow);
    __defers["$.__views.__alloyId128!click!navWindow"] && $.addListener($.__views.__alloyId128, "click", navWindow);
    __defers["$.__views.__alloyId129!click!navWindow"] && $.addListener($.__views.__alloyId129, "click", navWindow);
    __defers["$.__views.__alloyId130!click!navWindow"] && $.addListener($.__views.__alloyId130, "click", navWindow);
    __defers["$.__views.__alloyId131!click!navWindow"] && $.addListener($.__views.__alloyId131, "click", navWindow);
    __defers["$.__views.__alloyId132!click!navWindow"] && $.addListener($.__views.__alloyId132, "click", navWindow);
    __defers["$.__views.__alloyId134!click!navWindow"] && $.addListener($.__views.__alloyId134, "click", navWindow);
    __defers["$.__views.__alloyId135!click!navWindow"] && $.addListener($.__views.__alloyId135, "click", navWindow);
    __defers["$.__views.__alloyId136!click!navWindow"] && $.addListener($.__views.__alloyId136, "click", navWindow);
    __defers["$.__views.__alloyId137!click!navWindow"] && $.addListener($.__views.__alloyId137, "click", navWindow);
    __defers["$.__views.__alloyId138!click!navWindow"] && $.addListener($.__views.__alloyId138, "click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;