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
        if ("Choose Date and Time" == appDate) {
            common.createAlert("Fail", "Please choose appointment date and time");
            Ti.App.fireEvent("appointment_index:loadingEnd");
            return false;
        }
        appDate = convertToDBDateFormat(appDate);
        remark = remark.replace(/\r?\n/g, "<br />");
        var param = {
            id: appointment_id,
            u_id: Ti.App.Properties.getString("u_id"),
            start_date: appDate,
            duration: duration,
            doctor_panel_id: doctor_panel_id,
            remark: remark.trim(),
            created: currentDateTime(),
            updated: currentDateTime()
        };
        console.log(doctor_panel_id);
        console.log(param);
        Ti.App.fireEvent("appointment_index:loadingStart");
        API.addAppointment({
            param: param
        }, savedAppointment);
    }
    function savedAppointment(ex) {
        var result = ex.param;
        console.log(result);
        if ("error" == result.status) {
            common.createAlert("Error", result.data);
            return false;
        }
        appointmentModel.saveArray(result.data);
        Ti.App.fireEvent("displayRecords");
        Ti.App.fireEvent("appointment_index:loadingFinish");
        Ti.App.fireEvent("appointment_index:windowClose");
    }
    function init() {
        details = appointmentModel.getAppointmentById(appointment_id) || "";
        if ("" != details) {
            var remark = details.remark;
            var regex = /<br\s*[\/]?>/gi;
            if (details.date >= currentDateTime()) $.remarkTextArea.value = remark.replace(regex, "\n"); else {
                $.remarkTextArea.height = 0;
                $.remarkTextArea_readonly.height = Ti.UI.SIZE;
                $.remarkTextArea_readonly.text = remark.replace(regex, "\n");
            }
            $.appointment_datetime.text = timeFormat(details.date);
            $.appointment_datetime.color = "#000000";
            var clinic = panelListModel.getPanelListById(details.clinic_id);
            $.appointment_clinic.text = clinic.clinicName;
            $.appointment_clinic.color = "#000000";
            selectedClinic = details.clinic_id;
            var specialty_field = details.specialty;
            $.specialty.text = specialty_field;
        }
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
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointment/_appointment_form";
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
    $.__views.aView = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "aView",
        top: 10,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        backgroundColor: "#ffffff"
    });
    $.__views.aView && $.addTopLevelView($.__views.aView);
    $.__views.tvrName = Ti.UI.createView({
        id: "tvrName",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrName);
<<<<<<< HEAD
    $.__views.__alloyId335 = Ti.UI.createView({
=======
    $.__views.__alloyId323 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId335"
    });
    $.__views.tvrName.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createLabel({
=======
        id: "__alloyId323"
    });
    $.__views.tvrName.add($.__views.__alloyId323);
    $.__views.__alloyId324 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Patient Name",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId336"
    });
    $.__views.__alloyId335.add($.__views.__alloyId336);
    $.__views.__alloyId337 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId337"
    });
    $.__views.__alloyId335.add($.__views.__alloyId337);
=======
        id: "__alloyId324"
    });
    $.__views.__alloyId323.add($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId325"
    });
    $.__views.__alloyId323.add($.__views.__alloyId325);
>>>>>>> origin/master
    $.__views.patient_name = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Date of visit a clinic",
        id: "patient_name"
    });
<<<<<<< HEAD
    $.__views.__alloyId337.add($.__views.patient_name);
    $.__views.__alloyId338 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId338"
    });
    $.__views.aView.add($.__views.__alloyId338);
=======
    $.__views.__alloyId325.add($.__views.patient_name);
    $.__views.__alloyId326 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId326"
    });
    $.__views.aView.add($.__views.__alloyId326);
>>>>>>> origin/master
    $.__views.tvrEmail = Ti.UI.createView({
        id: "tvrEmail",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrEmail);
<<<<<<< HEAD
    $.__views.__alloyId339 = Ti.UI.createView({
=======
    $.__views.__alloyId327 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId339"
    });
    $.__views.tvrEmail.add($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createLabel({
=======
        id: "__alloyId327"
    });
    $.__views.tvrEmail.add($.__views.__alloyId327);
    $.__views.__alloyId328 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Patient Email",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId340"
    });
    $.__views.__alloyId339.add($.__views.__alloyId340);
    $.__views.__alloyId341 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId341"
    });
    $.__views.__alloyId339.add($.__views.__alloyId341);
=======
        id: "__alloyId328"
    });
    $.__views.__alloyId327.add($.__views.__alloyId328);
    $.__views.__alloyId329 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId329"
    });
    $.__views.__alloyId327.add($.__views.__alloyId329);
>>>>>>> origin/master
    $.__views.patient_email = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Date of visit a clinic",
        id: "patient_email"
    });
