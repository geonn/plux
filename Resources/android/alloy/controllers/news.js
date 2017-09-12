function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "news";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.news = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "",
        backButtonTitle: "",
        id: "news",
        navTintColor: "#CE1D1C"
    });
    $.__views.news && $.addTopLevelView($.__views.news);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#ffffff",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "main",
        layout: "vertical"
    });
    $.__views.news.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId236 = Ti.UI.createView({
=======
    $.__views.__alloyId204 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId236"
    });
    $.__views.main.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId237"
    });
    $.__views.__alloyId236.add($.__views.__alloyId237);
=======
        id: "__alloyId204"
    });
    $.__views.main.add($.__views.__alloyId204);
    $.__views.__alloyId205 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId205"
    });
    $.__views.__alloyId204.add($.__views.__alloyId205);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId237.add($.__views.btnBack);
    $.__views.__alloyId238 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId238"
    });
    $.__views.__alloyId236.add($.__views.__alloyId238);
=======
    $.__views.__alloyId205.add($.__views.btnBack);
    $.__views.__alloyId206 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId206"
    });
    $.__views.__alloyId204.add($.__views.__alloyId206);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Health Article",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId238.add($.__views.pageTitle);
    var __alloyId240 = [];
=======
    $.__views.__alloyId206.add($.__views.pageTitle);
    var __alloyId208 = [];
>>>>>>> origin/master
    $.__views.myContentView = Ti.UI.createScrollView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        layout: "vertical",
        id: "myContentView",
        contentHeight: "auto",
        contentWidth: Ti.UI.FILL
    });
<<<<<<< HEAD
    __alloyId240.push($.__views.myContentView);
=======
    __alloyId208.push($.__views.myContentView);
>>>>>>> origin/master
    $.__views.newsTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#1C1C1C",
        wordWrap: true,
        font: {
            fontSize: "20dp"
        },
        left: "10dp",
        right: "10dp",
        bottom: "10dp",
        top: "10dp",
        id: "newsTitle"
    });
    $.__views.myContentView.add($.__views.newsTitle);
    $.__views.newsImage = Ti.UI.createImageView({
        width: Titanium.UI.FILL,
        height: "auto",
        id: "newsImage",
        image: ""
    });
    $.__views.myContentView.add($.__views.newsImage);
    $.__views.newsDate = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#9E9E9E",
        font: {
            fontSize: "10dp"
        },
        left: "8dp",
        top: "8dp",
        id: "newsDate"
    });
    $.__views.myContentView.add($.__views.newsDate);
<<<<<<< HEAD
    $.__views.__alloyId239 = Ti.UI.createScrollableView({
        views: __alloyId240,
        showPagingControl: false,
        id: "__alloyId239"
    });
    $.__views.main.add($.__views.__alloyId239);
=======
    $.__views.__alloyId207 = Ti.UI.createScrollableView({
        views: __alloyId208,
        showPagingControl: false,
        id: "__alloyId207"
    });
    $.__views.main.add($.__views.__alloyId207);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var news_id = args.news_id;
    var newsFeedModel = Alloy.createCollection("health_news_feed");
    var newsElementModel = Alloy.createCollection("news_element");
    var categoryModel = Alloy.createCollection("categorys");
    var news = newsFeedModel.getRecordsById(news_id);
    var details = newsElementModel.getListByNews(news_id);
    categoryModel.getCategoryById(news.category);
    console.log(news);
    $.newsTitle.text = news.title;
    $.newsImage.image = news.images;
    $.newsDate.text = timeFormat(news.updated);
    details.forEach(function(entry) {
        if ("1" == entry.type) {
            var dynaLabel = $.UI.create("Label", {
                text: entry.content,
                classes: [ "news_subtitle" ]
            });
            $.myContentView.add(dynaLabel);
        }
        if ("2" == entry.type) {
            var msg = entry.content;
            msg = msg.replace(/<br\/>/g, "\r\n");
            var dynaLabel = $.UI.create("Label", {
                text: msg,
                classes: [ "news_paragraph" ]
            });
            $.myContentView.add(dynaLabel);
        }
        if ("3" == entry.type) {
            var dynaImage = Ti.UI.createImageView({
                image: entry.images
            });
            $.myContentView.add(dynaImage);
            var msg = entry.content;
            msg = msg.replace(/<br\/>/g, "\r\n");
            var dynaLabel = $.UI.create("Label", {
                text: msg,
                classes: [ "image_caption" ]
            });
            $.myContentView.add(dynaLabel);
        }
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.news);
    });
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;