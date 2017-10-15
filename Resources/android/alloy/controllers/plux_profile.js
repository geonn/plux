function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function render_profile(arr) {
        console.log("e");
        $.profileData.add(Alloy.createController("_plux_profile_view", {
            records: arr
        }).getView());
    }
    function refresh() {
        loading.start();
        console.log("a");
        var u_id = Ti.App.Properties.getString("u_id") || 0;
        API.callByPost({
            url: "getPersonalInfoRecords",
            params: {
                u_id: u_id
            }
        }, function(responseText) {
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            console.log("d");
            render_profile(arr);
            loading.finish();
        });
    }
    function init() {
        $.plux_profile.add(loading.getView());
        console.log("a");
        refresh();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "plux_profile";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.plux_profile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "PLUX Profile",
        id: "plux_profile",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.plux_profile && $.addTopLevelView($.__views.plux_profile);
    $.__views.__alloyId241 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId241"
    });
    $.__views.plux_profile.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId242"
    });
    $.__views.__alloyId241.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId243"
    });
    $.__views.__alloyId242.add($.__views.__alloyId243);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId243.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
    $.__views.__alloyId242.add($.__views.pageTitle);
    $.__views.__alloyId244 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "PLUX Profile",
        textAlign: "center",
        id: "__alloyId244"
    });
    $.__views.pageTitle.add($.__views.__alloyId244);
    $.__views.profileData = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "profileData",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId241.add($.__views.profileData);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.App.Properties.getString("u_id");
    var loading = Alloy.createController("loading");
    console.log("a");
    init();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.plux_profile);
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;