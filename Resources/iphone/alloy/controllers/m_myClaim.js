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
<<<<<<< HEAD
    $.__views.__alloyId258 = Ti.UI.createView({
        id: "__alloyId258"
=======
    $.__views.__alloyId164 = Ti.UI.createView({
        id: "__alloyId164"
>>>>>>> origin/master
    });
    $.__views.setting = Ti.UI.createImageView({
        right: "0",
        id: "setting",
        width: "30",
        image: "/images/icon_setting.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId258.add($.__views.setting);
    $.__views.m_myClaim.rightNavButton = $.__views.__alloyId258;
    $.__views.__alloyId259 = Ti.UI.createView({
        id: "__alloyId259"
    });
    $.__views.m_myClaim.add($.__views.__alloyId259);
=======
    $.__views.__alloyId164.add($.__views.setting);
    $.__views.m_myClaim.rightNavButton = $.__views.__alloyId164;
    $.__views.__alloyId165 = Ti.UI.createView({
        id: "__alloyId165"
    });
    $.__views.m_myClaim.add($.__views.__alloyId165);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.__alloyId259.add($.__views.loadingBar);
=======
    $.__views.__alloyId165.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        style: Alloy.Globals.topbarTop,
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId260 = Ti.UI.createLabel({
=======
    $.__views.__alloyId166 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId260"
    });
    $.__views.loadingBar.add($.__views.__alloyId260);
=======
        id: "__alloyId166"
    });
    $.__views.loadingBar.add($.__views.__alloyId166);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        backgroundColor: "#ffffff",
        id: "main",
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId259.add($.__views.main);
=======
    $.__views.__alloyId165.add($.__views.main);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId261 = Ti.UI.createView({
=======
    $.__views.__alloyId167 = Ti.UI.createView({
>>>>>>> origin/master
        left: "10",
        right: "10",
        top: "10",
        bottom: "10",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId261"
    });
    $.__views.main.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createView({
=======
        id: "__alloyId167"
    });
    $.__views.main.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createView({
>>>>>>> origin/master
        borderColor: "#000000",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
<<<<<<< HEAD
        id: "__alloyId262"
=======
        id: "__alloyId168"
>>>>>>> origin/master
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createView({
        backgroundColor: "#ff0000",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId169"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId264"
=======
        id: "__alloyId170"
>>>>>>> origin/master
    });
    $.__views.__alloyId169.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId171"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId266"
=======
        id: "__alloyId172"
>>>>>>> origin/master
    });
    $.__views.__alloyId168.add($.__views.__alloyId172);
    $.__views.__alloyId173 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId173"
    });
    $.__views.__alloyId168.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId174"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId268);
    $.__views.__alloyId269 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
<<<<<<< HEAD
        id: "__alloyId269"
    });
    $.__views.__alloyId268.add($.__views.__alloyId269);
    $.__views.__alloyId270 = Ti.UI.createLabel({
=======
        id: "__alloyId175"
    });
    $.__views.__alloyId174.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId270"
=======
        id: "__alloyId176"
>>>>>>> origin/master
    });
    $.__views.__alloyId174.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId177"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId271);
    $.__views.__alloyId272 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "DENTAL",
<<<<<<< HEAD
        id: "__alloyId272"
    });
    $.__views.__alloyId271.add($.__views.__alloyId272);
    $.__views.__alloyId273 = Ti.UI.createLabel({
=======
        id: "__alloyId178"
    });
    $.__views.__alloyId177.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId273"
    });
    $.__views.__alloyId271.add($.__views.__alloyId273);
    $.__views.__alloyId274 = Ti.UI.createView({
=======
        id: "__alloyId179"
    });
    $.__views.__alloyId177.add($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createView({
>>>>>>> origin/master
        backgroundColor: "#ff0000",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId180"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId274);
    $.__views.__alloyId275 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId275"
    });
    $.__views.__alloyId274.add($.__views.__alloyId275);
    $.__views.__alloyId276 = Ti.UI.createView({
=======
        id: "__alloyId181"
    });
    $.__views.__alloyId180.add($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId182"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId276);
    $.__views.__alloyId277 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId182);
    $.__views.__alloyId183 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId277"
=======
        id: "__alloyId183"
>>>>>>> origin/master
    });
    $.__views.__alloyId168.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId184"
    });
    $.__views.__alloyId168.add($.__views.__alloyId184);
    $.__views.__alloyId185 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId185"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId279);
    $.__views.__alloyId280 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId185);
    $.__views.__alloyId186 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
<<<<<<< HEAD
        id: "__alloyId280"
    });
    $.__views.__alloyId279.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createLabel({
=======
        id: "__alloyId186"
    });
    $.__views.__alloyId185.add($.__views.__alloyId186);
    $.__views.__alloyId187 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId281"
    });
    $.__views.__alloyId279.add($.__views.__alloyId281);
    $.__views.__alloyId282 = Ti.UI.createView({
=======
        id: "__alloyId187"
    });
    $.__views.__alloyId185.add($.__views.__alloyId187);
    $.__views.__alloyId188 = Ti.UI.createView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId188"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId282);
    $.__views.__alloyId283 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId188);
    $.__views.__alloyId189 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId283"
=======
        id: "__alloyId189"
>>>>>>> origin/master
    });
    $.__views.__alloyId168.add($.__views.__alloyId189);
    $.__views.__alloyId190 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId190"
    });
    $.__views.__alloyId168.add($.__views.__alloyId190);
    $.__views.__alloyId191 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId191"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId285);
    $.__views.__alloyId286 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId191);
    $.__views.__alloyId192 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
<<<<<<< HEAD
        id: "__alloyId286"
    });
    $.__views.__alloyId285.add($.__views.__alloyId286);
    $.__views.__alloyId287 = Ti.UI.createLabel({
=======
        id: "__alloyId192"
    });
    $.__views.__alloyId191.add($.__views.__alloyId192);
    $.__views.__alloyId193 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId287"
    });
    $.__views.__alloyId285.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createView({
=======
        id: "__alloyId193"
    });
    $.__views.__alloyId191.add($.__views.__alloyId193);
    $.__views.__alloyId194 = Ti.UI.createView({
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId194"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId288);
    $.__views.__alloyId289 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId194);
    $.__views.__alloyId195 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId289"
=======
        id: "__alloyId195"
>>>>>>> origin/master
    });
    $.__views.__alloyId168.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#000",
        id: "__alloyId196"
    });
    $.__views.__alloyId168.add($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId197"
    });
<<<<<<< HEAD
    $.__views.__alloyId262.add($.__views.__alloyId291);
    $.__views.__alloyId292 = Ti.UI.createLabel({
=======
    $.__views.__alloyId168.add($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "60%",
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        bottom: 5,
        top: 5,
        left: 10,
        text: "GP/OUT-PATIENT",
<<<<<<< HEAD
        id: "__alloyId292"
    });
    $.__views.__alloyId291.add($.__views.__alloyId292);
    $.__views.__alloyId293 = Ti.UI.createLabel({
=======
        id: "__alloyId198"
    });
    $.__views.__alloyId197.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createLabel({
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId293"
    });
    $.__views.__alloyId291.add($.__views.__alloyId293);
=======
        id: "__alloyId199"
    });
    $.__views.__alloyId197.add($.__views.__alloyId199);
>>>>>>> origin/master
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