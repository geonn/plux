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
            Ti.App.fireEvent("update_chooseDateTime", {
                date: timeFormat(data_appointment.start_date)
            });
            scrollToViewPage({
                number: 2
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        id: "win",
        title: "Appointment Form",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId202 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId202"
    });
    $.__views.win.add($.__views.__alloyId202);
    $.__views.__alloyId203 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId203"
    });
    $.__views.__alloyId202.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId204"
    });
    $.__views.__alloyId203.add($.__views.__alloyId204);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId204.add($.__views.btnBack);
    $.__views.__alloyId205 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId205"
    });
    $.__views.__alloyId203.add($.__views.__alloyId205);
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
    $.__views.__alloyId205.add($.__views.pageTitle);
    $.__views.__alloyId206 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#f0f5f8",
        id: "__alloyId206"
    });
    $.__views.__alloyId202.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId207"
    });
    $.__views.__alloyId206.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId208"
    });
    $.__views.__alloyId206.add($.__views.__alloyId208);
    $.__views.sub_back = Ti.UI.createImageView({
        left: "10",
        id: "sub_back",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId208.add($.__views.sub_back);
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
    $.__views.__alloyId208.add($.__views.sub_title);
    $.__views.__alloyId209 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId209"
    });
    $.__views.__alloyId206.add($.__views.__alloyId209);
    var __alloyId210 = [];
    $.__views.__alloyId211 = Alloy.createController("appointment/_clinic_list", {
        id: "__alloyId211"
    });
    __alloyId210.push($.__views.__alloyId211.getViewEx({
        recurse: true
    }));
    $.__views._available_timeslot = Alloy.createController("appointment/_available_timeslot", {
        id: "_available_timeslot"
    });
    __alloyId210.push($.__views._available_timeslot.getViewEx({
        recurse: true
    }));
    $.__views._appointment_form = Alloy.createController("appointment/_appointment_form", {
        id: "_appointment_form"
    });
    __alloyId210.push($.__views._appointment_form.getViewEx({
        recurse: true
    }));
    $.__views.inner_box = Ti.UI.createScrollableView({
        views: __alloyId210,
        id: "inner_box",
        scrollingEnabled: "false"
    });
    $.__views.__alloyId202.add($.__views.inner_box);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var appointment_id = args.id || 0;
    var page_container = [ {
        title: "SELECT A CLINIC"
    }, {
        title: "SELECT AN AVAILABLE TIME"
    }, {
        title: "CREATE THIS APPOINTMENT"
    } ];
    var loading = Alloy.createController("loading");
    init();
    $.inner_box.addEventListener("scrollend", update_subheader);
    $.sub_back.addEventListener("click", movePrevious);
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
        Ti.App.removeEventListener("selectClinic", selectClinic);
        Ti.App.removeEventListener("appointment_index:moveNext", moveNext);
        Ti.App.removeEventListener("appointment_index:movePrevious", movePrevious);
        Ti.App.removeEventListener("appointment_index:scrollToViewPage", scrollToViewPage);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;