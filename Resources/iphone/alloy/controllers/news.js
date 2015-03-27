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
        backgroundColor: "#ffffff",
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
<<<<<<< HEAD
    var __alloyId308 = [];
    $.__views.__alloyId309 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
    var __alloyId300 = [];
    $.__views.__alloyId301 = Ti.UI.createScrollView({
=======
    var __alloyId303 = [];
    $.__views.__alloyId304 = Ti.UI.createScrollView({
>>>>>>> origin/master
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId309"
    });
    __alloyId308.push($.__views.__alloyId309);
    $.__views.__alloyId310 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId301"
    });
    __alloyId300.push($.__views.__alloyId301);
    $.__views.__alloyId302 = Ti.UI.createLabel({
=======
        id: "__alloyId304"
    });
    __alloyId303.push($.__views.__alloyId304);
    $.__views.__alloyId305 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId310"
    });
    $.__views.__alloyId309.add($.__views.__alloyId310);
=======
<<<<<<< HEAD
        id: "__alloyId302"
    });
    $.__views.__alloyId301.add($.__views.__alloyId302);
=======
        id: "__alloyId305"
    });
    $.__views.__alloyId304.add($.__views.__alloyId305);
>>>>>>> origin/master
>>>>>>> origin/master
    $.__views.pic = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        id: "pic",
        image: "/images/bone-health-thumb.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId309.add($.__views.pic);
    $.__views.__alloyId311 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
    $.__views.__alloyId301.add($.__views.pic);
    $.__views.__alloyId303 = Ti.UI.createLabel({
=======
    $.__views.__alloyId304.add($.__views.pic);
    $.__views.__alloyId306 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId311"
    });
    $.__views.__alloyId309.add($.__views.__alloyId311);
    $.__views.__alloyId312 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId303"
    });
    $.__views.__alloyId301.add($.__views.__alloyId303);
    $.__views.__alloyId304 = Ti.UI.createLabel({
=======
        id: "__alloyId306"
    });
    $.__views.__alloyId304.add($.__views.__alloyId306);
    $.__views.__alloyId307 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId312"
    });
    $.__views.__alloyId309.add($.__views.__alloyId312);
    $.__views.__alloyId313 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId304"
    });
    $.__views.__alloyId301.add($.__views.__alloyId304);
    $.__views.__alloyId305 = Ti.UI.createLabel({
=======
        id: "__alloyId307"
    });
    $.__views.__alloyId304.add($.__views.__alloyId307);
    $.__views.__alloyId308 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId313"
    });
    $.__views.__alloyId309.add($.__views.__alloyId313);
    $.__views.__alloyId314 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId305"
    });
    $.__views.__alloyId301.add($.__views.__alloyId305);
    $.__views.__alloyId306 = Ti.UI.createLabel({
=======
        id: "__alloyId308"
    });
    $.__views.__alloyId304.add($.__views.__alloyId308);
    $.__views.__alloyId309 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId314"
    });
    $.__views.__alloyId309.add($.__views.__alloyId314);
    $.__views.__alloyId315 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
        id: "__alloyId306"
    });
    $.__views.__alloyId301.add($.__views.__alloyId306);
    $.__views.__alloyId307 = Ti.UI.createScrollView({
=======
        id: "__alloyId309"
    });
    $.__views.__alloyId304.add($.__views.__alloyId309);
    $.__views.__alloyId310 = Ti.UI.createScrollView({
>>>>>>> origin/master
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId315"
    });
    __alloyId308.push($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId307"
    });
    __alloyId300.push($.__views.__alloyId307);
    $.__views.__alloyId308 = Ti.UI.createLabel({
=======
        id: "__alloyId310"
    });
    __alloyId303.push($.__views.__alloyId310);
    $.__views.__alloyId311 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId316"
=======
<<<<<<< HEAD
        id: "__alloyId308"
    });
    $.__views.__alloyId307.add($.__views.__alloyId308);
    $.__views.__alloyId309 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId309"
    });
    $.__views.__alloyId307.add($.__views.__alloyId309);
    $.__views.__alloyId310 = Ti.UI.createLabel({
=======
        id: "__alloyId311"
>>>>>>> origin/master
    });
    $.__views.__alloyId315.add($.__views.__alloyId316);
    $.__views.__alloyId317 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId317"
    });
