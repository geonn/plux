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
        s_date[2] + "-" + s_date[1] + "-" + s_date[0];
        var amount = (2 * parseInt(field2) + parseInt(field1)) / 3;
        var s_time = time.split(" ");
        var newTime = s_time[0];
        if ("PM" == s_time[1]) {
            hm = newTime.split(":");
            newTime = parseInt(hm[0]) + 12 + ":" + hm[1];
        }
        alert(amount);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "healthDataBloodPressure";
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
    $.__views.healthDataBloodPressure = Ti.UI.createWindow({
        fullscreen: true,
        title: "Add Data",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "healthDataBloodPressure"
    });
    $.__views.healthDataBloodPressure && $.addTopLevelView($.__views.healthDataBloodPressure);
    $.__views.__alloyId4 = Ti.UI.createView({
        id: "__alloyId4"
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: "0"
    });
    $.__views.__alloyId4.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDataBloodPressure.rightNavButton = $.__views.__alloyId4;
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDataBloodPressure.add($.__views.main);
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId5"
    });
    $.__views.main.add($.__views.__alloyId5);
    $.__views.description = Ti.UI.createLabel({
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
    $.__views.__alloyId5.add($.__views.description);
    var __alloyId6 = [];
    $.__views.__alloyId7 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId7"
    });
    __alloyId6.push($.__views.__alloyId7);
    showDatePicker ? $.__views.__alloyId7.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId7!click!showDatePicker"] = true;
    $.__views.__alloyId8 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: "12",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.date_value = Ti.UI.createLabel({
        text: "",
        top: "12",
        color: "#707070",
        id: "date_value",
        textAlign: "right",
        width: "80%"
    });
    $.__views.__alloyId8.add($.__views.date_value);
    $.__views.__alloyId10 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId10"
    });
    __alloyId6.push($.__views.__alloyId10);
    showTimePicker ? $.__views.__alloyId10.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId10!click!showTimePicker"] = true;
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId11"
    });
    $.__views.__alloyId10.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: "12",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.time_value = Ti.UI.createLabel({
        text: "",
        top: "12",
        color: "#707070",
        id: "time_value",
        textAlign: "right",
        width: "80%"
    });
    $.__views.__alloyId11.add($.__views.time_value);
    $.__views.tvrField1 = Ti.UI.createTableViewRow({
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
    __alloyId6.push($.__views.tvrField1);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId13"
    });
    $.__views.tvrField1.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Systolic (mm Hg)",
        width: "48%",
        top: "12",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.field1 = Ti.UI.createTextField({
        id: "field1",
        width: "40%",
        right: "0",
        top: "5",
        textAlign: "right",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        height: "30",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.__alloyId13.add($.__views.field1);
    $.__views.tvrField2 = Ti.UI.createTableViewRow({
        id: "tvrField2",
        selectedBackgroundColor: "#ffffff"
    });
    __alloyId6.push($.__views.tvrField2);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId15"
    });
    $.__views.tvrField2.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Diastolic (mm Hg)",
        width: "48%",
        top: "12",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.field2 = Ti.UI.createTextField({
        id: "field2",
        width: "40%",
        right: "0",
        top: "5",
        textAlign: "right",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        height: "30",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.__alloyId15.add($.__views.field2);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId6,
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
    Alloy.createCollection("health");
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
        $.field1.focus();
    });
    $.tvrField2.addEventListener("click", function() {
        $.field2.focus();
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.__alloyId7!click!showDatePicker"] && $.__views.__alloyId7.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId10!click!showTimePicker"] && $.__views.__alloyId10.addEventListener("click", showTimePicker);
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;