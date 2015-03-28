function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function saveRecord() {
        var title = $.titleRecord.value;
        var message = $.recordsTextArea.value;
        "" == title.trim() && (title = "Untitled - " + currentDateTime());
        medicalRecordsModel.updateRecord({
            id: rec_id,
            title: title,
            message: message,
            updated: currentDateTime()
        });
        Ti.App.fireEvent("displayRecords");
        nav.closeWindow($.editRecWin);
    }
    function deleteRecord() {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Cancel", "Confirm" ],
            message: "Are you sure want to delete this records?",
            title: "Delete Confirmation"
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel;
            if (1 === e.index) {
                medicalRecordsModel.removeRecordById(rec_id);
                Ti.App.fireEvent("displayRecords");
                nav.closeWindow($.editRecWin);
            }
        });
        dialog.show();
    }
    function hideKeyboard() {
        MRECORDS.hideKeyboard();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "editMedical";
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
    $.__views.editRecWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        id: "editRecWin",
        title: "Edit Medical Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.editRecWin && $.addTopLevelView($.__views.editRecWin);
    $.__views.__alloyId9 = Ti.UI.createView({
        id: "__alloyId9"
    });
    $.__views.saveRecord = Ti.UI.createButton({
        id: "saveRecord",
        title: "Save"
    });
    $.__views.__alloyId9.add($.__views.saveRecord);
    $.__views.editRecWin.rightNavButton = $.__views.__alloyId9;
    $.__views.__alloyId10 = Ti.UI.createView({
        id: "__alloyId10"
    });
    $.__views.editRecWin.add($.__views.__alloyId10);
    $.__views.aView = Ti.UI.createScrollView({
        id: "aView",
        height: Ti.UI.SIZE,
        layout: "vertical",
        bottom: "5"
    });
    $.__views.__alloyId10.add($.__views.aView);
    $.__views.titleRecord = Ti.UI.createTextField({
        top: "5",
        bottom: "5",
        id: "titleRecord",
        height: "25",
        hintText: "Records title...",
        width: "95%"
    });
    $.__views.aView.add($.__views.titleRecord);
    $.__views.__alloyId11 = Ti.UI.createView({
        height: "1",
        width: "100%",
        backgroundColor: "#000000",
        top: "5",
        bottom: "5",
        id: "__alloyId11"
    });
    $.__views.aView.add($.__views.__alloyId11);
    var __alloyId15 = [];
    $.__views.__alloyId16 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId15.push($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createButton({
        backgroundImage: "/images/btn-down.png",
        textAlign: "right",
        right: "5",
        width: "20",
        height: "20",
        id: "__alloyId17"
    });
    __alloyId15.push($.__views.__alloyId17);
    hideKeyboard ? $.__views.__alloyId17.addEventListener("click", hideKeyboard) : __defers["$.__views.__alloyId17!click!hideKeyboard"] = true;
    $.__views.__alloyId13 = Ti.UI.iOS.createToolbar({
        items: __alloyId15,
        id: "__alloyId13"
    });
    $.__views.recordsTextArea = Ti.UI.createTextArea({
        keyboardToolbar: $.__views.__alloyId13,
        id: "recordsTextArea",
        color: "#888",
        textAlign: "left",
        value: "",
        width: "95%",
        height: "100%",
        suppressReturn: "false"
    });
    $.__views.aView.add($.__views.recordsTextArea);
    $.__views.__alloyId13 = Ti.UI.iOS.createToolbar({
        keyboardToolbar: $.__views.__alloyId13,
        id: "recordsTextArea",
        color: "#888",
        textAlign: "left",
        value: "",
        width: "95%",
        height: "100%",
        suppressReturn: "false"
    });
    $.__views.__alloyId18 = Ti.UI.createView({
        height: "40",
        bottom: "0",
        width: "100%",
        backgroundColor: "#EEEEEE",
        id: "__alloyId18"
    });
    $.__views.__alloyId10.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createButton({
        backgroundImage: "/images/btn-remove.png",
        textAlign: "left",
        left: "15",
        width: "30",
        height: "30",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    deleteRecord ? $.__views.__alloyId19.addEventListener("click", deleteRecord) : __defers["$.__views.__alloyId19!click!deleteRecord"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var rec_id = args.id || "";
    var MRECORDS = require("medicalRecords");
    MRECORDS.construct($);
    var medicalRecordsModel = Alloy.createCollection("medicalRecords");
    var details = medicalRecordsModel.getRecordById(rec_id);
    var title = details.title;
    title = title.replace(/&quot;/g, "'");
    var message = details.message;
    $.titleRecord.value = title;
    $.recordsTextArea.value = message;
    $.saveRecord.addEventListener("click", saveRecord);
    __defers["$.__views.__alloyId17!click!hideKeyboard"] && $.__views.__alloyId17.addEventListener("click", hideKeyboard);
    __defers["$.__views.__alloyId19!click!deleteRecord"] && $.__views.__alloyId19.addEventListener("click", deleteRecord);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;