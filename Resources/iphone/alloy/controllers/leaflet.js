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
        fullscreen: true,
        title: "Health Leaflet",
        backButtonTitle: "",
        id: "win",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.brochureView = Ti.UI.createView({
        id: "brochureView",
        backgroundImage: "/images/wood_background.jpg"
    });
    $.__views.win.add($.__views.brochureView);
    $.__views.__alloyId121 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId121"
    });
    $.__views.brochureView.add($.__views.__alloyId121);
    $.__views.scrollview = Ti.UI.createScrollView({
        top: "15",
        id: "scrollview",
        layout: "vertical"
    });
    $.__views.__alloyId121.add($.__views.scrollview);
    $.__views.mainView = Ti.UI.createView({
        id: "mainView",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "100%"
    });
    $.__views.scrollview.add($.__views.mainView);
    $.__views.__alloyId122 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId122"
    });
    $.__views.mainView.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        bottom: "0",
        left: "5%",
        right: "5%",
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId124"
    });
<<<<<<< HEAD
    $.__views.__alloyId123.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createImageView({
=======
    $.__views.__alloyId110.add($.__views.__alloyId111);
    $.__views.__alloyId112 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        image: "/images/cover/Leaflet_Calcium_Plus_cover.png",
        mod: "Leaflet_Calcium_plus.pdf",
        backgroundImage: "/images/cover/Leaflet_Calcium_Plus_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId125"
    });
    $.__views.__alloyId124.add($.__views.__alloyId125);
    readLeaflet ? $.__views.__alloyId125.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId125!click!readLeaflet"] = true;
    $.__views.__alloyId126 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId126"
    });
<<<<<<< HEAD
    $.__views.__alloyId123.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createImageView({
=======
    $.__views.__alloyId110.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        image: "/images/cover/Leaflet_Fish_Oil_cover.png",
        mod: "Leaflet_fish_oil.pdf",
        backgroundImage: "/images/cover/Leaflet_Fish_Oil_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId127"
    });
    $.__views.__alloyId126.add($.__views.__alloyId127);
    readLeaflet ? $.__views.__alloyId127.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId127!click!readLeaflet"] = true;
    $.__views.__alloyId128 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId128"
    });
<<<<<<< HEAD
    $.__views.__alloyId123.add($.__views.__alloyId128);
    $.__views.__alloyId129 = Ti.UI.createImageView({
=======
    $.__views.__alloyId110.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        image: "/images/cover/Leaflet_Nato_ALA_cover.png",
        mod: "Leaflet_Nato_ALA.pdf",
        backgroundImage: "/images/cover/Leaflet_Nato_ALA_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
    readLeaflet ? $.__views.__alloyId129.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId129!click!readLeaflet"] = true;
    $.__views.__alloyId130 = Ti.UI.createImageView({
        image: "/images/wood_rack.png",
        top: "0",
        width: "100%",
        right: "5,",
        left: "5",
        id: "__alloyId130"
    });
    $.__views.__alloyId123.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId131"
    });
    $.__views.mainView.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        bottom: "0",
        left: "5%",
        right: "5%",
        id: "__alloyId132"
    });
    $.__views.__alloyId131.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId133"
    });
<<<<<<< HEAD
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createImageView({
=======
    $.__views.__alloyId119.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
        image: "/images/cover/Leaflet_Surbex_Protect_cover.png",
        mod: "Leaflet_Surbex_Protect.pdf",
        backgroundImage: "/images/cover/Leaflet_Surbex_Protect_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId134"
    });
    $.__views.__alloyId133.add($.__views.__alloyId134);
    readLeaflet ? $.__views.__alloyId134.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId134!click!readLeaflet"] = true;
    $.__views.__alloyId135 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId135"
    });
    $.__views.__alloyId132.add($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Vidaylin_MiniBear_cover.png",
        mod: "Leaflet_Vidaylin_minibear.pdf",
        backgroundImage: "/images/cover/Leaflet_Vidaylin_MiniBear_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId136"
    });
    $.__views.__alloyId135.add($.__views.__alloyId136);
    readLeaflet ? $.__views.__alloyId136.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId136!click!readLeaflet"] = true;
    $.__views.__alloyId137 = Ti.UI.createView({
        bottom: "0",
        height: Ti.UI.SIZE,
        width: "30%",
        right: "5",
        id: "__alloyId137"
    });
    $.__views.__alloyId132.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Vidaylin_Omega_Kid_cover.png",
        mod: "Leaflet_Vidaylin_Omega_kid.pdf",
        backgroundImage: "/images/cover/Leaflet_Vidaylin_Omega_Kid_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
    readLeaflet ? $.__views.__alloyId138.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId138!click!readLeaflet"] = true;
    $.__views.__alloyId139 = Ti.UI.createImageView({
        image: "/images/wood_rack.png",
        top: "0",
        width: "100%",
        right: "5,",
        left: "5",
        id: "__alloyId139"
    });
    $.__views.__alloyId132.add($.__views.__alloyId139);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    require("pdf");
    $.win.title = args.title;
    var readLeaflet = function(e) {
        docViewer = Ti.UI.iOS.createDocumentViewer({
            url: "/pdf/" + e.source.mod
        });
        docViewer.show();
    };
    __defers["$.__views.__alloyId125!click!readLeaflet"] && $.__views.__alloyId125.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId127!click!readLeaflet"] && $.__views.__alloyId127.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId129!click!readLeaflet"] && $.__views.__alloyId129.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId134!click!readLeaflet"] && $.__views.__alloyId134.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId136!click!readLeaflet"] && $.__views.__alloyId136.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId138!click!readLeaflet"] && $.__views.__alloyId138.addEventListener("click", readLeaflet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;