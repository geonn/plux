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
        hd.showDatePicker({
            date: $.datePicker,
            time: $.timePicker
        });
        hideKeyboard();
    }
    function showTimePicker() {
        hd.showTimePicker({
            date: $.datePicker,
            time: $.timePicker
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
        var amount = field1 / (field2 / 100 * (field2 / 100));
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
            field2: field2 / 100,
            amount: amount.toFixed(2),
            type: formType
        });
        hd.populateData();
        nav.closeWindow($.healthBmiWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataBmi";
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
    $.__views.healthBmiWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Add Data",
        backButtonTitle: "",
        id: "healthBmiWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthBmiWin && $.addTopLevelView($.__views.healthBmiWin);
<<<<<<< HEAD
    $.__views.__alloyId116 = Ti.UI.createView({
        id: "__alloyId116"
=======
    $.__views.__alloyId114 = Ti.UI.createView({
        id: "__alloyId114"
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
    $.__views.__alloyId116.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthBmiWin.rightNavButton = $.__views.__alloyId116;
=======
    $.__views.__alloyId114.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthBmiWin.rightNavButton = $.__views.__alloyId114;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthBmiWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId117 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId117"
    });
    $.__views.main.add($.__views.__alloyId117);
=======
    $.__views.__alloyId115 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId115"
    });
    $.__views.main.add($.__views.__alloyId115);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId117.add($.__views.description);
    var __alloyId118 = [];
    $.__views.__alloyId119 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId119"
    });
    __alloyId118.push($.__views.__alloyId119);
    showDatePicker ? $.__views.__alloyId119.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId119!click!showDatePicker"] = true;
    $.__views.__alloyId120 = Ti.UI.createView({
=======
    $.__views.__alloyId115.add($.__views.description);
    var __alloyId116 = [];
    $.__views.__alloyId117 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId117"
    });
    __alloyId116.push($.__views.__alloyId117);
    showDatePicker ? $.__views.__alloyId117.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId117!click!showDatePicker"] = true;
    $.__views.__alloyId118 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId120"
    });
    $.__views.__alloyId119.add($.__views.__alloyId120);
    $.__views.__alloyId121 = Ti.UI.createLabel({
=======
        id: "__alloyId118"
    });
    $.__views.__alloyId117.add($.__views.__alloyId118);
    $.__views.__alloyId119 = Ti.UI.createLabel({
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
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
=======
        id: "__alloyId119"
    });
    $.__views.__alloyId118.add($.__views.__alloyId119);
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
    $.__views.__alloyId120.add($.__views.date_value);
    $.__views.__alloyId122 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId122"
    });
    __alloyId118.push($.__views.__alloyId122);
    showTimePicker ? $.__views.__alloyId122.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId122!click!showTimePicker"] = true;
    $.__views.__alloyId123 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createLabel({
=======
    $.__views.__alloyId118.add($.__views.date_value);
    $.__views.__alloyId120 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId120"
    });
    __alloyId116.push($.__views.__alloyId120);
    showTimePicker ? $.__views.__alloyId120.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId120!click!showTimePicker"] = true;
    $.__views.__alloyId121 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId121"
    });
    $.__views.__alloyId120.add($.__views.__alloyId121);
    $.__views.__alloyId122 = Ti.UI.createLabel({
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
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
=======
        id: "__alloyId122"
    });
    $.__views.__alloyId121.add($.__views.__alloyId122);
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
    $.__views.__alloyId123.add($.__views.time_value);
=======
    $.__views.__alloyId121.add($.__views.time_value);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createTableViewRow({
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId118.push($.__views.tvrField1);
    $.__views.__alloyId125 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId125"
    });
    $.__views.tvrField1.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createLabel({
=======
    __alloyId116.push($.__views.tvrField1);
    $.__views.__alloyId123 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId123"
    });
    $.__views.tvrField1.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "28%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "KG",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
=======
        id: "__alloyId124"
    });
    $.__views.__alloyId123.add($.__views.__alloyId124);
>>>>>>> origin/master
    $.__views.field1 = Ti.UI.createTextField({
        id: "field1",
        width: "64%",
        right: "0",
        top: "5",
        textAlign: "right",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        height: "30",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId125.add($.__views.field1);
=======
    $.__views.__alloyId123.add($.__views.field1);
>>>>>>> origin/master
    $.__views.tvrField2 = Ti.UI.createTableViewRow({
        id: "tvrField2",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId118.push($.__views.tvrField2);
    $.__views.__alloyId127 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId127"
    });
    $.__views.tvrField2.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createLabel({
=======
    __alloyId116.push($.__views.tvrField2);
    $.__views.__alloyId125 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId125"
    });
    $.__views.tvrField2.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "30%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Height(cm)",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId128"
    });
    $.__views.__alloyId127.add($.__views.__alloyId128);
=======
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
>>>>>>> origin/master
    $.__views.field2 = Ti.UI.createTextField({
        id: "field2",
        width: "62%",
        right: "0",
        top: "5",
        textAlign: "right",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        height: "30",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId127.add($.__views.field2);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId118,
=======
    $.__views.__alloyId125.add($.__views.field2);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId116,
>>>>>>> origin/master
        id: "table",
        height: "180",
        top: "40",
        scrollable: "false"
    });
    $.__views.main.add($.__views.table);
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
    changeDate ? $.__views.datePicker.addEventListener("change", changeDate) : __defers["$.__views.datePicker!change!changeDate"] = true;
    $.__views.timePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "timePicker",
        type: Ti.UI.PICKER_TYPE_TIME,
        visible: "false"
    });
    $.__views.selectorView.add($.__views.timePicker);
    changeTime ? $.__views.timePicker.addEventListener("change", changeTime) : __defers["$.__views.timePicker!change!changeTime"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var formType = 1;
    var lib_health = Alloy.createCollection("health");
    var hd = require("healthData");
    hd.construct($);
    hd.todayDate();
    $.field2.addEventListener("change", function(e) {
        var field2 = $.field2.value;
        "" != e.value && "" != field2 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.field1.addEventListener("change", function(e) {
        var field1 = $.field1.value;
        "" != e.value && "" != field1 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.tvrField1.addEventListener("click", function() {
        $.field2.focus();
    });
    $.tvrField2.addEventListener("click", function() {
        $.field1.focus();
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId119!click!showDatePicker"] && $.__views.__alloyId119.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId122!click!showTimePicker"] && $.__views.__alloyId122.addEventListener("click", showTimePicker);
=======
    __defers["$.__views.__alloyId117!click!showDatePicker"] && $.__views.__alloyId117.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId120!click!showTimePicker"] && $.__views.__alloyId120.addEventListener("click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;