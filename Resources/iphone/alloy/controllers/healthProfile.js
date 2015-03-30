function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideKeyboard() {}
    function doEditRecords() {
        $.date_value.color = "#ff0000";
        $.tvrFieldDate.setTouchEnabled(true);
        $.tvrFieldGender.setTouchEnabled(true);
        $.tvrFieldBloodType.setTouchEnabled(true);
        leftNavView.add(leftCancel);
        leftNavView.addEventListener("click", cancelEdit);
        $.editButton.visible = "false";
        $.saveButton.visible = "true";
        $.datePicker.show();
        $.genderPicker.show();
        $.bloodTypePicker.show();
        $.healthProfileWin.leftNavButton = leftNavView;
    }
    function showDatePicker() {
        var isEnabled = $.tvrFieldDate.getTouchEnabled();
        if (isEnabled) {
            resetTextColor();
            $.date_value.color = "#ff0000";
            hd.showBirthDatePicker({
                date: $.datePicker,
                gender: $.genderPicker,
                bloodType: $.bloodTypePicker
            });
            hideKeyboard();
        }
    }
    function resetTextColor() {
        $.date_value.color = "#757575";
        $.gender_value.color = "#757575";
        $.bloodType_value.color = "#757575";
    }
    function showGenderPicker() {
        var isEnabled = $.tvrFieldGender.getTouchEnabled();
        if (isEnabled) {
            resetTextColor();
            $.gender_value.color = "#ff0000";
            hd.showGenderPicker({
                gender: $.genderPicker,
                bloodType: $.bloodTypePicker,
                date: $.datePicker
            });
            hideKeyboard();
        }
    }
    function showBloodTypePicker() {
        var isEnabled = $.tvrFieldBloodType.getTouchEnabled();
        if (isEnabled) {
            resetTextColor();
            $.bloodType_value.color = "#ff0000";
            hd.showBloodTypePicker({
                bloodType: $.bloodTypePicker,
                gender: $.genderPicker,
                date: $.datePicker
            });
            hideKeyboard();
        }
    }
    function changeDate(e) {
        hd.changeDate({
            date: e.value
        });
    }
    function changeGender(e) {
        hd.changeGender({
            gender: e.selectedValue[0]
        });
    }
    function changeBloodType(e) {
        hd.changeBloodType({
            bloodType: e.selectedValue[0]
        });
    }
    function doSaveRecords() {
        var birthdate = $.date_value.text;
        var gender = $.gender_value.text;
        var bloodType = $.bloodType_value.text;
        if ("Not Set" != birthdate) {
            var bdate = birthdate.split("(");
            var s_date = bdate[0].split("/");
            var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];
        }
        lib_health.addPersonalData({
            id: myData.id,
            name: "",
            gender: gender,
            bloodType: bloodType,
            birthDate: newDate
        });
        common.createAlert("Updates Profile", "Your personal information are saved!");
        cancelEdit();
    }
    function setupPersonalData() {
        if (0 == myData.length) {
            myData = lib_health.getOwnerData();
            setupPersonalData();
            return false;
        }
        var genderValue = [ "Not Set", "Female", "Male" ];
        var myGender;
        for (var i = 0; i < genderValue.length; i++) {
            genderValue[i] == myData.gender && (myGender = i);
            var genderData = genderValue[i];
            var gendata = Ti.UI.createPickerRow({
                title: genderData.toString()
            });
            $.genderPicker.add(gendata);
        }
        $.genderPicker.setSelectedRow(0, myGender, true);
        var bloodTypeValue = [ "Not Set", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" ];
        var myBloodType;
        for (var i = 0; i < bloodTypeValue.length; i++) {
            bloodTypeValue[i] == myData.bloodType && (myBloodType = i);
            var bloodTypeData = bloodTypeValue[i];
            var blooddata = Ti.UI.createPickerRow({
                title: bloodTypeData.toString()
            });
            $.bloodTypePicker.add(blooddata);
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();
        var myBDay = myData.birthDate;
        var sBday = myBDay.split("-");
        var showBday = "Not Set";
        if (sBday.length > 1) {
            var myAge = hd.getAge(myBDay);
            showBday = sBday[2] + "/" + sBday[1] + "/" + sBday[0] + "(" + myAge + ")";
            $.datePicker.setValue(new Date(sBday[0], sBday[1], sBday[2]));
        }
        $.datePicker.setMinDate(new Date(1930, 0, 1));
        $.datePicker.setMaxDate(new Date(yyyy, mm, dd));
        $.bloodTypePicker.setSelectedRow(0, myBloodType, true);
        $.date_value.text = showBday;
        $.gender_value.text = myData.gender;
        $.bloodType_value.text = myData.bloodType;
        $.tvrFieldDate.setTouchEnabled(false);
        $.tvrFieldGender.setTouchEnabled(false);
        $.tvrFieldBloodType.setTouchEnabled(false);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "healthProfile";
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
    $.__views.healthProfileWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Me",
        backButtonTitle: "",
        id: "healthProfileWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthProfileWin && $.addTopLevelView($.__views.healthProfileWin);
<<<<<<< HEAD
    $.__views.__alloyId168 = Ti.UI.createView({
        id: "__alloyId168"
=======
    $.__views.__alloyId74 = Ti.UI.createView({
        id: "__alloyId74"
>>>>>>> origin/master
    });
    $.__views.editButton = Ti.UI.createButton({
        touchEnabled: true,
        id: "editButton",
        title: "Edit",
        right: "0",
        visible: "true"
    });
<<<<<<< HEAD
    $.__views.__alloyId168.add($.__views.editButton);
=======
    $.__views.__alloyId74.add($.__views.editButton);
>>>>>>> origin/master
    doEditRecords ? $.__views.editButton.addEventListener("touchend", doEditRecords) : __defers["$.__views.editButton!touchend!doEditRecords"] = true;
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: true,
        id: "saveButton",
        title: "Save",
        right: "0",
        visible: "false"
    });
<<<<<<< HEAD
    $.__views.__alloyId168.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthProfileWin.rightNavButton = $.__views.__alloyId168;
=======
    $.__views.__alloyId74.add($.__views.saveButton);
    doSaveRecords ? $.__views.saveButton.addEventListener("touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthProfileWin.rightNavButton = $.__views.__alloyId74;
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthProfileWin.add($.__views.main);
<<<<<<< HEAD
    var __alloyId169 = [];
=======
    var __alloyId75 = [];
>>>>>>> origin/master
    $.__views.tvrFieldDate = Ti.UI.createTableViewRow({
        id: "tvrFieldDate",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId169.push($.__views.tvrFieldDate);
    showDatePicker ? $.__views.tvrFieldDate.addEventListener("click", showDatePicker) : __defers["$.__views.tvrFieldDate!click!showDatePicker"] = true;
    $.__views.__alloyId170 = Ti.UI.createView({
=======
    __alloyId75.push($.__views.tvrFieldDate);
    showDatePicker ? $.__views.tvrFieldDate.addEventListener("click", showDatePicker) : __defers["$.__views.tvrFieldDate!click!showDatePicker"] = true;
    $.__views.__alloyId76 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "45",
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId170"
    });
    $.__views.tvrFieldDate.add($.__views.__alloyId170);
    $.__views.__alloyId171 = Ti.UI.createLabel({
=======
        id: "__alloyId76"
    });
    $.__views.tvrFieldDate.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "40%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Birthdate",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId171"
    });
    $.__views.__alloyId170.add($.__views.__alloyId171);
=======
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
>>>>>>> origin/master
    $.__views.date_value = Ti.UI.createLabel({
        width: "50%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "date_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId170.add($.__views.date_value);
=======
    $.__views.__alloyId76.add($.__views.date_value);
>>>>>>> origin/master
    $.__views.tvrFieldGender = Ti.UI.createTableViewRow({
        id: "tvrFieldGender",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId169.push($.__views.tvrFieldGender);
    showGenderPicker ? $.__views.tvrFieldGender.addEventListener("click", showGenderPicker) : __defers["$.__views.tvrFieldGender!click!showGenderPicker"] = true;
    $.__views.__alloyId172 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId172"
    });
    $.__views.tvrFieldGender.add($.__views.__alloyId172);
    $.__views.__alloyId173 = Ti.UI.createLabel({
=======
    __alloyId75.push($.__views.tvrFieldGender);
    showGenderPicker ? $.__views.tvrFieldGender.addEventListener("click", showGenderPicker) : __defers["$.__views.tvrFieldGender!click!showGenderPicker"] = true;
    $.__views.__alloyId78 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId78"
    });
    $.__views.tvrFieldGender.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "40%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "Gender",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId173"
    });
    $.__views.__alloyId172.add($.__views.__alloyId173);
=======
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
>>>>>>> origin/master
    $.__views.gender_value = Ti.UI.createLabel({
        width: "50%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "gender_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId172.add($.__views.gender_value);
=======
    $.__views.__alloyId78.add($.__views.gender_value);
>>>>>>> origin/master
    $.__views.tvrFieldBloodType = Ti.UI.createTableViewRow({
        id: "tvrFieldBloodType",
        selectedBackgroundColor: "#ffffff"
    });
<<<<<<< HEAD
    __alloyId169.push($.__views.tvrFieldBloodType);
    showBloodTypePicker ? $.__views.tvrFieldBloodType.addEventListener("click", showBloodTypePicker) : __defers["$.__views.tvrFieldBloodType!click!showBloodTypePicker"] = true;
    $.__views.__alloyId174 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId174"
    });
    $.__views.tvrFieldBloodType.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createLabel({
=======
    __alloyId75.push($.__views.tvrFieldBloodType);
    showBloodTypePicker ? $.__views.tvrFieldBloodType.addEventListener("click", showBloodTypePicker) : __defers["$.__views.tvrFieldBloodType!click!showBloodTypePicker"] = true;
    $.__views.__alloyId80 = Ti.UI.createView({
        layout: "horizontal",
        height: "45",
        width: "100%",
        id: "__alloyId80"
    });
    $.__views.tvrFieldBloodType.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "40%",
        height: Titanium.UI.SIZE,
        left: 20,
        color: "#A8A8A8",
        font: {
            fontSize: "16dp"
        },
        text: "BloodType",
        top: "12",
<<<<<<< HEAD
        id: "__alloyId175"
    });
    $.__views.__alloyId174.add($.__views.__alloyId175);
=======
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
>>>>>>> origin/master
    $.__views.bloodType_value = Ti.UI.createLabel({
        width: "50%",
        height: Titanium.UI.SIZE,
        text: "",
        top: "12",
        color: "#707070",
        id: "bloodType_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId174.add($.__views.bloodType_value);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId169,
=======
    $.__views.__alloyId80.add($.__views.bloodType_value);
    $.__views.table = Ti.UI.createTableView({
        data: __alloyId75,
>>>>>>> origin/master
        id: "table",
        height: "135",
        top: "30",
        scrollable: "false"
    });
    $.__views.main.add($.__views.table);
    $.__views.selectorView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "selectorView",
        bottom: "0"
    });
    $.__views.main.add($.__views.selectorView);
    $.__views.genderPicker = Ti.UI.createPicker({
        id: "genderPicker",
        visible: "false"
    });
    $.__views.selectorView.add($.__views.genderPicker);
    changeGender ? $.__views.genderPicker.addEventListener("change", changeGender) : __defers["$.__views.genderPicker!change!changeGender"] = true;
    $.__views.bloodTypePicker = Ti.UI.createPicker({
        id: "bloodTypePicker",
        visible: "false"
    });
    $.__views.selectorView.add($.__views.bloodTypePicker);
    changeBloodType ? $.__views.bloodTypePicker.addEventListener("change", changeBloodType) : __defers["$.__views.bloodTypePicker!change!changeBloodType"] = true;
    $.__views.datePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "datePicker",
        type: Ti.UI.PICKER_TYPE_DATE,
        visible: "false"
    });
    $.__views.selectorView.add($.__views.datePicker);
    changeDate ? $.__views.datePicker.addEventListener("change", changeDate) : __defers["$.__views.datePicker!change!changeDate"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var lib_health = Alloy.createCollection("personalInfo");
    var hd = require("healthData");
    var myData = lib_health.getOwnerData();
    hd.construct($);
    var leftBack = Ti.UI.createButton({
        backgroundImage: "/images/btn-back.png",
        height: 30,
        left: 0
    });
    var leftCancel = Ti.UI.createButton({
        title: "Cancel",
        left: 0
    });
    var leftNavView = Titanium.UI.createView();
    var cancelEdit = function() {
        resetTextColor();
        $.tvrFieldDate.setTouchEnabled(false);
        $.tvrFieldGender.setTouchEnabled(false);
        $.tvrFieldBloodType.setTouchEnabled(false);
        leftBack.addEventListener("click", function() {
            nav.closeWindow($.healthProfileWin);
        });
        $.editButton.visible = "true";
        $.saveButton.visible = "false";
        $.datePicker.hide();
        $.genderPicker.hide();
        $.bloodTypePicker.hide();
        leftNavView.removeEventListener("click", cancelEdit);
        $.healthProfileWin.leftNavButton = leftBack;
    };
    setupPersonalData();
    __defers["$.__views.editButton!touchend!doEditRecords"] && $.__views.editButton.addEventListener("touchend", doEditRecords);
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.__views.saveButton.addEventListener("touchend", doSaveRecords);
    __defers["$.__views.tvrFieldDate!click!showDatePicker"] && $.__views.tvrFieldDate.addEventListener("click", showDatePicker);
    __defers["$.__views.tvrFieldGender!click!showGenderPicker"] && $.__views.tvrFieldGender.addEventListener("click", showGenderPicker);
    __defers["$.__views.tvrFieldBloodType!click!showBloodTypePicker"] && $.__views.tvrFieldBloodType.addEventListener("click", showBloodTypePicker);
    __defers["$.__views.genderPicker!change!changeGender"] && $.__views.genderPicker.addEventListener("change", changeGender);
    __defers["$.__views.bloodTypePicker!change!changeBloodType"] && $.__views.bloodTypePicker.addEventListener("change", changeBloodType);
    __defers["$.__views.datePicker!change!changeDate"] && $.__views.datePicker.addEventListener("change", changeDate);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;