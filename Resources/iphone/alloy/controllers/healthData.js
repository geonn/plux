function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function todayDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var min = today.getMinutes();
        10 > dd && (dd = "0" + dd);
        10 > mm && (mm = "0" + mm);
        10 > hh && (hh = "0" + hh);
        10 > min && (min = "0" + min);
        today = dd + "/" + mm + "/" + yyyy;
        var ampm = hh >= 12 ? "PM" : "AM";
        hh > 12 && (hh -= 12);
        $.date_value.text = today;
        $.time_value.text = hh + ":" + min + " " + ampm;
    }
    function showDatePicker() {
        $.datePicker.visible = "true";
        $.timePicker.visible = "false";
        $.amountTF.blur();
    }
    function showTimePicker() {
        $.timePicker.visible = "true";
        $.datePicker.visible = "false";
        $.amountTF.blur();
    }
    function changeDate(e) {
        var pickerdate = e.value;
        var day = pickerdate.getDate();
        day = day.toString();
        day.length < 2 && (day = "0" + day);
        var month = pickerdate.getMonth();
        month += 1;
        month = month.toString();
        month.length < 2 && (month = "0" + month);
        var year = pickerdate.getFullYear();
        selDate = day + "/" + month + "/" + year;
        $.date_value.text = selDate;
    }
    function changeTime(e) {
        var pickerdate = e.value;
        pickerdate.getDate();
        var hour = pickerdate.getHours();
        hour = hour.toString();
        hour.length < 2 && (hour = "0" + hour);
        var ampm = hour >= 12 ? "PM" : "AM";
        hour > 12 && (hour -= 12);
        var minute = pickerdate.getMinutes();
        selTime = hour + ":" + minute + " " + ampm;
        $.time_value.text = selTime;
    }
    function doSaveRecords() {
        var date = $.date_value.text;
        var time = $.time_value.text;
        var amount = $.amountTF.value;
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
            amount: amount,
            type: formType
        });
        nav.navigationWindow("m_myHealth");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "healthData";
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
    $.__views.healthData = Ti.UI.createWindow({
        fullscreen: true,
        title: "Add Data",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "healthData"
    });
    $.__views.healthData && $.addTopLevelView($.__views.healthData);
    $.__views.__alloyId5 = Ti.UI.createView({
        id: "__alloyId5"
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: "0"
    });
    $.__views.__alloyId5.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthData.rightNavButton = $.__views.__alloyId5;
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthData.add($.__views.main);
    $.__views.__alloyId6 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "15",
        id: "__alloyId6"
    });
    $.__views.main.add($.__views.__alloyId6);
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
    $.__views.__alloyId6.add($.__views.description);
    var __alloyId7 = [];
    $.__views.__alloyId8 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId8"
    });
    __alloyId7.push($.__views.__alloyId8);
    showDatePicker ? $.__views.__alloyId8.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId8!click!showDatePicker"] = true;
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: "12",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "date_value",
        textAlign: "right"
    });
    $.__views.__alloyId9.add($.__views.date_value);
    $.__views.__alloyId11 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId11"
    });
    __alloyId7.push($.__views.__alloyId11);
    showTimePicker ? $.__views.__alloyId11.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId11!click!showTimePicker"] = true;
    $.__views.__alloyId12 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: "12",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "time_value",
        textAlign: "right"
    });
    $.__views.__alloyId12.add($.__views.time_value);
    $.__views.__alloyId14 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId14"
    });
    __alloyId7.push($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Amount",
        top: "12",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.amountTF = Ti.UI.createTextField({
        id: "amountTF",
        right: "0",
        top: "5",
        textAlign: "right",
        backgroundColor: "#FFFCFC",
        borderColor: "#ffffff",
        width: "72%",
        height: "30",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
    $.__views.__alloyId15.add($.__views.amountTF);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId7,
        id: "table",
        height: "135",
        top: "45",
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
    var args = arguments[0] || {};
    var formType = args.formType || 1;
    var lib_health = Alloy.createCollection("health");
    var nav = require("navigation");
    todayDate();
    $.amountTF.addEventListener("change", function(e) {
        if ("" != e.value) {
            $.saveButton.color = "#CE1D1C";
            $.saveButton.touchEnabled = "true";
        } else {
            $.saveButton.color = "#ADADAD";
            $.saveButton.touchEnabled = "false";
        }
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.__alloyId8!click!showDatePicker"] && $.__views.__alloyId8.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId11!click!showTimePicker"] && $.__views.__alloyId11.addEventListener("click", showTimePicker);
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;