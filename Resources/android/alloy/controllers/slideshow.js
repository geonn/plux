function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
<<<<<<< HEAD
    function __alloyId311() {
        $.__views.win.removeEventListener("open", __alloyId311);
=======
    function __alloyId279() {
        $.__views.win.removeEventListener("open", __alloyId279);
>>>>>>> origin/master
        if ($.__views.win.activity) {
            $.__views.win.activity.actionBar.displayHomeAsUp = true;
            $.__views.win.activity.actionBar.onHomeIconItemSelected = closeWindow;
        } else {
            Ti.API.warn("You attempted to access an Activity on a lightweight Window or other");
            Ti.API.warn("UI component which does not have an Android activity. Android Activities");
            Ti.API.warn("are valid with only windows in TabGroups or heavyweight Windows.");
        }
    }
    function do_continue() {
        Ti.App.Properties.setString("isShowIntro", 1);
        var win = Alloy.createController("login").getView();
        win.open();
    }
    function changeSlideOpacity(seed) {
        var child = $.image_container.children;
        var first = child[Math.floor(seed)];
        if (seed - Math.floor(seed) == 0) for (var a = 0; a < child.length; a++) a == Math.floor(seed) ? child[a].setOpacity(1) : child[a].setOpacity(0); else {
            var second = child[Math.ceil(seed)];
            for (var a = 0; a < child.length; a++) if (a == Math.floor(seed) || a == Math.ceil(seed)) {
                first.setOpacity(Math.ceil(seed) - seed);
                second.setOpacity(seed - Math.floor(seed));
            } else child[a].setOpacity(0);
        }
    }
    function scroll(event) {
        if ("undefined" == typeof event.currentPageAsFloat) return;
        changeSlideOpacity(event.currentPageAsFloat);
        0 == event.currentPage;
    }
    function render_slideshow() {
        $.image_container.removeAllChildren();
        for (var i = 0; i < fade_images.length; i++) {
            var img = $.UI.create("ImageView", {
                classes: [ "wfill", "hsize" ],
                image: fade_images[i],
                top: 0
            });
            $.image_container.add(img);
        }
    }
    function refresh() {
        render_slideshow();
        changeSlideOpacity(0);
    }
    function closeWindow() {
        $.win.close();
    }
    function init() {
        refresh();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "slideshow";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        barColor: "#75d0cb",
        id: "win",
        title: "News",
        navBarHidden: false
    });
    $.__views.win && $.addTopLevelView($.__views.win);
<<<<<<< HEAD
    $.__views.win.addEventListener("open", __alloyId311);
=======
    $.__views.win.addEventListener("open", __alloyId279);
>>>>>>> origin/master
    $.__views.image_container = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "image_container",
        backgroundColor: "#000"
    });
    $.__views.win.add($.__views.image_container);
