function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadClinic(e) {
        var details = e.details;
        details && details.forEach(function(d) {
            aspClinicArr.push(d.id);
        });
        listing();
        Ti.App.removeEventListener("aspClinic", loadClinic);
    }
    function listing() {
        var TheTable = Titanium.UI.createTableView({
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            search: searchBar
        });
        var data = [];
        var arr = list;
        if (arr.length < 1) {
            var noRecord = Ti.UI.createLabel({
                text: "No clinic found nearby",
                color: "#CE1D1C",
                textAlign: "center",
                font: {
                    fontSize: 14,
                    fontStyle: "italic"
                },
                top: 15,
                width: Ti.UI.SIZE
            });
            $.clinicListSv.add(noRecord);
        } else {
            arr.forEach(function(entry) {
                var isValid = aspClinicArr.indexOf(entry.id);
                if ("-1" != isValid || "" == corp) {
                    var row = Titanium.UI.createTableViewRow({
                        touchEnabled: true,
                        height: Ti.UI.SIZE,
                        source: entry.id,
                        backgroundSelectedColor: "#FFE1E1",
                        title: entry.clinicName,
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
                            fontSize: 16
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
                            fontSize: 14
                        },
                        source: entry.id,
                        color: "#848484",
                        textAlign: "left",
                        left: 15,
                        height: Ti.UI.SIZE
                    });
                    contentView.add(mobileLbl);
                    var add2 = entry.add2;
                    "" != add2.trim() && (add2 += "\r\n");
                    var distLbl = Titanium.UI.createLabel({
                        text: entry.add1 + "\r\n" + add2 + entry.postcode + ", " + entry.city + "\r\n" + entry.state,
                        font: {
                            fontSize: 14
                        },
                        source: entry.id,
                        color: "#848484",
                        textAlign: "left",
                        left: 15,
                        bottom: 5,
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
                }
            });
            TheTable.setData(data);
            $.clinicListSv.add(TheTable);
        }
        common.hideLoading();
        TheTable.addEventListener("click", function(e) {
            nav.navigateWithArgs("clinic/clinicDetails", {
                panel_id: e.rowData.source
            });
        });
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
    $.__views.clinicList = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Clinic List",
        id: "clinicList",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.clinicList && $.addTopLevelView($.__views.clinicList);
    $.__views.btnList = Ti.UI.createImageView({
        right: "10",
        id: "btnList",
        width: "15",
        height: "25",
        image: "/images/marker.png"
    });
    $.__views.clinicList.rightNavButton = $.__views.btnList;
    $.__views.panelListTbl = Ti.UI.createView({
        id: "panelListTbl",
        layout: "vertical"
    });
    $.__views.clinicList.add($.__views.panelListTbl);
    $.__views.clinicListSv = Ti.UI.createScrollView({
        id: "clinicListSv",
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.panelListTbl.add($.__views.clinicListSv);
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
    $.__views.__alloyId152 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId152"
    });
    $.__views.loadingBar.add($.__views.__alloyId152);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var clinicType = args.clinicType || "CLINIC";
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode");
    var list;
    var aspClinicArr = [];
    common.construct($);
    common.showLoading();
    setTimeout(function() {
        if ("hours24" == clinicType) {
            $.clinicList.title = "24 Hours Clinic List";
            list = library.getPanelBy24Hours();
        } else {
            $.clinicList.title = clinicType + " List";
            list = library.getPanelByClinicType(clinicType);
        }
        "" == corp ? listing() : API.loadPanelList({
            clinicType: clinicType
        });
    }, 1e3);
    var searchBar = Titanium.UI.createSearchBar({
        barColor: "#F0F0F0",
        showCancel: true,
        height: 45,
        top: 0
    });
    Ti.App.addEventListener("aspClinic", loadClinic);
    $.btnList.addEventListener("click", function() {
        nav.navigateWithArgs("clinic/clinicLocator", {
            clinicType: clinicType
        });
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.clinicList);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;