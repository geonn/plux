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
        top: "10",
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
    $.__views.__alloyId252 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId252"
    });
    $.__views.tvrName.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Patient Name",
        top: "12",
        id: "__alloyId253"
    });
    $.__views.__alloyId252.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId254"
    });
    $.__views.__alloyId252.add($.__views.__alloyId254);
    $.__views.patient_name = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: "12",
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
    $.__views.__alloyId254.add($.__views.patient_name);
    $.__views.__alloyId255 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId255"
    });
    $.__views.aView.add($.__views.__alloyId255);
    $.__views.tvrEmail = Ti.UI.createView({
        id: "tvrEmail",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrEmail);
    $.__views.__alloyId256 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId256"
    });
    $.__views.tvrEmail.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Patient Email",
        top: "12",
        id: "__alloyId257"
    });
    $.__views.__alloyId256.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId258"
    });
    $.__views.__alloyId256.add($.__views.__alloyId258);
    $.__views.patient_email = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#000000",
        top: "12",
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
    $.__views.__alloyId258.add($.__views.patient_email);
    $.__views.__alloyId259 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId259"
    });
    $.__views.aView.add($.__views.__alloyId259);
    $.__views.tvrDateVisit = Ti.UI.createView({
        id: "tvrDateVisit",
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.aView.add($.__views.tvrDateVisit);
    $.__views.__alloyId260 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId260"
    });
    $.__views.tvrDateVisit.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Appointment Date & Time",
        top: "12",
        id: "__alloyId261"
    });
    $.__views.__alloyId260.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId262"
    });
    $.__views.__alloyId260.add($.__views.__alloyId262);
    $.__views.appointment_datetime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: "12",
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
    $.__views.__alloyId262.add($.__views.appointment_datetime);
    $.__views.__alloyId263 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId263"
    });
    $.__views.aView.add($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId264"
    });
    $.__views.aView.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId265"
    });
    $.__views.__alloyId264.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Clinic",
        top: "12",
        id: "__alloyId266"
    });
    $.__views.__alloyId265.add($.__views.__alloyId266);
    $.__views.__alloyId267 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId267"
    });
    $.__views.__alloyId265.add($.__views.__alloyId267);
    $.__views.appointment_clinic = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: "12",
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
    $.__views.__alloyId267.add($.__views.appointment_clinic);
    $.__views.__alloyId268 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId268"
    });
    $.__views.aView.add($.__views.__alloyId268);
    $.__views.__alloyId269 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId269"
    });
    $.__views.aView.add($.__views.__alloyId269);
    $.__views.__alloyId270 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId270"
    });
    $.__views.__alloyId269.add($.__views.__alloyId270);
    $.__views.__alloyId271 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Specialty",
        top: "12",
        id: "__alloyId271"
    });
    $.__views.__alloyId270.add($.__views.__alloyId271);
    $.__views.__alloyId272 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
        width: "auto",
        id: "__alloyId272"
    });
    $.__views.__alloyId270.add($.__views.__alloyId272);
    $.__views.specialty = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#C8C8CD",
        top: "12",
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
    $.__views.__alloyId272.add($.__views.specialty);
    $.__views.__alloyId273 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId273"
    });
    $.__views.aView.add($.__views.__alloyId273);
    $.__views.__alloyId274 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff",
        id: "__alloyId274"
    });
    $.__views.aView.add($.__views.__alloyId274);
    $.__views.__alloyId275 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        textAlign: "right",
        id: "__alloyId275"
    });
    $.__views.__alloyId274.add($.__views.__alloyId275);
    $.__views.__alloyId276 = Ti.UI.createLabel({
        width: "35%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        font: {
            fontSize: 14
        },
        left: 10,
        text: "Remark",
        top: "12",
        id: "__alloyId276"
    });
    $.__views.__alloyId275.add($.__views.__alloyId276);
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
        left: "10",
        right: "10",
        height: "100",
        suppressReturn: "false"
    });
    $.__views.__alloyId275.add($.__views.remarkTextArea);
    $.__views.__alloyId277 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId277"
    });
    $.__views.aView.add($.__views.__alloyId277);
    $.__views.__alloyId278 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        top: "10",
        id: "__alloyId278"
    });
    $.__views.aView.add($.__views.__alloyId278);
    $.__views.__alloyId279 = Ti.UI.createButton({
        title: "Submit Appointment",
        borderRadius: "5",
        backgroundColor: "#7B7B7B",
        width: "70%",
        top: "5",
        height: "40",
        color: "#ffffff",
        id: "__alloyId279"
    });
    $.__views.__alloyId278.add($.__views.__alloyId279);
    saveRecord ? $.addListener($.__views.__alloyId279, "click", saveRecord) : __defers["$.__views.__alloyId279!click!saveRecord"] = true;
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
    __defers["$.__views.__alloyId279!click!saveRecord"] && $.addListener($.__views.__alloyId279, "click", saveRecord);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;