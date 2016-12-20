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
    this.__controllerPath = "clinic/clinicList_bak";
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
    var __defers = {};
    $.__views.clinicList = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "Clinic List",
        id: "clinicList",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.clinicList && $.addTopLevelView($.__views.clinicList);
    $.__views.__alloyId590 = Ti.UI.createView({
        layout: "horizontal",
        right: 5,
        id: "__alloyId590"
    });
    $.__views.btnMap = Ti.UI.createImageView({
        right: 10,
        id: "btnMap",
        width: 25,
        height: 25,
        image: "/images/map.png"
    });
    $.__views.__alloyId590.add($.__views.btnMap);
    $.__views.btnSearch = Ti.UI.createImageView({
        id: "btnSearch",
        width: 25,
        height: 25,
        image: "/images/search.png"
    });
    $.__views.__alloyId590.add($.__views.btnSearch);
    $.__views.clinicList.rightNavButton = $.__views.__alloyId590;
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.clinicList.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId591 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
        bottom: 10,
        text: "Loading",
        id: "__alloyId591"
    });
    $.__views.loadingBar.add($.__views.__alloyId591);
    $.__views.panelListTbl = Ti.UI.createView({
        id: "panelListTbl",
        layout: "vertical"
    });
    $.__views.clinicList.add($.__views.panelListTbl);
    $.__views.__alloyId592 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId592"
    });
    $.__views.panelListTbl.add($.__views.__alloyId592);
    $.__views.__alloyId593 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId593"
    });
    $.__views.__alloyId592.add($.__views.__alloyId593);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId593.add($.__views.btnBack);
    $.__views.__alloyId594 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId594"
    });
    $.__views.__alloyId592.add($.__views.__alloyId594);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Clinic List",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId594.add($.__views.pageTitle);
    $.__views.__alloyId595 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId595"
    });
    $.__views.__alloyId592.add($.__views.__alloyId595);
    $.__views.__alloyId596 = Ti.UI.createView({
        layout: "horizontal",
        right: 5,
        top: 10,
        id: "__alloyId596"
    });
    $.__views.__alloyId595.add($.__views.__alloyId596);
    $.__views.btnMap = Ti.UI.createImageView({
        right: 10,
        id: "btnMap",
        width: 25,
        height: 25,
        image: "/images/map.png"
    });
    $.__views.__alloyId596.add($.__views.btnMap);
    $.__views.btnSearch = Ti.UI.createImageView({
        id: "btnSearch",
        width: 25,
        height: 25,
        image: "/images/search.png"
    });
    $.__views.__alloyId596.add($.__views.btnSearch);
    $.__views.searchItem = Ti.UI.createSearchBar({
        barColor: "#FFFFFF",
        tintColor: "#CE1D1C",
        id: "searchItem",
        showCancel: true,
        text: "",
        height: 0,
        visible: false,
        hintText: "Search Clinic"
    });
    $.__views.panelListTbl.add($.__views.searchItem);
    $.__views.__alloyId597 = Ti.UI.createView({
        height: 50,
        layout: "horizontal",
        width: Ti.UI.FILL,
        id: "__alloyId597"
    });
    $.__views.panelListTbl.add($.__views.__alloyId597);
    $.__views.__alloyId598 = Ti.UI.createView({
        width: "50%",
        height: Ti.UI.SIZE,
        id: "__alloyId598"
    });
    $.__views.__alloyId597.add($.__views.__alloyId598);
    showTypeSelection ? $.addListener($.__views.__alloyId598, "click", showTypeSelection) : __defers["$.__views.__alloyId598!click!showTypeSelection"] = true;
    $.__views.clinicTypeSelection = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#626262",
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        text: "Clinic Type",
        id: "clinicTypeSelection"
    });
    $.__views.__alloyId598.add($.__views.clinicTypeSelection);
    $.__views.__alloyId599 = Ti.UI.createImageView({
        right: 10,
        width: 15,
        height: 15,
        image: "/images/btn-down.png",
        id: "__alloyId599"
    });
    $.__views.__alloyId598.add($.__views.__alloyId599);
    $.__views.__alloyId600 = Ti.UI.createView({
        width: 1,
        height: 50,
        backgroundColor: "#9E9E9E",
        id: "__alloyId600"
    });
    $.__views.__alloyId597.add($.__views.__alloyId600);
    $.__views.__alloyId601 = Ti.UI.createView({
        width: "49%",
        height: Ti.UI.SIZE,
        id: "__alloyId601"
    });
    $.__views.__alloyId597.add($.__views.__alloyId601);
    showLocationSelection ? $.addListener($.__views.__alloyId601, "click", showLocationSelection) : __defers["$.__views.__alloyId601!click!showLocationSelection"] = true;
    $.__views.clinicLocationSelection = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#626262",
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        text: "Clinic Location",
        id: "clinicLocationSelection"
    });
    $.__views.__alloyId601.add($.__views.clinicLocationSelection);
    $.__views.__alloyId602 = Ti.UI.createImageView({
        right: 10,
        width: 15,
        height: 15,
        image: "/images/btn-down.png",
        id: "__alloyId602"
    });
    $.__views.__alloyId601.add($.__views.__alloyId602);
    $.__views.__alloyId603 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 1,
        backgroundColor: "#9E9E9E",
        id: "__alloyId603"
    });
    $.__views.panelListTbl.add($.__views.__alloyId603);
    $.__views.clinicListTv = Ti.UI.createTableView({
        id: "clinicListTv",
        layout: "vertical",
        top: 0,
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.panelListTbl.add($.__views.clinicListTv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId598!click!showTypeSelection"] && $.addListener($.__views.__alloyId598, "click", showTypeSelection);
    __defers["$.__views.__alloyId601!click!showLocationSelection"] && $.addListener($.__views.__alloyId601, "click", showLocationSelection);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;