<<<<<<< HEAD
    $.__views.__alloyId315.add($.__views.__alloyId317);
    $.__views.__alloyId318 = Ti.UI.createLabel({
=======
    $.__views.__alloyId310.add($.__views.__alloyId312);
    $.__views.__alloyId313 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId318"
    });
    $.__views.__alloyId315.add($.__views.__alloyId318);
    $.__views.__alloyId319 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId310"
    });
    $.__views.__alloyId307.add($.__views.__alloyId310);
    $.__views.__alloyId311 = Ti.UI.createLabel({
=======
        id: "__alloyId313"
    });
    $.__views.__alloyId310.add($.__views.__alloyId313);
    $.__views.__alloyId314 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId319"
    });
    $.__views.__alloyId315.add($.__views.__alloyId319);
    $.__views.__alloyId320 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId311"
    });
    $.__views.__alloyId307.add($.__views.__alloyId311);
    $.__views.__alloyId312 = Ti.UI.createLabel({
=======
        id: "__alloyId314"
    });
    $.__views.__alloyId310.add($.__views.__alloyId314);
    $.__views.__alloyId315 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId320"
    });
    $.__views.__alloyId315.add($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId312"
    });
    $.__views.__alloyId307.add($.__views.__alloyId312);
    $.__views.__alloyId313 = Ti.UI.createLabel({
=======
        id: "__alloyId315"
    });
    $.__views.__alloyId310.add($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId321"
    });
    $.__views.__alloyId315.add($.__views.__alloyId321);
    $.__views.__alloyId322 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
        id: "__alloyId313"
    });
    $.__views.__alloyId307.add($.__views.__alloyId313);
    $.__views.__alloyId314 = Ti.UI.createScrollView({
=======
        id: "__alloyId316"
    });
    $.__views.__alloyId310.add($.__views.__alloyId316);
    $.__views.__alloyId317 = Ti.UI.createScrollView({
>>>>>>> origin/master
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId322"
    });
    __alloyId308.push($.__views.__alloyId322);
    $.__views.__alloyId323 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId314"
    });
    __alloyId300.push($.__views.__alloyId314);
    $.__views.__alloyId315 = Ti.UI.createLabel({
=======
        id: "__alloyId317"
    });
    __alloyId303.push($.__views.__alloyId317);
    $.__views.__alloyId318 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId323"
=======
<<<<<<< HEAD
        id: "__alloyId315"
    });
    $.__views.__alloyId314.add($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId316"
    });
    $.__views.__alloyId314.add($.__views.__alloyId316);
    $.__views.__alloyId317 = Ti.UI.createLabel({
=======
        id: "__alloyId318"
>>>>>>> origin/master
    });
    $.__views.__alloyId322.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId324"
    });
<<<<<<< HEAD
    $.__views.__alloyId322.add($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createLabel({
=======
    $.__views.__alloyId317.add($.__views.__alloyId319);
    $.__views.__alloyId320 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId325"
    });
    $.__views.__alloyId322.add($.__views.__alloyId325);
    $.__views.__alloyId326 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId317"
    });
    $.__views.__alloyId314.add($.__views.__alloyId317);
    $.__views.__alloyId318 = Ti.UI.createLabel({
=======
        id: "__alloyId320"
    });
    $.__views.__alloyId317.add($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId326"
    });
    $.__views.__alloyId322.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId318"
    });
    $.__views.__alloyId314.add($.__views.__alloyId318);
    $.__views.__alloyId319 = Ti.UI.createLabel({
=======
        id: "__alloyId321"
    });
    $.__views.__alloyId317.add($.__views.__alloyId321);
    $.__views.__alloyId322 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId327"
    });
    $.__views.__alloyId322.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId319"
    });
    $.__views.__alloyId314.add($.__views.__alloyId319);
    $.__views.__alloyId320 = Ti.UI.createLabel({
=======
        id: "__alloyId322"
    });
    $.__views.__alloyId317.add($.__views.__alloyId322);
    $.__views.__alloyId323 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId328"
    });
    $.__views.__alloyId322.add($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
        id: "__alloyId320"
    });
    $.__views.__alloyId314.add($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createScrollView({
=======
        id: "__alloyId323"
    });
    $.__views.__alloyId317.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createScrollView({
>>>>>>> origin/master
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId329"
    });
    __alloyId308.push($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId321"
    });
    __alloyId300.push($.__views.__alloyId321);
    $.__views.__alloyId322 = Ti.UI.createLabel({
=======
        id: "__alloyId324"
    });
    __alloyId303.push($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId330"
=======
<<<<<<< HEAD
        id: "__alloyId322"
    });
    $.__views.__alloyId321.add($.__views.__alloyId322);
    $.__views.__alloyId323 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId323"
    });
    $.__views.__alloyId321.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createLabel({
=======
        id: "__alloyId325"
>>>>>>> origin/master
    });
    $.__views.__alloyId329.add($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId331"
    });
