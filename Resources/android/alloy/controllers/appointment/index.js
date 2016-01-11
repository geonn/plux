function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        $.win.add(loading.getView());
        loading.start();
        $.sub_back.hide();
    }
    function postlayout() {
        $.win.removeEventListener("postlayout", postlayout);
        if (appointment_id) {
            var appointmentModel = Alloy.createCollection("appointment");
            var clinicModel = Alloy.createCollection("panelList");
            var data_appointment = appointmentModel.getAppointmentById(appointment_id);
            console.log(data_appointment);
            var data_clinic = clinicModel.getDataByID(data_appointment.clinic_id);
            console.log(data_clinic);
            Ti.App.fireEvent("selectClinic", {
                clinicName: data_clinic.clinicName,
                clinicId: data_appointment.clinic_id
            });
            Ti.App.fireEvent("update_specialty", {
                specialty: data_appointment.specialty
            });
            Ti.App.fireEvent("update_chooseDateTime", {
                date: timeFormat(data_appointment.start_date)
            });
            scrollToViewPage({
                number: 3
            });
        }
        loading.finish();
    }
    function update_subheader() {
        var current_page = $.inner_box.currentPage;
        $.sub_title.text = page_container[current_page].title;
        current_page ? $.sub_back.show() : $.sub_back.hide();
    }
    function closeWindow() {
        $.win.close();
    }
    function scrollToViewPage(e) {
        $.inner_box.scrollToView(e.number);
    }
    function moveNext() {
        $.inner_box.moveNext();
    }
    function movePrevious() {
        $.inner_box.movePrevious();
    }
    function selectClinic(e) {
        $._available_timeslot.set_clinicId({
            clinicId: e.clinicId
        });
        $._specialty_list.set_clinicId({
            clinicId: e.clinicId
        });
        $._appointment_form.update_selectClinic({
            clinicName: e.clinicName,
            clinicId: e.clinicId
        });
    }
    function update_chooseDateTime(e) {
        $._appointment_form.update_chooseDateTime({
            date: e.date
        });
    }
    function update_specialty(e) {
        $._appointment_form.update_specialty({
            specialty: e.specialty
        });
        $._available_timeslot.set_specialty({
            specialty: e.specialty
        });
    }
    function loadingStart() {
        loading.start();
    }
    function loadingFinish() {
        loading.finish();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointment/index";
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
    $.__views.__alloyId281 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId281"
    });
    $.__views.win.add($.__views.__alloyId281);
    $.__views.__alloyId282 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId282"
    });
    $.__views.__alloyId281.add($.__views.__alloyId282);
    $.__views.__alloyId283 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId283"
    });
    $.__views.__alloyId282.add($.__views.__alloyId283);
    $.__views.__alloyId284 = Ti.UI.createImageView({
        left: "10",
        width: "25",
        height: "25",
        image: "/images/btn-back.png",
        id: "__alloyId284"
    });
    $.__views.__alloyId283.add($.__views.__alloyId284);
    closeWindow ? $.addListener($.__views.__alloyId284, "click", closeWindow) : __defers["$.__views.__alloyId284!click!closeWindow"] = true;
    $.__views.__alloyId285 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId285"
    });
    $.__views.__alloyId282.add($.__views.__alloyId285);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "New Appointment",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId285.add($.__views.pageTitle);
    $.__views.__alloyId286 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#f0f5f8",
        id: "__alloyId286"
    });
    $.__views.__alloyId281.add($.__views.__alloyId286);
    $.__views.__alloyId287 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId287"
    });
    $.__views.__alloyId286.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId288"
    });
    $.__views.__alloyId286.add($.__views.__alloyId288);
    $.__views.sub_back = Ti.UI.createImageView({
        left: "10",
        id: "sub_back",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId288.add($.__views.sub_back);
    $.__views.sub_title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#2a363a",
        font: {
            fontSize: 14
        },
        text: "SELECT A CLINIC",
        id: "sub_title",
        top: "10",
        bottom: "10",
        textAlign: "center"
    });
    $.__views.__alloyId288.add($.__views.sub_title);
    $.__views.__alloyId289 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId289"
    });
    $.__views.__alloyId286.add($.__views.__alloyId289);
    var __alloyId290 = [];
    $.__views.__alloyId291 = Alloy.createController("appointment/_clinic_list", {
        id: "__alloyId291"
    });
    __alloyId290.push($.__views.__alloyId291.getViewEx({
        recurse: true
    }));
    $.__views._specialty_list = Alloy.createController("appointment/_specialty_list", {
        id: "_specialty_list"
    });
    __alloyId290.push($.__views._specialty_list.getViewEx({
        recurse: true
    }));
    $.__views._available_timeslot = Alloy.createController("appointment/_available_timeslot", {
        id: "_available_timeslot"
    });
    __alloyId290.push($.__views._available_timeslot.getViewEx({
        recurse: true
    }));
    $.__views._appointment_form = Alloy.createController("appointment/_appointment_form", {
        id: "_appointment_form"
    });
    __alloyId290.push($.__views._appointment_form.getViewEx({
        recurse: true
    }));
    $.__views.inner_box = Ti.UI.createScrollableView({
        views: __alloyId290,
        id: "inner_box",
        scrollingEnabled: "false"
    });
    $.__views.__alloyId281.add($.__views.inner_box);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var appointment_id = args.id || 0;
    var page_container = [ {
        title: "SELECT A CLINIC"
    }, {
        title: "SELECT A SPECIALTY"
    }, {
        title: "SELECT AN AVAILABLE TIME"
    }, {
        title: "CREATE THIS APPOINTMENT"
    } ];
    var loading = Alloy.createController("loading");
    init();
    $.inner_box.addEventListener("scrollend", update_subheader);
    $.sub_back.addEventListener("click", movePrevious);
    Ti.App.addEventListener("update_specialty", update_specialty);
    Ti.App.addEventListener("update_chooseDateTime", update_chooseDateTime);
    Ti.App.addEventListener("selectClinic", selectClinic);
    Ti.App.addEventListener("appointment_index:windowClose", closeWindow);
    Ti.App.addEventListener("appointment_index:loadingStart", loadingStart);
    Ti.App.addEventListener("appointment_index:loadingFinish", loadingFinish);
    Ti.App.addEventListener("appointment_index:moveNext", moveNext);
    Ti.App.addEventListener("appointment_index:movePrevious", movePrevious);
    Ti.App.addEventListener("appointment_index:scrollToViewPage", scrollToViewPage);
    $.win.addEventListener("postlayout", postlayout);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("update_specialty", update_specialty);
        Ti.App.removeEventListener("update_chooseDateTime", update_chooseDateTime);
        Ti.App.removeEventListener("selectClinic", selectClinic);
        Ti.App.removeEventListener("appointment_index:windowClose", closeWindow);
        Ti.App.removeEventListener("appointment_index:loadingStart", loadingStart);
        Ti.App.removeEventListener("appointment_index:loadingFinish", loadingFinish);
        Ti.App.removeEventListener("appointment_index:moveNext", moveNext);
        Ti.App.removeEventListener("appointment_index:movePrevious", movePrevious);
        Ti.App.removeEventListener("appointment_index:scrollToViewPage", scrollToViewPage);
    });
    __defers["$.__views.__alloyId284!click!closeWindow"] && $.addListener($.__views.__alloyId284, "click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;