<<<<<<< HEAD
    $.__views.__alloyId341.add($.__views.patient_email);
    $.__views.__alloyId342 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId342"
    });
    $.__views.aView.add($.__views.__alloyId342);
=======
    $.__views.__alloyId329.add($.__views.patient_email);
    $.__views.__alloyId330 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId330"
    });
    $.__views.aView.add($.__views.__alloyId330);
>>>>>>> origin/master
    $.__views.tvrDateVisit = Ti.UI.createView({
        id: "tvrDateVisit",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrDateVisit);
<<<<<<< HEAD
    $.__views.__alloyId343 = Ti.UI.createView({
=======
    $.__views.__alloyId331 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId343"
    });
    $.__views.tvrDateVisit.add($.__views.__alloyId343);
    $.__views.__alloyId344 = Ti.UI.createLabel({
=======
        id: "__alloyId331"
    });
    $.__views.tvrDateVisit.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Appointment Date & Time",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId344"
    });
    $.__views.__alloyId343.add($.__views.__alloyId344);
    $.__views.__alloyId345 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId345"
    });
    $.__views.__alloyId343.add($.__views.__alloyId345);
=======
        id: "__alloyId332"
    });
    $.__views.__alloyId331.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId333"
    });
    $.__views.__alloyId331.add($.__views.__alloyId333);
>>>>>>> origin/master
    $.__views.appointment_datetime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Choose Date and Time",
        id: "appointment_datetime"
    });
<<<<<<< HEAD
    $.__views.__alloyId345.add($.__views.appointment_datetime);
    $.__views.__alloyId346 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId346"
    });
    $.__views.aView.add($.__views.__alloyId346);
    $.__views.__alloyId347 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId347"
    });
    $.__views.aView.add($.__views.__alloyId347);
    $.__views.__alloyId348 = Ti.UI.createView({
=======
    $.__views.__alloyId333.add($.__views.appointment_datetime);
    $.__views.__alloyId334 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId334"
    });
    $.__views.aView.add($.__views.__alloyId334);
    $.__views.__alloyId335 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId335"
    });
    $.__views.aView.add($.__views.__alloyId335);
    $.__views.__alloyId336 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId348"
    });
    $.__views.__alloyId347.add($.__views.__alloyId348);
    $.__views.__alloyId349 = Ti.UI.createLabel({
=======
        id: "__alloyId336"
    });
    $.__views.__alloyId335.add($.__views.__alloyId336);
    $.__views.__alloyId337 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Clinic",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId349"
    });
    $.__views.__alloyId348.add($.__views.__alloyId349);
    $.__views.__alloyId350 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId350"
    });
    $.__views.__alloyId348.add($.__views.__alloyId350);
=======
        id: "__alloyId337"
    });
    $.__views.__alloyId336.add($.__views.__alloyId337);
    $.__views.__alloyId338 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId338"
    });
    $.__views.__alloyId336.add($.__views.__alloyId338);
>>>>>>> origin/master
    $.__views.appointment_clinic = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Choose Clinic to attend",
        id: "appointment_clinic"
    });
<<<<<<< HEAD
    $.__views.__alloyId350.add($.__views.appointment_clinic);
    $.__views.__alloyId351 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId351"
    });
    $.__views.aView.add($.__views.__alloyId351);
    $.__views.__alloyId352 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId352"
    });
    $.__views.aView.add($.__views.__alloyId352);
    $.__views.__alloyId353 = Ti.UI.createView({
=======
    $.__views.__alloyId338.add($.__views.appointment_clinic);
    $.__views.__alloyId339 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId339"
    });
    $.__views.aView.add($.__views.__alloyId339);
    $.__views.__alloyId340 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId340"
    });
    $.__views.aView.add($.__views.__alloyId340);
    $.__views.__alloyId341 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId353"
    });
    $.__views.__alloyId352.add($.__views.__alloyId353);
    $.__views.__alloyId354 = Ti.UI.createLabel({
=======
        id: "__alloyId341"
    });
    $.__views.__alloyId340.add($.__views.__alloyId341);
    $.__views.__alloyId342 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Specialty",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId354"
    });
    $.__views.__alloyId353.add($.__views.__alloyId354);
    $.__views.__alloyId355 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId355"
    });
    $.__views.__alloyId353.add($.__views.__alloyId355);
=======
        id: "__alloyId342"
    });
    $.__views.__alloyId341.add($.__views.__alloyId342);
    $.__views.__alloyId343 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId343"
    });
    $.__views.__alloyId341.add($.__views.__alloyId343);
>>>>>>> origin/master
    $.__views.specialty = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: 12,
        left: 10,
        right: 10,
        bottom: 10,
        font: {
            fontSize: 12
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        text: "Choose Specialty",
        id: "specialty"
    });
