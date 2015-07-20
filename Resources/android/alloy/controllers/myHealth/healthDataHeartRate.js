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
    $.__views.__alloyId263 = Ti.UI.createView({
        id: "__alloyId263"
=======
    $.__views.__alloyId265 = Ti.UI.createView({
        id: "__alloyId265"
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
    $.__views.__alloyId263.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDHWin.rightNavButton = $.__views.__alloyId263;
=======
    $.__views.__alloyId265.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthDHWin.rightNavButton = $.__views.__alloyId265;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthDHWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId264 = Ti.UI.createView({
=======
    $.__views.__alloyId266 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId264"
    });
    $.__views.main.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId265"
    });
    $.__views.__alloyId264.add($.__views.__alloyId265);
=======
        id: "__alloyId266"
    });
    $.__views.main.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId267"
    });
    $.__views.__alloyId266.add($.__views.__alloyId267);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId265.add($.__views.btnBack);
=======
    $.__views.__alloyId267.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId264.add($.__views.pageTitle);
    $.__views.__alloyId266 = Ti.UI.createLabel({
=======
    $.__views.__alloyId266.add($.__views.pageTitle);
    $.__views.__alloyId268 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Add Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId266"
    });
    $.__views.pageTitle.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId267"
    });
    $.__views.__alloyId264.add($.__views.__alloyId267);
=======
        id: "__alloyId268"
    });
    $.__views.pageTitle.add($.__views.__alloyId268);
    $.__views.__alloyId269 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId269"
    });
    $.__views.__alloyId266.add($.__views.__alloyId269);
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
    $.__views.__alloyId267.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId268 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId268"
    });
    $.__views.main.add($.__views.__alloyId268);
=======
    $.__views.__alloyId269.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId270 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId270"
    });
    $.__views.main.add($.__views.__alloyId270);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId268.add($.__views.description);
    var __alloyId269 = [];
    $.__views.__alloyId270 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId270"
    });
    __alloyId269.push($.__views.__alloyId270);
    showDatePicker ? $.__views.__alloyId270.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId270!click!showDatePicker"] = true;
    $.__views.__alloyId271 = Ti.UI.createView({
=======
    $.__views.__alloyId270.add($.__views.description);
    var __alloyId271 = [];
    $.__views.__alloyId272 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId272"
    });
    __alloyId271.push($.__views.__alloyId272);
    showDatePicker ? $.__views.__alloyId272.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId272!click!showDatePicker"] = true;
    $.__views.__alloyId273 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId271"
    });
    $.__views.__alloyId270.add($.__views.__alloyId271);
    $.__views.__alloyId272 = Ti.UI.createLabel({
=======
        id: "__alloyId273"
    });
    $.__views.__alloyId272.add($.__views.__alloyId273);
    $.__views.__alloyId274 = Ti.UI.createLabel({
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
        id: "__alloyId272"
    });
    $.__views.__alloyId271.add($.__views.__alloyId272);
=======
        id: "__alloyId274"
    });
    $.__views.__alloyId273.add($.__views.__alloyId274);
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
    $.__views.__alloyId271.add($.__views.date_value);
    $.__views.__alloyId273 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId273"
    });
    __alloyId269.push($.__views.__alloyId273);
    showTimePicker ? $.__views.__alloyId273.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId273!click!showTimePicker"] = true;
    $.__views.__alloyId274 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId274"
    });
    $.__views.__alloyId273.add($.__views.__alloyId274);
    $.__views.__alloyId275 = Ti.UI.createLabel({
=======
    $.__views.__alloyId273.add($.__views.date_value);
    $.__views.__alloyId275 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId275"
    });
    __alloyId271.push($.__views.__alloyId275);
    showTimePicker ? $.__views.__alloyId275.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId275!click!showTimePicker"] = true;
    $.__views.__alloyId276 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId276"
    });
    $.__views.__alloyId275.add($.__views.__alloyId276);
    $.__views.__alloyId277 = Ti.UI.createLabel({
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
        id: "__alloyId275"
    });
    $.__views.__alloyId274.add($.__views.__alloyId275);
=======
        id: "__alloyId277"
    });
    $.__views.__alloyId276.add($.__views.__alloyId277);
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
    $.__views.__alloyId274.add($.__views.time_value);
=======
    $.__views.__alloyId276.add($.__views.time_value);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createTableViewRow({
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId269.push($.__views.tvrField1);
    $.__views.__alloyId276 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId276"
    });
    $.__views.tvrField1.add($.__views.__alloyId276);
    $.__views.__alloyId277 = Ti.UI.createLabel({
=======
    __alloyId271.push($.__views.tvrField1);
    $.__views.__alloyId278 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId278"
    });
    $.__views.tvrField1.add($.__views.__alloyId278);
    $.__views.__alloyId279 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "bpm",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId277"
    });
    $.__views.__alloyId276.add($.__views.__alloyId277);
=======
        id: "__alloyId279"
    });
    $.__views.__alloyId278.add($.__views.__alloyId279);
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
    $.__views.__alloyId276.add($.__views.field1);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId269,
=======
    $.__views.__alloyId278.add($.__views.field1);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId271,
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
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthDHWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId270!click!showDatePicker"] && $.__views.__alloyId270.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId273!click!showTimePicker"] && $.__views.__alloyId273.addEventListener("click", showTimePicker);
=======
    __defers["$.__views.__alloyId272!click!showDatePicker"] && $.__views.__alloyId272.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId275!click!showTimePicker"] && $.__views.__alloyId275.addEventListener("click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;