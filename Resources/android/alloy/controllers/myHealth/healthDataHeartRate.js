function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideKeyboard() {
        $.field1.blur();
    }
    function showDatePicker() {
        var datePicker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_DATE,
            minDate: new Date(1930, 0, 1),
            maxDate: new Date(yyyy, mm, dd),
            id: "datePicker",
            visible: false
        });
        datePicker.showDatePickerDialog({
            value: new Date(yyyy, parseInt(mm), dd),
            callback: function(e) {
                e.cancel || changeDate(e);
            }
        });
        hideKeyboard();
    }
    function showTimePicker() {
        var timePicker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_TIME,
            id: "timePicker",
            visible: false
        });
        timePicker.showTimePickerDialog({
            callback: function(e) {
                e.cancel || changeTime(e);
            }
        });
        hideKeyboard();
    }
    function changeDate(e) {
        hd.changeDate({
            date: e.value
        });
    }
    function changeTime(e) {
        hd.changeTime({
            time: e.value
        });
    }
    function doSaveRecords() {
        var date = $.date_value.text;
        var time = $.time_value.text;
        var field1 = $.field1.value;
        var s_date = date.split("/");
        var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];
        var s_time = time.split(" ");
        var newTime = s_time[0];
        if ("PM" == s_time[1]) {
            hm = newTime.split(":");
            newTime = parseInt(hm[0]) + 12 + ":" + hm[1];
        }
        lib_health.addHealthData({
            date: newDate,
            time: newTime,
            field1: field1,
            amount: field1,
            type: formType
        });
        hd.loadInfo(formType);
        nav.closeWindow($.healthDHWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataHeartRate";
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
    $.__views.healthDHWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Add Data",
        backButtonTitle: "",
        id: "healthDHWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthDHWin && $.addTopLevelView($.__views.healthDHWin);
<<<<<<< HEAD
    $.__views.__alloyId480 = Ti.UI.createView({
        id: "__alloyId480"
=======
    $.__views.__alloyId482 = Ti.UI.createView({
        id: "__alloyId482"
>>>>>>> origin/master
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: "0"
    });
<<<<<<< HEAD
    $.__views.__alloyId480.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDHWin.rightNavButton = $.__views.__alloyId480;
=======
    $.__views.__alloyId482.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDHWin.rightNavButton = $.__views.__alloyId482;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDHWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId481 = Ti.UI.createView({
=======
    $.__views.__alloyId483 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId481"
    });
    $.__views.main.add($.__views.__alloyId481);
    $.__views.__alloyId482 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId482"
    });
    $.__views.__alloyId481.add($.__views.__alloyId482);
=======
        id: "__alloyId483"
    });
    $.__views.main.add($.__views.__alloyId483);
    $.__views.__alloyId484 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId484"
    });
    $.__views.__alloyId483.add($.__views.__alloyId484);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId482.add($.__views.btnBack);
=======
    $.__views.__alloyId484.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId481.add($.__views.pageTitle);
    $.__views.__alloyId483 = Ti.UI.createLabel({
=======
    $.__views.__alloyId483.add($.__views.pageTitle);
    $.__views.__alloyId485 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Add Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId483"
    });
    $.__views.pageTitle.add($.__views.__alloyId483);
    $.__views.__alloyId484 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId484"
    });
    $.__views.__alloyId481.add($.__views.__alloyId484);
=======
        id: "__alloyId485"
    });
    $.__views.pageTitle.add($.__views.__alloyId485);
    $.__views.__alloyId486 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId486"
    });
    $.__views.__alloyId483.add($.__views.__alloyId486);
>>>>>>> origin/master
    $.__views.saveButton = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        touchEnabled: false,
        id: "saveButton",
        title: "Save",
        right: "0"
    });
<<<<<<< HEAD
    $.__views.__alloyId484.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId485 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId485"
    });
    $.__views.main.add($.__views.__alloyId485);
=======
    $.__views.__alloyId486.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId487 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId487"
    });
    $.__views.main.add($.__views.__alloyId487);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId485.add($.__views.description);
=======
    $.__views.__alloyId487.add($.__views.description);
>>>>>>> origin/master
    $.__views.table = Ti.UI.createView({
        id: "table",
        height: Ti.UI.SIZE,
        top: "10",
        backgroundColor: "#ffffff",
        layout: "vertical",
        scrollable: "false"
    });
    $.__views.main.add($.__views.table);
<<<<<<< HEAD
    $.__views.__alloyId486 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId486"
    });
    $.__views.table.add($.__views.__alloyId486);
    showDatePicker ? $.addListener($.__views.__alloyId486, "click", showDatePicker) : __defers["$.__views.__alloyId486!click!showDatePicker"] = true;
    $.__views.__alloyId487 = Ti.UI.createView({
=======
    $.__views.__alloyId488 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId488"
    });
    $.__views.table.add($.__views.__alloyId488);
    showDatePicker ? $.addListener($.__views.__alloyId488, "click", showDatePicker) : __defers["$.__views.__alloyId488!click!showDatePicker"] = true;
    $.__views.__alloyId489 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId487"
    });
    $.__views.__alloyId486.add($.__views.__alloyId487);
    $.__views.__alloyId488 = Ti.UI.createLabel({
=======
        id: "__alloyId489"
    });
    $.__views.__alloyId488.add($.__views.__alloyId489);
    $.__views.__alloyId490 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId488"
    });
    $.__views.__alloyId487.add($.__views.__alloyId488);
