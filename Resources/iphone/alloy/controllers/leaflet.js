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
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Health Leaflet",
        backButtonTitle: "",
        id: "win",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.brochureView = Ti.UI.createView({
        id: "brochureView",
        backgroundColor: "#828282"
    });
    $.__views.win.add($.__views.brochureView);
    $.__views.__alloyId104 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId104"
    });
    $.__views.brochureView.add($.__views.__alloyId104);
    $.__views.scrollview = Ti.UI.createScrollView({
        top: "15",
        id: "scrollview",
        layout: "vertical"
    });
    $.__views.__alloyId104.add($.__views.scrollview);
    $.__views.mainView = Ti.UI.createView({
        id: "mainView",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "100%"
    });
    $.__views.scrollview.add($.__views.mainView);
    $.__views.__alloyId105 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId105"
    });
    $.__views.mainView.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        left: "5%",
        right: "5%",
        id: "__alloyId106"
    });
    $.__views.__alloyId105.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId107"
    });
    $.__views.__alloyId106.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Calcium_Plus_cover.png",
        mod: "Leaflet_Calcium_plus.pdf",
        backgroundImage: "/images/cover/Leaflet_Calcium_Plus_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId108"
    });
    $.__views.__alloyId107.add($.__views.__alloyId108);
    readLeaflet ? $.__views.__alloyId108.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId108!click!readLeaflet"] = true;
    $.__views.__alloyId109 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId109"
    });
    $.__views.__alloyId106.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Fish_Oil_cover.png",
        mod: "Leaflet_fish_oil.pdf",
        backgroundImage: "/images/cover/Leaflet_Fish_Oil_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId110"
    });
    $.__views.__alloyId109.add($.__views.__alloyId110);
    readLeaflet ? $.__views.__alloyId110.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId110!click!readLeaflet"] = true;
    $.__views.__alloyId111 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId111"
    });
    $.__views.__alloyId106.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Vidaylin_Omega_Kid_cover.png",
        mod: "Leaflet_Vidaylin_Omega_kid.pdf",
        backgroundImage: "/images/cover/Leaflet_Vidaylin_Omega_Kid_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId112"
    });
    $.__views.__alloyId111.add($.__views.__alloyId112);
    readLeaflet ? $.__views.__alloyId112.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId112!click!readLeaflet"] = true;
    $.__views.__alloyId113 = Ti.UI.createImageView({
        image: "/images/div.png",
        width: "100%",
        id: "__alloyId113"
    });
    $.__views.__alloyId105.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId114"
    });
    $.__views.mainView.add($.__views.__alloyId114);
    $.__views.__alloyId115 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        left: "5%",
        right: "5%",
        id: "__alloyId115"
    });
    $.__views.__alloyId114.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Surbex_Protect_cover.png",
        mod: "Leaflet_Surbex_Protect.pdf",
        backgroundImage: "/images/cover/Leaflet_Surbex_Protect_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId117"
    });
    $.__views.__alloyId116.add($.__views.__alloyId117);
    readLeaflet ? $.__views.__alloyId117.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId117!click!readLeaflet"] = true;
    $.__views.__alloyId118 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId118"
    });
    $.__views.__alloyId115.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Vidaylin_MiniBear_cover.png",
        mod: "Leaflet_Vidaylin_minibear.pdf",
        backgroundImage: "/images/cover/Leaflet_Vidaylin_MiniBear_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId119"
    });
    $.__views.__alloyId118.add($.__views.__alloyId119);
    readLeaflet ? $.__views.__alloyId119.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId119!click!readLeaflet"] = true;
    $.__views.__alloyId120 = Ti.UI.createImageView({
        image: "/images/div.png",
        width: "100%",
        id: "__alloyId120"
    });
    $.__views.__alloyId114.add($.__views.__alloyId120);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    require("pdf");
    var readLeaflet = function(e) {
        docViewer = Ti.UI.iOS.createDocumentViewer({
            url: "/pdf/" + e.source.mod
        });
        docViewer.show();
    };
    __defers["$.__views.__alloyId108!click!readLeaflet"] && $.__views.__alloyId108.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId110!click!readLeaflet"] && $.__views.__alloyId110.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId112!click!readLeaflet"] && $.__views.__alloyId112.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId117!click!readLeaflet"] && $.__views.__alloyId117.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId119!click!readLeaflet"] && $.__views.__alloyId119.addEventListener("click", readLeaflet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;