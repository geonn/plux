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
    var __alloyId327 = [];
    $.__views.__alloyId328 = Ti.UI.createScrollView({
=======
    var __alloyId325 = [];
    $.__views.__alloyId326 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId328"
    });
    __alloyId327.push($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createLabel({
=======
        id: "__alloyId326"
    });
    __alloyId325.push($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createLabel({
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
        id: "__alloyId329"
    });
    $.__views.__alloyId328.add($.__views.__alloyId329);
=======
        id: "__alloyId327"
    });
    $.__views.__alloyId326.add($.__views.__alloyId327);
>>>>>>> origin/master
    $.__views.pic = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        id: "pic",
        image: "/images/bone-health-thumb.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId328.add($.__views.pic);
    $.__views.__alloyId330 = Ti.UI.createLabel({
=======
    $.__views.__alloyId326.add($.__views.pic);
    $.__views.__alloyId328 = Ti.UI.createLabel({
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
        id: "__alloyId330"
    });
    $.__views.__alloyId328.add($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createLabel({
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
        id: "__alloyId331"
    });
    $.__views.__alloyId328.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
        id: "__alloyId328"
    });
    $.__views.__alloyId326.add($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createLabel({
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
        id: "__alloyId329"
    });
    $.__views.__alloyId326.add($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
>>>>>>> origin/master
        color: "#1C1C1C",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        right: "10dp",
        top: "10dp",
        text: "Why Does Bone Health Matter?",
<<<<<<< HEAD
        id: "__alloyId332"
    });
    $.__views.__alloyId328.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createLabel({
=======
        id: "__alloyId330"
    });
    $.__views.__alloyId326.add($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createLabel({
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
        id: "__alloyId333"
    });
    $.__views.__alloyId328.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createScrollView({
=======
        id: "__alloyId331"
    });
    $.__views.__alloyId326.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId334"
    });
    __alloyId327.push($.__views.__alloyId334);
    $.__views.__alloyId335 = Ti.UI.createLabel({
=======
        id: "__alloyId332"
    });
    __alloyId325.push($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createLabel({
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
        id: "__alloyId335"
    });
    $.__views.__alloyId334.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId336"
    });
    $.__views.__alloyId334.add($.__views.__alloyId336);
    $.__views.__alloyId337 = Ti.UI.createLabel({
=======
        id: "__alloyId333"
    });
    $.__views.__alloyId332.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId334"
    });
    $.__views.__alloyId332.add($.__views.__alloyId334);
    $.__views.__alloyId335 = Ti.UI.createLabel({
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
        id: "__alloyId337"
    });
    $.__views.__alloyId334.add($.__views.__alloyId337);
    $.__views.__alloyId338 = Ti.UI.createLabel({
=======
        id: "__alloyId335"
    });
    $.__views.__alloyId332.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createLabel({
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
        id: "__alloyId338"
    });
    $.__views.__alloyId334.add($.__views.__alloyId338);
    $.__views.__alloyId339 = Ti.UI.createLabel({
=======
        id: "__alloyId336"
    });
    $.__views.__alloyId332.add($.__views.__alloyId336);
    $.__views.__alloyId337 = Ti.UI.createLabel({
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
        id: "__alloyId339"
    });
    $.__views.__alloyId334.add($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createLabel({
=======
        id: "__alloyId337"
    });
    $.__views.__alloyId332.add($.__views.__alloyId337);
    $.__views.__alloyId338 = Ti.UI.createLabel({
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
        id: "__alloyId340"
    });
    $.__views.__alloyId334.add($.__views.__alloyId340);
    $.__views.__alloyId341 = Ti.UI.createScrollView({
=======
        id: "__alloyId338"
    });
    $.__views.__alloyId332.add($.__views.__alloyId338);
    $.__views.__alloyId339 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId341"
    });
    __alloyId327.push($.__views.__alloyId341);
    $.__views.__alloyId342 = Ti.UI.createLabel({
=======
        id: "__alloyId339"
    });
    __alloyId325.push($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createLabel({
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
        id: "__alloyId342"
    });
    $.__views.__alloyId341.add($.__views.__alloyId342);
    $.__views.__alloyId343 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId343"
    });
    $.__views.__alloyId341.add($.__views.__alloyId343);
    $.__views.__alloyId344 = Ti.UI.createLabel({
=======
        id: "__alloyId340"
    });
    $.__views.__alloyId339.add($.__views.__alloyId340);
    $.__views.__alloyId341 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId341"
    });
    $.__views.__alloyId339.add($.__views.__alloyId341);
    $.__views.__alloyId342 = Ti.UI.createLabel({
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
        id: "__alloyId344"
    });
    $.__views.__alloyId341.add($.__views.__alloyId344);
    $.__views.__alloyId345 = Ti.UI.createLabel({
=======
        id: "__alloyId342"
    });
    $.__views.__alloyId339.add($.__views.__alloyId342);
    $.__views.__alloyId343 = Ti.UI.createLabel({
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
        id: "__alloyId345"
    });
    $.__views.__alloyId341.add($.__views.__alloyId345);
    $.__views.__alloyId346 = Ti.UI.createLabel({
=======
        id: "__alloyId343"
    });
    $.__views.__alloyId339.add($.__views.__alloyId343);
    $.__views.__alloyId344 = Ti.UI.createLabel({
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
        id: "__alloyId346"
    });
    $.__views.__alloyId341.add($.__views.__alloyId346);
    $.__views.__alloyId347 = Ti.UI.createLabel({
=======
        id: "__alloyId344"
    });
    $.__views.__alloyId339.add($.__views.__alloyId344);
    $.__views.__alloyId345 = Ti.UI.createLabel({
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
        id: "__alloyId347"
    });
    $.__views.__alloyId341.add($.__views.__alloyId347);
    $.__views.__alloyId348 = Ti.UI.createScrollView({
=======
        id: "__alloyId345"
    });
    $.__views.__alloyId339.add($.__views.__alloyId345);
    $.__views.__alloyId346 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId348"
    });
    __alloyId327.push($.__views.__alloyId348);
    $.__views.__alloyId349 = Ti.UI.createLabel({
=======
        id: "__alloyId346"
    });
    __alloyId325.push($.__views.__alloyId346);
    $.__views.__alloyId347 = Ti.UI.createLabel({
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
        id: "__alloyId349"
    });
    $.__views.__alloyId348.add($.__views.__alloyId349);
    $.__views.__alloyId350 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId350"
    });
    $.__views.__alloyId348.add($.__views.__alloyId350);
    $.__views.__alloyId351 = Ti.UI.createLabel({
=======
        id: "__alloyId347"
    });
    $.__views.__alloyId346.add($.__views.__alloyId347);
    $.__views.__alloyId348 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId348"
    });
    $.__views.__alloyId346.add($.__views.__alloyId348);
    $.__views.__alloyId349 = Ti.UI.createLabel({
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
        id: "__alloyId351"
    });
    $.__views.__alloyId348.add($.__views.__alloyId351);
    $.__views.__alloyId352 = Ti.UI.createLabel({
=======
        id: "__alloyId349"
    });
    $.__views.__alloyId346.add($.__views.__alloyId349);
    $.__views.__alloyId350 = Ti.UI.createLabel({
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
        id: "__alloyId352"
    });
    $.__views.__alloyId348.add($.__views.__alloyId352);
    $.__views.__alloyId353 = Ti.UI.createLabel({
=======
        id: "__alloyId350"
    });
    $.__views.__alloyId346.add($.__views.__alloyId350);
    $.__views.__alloyId351 = Ti.UI.createLabel({
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
        id: "__alloyId353"
    });
    $.__views.__alloyId348.add($.__views.__alloyId353);
    $.__views.__alloyId354 = Ti.UI.createLabel({
=======
        id: "__alloyId351"
    });
    $.__views.__alloyId346.add($.__views.__alloyId351);
    $.__views.__alloyId352 = Ti.UI.createLabel({
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
        id: "__alloyId354"
    });
    $.__views.__alloyId348.add($.__views.__alloyId354);
    $.__views.__alloyId355 = Ti.UI.createScrollView({
=======
        id: "__alloyId352"
    });
    $.__views.__alloyId346.add($.__views.__alloyId352);
    $.__views.__alloyId353 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId355"
    });
    __alloyId327.push($.__views.__alloyId355);
    $.__views.__alloyId356 = Ti.UI.createLabel({
=======
        id: "__alloyId353"
    });
    __alloyId325.push($.__views.__alloyId353);
    $.__views.__alloyId354 = Ti.UI.createLabel({
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
        id: "__alloyId356"
    });
    $.__views.__alloyId355.add($.__views.__alloyId356);
    $.__views.__alloyId357 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId357"
    });
    $.__views.__alloyId355.add($.__views.__alloyId357);
    $.__views.__alloyId358 = Ti.UI.createLabel({
=======
        id: "__alloyId354"
    });
    $.__views.__alloyId353.add($.__views.__alloyId354);
    $.__views.__alloyId355 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId355"
    });
    $.__views.__alloyId353.add($.__views.__alloyId355);
    $.__views.__alloyId356 = Ti.UI.createLabel({
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
        id: "__alloyId358"
    });
    $.__views.__alloyId355.add($.__views.__alloyId358);
    $.__views.__alloyId359 = Ti.UI.createLabel({
=======
        id: "__alloyId356"
    });
    $.__views.__alloyId353.add($.__views.__alloyId356);
    $.__views.__alloyId357 = Ti.UI.createLabel({
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
        id: "__alloyId359"
    });
    $.__views.__alloyId355.add($.__views.__alloyId359);
    $.__views.__alloyId360 = Ti.UI.createLabel({
=======
        id: "__alloyId357"
    });
    $.__views.__alloyId353.add($.__views.__alloyId357);
    $.__views.__alloyId358 = Ti.UI.createLabel({
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
        id: "__alloyId360"
    });
    $.__views.__alloyId355.add($.__views.__alloyId360);
    $.__views.__alloyId361 = Ti.UI.createLabel({
=======
        id: "__alloyId358"
    });
    $.__views.__alloyId353.add($.__views.__alloyId358);
    $.__views.__alloyId359 = Ti.UI.createLabel({
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
        id: "__alloyId361"
    });
    $.__views.__alloyId355.add($.__views.__alloyId361);
    $.__views.__alloyId326 = Ti.UI.createScrollableView({
        views: __alloyId327,
        showPagingControl: "true",
        id: "__alloyId326"
    });
    $.__views.main.add($.__views.__alloyId326);
=======
        id: "__alloyId359"
    });
    $.__views.__alloyId353.add($.__views.__alloyId359);
    $.__views.__alloyId324 = Ti.UI.createScrollableView({
        views: __alloyId325,
        showPagingControl: "true",
        id: "__alloyId324"
    });
    $.__views.main.add($.__views.__alloyId324);
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