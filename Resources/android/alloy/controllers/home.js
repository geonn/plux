function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadingViewFinish() {
        console.log("anyone call you?");
        $.win.open();
        init();
        loadingView = null;
    }
    function init() {
        var AppVersionControl = require("AppVersionControl");
        AppVersionControl.checkAndUpdate();
        checkMyHealthData();
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
    function checkMyHealthData() {
        var u_id = Ti.App.Properties.getString("u_id") || "";
        var checker = Alloy.createCollection("updateChecker");
        var isUpdate = checker.getCheckerById("14", u_id);
        var last_updated = "";
        "" != isUpdate && (last_updated = isUpdate.updated);
        API.callByPost({
            url: "getHealthDataByUser",
            params: {
                u_id: u_id,
                last_updated: last_updated
            }
        }, function(responseText) {
            var model2 = Alloy.createCollection("health");
            var res2 = JSON.parse(responseText);
            console.log(res2);
            var arr2 = res2.data || null;
            model2.saveArray(arr2);
            checker.updateModule(14, "getHealthDataByUser", res2.last_updated, u_id);
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
            var welcomeText = "undefined" != plux_user.fullname ? "Welcome, " + plux_user.fullname : "Welcome";
            var welcomeTitle = $.UI.create("Label", {
                text: welcomeText,
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
        "eCard" == e.source.mod || "eCard_list" == e.source.mod || "myClaim" == e.source.mod || "claimSubmission" == e.source.mod || "notification" == e.source.mod ? nav.navigationWindow("asp/" + target, 1) : "myHealth" == e.source.mod ? nav.navigationWindow(target + "/main") : "clinicLocator" == e.source.mod ? nav.navigateWithArgs("clinic/listing", 1) : "conversation" == e.source.mod ? nav.navigationWindow(target, 1) : nav.navigationWindow(target);
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
    $.__views.socket = Ti.UI.createWebView({
        width: Ti.UI.FILL,
        zIndex: 100,
        url: "/html/socket.html",
        id: "socket",
        height: 0
    });
    $.__views.win.add($.__views.socket);
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
    $.__views.__alloyId148 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId148"
    });
    $.__views.main.add($.__views.__alloyId148);
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
    $.__views.__alloyId148.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: 4,
        id: "myinfo_view",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 20,
        backgroundColor: "#B3000000"
    });
    $.__views.__alloyId148.add($.__views.myinfo_view);
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
    $.__views.__alloyId148.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId149 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
        id: "__alloyId149"
    });
    $.__views.loadingBar.add($.__views.__alloyId149);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: 3
    });
    $.__views.__alloyId148.add($.__views.scrollboard);
    $.__views.__alloyId150 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.SIZE,
        top: 239,
        id: "__alloyId150"
    });
    $.__views.scrollboard.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createImageView({
        mod: "profile",
        top: 15,
        width: 139,
        image: "/images/btn/btn_profile.png",
        id: "__alloyId151"
    });
    $.__views.__alloyId150.add($.__views.__alloyId151);
    navWindow ? $.addListener($.__views.__alloyId151, "click", navWindow) : __defers["$.__views.__alloyId151!click!navWindow"] = true;
    $.__views.__alloyId152 = Ti.UI.createImageView({
        mod: "myHealth",
        left: 15,
        top: 15,
        width: 139,
        image: "/images/btn/btn_my_health.png",
        id: "__alloyId152"
    });
    $.__views.__alloyId150.add($.__views.__alloyId152);
    navWindow ? $.addListener($.__views.__alloyId152, "click", navWindow) : __defers["$.__views.__alloyId152!click!navWindow"] = true;
    $.__views.__alloyId153 = Ti.UI.createImageView({
        mod: "myClaim",
        top: 15,
        width: 139,
        image: "/images/btn/btn_my_claim_detail.png",
        id: "__alloyId153"
    });
    $.__views.__alloyId150.add($.__views.__alloyId153);
    navWindow ? $.addListener($.__views.__alloyId153, "click", navWindow) : __defers["$.__views.__alloyId153!click!navWindow"] = true;
    $.__views.__alloyId154 = Ti.UI.createImageView({
        mod: "claimSubmission",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_claim_submission.png",
        id: "__alloyId154"
    });
    $.__views.__alloyId150.add($.__views.__alloyId154);
    navWindow ? $.addListener($.__views.__alloyId154, "click", navWindow) : __defers["$.__views.__alloyId154!click!navWindow"] = true;
    $.__views.__alloyId155 = Ti.UI.createImageView({
        mod: "conversation",
        top: 15,
        width: 139,
        image: "/images/btn/btn_ask_me.png",
        id: "__alloyId155"
    });
    $.__views.__alloyId150.add($.__views.__alloyId155);
    navWindow ? $.addListener($.__views.__alloyId155, "click", navWindow) : __defers["$.__views.__alloyId155!click!navWindow"] = true;
    $.__views.__alloyId156 = Ti.UI.createImageView({
        mod: "hra",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_hra.png",
        id: "__alloyId156"
    });
    $.__views.__alloyId150.add($.__views.__alloyId156);
    navWindow ? $.addListener($.__views.__alloyId156, "click", navWindow) : __defers["$.__views.__alloyId156!click!navWindow"] = true;
    $.__views.__alloyId157 = Ti.UI.createImageView({
        mod: "myMedicalRecord",
        top: 15,
        width: 139,
        image: "/images/btn/btn_my_medical_record.png",
        id: "__alloyId157"
    });
    $.__views.__alloyId150.add($.__views.__alloyId157);
    navWindow ? $.addListener($.__views.__alloyId157, "click", navWindow) : __defers["$.__views.__alloyId157!click!navWindow"] = true;
    $.__views.__alloyId158 = Ti.UI.createImageView({
        mod: "feedback",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_feedback.png",
        id: "__alloyId158"
    });
    $.__views.__alloyId150.add($.__views.__alloyId158);
    navWindow ? $.addListener($.__views.__alloyId158, "click", navWindow) : __defers["$.__views.__alloyId158!click!navWindow"] = true;
    $.__views.__alloyId159 = Ti.UI.createImageView({
        mod: "clinicLocator",
        top: 15,
        width: 139,
        image: "/images/btn/btn_clinic_location.png",
        id: "__alloyId159"
    });
    $.__views.__alloyId150.add($.__views.__alloyId159);
    navWindow ? $.addListener($.__views.__alloyId159, "click", navWindow) : __defers["$.__views.__alloyId159!click!navWindow"] = true;
    $.__views.__alloyId160 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId160"
    });
    $.__views.__alloyId150.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createImageView({
        mod: "notification",
        top: 15,
        left: 15,
        width: 139,
        image: "/images/btn/btn_notification.png",
        id: "__alloyId161"
    });
    $.__views.__alloyId160.add($.__views.__alloyId161);
    navWindow ? $.addListener($.__views.__alloyId161, "click", navWindow) : __defers["$.__views.__alloyId161!click!navWindow"] = true;
    $.__views.notificationIcon = Ti.UI.createView({
        width: 30,
        height: 30,
        borderRadius: 15,
        id: "notificationIcon",
        backgroundColor: "#CE1D1C",
        top: 20,
        right: 15
    });
    $.__views.__alloyId160.add($.__views.notificationIcon);
    $.__views.notificationText = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        id: "notificationText",
        text: 0
    });
    $.__views.notificationIcon.add($.__views.notificationText);
    $.__views.__alloyId162 = Ti.UI.createImageView({
        mod: "appointment",
        top: 15,
        width: 139,
        image: "/images/btn/btn_appointment.png",
        id: "__alloyId162"
    });
    $.__views.__alloyId150.add($.__views.__alloyId162);
    navWindow ? $.addListener($.__views.__alloyId162, "click", navWindow) : __defers["$.__views.__alloyId162!click!navWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var loading = Alloy.createController("loading");
    var usersPluxModel = Alloy.createCollection("users_plux");
    var notificationModel = Alloy.createCollection("notification");
    common.construct($);
    PUSH.registerPush();
    var loadingView = Alloy.createController("loader");
    loadingView.getView().open();
    loadingView.start();
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
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("updateNotification", updateNotification);
        Ti.App.removeEventListener("updateHeader", refreshHeaderInfo);
        Ti.App.removeEventListener("app:loadingViewFinish", loadingViewFinish);
        $.destroy();
        console.log("window close");
    });
    Ti.App.addEventListener("app:loadingViewFinish", loadingViewFinish);
    Ti.App.addEventListener("updateNotification", updateNotification);
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
    __defers["$.__views.__alloyId151!click!navWindow"] && $.addListener($.__views.__alloyId151, "click", navWindow);
    __defers["$.__views.__alloyId152!click!navWindow"] && $.addListener($.__views.__alloyId152, "click", navWindow);
    __defers["$.__views.__alloyId153!click!navWindow"] && $.addListener($.__views.__alloyId153, "click", navWindow);
    __defers["$.__views.__alloyId154!click!navWindow"] && $.addListener($.__views.__alloyId154, "click", navWindow);
    __defers["$.__views.__alloyId155!click!navWindow"] && $.addListener($.__views.__alloyId155, "click", navWindow);
    __defers["$.__views.__alloyId156!click!navWindow"] && $.addListener($.__views.__alloyId156, "click", navWindow);
    __defers["$.__views.__alloyId157!click!navWindow"] && $.addListener($.__views.__alloyId157, "click", navWindow);
    __defers["$.__views.__alloyId158!click!navWindow"] && $.addListener($.__views.__alloyId158, "click", navWindow);
    __defers["$.__views.__alloyId159!click!navWindow"] && $.addListener($.__views.__alloyId159, "click", navWindow);
    __defers["$.__views.__alloyId161!click!navWindow"] && $.addListener($.__views.__alloyId161, "click", navWindow);
    __defers["$.__views.__alloyId162!click!navWindow"] && $.addListener($.__views.__alloyId162, "click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;