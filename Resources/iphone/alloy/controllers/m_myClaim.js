function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init(e) {
        $.date.text = timeFormat(currentDateTime());
        console.log(e.data.length);
        var groups = {};
        for (var i = 0; i < e.data.length; i++) {
            var val = e.data[i];
            groups[val.name] = groups[val.name] || [];
            groups[val.name].push(val);
        }
        Object.keys(groups).map(function(group) {
            console.log(groups[group]);
            console.log(group + "next");
            var personal_claim_view = Alloy.createController("_person_claim_view", {
                claim_data: groups[group],
                name: group
            }).getView();
            $.main.add(personal_claim_view);
        });
        Ti.UI.removeEventListener("data_loaded", init);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "m_myClaim";
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
    $.__views.m_myClaim = Ti.UI.createWindow({
        fullscreen: true,
        title: "My Claim Details",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myClaim"
    });
    $.__views.m_myClaim && $.addTopLevelView($.__views.m_myClaim);
    $.__views.__alloyId234 = Ti.UI.createView({
        id: "__alloyId234"
    });
    $.__views.setting = Ti.UI.createImageView({
        right: "0",
        id: "setting",
        width: "30",
        image: "/images/icon_setting.png"
    });
    $.__views.__alloyId234.add($.__views.setting);
    $.__views.m_myClaim.rightNavButton = $.__views.__alloyId234;
    $.__views.main = Ti.UI.createScrollView({
        backgroundColor: "#ffffff",
        id: "main",
        layout: "vertical"
    });
    $.__views.m_myClaim.add($.__views.main);
    $.__views.date = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ff0000",
        font: {
            fontSize: "16dp"
        },
        top: "10dp",
        id: "date"
    });
    $.__views.main.add($.__views.date);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    require("login");
    var method = require("myClaim");
    method.API_ClaimInfo("AGIL00005", "C001");
    Ti.UI.addEventListener("data_loaded", init);
    $.setting.addEventListener("click", function() {
        var nav = require("navigation");
        nav.navigationWindow("m_ClaimHistory");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;