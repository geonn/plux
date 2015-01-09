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
    $.__views.leaflet = Ti.UI.createWindow({
        title: "Health Leaflet",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "leaflet"
    });
    $.__views.leaflet && $.addTopLevelView($.__views.leaflet);
    $.__views.brochureView = Ti.UI.createView({
        id: "brochureView",
        backgroundImage: "/images/wood_background.jpg"
    });
    $.__views.leaflet.add($.__views.brochureView);
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId19"
    });
    $.__views.brochureView.add($.__views.__alloyId19);
    $.__views.scrollview = Ti.UI.createScrollView({
        top: "15",
        id: "scrollview",
        layout: "vertical"
    });
    $.__views.__alloyId19.add($.__views.scrollview);
    $.__views.mainView = Ti.UI.createView({
        id: "mainView",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "100%"
    });
    $.__views.scrollview.add($.__views.mainView);
    $.__views.__alloyId20 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId20"
    });
    $.__views.mainView.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        bottom: "0",
        left: "5%",
        right: "5%",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createImageView({
        image: "/images/default_cover.jpg",
        mod: "Leaflet_Calcium_plus.pdf",
        backgroundImage: "/images/default_cover.jpg",
        bottom: "0",
        width: "90",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    readLeaflet ? $.__views.__alloyId23.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId23!click!readLeaflet"] = true;
    $.__views.__alloyId24 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId24"
    });
    $.__views.__alloyId21.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createImageView({
        image: "/images/default_cover.jpg",
        mod: "Leaflet_fish_oil.pdf",
        backgroundImage: "/images/default_cover.jpg",
        bottom: "0",
        width: "90",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    readLeaflet ? $.__views.__alloyId25.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId25!click!readLeaflet"] = true;
    $.__views.__alloyId26 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId26"
    });
    $.__views.__alloyId21.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createImageView({
        image: "/images/default_cover.jpg",
        mod: "Leaflet_Nato_ALA.pdf",
        backgroundImage: "/images/default_cover.jpg",
        bottom: "0",
        width: "90",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    readLeaflet ? $.__views.__alloyId27.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId27!click!readLeaflet"] = true;
    $.__views.__alloyId28 = Ti.UI.createImageView({
        image: "/images/wood_rack.png",
        top: "0",
        width: "100%",
        right: "5,",
        left: "5",
        id: "__alloyId28"
    });
    $.__views.__alloyId21.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId29"
    });
    $.__views.mainView.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        bottom: "0",
        left: "5%",
        right: "5%",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createImageView({
        image: "/images/default_cover.jpg",
        mod: "Leaflet_Surbex_Protect.pdf",
        backgroundImage: "/images/default_cover.jpg",
        bottom: "0",
        width: "90",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    readLeaflet ? $.__views.__alloyId32.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId32!click!readLeaflet"] = true;
    $.__views.__alloyId33 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId33"
    });
    $.__views.__alloyId30.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createImageView({
        image: "/images/default_cover.jpg",
        mod: "Leaflet_Vidaylin_minibear.pdf",
        backgroundImage: "/images/default_cover.jpg",
        bottom: "0",
        width: "90",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    readLeaflet ? $.__views.__alloyId34.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId34!click!readLeaflet"] = true;
    $.__views.__alloyId35 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId35"
    });
    $.__views.__alloyId30.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createImageView({
        image: "/images/default_cover.jpg",
        mod: "Leaflet_Vidaylin_Omega_kid.pdf",
        backgroundImage: "/images/default_cover.jpg",
        bottom: "0",
        width: "90",
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    readLeaflet ? $.__views.__alloyId36.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId36!click!readLeaflet"] = true;
    $.__views.__alloyId37 = Ti.UI.createImageView({
        image: "/images/wood_rack.png",
        top: "0",
        width: "100%",
        right: "5,",
        left: "5",
        id: "__alloyId37"
    });
    $.__views.__alloyId30.add($.__views.__alloyId37);
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
    __defers["$.__views.__alloyId23!click!readLeaflet"] && $.__views.__alloyId23.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId25!click!readLeaflet"] && $.__views.__alloyId25.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId27!click!readLeaflet"] && $.__views.__alloyId27.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId32!click!readLeaflet"] && $.__views.__alloyId32.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId34!click!readLeaflet"] && $.__views.__alloyId34.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId36!click!readLeaflet"] && $.__views.__alloyId36.addEventListener("click", readLeaflet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;