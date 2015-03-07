function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function navWindow(e) {
        var title = e.source.mod;
        var nav = require("navigation");
        nav.navigationWindow("leaflet", "", "", {
            title: title
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "leafletCategory";
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
    $.__views.leafletCategory = Ti.UI.createWindow({
        fullscreen: true,
        title: "Leaflet",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "leafletCategory"
    });
    $.__views.leafletCategory && $.addTopLevelView($.__views.leafletCategory);
    $.__views.main = Ti.UI.createView({
        backgroundColor: "#4A4A4A",
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "main"
    });
    $.__views.leafletCategory.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId140 = Ti.UI.createScrollView({
=======
<<<<<<< HEAD
    $.__views.__alloyId177 = Ti.UI.createScrollView({
=======
    $.__views.__alloyId139 = Ti.UI.createScrollView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        contentHeight: "auto",
        layout: "horizontal",
        contentWidth: Titanium.UI.FILL,
<<<<<<< HEAD
        id: "__alloyId140"
    });
    $.__views.main.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId177"
    });
    $.__views.main.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createView({
=======
        id: "__alloyId139"
    });
    $.__views.main.add($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Bone Health",
<<<<<<< HEAD
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    navWindow ? $.__views.__alloyId141.addEventListener("click", navWindow) : __defers["$.__views.__alloyId141!click!navWindow"] = true;
    $.__views.__alloyId142 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
        id: "__alloyId178"
    });
    $.__views.__alloyId177.add($.__views.__alloyId178);
    navWindow ? $.__views.__alloyId178.addEventListener("click", navWindow) : __defers["$.__views.__alloyId178!click!navWindow"] = true;
    $.__views.__alloyId179 = Ti.UI.createLabel({
=======
        id: "__alloyId140"
    });
    $.__views.__alloyId139.add($.__views.__alloyId140);
    navWindow ? $.__views.__alloyId140.addEventListener("click", navWindow) : __defers["$.__views.__alloyId140!click!navWindow"] = true;
    $.__views.__alloyId141 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Bone Health",
        mod: "Bone Health",
<<<<<<< HEAD
        id: "__alloyId142"
    });
    $.__views.__alloyId141.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
        id: "__alloyId179"
    });
    $.__views.__alloyId178.add($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createImageView({
=======
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    $.__views.__alloyId142 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Bone Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/bone-health-category.png",
<<<<<<< HEAD
        id: "__alloyId143"
    });
    $.__views.__alloyId141.add($.__views.__alloyId143);
    $.__views.__alloyId144 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId180"
    });
    $.__views.__alloyId178.add($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createView({
=======
        id: "__alloyId142"
    });
    $.__views.__alloyId140.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Women Health",
<<<<<<< HEAD
        id: "__alloyId144"
    });
    $.__views.__alloyId140.add($.__views.__alloyId144);
    navWindow ? $.__views.__alloyId144.addEventListener("click", navWindow) : __defers["$.__views.__alloyId144!click!navWindow"] = true;
    $.__views.__alloyId145 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
        id: "__alloyId181"
    });
    $.__views.__alloyId177.add($.__views.__alloyId181);
    navWindow ? $.__views.__alloyId181.addEventListener("click", navWindow) : __defers["$.__views.__alloyId181!click!navWindow"] = true;
    $.__views.__alloyId182 = Ti.UI.createLabel({
=======
        id: "__alloyId143"
    });
    $.__views.__alloyId139.add($.__views.__alloyId143);
    navWindow ? $.__views.__alloyId143.addEventListener("click", navWindow) : __defers["$.__views.__alloyId143!click!navWindow"] = true;
    $.__views.__alloyId144 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Women Health",
        mod: "Women Health",
<<<<<<< HEAD
        id: "__alloyId145"
    });
    $.__views.__alloyId144.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
        id: "__alloyId182"
    });
    $.__views.__alloyId181.add($.__views.__alloyId182);
    $.__views.__alloyId183 = Ti.UI.createImageView({
=======
        id: "__alloyId144"
    });
    $.__views.__alloyId143.add($.__views.__alloyId144);
    $.__views.__alloyId145 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Women Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/women-health-category.png",
