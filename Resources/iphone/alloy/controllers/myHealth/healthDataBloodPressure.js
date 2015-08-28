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
    $.__views.__alloyId215 = Ti.UI.createView({
        id: "__alloyId215"
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: "0"
    });
    $.__views.__alloyId215.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDBPWin.rightNavButton = $.__views.__alloyId215;
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDBPWin.add($.__views.main);
    $.__views.__alloyId216 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId216"
    });
    $.__views.main.add($.__views.__alloyId216);
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
    $.__views.__alloyId216.add($.__views.description);
    $.__views.table = Ti.UI.createView({
        id: "table",
        height: Ti.UI.SIZE,
        top: "10",
        backgroundColor: "#ffffff",
        layout: "vertical",
        scrollable: "false"
    });
    $.__views.main.add($.__views.table);
    $.__views.__alloyId217 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId217"
    });
    $.__views.table.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId218"
    });
    $.__views.table.add($.__views.__alloyId218);
    showDatePicker ? $.__views.__alloyId218.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId218!click!showDatePicker"] = true;
    $.__views.__alloyId219 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
        id: "__alloyId219"
    });
    $.__views.__alloyId218.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: "12",
        id: "__alloyId220"
    });
    $.__views.__alloyId219.add($.__views.__alloyId220);
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "date_value",
        textAlign: "right"
    });
    $.__views.__alloyId219.add($.__views.date_value);
    $.__views.__alloyId221 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId221"
    });
    $.__views.table.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createView({
        selectedBackgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        id: "__alloyId222"
    });
    $.__views.table.add($.__views.__alloyId222);
    showTimePicker ? $.__views.__alloyId222.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId222!click!showTimePicker"] = true;
    $.__views.__alloyId223 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId223"
    });
    $.__views.__alloyId222.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: "12",
        id: "__alloyId224"
    });
    $.__views.__alloyId223.add($.__views.__alloyId224);
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "time_value",
        textAlign: "right"
    });
    $.__views.__alloyId223.add($.__views.time_value);
    $.__views.__alloyId225 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId225"
    });
    $.__views.table.add($.__views.__alloyId225);
    $.__views.tvrField1 = Ti.UI.createView({
        id: "tvrField1",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField1);
    $.__views.__alloyId226 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId226"
    });
    $.__views.tvrField1.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Systolic (mm Hg)",
        top: "12",
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
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
        borderColor: "#ffffff",
        textAlign: "right",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.__alloyId226.add($.__views.field1);
    $.__views.__alloyId228 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId228"
    });
    $.__views.table.add($.__views.__alloyId228);
    $.__views.tvrField2 = Ti.UI.createView({
        id: "tvrField2",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField2);
    $.__views.__alloyId229 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId229"
    });
    $.__views.tvrField2.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createLabel({
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Diastolic (mm Hg)",
        top: "12",
        id: "__alloyId230"
    });
    $.__views.__alloyId229.add($.__views.__alloyId230);
    $.__views.field2 = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        id: "field2",
        top: "5",
        bottom: "5",
        right: "5",
        borderColor: "#ffffff",
        textAlign: "right",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.__alloyId229.add($.__views.field2);
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
    var formType = 2;
    var lib_health = Alloy.createCollection("health");
    var hd = require("healthData");
    hd.construct($);
    hd.todayDate();
    var today = new Date();
    today.getDate();
    today.getMonth();
    today.getFullYear();
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
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthDBPWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.__alloyId218!click!showDatePicker"] && $.__views.__alloyId218.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId222!click!showTimePicker"] && $.__views.__alloyId222.addEventListener("click", showTimePicker);
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;