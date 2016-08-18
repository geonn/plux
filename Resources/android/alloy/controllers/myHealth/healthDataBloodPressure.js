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
        $.field2.blur();
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
        var field2 = $.field2.value;
        var s_date = date.split("/");
        var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];
        var amount = (2 * parseInt(field2) + parseInt(field1)) / 3;
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
            field2: field2,
            amount: amount.toFixed(2),
            type: formType
        });
        hd.loadInfo(formType);
        nav.closeWindow($.healthDBPWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataBloodPressure";
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
    $.__views.healthDBPWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Add Data",
        backButtonTitle: "",
        id: "healthDBPWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthDBPWin && $.addTopLevelView($.__views.healthDBPWin);
<<<<<<< HEAD
    $.__views.__alloyId600 = Ti.UI.createView({
        id: "__alloyId600"
=======
    $.__views.__alloyId604 = Ti.UI.createView({
        id: "__alloyId604"
>>>>>>> origin/master
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: 0
    });
<<<<<<< HEAD
    $.__views.__alloyId600.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDBPWin.rightNavButton = $.__views.__alloyId600;
=======
    $.__views.__alloyId604.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDBPWin.rightNavButton = $.__views.__alloyId604;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDBPWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId601 = Ti.UI.createView({
=======
    $.__views.__alloyId605 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId601"
    });
    $.__views.main.add($.__views.__alloyId601);
    $.__views.__alloyId602 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId602"
    });
    $.__views.__alloyId601.add($.__views.__alloyId602);
=======
        id: "__alloyId605"
    });
    $.__views.main.add($.__views.__alloyId605);
    $.__views.__alloyId606 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId606"
    });
    $.__views.__alloyId605.add($.__views.__alloyId606);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId602.add($.__views.btnBack);
=======
    $.__views.__alloyId606.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId601.add($.__views.pageTitle);
    $.__views.__alloyId603 = Ti.UI.createLabel({
=======
    $.__views.__alloyId605.add($.__views.pageTitle);
    $.__views.__alloyId607 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Add Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId603"
    });
    $.__views.pageTitle.add($.__views.__alloyId603);
    $.__views.__alloyId604 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId604"
    });
    $.__views.__alloyId601.add($.__views.__alloyId604);
=======
        id: "__alloyId607"
    });
    $.__views.pageTitle.add($.__views.__alloyId607);
    $.__views.__alloyId608 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId608"
    });
    $.__views.__alloyId605.add($.__views.__alloyId608);
>>>>>>> origin/master
    $.__views.saveButton = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        touchEnabled: false,
        id: "saveButton",
        title: "Save",
        right: 0
    });
<<<<<<< HEAD
    $.__views.__alloyId604.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId605 = Ti.UI.createView({
        layout: "vertical",
        height: 30,
        top: 10,
        id: "__alloyId605"
    });
    $.__views.main.add($.__views.__alloyId605);
=======
    $.__views.__alloyId608.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId609 = Ti.UI.createView({
        layout: "vertical",
        height: 30,
        top: 10,
        id: "__alloyId609"
    });
    $.__views.main.add($.__views.__alloyId609);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#878686",
        text: "Please fill in your information below",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId605.add($.__views.description);
=======
    $.__views.__alloyId609.add($.__views.description);
>>>>>>> origin/master
    $.__views.table = Ti.UI.createView({
        id: "table",
        height: Ti.UI.SIZE,
        top: 10,
        backgroundColor: "#ffffff",
        layout: "vertical",
        scrollable: false
    });
    $.__views.main.add($.__views.table);