<<<<<<< HEAD
    $.__views.__alloyId355.add($.__views.specialty);
    $.__views.__alloyId356 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId356"
    });
    $.__views.aView.add($.__views.__alloyId356);
    $.__views.__alloyId357 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId357"
    });
    $.__views.aView.add($.__views.__alloyId357);
    $.__views.__alloyId358 = Ti.UI.createView({
=======
    $.__views.__alloyId343.add($.__views.specialty);
    $.__views.__alloyId344 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId344"
    });
    $.__views.aView.add($.__views.__alloyId344);
    $.__views.__alloyId345 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId345"
    });
    $.__views.aView.add($.__views.__alloyId345);
    $.__views.__alloyId346 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId358"
    });
    $.__views.__alloyId357.add($.__views.__alloyId358);
    $.__views.__alloyId359 = Ti.UI.createLabel({
=======
        id: "__alloyId346"
    });
    $.__views.__alloyId345.add($.__views.__alloyId346);
    $.__views.__alloyId347 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Remark",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId359"
    });
    $.__views.__alloyId358.add($.__views.__alloyId359);
=======
        id: "__alloyId347"
    });
    $.__views.__alloyId346.add($.__views.__alloyId347);
>>>>>>> origin/master
    $.__views.remarkTextArea = Ti.UI.createTextArea({
        font: {
            fontSize: 12
        },
        id: "remarkTextArea",
        color: "#000000",
        textAlign: "right",
        hintText: "Remark",
        value: "",
        width: Ti.UI.FILL,
        left: 10,
        right: 10,
        height: 100,
        suppressReturn: false
    });
<<<<<<< HEAD
    $.__views.__alloyId358.add($.__views.remarkTextArea);
    $.__views.__alloyId360 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId360"
    });
    $.__views.aView.add($.__views.__alloyId360);
    $.__views.__alloyId361 = Ti.UI.createView({
=======
    $.__views.__alloyId346.add($.__views.remarkTextArea);
    $.__views.__alloyId348 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId348"
    });
    $.__views.aView.add($.__views.__alloyId348);
    $.__views.__alloyId349 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
<<<<<<< HEAD
        id: "__alloyId361"
    });
    $.__views.aView.add($.__views.__alloyId361);
    $.__views.__alloyId362 = Ti.UI.createButton({
=======
        id: "__alloyId349"
    });
    $.__views.aView.add($.__views.__alloyId349);
    $.__views.__alloyId350 = Ti.UI.createButton({
>>>>>>> origin/master
        title: "Submit Appointment",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId362"
    });
    $.__views.__alloyId361.add($.__views.__alloyId362);
    saveRecord ? $.addListener($.__views.__alloyId362, "click", saveRecord) : __defers["$.__views.__alloyId362!click!saveRecord"] = true;
=======
        id: "__alloyId350"
    });
    $.__views.__alloyId349.add($.__views.__alloyId350);
    saveRecord ? $.addListener($.__views.__alloyId350, "click", saveRecord) : __defers["$.__views.__alloyId350!click!saveRecord"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var appointment_id = args.appointment_id || "";
    var userModel = Alloy.createCollection("users_plux");
    var appointmentModel = Alloy.createCollection("appointment");
    var user = userModel.getUserById(Ti.App.Properties.getString("u_id"));
    var panelListModel = Alloy.createCollection("panelList");
    var selectedClinic, doctor_panel_id;
    var appointmentDatetime;
    var duration = parseInt(Ti.App.Properties.getString("timeblock")) || 30;
    $.patient_name.text = user.fullname;
    $.patient_email.text = user.email;
    Titanium.UI.createView({
        layout: "vertical",
        height: 200,
        width: Ti.UI.FILL,
        visible: true
    });
    init();
    $.update_selectClinic = function(e) {
        console.log(e.doctor_panel_id);
        selectedClinic = e.clinicId;
        doctor_panel_id = e.doctor_panel_id;
        $.appointment_clinic.text = e.clinicName;
        $.appointment_clinic.color = "#000000";
    };
    $.update_specialty = function(e) {
        $.specialty.text = e.specialty_name;
        $.specialty.color = "#000000";
    };
    $.update_chooseDateTime = function(e) {
        appointmentDatetime = e.date;
        $.appointment_datetime.text = e.date;
        $.appointment_datetime.color = "#000000";
    };
    $.appointment_datetime.addEventListener("click", function() {
        Ti.App.fireEvent("appointment_index:scrollToViewPage", {
            number: 2
        });
    });
    $.appointment_clinic.addEventListener("click", function() {
        Ti.App.fireEvent("appointment_index:scrollToViewPage", {
            number: 0
        });
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId362!click!saveRecord"] && $.addListener($.__views.__alloyId362, "click", saveRecord);
=======
    __defers["$.__views.__alloyId350!click!saveRecord"] && $.addListener($.__views.__alloyId350, "click", saveRecord);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;