<<<<<<< HEAD
    $.__views.__alloyId312 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        image: "/images/gradient-bg.png",
        id: "__alloyId312"
    });
    $.__views.win.add($.__views.__alloyId312);
    $.__views.__alloyId313 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId313"
    });
    $.__views.win.add($.__views.__alloyId313);
    var __alloyId314 = [];
    $.__views.__alloyId315 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "composite",
        id: "__alloyId315"
    });
    __alloyId314.push($.__views.__alloyId315);
    $.__views.__alloyId316 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: 0,
        id: "__alloyId316"
    });
    $.__views.__alloyId315.add($.__views.__alloyId316);
    $.__views.__alloyId317 = Ti.UI.createView({
=======
    $.__views.__alloyId280 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        image: "/images/gradient-bg.png",
        id: "__alloyId280"
    });
    $.__views.win.add($.__views.__alloyId280);
    $.__views.__alloyId281 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId281"
    });
    $.__views.win.add($.__views.__alloyId281);
    var __alloyId282 = [];
    $.__views.__alloyId283 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "composite",
        id: "__alloyId283"
    });
    __alloyId282.push($.__views.__alloyId283);
    $.__views.__alloyId284 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: 0,
        id: "__alloyId284"
    });
    $.__views.__alloyId283.add($.__views.__alloyId284);
    $.__views.__alloyId285 = Ti.UI.createView({
>>>>>>> origin/master
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
<<<<<<< HEAD
        id: "__alloyId317"
    });
    $.__views.__alloyId316.add($.__views.__alloyId317);
    $.__views.__alloyId318 = Ti.UI.createLabel({
=======
        id: "__alloyId285"
    });
    $.__views.__alloyId284.add($.__views.__alloyId285);
    $.__views.__alloyId286 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 18
        },
        text: "Welcome,",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId318"
    });
    $.__views.__alloyId317.add($.__views.__alloyId318);
    $.__views.__alloyId319 = Ti.UI.createLabel({
=======
        id: "__alloyId286"
    });
    $.__views.__alloyId285.add($.__views.__alloyId286);
    $.__views.__alloyId287 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        text: "a FREE app that automates most of the management, claims and tracking functions that are performed by companies’ HR departments",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId319"
    });
    $.__views.__alloyId317.add($.__views.__alloyId319);
    $.__views.__alloyId320 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId320"
    });
    __alloyId314.push($.__views.__alloyId320);
    $.__views.__alloyId321 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: 0,
        id: "__alloyId321"
    });
    $.__views.__alloyId320.add($.__views.__alloyId321);
    $.__views.__alloyId322 = Ti.UI.createView({
=======
        id: "__alloyId287"
    });
    $.__views.__alloyId285.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId288"
    });
    __alloyId282.push($.__views.__alloyId288);
    $.__views.__alloyId289 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: 0,
        id: "__alloyId289"
    });
    $.__views.__alloyId288.add($.__views.__alloyId289);
    $.__views.__alloyId290 = Ti.UI.createView({
>>>>>>> origin/master
        top: 10,
        left: 10,
        right: 10,
        bottom: 20,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
<<<<<<< HEAD
        id: "__alloyId322"
    });
    $.__views.__alloyId321.add($.__views.__alloyId322);
    $.__views.__alloyId323 = Ti.UI.createLabel({
=======
        id: "__alloyId290"
    });
    $.__views.__alloyId289.add($.__views.__alloyId290);
    $.__views.__alloyId291 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 18
        },
        text: "Doctor Appointment Booking",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId323"
    });
    $.__views.__alloyId322.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createLabel({
=======
        id: "__alloyId291"
    });
    $.__views.__alloyId290.add($.__views.__alloyId291);
    $.__views.__alloyId292 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        text: "Employees can choose from a panel of thousands of doctors for unparalleled convenience",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId324"
    });
    $.__views.__alloyId322.add($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "composite",
        id: "__alloyId325"
    });
    __alloyId314.push($.__views.__alloyId325);
    $.__views.__alloyId326 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: 0,
        id: "__alloyId326"
    });
    $.__views.__alloyId325.add($.__views.__alloyId326);
    $.__views.__alloyId327 = Ti.UI.createView({
=======
        id: "__alloyId292"
    });
    $.__views.__alloyId290.add($.__views.__alloyId292);
    $.__views.__alloyId293 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "composite",
        id: "__alloyId293"
    });
    __alloyId282.push($.__views.__alloyId293);
    $.__views.__alloyId294 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: 0,
        id: "__alloyId294"
    });
    $.__views.__alloyId293.add($.__views.__alloyId294);
    $.__views.__alloyId295 = Ti.UI.createView({
>>>>>>> origin/master
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
<<<<<<< HEAD
        id: "__alloyId327"
    });
    $.__views.__alloyId326.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createLabel({
=======
        id: "__alloyId295"
    });
    $.__views.__alloyId294.add($.__views.__alloyId295);
    $.__views.__alloyId296 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 18
        },
        text: "Smart Claims",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId328"
    });
    $.__views.__alloyId327.add($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createLabel({
=======
        id: "__alloyId296"
    });
    $.__views.__alloyId295.add($.__views.__alloyId296);
    $.__views.__alloyId297 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        text: "Access details of entitlements, claims made, claims remaining, etc",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId329"
    });
    $.__views.__alloyId327.add($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId330"
    });
    __alloyId314.push($.__views.__alloyId330);
    $.__views.__alloyId331 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: 0,
        id: "__alloyId331"
    });
    $.__views.__alloyId330.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createView({
=======
        id: "__alloyId297"
    });
    $.__views.__alloyId295.add($.__views.__alloyId297);
    $.__views.__alloyId298 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId298"
    });
    __alloyId282.push($.__views.__alloyId298);
    $.__views.__alloyId299 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: 0,
        id: "__alloyId299"
    });
    $.__views.__alloyId298.add($.__views.__alloyId299);
    $.__views.__alloyId300 = Ti.UI.createView({
>>>>>>> origin/master
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
<<<<<<< HEAD
        id: "__alloyId332"
    });
    $.__views.__alloyId331.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createLabel({
=======
        id: "__alloyId300"
    });
    $.__views.__alloyId299.add($.__views.__alloyId300);
    $.__views.__alloyId301 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 18
        },
        text: "Easy Clinic Locator",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId333"
    });
    $.__views.__alloyId332.add($.__views.__alloyId333);
    $.__views.__alloyId334 = Ti.UI.createLabel({
=======
        id: "__alloyId301"
    });
    $.__views.__alloyId300.add($.__views.__alloyId301);
    $.__views.__alloyId302 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        text: "Search through our panel of thousands of doctors, located all over Malaysia",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId334"
    });
    $.__views.__alloyId332.add($.__views.__alloyId334);
    $.__views.slogan = Ti.UI.createScrollableView({
        width: Ti.UI.FILL,
        views: __alloyId314,
=======
        id: "__alloyId302"
    });
    $.__views.__alloyId300.add($.__views.__alloyId302);
    $.__views.slogan = Ti.UI.createScrollableView({
        width: Ti.UI.FILL,
        views: __alloyId282,
>>>>>>> origin/master
        id: "slogan",
        height: "85%",
        pagingControlColor: "transparent",
        showPagingControl: true,
        disableBounce: true
    });