<<<<<<< HEAD
    $.__views.__alloyId606 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId606"
    });
    $.__views.table.add($.__views.__alloyId606);
    $.__views.__alloyId607 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId607"
    });
    $.__views.table.add($.__views.__alloyId607);
    showDatePicker ? $.addListener($.__views.__alloyId607, "click", showDatePicker) : __defers["$.__views.__alloyId607!click!showDatePicker"] = true;
    $.__views.__alloyId608 = Ti.UI.createView({
=======
    $.__views.__alloyId610 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId610"
    });
    $.__views.table.add($.__views.__alloyId610);
    $.__views.__alloyId611 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId611"
    });
    $.__views.table.add($.__views.__alloyId611);
    showDatePicker ? $.addListener($.__views.__alloyId611, "click", showDatePicker) : __defers["$.__views.__alloyId611!click!showDatePicker"] = true;
    $.__views.__alloyId612 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 45,
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId608"
    });
    $.__views.__alloyId607.add($.__views.__alloyId608);
    $.__views.__alloyId609 = Ti.UI.createLabel({
=======
        id: "__alloyId612"
    });
    $.__views.__alloyId611.add($.__views.__alloyId612);
    $.__views.__alloyId613 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId609"
    });
    $.__views.__alloyId608.add($.__views.__alloyId609);
=======
        id: "__alloyId613"
    });
    $.__views.__alloyId612.add($.__views.__alloyId613);
>>>>>>> origin/master
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        color: "#707070",
        text: "",
        top: 12,
        id: "date_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId608.add($.__views.date_value);
    $.__views.__alloyId610 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId610"
    });
    $.__views.table.add($.__views.__alloyId610);
    $.__views.__alloyId611 = Ti.UI.createView({
        selectedBackgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        id: "__alloyId611"
    });
    $.__views.table.add($.__views.__alloyId611);
    showTimePicker ? $.addListener($.__views.__alloyId611, "click", showTimePicker) : __defers["$.__views.__alloyId611!click!showTimePicker"] = true;
    $.__views.__alloyId612 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId612"
    });
    $.__views.__alloyId611.add($.__views.__alloyId612);
    $.__views.__alloyId613 = Ti.UI.createLabel({
=======
    $.__views.__alloyId612.add($.__views.date_value);
    $.__views.__alloyId614 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId614"
    });
    $.__views.table.add($.__views.__alloyId614);
    $.__views.__alloyId615 = Ti.UI.createView({
        selectedBackgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        id: "__alloyId615"
    });
    $.__views.table.add($.__views.__alloyId615);
    showTimePicker ? $.addListener($.__views.__alloyId615, "click", showTimePicker) : __defers["$.__views.__alloyId615!click!showTimePicker"] = true;
    $.__views.__alloyId616 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId616"
    });
    $.__views.__alloyId615.add($.__views.__alloyId616);
    $.__views.__alloyId617 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId613"
    });
    $.__views.__alloyId612.add($.__views.__alloyId613);
=======
        id: "__alloyId617"
    });
    $.__views.__alloyId616.add($.__views.__alloyId617);
>>>>>>> origin/master
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        color: "#707070",
        text: "",
        top: 12,
        id: "time_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId612.add($.__views.time_value);
    $.__views.__alloyId614 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId614"
    });
    $.__views.table.add($.__views.__alloyId614);
=======
    $.__views.__alloyId616.add($.__views.time_value);
    $.__views.__alloyId618 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId618"
    });
    $.__views.table.add($.__views.__alloyId618);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createView({
        id: "tvrField1",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField1);
<<<<<<< HEAD
    $.__views.__alloyId615 = Ti.UI.createView({
        layout: "horizontal",
        height: 55,
        width: "100%",
        id: "__alloyId615"
    });
    $.__views.tvrField1.add($.__views.__alloyId615);
    $.__views.__alloyId616 = Ti.UI.createLabel({
=======
    $.__views.__alloyId619 = Ti.UI.createView({
        layout: "horizontal",
        height: 55,
        width: "100%",
        id: "__alloyId619"
    });
    $.__views.tvrField1.add($.__views.__alloyId619);
    $.__views.__alloyId620 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Systolic (mm Hg)",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId616"
    });
    $.__views.__alloyId615.add($.__views.__alloyId616);
=======
        id: "__alloyId620"
    });
    $.__views.__alloyId619.add($.__views.__alloyId620);
