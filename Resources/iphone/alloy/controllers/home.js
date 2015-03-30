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
        "m_eCard" == e.source.mod || "m_myClaim" == e.source.mod ? nav.navigationWindow(target, 1) : nav.navigationWindow(target);
    }
    function logoutUser() {
        Ti.App.Properties.setString("memno", "");
        refreshHeaderInfo();
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
    $.__views.__alloyId176 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId176"
    });
    $.__views.main.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createView({
        layout: "",
        id: "__alloyId177"
    });
    $.__views.main.add($.__views.__alloyId177);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        width: "100",
        height: "100",
        top: "10",
        left: "10",
        image: "/appicon-60@3x.png",
        zIndex: "5"
    });
    $.__views.__alloyId177.add($.__views.logo);
    $.__views.myinfo_view = Ti.UI.createView({
        zIndex: "4",
        id: "myinfo_view",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        top: "20",
        backgroundColor: "rgba(0,0,0,0.5)"
    });
    $.__views.__alloyId177.add($.__views.myinfo_view);
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
    $.__views.__alloyId177.add($.__views.scrollboard);
    $.__views.__alloyId178 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "239",
        id: "__alloyId178"
    });
    $.__views.scrollboard.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createImageView({
        mod: "m_eCard",
        top: "15",
        width: "139",
        image: "/btn/btn_asp_e_card_pass.png",
        id: "__alloyId179"
    });
    $.__views.__alloyId178.add($.__views.__alloyId179);
    navWindow ? $.__views.__alloyId179.addEventListener("click", navWindow) : __defers["$.__views.__alloyId179!click!navWindow"] = true;
    $.__views.__alloyId180 = Ti.UI.createImageView({
        mod: "m_myHealth",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_my_health.png",
        id: "__alloyId180"
    });
    $.__views.__alloyId178.add($.__views.__alloyId180);
    navWindow ? $.__views.__alloyId180.addEventListener("click", navWindow) : __defers["$.__views.__alloyId180!click!navWindow"] = true;
    $.__views.__alloyId181 = Ti.UI.createImageView({
        mod: "m_myClaim",
        top: "15",
        width: "139",
        image: "/btn/btn_my_claim_detail.png",
        id: "__alloyId181"
    });
    $.__views.__alloyId178.add($.__views.__alloyId181);
    navWindow ? $.__views.__alloyId181.addEventListener("click", navWindow) : __defers["$.__views.__alloyId181!click!navWindow"] = true;
    $.__views.__alloyId182 = Ti.UI.createImageView({
        mod: "clinicState",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_clinic_location.png",
        id: "__alloyId182"
    });
    $.__views.__alloyId178.add($.__views.__alloyId182);
    navWindow ? $.__views.__alloyId182.addEventListener("click", navWindow) : __defers["$.__views.__alloyId182!click!navWindow"] = true;
    $.__views.__alloyId183 = Ti.UI.createImageView({
        mod: "healthInfo",
        top: "15",
        width: "139",
        image: "/btn/btn_healthInfo.png",
        id: "__alloyId183"
    });
    $.__views.__alloyId178.add($.__views.__alloyId183);
    navWindow ? $.__views.__alloyId183.addEventListener("click", navWindow) : __defers["$.__views.__alloyId183!click!navWindow"] = true;
    $.__views.__alloyId184 = Ti.UI.createImageView({
        mod: "leaflet",
        left: "15",
        top: "15",
        width: "139",
        image: "/btn/btn_leaflet.png",
        id: "__alloyId184"
    });
    $.__views.__alloyId178.add($.__views.__alloyId184);
    navWindow ? $.__views.__alloyId184.addEventListener("click", navWindow) : __defers["$.__views.__alloyId184!click!navWindow"] = true;
    $.__views.__alloyId185 = Ti.UI.createImageView({
        mod: "m_myMedical",
        top: "15",
        width: "139",
        image: "/btn/btn_my_medical_record.png",
        id: "__alloyId185"
    });
    $.__views.__alloyId178.add($.__views.__alloyId185);
    navWindow ? $.__views.__alloyId185.addEventListener("click", navWindow) : __defers["$.__views.__alloyId185!click!navWindow"] = true;
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
    __defers["$.__views.__alloyId179!click!navWindow"] && $.__views.__alloyId179.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId180!click!navWindow"] && $.__views.__alloyId180.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId181!click!navWindow"] && $.__views.__alloyId181.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId182!click!navWindow"] && $.__views.__alloyId182.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId183!click!navWindow"] && $.__views.__alloyId183.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId184!click!navWindow"] && $.__views.__alloyId184.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId185!click!navWindow"] && $.__views.__alloyId185.addEventListener("click", navWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;