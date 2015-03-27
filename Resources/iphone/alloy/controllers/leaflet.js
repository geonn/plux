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
    $.__views.__alloyId176 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId176"
    });
    $.__views.brochureView.add($.__views.__alloyId176);
    $.__views.scrollview = Ti.UI.createScrollView({
        top: "15",
        id: "scrollview",
        layout: "vertical"
    });
    $.__views.__alloyId176.add($.__views.scrollview);
    $.__views.mainView = Ti.UI.createView({
        id: "mainView",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "100%"
    });
    $.__views.scrollview.add($.__views.mainView);
    $.__views.__alloyId177 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId177"
    });
    $.__views.mainView.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        left: "5%",
        right: "5%",
        id: "__alloyId178"
    });
    $.__views.__alloyId177.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId179"
    });
    $.__views.__alloyId178.add($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Calcium_Plus_cover.png",
        mod: "Leaflet_Calcium_plus.pdf",
        backgroundImage: "/images/cover/Leaflet_Calcium_Plus_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId180"
    });
    $.__views.__alloyId179.add($.__views.__alloyId180);
    readLeaflet ? $.__views.__alloyId180.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId180!click!readLeaflet"] = true;
    $.__views.__alloyId181 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId181"
    });
    $.__views.__alloyId178.add($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Fish_Oil_cover.png",
        mod: "Leaflet_fish_oil.pdf",
        backgroundImage: "/images/cover/Leaflet_Fish_Oil_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId182"
    });
    $.__views.__alloyId181.add($.__views.__alloyId182);
    readLeaflet ? $.__views.__alloyId182.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId182!click!readLeaflet"] = true;
    $.__views.__alloyId183 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId183"
    });
    $.__views.__alloyId178.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Vidaylin_Omega_Kid_cover.png",
        mod: "Leaflet_Vidaylin_Omega_kid.pdf",
        backgroundImage: "/images/cover/Leaflet_Vidaylin_Omega_Kid_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId184"
    });
    $.__views.__alloyId183.add($.__views.__alloyId184);
    readLeaflet ? $.__views.__alloyId184.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId184!click!readLeaflet"] = true;
    $.__views.__alloyId185 = Ti.UI.createImageView({
        image: "/images/div.png",
        width: "100%",
        id: "__alloyId185"
    });
    $.__views.__alloyId177.add($.__views.__alloyId185);
    $.__views.__alloyId186 = Ti.UI.createView({
        textAlign: "center",
        bottom: "0",
        layout: "vertical",
        height: "220",
        width: "100%",
        id: "__alloyId186"
    });
    $.__views.mainView.add($.__views.__alloyId186);
    $.__views.__alloyId187 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        left: "5%",
        right: "5%",
        id: "__alloyId187"
    });
    $.__views.__alloyId186.add($.__views.__alloyId187);
    $.__views.__alloyId188 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId188"
    });
    $.__views.__alloyId187.add($.__views.__alloyId188);
    $.__views.__alloyId189 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Surbex_Protect_cover.png",
        mod: "Leaflet_Surbex_Protect.pdf",
        backgroundImage: "/images/cover/Leaflet_Surbex_Protect_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId189"
    });
    $.__views.__alloyId188.add($.__views.__alloyId189);
    readLeaflet ? $.__views.__alloyId189.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId189!click!readLeaflet"] = true;
    $.__views.__alloyId190 = Ti.UI.createView({
        bottom: "0",
        height: "200",
        width: "30%",
        right: "5",
        id: "__alloyId190"
    });
    $.__views.__alloyId187.add($.__views.__alloyId190);
    $.__views.__alloyId191 = Ti.UI.createImageView({
        image: "/images/cover/Leaflet_Vidaylin_MiniBear_cover.png",
        mod: "Leaflet_Vidaylin_minibear.pdf",
        backgroundImage: "/images/cover/Leaflet_Vidaylin_MiniBear_cover.png",
        bottom: "0",
        width: "90",
        id: "__alloyId191"
    });
    $.__views.__alloyId190.add($.__views.__alloyId191);
    readLeaflet ? $.__views.__alloyId191.addEventListener("click", readLeaflet) : __defers["$.__views.__alloyId191!click!readLeaflet"] = true;
    $.__views.__alloyId192 = Ti.UI.createImageView({
        image: "/images/div.png",
        width: "100%",
        id: "__alloyId192"
    });
    $.__views.__alloyId186.add($.__views.__alloyId192);
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
    __defers["$.__views.__alloyId180!click!readLeaflet"] && $.__views.__alloyId180.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId182!click!readLeaflet"] && $.__views.__alloyId182.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId184!click!readLeaflet"] && $.__views.__alloyId184.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId189!click!readLeaflet"] && $.__views.__alloyId189.addEventListener("click", readLeaflet);
    __defers["$.__views.__alloyId191!click!readLeaflet"] && $.__views.__alloyId191.addEventListener("click", readLeaflet);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;