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
    $.__views.__alloyId236 = Ti.UI.createView({
        id: "__alloyId236"
    });
    $.__views.setting = Ti.UI.createImageView({
        right: "0",
        id: "setting",
        width: "30",
        image: "/images/icon_setting.png"
    });
    $.__views.__alloyId236.add($.__views.setting);
    $.__views.m_myClaim.rightNavButton = $.__views.__alloyId236;
    $.__views.main = Ti.UI.createScrollView({
        backgroundColor: "#ffffff",
        id: "main",
        layout: "vertical"
    });
    $.__views.m_myClaim.add($.__views.main);
    $.__views.date = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        color: "#ff0000",
        top: "10dp",
        id: "date"
    });
    $.__views.main.add($.__views.date);
    $.__views.__alloyId237 = Ti.UI.createView({
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId237"
    });
    $.__views.main.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createView({
        borderColor: "#000000",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId238"
    });
    $.__views.__alloyId237.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: 20
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        text: "Entitlement Balance",
        id: "__alloyId239"
    });
    $.__views.__alloyId238.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId240"
    });
    $.__views.__alloyId238.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId241"
    });
    $.__views.__alloyId238.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        top: 10,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId242"
    });
    $.__views.__alloyId241.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        color: "#ff0000",
        right: 10,
        text: "RM1000",
        id: "__alloyId243"
    });
    $.__views.__alloyId241.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId244"
    });
    $.__views.__alloyId238.add($.__views.__alloyId244);
    $.__views.__alloyId245 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        top: 10,
        left: 10,
        text: "DENTAL",
        id: "__alloyId245"
    });
    $.__views.__alloyId244.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        top: 10,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId246"
    });
    $.__views.__alloyId244.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createView({
        height: "10",
        id: "__alloyId247"
    });
    $.__views.__alloyId238.add($.__views.__alloyId247);
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