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
        hd.loadInfo(formType);
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
    $.__views.__alloyId158 = Ti.UI.createView({
        id: "__alloyId158"
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: "0"
    });
    $.__views.__alloyId158.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthBmiWin.rightNavButton = $.__views.__alloyId158;
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.healthBmiWin.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.__alloyId159 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
        id: "__alloyId159"
    });
    $.__views.loadingBar.add($.__views.__alloyId159);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthBmiWin.add($.__views.main);
    $.__views.__alloyId160 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId160"
    });
    $.__views.main.add($.__views.__alloyId160);
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
    $.__views.__alloyId160.add($.__views.description);
    var __alloyId161 = [];
    $.__views.__alloyId162 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId162"
    });
    __alloyId161.push($.__views.__alloyId162);
    showDatePicker ? $.__views.__alloyId162.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId162!click!showDatePicker"] = true;
    $.__views.__alloyId163 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: "12",
        id: "__alloyId164"
    });
    $.__views.__alloyId163.add($.__views.__alloyId164);
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "date_value",
        textAlign: "right"
    });
    $.__views.__alloyId163.add($.__views.date_value);
    $.__views.__alloyId165 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId165"
    });
    __alloyId161.push($.__views.__alloyId165);
    showTimePicker ? $.__views.__alloyId165.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId165!click!showTimePicker"] = true;
    $.__views.__alloyId166 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    $.__views.__alloyId167 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: "12",
        id: "__alloyId167"
    });
    $.__views.__alloyId166.add($.__views.__alloyId167);
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "time_value",
        textAlign: "right"
    });
    $.__views.__alloyId166.add($.__views.time_value);
    $.__views.tvrField1 = Ti.UI.createTableViewRow({
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
    __alloyId161.push($.__views.tvrField1);
    $.__views.__alloyId168 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        id: "__alloyId168"
    });
    $.__views.tvrField1.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createLabel({
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "KG",
        top: "12",
        id: "__alloyId169"
    });
    $.__views.__alloyId168.add($.__views.__alloyId169);
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
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.__alloyId168.add($.__views.field1);
    $.__views.tvrField2 = Ti.UI.createTableViewRow({
        id: "tvrField2",
        selectedBackgroundColor: "#ffffff"
    });
    __alloyId161.push($.__views.tvrField2);
    $.__views.__alloyId170 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: "100%",
        id: "__alloyId170"
    });
    $.__views.tvrField2.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createLabel({
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Height(cm)",
        top: "12",
        id: "__alloyId171"
    });
    $.__views.__alloyId170.add($.__views.__alloyId171);
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
        textAlign: "right",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.__alloyId170.add($.__views.field2);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId161,
        id: "table",
        height: Ti.UI.SIZE,
        top: "10",
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
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthBmiWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.__alloyId162!click!showDatePicker"] && $.__views.__alloyId162.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId165!click!showTimePicker"] && $.__views.__alloyId165.addEventListener("click", showTimePicker);
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;