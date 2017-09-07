function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Copy of editMedical";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.editRecWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "editRecWin",
        title: "My Medical Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.editRecWin && $.addTopLevelView($.__views.editRecWin);
    $.__views.__alloyId76 = Ti.UI.createView({
        layout: "vertical",
        bottom: 90,
        id: "__alloyId76"
    });
    $.__views.editRecWin.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId78.add($.__views.btnBack);
    $.__views.__alloyId79 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId79"
    });
    $.__views.__alloyId77.add($.__views.__alloyId79);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "My Medical Record",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId79.add($.__views.pageTitle);
    $.__views.__alloyId80 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId80"
    });
    $.__views.__alloyId77.add($.__views.__alloyId80);
    $.__views.saveRecord = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        id: "saveRecord",
        title: "Done"
    });
    $.__views.__alloyId80.add($.__views.saveRecord);
    $.__views.titleRecord = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: 40,
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "95%",
        backgroundColor: "#ffffff",
        top: 0,
        id: "titleRecord",
        borderColor: "#ffffff",
        hintText: "Medical Problem"
    });
    $.__views.__alloyId76.add($.__views.titleRecord);
    $.__views.__alloyId81 = Ti.UI.createView({
        height: 1,
        width: "100%",
        backgroundColor: "#CE1D1C",
        id: "__alloyId81"
    });
    $.__views.__alloyId76.add($.__views.__alloyId81);
    $.__views.aView = Ti.UI.createScrollView({
        id: "aView",
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.__alloyId76.add($.__views.aView);
    $.__views.__alloyId82 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Clinic/Hospital/Specialist",
        left: 10,
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId82"
    });
    $.__views.aView.add($.__views.__alloyId82);
    $.__views.clinicRecord = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: 40,
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#f6f6f6",
        top: 0,
        left: 10,
        right: 10,
        id: "clinicRecord",
        borderColor: "#f6f6f6",
        hintText: "Please fill in Clinic/Hospital/Specialist"
    });
    $.__views.aView.add($.__views.clinicRecord);
    $.__views.__alloyId83 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Treatment",
        left: 10,
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId83"
    });
    $.__views.aView.add($.__views.__alloyId83);
    $.__views.treatmentTextArea = Ti.UI.createTextArea({
        id: "treatmentTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Treatment",
        value: "",
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        height: 200,
        suppressReturn: false
    });
    $.__views.aView.add($.__views.treatmentTextArea);
    $.__views.__alloyId84 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Procedures",
        left: 10,
        top: 10,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId84"
    });
    $.__views.aView.add($.__views.__alloyId84);
    $.__views.proceduceTextArea = Ti.UI.createTextArea({
        id: "proceduceTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Procedures",
        value: "",
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        height: 200,
        suppressReturn: false
    });
    $.__views.aView.add($.__views.proceduceTextArea);
    $.__views.__alloyId85 = Ti.UI.createView({
        bottom: 40,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        width: "100%",
        id: "__alloyId85"
    });
    $.__views.editRecWin.add($.__views.__alloyId85);
    $.__views.attachment = Ti.UI.createScrollView({
        id: "attachment",
        scrollType: "horizontal",
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "80%"
    });
    $.__views.__alloyId85.add($.__views.attachment);
    $.__views.__alloyId86 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.SIZE,
        id: "__alloyId86"
    });
    $.__views.__alloyId85.add($.__views.__alloyId86);
    showCategory ? $.addListener($.__views.__alloyId86, "click", showCategory) : __defers["$.__views.__alloyId86!click!showCategory"] = true;
    $.__views.__alloyId87 = Ti.UI.createView({
        backgroundColor: "#CE1D1C",
        height: 50,
        width: Ti.UI.FILL,
        right: 0,
        id: "__alloyId87"
    });
    $.__views.__alloyId86.add($.__views.__alloyId87);
    $.__views.addLbl = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        id: "addLbl",
        text: "+"
    });
    $.__views.__alloyId87.add($.__views.addLbl);
    $.__views.__alloyId88 = Ti.UI.createView({
        height: 40,
        layout: "horizontal",
        bottom: 0,
        width: "100%",
        backgroundColor: "#EEEEEE",
        id: "__alloyId88"
    });
    $.__views.editRecWin.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createButton({
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: 15,
        width: 30,
        height: 30,
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
    deleteRecord ? $.addListener($.__views.__alloyId89, "click", deleteRecord) : __defers["$.__views.__alloyId89!click!deleteRecord"] = true;
    $.__views.__alloyId90 = Ti.UI.createView({
        width: "auto",
        height: Ti.UI.FILL,
        id: "__alloyId90"
    });
    $.__views.__alloyId88.add($.__views.__alloyId90);
    $.__views.lastUpdated = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#606060",
        id: "lastUpdated",
        textAlign: "right",
        right: 10
    });
    $.__views.__alloyId90.add($.__views.lastUpdated);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId86!click!showCategory"] && $.addListener($.__views.__alloyId86, "click", showCategory);
    __defers["$.__views.__alloyId89!click!deleteRecord"] && $.addListener($.__views.__alloyId89, "click", deleteRecord);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;