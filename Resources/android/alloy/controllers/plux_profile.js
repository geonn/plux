function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function render_profile() {
        $.profileData.add(Alloy.createController("_plux_profile_view", {
            profile_data: data
        }).getView());
    }
    function refresh() {
        loading.start();
        var checker = Alloy.createCollection("updateChecker");
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        var isUpdate = checker.getCheckerById(15, u_id);
        var last_updated = isUpdate.updated || "";
        last_update = last_updated;
        API.callByPost({
            url: "getPersonalInfoRecords",
            params: {
                u_id: u_id,
                last_updated: last_update
            }
        }, function(responseText) {
            var model = Alloy.createCollection("personal_info");
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            model.saveArray(arr);
            checker.updateModule(15, "getPersonalInfoRecords", res.last_updated, u_id);
            render_profile();
            loading.finish();
        });
    }
    function init() {
        $.plux_profile.add(loading.getView());
        refresh();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "plux_profile";
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
    $.__views.plux_profile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "PLUX Profile",
        id: "plux_profile",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.plux_profile && $.addTopLevelView($.__views.plux_profile);
    $.__views.__alloyId212 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId212"
    });
    $.__views.plux_profile.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId213"
    });
    $.__views.__alloyId212.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId214"
    });
    $.__views.__alloyId213.add($.__views.__alloyId214);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId214.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
    $.__views.__alloyId213.add($.__views.pageTitle);
    $.__views.__alloyId215 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "PLUX Profile",
        textAlign: "center",
        id: "__alloyId215"
    });
    $.__views.pageTitle.add($.__views.__alloyId215);
    $.__views.profileData = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "profileData",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId212.add($.__views.profileData);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users_plux");
    var u_id = Ti.App.Properties.getString("u_id");
    var data = usersModel.getUserById(u_id);
    var loading = Alloy.createController("loading");
    init();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.plux_profile);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;