<<<<<<< HEAD
        id: "__alloyId146"
    });
    $.__views.__alloyId144.add($.__views.__alloyId146);
    $.__views.__alloyId147 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId183"
    });
    $.__views.__alloyId181.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createView({
=======
        id: "__alloyId145"
    });
    $.__views.__alloyId143.add($.__views.__alloyId145);
    $.__views.__alloyId146 = Ti.UI.createView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId147"
    });
    $.__views.__alloyId140.add($.__views.__alloyId147);
    navWindow ? $.__views.__alloyId147.addEventListener("click", navWindow) : __defers["$.__views.__alloyId147!click!navWindow"] = true;
    $.__views.__alloyId148 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
        id: "__alloyId184"
    });
    $.__views.__alloyId177.add($.__views.__alloyId184);
    navWindow ? $.__views.__alloyId184.addEventListener("click", navWindow) : __defers["$.__views.__alloyId184!click!navWindow"] = true;
    $.__views.__alloyId185 = Ti.UI.createLabel({
=======
        id: "__alloyId146"
    });
    $.__views.__alloyId139.add($.__views.__alloyId146);
    navWindow ? $.__views.__alloyId146.addEventListener("click", navWindow) : __defers["$.__views.__alloyId146!click!navWindow"] = true;
    $.__views.__alloyId147 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
        id: "__alloyId185"
    });
    $.__views.__alloyId184.add($.__views.__alloyId185);
    $.__views.__alloyId186 = Ti.UI.createImageView({
=======
        id: "__alloyId147"
    });
    $.__views.__alloyId146.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId149"
    });
    $.__views.__alloyId147.add($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId186"
    });
    $.__views.__alloyId184.add($.__views.__alloyId186);
    $.__views.__alloyId187 = Ti.UI.createView({
=======
        id: "__alloyId148"
    });
    $.__views.__alloyId146.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId150"
    });
    $.__views.__alloyId140.add($.__views.__alloyId150);
    navWindow ? $.__views.__alloyId150.addEventListener("click", navWindow) : __defers["$.__views.__alloyId150!click!navWindow"] = true;
    $.__views.__alloyId151 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
        id: "__alloyId187"
    });
    $.__views.__alloyId177.add($.__views.__alloyId187);
    navWindow ? $.__views.__alloyId187.addEventListener("click", navWindow) : __defers["$.__views.__alloyId187!click!navWindow"] = true;
    $.__views.__alloyId188 = Ti.UI.createLabel({
=======
        id: "__alloyId149"
    });
    $.__views.__alloyId139.add($.__views.__alloyId149);
    navWindow ? $.__views.__alloyId149.addEventListener("click", navWindow) : __defers["$.__views.__alloyId149!click!navWindow"] = true;
    $.__views.__alloyId150 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId151"
    });
    $.__views.__alloyId150.add($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
        id: "__alloyId188"
    });
    $.__views.__alloyId187.add($.__views.__alloyId188);
    $.__views.__alloyId189 = Ti.UI.createImageView({
=======
        id: "__alloyId150"
    });
    $.__views.__alloyId149.add($.__views.__alloyId150);
    $.__views.__alloyId151 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId152"
    });
    $.__views.__alloyId150.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId189"
    });
    $.__views.__alloyId187.add($.__views.__alloyId189);
    $.__views.__alloyId190 = Ti.UI.createView({
=======
        id: "__alloyId151"
    });
    $.__views.__alloyId149.add($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId153"
    });
    $.__views.__alloyId140.add($.__views.__alloyId153);
    navWindow ? $.__views.__alloyId153.addEventListener("click", navWindow) : __defers["$.__views.__alloyId153!click!navWindow"] = true;
    $.__views.__alloyId154 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
        id: "__alloyId190"
    });
    $.__views.__alloyId177.add($.__views.__alloyId190);
    navWindow ? $.__views.__alloyId190.addEventListener("click", navWindow) : __defers["$.__views.__alloyId190!click!navWindow"] = true;
    $.__views.__alloyId191 = Ti.UI.createLabel({
=======
        id: "__alloyId152"
    });
    $.__views.__alloyId139.add($.__views.__alloyId152);
    navWindow ? $.__views.__alloyId152.addEventListener("click", navWindow) : __defers["$.__views.__alloyId152!click!navWindow"] = true;
    $.__views.__alloyId153 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId154"
    });
    $.__views.__alloyId153.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
        id: "__alloyId191"
    });
    $.__views.__alloyId190.add($.__views.__alloyId191);
    $.__views.__alloyId192 = Ti.UI.createImageView({
=======
        id: "__alloyId153"
    });
    $.__views.__alloyId152.add($.__views.__alloyId153);
    $.__views.__alloyId154 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId155"
    });
    $.__views.__alloyId153.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId192"
    });
    $.__views.__alloyId190.add($.__views.__alloyId192);
    $.__views.__alloyId193 = Ti.UI.createView({
=======
        id: "__alloyId154"
    });
    $.__views.__alloyId152.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId156"
    });
    $.__views.__alloyId140.add($.__views.__alloyId156);
    navWindow ? $.__views.__alloyId156.addEventListener("click", navWindow) : __defers["$.__views.__alloyId156!click!navWindow"] = true;
    $.__views.__alloyId157 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
        id: "__alloyId193"
    });
    $.__views.__alloyId177.add($.__views.__alloyId193);
    navWindow ? $.__views.__alloyId193.addEventListener("click", navWindow) : __defers["$.__views.__alloyId193!click!navWindow"] = true;
    $.__views.__alloyId194 = Ti.UI.createLabel({
=======
        id: "__alloyId155"
    });
    $.__views.__alloyId139.add($.__views.__alloyId155);
    navWindow ? $.__views.__alloyId155.addEventListener("click", navWindow) : __defers["$.__views.__alloyId155!click!navWindow"] = true;
    $.__views.__alloyId156 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
        id: "__alloyId194"
    });
    $.__views.__alloyId193.add($.__views.__alloyId194);
    $.__views.__alloyId195 = Ti.UI.createImageView({
=======
        id: "__alloyId156"
    });
    $.__views.__alloyId155.add($.__views.__alloyId156);
    $.__views.__alloyId157 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId158"
    });
    $.__views.__alloyId156.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId195"
    });
    $.__views.__alloyId193.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createView({
=======
        id: "__alloyId157"
    });
    $.__views.__alloyId155.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId159"
    });
    $.__views.__alloyId140.add($.__views.__alloyId159);
    navWindow ? $.__views.__alloyId159.addEventListener("click", navWindow) : __defers["$.__views.__alloyId159!click!navWindow"] = true;
    $.__views.__alloyId160 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
        id: "__alloyId196"
    });
    $.__views.__alloyId177.add($.__views.__alloyId196);
    navWindow ? $.__views.__alloyId196.addEventListener("click", navWindow) : __defers["$.__views.__alloyId196!click!navWindow"] = true;
    $.__views.__alloyId197 = Ti.UI.createLabel({
=======
        id: "__alloyId158"
    });
    $.__views.__alloyId139.add($.__views.__alloyId158);
    navWindow ? $.__views.__alloyId158.addEventListener("click", navWindow) : __defers["$.__views.__alloyId158!click!navWindow"] = true;
    $.__views.__alloyId159 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Man Health",
        mod: "Man Health",
