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
        id: "main"
    });
    $.__views.news.add($.__views.main);
<<<<<<< HEAD
    var __alloyId223 = [];
=======
    var __alloyId225 = [];
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
    __alloyId223.push($.__views.myContentView);
=======
    __alloyId225.push($.__views.myContentView);
>>>>>>> origin/master
    $.__views.newsTitle = Ti.UI.createLabel({
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
        font: {
            fontSize: "10dp"
        },
        color: "#9E9E9E",
        left: "8dp",
        top: "8dp",
        text: "",
        id: "newsDate"
    });
    $.__views.myContentView.add($.__views.newsDate);
<<<<<<< HEAD
    $.__views.__alloyId222 = Ti.UI.createScrollableView({
        views: __alloyId223,
        showPagingControl: "false",
        id: "__alloyId222"
    });
    $.__views.main.add($.__views.__alloyId222);
=======
    $.__views.__alloyId224 = Ti.UI.createScrollableView({
        views: __alloyId225,
        showPagingControl: "false",
        id: "__alloyId224"
    });
    $.__views.main.add($.__views.__alloyId224);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var news_id = args.news_id;
    var newsFeedModel = Alloy.createCollection("health_news_feed");
    var newsElementModel = Alloy.createCollection("news_element");
    var categoryModel = Alloy.createCollection("category");
    var news = newsFeedModel.getRecordsById(news_id);
    var details = newsElementModel.getListByNews(news_id);
    var pageCate = categoryModel.getCategoryById(news.category);
    $.news.title = pageCate.category;
    $.newsTitle.setText(news.title);
    $.newsImage.setImage(news.images);
    $.newsDate.setText(timeFormat(news.updated));
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;