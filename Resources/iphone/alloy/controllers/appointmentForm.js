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
        var appClinic = selectedClinic || "";
        if ("Choose Date and Time" == appDate) {
            common.createAlert("Fail", "Please choose appointment date and time");
            return false;
        }
        if ("" == appClinic) {
            common.createAlert("Fail", "Please choose a clinic");
            return false;
        }
        appDate = convertToDBDateFormat(appDate);
        remark = remark.replace(/\r?\n/g, "<br />");
        var param = {
            id: appointment_id,
            u_id: Ti.App.Properties.getString("u_id"),
            date: appDate,
            clinic_id: appClinic,
            remark: remark.trim(),
            created: currentDateTime(),
            updated: currentDateTime()
        };
        API.addAppointment({
            param: param
        }, savedAppointment);
    }
    function savedAppointment(ex) {
        var result = ex.param;
        if ("error" == result.status) {
            common.createAlert("Error", result.data);
            return false;
        }
        appointmentModel.saveArray(result.data);
        Ti.App.fireEvent("displayRecords");
        nav.closeWindow($.win);
    }
    function init() {
        details = appointmentModel.getAppointmentById(appointment_id) || "";
        if ("" != details) {
            var remark = details.remark;
            var regex = /<br\s*[\/]?>/gi;
            if (details.date >= currentDateTime()) $.remarkTextArea.value = remark.replace(regex, "\n"); else {
                $.saveRecord.visible = false;
                $.remarkTextArea.height = 0;
                $.remarkTextArea_readonly.height = Ti.UI.SIZE;
                $.remarkTextArea_readonly.text = remark.replace(regex, "\n");
            }
            $.appointment_datetime.text = timeFormat(details.date);
            var clinic = panelListModel.getPanelListById(details.clinic_id);
            $.appointment_clinic.text = clinic.clinicName;
            selectedClinic = details.clinic_id;
            if (details.date >= currentDateTime()) {
                var deleteBtn = Ti.UI.createButton({
                    borderRadius: 5,
                    backgroundColor: "#CC2228",
                    title: "Delete Appointment",
                    width: "70%",
                    top: 20,
                    height: 40,
                    color: "#ffffff"
                });
                deleteBtn.addEventListener("click", function() {
                    var dialog = Ti.UI.createAlertDialog({
                        cancel: 1,
                        buttonNames: [ "Cancel", "Confirm" ],
                        message: "Are you sure want to delete this records?",
                        title: "Delete Confirmation"
                    });
                    dialog.addEventListener("click", function(e) {
                        e.index === e.source.cancel;
                        1 === e.index && API.deleteAppointment(appointment_id, removeAppointment);
                    });
                    dialog.show();
                });
                $.aView.add(deleteBtn);
            } else {
                var statusLbl = Titanium.UI.createLabel({
                    text: "Status",
                    source: details.id,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    top: 10,
                    left: 10,
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE
                });
                var statusText = "Pending";
                var statusColor = "#8A6500";
                if ("2" == details.status) {
                    statusText = "Rejected";
                    statusColor = "#CE1D1C";
                } else if ("3" == details.status) {
                    statusText = "Accepted";
                    statusColor = "#2C8A00";
                } else if ("4" == details.status) {
                    statusText = "Suggested Another Date And Time";
                    statusColor = "#005E8A";
                }
                if (details.date < currentDateTime()) {
                    statusText = "Expired";
                    statusColor = "#CE1D1C";
                }
                var statusText = $.UI.create("Label", {
                    classes: [ "medium_font", "greyText" ],
                    text: statusText,
                    source: details.id,
                    color: statusColor,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    top: 10,
                    left: 20,
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE
                });
                $.aView.add(statusLbl);
                $.aView.add(statusText);
            }
        }
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
        var t = curDate.substr(2, 16);
        var ct = t.split(":");
        var minDate = new Date();
        minDate.setFullYear(cd[0]);
        minDate.setMonth(parseInt(cd[1]) - 1);
        minDate.setDate(parseInt(cd[2]));
        if ("" != details) {
            var selDate = details.date;
            d = selDate.substr(0, 10);
            cd = d.split("-");
            t = selDate.substr(2, 16);
            ct = t.split(":");
        }
        var value = new Date();
        value.setFullYear(cd[0]);
        value.setMonth(parseInt(cd[1]) - 1);
        value.setDate(parseInt(cd[2]));
        value.setHours(ct[0], ct[1], 0);
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
    function removeAppointment() {
        appointmentModel.updateAppointmentStatus(appointment_id, 5);
        Ti.App.fireEvent("displayRecords");
        nav.closeWindow($.win);
    }
    function changeDate(e) {
        var pickerdate = e.value;
        var day = pickerdate.getDate();
        day = day.toString();
        var hours = pickerdate.getHours();
        var minutes = pickerdate.getMinutes();
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
        id: "__alloyId21"
    });
    $.__views.win.add($.__views.__alloyId21);
    $.__views.aView = Ti.UI.createScrollView({
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
        color: "#9E9E9E",
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
        color: "#9E9E9E",
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
        color: "#9E9E9E",
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
        color: "#9E9E9E",
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
    $.__views.remarkTextArea_readonly = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "0",
        font: {
            fontSize: "14dp"
        },
        color: "#9E9E9E",
        left: "20",
        top: "10",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "remarkTextArea_readonly"
    });
    $.__views.aView.add($.__views.remarkTextArea_readonly);
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
    var args = arguments[0] || {};
    var appointment_id = args.id || "";
    var userModel = Alloy.createCollection("users_plux");
    var appointmentModel = Alloy.createCollection("appointment");
    var user = userModel.getUserById(Ti.App.Properties.getString("u_id"));
    var panelListModel = Alloy.createCollection("panelList");
    var selectedClinic;
    var toolbar;
    $.patient_name.text = user.fullname;
    $.patient_email.text = user.email;
    var dpView = Titanium.UI.createView({
        layout: "vertical",
        height: 200,
        width: Ti.UI.FILL,
        visible: true
    });
    init();
    if (details.date >= currentDateTime() || "" == appointment_id) {
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
    }
    Ti.App.addEventListener("selectClinic", selectClinic);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("selectClinic", selectClinic);
        toolbar = null;
        dpView = null;
    });
    __defers["$.__views.saveRecord!click!saveRecord"] && $.addListener($.__views.saveRecord, "click", saveRecord);
    __defers["$.__views.__alloyId32!click!hideKeyboard"] && $.addListener($.__views.__alloyId32, "click", hideKeyboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;