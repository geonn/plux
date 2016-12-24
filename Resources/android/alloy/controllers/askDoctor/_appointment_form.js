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
        var param_specialty = $.specialty.text || "";
        var appClinic = selectedClinic || "";
        if ("Choose Date and Time" == appDate) {
            common.createAlert("Fail", "Please choose appointment date and time");
            return false;
        }
        if ("" == appClinic) {
            common.createAlert("Fail", "Please choose a clinic");
            return false;
        }
        console.log(appDate);
        appDate = convertToDBDateFormat(appDate);
        remark = remark.replace(/\r?\n/g, "<br />");
        var param = {
            id: appointment_id,
            u_id: Ti.App.Properties.getString("u_id"),
            start_date: appDate,
            duration: duration,
            clinic_id: appClinic,
            specialty: param_specialty,
            remark: remark.trim(),
            created: currentDateTime(),
            updated: currentDateTime()
        };
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
    this.__controllerPath = "askDoctor/_appointment_form";
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
    $.__views.__alloyId376 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId376"
    });
    $.__views.tvrName.add($.__views.__alloyId376);
    $.__views.__alloyId377 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Patient Name",
        top: 12,
        id: "__alloyId377"
    });
    $.__views.__alloyId376.add($.__views.__alloyId377);
    $.__views.__alloyId378 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId378"
    });
    $.__views.__alloyId376.add($.__views.__alloyId378);
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
    $.__views.__alloyId378.add($.__views.patient_name);
    $.__views.__alloyId379 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId379"
    });
    $.__views.aView.add($.__views.__alloyId379);
    $.__views.tvrEmail = Ti.UI.createView({
        id: "tvrEmail",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrEmail);
    $.__views.__alloyId380 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId380"
    });
    $.__views.tvrEmail.add($.__views.__alloyId380);
    $.__views.__alloyId381 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Patient Email",
        top: 12,
        id: "__alloyId381"
    });
    $.__views.__alloyId380.add($.__views.__alloyId381);
    $.__views.__alloyId382 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId382"
    });
    $.__views.__alloyId380.add($.__views.__alloyId382);
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
    $.__views.__alloyId382.add($.__views.patient_email);
    $.__views.__alloyId383 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId383"
    });
    $.__views.aView.add($.__views.__alloyId383);
    $.__views.tvrDateVisit = Ti.UI.createView({
        id: "tvrDateVisit",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrDateVisit);
    $.__views.__alloyId384 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId384"
    });
    $.__views.tvrDateVisit.add($.__views.__alloyId384);
    $.__views.__alloyId385 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Appointment Date & Time",
        top: 12,
        id: "__alloyId385"
    });
    $.__views.__alloyId384.add($.__views.__alloyId385);
    $.__views.__alloyId386 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId386"
    });
    $.__views.__alloyId384.add($.__views.__alloyId386);
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
    $.__views.__alloyId386.add($.__views.appointment_datetime);
    $.__views.__alloyId387 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId387"
    });
    $.__views.aView.add($.__views.__alloyId387);
    $.__views.__alloyId388 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId388"
    });
    $.__views.aView.add($.__views.__alloyId388);
    $.__views.__alloyId389 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId389"
    });
    $.__views.__alloyId388.add($.__views.__alloyId389);
    $.__views.__alloyId390 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Clinic",
        top: 12,
        id: "__alloyId390"
    });
    $.__views.__alloyId389.add($.__views.__alloyId390);
    $.__views.__alloyId391 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId391"
    });
    $.__views.__alloyId389.add($.__views.__alloyId391);
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
    $.__views.__alloyId391.add($.__views.appointment_clinic);
    $.__views.__alloyId392 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId392"
    });
    $.__views.aView.add($.__views.__alloyId392);
    $.__views.__alloyId393 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId393"
    });
    $.__views.aView.add($.__views.__alloyId393);
    $.__views.__alloyId394 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId394"
    });
    $.__views.__alloyId393.add($.__views.__alloyId394);
    $.__views.__alloyId395 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Specialty",
        top: 12,
        id: "__alloyId395"
    });
    $.__views.__alloyId394.add($.__views.__alloyId395);
    $.__views.__alloyId396 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId396"
    });
    $.__views.__alloyId394.add($.__views.__alloyId396);
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
    $.__views.__alloyId396.add($.__views.specialty);
    $.__views.__alloyId397 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId397"
    });
    $.__views.aView.add($.__views.__alloyId397);
    $.__views.__alloyId398 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId398"
    });
    $.__views.aView.add($.__views.__alloyId398);
    $.__views.__alloyId399 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId399"
    });
    $.__views.__alloyId398.add($.__views.__alloyId399);
    $.__views.__alloyId400 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Remark",
        top: 12,
        id: "__alloyId400"
    });
    $.__views.__alloyId399.add($.__views.__alloyId400);
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
    $.__views.__alloyId399.add($.__views.remarkTextArea);
    $.__views.__alloyId401 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId401"
    });
    $.__views.aView.add($.__views.__alloyId401);
    $.__views.__alloyId402 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: 10,
        id: "__alloyId402"
    });
    $.__views.aView.add($.__views.__alloyId402);
    $.__views.__alloyId403 = Ti.UI.createButton({
        title: "Submit Appointment",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff",
        id: "__alloyId403"
    });
    $.__views.__alloyId402.add($.__views.__alloyId403);
    saveRecord ? $.addListener($.__views.__alloyId403, "click", saveRecord) : __defers["$.__views.__alloyId403!click!saveRecord"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var appointment_id = args.appointment_id || "";
    var userModel = Alloy.createCollection("users_plux");
    var appointmentModel = Alloy.createCollection("appointment");
    var user = userModel.getUserById(Ti.App.Properties.getString("u_id"));
    var panelListModel = Alloy.createCollection("panelList");
    var selectedClinic;
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
        selectedClinic = e.clinicId;
        $.appointment_clinic.text = e.clinicName;
        $.appointment_clinic.color = "#000000";
    };
    $.update_specialty = function(e) {
        $.specialty.text = e.specialty;
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
    __defers["$.__views.__alloyId403!click!saveRecord"] && $.addListener($.__views.__alloyId403, "click", saveRecord);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;