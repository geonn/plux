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
                var clinicLbl = Titanium.UI.createLabel({
                    text: entry.clinicName,
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
                var distLbl = Titanium.UI.createLabel({
                    text: entry.postcode + ", " + entry.city + ", " + entry.state,
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
        var clinicTypeList = library.getCountClinicType();
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
        clinicLocationArr.push("Show Map");
        stateList.forEach(function(entry) {
            "" != entry.state && clinicLocationArr.push(ucwords(entry.state));
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
            if ("0" == e.index) nav.navigateWithArgs("clinic/clinicLocator", {
                clinicType: Ti.App.Properties.getString("clinicTypeSelection")
            }); else if (cancelBtn != e.index) {
                $.clinicLocationSelection.text = clinicLocationArr[e.index];
                Ti.App.Properties.setString("clinicLocationSelection", clinicLocationArr[e.index]);
                list = library.getPanelByClinicType(Ti.App.Properties.getString("clinicTypeSelection"), "", corp);
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
    $.__views.btnSearch = Ti.UI.createImageView({
        right: "10",
        id: "btnSearch",
        width: "25",
        height: "25",
        image: "/images/search.png"
    });
    $.__views.clinicList.rightNavButton = $.__views.btnSearch;
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
<<<<<<< HEAD
    $.__views.__alloyId342 = Ti.UI.createLabel({
=======
    $.__views.__alloyId344 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId342"
    });
    $.__views.loadingBar.add($.__views.__alloyId342);
=======
        id: "__alloyId344"
    });
    $.__views.loadingBar.add($.__views.__alloyId344);
>>>>>>> origin/master
    $.__views.panelListTbl = Ti.UI.createView({
        id: "panelListTbl",
        layout: "vertical"
    });
    $.__views.clinicList.add($.__views.panelListTbl);
<<<<<<< HEAD
    $.__views.__alloyId343 = Ti.UI.createView({
=======
    $.__views.__alloyId345 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId343"
    });
    $.__views.panelListTbl.add($.__views.__alloyId343);
    $.__views.__alloyId344 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId344"
    });
    $.__views.__alloyId343.add($.__views.__alloyId344);
=======
        id: "__alloyId345"
    });
    $.__views.panelListTbl.add($.__views.__alloyId345);
    $.__views.__alloyId346 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId346"
    });
    $.__views.__alloyId345.add($.__views.__alloyId346);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId344.add($.__views.btnBack);
    $.__views.__alloyId345 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId345"
    });
    $.__views.__alloyId343.add($.__views.__alloyId345);
=======
    $.__views.__alloyId346.add($.__views.btnBack);
    $.__views.__alloyId347 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId347"
    });
    $.__views.__alloyId345.add($.__views.__alloyId347);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Clinic List",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId345.add($.__views.pageTitle);
    $.__views.__alloyId346 = Ti.UI.createView({
        right: "0",
        width: "20%",
        id: "__alloyId346"
    });
    $.__views.__alloyId343.add($.__views.__alloyId346);
=======
    $.__views.__alloyId347.add($.__views.pageTitle);
    $.__views.__alloyId348 = Ti.UI.createView({
        right: "0",
        width: "20%",
        id: "__alloyId348"
    });
    $.__views.__alloyId345.add($.__views.__alloyId348);
>>>>>>> origin/master
    $.__views.btnSearch = Ti.UI.createImageView({
        right: "10",
        id: "btnSearch",
        width: "25",
        height: "25",
        image: "/images/search.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId346.add($.__views.btnSearch);
=======
    $.__views.__alloyId348.add($.__views.btnSearch);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId347 = Ti.UI.createView({
        height: "50",
        layout: "horizontal",
        width: Ti.UI.FILL,
        id: "__alloyId347"
    });
    $.__views.panelListTbl.add($.__views.__alloyId347);
    $.__views.__alloyId348 = Ti.UI.createView({
        width: "50%",
        height: Ti.UI.SIZE,
        id: "__alloyId348"
    });
    $.__views.__alloyId347.add($.__views.__alloyId348);
    showTypeSelection ? $.addListener($.__views.__alloyId348, "click", showTypeSelection) : __defers["$.__views.__alloyId348!click!showTypeSelection"] = true;
=======
    $.__views.__alloyId349 = Ti.UI.createView({
        height: "50",
        layout: "horizontal",
        width: Ti.UI.FILL,
        id: "__alloyId349"
    });
    $.__views.panelListTbl.add($.__views.__alloyId349);
    $.__views.__alloyId350 = Ti.UI.createView({
        width: "50%",
        height: Ti.UI.SIZE,
        id: "__alloyId350"
    });
    $.__views.__alloyId349.add($.__views.__alloyId350);
    showTypeSelection ? $.addListener($.__views.__alloyId350, "click", showTypeSelection) : __defers["$.__views.__alloyId350!click!showTypeSelection"] = true;
>>>>>>> origin/master
    $.__views.clinicTypeSelection = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        color: "#626262",
        text: "Clinic Type",
        id: "clinicTypeSelection"
    });
