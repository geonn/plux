function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        $.win.add(loading.getView());
        init_dropbox();
        refresh();
    }
    function init_dropbox() {
        Ti.App.Properties.setString("clinicTypeSelection", clinicType);
        var clinicLocationSelection = Ti.App.Properties.getString("clinicLocationSelection");
        var clinicLocationSelection = null != clinicLocationSelection ? clinicLocationSelection : "All";
        $.clinicTypeSelection.text = clinicType;
        $.clinicLocationSelection.text = clinicLocationSelection;
    }
    function refresh() {
        console.log(clinicType + " " + str + " " + corp);
        data = library.getData(clinicType, str, corp, counter);
        counter += 20;
        listing({
            clear: false
        });
        load = false;
    }
    function listing(e) {
        if (e.clear) {
            var dat = [];
            $.clinicListTv.setData(dat);
        }
        var arr = data;
        if (arr.length < 1 && e.clear) {
            loading.finish();
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
            $.clinicListTv.appendRow(row);
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
                $.clinicListTv.appendRow(row);
            });
            loading.finish();
        }
        $.clinicListTv.addEventListener("click", function(e) {
            loading.start();
            nav.navigateWithArgs("clinic/clinicDetails", {
                panel_id: e.rowData.source
            });
        });
    }
    function searchResult() {
        $.searchItem.blur();
        loading.start();
        str = $.searchItem.getValue();
        counter = 0;
        data = library.getData(clinicType, str, corp, counter);
        listing({
            clear: true
        });
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
                counter = 0;
                dialog.selectedIndex = e.index;
                $.clinicTypeSelection.text = clinicArr[e.index];
                Ti.App.Properties.setString("clinicTypeSelection", clinicTypeList[e.index].clinicType);
                data = library.getData(clinicTypeList[e.index].clinicType, str, corp, counter);
                loading.start();
                listing({
                    clear: true
                });
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
                counter = 0;
                data = library.getData(Ti.App.Properties.getString("clinicTypeSelection"), str, corp, counter);
                loading.start();
                listing({
                    clear: true
                });
            }
        });
    }
    function loading_finish() {
        loading.finish();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/clinicList";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        title: "Clinic List",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId604 = Ti.UI.createView({
        layout: "horizontal",
        right: 5,
        id: "__alloyId604"
    });
    $.__views.btnMap = Ti.UI.createImageView({
        right: 10,
        id: "btnMap",
        width: 25,
        height: 25,
        image: "/images/map.png"
    });
    $.__views.__alloyId604.add($.__views.btnMap);
    $.__views.btnSearch = Ti.UI.createImageView({
        id: "btnSearch",
        width: 25,
        height: 25,
        image: "/images/search.png"
    });
    $.__views.__alloyId604.add($.__views.btnSearch);
    $.__views.win.rightNavButton = $.__views.__alloyId604;
    $.__views.panelListTbl = Ti.UI.createView({
        id: "panelListTbl",
        layout: "vertical"
    });
    $.__views.win.add($.__views.panelListTbl);
    $.__views.__alloyId605 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId605"
    });
    $.__views.panelListTbl.add($.__views.__alloyId605);
    $.__views.__alloyId606 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId606"
    });
    $.__views.__alloyId605.add($.__views.__alloyId606);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId606.add($.__views.btnBack);
    $.__views.__alloyId607 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId607"
    });
    $.__views.__alloyId605.add($.__views.__alloyId607);
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
    $.__views.__alloyId607.add($.__views.pageTitle);
    $.__views.__alloyId608 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId608"
    });
    $.__views.__alloyId605.add($.__views.__alloyId608);
    $.__views.__alloyId609 = Ti.UI.createView({
        layout: "horizontal",
        right: 5,
        top: 10,
        id: "__alloyId609"
    });
    $.__views.__alloyId608.add($.__views.__alloyId609);
    $.__views.btnMap = Ti.UI.createImageView({
        right: 10,
        id: "btnMap",
        width: 25,
        height: 25,
        image: "/images/map.png"
    });
    $.__views.__alloyId609.add($.__views.btnMap);
    $.__views.btnSearch = Ti.UI.createImageView({
        id: "btnSearch",
        width: 25,
        height: 25,
        image: "/images/search.png"
    });
    $.__views.__alloyId609.add($.__views.btnSearch);
    $.__views.searchItem = Ti.UI.createSearchBar({
        barColor: "#FFFFFF",
        tintColor: "#CE1D1C",
        id: "searchItem",
        showCancel: true,
        text: "",
        height: 50,
        hintText: "Search Clinic"
    });
    $.__views.panelListTbl.add($.__views.searchItem);
    $.__views.__alloyId610 = Ti.UI.createView({
        height: 50,
        layout: "horizontal",
        width: Ti.UI.FILL,
        id: "__alloyId610"
    });
    $.__views.panelListTbl.add($.__views.__alloyId610);
    $.__views.__alloyId611 = Ti.UI.createView({
        width: "50%",
        height: Ti.UI.SIZE,
        id: "__alloyId611"
    });
    $.__views.__alloyId610.add($.__views.__alloyId611);
    showTypeSelection ? $.addListener($.__views.__alloyId611, "click", showTypeSelection) : __defers["$.__views.__alloyId611!click!showTypeSelection"] = true;
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
    $.__views.__alloyId611.add($.__views.clinicTypeSelection);
    $.__views.__alloyId612 = Ti.UI.createImageView({
        right: 10,
        width: 15,
        height: 15,
        image: "/images/btn-down.png",
        id: "__alloyId612"
    });
    $.__views.__alloyId611.add($.__views.__alloyId612);
    $.__views.__alloyId613 = Ti.UI.createView({
        width: 1,
        height: 50,
        backgroundColor: "#9E9E9E",
        id: "__alloyId613"
    });
    $.__views.__alloyId610.add($.__views.__alloyId613);
    $.__views.__alloyId614 = Ti.UI.createView({
        width: "49%",
        height: Ti.UI.SIZE,
        id: "__alloyId614"
    });
    $.__views.__alloyId610.add($.__views.__alloyId614);
    showLocationSelection ? $.addListener($.__views.__alloyId614, "click", showLocationSelection) : __defers["$.__views.__alloyId614!click!showLocationSelection"] = true;
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
    $.__views.__alloyId614.add($.__views.clinicLocationSelection);
    $.__views.__alloyId615 = Ti.UI.createImageView({
        right: 10,
        width: 15,
        height: 15,
        image: "/images/btn-down.png",
        id: "__alloyId615"
    });
    $.__views.__alloyId614.add($.__views.__alloyId615);
    $.__views.__alloyId616 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 1,
        backgroundColor: "#9E9E9E",
        id: "__alloyId616"
    });
    $.__views.panelListTbl.add($.__views.__alloyId616);
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
    var args = arguments[0] || {};
    var clinicType = args.clinicType || "CLINIC";
    var loading = Alloy.createController("loading");
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode") || "";
    var data, str = "", counter = 0;
    Ti.App.Properties.setString("clinicLocationSelection", null);
    "hours24" == clinicType && (clinicType = "24 Hours");
    init();
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
    $.btnMap.addEventListener("click", function() {
        nav.navigateWithArgs("clinic/clinicLocator", {
            clinicType: Ti.App.Properties.getString("clinicTypeSelection"),
            location: Ti.App.Properties.getString("clinicLocationSelection")
        });
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    Ti.App.addEventListener("clinicList:loading_finish", loading_finish);
    $.win.addEventListener("close", function(e) {
        Ti.App.removeEventListener("clinicList:loading_finish", loading_finish);
    });
    $.searchItem.addEventListener("return", searchResult);
    $.searchItem.addEventListener("focus", function f(e) {
        $.searchItem.removeEventListener("focus", f);
    });
    $.searchItem.addEventListener("cancel", function(e) {
        $.searchItem.blur();
        counter = 0;
        data = library.getData(clinicType, "", corp, counter);
        listing({
            clear: true
        });
    });
    $.searchItem.addEventListener("blur", function(e) {});
    var load = false;
    $.clinicListTv.addEventListener("scroll", function(e) {
        if (!load && e.firstVisibleItem + e.visibleItemCount == e.totalItemCount) {
            load = true;
            refresh();
        }
    });
    __defers["$.__views.__alloyId611!click!showTypeSelection"] && $.addListener($.__views.__alloyId611, "click", showTypeSelection);
    __defers["$.__views.__alloyId614!click!showLocationSelection"] && $.addListener($.__views.__alloyId614, "click", showLocationSelection);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;