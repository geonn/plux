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
    $.__views.__alloyId205 = Ti.UI.createView({
        id: "__alloyId205"
=======
    $.__views.__alloyId215 = Ti.UI.createView({
        id: "__alloyId215"
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
    $.__views.__alloyId205.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDBPWin.rightNavButton = $.__views.__alloyId205;
=======
    $.__views.__alloyId215.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDBPWin.rightNavButton = $.__views.__alloyId215;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDBPWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId206 = Ti.UI.createView({
=======
    $.__views.__alloyId216 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId206"
    });
    $.__views.main.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId207"
    });
    $.__views.__alloyId206.add($.__views.__alloyId207);
=======
        id: "__alloyId216"
    });
    $.__views.main.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId217"
    });
    $.__views.__alloyId216.add($.__views.__alloyId217);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId207.add($.__views.btnBack);
=======
    $.__views.__alloyId217.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId206.add($.__views.pageTitle);
    $.__views.__alloyId208 = Ti.UI.createLabel({
=======
    $.__views.__alloyId216.add($.__views.pageTitle);
    $.__views.__alloyId218 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Add Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId208"
    });
    $.__views.pageTitle.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId209"
    });
    $.__views.__alloyId206.add($.__views.__alloyId209);
=======
        id: "__alloyId218"
    });
    $.__views.pageTitle.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId219"
    });
    $.__views.__alloyId216.add($.__views.__alloyId219);
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
    $.__views.__alloyId209.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId210 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId210"
    });
    $.__views.main.add($.__views.__alloyId210);
=======
    $.__views.__alloyId219.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId220 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId220"
    });
    $.__views.main.add($.__views.__alloyId220);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId210.add($.__views.description);
    var __alloyId211 = [];
    $.__views.__alloyId212 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId212"
    });
    __alloyId211.push($.__views.__alloyId212);
    showDatePicker ? $.__views.__alloyId212.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId212!click!showDatePicker"] = true;
    $.__views.__alloyId213 = Ti.UI.createView({
=======
    $.__views.__alloyId220.add($.__views.description);
    var __alloyId221 = [];
    $.__views.__alloyId222 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId222"
    });
    __alloyId221.push($.__views.__alloyId222);
    showDatePicker ? $.__views.__alloyId222.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId222!click!showDatePicker"] = true;
    $.__views.__alloyId223 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId213"
    });
    $.__views.__alloyId212.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createLabel({
=======
        id: "__alloyId223"
    });
    $.__views.__alloyId222.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
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
        id: "__alloyId214"
    });
    $.__views.__alloyId213.add($.__views.__alloyId214);
=======
        id: "__alloyId224"
    });
    $.__views.__alloyId223.add($.__views.__alloyId224);
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
    $.__views.__alloyId213.add($.__views.date_value);
    $.__views.__alloyId215 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId215"
    });
    __alloyId211.push($.__views.__alloyId215);
    showTimePicker ? $.__views.__alloyId215.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId215!click!showTimePicker"] = true;
    $.__views.__alloyId216 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId216"
    });
    $.__views.__alloyId215.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createLabel({
=======
    $.__views.__alloyId223.add($.__views.date_value);
    $.__views.__alloyId225 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId225"
    });
    __alloyId221.push($.__views.__alloyId225);
    showTimePicker ? $.__views.__alloyId225.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId225!click!showTimePicker"] = true;
    $.__views.__alloyId226 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId226"
    });
    $.__views.__alloyId225.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
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
        id: "__alloyId217"
    });
    $.__views.__alloyId216.add($.__views.__alloyId217);
=======
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
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
    $.__views.__alloyId216.add($.__views.time_value);
=======
    $.__views.__alloyId226.add($.__views.time_value);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createTableViewRow({
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId211.push($.__views.tvrField1);
    $.__views.__alloyId218 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId218"
    });
    $.__views.tvrField1.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createLabel({
=======
    __alloyId221.push($.__views.tvrField1);
    $.__views.__alloyId228 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId228"
    });
    $.__views.tvrField1.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createLabel({
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
        id: "__alloyId219"
    });
    $.__views.__alloyId218.add($.__views.__alloyId219);
=======
        id: "__alloyId229"
    });
    $.__views.__alloyId228.add($.__views.__alloyId229);
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
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId218.add($.__views.field1);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId211,
=======
    $.__views.__alloyId228.add($.__views.field1);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId221,
>>>>>>> origin/master
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
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthDBPWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId212!click!showDatePicker"] && $.__views.__alloyId212.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId215!click!showTimePicker"] && $.__views.__alloyId215.addEventListener("click", showTimePicker);
=======
    __defers["$.__views.__alloyId222!click!showDatePicker"] && $.__views.__alloyId222.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId225!click!showTimePicker"] && $.__views.__alloyId225.addEventListener("click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;