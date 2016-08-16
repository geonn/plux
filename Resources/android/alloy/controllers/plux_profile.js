function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
<<<<<<< HEAD
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
=======
>>>>>>> origin/master
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
        title: "PLUX Profile",
        id: "plux_profile",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.plux_profile && $.addTopLevelView($.__views.plux_profile);
<<<<<<< HEAD
    $.__views.__alloyId207 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId207"
    });
    $.__views.plux_profile.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createView({
=======
    $.__views.__alloyId195 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId195"
    });
    $.__views.plux_profile.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId208"
    });
    $.__views.__alloyId207.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId209"
    });
    $.__views.__alloyId208.add($.__views.__alloyId209);
=======
        id: "__alloyId196"
    });
    $.__views.__alloyId195.add($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId197"
    });
    $.__views.__alloyId196.add($.__views.__alloyId197);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId209.add($.__views.btnBack);
=======
    $.__views.__alloyId197.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
<<<<<<< HEAD
    $.__views.__alloyId208.add($.__views.pageTitle);
    $.__views.__alloyId210 = Ti.UI.createLabel({
=======
    $.__views.__alloyId196.add($.__views.pageTitle);
    $.__views.__alloyId198 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "PLUX Profile",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId210"
    });
    $.__views.pageTitle.add($.__views.__alloyId210);
    $.__views.profileData = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "profileData",
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId207.add($.__views.profileData);
=======
        id: "__alloyId198"
    });
    $.__views.pageTitle.add($.__views.__alloyId198);
    $.__views.profileData = Ti.UI.createScrollView({
        id: "profileData",
        height: Ti.UI.FILL,
        backgroundColor: "#ffffff"
    });
    $.__views.__alloyId195.add($.__views.profileData);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users_plux");
    var u_id = Ti.App.Properties.getString("u_id");
    var data = usersModel.getUserById(u_id);
<<<<<<< HEAD
    var loading = Alloy.createController("loading");
    init();
=======
    var healthModel = Alloy.createCollection("personalInfo");
    data["personal_health"] = healthModel.getOwnerData();
    $.profileData.add(Alloy.createController("_plux_profile_view", {
        profile_data: data
    }).getView());
>>>>>>> origin/master
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.plux_profile);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;