<<<<<<< HEAD
    $.__views.__alloyId348.add($.__views.clinicTypeSelection);
    $.__views.__alloyId349 = Ti.UI.createImageView({
=======
    $.__views.__alloyId350.add($.__views.clinicTypeSelection);
    $.__views.__alloyId351 = Ti.UI.createImageView({
>>>>>>> origin/master
        right: "10",
        width: "15",
        height: "15",
        image: "/images/btn-down.png",
<<<<<<< HEAD
        id: "__alloyId349"
    });
    $.__views.__alloyId348.add($.__views.__alloyId349);
    $.__views.__alloyId350 = Ti.UI.createView({
        width: "1",
        height: "50",
        backgroundColor: "#9E9E9E",
        id: "__alloyId350"
    });
    $.__views.__alloyId347.add($.__views.__alloyId350);
    $.__views.__alloyId351 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId351"
    });
    $.__views.__alloyId347.add($.__views.__alloyId351);
    showLocationSelection ? $.addListener($.__views.__alloyId351, "click", showLocationSelection) : __defers["$.__views.__alloyId351!click!showLocationSelection"] = true;
=======
        id: "__alloyId351"
    });
    $.__views.__alloyId350.add($.__views.__alloyId351);
    $.__views.__alloyId352 = Ti.UI.createView({
        width: "1",
        height: "50",
        backgroundColor: "#9E9E9E",
        id: "__alloyId352"
    });
    $.__views.__alloyId349.add($.__views.__alloyId352);
    $.__views.__alloyId353 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId353"
    });
    $.__views.__alloyId349.add($.__views.__alloyId353);
    showLocationSelection ? $.addListener($.__views.__alloyId353, "click", showLocationSelection) : __defers["$.__views.__alloyId353!click!showLocationSelection"] = true;
>>>>>>> origin/master
    $.__views.clinicLocationSelection = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        color: "#626262",
        text: "Clinic Location",
        id: "clinicLocationSelection"
    });
<<<<<<< HEAD
    $.__views.__alloyId351.add($.__views.clinicLocationSelection);
    $.__views.__alloyId352 = Ti.UI.createImageView({
=======
    $.__views.__alloyId353.add($.__views.clinicLocationSelection);
    $.__views.__alloyId354 = Ti.UI.createImageView({
>>>>>>> origin/master
        right: "10",
        width: "15",
        height: "15",
        image: "/images/btn-down.png",
<<<<<<< HEAD
        id: "__alloyId352"
    });
    $.__views.__alloyId351.add($.__views.__alloyId352);
    $.__views.__alloyId353 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1",
        backgroundColor: "#9E9E9E",
        id: "__alloyId353"
    });
    $.__views.panelListTbl.add($.__views.__alloyId353);
=======
        id: "__alloyId354"
    });
    $.__views.__alloyId353.add($.__views.__alloyId354);
    $.__views.__alloyId355 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1",
        backgroundColor: "#9E9E9E",
        id: "__alloyId355"
    });
    $.__views.panelListTbl.add($.__views.__alloyId355);
>>>>>>> origin/master
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
    $.pageTitle.text = "Clinic Location List";
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
<<<<<<< HEAD
    __defers["$.__views.__alloyId348!click!showTypeSelection"] && $.addListener($.__views.__alloyId348, "click", showTypeSelection);
    __defers["$.__views.__alloyId351!click!showLocationSelection"] && $.addListener($.__views.__alloyId351, "click", showLocationSelection);
=======
    __defers["$.__views.__alloyId350!click!showTypeSelection"] && $.addListener($.__views.__alloyId350, "click", showTypeSelection);
    __defers["$.__views.__alloyId353!click!showLocationSelection"] && $.addListener($.__views.__alloyId353, "click", showLocationSelection);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;