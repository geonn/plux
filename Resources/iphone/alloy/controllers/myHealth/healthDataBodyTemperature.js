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
        hd.populateData();
        nav.closeWindow($.healthDBPWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataBodyTemperature";
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
    $.__views.__alloyId130 = Ti.UI.createView({
        id: "__alloyId130"
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: "0"
    });
    $.__views.__alloyId130.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDBPWin.rightNavButton = $.__views.__alloyId130;
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDBPWin.add($.__views.main);
    $.__views.__alloyId131 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId131"
    });
    $.__views.main.add($.__views.__alloyId131);
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
    $.__views.__alloyId131.add($.__views.description);
    var __alloyId132 = [];
    $.__views.__alloyId133 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId133"
    });
    __alloyId132.push($.__views.__alloyId133);
    showDatePicker ? $.__views.__alloyId133.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId133!click!showDatePicker"] = true;
    $.__views.__alloyId134 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
        id: "__alloyId134"
    });
    $.__views.__alloyId133.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: "12",
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "date_value",
        textAlign: "right"
    });
    $.__views.__alloyId134.add($.__views.date_value);
    $.__views.__alloyId136 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId136"
    });
    __alloyId132.push($.__views.__alloyId136);
    showTimePicker ? $.__views.__alloyId136.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId136!click!showTimePicker"] = true;
    $.__views.__alloyId137 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId137"
    });
    $.__views.__alloyId136.add($.__views.__alloyId137);
    $.__views.__alloyId138 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: "12",
        id: "__alloyId138"
    });
    $.__views.__alloyId137.add($.__views.__alloyId138);
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "time_value",
        textAlign: "right"
    });
    $.__views.__alloyId137.add($.__views.time_value);
    $.__views.tvrField1 = Ti.UI.createTableViewRow({
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
    __alloyId132.push($.__views.tvrField1);
    $.__views.__alloyId139 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId139"
    });
    $.__views.tvrField1.add($.__views.__alloyId139);
    $.__views.__alloyId140 = Ti.UI.createLabel({
        width: "28%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "C",
        top: "12",
        id: "__alloyId140"
    });
    $.__views.__alloyId139.add($.__views.__alloyId140);
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
    $.__views.__alloyId139.add($.__views.field1);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId132,
        id: "table",
        height: "135",
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
    var formType = 4;
    var lib_health = Alloy.createCollection("health");
    var hd = require("healthData");
    hd.construct($);
    hd.todayDate();
    $.field1.addEventListener("change", function(e) {
        "" != e.value ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.tvrField1.addEventListener("click", function() {
        $.field1.focus();
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.__alloyId133!click!showDatePicker"] && $.__views.__alloyId133.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId136!click!showTimePicker"] && $.__views.__alloyId136.addEventListener("click", showTimePicker);
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;