>>>>>>> origin/master
    $.__views.field1 = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        id: "field1",
        top: 5,
        bottom: 5,
        right: 5,
        borderColor: "#ffffff",
        textAlign: "right",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId615.add($.__views.field1);
    $.__views.__alloyId617 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId617"
    });
    $.__views.table.add($.__views.__alloyId617);
=======
    $.__views.__alloyId619.add($.__views.field1);
    $.__views.__alloyId621 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId621"
    });
    $.__views.table.add($.__views.__alloyId621);
>>>>>>> origin/master
    $.__views.tvrField2 = Ti.UI.createView({
        id: "tvrField2",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField2);
<<<<<<< HEAD
    $.__views.__alloyId618 = Ti.UI.createView({
        layout: "horizontal",
        height: 55,
        width: "100%",
        id: "__alloyId618"
    });
    $.__views.tvrField2.add($.__views.__alloyId618);
    $.__views.__alloyId619 = Ti.UI.createLabel({
=======
    $.__views.__alloyId622 = Ti.UI.createView({
        layout: "horizontal",
        height: 55,
        width: "100%",
        id: "__alloyId622"
    });
    $.__views.tvrField2.add($.__views.__alloyId622);
    $.__views.__alloyId623 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Diastolic (mm Hg)",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId619"
    });
    $.__views.__alloyId618.add($.__views.__alloyId619);
=======
        id: "__alloyId623"
    });
    $.__views.__alloyId622.add($.__views.__alloyId623);
>>>>>>> origin/master
    $.__views.field2 = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        id: "field2",
        top: 5,
        bottom: 5,
        right: 5,
        borderColor: "#ffffff",
        textAlign: "right",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId618.add($.__views.field2);
=======
    $.__views.__alloyId622.add($.__views.field2);
>>>>>>> origin/master
    $.__views.selectorView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "selectorView",
        bottom: 0
    });
    $.__views.main.add($.__views.selectorView);
    $.__views.datePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "datePicker",
        type: Ti.UI.PICKER_TYPE_DATE,
        visible: false
    });
    $.__views.selectorView.add($.__views.datePicker);
    changeDate ? $.addListener($.__views.datePicker, "change", changeDate) : __defers["$.__views.datePicker!change!changeDate"] = true;
    $.__views.timePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "timePicker",
        type: Ti.UI.PICKER_TYPE_TIME,
        visible: false
    });
    $.__views.selectorView.add($.__views.timePicker);
    changeTime ? $.addListener($.__views.timePicker, "change", changeTime) : __defers["$.__views.timePicker!change!changeTime"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var formType = 2;
    var lib_health = Alloy.createCollection("health");
    var hd = require("healthData");
    hd.construct($);
    hd.todayDate();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    $.field2.addEventListener("change", function(e) {
        var field2 = $.field2.value;
        "" != e.value && "" != field2 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.field1.addEventListener("change", function(e) {
        var field1 = $.field1.value;
        "" != e.value && "" != field1 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.tvrField1.addEventListener("click", function() {
        $.field1.focus();
    });
    $.tvrField2.addEventListener("click", function() {
        $.field2.focus();
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthDBPWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId607!click!showDatePicker"] && $.addListener($.__views.__alloyId607, "click", showDatePicker);
    __defers["$.__views.__alloyId611!click!showTimePicker"] && $.addListener($.__views.__alloyId611, "click", showTimePicker);
=======
    __defers["$.__views.__alloyId611!click!showDatePicker"] && $.addListener($.__views.__alloyId611, "click", showDatePicker);
    __defers["$.__views.__alloyId615!click!showTimePicker"] && $.addListener($.__views.__alloyId615, "click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.addListener($.__views.datePicker, "change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.addListener($.__views.timePicker, "change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;