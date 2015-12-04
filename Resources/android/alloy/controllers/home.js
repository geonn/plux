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
        var ismemno = Ti.App.Properties.getString("memno") || "";
        if ("" != ismemno) {
            var gotNotification = notificationModel.getCountUnread({
                member_no: Ti.App.Properties.getString("memno")
            });
            gotNotification.total > 0 ? $.notificationText.text = gotNotification.total : $.notificationIcon.visible = false;
        } else $.notificationIcon.visible = false;
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
    }
    function updateNotification() {
        var ismemno = Ti.App.Properties.getString("memno") || "";
        if ("" != ismemno) {
            var gotNotification = notificationModel.getCountUnread({
                member_no: Ti.App.Properties.getString("memno")
            });
            gotNotification.total > 0 ? $.notificationText.text = gotNotification.total : $.notificationIcon.visible = false;
        } else $.notificationIcon.visible = false;
        console.log("notification counter refresh");
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
        navBarHidden: "true"
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
    $.__views.__alloyId87 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId87"
    });
    $.__views.main.add($.__views.__alloyId87);
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
    $.__views.__alloyId87.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "#B3000000"
    });
    $.__views.__alloyId87.add($.__views.myinfo_view);
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
    $.__views.__alloyId87.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId88 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: "5",
        text: "Loading",
        id: "__alloyId88"
    });
    $.__views.loadingBar.add($.__views.__alloyId88);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId87.add($.__views.scrollboard);
    $.__views.__alloyId89 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        top: "239",
        id: "__alloyId89"
    });
    $.__views.scrollboard.add($.__views.__alloyId89);
    $.__views.__alloyId90 = Ti.UI.createImageView({
        mod: "eCard_list",
        top: "15",
        width: "139",
        image: "/images/btn/btn_asp_e_card_pass.png",
        id: "__alloyId90"
    });
    $.__views.__alloyId89.add($.__views.__alloyId90);
    navWindow ? $.addListener($.__views.__alloyId90, "click", navWindow) : __defers["$.__views.__alloyId90!click!navWindow"] = true;
    $.__views.__alloyId91 = Ti.UI.createImageView({
        mod: "myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_health.png",
        id: "__alloyId91"
    });
    $.__views.__alloyId89.add($.__views.__alloyId91);
    navWindow ? $.addListener($.__views.__alloyId91, "click", navWindow) : __defers["$.__views.__alloyId91!click!navWindow"] = true;
    $.__views.__alloyId92 = Ti.UI.createImageView({
        mod: "myClaim",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_claim_detail.png",
        id: "__alloyId92"
    });
    $.__views.__alloyId89.add($.__views.__alloyId92);
    navWindow ? $.addListener($.__views.__alloyId92, "click", navWindow) : __defers["$.__views.__alloyId92!click!navWindow"] = true;
    $.__views.__alloyId93 = Ti.UI.createImageView({
        mod: "claimSubmission",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_claim_submission.png",
        id: "__alloyId93"
    });
    $.__views.__alloyId89.add($.__views.__alloyId93);
    navWindow ? $.addListener($.__views.__alloyId93, "click", navWindow) : __defers["$.__views.__alloyId93!click!navWindow"] = true;
    $.__views.__alloyId94 = Ti.UI.createImageView({
        mod: "clinicLocator",
        top: "15",
        width: "139",
        image: "/images/btn/btn_clinic_location.png",
        id: "__alloyId94"
    });
    $.__views.__alloyId89.add($.__views.__alloyId94);
    navWindow ? $.addListener($.__views.__alloyId94, "click", navWindow) : __defers["$.__views.__alloyId94!click!navWindow"] = true;
    $.__views.__alloyId95 = Ti.UI.createImageView({
        mod: "appointment",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_appointment.png",
        id: "__alloyId95"
    });
    $.__views.__alloyId89.add($.__views.__alloyId95);
    navWindow ? $.addListener($.__views.__alloyId95, "click", navWindow) : __defers["$.__views.__alloyId95!click!navWindow"] = true;
    $.__views.__alloyId96 = Ti.UI.createImageView({
        mod: "myMedicalRecord",
        top: "15",
        width: "139",
        image: "/images/btn/btn_my_medical_record.png",
        id: "__alloyId96"
    });
    $.__views.__alloyId89.add($.__views.__alloyId96);
    navWindow ? $.addListener($.__views.__alloyId96, "click", navWindow) : __defers["$.__views.__alloyId96!click!navWindow"] = true;
    $.__views.__alloyId97 = Ti.UI.createImageView({
        mod: "hra",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_hra.png",
        id: "__alloyId97"
    });
    $.__views.__alloyId89.add($.__views.__alloyId97);
    navWindow ? $.addListener($.__views.__alloyId97, "click", navWindow) : __defers["$.__views.__alloyId97!click!navWindow"] = true;
    $.__views.__alloyId98 = Ti.UI.createImageView({
        mod: "profile",
        top: "15",
        width: "139",
        image: "/images/btn/btn_profile.png",
        id: "__alloyId98"
    });
    $.__views.__alloyId89.add($.__views.__alloyId98);
    navWindow ? $.addListener($.__views.__alloyId98, "click", navWindow) : __defers["$.__views.__alloyId98!click!navWindow"] = true;
    $.__views.__alloyId99 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId99"
    });
    $.__views.__alloyId89.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createImageView({
        mod: "notification",
        top: "15",
        left: "15",
        width: "139",
        image: "/images/btn/btn_notification.png",
        id: "__alloyId100"
    });
    $.__views.__alloyId99.add($.__views.__alloyId100);
    navWindow ? $.addListener($.__views.__alloyId100, "click", navWindow) : __defers["$.__views.__alloyId100!click!navWindow"] = true;
    $.__views.notificationIcon = Ti.UI.createView({
        width: "30",
        height: "30",
        borderRadius: "15",
        id: "notificationIcon",
        backgroundColor: "#CE1D1C",
        top: "20",
        right: "15"
    });
    $.__views.__alloyId99.add($.__views.notificationIcon);
    $.__views.notificationText = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        id: "notificationText",
        text: "0"
    });
    $.__views.notificationIcon.add($.__views.notificationText);
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
    Ti.App.addEventListener("updateNotification", updateNotification);
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
    __defers["$.__views.__alloyId90!click!navWindow"] && $.addListener($.__views.__alloyId90, "click", navWindow);
    __defers["$.__views.__alloyId91!click!navWindow"] && $.addListener($.__views.__alloyId91, "click", navWindow);
    __defers["$.__views.__alloyId92!click!navWindow"] && $.addListener($.__views.__alloyId92, "click", navWindow);
    __defers["$.__views.__alloyId93!click!navWindow"] && $.addListener($.__views.__alloyId93, "click", navWindow);
    __defers["$.__views.__alloyId94!click!navWindow"] && $.addListener($.__views.__alloyId94, "click", navWindow);
    __defers["$.__views.__alloyId95!click!navWindow"] && $.addListener($.__views.__alloyId95, "click", navWindow);
    __defers["$.__views.__alloyId96!click!navWindow"] && $.addListener($.__views.__alloyId96, "click", navWindow);
    __defers["$.__views.__alloyId97!click!navWindow"] && $.addListener($.__views.__alloyId97, "click", navWindow);
    __defers["$.__views.__alloyId98!click!navWindow"] && $.addListener($.__views.__alloyId98, "click", navWindow);
    __defers["$.__views.__alloyId100!click!navWindow"] && $.addListener($.__views.__alloyId100, "click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;