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
        backgroundColor: "#828282"
    });
    $.__views.win.add($.__views.brochureView);
    $.__views.__alloyId160 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId160"
    });
    $.__views.brochureView.add($.__views.__alloyId160);
    $.__views.scrollview = Ti.UI.createScrollView({
        top: "15",
        id: "scrollview",
        layout: "vertical"
    });
    $.__views.__alloyId160.add($.__views.scrollview);
    $.__views.mainView = Ti.UI.createView({
        id: "mainView",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "100%"
    });
    $.__views.scrollview.add($.__views.mainView);
    $.__views.__alloyId161 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId161"
    });
    $.__views.mainView.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        left: "5%",
        right: "5%",
        id: "__alloyId162"
    });
    $.__views.__alloyId161.add($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Calcium_Plus_cover.png",
        mod: "Leaflet_Calcium_plus.pdf",
        backgroundImage: "/images/cover/Leaflet_Calcium_Plus_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId164"
    });
    $.__views.__alloyId163.add($.__views.__alloyId164);
    readLeaflet ? $.__views.__alloyId164.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId164!click!readLeaflet"] = true;
    $.__views.__alloyId165 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId165"
    });
    $.__views.__alloyId162.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Fish_Oil_cover.png",
        mod: "Leaflet_fish_oil.pdf",
        backgroundImage: "/images/cover/Leaflet_Fish_Oil_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    readLeaflet ? $.__views.__alloyId166.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId166!click!readLeaflet"] = true;
    $.__views.__alloyId167 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId167"
    });
    $.__views.__alloyId162.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Vidaylin_Omega_Kid_cover.png",
        mod: "Leaflet_Vidaylin_Omega_kid.pdf",
        backgroundImage: "/images/cover/Leaflet_Vidaylin_Omega_Kid_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
    readLeaflet ? $.__views.__alloyId168.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId168!click!readLeaflet"] = true;
    $.__views.__alloyId169 = Ti.UI.createImageView({
        image: "/images/div.png",
        width: "100%",
        id: "__alloyId169"
    });
    $.__views.__alloyId161.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId170"
    });
    $.__views.mainView.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        left: "5%",
        right: "5%",
        id: "__alloyId171"
    });
    $.__views.__alloyId170.add($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId172"
    });
    $.__views.__alloyId171.add($.__views.__alloyId172);
    $.__views.__alloyId173 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Surbex_Protect_cover.png",
        mod: "Leaflet_Surbex_Protect.pdf",
        backgroundImage: "/images/cover/Leaflet_Surbex_Protect_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId173"
    });
    $.__views.__alloyId172.add($.__views.__alloyId173);
    readLeaflet ? $.__views.__alloyId173.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId173!click!readLeaflet"] = true;
    $.__views.__alloyId174 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId174"
    });
    $.__views.__alloyId171.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Vidaylin_MiniBear_cover.png",
        mod: "Leaflet_Vidaylin_minibear.pdf",
        backgroundImage: "/images/cover/Leaflet_Vidaylin_MiniBear_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId175"
    });
    $.__views.__alloyId174.add($.__views.__alloyId175);
    readLeaflet ? $.__views.__alloyId175.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId175!click!readLeaflet"] = true;
    $.__views.__alloyId176 = Ti.UI.createImageView({
        image: "/images/div.png",
        width: "100%",
        id: "__alloyId176"
    });
    $.__views.__alloyId170.add($.__views.__alloyId176);
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
    __defers["$.__views.__alloyId164!click!readLeaflet"] && $.__views.__alloyId164.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId166!click!readLeaflet"] && $.__views.__alloyId166.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId168!click!readLeaflet"] && $.__views.__alloyId168.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId173!click!readLeaflet"] && $.__views.__alloyId173.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId175!click!readLeaflet"] && $.__views.__alloyId175.addEventListener("click", readLeaflet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;