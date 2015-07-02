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
<<<<<<< HEAD
    $.__views.__alloyId179 = Ti.UI.createView({
        id: "__alloyId179"
=======
    $.__views.__alloyId194 = Ti.UI.createView({
        id: "__alloyId194"
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
    $.__views.__alloyId179.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDHWin.rightNavButton = $.__views.__alloyId179;
=======
    $.__views.__alloyId194.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDHWin.rightNavButton = $.__views.__alloyId194;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDHWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId180 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId180"
    });
    $.__views.main.add($.__views.__alloyId180);
=======
    $.__views.__alloyId195 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId195"
    });
    $.__views.main.add($.__views.__alloyId195);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId180.add($.__views.description);
    var __alloyId181 = [];
    $.__views.__alloyId182 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId182"
    });
    __alloyId181.push($.__views.__alloyId182);
    showDatePicker ? $.__views.__alloyId182.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId182!click!showDatePicker"] = true;
    $.__views.__alloyId183 = Ti.UI.createView({
=======
    $.__views.__alloyId195.add($.__views.description);
    var __alloyId196 = [];
    $.__views.__alloyId197 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId197"
    });
    __alloyId196.push($.__views.__alloyId197);
    showDatePicker ? $.__views.__alloyId197.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId197!click!showDatePicker"] = true;
    $.__views.__alloyId198 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId183"
    });
    $.__views.__alloyId182.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createLabel({
=======
        id: "__alloyId198"
    });
    $.__views.__alloyId197.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createLabel({
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
        id: "__alloyId184"
    });
    $.__views.__alloyId183.add($.__views.__alloyId184);
=======
        id: "__alloyId199"
    });
    $.__views.__alloyId198.add($.__views.__alloyId199);
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
    $.__views.__alloyId183.add($.__views.date_value);
    $.__views.__alloyId185 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId185"
    });
    __alloyId181.push($.__views.__alloyId185);
    showTimePicker ? $.__views.__alloyId185.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId185!click!showTimePicker"] = true;
    $.__views.__alloyId186 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId186"
    });
    $.__views.__alloyId185.add($.__views.__alloyId186);
    $.__views.__alloyId187 = Ti.UI.createLabel({
=======
    $.__views.__alloyId198.add($.__views.date_value);
    $.__views.__alloyId200 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId200"
    });
    __alloyId196.push($.__views.__alloyId200);
    showTimePicker ? $.__views.__alloyId200.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId200!click!showTimePicker"] = true;
    $.__views.__alloyId201 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId201"
    });
    $.__views.__alloyId200.add($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createLabel({
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
        id: "__alloyId187"
    });
    $.__views.__alloyId186.add($.__views.__alloyId187);
=======
        id: "__alloyId202"
    });
    $.__views.__alloyId201.add($.__views.__alloyId202);
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
    $.__views.__alloyId186.add($.__views.time_value);
=======
    $.__views.__alloyId201.add($.__views.time_value);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createTableViewRow({
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId181.push($.__views.tvrField1);
    $.__views.__alloyId188 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId188"
    });
    $.__views.tvrField1.add($.__views.__alloyId188);
    $.__views.__alloyId189 = Ti.UI.createLabel({
=======
    __alloyId196.push($.__views.tvrField1);
    $.__views.__alloyId203 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId203"
    });
    $.__views.tvrField1.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "28%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "bpm",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId189"
    });
    $.__views.__alloyId188.add($.__views.__alloyId189);
=======
        id: "__alloyId204"
    });
    $.__views.__alloyId203.add($.__views.__alloyId204);
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
    $.__views.__alloyId188.add($.__views.field1);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId181,
=======
    $.__views.__alloyId203.add($.__views.field1);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId196,
>>>>>>> origin/master
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
    var formType = 3;
    var lib_health = Alloy.createCollection("health");
    var hd = require("healthData");
    hd.construct($);
    hd.todayDate();
    $.field1.addEventListener("change", function(e) {
        var field1 = $.field1.value;
        "" != e.value && "" != field1 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.tvrField1.addEventListener("click", function() {
        $.field1.focus();
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId182!click!showDatePicker"] && $.__views.__alloyId182.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId185!click!showTimePicker"] && $.__views.__alloyId185.addEventListener("click", showTimePicker);
=======
    __defers["$.__views.__alloyId197!click!showDatePicker"] && $.__views.__alloyId197.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId200!click!showTimePicker"] && $.__views.__alloyId200.addEventListener("click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;