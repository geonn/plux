function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadLeafLetList() {
        if (leaflist.length > 0) for (var i = 0; i < leaflist.length; i++) {
            var leafView = Ti.UI.createView({
                bottom: 0,
                right: 5,
                height: 200,
                width: "30%"
            });
            var leafImage = Ti.UI.createImageView({
                id: leaflist[i].id,
                image: leaflist[i].cover,
                backgroundImage: leaflist[i].cover,
                leafLet: leaflist[i].attachment,
                name: leaflist[i].title,
                url: leaflist[i].url,
                downloaded: leaflist[i].isDownloaded,
                defaultImage: "/images/warm-grey-bg.png",
                bottom: 0,
                width: 90
            });
            var activityIndicator = common.showImageIndicator();
            downloadBrochure(leafImage, leaflist[i]);
            leafView.add(leafImage);
            leafView.add(activityIndicator);
            common.imageIndicatorEvent(leafImage, activityIndicator);
            if (i % 3 == 0) {
                var containerView = Ti.UI.createView({
                    bottom: 0,
                    layout: "vertical",
                    height: 220,
                    width: "100%"
                });
                var innerView = Ti.UI.createView({
                    layout: "horizontal",
                    height: Ti.UI.SIZE,
                    width: "100%",
                    left: "5%",
                    right: "5%"
                });
                innerView.add(leafView);
                containerView.add(innerView);
                $.mainView.add(containerView);
            } else {
                innerView.add(leafView);
                if ((i + 1) % 3 == 0) {
                    var lineImg = Ti.UI.createImageView({
                        image: "/images/div.png",
                        width: "100%"
                    });
                    innerView.add(lineImg);
                }
            }
        }
    }
    function downloadBrochure(adImage, content) {
        adImage.addEventListener("click", function() {
            var indView = Ti.UI.createView({
                height: 100,
                layout: "vertical",
                backgroundColor: "#ffffff",
                bottom: 5,
                width: Ti.UI.SIZE
            });
            if ("1" == isDownloading) {
                var label = Ti.UI.createLabel({
                    color: "#CE1D1C",
                    font: {
                        fontSize: 10,
                        fontWeight: "bold"
                    },
                    text: "Please wait until current downloading is done.",
                    bottom: 10,
                    width: "100%",
                    height: 10,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                });
                if ("0" == isDownloadLbl) {
                    $.bigView.add(label);
                    setTimeout(function() {
                        isDownloadLbl = "0";
                        $.bigView.remove(label);
                    }, 3e3);
                }
                isDownloadLbl = "1";
                return false;
            }
            isDownloading = "1";
            var ind = Titanium.UI.createProgressBar({
                width: "90%",
                height: 50,
                min: 0,
                max: 1,
                value: 0,
                top: 5,
                message: "Downloading " + content.title + "...",
                font: {
                    fontSize: 12
                },
                color: "#CE1D1C"
            });
            var label = Ti.UI.createLabel({
                color: "#CE1D1C",
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                text: "0%",
                top: 0,
                width: "100%",
                height: 30,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            if ("1" == content.isDownloaded) {
                indView.remove(ind);
                indView.remove(label);
                $.bigView.setVisible(false);
            } else {
                ind.show();
                indView.add(ind);
                indView.add(label);
                $.bigView.add(indView);
                $.bigView.setVisible(true);
            }
            PDF.createPdf(content.attachment, true, ind, label, indView, function(err, file) {
                if (err) alert(err); else {
                    isDownloading = "0";
                    leafletModel.updateDownloadedBrochure(content.id);
                    indView.hide();
                    $.bigView.remove(indView);
                    console.log("file return : " + file.getNativePath());
                    PDF.android_launch(file);
                }
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "leaflet";
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
    $.__views.leaftletWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Health Leaflet",
        backButtonTitle: "",
        id: "leaftletWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.leaftletWin && $.addTopLevelView($.__views.leaftletWin);
    $.__views.__alloyId183 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId183"
    });
    $.__views.leaftletWin.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId184"
    });
    $.__views.__alloyId183.add($.__views.__alloyId184);
    $.__views.__alloyId185 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId185"
    });
    $.__views.__alloyId184.add($.__views.__alloyId185);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId185.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId184.add($.__views.pageTitle);
    $.__views.__alloyId186 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Health Info",
        textAlign: "center",
        id: "__alloyId186"
    });
    $.__views.pageTitle.add($.__views.__alloyId186);
    $.__views.brochureView = Ti.UI.createView({
        id: "brochureView",
        backgroundColor: "#828282"
    });
    $.__views.__alloyId183.add($.__views.brochureView);
    $.__views.bigView = Ti.UI.createScrollView({
        id: "bigView",
        zIndex: 99,
        height: Ti.UI.SIZE,
        layout: "vertical",
        backgroundColor: "#ffffff",
        opacity: .8,
        bottom: 0,
        width: "80%",
        visible: false
    });
    $.__views.brochureView.add($.__views.bigView);
    $.__views.__alloyId187 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId187"
    });
    $.__views.brochureView.add($.__views.__alloyId187);
    $.__views.scrollview = Ti.UI.createScrollView({
        top: 15,
        id: "scrollview",
        layout: "vertical"
    });
    $.__views.__alloyId187.add($.__views.scrollview);
    $.__views.mainView = Ti.UI.createView({
        id: "mainView",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "100%"
    });
    $.__views.scrollview.add($.__views.mainView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var PDF = require("pdf");
    var leafletModel = Alloy.createCollection("leaflet");
    var leaflist = leafletModel.getLeaftletList();
    loadLeafLetList();
    var isDownloading = "0";
    var isDownloadLbl = "0";
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.leaftletWin);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;