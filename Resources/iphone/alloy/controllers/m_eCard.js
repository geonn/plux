function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "m_eCard";
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
    $.__views.eCard = Ti.UI.createWindow({
        fullscreen: true,
        title: "ASP eCARD",
        backButtonTitle: "",
        layout: "vertical",
        backgroundColor: "#fff",
        id: "eCard",
        navTintColor: "#CE1D1C"
    });
    $.__views.eCard && $.addTopLevelView($.__views.eCard);
    $.__views.card = Ti.UI.createView({
        height: "204",
        width: "320",
        id: "card"
    });
    $.__views.eCard.add($.__views.card);
<<<<<<< HEAD
    $.__views.__alloyId173 = Ti.UI.createLabel({
=======
    $.__views.__alloyId160 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
        text: "Click here to flip",
        id: "__alloyId173"
    });
<<<<<<< HEAD
    $.__views.eCard.add($.__views.__alloyId173);
=======
    $.__views.eCard.add($.__views.__alloyId160);
>>>>>>> FETCH_HEAD
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var frontbackcounter = 0;
    var front = Ti.UI.createView({
        name: "front",
        width: Ti.UI.FILL,
        currentAngle: 10
    });
    var memno_text = Ti.UI.createLabel({
        text: "6000 2010 0011 3572",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "90dp",
        left: "20dp",
        zIndex: 12,
        font: {
            fontSize: "11dp"
        },
        color: "#ffffff"
    });
    var name_text = Ti.UI.createLabel({
        text: "CHEONG SHY YNG",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "107dp",
        left: "20dp",
        zIndex: 12,
        font: {
            fontSize: "11dp"
        },
        color: "#ffffff"
    });
    var ic_text = Ti.UI.createLabel({
        text: "858512102934",
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        top: "124dp",
        left: "20dp",
        zIndex: 12,
        font: {
            fontSize: "11dp"
        },
        color: "#ffffff"
    });
    var front_bg = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        image: "/eCard-front.png",
        currentAngle: 10,
        font: {
            fontSize: "11dp"
        },
        zIndex: 11
    });
    front.add(front_bg);
    front.add(name_text);
    front.add(ic_text);
    front.add(memno_text);
    var back = Ti.UI.createImageView({
        name: "back",
        width: Ti.UI.FILL,
        image: "/eCard-back.png",
        currentAngle: 10
    });
    $.card.add(back);
    $.card.add(front);
    $.eCard.addEventListener("click", function() {
        var t;
        console.log(frontbackcounter % 2);
        if (frontbackcounter % 2 == 0) {
            t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
            $.card.animate({
                view: back,
                transition: t
            });
        } else {
            t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT;
            $.card.animate({
                view: front,
                transition: t
            });
        }
        frontbackcounter++;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;