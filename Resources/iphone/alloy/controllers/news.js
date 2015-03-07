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
<<<<<<< HEAD
<<<<<<< HEAD
    var __alloyId207 = [];
    $.__views.__alloyId208 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
    var __alloyId234 = [];
    $.__views.__alloyId235 = Ti.UI.createScrollView({
=======
    var __alloyId193 = [];
    $.__views.__alloyId194 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    var __alloyId235 = [];
    $.__views.__alloyId236 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId208"
    });
    __alloyId207.push($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId235"
    });
    __alloyId234.push($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createLabel({
=======
        id: "__alloyId194"
=======
        id: "__alloyId236"
>>>>>>> origin/master
    });
    __alloyId235.push($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId209"
    });
    $.__views.__alloyId208.add($.__views.__alloyId209);
=======
<<<<<<< HEAD
        id: "__alloyId236"
    });
    $.__views.__alloyId235.add($.__views.__alloyId236);
=======
        id: "__alloyId195"
    });
    $.__views.__alloyId194.add($.__views.__alloyId195);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId237"
    });
    $.__views.__alloyId236.add($.__views.__alloyId237);
>>>>>>> origin/master
    $.__views.pic = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        id: "pic",
        image: "/images/bone-health-thumb.png"
    });
<<<<<<< HEAD
<<<<<<< HEAD
    $.__views.__alloyId208.add($.__views.pic);
    $.__views.__alloyId210 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
    $.__views.__alloyId235.add($.__views.pic);
    $.__views.__alloyId237 = Ti.UI.createLabel({
=======
    $.__views.__alloyId194.add($.__views.pic);
    $.__views.__alloyId196 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
    $.__views.__alloyId236.add($.__views.pic);
    $.__views.__alloyId238 = Ti.UI.createLabel({
>>>>>>> origin/master
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId210"
    });
    $.__views.__alloyId208.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId237"
    });
    $.__views.__alloyId235.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createLabel({
=======
        id: "__alloyId196"
    });
    $.__views.__alloyId194.add($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId238"
    });
    $.__views.__alloyId236.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId211"
    });
    $.__views.__alloyId208.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId238"
    });
    $.__views.__alloyId235.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
=======
        id: "__alloyId197"
    });
    $.__views.__alloyId194.add($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId239"
    });
    $.__views.__alloyId236.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId212"
    });
    $.__views.__alloyId208.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId239"
    });
    $.__views.__alloyId235.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
=======
        id: "__alloyId198"
    });
    $.__views.__alloyId194.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId240"
    });
    $.__views.__alloyId236.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId213"
    });
    $.__views.__alloyId208.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
        id: "__alloyId240"
    });
    $.__views.__alloyId235.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createScrollView({
=======
        id: "__alloyId199"
    });
    $.__views.__alloyId194.add($.__views.__alloyId199);
    $.__views.__alloyId200 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId241"
    });
    $.__views.__alloyId236.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId214"
    });
    __alloyId207.push($.__views.__alloyId214);
    $.__views.__alloyId215 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId241"
    });
    __alloyId234.push($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createLabel({
=======
        id: "__alloyId200"
=======
        id: "__alloyId242"
>>>>>>> origin/master
    });
    __alloyId235.push($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId215"
=======
<<<<<<< HEAD
        id: "__alloyId242"
    });
    $.__views.__alloyId241.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId243"
    });
    $.__views.__alloyId241.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createLabel({
=======
        id: "__alloyId201"
>>>>>>> origin/master
    });
    $.__views.__alloyId214.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId216"
    });
<<<<<<< HEAD
    $.__views.__alloyId214.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
=======
    $.__views.__alloyId200.add($.__views.__alloyId202);
    $.__views.__alloyId203 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
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
>>>>>>> origin/master
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId217"
    });
    $.__views.__alloyId214.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId244"
    });
    $.__views.__alloyId241.add($.__views.__alloyId244);
    $.__views.__alloyId245 = Ti.UI.createLabel({
=======
        id: "__alloyId203"
    });
    $.__views.__alloyId200.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId245"
    });
    $.__views.__alloyId242.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId218"
    });
    $.__views.__alloyId214.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId245"
    });
    $.__views.__alloyId241.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