<<<<<<< HEAD
        id: "__alloyId160"
    });
    $.__views.__alloyId159.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
        id: "__alloyId197"
    });
    $.__views.__alloyId196.add($.__views.__alloyId197);
    $.__views.__alloyId198 = Ti.UI.createImageView({
=======
        id: "__alloyId159"
    });
    $.__views.__alloyId158.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Man Health",
        right: "1dp",
        bottom: "2dp",
        image: "/images/men-health-category.png",
<<<<<<< HEAD
        id: "__alloyId161"
    });
    $.__views.__alloyId159.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createView({
=======
<<<<<<< HEAD
        id: "__alloyId198"
    });
    $.__views.__alloyId196.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createView({
=======
        id: "__alloyId160"
    });
    $.__views.__alloyId158.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        height: Titanium.UI.SIZE,
        width: "49.5%",
        backgroundColor: "#ffffff",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId162"
    });
    $.__views.__alloyId140.add($.__views.__alloyId162);
    navWindow ? $.__views.__alloyId162.addEventListener("click", navWindow) : __defers["$.__views.__alloyId162!click!navWindow"] = true;
    $.__views.__alloyId163 = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
=======
<<<<<<< HEAD
        id: "__alloyId199"
    });
    $.__views.__alloyId177.add($.__views.__alloyId199);
    navWindow ? $.__views.__alloyId199.addEventListener("click", navWindow) : __defers["$.__views.__alloyId199!click!navWindow"] = true;
    $.__views.__alloyId200 = Ti.UI.createLabel({
=======
        id: "__alloyId161"
    });
    $.__views.__alloyId139.add($.__views.__alloyId161);
    navWindow ? $.__views.__alloyId161.addEventListener("click", navWindow) : __defers["$.__views.__alloyId161!click!navWindow"] = true;
    $.__views.__alloyId162 = Ti.UI.createLabel({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        top: "5dp",
        left: "5dp",
        color: "#ffffff",
        font: {
            fontSize: "14dp"
        },
        zIndex: "2",
        text: "Children Health",
        mod: "Children Health",
<<<<<<< HEAD
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createImageView({
=======
<<<<<<< HEAD
        id: "__alloyId200"
    });
    $.__views.__alloyId199.add($.__views.__alloyId200);
    $.__views.__alloyId201 = Ti.UI.createImageView({
=======
        id: "__alloyId162"
    });
    $.__views.__alloyId161.add($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createImageView({
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
        width: Titanium.UI.FILL,
        height: "auto",
        zIndex: "1",
        mod: "Children Health",
        left: "1dp",
        bottom: "2dp",
        image: "/images/children-health-category.png",
<<<<<<< HEAD
        id: "__alloyId164"
=======
<<<<<<< HEAD
        id: "__alloyId201"
    });
    $.__views.__alloyId199.add($.__views.__alloyId201);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId178!click!navWindow"] && $.__views.__alloyId178.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId181!click!navWindow"] && $.__views.__alloyId181.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId184!click!navWindow"] && $.__views.__alloyId184.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId187!click!navWindow"] && $.__views.__alloyId187.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId190!click!navWindow"] && $.__views.__alloyId190.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId193!click!navWindow"] && $.__views.__alloyId193.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId196!click!navWindow"] && $.__views.__alloyId196.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId199!click!navWindow"] && $.__views.__alloyId199.addEventListener("click", navWindow);
