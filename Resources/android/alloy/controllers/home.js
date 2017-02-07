function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadHomePageItem() {
        menu_info = new_menu = [ {
            mod: "feedback",
            image: "/images/btn/btn_feedback.png"
        }, {
            mod: "clinicLocator",
            image: "/images/btn/btn_clinic_location.png"
        }, {
            mod: "hra",
            image: "/images/btn/btn_hra.png"
        }, {
            mod: "myMedicalRecord",
            image: "/images/btn/btn_my_medical_record.png"
        }, {
            mod: "conversation",
            image: "/images/btn/btn_ask_me.png"
        }, {
            mod: "profile",
            image: "/images/btn/btn_profile.png"
        }, {
            mod: "claimSubmission",
            image: "/images/btn/btn_claim_submission.png"
        }, {
            mod: "myClaim",
            image: "/images/btn/btn_my_claim_detail.png"
        }, {
            mod: "myHealth",
            image: "/images/btn/btn_my_health.png"
        }, {
            mod: "eCard_list",
            image: "/images/btn/btn_asp_e_card_pass.png"
        } ];
        console.log(menu_info.length + " loadHomePageItem");
    }
    function loadingViewFinish() {
        $.win.open();
        console.log("loadingViewFinish");
        loadingView.finish(function() {});
        init();
    }
    function checkserviceByCorpcode() {
        var corpcode = Ti.App.Properties.getString("corpcode");
        new_menu = menu_info;
        console.log(menu_info.length);
        console.log(new_menu.length + " new_menu checkserviceByCorpcode");
        if ("null" != corpcode) {
            console.log(corpcode + " corpcode");
            API.callByPost({
                url: "getCorpPermission",
                params: {
                    corpcode: corpcode
                }
            }, function(responseText) {
                var res = JSON.parse(responseText);
                if ("success" == res.status) {
                    var takeout = res.data;
                    for (var i = 0; i < takeout.length; i++) {
                        var index = findIndexInData(new_menu, "mod", takeout[i]);
                        index >= 0 && new_menu.splice(index, 1);
                    }
                }
                render_menu();
            });
        } else render_menu();
    }
    function findIndexInData(data, property, value) {
        var result = -1;
        data.some(function(item, i) {
            if (item[property] === value) {
                result = i;
                return true;
            }
        });
        return result;
    }
    function render_menu() {
        var button_width = 139;
        console.log(new_menu.length + " new_menu number");
        removeAllChildren($.scrollboard);
        for (var i = 0; i < new_menu.length; i++) {
            var topR = 10;
            (i == new_menu.length - 1 || i == new_menu.length - 2) && (topR = 239);
            var imageView_menu = $.UI.create("ImageView", {
                mod: new_menu[i].mod,
                width: button_width,
                left: 5,
                top: topR,
                image: new_menu[i].image
            });
            var view = $.UI.create("View", {
                classes: [ "wsize", "hsize" ]
            });
            if ("conversation" == new_menu[i].mod) {
                var model = Alloy.createCollection("helpline");
                var total = model.getUnread();
                console.log(total + " total unread");
                var view_notification = $.UI.create("View", {
                    top: 20,
                    right: 15,
                    borderRadius: 15,
                    backgroundColor: "#CE1D1C",
                    width: 30,
                    height: 30
                });
                var label_notification = $.UI.create("Label", {
                    text: total,
                    color: "#ffffff"
                });
                view_notification.add(label_notification);
                view.add(imageView_menu);
                view.add(view_notification);
            } else view.add(imageView_menu);
            imageView_menu.addEventListener("click", navWindow);
            $.scrollboard.insertAt({
                view: view,
                position: 0
            });
        }
    }
    function init() {
        console.log("init start");
        $.win.add(loading.getView());
        loading.start();
        loadHomePageItem();
        checkserviceByCorpcode();
        var AppVersionControl = require("AppVersionControl");
        AppVersionControl.checkAndUpdate();
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
        console.log("syncFromServer");
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
                            detail: entry.detail || "",
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
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        var isUpdate = checker.getCheckerById(7, u_id);
        var last_updated = isUpdate.updated || "";
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        API.callByPost({
            url: "getHelplineMessageV2",
            params: {
                u_id: u_id,
                last_updated: last_updated
            }
        }, function(responseText) {
            var model = Alloy.createCollection("helpline");
            var res = JSON.parse(responseText);
            var arr = res.data || void 0;
            model.saveArray(arr);
            checker.updateModule("7", "notificationList", res.last_updated, u_id);
            render_menu();
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
        var isCorpCode = Ti.App.Properties.getString("corpcode");
        removeAllChildren($.scrollboard);
        loadHomePageItem();
        new_menu = menu_info;
        render_menu();
        if ("" == isCorpCode || "null" == isCorpCode || null == isCorpCode) {
            Ti.App.Properties.setString("u_id", "");
            FACEBOOK.logout();
            var win = Alloy.createController("login").getView();
            win.open();
            console.log("window sudah close");
            $.win.close();
            return;
        }
        Ti.App.Properties.removeProperty("memno");
        Ti.App.Properties.removeProperty("empno");
        Ti.App.Properties.removeProperty("corpcode");
        Ti.App.Properties.removeProperty("asp_email");
        Ti.App.Properties.removeProperty("asp_password");
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
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
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
    $.__views.__alloyId155 = Ti.UI.createView({
        width: Ti.UI.FILL,
        id: "__alloyId155"
    });
    $.__views.main.add($.__views.__alloyId155);
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
    $.__views.__alloyId155.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: 4,
        id: "myinfo_view",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 20,
        backgroundColor: "#B3000000"
    });
    $.__views.__alloyId155.add($.__views.myinfo_view);
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
    $.__views.__alloyId155.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId156 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
        id: "__alloyId156"
    });
    $.__views.loadingBar.add($.__views.__alloyId156);
    $.__views.scrollboard1 = Ti.UI.createScrollView({
        layout: "horizontal",
        id: "scrollboard1",
        width: 293,
        contentWidth: 293,
        height: Ti.UI.FILL,
        zIndex: 3
    });
    $.__views.__alloyId155.add($.__views.scrollboard1);
    $.__views.scrollboard = Ti.UI.createView({
        layout: "horizontal",
        id: "scrollboard",
        height: Ti.UI.SIZE,
        zIndex: 3
    });
    $.__views.scrollboard1.add($.__views.scrollboard);
    $.__views.__alloyId157 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId157"
    });
    $.__views.scrollboard1.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createImageView({
        mod: "notification",
        top: 15,
        width: 139,
        image: "/images/btn/btn_notification.png",
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    navWindow ? $.addListener($.__views.__alloyId158, "click", navWindow) : __defers["$.__views.__alloyId158!click!navWindow"] = true;
    $.__views.notificationIcon = Ti.UI.createView({
        width: 30,
        height: 30,
        borderRadius: 15,
        id: "notificationIcon",
        backgroundColor: "#CE1D1C",
        top: 20,
        right: 15
    });
    $.__views.__alloyId157.add($.__views.notificationIcon);
    $.__views.notificationText = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        id: "notificationText",
        text: 0
    });
    $.__views.notificationIcon.add($.__views.notificationText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var loading = Alloy.createController("loading");
    var usersPluxModel = Alloy.createCollection("users_plux");
    var notificationModel = Alloy.createCollection("notification");
    var menu_info;
    var new_menu = [];
    common.construct($);
    PUSH.registerPush();
    console.log("start loader lo");
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
    Ti.Android.currentActivity.onResume = syncFromServer;
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("resumed", syncFromServer);
        Ti.App.removeEventListener("updateNotification", updateNotification);
        Ti.App.removeEventListener("render_menu", render_menu);
        Ti.App.removeEventListener("updateHeader", refreshHeaderInfo);
        Ti.App.removeEventListener("updateMenu", checkserviceByCorpcode);
        Ti.App.removeEventListener("app:loadingViewFinish", loadingViewFinish);
        $.destroy();
    });
    Ti.App.addEventListener("render_menu", render_menu);
    Ti.App.addEventListener("resumed", syncFromServer);
    Ti.App.addEventListener("app:loadingViewFinish", loadingViewFinish);
    Ti.App.addEventListener("updateNotification", updateNotification);
    Ti.App.addEventListener("updateMenu", checkserviceByCorpcode);
    Ti.App.addEventListener("updateHeader", refreshHeaderInfo);
    __defers["$.__views.__alloyId158!click!navWindow"] && $.addListener($.__views.__alloyId158, "click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;