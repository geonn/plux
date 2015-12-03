function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId215() {
        $.__views.win.removeEventListener("open", __alloyId215);
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
        var win = Alloy.createController("home").getView();
        win.open();
        "" == u_id && nav.navigateWithArgs("login", {});
    }
    function changeSlideOpacity(seed) {
        var child = $.image_container.children;
        var first = child[Math.floor(seed)];
        if (seed - Math.floor(seed) == 0) for (var a = 0; a < child.length; a++) child[a].setOpacity(a == Math.floor(seed) ? 1 : 0); else {
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "slideshow";
    this.args = arguments[0] || {};
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
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        barColor: "#75d0cb",
        id: "win",
        title: "News",
        navBarHidden: "false"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.win.addEventListener("open", __alloyId215);
    $.__views.image_container = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "image_container",
        backgroundColor: "#000"
    });
    $.__views.win.add($.__views.image_container);
    $.__views.__alloyId216 = Ti.UI.createImageView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        image: "/images/gradient-bg.png",
        id: "__alloyId216"
    });
    $.__views.win.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId217"
    });
    $.__views.win.add($.__views.__alloyId217);
    var __alloyId218 = [];
    $.__views.__alloyId219 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "composite",
        id: "__alloyId219"
    });
    __alloyId218.push($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: "0",
        id: "__alloyId220"
    });
    $.__views.__alloyId219.add($.__views.__alloyId220);
    $.__views.__alloyId221 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId221"
    });
    $.__views.__alloyId220.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 18
        },
        text: "Welcome,",
        textAlign: "center",
        id: "__alloyId222"
    });
    $.__views.__alloyId221.add($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        text: "a FREE app that automates most of the management, claims and tracking functions that are performed by companies’ HR departments",
        textAlign: "center",
        id: "__alloyId223"
    });
    $.__views.__alloyId221.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId224"
    });
    __alloyId218.push($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: "0",
        id: "__alloyId225"
    });
    $.__views.__alloyId224.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: "20",
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId226"
    });
    $.__views.__alloyId225.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 18
        },
        text: "Doctor Appointment Booking",
        textAlign: "center",
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        text: "Employees can choose from a panel of thousands of doctors for unparalleled convenience",
        textAlign: "center",
        id: "__alloyId228"
    });
    $.__views.__alloyId226.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "composite",
        id: "__alloyId229"
    });
    __alloyId218.push($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: "0",
        id: "__alloyId230"
    });
    $.__views.__alloyId229.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId231"
    });
    $.__views.__alloyId230.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 18
        },
        text: "Smart Claims",
        textAlign: "center",
        id: "__alloyId232"
    });
    $.__views.__alloyId231.add($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        text: "Access details of entitlements, claims made, claims remaining, etc",
        textAlign: "center",
        id: "__alloyId233"
    });
    $.__views.__alloyId231.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId234"
    });
    __alloyId218.push($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        bottom: "0",
        id: "__alloyId235"
    });
    $.__views.__alloyId234.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId236"
    });
    $.__views.__alloyId235.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 18
        },
        text: "Easy Clinic Locator",
        textAlign: "center",
        id: "__alloyId237"
    });
    $.__views.__alloyId236.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ffffff",
        font: {
            fontSize: 14
        },
        text: "Search through our panel of thousands of doctors, located all over Malaysia",
        textAlign: "center",
        id: "__alloyId238"
    });
    $.__views.__alloyId236.add($.__views.__alloyId238);
    $.__views.slogan = Ti.UI.createScrollableView({
        width: Ti.UI.FILL,
        views: __alloyId218,
        id: "slogan",
        height: "85%",
        pagingControlColor: "transparent",
        showPagingControl: "true",
        disableBounce: "true"
    });
    $.__views.__alloyId217.add($.__views.slogan);
    $.__views.__alloyId239 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId239"
    });
    $.__views.__alloyId217.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createButton({
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
        id: "__alloyId240"
    });
    $.__views.__alloyId239.add($.__views.__alloyId240);
    do_continue ? $.addListener($.__views.__alloyId240, "click", do_continue) : __defers["$.__views.__alloyId240!click!do_continue"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var u_id = Ti.App.Properties.getString("u_id") || "";
    $.UI.create("View", {
        classes: [ "wfill", "hfill" ],
        backgroundColor: "#000000"
    });
    var fade_images = [ "/images/slideshow/bg0.png", "/images/slideshow/bg1.png", "/images/slideshow/bg2.png", "/images/slideshow/bg3.png" ];
    init();
    $.slogan.addEventListener("scroll", scroll);
    Ti.App.addEventListener("slideshow:refresh", refresh);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("slideshow:refresh", refresh);
        $.destroy();
    });
    __defers["$.__views.__alloyId240!click!do_continue"] && $.addListener($.__views.__alloyId240, "click", do_continue);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;