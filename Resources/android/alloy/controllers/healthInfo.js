function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function displayHealthInfo() {
        var tableData = [];
        for (var i = 0; i < cateList.length; i++) {
            var newsList = newsFeedModel.getRecordsListByCategory(cateList[i].id);
            if (newsList.length > 0) {
                var sectionNews = Ti.UI.createTableViewSection({
                    headerTitle: cateList[i].category
                });
                var data = [];
                for (var j = 0; j < newsList.length; j++) {
                    var row = Titanium.UI.createTableViewRow({
                        touchEnabled: true,
                        source: newsList[j].id,
                        backgroundSelectedColor: "#FFE1E1",
                        backgroundGradient: {
                            type: "linear",
                            colors: [ "#fff", "#F7F7F6" ],
                            startPoint: {
                                x: 0,
                                y: 0
                            },
                            endPoint: {
                                x: "100%",
                                y: 0
                            },
                            backFillStart: false
                        }
                    });
                    var row_view = Ti.UI.createView({
                        left: 5,
                        top: 5,
                        right: 5,
                        bottom: 5,
                        height: 80,
                        width: Ti.UI.FILL,
                        layout: "horizontal"
                    });
                    var tblView = Ti.UI.createView({
                        layout: "vertical",
                        height: "80",
                        width: "auto"
                    });
                    var imageContainer = Ti.UI.createView({
                        height: 80,
                        source: newsList[j].id,
                        width: 112
                    });
                    if ("" == newsList[j].images) {
                        var leftImage = Ti.UI.createImageView({
                            image: "/images/warm-grey-bg.png",
                            source: newsList[j].id,
                            width: "100%"
                        });
                        imageContainer.add(leftImage);
                    } else {
                        var leftImage = Ti.UI.createImageView({
                            image: newsList[j].images,
                            source: newsList[j].id,
                            defaultImage: "/images/warm-grey-bg.png",
                            width: "90%"
                        });
                        var activityIndicator = common.showImageIndicator();
                        imageContainer.add(leftImage);
                        imageContainer.add(activityIndicator);
                        common.imageIndicatorEvent(leftImage, activityIndicator);
                    }
                    var popUpTitle = Titanium.UI.createLabel({
                        text: newsList[j].title,
                        font: {
                            fontSize: 14,
                            fontWeight: "bold"
                        },
                        source: newsList[j].id,
                        color: "#848484",
                        width: Ti.UI.FILL,
                        height: Ti.UI.SIZE,
                        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                        wordwrap: false,
                        ellipsize: true
                    });
                    var category = Titanium.UI.createLabel({
                        text: newsList[j].long_title,
                        source: newsList[j].id,
                        font: {
                            fontSize: 11
                        },
                        color: "#848484",
                        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                        width: Ti.UI.FILL,
                        height: 30
                    });
                    var supplier = Titanium.UI.createLabel({
                        text: newsList[j].updated,
                        source: newsList[j].id,
                        font: {
                            fontSize: 11
                        },
                        color: "#848484",
                        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
                        width: Ti.UI.FILL,
                        height: Ti.UI.SIZE
                    });
                    row.addEventListener("click", function(e) {
                        viewDetails(e);
                    });
                    tblView.add(popUpTitle);
                    tblView.add(category);
                    tblView.add(supplier);
                    row_view.add(imageContainer);
                    row_view.add(tblView);
                    row.add(row_view);
                    data.push(row);
                    sectionNews.add(row);
                }
                tableData.push(sectionNews);
            }
        }
        $.infoTable.setData(tableData);
    }
    function viewDetails(e) {
        var nav = require("navigation");
        nav.navigateWithArgs("news", {
            news_id: e.source.source
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "healthInfo";
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
    $.__views.healthInfoWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Health Info",
        backButtonTitle: "",
        id: "healthInfoWindow",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthInfoWindow && $.addTopLevelView($.__views.healthInfoWindow);
<<<<<<< HEAD
    $.__views.__alloyId145 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId145"
    });
    $.__views.healthInfoWindow.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createView({
=======
    $.__views.__alloyId133 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId133"
    });
    $.__views.healthInfoWindow.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId146"
    });
    $.__views.__alloyId145.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId147"
    });
    $.__views.__alloyId146.add($.__views.__alloyId147);
=======
        id: "__alloyId134"
    });
    $.__views.__alloyId133.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId147.add($.__views.btnBack);
=======
    $.__views.__alloyId135.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId146.add($.__views.pageTitle);
    $.__views.__alloyId148 = Ti.UI.createLabel({
=======
    $.__views.__alloyId134.add($.__views.pageTitle);
    $.__views.__alloyId136 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Health Info",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId148"
    });
    $.__views.pageTitle.add($.__views.__alloyId148);
    $.__views.healthInfoView = Ti.UI.createView({
        id: "healthInfoView"
    });
    $.__views.__alloyId145.add($.__views.healthInfoView);
=======
        id: "__alloyId136"
    });
    $.__views.pageTitle.add($.__views.__alloyId136);
    $.__views.healthInfoView = Ti.UI.createView({
        id: "healthInfoView"
    });
    $.__views.__alloyId133.add($.__views.healthInfoView);
>>>>>>> origin/master
    $.__views.infoTable = Ti.UI.createTableView({
        id: "infoTable"
    });
    $.__views.healthInfoView.add($.__views.infoTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var newsFeedModel = Alloy.createCollection("health_news_feed");
    var categoryModel = Alloy.createCollection("category");
    var cateList = categoryModel.getCategoryList();
    displayHealthInfo();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthInfoWindow);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;