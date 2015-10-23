function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createDoctorList() {
        removeAllChildren(docContainer);
        var docTable = Ti.UI.createTableView();
        var data = [];
        if (listing.length < 1) docTable.setData(common.noRecord()); else {
            listing.forEach(function(entry) {
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: Ti.UI.SIZE,
                    source: entry.id,
                    clinicName: entry.clinicName,
                    backgroundSelectedColor: "#ECFFF9"
                });
                var tblRowView = Ti.UI.createView({
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    clinicName: entry.clinicName,
                    source: entry.id
                });
                var tblView = Ti.UI.createView({
                    layout: "vertical",
                    height: Ti.UI.SIZE,
                    source: entry.id,
                    clinicName: entry.clinicName,
                    width: "auto"
                });
                var docName = $.UI.create("Label", {
                    classes: [ "medium_font", "wfill", "hsize", "themeColor" ],
                    text: entry.clinicName,
                    source: entry.id,
                    textAlign: "left",
                    clinicName: entry.clinicName,
                    top: 5,
                    left: 15
                });
                var docSpecialty = $.UI.create("Label", {
                    classes: [ "small_font", "wfill", "hsize" ],
                    text: entry.clinicType,
                    source: entry.id,
                    clinicName: entry.clinicName,
                    color: "#848484",
                    textAlign: "left",
                    left: 15
                });
                var docContact = $.UI.create("Label", {
                    classes: [ "small_font", "wfill", "hsize" ],
                    text: "Tel : " + entry.tel,
                    source: entry.id,
                    clinicName: entry.clinicName,
                    color: "#848484",
                    textAlign: "left",
                    bottom: 5,
                    left: 15
                });
                tblView.add(docName);
                tblView.add(docSpecialty);
                tblView.add(docContact);
                tblRowView.add(tblView);
                addClinicAction(tblRowView);
                row.add(tblRowView);
                data.push(row);
            });
            docTable.setData(data);
        }
        common.hideLoading();
        docContainer.add(docTable);
        return docContainer;
    }
    function addClinicAction(vw) {
        vw.addEventListener("click", function(e) {
            var elbl = JSON.stringify(e.source);
            var res = JSON.parse(elbl);
            Ti.App.fireEvent("selectClinic", {
                clinicName: res.clinicName,
                clinicId: res.source
            });
            $.win.close();
        });
    }
    function separateHozLine() {
        return seperatorLine = Titanium.UI.createView({
            backgroundColor: "#D5D5D5",
            height: 1,
            width: Ti.UI.FILL
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointmentClinicList";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: "true",
        title: "Appointment Clinic List",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId18 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId18"
    });
    $.__views.win.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId19.add($.__views.btnBack);
    $.__views.__alloyId20 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId20"
    });
    $.__views.__alloyId18.add($.__views.__alloyId20);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Doctor List",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId20.add($.__views.pageTitle);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "0",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.win.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        top: "5",
        text: "Loading",
        id: "__alloyId21"
    });
    $.__views.loadingBar.add($.__views.__alloyId21);
    $.__views.doctorView = Ti.UI.createView({
        layout: "vertical",
        id: "doctorView"
    });
    $.__views.win.add($.__views.doctorView);
    $.__views.doctorContainer = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "doctorContainer"
    });
    $.__views.doctorView.add($.__views.doctorContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var panelListModel = Alloy.createCollection("panelList");
    common.construct($);
    var listing = [];
    listing = panelListModel.getPanelListTest();
    var bigContainer = $.UI.create("View", {
        classes: [ "hfill", "wfill", "vert" ]
    });
    var docContainer = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL
    });
    bigContainer.add(separateHozLine());
    bigContainer.add(docContainer);
    $.doctorContainer.add(bigContainer);
    setTimeout(function() {
        createDoctorList();
    }, 600);
    $.win.addEventListener("close", function() {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;