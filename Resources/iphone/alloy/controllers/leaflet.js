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
                url: leaflist[i].url,
                downloaded: leaflist[i].isDownloaded,
                bottom: 0,
                width: 90
            });
            leafImage.addEventListener("click", function(ex) {
                downloadBrochure(leafImage, ex.source.id, ex.source.leafLet, ex.source.url, ex.source.downloaded);
            });
            leafView.add(leafImage);
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
    function downloadBrochure(adImage, id, content, targetUrl, downloaded) {
        var ind = Titanium.UI.createProgressBar({
            width: "90%",
            height: "40%",
            min: 0,
            max: 1,
            value: 0,
            top: 25,
            message: "",
            font: {
                fontSize: 12
            },
            color: "#CE1D1C"
        });
        ind.show();
        var imageHeight = adImage.size.height;
        var imageWidth = adImage.size.width;
        var gray = Titanium.UI.createView({
            height: imageHeight,
            width: imageWidth,
            backgroundColor: "#A5A5A5",
            opacity: .5,
            bottom: 0
        });
        var label = Ti.UI.createLabel({
            color: "#ffffff",
            font: {
                fontSize: 14,
                fontWeight: "bold"
            },
            text: "",
            top: 15,
            width: "100%",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        var bigView = Titanium.UI.createView({
            height: "15%",
            width: "80%",
            backgroundColor: "#525151",
            opacity: .8,
            zIndex: 99
        });
        if ("1" == downloaded) {
            bigView.remove(gray);
            bigView.remove(ind);
            bigView.remove(label);
            $.brochureView.remove(bigView);
        } else {
            bigView.add(gray);
            bigView.add(ind);
            bigView.add(label);
            $.brochureView.add(bigView);
        }
        PDF.createPdf(content, true, ind, label, function(err, file) {
            if (err) alert(err); else {
                leafletModel.updateDownloadedBrochure(id);
                bigView.remove(gray);
                bigView.remove(ind);
                bigView.remove(label);
                $.brochureView.remove(bigView);
                var myModal = Ti.UI.createWindow({
                    title: "Read PDF",
                    backgroundColor: "transparent",
                    fullscreen: true
                });
                var leftBtn = Ti.UI.createButton({
                    title: "Close",
                    color: "#CE1D1C",
                    left: 15
                });
                var wrapperView = Ti.UI.createView({
                    layout: "vertical",
                    height: Ti.UI.SIZE
                });
                var topView = Ti.UI.createView({
                    backgroundColor: "#EEEEEE",
                    top: 0,
                    height: 40
                });
                var containerView = Ti.UI.createView({
                    height: Ti.UI.SIZE,
                    backgroundColor: "transparent"
                });
                var webview = Ti.UI.createWebView({
                    data: file.read(),
                    height: "auto",
                    backgroundColor: "#ffffff"
                });
                if ("" != targetUrl) {
                    var rightBtn = Ti.UI.createButton({
                        title: "Details",
                        color: "#CE1D1C",
                        right: 15
                    });
                    rightBtn.addEventListener("click", function() {
                        var BackBtn = Ti.UI.createButton({
                            title: "Back",
                            color: "#CE1D1C",
                            right: 15
                        });
                        BackBtn.addEventListener("click", function() {
                            BackBtn.setVisible(false);
                            rightBtn.setVisible(true);
                            webview.setData(file.read());
                            console.log("back trigger");
                        });
                        topView.add(BackBtn);
                        rightBtn.setVisible(false);
                        BackBtn.setVisible(true);
                        webview.setUrl(targetUrl);
                        console.log("details trigger");
                    });
                    topView.add(rightBtn);
                }
                containerView.add(webview);
                topView.add(leftBtn);
                wrapperView.add(topView);
                wrapperView.add(containerView);
                myModal.add(wrapperView);
                myModal.open({
                    modal: true
                });
                leftBtn.addEventListener("click", function() {
                    myModal.close({
                        animated: true
                    });
                });
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "leaflet";
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
    $.__views.brochureView = Ti.UI.createView({
        id: "brochureView",
        backgroundColor: "#828282"
    });
    $.__views.leaftletWin.add($.__views.brochureView);
    $.__views.__alloyId105 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId105"
    });
    $.__views.brochureView.add($.__views.__alloyId105);
    $.__views.scrollview = Ti.UI.createScrollView({
        top: "15",
        id: "scrollview",
        layout: "vertical"
    });
    $.__views.__alloyId105.add($.__views.scrollview);
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
    PDF.construct($);
    loadLeafLetList();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;