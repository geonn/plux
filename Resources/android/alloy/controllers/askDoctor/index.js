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
        $._doctor_list.update_doctor_list({
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
    this.__controllerPath = "askDoctor/index";
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
        title: "Find Doctor",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId423 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId423"
    });
    $.__views.win.add($.__views.__alloyId423);
    $.__views.__alloyId424 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId424"
    });
    $.__views.__alloyId423.add($.__views.__alloyId424);
    $.__views.__alloyId425 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId425"
    });
    $.__views.__alloyId424.add($.__views.__alloyId425);
    $.__views.__alloyId426 = Ti.UI.createImageView({
        left: 10,
        width: 25,
        height: 25,
        image: "/images/btn-back.png",
        id: "__alloyId426"
    });
    $.__views.__alloyId425.add($.__views.__alloyId426);
    closeWindow ? $.addListener($.__views.__alloyId426, "click", closeWindow) : __defers["$.__views.__alloyId426!click!closeWindow"] = true;
    $.__views.__alloyId427 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId427"
    });
    $.__views.__alloyId424.add($.__views.__alloyId427);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Find Doctor",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId427.add($.__views.pageTitle);
    $.__views.__alloyId428 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#f0f5f8",
        id: "__alloyId428"
    });
    $.__views.__alloyId423.add($.__views.__alloyId428);
    $.__views.__alloyId429 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId429"
    });
    $.__views.__alloyId428.add($.__views.__alloyId429);
    $.__views.__alloyId430 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId430"
    });
    $.__views.__alloyId428.add($.__views.__alloyId430);
    $.__views.sub_back = Ti.UI.createImageView({
        left: 10,
        id: "sub_back",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId430.add($.__views.sub_back);
    $.__views.sub_title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#2a363a",
        font: {
            fontSize: 14
        },
        text: "SELECT A SPECIALIST",
        id: "sub_title",
        top: 10,
        bottom: 10,
        textAlign: "center"
    });
    $.__views.__alloyId430.add($.__views.sub_title);
    $.__views.__alloyId431 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId431"
    });
    $.__views.__alloyId428.add($.__views.__alloyId431);
    var __alloyId432 = [];
    $.__views._specialty_list = Alloy.createController("askDoctor/_specialty_list", {
        id: "_specialty_list"
    });
    __alloyId432.push($.__views._specialty_list.getViewEx({
        recurse: true
    }));
    $.__views._doctor_list = Alloy.createController("askDoctor/_doctor_list", {
        id: "_doctor_list"
    });
    __alloyId432.push($.__views._doctor_list.getViewEx({
        recurse: true
    }));
    $.__views.inner_box = Ti.UI.createScrollableView({
        views: __alloyId432,
        id: "inner_box",
        scrollingEnabled: false
    });
    $.__views.__alloyId423.add($.__views.inner_box);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var appointment_id = args.id || 0;
    var page_container = [ {
        title: "SELECT A SPECIALTY"
    }, {
        title: "SELECT A DOCTOR"
    } ];
    var loading = Alloy.createController("loading");
    init();
    $.inner_box.addEventListener("scrollend", update_subheader);
    $.sub_back.addEventListener("click", movePrevious);
    Ti.App.addEventListener("update_specialty", update_specialty);
    Ti.App.addEventListener("update_chooseDateTime", update_chooseDateTime);
    Ti.App.addEventListener("selectClinic", selectClinic);
    Ti.App.addEventListener("askDoctor_index:windowClose", closeWindow);
    Ti.App.addEventListener("askDoctor_index:loadingStart", loadingStart);
    Ti.App.addEventListener("askDoctor_index:loadingFinish", loadingFinish);
    Ti.App.addEventListener("askDoctor_index:moveNext", moveNext);
    Ti.App.addEventListener("askDoctor_index:movePrevious", movePrevious);
    Ti.App.addEventListener("askDoctor_index:scrollToViewPage", scrollToViewPage);
    $.win.addEventListener("postlayout", postlayout);
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("update_specialty", update_specialty);
        Ti.App.removeEventListener("update_chooseDateTime", update_chooseDateTime);
        Ti.App.removeEventListener("selectClinic", selectClinic);
        Ti.App.removeEventListener("askDoctor_index:windowClose", closeWindow);
        Ti.App.removeEventListener("askDoctor_index:loadingStart", loadingStart);
        Ti.App.removeEventListener("askDoctor_index:loadingFinish", loadingFinish);
        Ti.App.removeEventListener("askDoctor_index:moveNext", moveNext);
        Ti.App.removeEventListener("askDoctor_index:movePrevious", movePrevious);
        Ti.App.removeEventListener("askDoctor_index:scrollToViewPage", scrollToViewPage);
    });
    __defers["$.__views.__alloyId426!click!closeWindow"] && $.addListener($.__views.__alloyId426, "click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;