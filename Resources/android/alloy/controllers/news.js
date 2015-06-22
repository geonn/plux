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