<<<<<<< HEAD
    $.__views.__alloyId329.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createLabel({
=======
    $.__views.__alloyId324.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId332"
    });
    $.__views.__alloyId329.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId324"
    });
    $.__views.__alloyId321.add($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createLabel({
=======
        id: "__alloyId327"
    });
    $.__views.__alloyId324.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId333"
    });
    $.__views.__alloyId329.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId325"
    });
    $.__views.__alloyId321.add($.__views.__alloyId325);
    $.__views.__alloyId326 = Ti.UI.createLabel({
=======
        id: "__alloyId328"
    });
    $.__views.__alloyId324.add($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId334"
    });
    $.__views.__alloyId329.add($.__views.__alloyId334);
    $.__views.__alloyId335 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId326"
    });
    $.__views.__alloyId321.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createLabel({
=======
        id: "__alloyId329"
    });
    $.__views.__alloyId324.add($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId335"
    });
    $.__views.__alloyId329.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
        id: "__alloyId327"
    });
    $.__views.__alloyId321.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createScrollView({
=======
        id: "__alloyId330"
    });
    $.__views.__alloyId324.add($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createScrollView({
>>>>>>> origin/master
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId336"
    });
    __alloyId308.push($.__views.__alloyId336);
    $.__views.__alloyId337 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId328"
    });
    __alloyId300.push($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createLabel({
=======
        id: "__alloyId331"
    });
    __alloyId303.push($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId337"
=======
<<<<<<< HEAD
        id: "__alloyId329"
    });
    $.__views.__alloyId328.add($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId330"
    });
    $.__views.__alloyId328.add($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createLabel({
=======
        id: "__alloyId332"
>>>>>>> origin/master
    });
    $.__views.__alloyId336.add($.__views.__alloyId337);
    $.__views.__alloyId338 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId338"
    });
<<<<<<< HEAD
    $.__views.__alloyId336.add($.__views.__alloyId338);
    $.__views.__alloyId339 = Ti.UI.createLabel({
=======
    $.__views.__alloyId331.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
        id: "__alloyId339"
    });
    $.__views.__alloyId336.add($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId331"
    });
    $.__views.__alloyId328.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createLabel({
=======
        id: "__alloyId334"
    });
    $.__views.__alloyId331.add($.__views.__alloyId334);
    $.__views.__alloyId335 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId340"
    });
    $.__views.__alloyId336.add($.__views.__alloyId340);
    $.__views.__alloyId341 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId332"
    });
    $.__views.__alloyId328.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createLabel({
=======
        id: "__alloyId335"
    });
    $.__views.__alloyId331.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId341"
    });
    $.__views.__alloyId336.add($.__views.__alloyId341);
    $.__views.__alloyId342 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId333"
    });
    $.__views.__alloyId328.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createLabel({
=======
        id: "__alloyId336"
    });
    $.__views.__alloyId331.add($.__views.__alloyId336);
    $.__views.__alloyId337 = Ti.UI.createLabel({
>>>>>>> origin/master
>>>>>>> origin/master
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
<<<<<<< HEAD
        id: "__alloyId342"
=======
<<<<<<< HEAD
        id: "__alloyId334"
    });
    $.__views.__alloyId328.add($.__views.__alloyId334);
    $.__views.__alloyId299 = Ti.UI.createScrollableView({
        views: __alloyId300,
        showPagingControl: "true",
        id: "__alloyId299"
    });
    $.__views.main.add($.__views.__alloyId299);
=======
        id: "__alloyId337"
>>>>>>> origin/master
    });
    $.__views.__alloyId336.add($.__views.__alloyId342);
    $.__views.__alloyId307 = Ti.UI.createScrollableView({
        views: __alloyId308,
        showPagingControl: "true",
        id: "__alloyId307"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId307);
=======
    $.__views.main.add($.__views.__alloyId302);
>>>>>>> origin/master
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var title = args.title;
    $.news.title = title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;