=======
        id: "__alloyId163"
>>>>>>> origin/master
    });
    $.__views.__alloyId162.add($.__views.__alloyId164);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
<<<<<<< HEAD
    __defers["$.__views.__alloyId141!click!navWindow"] && $.__views.__alloyId141.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId144!click!navWindow"] && $.__views.__alloyId144.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId147!click!navWindow"] && $.__views.__alloyId147.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId150!click!navWindow"] && $.__views.__alloyId150.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId153!click!navWindow"] && $.__views.__alloyId153.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId156!click!navWindow"] && $.__views.__alloyId156.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId159!click!navWindow"] && $.__views.__alloyId159.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId162!click!navWindow"] && $.__views.__alloyId162.addEventListener("click", navWindow);
=======
    __defers["$.__views.__alloyId140!click!navWindow"] && $.__views.__alloyId140.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId143!click!navWindow"] && $.__views.__alloyId143.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId146!click!navWindow"] && $.__views.__alloyId146.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId149!click!navWindow"] && $.__views.__alloyId149.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId152!click!navWindow"] && $.__views.__alloyId152.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId155!click!navWindow"] && $.__views.__alloyId155.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId158!click!navWindow"] && $.__views.__alloyId158.addEventListener("click", navWindow);
    __defers["$.__views.__alloyId161!click!navWindow"] && $.__views.__alloyId161.addEventListener("click", navWindow);
>>>>>>> FETCH_HEAD
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;