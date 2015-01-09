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
        title: "ASP eCARD",
        backButtonTitle: "",
        layout: "vertical",
        backgroundColor: "#fff",
        id: "eCard",
        navTintColor: "#CE1D1C"
    });
    $.__views.eCard && $.addTopLevelView($.__views.eCard);
    $.__views.card = Ti.UI.createView({
        height: "200dp",
        id: "card"
    });
<<<<<<< Updated upstream
    $.__views.m_eCard.add($.__views.main);
    $.__views.__alloyId41 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-eCard.jpg",
        id: "__alloyId41"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId41);
=======
    $.__views.main.add($.__views.__alloyId22);
=======
    $.__views.eCard.add($.__views.card);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        text: "Click here to flip",
        id: "__alloyId20"
    });
    $.__views.eCard.add($.__views.__alloyId20);
>>>>>>> Stashed changes
>>>>>>> FETCH_HEAD
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var frontbackcounter = 0;
    var front = Ti.UI.createImageView({
        name: "front",
        width: "100%",
        image: "/eCard-front.png",
        currentAngle: 10
    });
    var back = Ti.UI.createImageView({
        name: "back",
        width: "100%",
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