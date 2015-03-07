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
    this.__controllerPath = "news";
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
    $.__views.news = Ti.UI.createWindow({
        fullscreen: true,
        title: "Bone Health for Life",
        backButtonTitle: "",
        id: "news",
        navTintColor: "#CE1D1C"
    });
    $.__views.news && $.addTopLevelView($.__views.news);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "main"
    });
    $.__views.news.add($.__views.main);
    var __alloyId235 = [];
    $.__views.__alloyId236 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
        id: "__alloyId236"
    });
    __alloyId235.push($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
        id: "__alloyId237"
    });
    $.__views.__alloyId236.add($.__views.__alloyId237);
    $.__views.pic = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        id: "pic",
        image: "/images/bone-health-thumb.png"
    });
    $.__views.__alloyId236.add($.__views.pic);
    $.__views.__alloyId238 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
        id: "__alloyId238"
    });
    $.__views.__alloyId236.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
        id: "__alloyId239"
    });
    $.__views.__alloyId236.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
        id: "__alloyId240"
    });
    $.__views.__alloyId236.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
        id: "__alloyId241"
    });
    $.__views.__alloyId236.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
        id: "__alloyId242"
    });
    __alloyId235.push($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
        id: "__alloyId243"
    });
    $.__views.__alloyId242.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId244"
    });
    $.__views.__alloyId242.add($.__views.__alloyId244);
    $.__views.__alloyId245 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
        id: "__alloyId245"
    });
    $.__views.__alloyId242.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
        id: "__alloyId246"
    });
    $.__views.__alloyId242.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
        id: "__alloyId247"
    });
    $.__views.__alloyId242.add($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
        id: "__alloyId248"
    });
    $.__views.__alloyId242.add($.__views.__alloyId248);
    $.__views.__alloyId249 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
        id: "__alloyId249"
    });
    __alloyId235.push($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
        id: "__alloyId250"
    });
    $.__views.__alloyId249.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId251"
    });
    $.__views.__alloyId249.add($.__views.__alloyId251);
    $.__views.__alloyId252 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
        id: "__alloyId252"
    });
    $.__views.__alloyId249.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
        id: "__alloyId253"
    });
    $.__views.__alloyId249.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
        id: "__alloyId254"
    });
    $.__views.__alloyId249.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
        id: "__alloyId255"
    });
    $.__views.__alloyId249.add($.__views.__alloyId255);
    $.__views.__alloyId256 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
        id: "__alloyId256"
    });
    __alloyId235.push($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
        id: "__alloyId257"
    });
    $.__views.__alloyId256.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId258"
    });
    $.__views.__alloyId256.add($.__views.__alloyId258);
    $.__views.__alloyId259 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
        id: "__alloyId259"
    });
    $.__views.__alloyId256.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
        id: "__alloyId260"
    });
    $.__views.__alloyId256.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
        id: "__alloyId261"
    });
    $.__views.__alloyId256.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
        id: "__alloyId262"
    });
    $.__views.__alloyId256.add($.__views.__alloyId262);
    $.__views.__alloyId263 = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
        id: "__alloyId263"
    });
    __alloyId235.push($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        wordWrap: true,
        color: "#1C1C1C",
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        text: "Bone Health for Life: Health Information Basics for You and Your Family",
        id: "__alloyId264"
    });
    $.__views.__alloyId263.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId265"
    });
    $.__views.__alloyId263.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createLabel({
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
        id: "__alloyId266"
    });
    $.__views.__alloyId263.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "Our bones support us and allow us to move. They protect our brain, heart, and other organs from injury. Our bones also store minerals such as calcium and phosphorous, which help keep our bones strong, and release them into the body when we need them for other uses.\n						\nThere are many things we can do to keep our bones healthy and strong. Eating foods rich in calcium and vitamin D, getting plenty of exercise, and having good health habits help keep our bones healthy.",
        id: "__alloyId267"
    });
    $.__views.__alloyId263.add($.__views.__alloyId267);
    $.__views.__alloyId268 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
        id: "__alloyId268"
    });
    $.__views.__alloyId263.add($.__views.__alloyId268);
    $.__views.__alloyId269 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#4A4A4A",
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        font: {
            fontSize: "12dp"
        },
        text: "But if we don’t eat right and don’t get enough of the right kinds of exercise, our bones can become weak and even break. Broken bones (called fractures) can be painful and sometimes need surgery to heal. They can also cause long-lasting health problems.\n						\nBut the good news is that it is never too late to take care of your bones.",
        id: "__alloyId269"
    });
    $.__views.__alloyId263.add($.__views.__alloyId269);
    $.__views.__alloyId234 = Ti.UI.createScrollableView({
        views: __alloyId235,
        showPagingControl: "true",
        id: "__alloyId234"
    });
    $.__views.main.add($.__views.__alloyId234);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var title = args.title;
    $.news.title = title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;