=======
        id: "__alloyId490"
    });
    $.__views.__alloyId489.add($.__views.__alloyId490);
>>>>>>> origin/master
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "date_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId487.add($.__views.date_value);
    $.__views.__alloyId489 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId489"
    });
    $.__views.table.add($.__views.__alloyId489);
    $.__views.__alloyId490 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId490"
    });
    $.__views.table.add($.__views.__alloyId490);
    showTimePicker ? $.addListener($.__views.__alloyId490, "click", showTimePicker) : __defers["$.__views.__alloyId490!click!showTimePicker"] = true;
    $.__views.__alloyId491 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId491"
    });
    $.__views.__alloyId490.add($.__views.__alloyId491);
    $.__views.__alloyId492 = Ti.UI.createLabel({
=======
    $.__views.__alloyId489.add($.__views.date_value);
    $.__views.__alloyId491 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId491"
    });
    $.__views.table.add($.__views.__alloyId491);
    $.__views.__alloyId492 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId492"
    });
    $.__views.table.add($.__views.__alloyId492);
    showTimePicker ? $.addListener($.__views.__alloyId492, "click", showTimePicker) : __defers["$.__views.__alloyId492!click!showTimePicker"] = true;
    $.__views.__alloyId493 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId493"
    });
    $.__views.__alloyId492.add($.__views.__alloyId493);
    $.__views.__alloyId494 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId492"
    });
    $.__views.__alloyId491.add($.__views.__alloyId492);
=======
        id: "__alloyId494"
    });
    $.__views.__alloyId493.add($.__views.__alloyId494);
>>>>>>> origin/master
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "time_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId491.add($.__views.time_value);
    $.__views.__alloyId493 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId493"
    });
    $.__views.table.add($.__views.__alloyId493);
=======
    $.__views.__alloyId493.add($.__views.time_value);
    $.__views.__alloyId495 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId495"
    });
    $.__views.table.add($.__views.__alloyId495);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField1);
<<<<<<< HEAD
    $.__views.__alloyId494 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId494"
    });
    $.__views.tvrField1.add($.__views.__alloyId494);
    $.__views.__alloyId495 = Ti.UI.createLabel({
=======
    $.__views.__alloyId496 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId496"
    });
    $.__views.tvrField1.add($.__views.__alloyId496);
    $.__views.__alloyId497 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "bpm",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId495"
    });
    $.__views.__alloyId494.add($.__views.__alloyId495);
=======
        id: "__alloyId497"
    });
    $.__views.__alloyId496.add($.__views.__alloyId497);
>>>>>>> origin/master
    $.__views.field1 = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        id: "field1",
        top: "5",
        bottom: "5",
        right: "5",
        textAlign: "right",
        borderColor: "#ffffff",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId494.add($.__views.field1);
    $.__views.__alloyId496 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId496"
    });
    $.__views.table.add($.__views.__alloyId496);
=======
    $.__views.__alloyId496.add($.__views.field1);
    $.__views.__alloyId498 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId498"
    });
    $.__views.table.add($.__views.__alloyId498);
>>>>>>> origin/master
    $.__views.selectorView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "selectorView",
        bottom: "0"
    });
    $.__views.main.add($.__views.selectorView);
    $.__views.datePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "datePicker",
        type: Ti.UI.PICKER_TYPE_DATE,
        visible: "false"
    });
    $.__views.selectorView.add($.__views.datePicker);
    changeDate ? $.addListener($.__views.datePicker, "change", changeDate) : __defers["$.__views.datePicker!change!changeDate"] = true;
    $.__views.timePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "timePicker",
        type: Ti.UI.PICKER_TYPE_TIME,
        visible: "false"
    });
    $.__views.selectorView.add($.__views.timePicker);
    changeTime ? $.addListener($.__views.timePicker, "change", changeTime) : __defers["$.__views.timePicker!change!changeTime"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var formType = 3;
    var lib_health = Alloy.createCollection("health");
    var hd = require("healthData");
    hd.construct($);
    hd.todayDate();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    $.field1.addEventListener("change", function(e) {
        var field1 = $.field1.value;
        "" != e.value && "" != field1 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.tvrField1.addEventListener("click", function() {
        $.field1.focus();
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthDHWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId486!click!showDatePicker"] && $.addListener($.__views.__alloyId486, "click", showDatePicker);
    __defers["$.__views.__alloyId490!click!showTimePicker"] && $.addListener($.__views.__alloyId490, "click", showTimePicker);
=======
    __defers["$.__views.__alloyId488!click!showDatePicker"] && $.addListener($.__views.__alloyId488, "click", showDatePicker);
    __defers["$.__views.__alloyId492!click!showTimePicker"] && $.addListener($.__views.__alloyId492, "click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.addListener($.__views.datePicker, "change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.addListener($.__views.timePicker, "change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;