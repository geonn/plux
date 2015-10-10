function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function render_card(entry) {
        var front = Ti.UI.createView({
            name: "front",
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            id: entry.id,
            top: 0,
            currentAngle: 10
        });
        var memno_text = Ti.UI.createLabel({
            classes: [ "wsize", "hsize" ],
            text: entry.memno,
            top: "70dp",
            left: "10dp",
            zIndex: 12,
            font: {
                fontSize: "12dp"
            },
            color: "#ffffff"
        });
        var name_text = Ti.UI.createLabel({
            classes: [ "wsize", "hsize" ],
            text: entry.name,
            top: "55dp",
            left: "10dp",
            zIndex: 12,
            font: {
                fontSize: "12dp"
            },
            color: "#ffffff"
        });
        var imageview_card = Ti.UI.createImageView({
            classes: [ "wfill", "hsize" ],
            image: "/eCard-front.png"
        });
        front.add(imageview_card);
        front.add(name_text);
        front.add(memno_text);
        return front;
    }
    function render_ecard_list() {
        $.inner_box.removeAllChildren();
        for (var i = 0; i < data.length; i++) {
            console.log(panelWidth + " " + Math.floor(.65 * pWidth));
            var viewTemplate = {
                height: 150,
                id: data[i].id,
                width: Math.floor(.65 * pWidth),
                opacity: 0
            };
            cards.push(Ti.UI.createView(viewTemplate));
            cardContent.push(render_card(data[i]));
            cards[cards.length - 1].left = panelWidth * (cards.length - 1) + (panelWidth - cards[cards.length - 1].width) / 2;
            cards[cards.length - 1].add(cardContent[cards.length - 1]);
            scrollView.add(cards[cards.length - 1]);
            cards[cards.length - 1].animate({
                opacity: 1,
                duration: 500
            });
        }
        scrollView.width = panelWidth * cards.length;
        $.inner_box.add(scrollView);
        $.inner_box.add(scrollViewDrag);
        var x = 0;
        var dragStartTime = 0;
        scrollViewDrag.addEventListener("click", function() {
            navToEcard(index);
        });
        scrollViewDrag.addEventListener("touchstart", function(e) {
            x = e.x;
            dragStartTime = new Date().getTime();
        });
        scrollViewDrag.addEventListener("touchmove", function(e) {
            scrollView.left = -1 * index * panelWidth + leftPadding + e.x - x;
        });
        scrollViewDrag.addEventListener("touchend", function(e) {
            var dragEndTime = new Date().getTime();
            200 > dragEndTime - dragStartTime && e.x < x - 20 ? nextCard() : 200 > dragEndTime - dragStartTime && e.x > x + 20 ? prevCard() : e.x < x - cards[index].width / 2 ? nextCard() : e.x > x + cards[index].width / 2 ? prevCard() : scrollTo(index);
        });
        scrollView.addEventListener("touchCancel", function() {
            scrollTo(index);
        });
    }
    function scrollTo(i) {
        if (cards[i]) {
            scrollView.animate(a.x(-1 * i * panelWidth + leftPadding, 300, 0));
            index = i;
            return true;
        }
        scrollTo(index);
        return false;
    }
    function nextCard() {
        scrollTo(index + 1);
    }
    function prevCard() {
        scrollTo(index - 1);
    }
    function navToEcard(index) {
        console.log(cards[index].id + " u_id");
        nav.navigateWithArgs("asp/eCard", {
            u_id: cards[index].id
        });
    }
    function refresh() {
        loading.start();
        var usersModel = Alloy.createCollection("users");
        data = usersModel.getUserByEmpNo();
        render_ecard_list();
        loading.finish();
    }
    function init() {
        $.inner_box.add(loading.getView());
        refresh();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/eCard_list";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#fff",
        fullscreen: true,
        id: "win",
        title: "ASP eCARD",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId265 = Ti.UI.createView({
        top: "0",
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId265"
    });
    $.__views.win.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId266"
    });
    $.__views.__alloyId265.add($.__views.__alloyId266);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId266.add($.__views.btnBack);
    $.__views.__alloyId267 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId267"
    });
    $.__views.__alloyId265.add($.__views.__alloyId267);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "eCard List",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId267.add($.__views.pageTitle);
    $.__views.inner_box = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "inner_box"
    });
    $.__views.win.add($.__views.inner_box);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var loading = Alloy.createController("loading");
    var data = [];
    var cards = [];
    var cardContent = [];
    var index = 0;
    var a = {
        move: function(x, y, curve, duration, delay) {
            return Ti.UI.createAnimation({
                left: x,
                top: y,
                curve: curve,
                duration: duration,
                delay: delay
            });
        },
        x: function(x, duration, delay) {
            return Ti.UI.createAnimation({
                left: x,
                curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
                duration: duration,
                delay: delay
            });
        }
    };
    var pWidth;
    var temp = 100 * value / 320;
    var pWidth = parseInt(Alloy.Globals.platformWidth * temp / 100);
    var panelWidth = Math.floor(.7 * pWidth);
    var leftPadding = (pWidth - panelWidth) / 2;
    var scrollView = Ti.UI.createView({
        left: leftPadding,
        top: 0
    });
    var scrollViewDrag = Ti.UI.createView({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    });
    init();
    Ti.App.addEventListener("eCard_list:refresh", refresh);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("eCard_list:refresh", refresh);
        $.destroy();
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;