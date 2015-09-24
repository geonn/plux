function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function saveRecord() {
        var remark = $.remarkTextArea.value;
        var appDate = $.appointment_datetime.text;
        appDate = convertToDBDateFormat(appDate);
        var param = {
            u_id: Ti.App.Properties.getString("u_id"),
            date: appDate,
            clinic_id: selectedClinic,
            remark: remark.trim(),
            created: currentDateTime(),
            updated: currentDateTime()
        };
        API.addAppointment({
            param: param
        }, savedAppointment);
        return false;
    }
    function savedAppointment(ex) {
        console.log(ex);
    }
    function init() {
        var done = Titanium.UI.createButton({
            title: "Done",
            style: Titanium.UI.iPhone.SystemButtonStyle.DONE
        });
        done.addEventListener("click", function() {
            $.appointmentDateTime.visible = 0;
            $.appointmentDateTime.height = 0;
        });
        toolbar = Titanium.UI.iOS.createToolbar({
            items: [ done ],
            extendBackground: true,
            borderTop: true,
            borderBottom: false
        });
        dpView.add(toolbar);
        var curDate = currentDateTime();
        var d = curDate.substr(0, 10);
        var cd = d.split("-");
        var minDate = new Date();
        minDate.setFullYear(cd[0]);
        minDate.setMonth(parseInt(cd[1]) - 1);
        minDate.setDate(parseInt(cd[2]));
        var value = new Date();
        value.setFullYear(cd[0]);
        value.setMonth(parseInt(cd[1]) - 1);
        value.setDate(parseInt(cd[2]));
        var picker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_DATE_AND_TIME,
            minDate: minDate,
            value: value,
            bottom: 0
        });
        picker.addEventListener("change", changeDate);
        picker.selectionIndicator = true;
        dpView.add(picker);
        $.appointmentDateTime.add(dpView);
    }
    function changeDate(e) {
        var pickerdate = e.value;
        var day = pickerdate.getDate();
        day = day.toString();
        var hours = pickerdate.getHours();
        var minutes = pickerdate.getMinutes();
        console.log(hours + ":" + minutes);
        day.length < 2 && (day = "0" + day);
        var month = pickerdate.getMonth();
        month += 1;
        month = month.toString();
        month.length < 2 && (month = "0" + month);
        var year = pickerdate.getFullYear();
        selDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":00";
        $.appointment_datetime.text = selDate;
    }
    function selectClinic(e) {
        selectedClinic = e.clinicId;
        $.appointment_clinic.text = e.clinicName;
    }
    function hideKeyboard() {
        $.remarkTextArea.blur();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointmentForm";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        id: "win",
        title: "Appointment Form",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId20 = Ti.UI.createView({
        id: "__alloyId20"
    });
    $.__views.saveRecord = Ti.UI.createButton({
        id: "saveRecord",
        title: "Done"
    });
    $.__views.__alloyId20.add($.__views.saveRecord);
    saveRecord ? $.addListener($.__views.saveRecord, "click", saveRecord) : __defers["$.__views.saveRecord!click!saveRecord"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId20;
    $.__views.__alloyId21 = Ti.UI.createView({
        layout: "vertical",
        bottom: "90",
        id: "__alloyId21"
    });
    $.__views.win.add($.__views.__alloyId21);
    $.__views.aView = Ti.UI.createScrollView({
        borderRadius: "5",
        borderColor: "#dfe0e4",
        backgroundColor: "#FFFFFF",
        id: "aView",
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.__alloyId21.add($.__views.aView);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Patient Name",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId22"
    });
    $.__views.aView.add($.__views.__alloyId22);
    $.__views.patient_name = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "14dp"
        },
        color: "#B5B5B5",
        left: "20",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "patient_name"
    });
    $.__views.aView.add($.__views.patient_name);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Patient Email",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId23"
    });
    $.__views.aView.add($.__views.__alloyId23);
    $.__views.patient_email = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "14dp"
        },
        color: "#B5B5B5",
        left: "20",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "patient_email"
    });
    $.__views.aView.add($.__views.patient_email);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Appointment Date & Time",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId24"
    });
    $.__views.aView.add($.__views.__alloyId24);
    $.__views.appointment_datetime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "14dp"
        },
        color: "#B5B5B5",
        text: "Choose Date and Time",
        left: "20",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "appointment_datetime"
    });
    $.__views.aView.add($.__views.appointment_datetime);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Clinic",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId25"
    });
    $.__views.aView.add($.__views.__alloyId25);
    $.__views.appointment_clinic = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "14dp"
        },
        color: "#B5B5B5",
        text: "Choose Clinic to attend",
        left: "20",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "appointment_clinic"
    });
    $.__views.aView.add($.__views.appointment_clinic);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Remark",
        left: "10",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "__alloyId26"
    });
    $.__views.aView.add($.__views.__alloyId26);
    var __alloyId30 = [];
    $.__views.__alloyId31 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId30.push($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createButton({
        backgroundImage: "/images/btn-down.png",
        textAlign: "right",
        right: "5",
        width: "20",
        height: "20",
        id: "__alloyId32"
    });
    __alloyId30.push($.__views.__alloyId32);
    hideKeyboard ? $.addListener($.__views.__alloyId32, "click", hideKeyboard) : __defers["$.__views.__alloyId32!click!hideKeyboard"] = true;
    $.__views.__alloyId28 = Ti.UI.iOS.createToolbar({
        items: __alloyId30,
        id: "__alloyId28"
    });
    $.__views.remarkTextArea = Ti.UI.createTextArea({
        keyboardToolbar: $.__views.__alloyId28,
        id: "remarkTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Remark",
        value: "",
        width: Ti.UI.FILL,
        left: "10",
        right: "10",
        height: "200",
        suppressReturn: "false"
    });
    $.__views.aView.add($.__views.remarkTextArea);
    $.__views.__alloyId28 = Ti.UI.iOS.createToolbar({
        keyboardToolbar: $.__views.__alloyId28,
        id: "remarkTextArea",
        backgroundColor: "#f6f6f6",
        color: "#888",
        textAlign: "left",
        hintText: "Remark",
        value: "",
        width: Ti.UI.FILL,
        left: "10",
        right: "10",
        height: "200",
        suppressReturn: "false"
    });
    $.__views.appointmentDateTime = Ti.UI.createView({
        id: "appointmentDateTime",
        height: "0",
        visible: "0"
    });
    $.__views.win.add($.__views.appointmentDateTime);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var userModel = Alloy.createCollection("users_plux");
    Alloy.createCollection("appointment");
    var user = userModel.getUserById(Ti.App.Properties.getString("u_id"));
    var selectedClinic;
    $.patient_name.text = user.fullname;
    $.patient_email.text = user.email;
    var dpView = Titanium.UI.createView({
        layout: "vertical",
        height: 200,
        width: Ti.UI.FILL,
        visible: true
    });
    init();
    $.appointment_clinic.addEventListener("click", function() {
        var winClinic = Alloy.createController("appointmentClinicList").getView();
        winClinic.open({
            modal: true
        });
    });
    $.appointment_datetime.addEventListener("click", function() {
        $.appointmentDateTime.visible = 1;
        $.appointmentDateTime.height = 200;
    });
    Ti.App.addEventListener("selectClinic", selectClinic);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("selectClinic", selectClinic);
    });
    __defers["$.__views.saveRecord!click!saveRecord"] && $.addListener($.__views.saveRecord, "click", saveRecord);
    __defers["$.__views.__alloyId32!click!hideKeyboard"] && $.addListener($.__views.__alloyId32, "click", hideKeyboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;