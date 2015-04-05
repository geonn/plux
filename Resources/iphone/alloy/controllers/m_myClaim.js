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
        var groups = {};
        for (var i = 0; i < e.data.length; i++) {
            var val = e.data[i];
            groups[val.name] = groups[val.name] || [];
            groups[val.name].push(val);
        }
        Object.keys(groups).map(function(group) {
            var personal_claim_view = Alloy.createController("_person_claim_view", {
                claim_data: groups[group],
                name: group
            }).getView();
            $.main.add(personal_claim_view);
        });
        Ti.UI.removeEventListener("data_loaded", init);
        common.hideLoading();
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
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim Details",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_myClaim"
    });
    $.__views.m_myClaim && $.addTopLevelView($.__views.m_myClaim);
    $.__views.__alloyId160 = Ti.UI.createView({
        id: "__alloyId160"
    });
    $.__views.setting = Ti.UI.createImageView({
        right: "0",
        id: "setting",
        width: "30",
        image: "/images/icon_setting.png"
    });
    $.__views.__alloyId160.add($.__views.setting);
    $.__views.m_myClaim.rightNavButton = $.__views.__alloyId160;
    $.__views.__alloyId161 = Ti.UI.createView({
        id: "__alloyId161"
    });
    $.__views.m_myClaim.add($.__views.__alloyId161);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId161.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId162 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId162"
    });
    $.__views.loadingBar.add($.__views.__alloyId162);
    $.__views.main = Ti.UI.createScrollView({
        backgroundColor: "#ffffff",
        id: "main",
        layout: "vertical"
    });
    $.__views.__alloyId161.add($.__views.main);
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
    $.__views.__alloyId163 = Ti.UI.createView({
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId163"
    });
    $.__views.main.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createView({
        borderColor: "#000000",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "__alloyId164"
    });
    $.__views.__alloyId163.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createView({
        backgroundColor: "#CE1D1C",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId165"
    });
    $.__views.__alloyId164.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createLabel({
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
        text: "Claims Balance",
        color: "#ffffff",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    $.__views.__alloyId167 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId167"
    });
    $.__views.__alloyId164.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        left: 10,
        right: 10,
        text: "KHAIRIL AZMY BIN MOHD AMINUDDIN",
        wordWrap: "false",
        ellipsize: "true",
        id: "__alloyId168"
    });
    $.__views.__alloyId164.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId169"
    });
    $.__views.__alloyId164.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId170"
    });
    $.__views.__alloyId169.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM1000",
        id: "__alloyId171"
    });
    $.__views.__alloyId169.add($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId172"
    });
    $.__views.__alloyId164.add($.__views.__alloyId172);
    $.__views.__alloyId173 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "DENTAL",
        id: "__alloyId173"
    });
    $.__views.__alloyId172.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId174"
    });
    $.__views.__alloyId172.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createView({
        backgroundColor: "#CE1D1C",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId175"
    });
    $.__views.__alloyId164.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createLabel({
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
        text: "Claims Shared Balance",
        color: "#ffffff",
        id: "__alloyId176"
    });
    $.__views.__alloyId175.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId177"
    });
    $.__views.__alloyId164.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        left: 10,
        right: 10,
        text: "ELEESYA SOFE",
        wordWrap: "false",
        ellipsize: "true",
        id: "__alloyId178"
    });
    $.__views.__alloyId164.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId179"
    });
    $.__views.__alloyId164.add($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId180"
    });
    $.__views.__alloyId179.add($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId181"
    });
    $.__views.__alloyId179.add($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId182"
    });
    $.__views.__alloyId164.add($.__views.__alloyId182);
    $.__views.__alloyId183 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        left: 10,
        right: 10,
        text: "MUHAMMAD IMRAN",
        wordWrap: "false",
        ellipsize: "true",
        id: "__alloyId183"
    });
    $.__views.__alloyId164.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId184"
    });
    $.__views.__alloyId164.add($.__views.__alloyId184);
    $.__views.__alloyId185 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId185"
    });
    $.__views.__alloyId184.add($.__views.__alloyId185);
    $.__views.__alloyId186 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId186"
    });
    $.__views.__alloyId184.add($.__views.__alloyId186);
    $.__views.__alloyId187 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId187"
    });
    $.__views.__alloyId164.add($.__views.__alloyId187);
    $.__views.__alloyId188 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "12dp"
        },
        left: 10,
        right: 10,
        text: "ZETI AZRI ZAMBAHARI",
        wordWrap: "false",
        ellipsize: "true",
        id: "__alloyId188"
    });
    $.__views.__alloyId164.add($.__views.__alloyId188);
    $.__views.__alloyId189 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId189"
    });
    $.__views.__alloyId164.add($.__views.__alloyId189);
    $.__views.__alloyId190 = Ti.UI.createLabel({
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
        id: "__alloyId190"
    });
    $.__views.__alloyId189.add($.__views.__alloyId190);
    $.__views.__alloyId191 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        bottom: 5,
        top: 5,
        color: "#ff0000",
        right: 10,
        text: "RM500",
        id: "__alloyId191"
    });
    $.__views.__alloyId189.add($.__views.__alloyId191);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var usersModel = Alloy.createCollection("users");
    var user = usersModel.getOwnerData();
    API.claimInfo({
        memno: user.icno,
        corpcode: user.corpcode
    });
    common.construct($);
    common.showLoading();
    Ti.UI.addEventListener("data_loaded", init);
    $.setting.addEventListener("click", function() {
        var nav = require("navigation");
        nav.navigationWindow("m_ClaimHistory");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;