=======
        id: "__alloyId204"
    });
    $.__views.__alloyId200.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId246"
    });
    $.__views.__alloyId242.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId219"
    });
    $.__views.__alloyId214.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId246"
    });
    $.__views.__alloyId241.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createLabel({
=======
        id: "__alloyId205"
    });
    $.__views.__alloyId200.add($.__views.__alloyId205);
    $.__views.__alloyId206 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId247"
    });
    $.__views.__alloyId242.add($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId220"
    });
    $.__views.__alloyId214.add($.__views.__alloyId220);
    $.__views.__alloyId221 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
        id: "__alloyId247"
    });
    $.__views.__alloyId241.add($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createScrollView({
=======
        id: "__alloyId206"
    });
    $.__views.__alloyId200.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId248"
    });
    $.__views.__alloyId242.add($.__views.__alloyId248);
    $.__views.__alloyId249 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId221"
    });
    __alloyId207.push($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId248"
    });
    __alloyId234.push($.__views.__alloyId248);
    $.__views.__alloyId249 = Ti.UI.createLabel({
=======
        id: "__alloyId207"
=======
        id: "__alloyId249"
>>>>>>> origin/master
    });
    __alloyId235.push($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId222"
=======
<<<<<<< HEAD
        id: "__alloyId249"
    });
    $.__views.__alloyId248.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId250"
    });
    $.__views.__alloyId248.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createLabel({
=======
        id: "__alloyId208"
>>>>>>> origin/master
    });
    $.__views.__alloyId221.add($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId223"
    });
<<<<<<< HEAD
    $.__views.__alloyId221.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
=======
    $.__views.__alloyId207.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
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
>>>>>>> origin/master
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId224"
    });
    $.__views.__alloyId221.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId251"
    });
    $.__views.__alloyId248.add($.__views.__alloyId251);
    $.__views.__alloyId252 = Ti.UI.createLabel({
=======
        id: "__alloyId210"
    });
    $.__views.__alloyId207.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId252"
    });
    $.__views.__alloyId249.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId225"
    });
    $.__views.__alloyId221.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId252"
    });
    $.__views.__alloyId248.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
=======
        id: "__alloyId211"
    });
    $.__views.__alloyId207.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId253"
    });
    $.__views.__alloyId249.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId226"
    });
    $.__views.__alloyId221.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId253"
    });
    $.__views.__alloyId248.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createLabel({
=======
        id: "__alloyId212"
    });
    $.__views.__alloyId207.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId254"
    });
    $.__views.__alloyId249.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId227"
    });
    $.__views.__alloyId221.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
        id: "__alloyId254"
    });
    $.__views.__alloyId248.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createScrollView({
=======
        id: "__alloyId213"
    });
    $.__views.__alloyId207.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId255"
    });
    $.__views.__alloyId249.add($.__views.__alloyId255);
    $.__views.__alloyId256 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId228"
    });
    __alloyId207.push($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId255"
    });
    __alloyId234.push($.__views.__alloyId255);
    $.__views.__alloyId256 = Ti.UI.createLabel({
=======
        id: "__alloyId214"
=======
        id: "__alloyId256"
>>>>>>> origin/master
    });
    __alloyId235.push($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId229"
=======
<<<<<<< HEAD
        id: "__alloyId256"
    });
    $.__views.__alloyId255.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId257"
    });
    $.__views.__alloyId255.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createLabel({
=======
        id: "__alloyId215"
>>>>>>> origin/master
    });
    $.__views.__alloyId228.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId230"
    });
<<<<<<< HEAD
    $.__views.__alloyId228.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
=======
    $.__views.__alloyId214.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
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
>>>>>>> origin/master
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId231"
    });
    $.__views.__alloyId228.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId258"
    });
    $.__views.__alloyId255.add($.__views.__alloyId258);
    $.__views.__alloyId259 = Ti.UI.createLabel({
=======
        id: "__alloyId217"
    });
    $.__views.__alloyId214.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId259"
    });
    $.__views.__alloyId256.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId232"
    });
    $.__views.__alloyId228.add($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId259"
    });
    $.__views.__alloyId255.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