<<<<<<< HEAD
    $.__views.__alloyId313.add($.__views.slogan);
    $.__views.__alloyId335 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId335"
    });
    $.__views.__alloyId313.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createButton({
=======
    $.__views.__alloyId281.add($.__views.slogan);
    $.__views.__alloyId303 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId303"
    });
    $.__views.__alloyId281.add($.__views.__alloyId303);
    $.__views.__alloyId304 = Ti.UI.createButton({
>>>>>>> origin/master
        font: {
            fontWeight: "bold"
        },
        height: 40,
        borderColor: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#ffffff",
        borderRadius: 6,
        color: "#CE1D1C",
        width: "60%",
        title: "Continue",
<<<<<<< HEAD
        id: "__alloyId336"
    });
    $.__views.__alloyId335.add($.__views.__alloyId336);
    do_continue ? $.addListener($.__views.__alloyId336, "click", do_continue) : __defers["$.__views.__alloyId336!click!do_continue"] = true;
=======
        id: "__alloyId304"
    });
    $.__views.__alloyId303.add($.__views.__alloyId304);
    do_continue ? $.addListener($.__views.__alloyId304, "click", do_continue) : __defers["$.__views.__alloyId304!click!do_continue"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Ti.App.Properties.getString("u_id") || "";
    $.UI.create("View", {
        classes: [ "wfill", "hfill" ],
        backgroundColor: "#ffffff"
    });
    var fade_images = [ "/images/slideshow/bg0.png", "/images/slideshow/bg1.png", "/images/slideshow/bg2.png", "/images/slideshow/bg3.png" ];
    init();
    $.slogan.addEventListener("scroll", scroll);
    Ti.App.addEventListener("slideshow:refresh", refresh);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("slideshow:refresh", refresh);
        $.destroy();
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId336!click!do_continue"] && $.addListener($.__views.__alloyId336, "click", do_continue);
=======
    __defers["$.__views.__alloyId304!click!do_continue"] && $.addListener($.__views.__alloyId304, "click", do_continue);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;