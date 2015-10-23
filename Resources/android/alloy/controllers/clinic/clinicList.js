function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function listing() {
        var data = [];
        $.clinicListTv.setData(data);
        var arr = list;
        if (arr.length < 1) {
            common.hideLoading();
            var noRecord = Ti.UI.createLabel({
                text: "No clinic found",
                color: "#CE1D1C",
                textAlign: "center",
                font: {
                    fontSize: 14,
                    fontStyle: "italic"
                },
                top: 15,
                width: Ti.UI.SIZE
            });
            var row = Titanium.UI.createTableViewRow({
                touchEnabled: true,
                height: Ti.UI.SIZE,
                backgroundSelectedColor: "#FFE1E1",
                color: "transparent"
            });
            row.add(noRecord);
            data.push(row);
            $.clinicListTv.setData(data);
        } else {
            arr.forEach(function(entry) {
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: Ti.UI.SIZE,
                    source: entry.id,
                    backgroundSelectedColor: "#FFE1E1",
                    color: "transparent"
                });
                var contentView = Ti.UI.createView({
                    layout: "vertical",
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL
                });
                var cn = entry.clinicName.replace("[quot]", "'");
                var clinicLbl = Titanium.UI.createLabel({
                    text: cn,
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    source: entry.id,
                    color: "#CE1D1C",
                    textAlign: "left",
                    top: 5,
                    left: 15,
                    width: "80%",
                    height: Ti.UI.SIZE
                });
                contentView.add(clinicLbl);
                var mobileLbl = Titanium.UI.createLabel({
                    text: "Tel: " + entry.tel,
                    font: {
                        fontSize: 12
                    },
                    source: entry.id,
                    color: "#848484",
                    textAlign: "left",
                    left: 15,
                    height: Ti.UI.SIZE
                });
                contentView.add(mobileLbl);
                "" != entry.city && (entry.city = ", " + entry.city);
                "" != entry.state && (entry.state = ", " + entry.state);
                var distLbl = Titanium.UI.createLabel({
                    text: entry.postcode + entry.city + entry.state,
                    font: {
                        fontSize: 12
                    },
                    source: entry.id,
                    color: "#848484",
                    textAlign: "left",
                    left: 15,
                    bottom: 5,
                    width: "85%",
                    height: Ti.UI.SIZE
                });
                contentView.add(distLbl);
                var rightForwardBtn = Titanium.UI.createImageView({
                    image: "/images/btn-forward.png",
                    source: entry.id,
                    width: 15,
                    right: 20
                });
                row.add(contentView);
                row.add(rightForwardBtn);
                data.push(row);
            });
            $.clinicListTv.setData(data);
            common.hideLoading();
        }
        $.clinicListTv.addEventListener("click", function(e) {
            nav.navigateWithArgs("clinic/clinicDetails", {
                panel_id: e.rowData.source
            });
        });
    }
    function searchResult() {
        $.searchItem.blur();
        common.showLoading();
        var str = $.searchItem.getValue();
        if ("" != str) {
            list = "24 Hours" == clinicType ? library.getPanelBy24Hours(str, corp) : library.getPanelByClinicType(clinicType, str, corp);
            listing();
        } else loadData(corp);
    }
    function showTypeSelection() {
        var clinicTypeList = library.getCountClinicType(corp);
        var det24 = {
            clinicType: "24 Hours"
        };
        clinicTypeList.splice(1, 0, det24);
        var clinicArr = [];
        clinicTypeList.forEach(function(entry) {
            clinicArr.push(ucwords(entry.clinicType));
        });
        clinicArr.push("Cancel");
        var cancelBtn = clinicArr.length - 1;
        var dialog = Ti.UI.createOptionDialog({
            cancel: clinicArr.length - 1,
            options: clinicArr,
            selectedIndex: 0,
            title: "Choose Type"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            if (cancelBtn != e.index) {
                dialog.selectedIndex = e.index;
                $.clinicTypeSelection.text = clinicArr[e.index];
                Ti.App.Properties.setString("clinicTypeSelection", clinicArr[e.index]);
                list = "24 Hours" == clinicArr[e.index] ? library.getPanelBy24Hours("", corp) : library.getPanelByClinicType(clinicArr[e.index], "", corp);
                common.showLoading();
                listing();
            }
        });
    }
    function showLocationSelection() {
        var stateList = library.getPanelListByState();
        var clinicLocationArr = [];
        clinicLocationArr.push("All");
        stateList.forEach(function(entry) {
            null != entry.state && clinicLocationArr.push(ucwords(entry.state));
        });
        clinicLocationArr.push("Cancel");
        var cancelBtn = clinicLocationArr.length - 1;
        var dialog = Ti.UI.createOptionDialog({
            cancel: clinicLocationArr.length - 1,
            options: clinicLocationArr,
            selectedIndex: 0,
            title: "Choose Location"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            if (cancelBtn != e.index) {
                dialog.selectedIndex = e.index;
                $.clinicLocationSelection.text = clinicLocationArr[e.index];
                "0" == e.index ? Ti.App.Properties.setString("clinicLocationSelection", null) : Ti.App.Properties.setString("clinicLocationSelection", clinicLocationArr[e.index]);
                list = "24 Hours" == Ti.App.Properties.getString("clinicTypeSelection") ? library.getPanelBy24Hours("", corp) : library.getPanelByClinicType(Ti.App.Properties.getString("clinicTypeSelection"), "", corp);
                common.showLoading();
                listing();
            }
        });
    }
    function loadData(corp) {
        list = "24 Hours" == clinicType ? library.getPanelBy24Hours("", corp) : library.getPanelByClinicType(clinicType, "", corp);
        common.showLoading();
        listing();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/clinicList";
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
        title: "Clinic List",
        id: "clinicList",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.clinicList && $.addTopLevelView($.__views.clinicList);
    $.__views.__alloyId352 = Ti.UI.createView({
        layout: "horizontal",
        right: "5",
        id: "__alloyId352"
    });
    $.__views.btnMap = Ti.UI.createImageView({
        right: "10",
        id: "btnMap",
        width: "25",
        height: "25",
        image: "/images/map.png"
    });
    $.__views.__alloyId352.add($.__views.btnMap);
    $.__views.btnSearch = Ti.UI.createImageView({
        id: "btnSearch",
        width: "25",
        height: "25",
        image: "/images/search.png"
    });
    $.__views.__alloyId352.add($.__views.btnSearch);
    $.__views.clinicList.rightNavButton = $.__views.__alloyId352;
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.clinicList.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId353 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: "5",
        text: "Loading",
        id: "__alloyId353"
    });
    $.__views.loadingBar.add($.__views.__alloyId353);
    $.__views.panelListTbl = Ti.UI.createView({
        id: "panelListTbl",
        layout: "vertical"
    });
    $.__views.clinicList.add($.__views.panelListTbl);
    $.__views.__alloyId354 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId354"
    });
    $.__views.panelListTbl.add($.__views.__alloyId354);
    $.__views.__alloyId355 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId355"
    });
    $.__views.__alloyId354.add($.__views.__alloyId355);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId355.add($.__views.btnBack);
    $.__views.__alloyId356 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId356"
    });
    $.__views.__alloyId354.add($.__views.__alloyId356);
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
    $.__views.__alloyId356.add($.__views.pageTitle);
    $.__views.__alloyId357 = Ti.UI.createView({
        right: "0",
        width: "20%",
        id: "__alloyId357"
    });
    $.__views.__alloyId354.add($.__views.__alloyId357);
    $.__views.btnSearch = Ti.UI.createImageView({
        right: "10",
        id: "btnSearch",
        width: "25",
        height: "25",
        image: "/images/map.png"
    });
    $.__views.__alloyId357.add($.__views.btnSearch);
    $.__views.btnSearch = Ti.UI.createImageView({
        right: "10",
        id: "btnSearch",
        width: "25",
        height: "25",
        image: "/images/search.png"
    });
    $.__views.__alloyId357.add($.__views.btnSearch);
    $.__views.searchItem = Ti.UI.createSearchBar({
        barColor: "#FFFFFF",
        tintColor: "#CE1D1C",
        id: "searchItem",
        showCancel: "true",
        text: "",
        height: "0",
        visible: "false",
        hintText: "Search Clinic"
    });
    $.__views.panelListTbl.add($.__views.searchItem);
    $.__views.__alloyId358 = Ti.UI.createView({
        height: "50",
        layout: "horizontal",
        width: Ti.UI.FILL,
        id: "__alloyId358"
    });
    $.__views.panelListTbl.add($.__views.__alloyId358);
    $.__views.__alloyId359 = Ti.UI.createView({
        width: "50%",
        height: Ti.UI.SIZE,
        id: "__alloyId359"
    });
    $.__views.__alloyId358.add($.__views.__alloyId359);
    showTypeSelection ? $.addListener($.__views.__alloyId359, "click", showTypeSelection) : __defers["$.__views.__alloyId359!click!showTypeSelection"] = true;
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
    $.__views.__alloyId359.add($.__views.clinicTypeSelection);
    $.__views.__alloyId360 = Ti.UI.createImageView({
        right: "10",
        width: "15",
        height: "15",
        image: "/images/btn-down.png",
        id: "__alloyId360"
    });
    $.__views.__alloyId359.add($.__views.__alloyId360);
    $.__views.__alloyId361 = Ti.UI.createView({
        width: "1",
        height: "50",
        backgroundColor: "#9E9E9E",
        id: "__alloyId361"
    });
    $.__views.__alloyId358.add($.__views.__alloyId361);
    $.__views.__alloyId362 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId362"
    });
    $.__views.__alloyId358.add($.__views.__alloyId362);
    showLocationSelection ? $.addListener($.__views.__alloyId362, "click", showLocationSelection) : __defers["$.__views.__alloyId362!click!showLocationSelection"] = true;
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
    $.__views.__alloyId362.add($.__views.clinicLocationSelection);
    $.__views.__alloyId363 = Ti.UI.createImageView({
        right: "10",
        width: "15",
        height: "15",
        image: "/images/btn-down.png",
        id: "__alloyId363"
    });
    $.__views.__alloyId362.add($.__views.__alloyId363);
    $.__views.__alloyId364 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1",
        backgroundColor: "#9E9E9E",
        id: "__alloyId364"
    });
    $.__views.panelListTbl.add($.__views.__alloyId364);
    $.__views.clinicListTv = Ti.UI.createTableView({
        id: "clinicListTv",
        layout: "vertical",
        top: "0",
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.panelListTbl.add($.__views.clinicListTv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var clinicType = args.clinicType || "CLINIC";
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode") || "";
    var list;
    "hours24" == clinicType && (clinicType = "24 Hours");
    Ti.App.Properties.setString("clinicTypeSelection", clinicType);
    var clinicLocationSelection = Ti.App.Properties.getString("clinicLocationSelection");
    var clinicLocationSelection = null != clinicLocationSelection ? clinicLocationSelection : "All";
    common.construct($);
    common.showLoading();
    $.clinicTypeSelection.text = clinicType;
    $.clinicLocationSelection.text = clinicLocationSelection;
    $.pageTitle.text = "Locator List";
    setTimeout(function() {
        loadData(corp);
    }, 1e3);
    $.btnSearch.addEventListener("click", function() {
        var isVis = $.searchItem.getVisible();
        if (true === isVis) {
            $.searchItem.visible = false;
            $.searchItem.height = 0;
        } else {
            $.searchItem.visible = true;
            $.searchItem.height = 50;
        }
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.clinicList);
    });
    $.searchItem.addEventListener("return", searchResult);
    $.searchItem.addEventListener("focus", function f() {
        $.searchItem.removeEventListener("focus", f);
    });
    $.searchItem.addEventListener("cancel", function() {
        $.searchItem.blur();
        loadData(corp);
    });
    $.searchItem.addEventListener("blur", function() {});
    $.btnMap.addEventListener("click", function() {
        nav.navigateWithArgs("clinic/clinicLocator", {
            clinicType: Ti.App.Properties.getString("clinicTypeSelection"),
            location: Ti.App.Properties.getString("clinicLocationSelection")
        });
    });
    __defers["$.__views.__alloyId359!click!showTypeSelection"] && $.addListener($.__views.__alloyId359, "click", showTypeSelection);
    __defers["$.__views.__alloyId362!click!showLocationSelection"] && $.addListener($.__views.__alloyId362, "click", showLocationSelection);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;