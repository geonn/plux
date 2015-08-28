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
        hd.loadInfo(formType);
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
<<<<<<< HEAD
    $.__views.__alloyId250 = Ti.UI.createView({
        id: "__alloyId250"
=======
    $.__views.__alloyId248 = Ti.UI.createView({
        id: "__alloyId248"
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
    $.__views.__alloyId250.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDBPWin.rightNavButton = $.__views.__alloyId250;
=======
    $.__views.__alloyId248.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDBPWin.rightNavButton = $.__views.__alloyId248;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDBPWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId251 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId251"
    });
    $.__views.main.add($.__views.__alloyId251);
=======
    $.__views.__alloyId249 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId249"
    });
    $.__views.main.add($.__views.__alloyId249);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId251.add($.__views.description);
=======
    $.__views.__alloyId249.add($.__views.description);
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
    $.__views.__alloyId252 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId252"
    });
    $.__views.table.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId253"
    });
    $.__views.table.add($.__views.__alloyId253);
    showDatePicker ? $.__views.__alloyId253.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId253!click!showDatePicker"] = true;
    $.__views.__alloyId254 = Ti.UI.createView({
=======
    $.__views.__alloyId250 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId250"
    });
    $.__views.table.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId251"
    });
    $.__views.table.add($.__views.__alloyId251);
    showDatePicker ? $.__views.__alloyId251.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId251!click!showDatePicker"] = true;
    $.__views.__alloyId252 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId254"
    });
    $.__views.__alloyId253.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createLabel({
=======
        id: "__alloyId252"
    });
    $.__views.__alloyId251.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
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
        id: "__alloyId255"
    });
    $.__views.__alloyId254.add($.__views.__alloyId255);
=======
        id: "__alloyId253"
    });
    $.__views.__alloyId252.add($.__views.__alloyId253);
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
    $.__views.__alloyId254.add($.__views.date_value);
    $.__views.__alloyId256 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId256"
    });
    $.__views.table.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId257"
    });
    $.__views.table.add($.__views.__alloyId257);
    showTimePicker ? $.__views.__alloyId257.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId257!click!showTimePicker"] = true;
    $.__views.__alloyId258 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId258"
    });
    $.__views.__alloyId257.add($.__views.__alloyId258);
    $.__views.__alloyId259 = Ti.UI.createLabel({
=======
    $.__views.__alloyId252.add($.__views.date_value);
    $.__views.__alloyId254 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId254"
    });
    $.__views.table.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId255"
    });
    $.__views.table.add($.__views.__alloyId255);
    showTimePicker ? $.__views.__alloyId255.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId255!click!showTimePicker"] = true;
    $.__views.__alloyId256 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId256"
    });
    $.__views.__alloyId255.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
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
        id: "__alloyId259"
    });
    $.__views.__alloyId258.add($.__views.__alloyId259);
=======
        id: "__alloyId257"
    });
    $.__views.__alloyId256.add($.__views.__alloyId257);
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
    $.__views.__alloyId258.add($.__views.time_value);
    $.__views.__alloyId260 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId260"
    });
    $.__views.table.add($.__views.__alloyId260);
=======
    $.__views.__alloyId256.add($.__views.time_value);
    $.__views.__alloyId258 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId258"
    });
    $.__views.table.add($.__views.__alloyId258);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField1);
<<<<<<< HEAD
    $.__views.__alloyId261 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId261"
    });
    $.__views.tvrField1.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createLabel({
=======
    $.__views.__alloyId259 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId259"
    });
    $.__views.tvrField1.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "C",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId262"
    });
    $.__views.__alloyId261.add($.__views.__alloyId262);
=======
        id: "__alloyId260"
    });
    $.__views.__alloyId259.add($.__views.__alloyId260);
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
        borderColor: "#ffffff",
        textAlign: "right",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId261.add($.__views.field1);
=======
    $.__views.__alloyId259.add($.__views.field1);
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
    var today = new Date();
    today.getDate();
    today.getMonth();
    today.getFullYear();
    $.field1.addEventListener("change", function(e) {
        "" != e.value ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.tvrField1.addEventListener("click", function() {
        $.field1.focus();
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthDBPWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId253!click!showDatePicker"] && $.__views.__alloyId253.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId257!click!showTimePicker"] && $.__views.__alloyId257.addEventListener("click", showTimePicker);
=======
    __defers["$.__views.__alloyId251!click!showDatePicker"] && $.__views.__alloyId251.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId255!click!showTimePicker"] && $.__views.__alloyId255.addEventListener("click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;