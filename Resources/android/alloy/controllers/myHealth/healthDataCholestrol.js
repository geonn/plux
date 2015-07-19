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
        var field2 = $.field2.value;
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
            field2: field2,
            amount: field1 + field2,
            type: formType
        });
        hd.loadInfo(formType);
        nav.closeWindow($.healthCholestrolWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataCholestrol";
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
    $.__views.healthCholestrolWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Add Data",
        backButtonTitle: "",
        id: "healthCholestrolWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthCholestrolWin && $.addTopLevelView($.__views.healthCholestrolWin);
<<<<<<< HEAD
    $.__views.__alloyId221 = Ti.UI.createView({
        id: "__alloyId221"
=======
    $.__views.__alloyId231 = Ti.UI.createView({
        id: "__alloyId231"
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
    $.__views.__alloyId221.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthCholestrolWin.rightNavButton = $.__views.__alloyId221;
=======
    $.__views.__alloyId231.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthCholestrolWin.rightNavButton = $.__views.__alloyId231;
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.healthCholestrolWin.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId222 = Ti.UI.createLabel({
=======
    $.__views.__alloyId232 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId222"
    });
    $.__views.loadingBar.add($.__views.__alloyId222);
=======
        id: "__alloyId232"
    });
    $.__views.loadingBar.add($.__views.__alloyId232);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthCholestrolWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId223 = Ti.UI.createView({
=======
    $.__views.__alloyId233 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId223"
    });
    $.__views.main.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId224"
    });
    $.__views.__alloyId223.add($.__views.__alloyId224);
=======
        id: "__alloyId233"
    });
    $.__views.main.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId234"
    });
    $.__views.__alloyId233.add($.__views.__alloyId234);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId224.add($.__views.btnBack);
=======
    $.__views.__alloyId234.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId223.add($.__views.pageTitle);
    $.__views.__alloyId225 = Ti.UI.createLabel({
=======
    $.__views.__alloyId233.add($.__views.pageTitle);
    $.__views.__alloyId235 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Add Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId225"
    });
    $.__views.pageTitle.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId226"
    });
    $.__views.__alloyId223.add($.__views.__alloyId226);
=======
        id: "__alloyId235"
    });
    $.__views.pageTitle.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId236"
    });
    $.__views.__alloyId233.add($.__views.__alloyId236);
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
    $.__views.__alloyId226.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId227 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId227"
    });
    $.__views.main.add($.__views.__alloyId227);
=======
    $.__views.__alloyId236.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId237 = Ti.UI.createView({
        layout: "vertical",
        height: "30",
        top: "10",
        id: "__alloyId237"
    });
    $.__views.main.add($.__views.__alloyId237);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        text: "Please fill in your information below",
        color: "#878686",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId227.add($.__views.description);
    var __alloyId228 = [];
    $.__views.__alloyId229 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId229"
    });
    __alloyId228.push($.__views.__alloyId229);
    showDatePicker ? $.__views.__alloyId229.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId229!click!showDatePicker"] = true;
    $.__views.__alloyId230 = Ti.UI.createView({
=======
    $.__views.__alloyId237.add($.__views.description);
    var __alloyId238 = [];
    $.__views.__alloyId239 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId239"
    });
    __alloyId238.push($.__views.__alloyId239);
    showDatePicker ? $.__views.__alloyId239.addEventListener("click", showDatePicker) : __defers["$.__views.__alloyId239!click!showDatePicker"] = true;
    $.__views.__alloyId240 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId230"
    });
    $.__views.__alloyId229.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
=======
        id: "__alloyId240"
    });
    $.__views.__alloyId239.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createLabel({
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
        id: "__alloyId231"
    });
    $.__views.__alloyId230.add($.__views.__alloyId231);
=======
        id: "__alloyId241"
    });
    $.__views.__alloyId240.add($.__views.__alloyId241);
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
    $.__views.__alloyId230.add($.__views.date_value);
    $.__views.__alloyId232 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId232"
    });
    __alloyId228.push($.__views.__alloyId232);
    showTimePicker ? $.__views.__alloyId232.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId232!click!showTimePicker"] = true;
    $.__views.__alloyId233 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId233"
    });
    $.__views.__alloyId232.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createLabel({
=======
    $.__views.__alloyId240.add($.__views.date_value);
    $.__views.__alloyId242 = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId242"
    });
    __alloyId238.push($.__views.__alloyId242);
    showTimePicker ? $.__views.__alloyId242.addEventListener("click", showTimePicker) : __defers["$.__views.__alloyId242!click!showTimePicker"] = true;
    $.__views.__alloyId243 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId243"
    });
    $.__views.__alloyId242.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createLabel({
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
        id: "__alloyId234"
    });
    $.__views.__alloyId233.add($.__views.__alloyId234);
=======
        id: "__alloyId244"
    });
    $.__views.__alloyId243.add($.__views.__alloyId244);
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
    $.__views.__alloyId233.add($.__views.time_value);
=======
    $.__views.__alloyId243.add($.__views.time_value);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createTableViewRow({
        id: "tvrField1",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId228.push($.__views.tvrField1);
    $.__views.__alloyId235 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId235"
    });
    $.__views.tvrField1.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createLabel({
=======
    __alloyId238.push($.__views.tvrField1);
    $.__views.__alloyId245 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId245"
    });
    $.__views.tvrField1.add($.__views.__alloyId245);
    $.__views.__alloyId246 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "HDL(mg/dL)",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId236"
    });
    $.__views.__alloyId235.add($.__views.__alloyId236);
=======
        id: "__alloyId246"
    });
    $.__views.__alloyId245.add($.__views.__alloyId246);
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
    $.__views.__alloyId235.add($.__views.field1);
=======
    $.__views.__alloyId245.add($.__views.field1);
>>>>>>> origin/master
    $.__views.tvrField2 = Ti.UI.createTableViewRow({
        id: "tvrField2",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId228.push($.__views.tvrField2);
    $.__views.__alloyId237 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId237"
    });
    $.__views.tvrField2.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createLabel({
=======
    __alloyId238.push($.__views.tvrField2);
    $.__views.__alloyId247 = Ti.UI.createView({
        layout: "horizontal",
        height: "55",
        width: "100%",
        id: "__alloyId247"
    });
    $.__views.tvrField2.add($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "LDL(mg/dL)",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId238"
    });
    $.__views.__alloyId237.add($.__views.__alloyId238);
=======
        id: "__alloyId248"
    });
    $.__views.__alloyId247.add($.__views.__alloyId248);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId237.add($.__views.field2);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId228,
=======
    $.__views.__alloyId247.add($.__views.field2);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId238,
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
    var formType = 7;
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
        nav.closeWindow($.healthCholestrolWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId229!click!showDatePicker"] && $.__views.__alloyId229.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId232!click!showTimePicker"] && $.__views.__alloyId232.addEventListener("click", showTimePicker);
=======
    __defers["$.__views.__alloyId239!click!showDatePicker"] && $.__views.__alloyId239.addEventListener("click", showDatePicker);
    __defers["$.__views.__alloyId242!click!showTimePicker"] && $.__views.__alloyId242.addEventListener("click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.__views.timePicker.addEventListener("change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;