=======
        id: "__alloyId218"
    });
    $.__views.__alloyId214.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId260"
    });
    $.__views.__alloyId256.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId233"
    });
    $.__views.__alloyId228.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId260"
    });
    $.__views.__alloyId255.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createLabel({
=======
        id: "__alloyId219"
    });
    $.__views.__alloyId214.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId261"
    });
    $.__views.__alloyId256.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId234"
    });
    $.__views.__alloyId228.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
        id: "__alloyId261"
    });
    $.__views.__alloyId255.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createScrollView({
=======
        id: "__alloyId220"
    });
    $.__views.__alloyId214.add($.__views.__alloyId220);
    $.__views.__alloyId221 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId262"
    });
    $.__views.__alloyId256.add($.__views.__alloyId262);
    $.__views.__alloyId263 = Ti.UI.createScrollView({
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL,
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId235"
    });
    __alloyId207.push($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId262"
    });
    __alloyId234.push($.__views.__alloyId262);
    $.__views.__alloyId263 = Ti.UI.createLabel({
=======
        id: "__alloyId221"
=======
        id: "__alloyId263"
>>>>>>> origin/master
    });
    __alloyId235.push($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createLabel({
        height: Titanium.UI.SIZE,
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
<<<<<<< HEAD
        id: "__alloyId236"
=======
<<<<<<< HEAD
        id: "__alloyId263"
    });
    $.__views.__alloyId262.add($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId264"
    });
    $.__views.__alloyId262.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createLabel({
=======
        id: "__alloyId222"
>>>>>>> origin/master
    });
    $.__views.__alloyId235.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        image: "/images/bone-health-thumb.png",
        id: "__alloyId237"
    });
<<<<<<< HEAD
    $.__views.__alloyId235.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
=======
    $.__views.__alloyId221.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
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
>>>>>>> origin/master
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "5dp",
        top: "5dp",
        text: "here is image caption",
<<<<<<< HEAD
<<<<<<< HEAD
        id: "__alloyId238"
    });
    $.__views.__alloyId235.add($.__views.__alloyId238);
    $.__views.__alloyId239 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId265"
    });
    $.__views.__alloyId262.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createLabel({
=======
        id: "__alloyId224"
    });
    $.__views.__alloyId221.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId266"
    });
    $.__views.__alloyId263.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId239"
    });
    $.__views.__alloyId235.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId266"
    });
    $.__views.__alloyId262.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createLabel({
=======
        id: "__alloyId225"
    });
    $.__views.__alloyId221.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId267"
    });
    $.__views.__alloyId263.add($.__views.__alloyId267);
    $.__views.__alloyId268 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId240"
    });
    $.__views.__alloyId235.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createLabel({
=======
<<<<<<< HEAD
        id: "__alloyId267"
    });
    $.__views.__alloyId262.add($.__views.__alloyId267);
    $.__views.__alloyId268 = Ti.UI.createLabel({
=======
        id: "__alloyId226"
    });
    $.__views.__alloyId221.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId268"
    });
    $.__views.__alloyId263.add($.__views.__alloyId268);
    $.__views.__alloyId269 = Ti.UI.createLabel({
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
<<<<<<< HEAD
        id: "__alloyId241"
=======
<<<<<<< HEAD
        id: "__alloyId268"
    });
    $.__views.__alloyId262.add($.__views.__alloyId268);
    $.__views.__alloyId233 = Ti.UI.createScrollableView({
        views: __alloyId234,
        showPagingControl: "true",
        id: "__alloyId233"
    });
    $.__views.main.add($.__views.__alloyId233);
=======
        id: "__alloyId227"
>>>>>>> origin/master
    });
    $.__views.__alloyId235.add($.__views.__alloyId241);
    $.__views.__alloyId206 = Ti.UI.createScrollableView({
        views: __alloyId207,
        showPagingControl: "true",
        id: "__alloyId206"
    });
<<<<<<< HEAD
    $.__views.main.add($.__views.__alloyId206);
=======
    $.__views.main.add($.__views.__alloyId192);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
=======
        id: "__alloyId269"
    });
    $.__views.__alloyId263.add($.__views.__alloyId269);
    $.__views.__alloyId234 = Ti.UI.createScrollableView({
        views: __alloyId235,
        showPagingControl: "true",
        id: "__alloyId234"
    });
    $.__views.main.add($.__views.__alloyId234);
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