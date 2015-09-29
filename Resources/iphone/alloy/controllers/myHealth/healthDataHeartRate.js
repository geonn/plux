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
    $.__views.__alloyId336 = Ti.UI.createView({
        id: "__alloyId336"
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: "0"
    });
    $.__views.__alloyId336.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDHWin.rightNavButton = $.__views.__alloyId336;
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDHWin.add($.__views.main);
    $.__views.__alloyId337 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId337"
    });
    $.__views.main.add($.__views.__alloyId337);
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
    $.__views.__alloyId337.add($.__views.description);
    $.__views.table = Ti.UI.createView({
        id: "table",
        height: Ti.UI.SIZE,
        top: "10",
        backgroundColor: "#ffffff",
        layout: "vertical",
        scrollable: "false"
    });
    $.__views.main.add($.__views.table);
    $.__views.__alloyId338 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId338"
    });
    $.__views.table.add($.__views.__alloyId338);
    showDatePicker ? $.addListener($.__views.__alloyId338, "click", showDatePicker) : __defers["$.__views.__alloyId338!click!showDatePicker"] = true;
    $.__views.__alloyId339 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
        id: "__alloyId339"
    });
    $.__views.__alloyId338.add($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: "12",
        id: "__alloyId340"
    });
    $.__views.__alloyId339.add($.__views.__alloyId340);
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "date_value",
        textAlign: "right"
    });
    $.__views.__alloyId339.add($.__views.date_value);
    $.__views.__alloyId341 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId341"
    });
    $.__views.table.add($.__views.__alloyId341);
    $.__views.__alloyId342 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId342"
    });
    $.__views.table.add($.__views.__alloyId342);
    showTimePicker ? $.addListener($.__views.__alloyId342, "click", showTimePicker) : __defers["$.__views.__alloyId342!click!showTimePicker"] = true;
    $.__views.__alloyId343 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId343"
    });
    $.__views.__alloyId342.add($.__views.__alloyId343);
    $.__views.__alloyId344 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: "12",
        id: "__alloyId344"
    });
    $.__views.__alloyId343.add($.__views.__alloyId344);
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "time_value",
        textAlign: "right"
    });
    $.__views.__alloyId343.add($.__views.time_value);
    $.__views.__alloyId345 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId345"
    });
    $.__views.table.add($.__views.__alloyId345);
    $.__views.tvrField1 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField1);
    $.__views.__alloyId346 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId346"
    });
    $.__views.tvrField1.add($.__views.__alloyId346);
    $.__views.__alloyId347 = Ti.UI.createLabel({
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "bpm",
        top: "12",
        id: "__alloyId347"
    });
    $.__views.__alloyId346.add($.__views.__alloyId347);
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
    $.__views.__alloyId346.add($.__views.field1);
    $.__views.__alloyId348 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId348"
    });
    $.__views.table.add($.__views.__alloyId348);
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
    today.getDate();
    today.getMonth();
    today.getFullYear();
    $.field1.addEventListener("change", function(e) {
        var field1 = $.field1.value;
        "" != e.value && "" != field1 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.tvrField1.addEventListener("click", function() {
        $.field1.focus();
    });
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthDHWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
    __defers["$.__views.__alloyId338!click!showDatePicker"] && $.addListener($.__views.__alloyId338, "click", showDatePicker);
    __defers["$.__views.__alloyId342!click!showTimePicker"] && $.addListener($.__views.__alloyId342, "click", showTimePicker);
    __defers["$.__views.datePicker!change!changeDate"] && $.addListener($.__views.datePicker, "change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.addListener($.__views.timePicker, "change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;