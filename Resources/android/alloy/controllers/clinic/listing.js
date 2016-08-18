function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doRefresh() {
        API.loadPanelList({
            clinicType: ""
        });
    }
    function listing() {
        var data = [];
        var arr = details;
        if (arr.length < 1) {
            var noRecord = Ti.UI.createLabel({
                text: "No record found",
                color: "#CE1D1C",
                textAlign: "center",
                font: {
                    fontSize: 14,
                    fontStyle: "italic"
                },
                top: 15,
                width: Ti.UI.SIZE
            });
            $.panelListTbl.add(noRecord);
        } else {
            arr.forEach(function(entry) {
                var myClinicType = entry.clinicType;
                "hours24" == entry.clinicType && (myClinicType = "24 HOURS");
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: 70,
                    id: entry.clinicType,
                    backgroundSelectedColor: "#FFE1E1",
                    backgroundColor: "#ffffff"
                });
                var clinicImg = entry.clinicType;
                var leftImage = Titanium.UI.createView({
                    backgroundImage: "/images/" + clinicImg + ".png",
                    width: 50,
                    height: 50,
                    left: 10
                });
                var popUpTitle = Titanium.UI.createLabel({
                    text: myClinicType,
                    font: {
                        fontSize: 16
                    },
                    source: entry.clinicType,
                    color: "#848484",
                    width: "65%",
                    textAlign: "left",
                    left: 70,
                    height: 25
                });
                var totalPanel = Titanium.UI.createLabel({
                    text: entry.total,
                    source: entry.clinicType,
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    width: "auto",
                    color: "#848484",
                    right: 50,
                    height: 25
                });
                var rightForwardBtn = Titanium.UI.createImageView({
                    image: "/images/btn-forward.png",
                    source: entry.clinicType,
                    width: 15,
                    right: 20
                });
                row.add(leftImage);
                row.add(popUpTitle);
                row.add(totalPanel);
                row.add(rightForwardBtn);
                data.push(row);
            });
            $.tblview.setData(data);
        }
        common.hideLoading();
    }
    function init() {
        details = library.getCountClinicType(corp);
        details24 = library.getCount24Hours(corp);
        var det24 = {
            clinicType: "hours24",
            total: details24.total
        };
        details.splice(1, 0, det24);
        listing();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/listing";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Clinic Type List",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
<<<<<<< HEAD
    $.__views.__alloyId591 = Ti.UI.createImageView({
=======
    $.__views.__alloyId595 = Ti.UI.createImageView({
>>>>>>> origin/master
        right: 10,
        width: 25,
        height: 25,
        image: "/images/icon_refresh.png",
<<<<<<< HEAD
        id: "__alloyId591"
    });
    doRefresh ? $.addListener($.__views.__alloyId591, "click", doRefresh) : __defers["$.__views.__alloyId591!click!doRefresh"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId591;
=======
        id: "__alloyId595"
    });
    doRefresh ? $.addListener($.__views.__alloyId595, "click", doRefresh) : __defers["$.__views.__alloyId595!click!doRefresh"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId595;
>>>>>>> origin/master
    $.__views.panelListTbl = Ti.UI.createView({
        id: "panelListTbl",
        layout: "vertical"
    });
    $.__views.win.add($.__views.panelListTbl);
<<<<<<< HEAD
    $.__views.__alloyId592 = Ti.UI.createView({
=======
    $.__views.__alloyId596 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId592"
    });
    $.__views.panelListTbl.add($.__views.__alloyId592);
    $.__views.__alloyId593 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId593"
    });
    $.__views.__alloyId592.add($.__views.__alloyId593);
=======
        id: "__alloyId596"
    });
    $.__views.panelListTbl.add($.__views.__alloyId596);
    $.__views.__alloyId597 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId597"
    });
    $.__views.__alloyId596.add($.__views.__alloyId597);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId593.add($.__views.btnBack);
    $.__views.__alloyId594 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId594"
    });
    $.__views.__alloyId592.add($.__views.__alloyId594);
=======
    $.__views.__alloyId597.add($.__views.btnBack);
    $.__views.__alloyId598 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId598"
    });
    $.__views.__alloyId596.add($.__views.__alloyId598);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Clinic Type List",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId594.add($.__views.pageTitle);
    $.__views.__alloyId595 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId595"
    });
    $.__views.__alloyId592.add($.__views.__alloyId595);
    $.__views.__alloyId596 = Ti.UI.createImageView({
=======
    $.__views.__alloyId598.add($.__views.pageTitle);
    $.__views.__alloyId599 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId599"
    });
    $.__views.__alloyId596.add($.__views.__alloyId599);
    $.__views.__alloyId600 = Ti.UI.createImageView({
>>>>>>> origin/master
        right: 10,
        width: 25,
        height: 25,
        image: "/images/icon_refresh.png",
<<<<<<< HEAD
        id: "__alloyId596"
    });
    $.__views.__alloyId595.add($.__views.__alloyId596);
    doRefresh ? $.addListener($.__views.__alloyId596, "click", doRefresh) : __defers["$.__views.__alloyId596!click!doRefresh"] = true;
=======
        id: "__alloyId600"
    });
    $.__views.__alloyId599.add($.__views.__alloyId600);
    doRefresh ? $.addListener($.__views.__alloyId600, "click", doRefresh) : __defers["$.__views.__alloyId600!click!doRefresh"] = true;
>>>>>>> origin/master
    $.__views.tblview = Ti.UI.createTableView({
        id: "tblview",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        top: 0
    });
    $.__views.panelListTbl.add($.__views.tblview);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.win.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
<<<<<<< HEAD
        top: 30,
=======
        top: 10,
>>>>>>> origin/master
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId597 = Ti.UI.createLabel({
=======
    $.__views.__alloyId601 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
<<<<<<< HEAD
        text: "Loading",
        id: "__alloyId597"
    });
    $.__views.loadingBar.add($.__views.__alloyId597);
=======
        bottom: 10,
        text: "Loading",
        id: "__alloyId601"
    });
    $.__views.loadingBar.add($.__views.__alloyId601);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var library = Alloy.createCollection("panelList");
    var corp = Ti.App.Properties.getString("corpcode") || "";
    Ti.App.Properties.getString("memno");
    var details;
    common.construct($);
    common.showLoading();
    doRefresh();
    init();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    Ti.App.addEventListener("aspClinic", init);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("aspClinic", init);
        details = null;
        details24 = null;
        det24 = null;
    });
    $.tblview.addEventListener("click", function(e) {
        var nav = require("navigation");
        nav.navigateWithArgs("clinic/clinicList", {
            clinicType: e.rowData.id
        });
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId591!click!doRefresh"] && $.addListener($.__views.__alloyId591, "click", doRefresh);
    __defers["$.__views.__alloyId596!click!doRefresh"] && $.addListener($.__views.__alloyId596, "click", doRefresh);
=======
    __defers["$.__views.__alloyId595!click!doRefresh"] && $.addListener($.__views.__alloyId595, "click", doRefresh);
    __defers["$.__views.__alloyId600!click!doRefresh"] && $.addListener($.__views.__alloyId600, "click", doRefresh);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;