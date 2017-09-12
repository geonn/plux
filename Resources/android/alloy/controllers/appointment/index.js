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
            var data_clinic = clinicModel.getDataByID(data_appointment.clinic_id);
            Ti.App.fireEvent("selectClinic", {
                clinicName: data_clinic.clinicName,
                clinicId: data_appointment.clinic_id
            });
            Ti.App.fireEvent("update_specialty", {
                specialty_id: data_appointment.specialty_id
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
    function update_subheader(e) {
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
        console.log(e.clinicName + " clinic update");
        $._available_timeslot.set_doctor_panel_id({
            doctor_panel_id: e.doctor_panel_id
        });
        $._appointment_form.update_selectClinic({
            clinicName: e.clinicName,
            clinicId: e.clinicId,
            doctor_panel_id: e.doctor_panel_id
        });
    }
    function update_chooseDateTime(e) {
        $._appointment_form.update_chooseDateTime({
            date: e.date
        });
    }
    function update_specialty(e) {
        console.log(e.specialty_name + " update specialty");
        $._appointment_form.update_specialty({
            specialty_id: e.specialty_id,
            specialty_name: e.specialty_name
        });
        $._available_timeslot.set_specialty({
            specialty_id: e.specialty_id
        });
        $._clinic_list.set_specialty({
            specialty_id: e.specialty_id
        });
    }
    function loadingStart() {
        loading.start();
    }
    function loadingFinish() {
        loading.finish();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointment/index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ],
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        id: "win",
        title: "Appointment Form",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
<<<<<<< HEAD
    $.__views.__alloyId391 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId391"
    });
    $.__views.win.add($.__views.__alloyId391);
    $.__views.__alloyId392 = Ti.UI.createView({
=======
    $.__views.__alloyId361 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId361"
    });
    $.__views.win.add($.__views.__alloyId361);
    $.__views.__alloyId362 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId392"
    });
    $.__views.__alloyId391.add($.__views.__alloyId392);
    $.__views.__alloyId393 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId393"
    });
    $.__views.__alloyId392.add($.__views.__alloyId393);
    $.__views.__alloyId394 = Ti.UI.createImageView({
=======
        id: "__alloyId362"
    });
    $.__views.__alloyId361.add($.__views.__alloyId362);
    $.__views.__alloyId363 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId363"
    });
    $.__views.__alloyId362.add($.__views.__alloyId363);
    $.__views.__alloyId364 = Ti.UI.createImageView({
>>>>>>> origin/master
        left: 10,
        width: 25,
        height: 25,
        image: "/images/btn-back.png",
<<<<<<< HEAD
        id: "__alloyId394"
    });
    $.__views.__alloyId393.add($.__views.__alloyId394);
    closeWindow ? $.addListener($.__views.__alloyId394, "click", closeWindow) : __defers["$.__views.__alloyId394!click!closeWindow"] = true;
    $.__views.__alloyId395 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId395"
    });
    $.__views.__alloyId392.add($.__views.__alloyId395);
=======
        id: "__alloyId364"
    });
    $.__views.__alloyId363.add($.__views.__alloyId364);
    closeWindow ? $.addListener($.__views.__alloyId364, "click", closeWindow) : __defers["$.__views.__alloyId364!click!closeWindow"] = true;
    $.__views.__alloyId365 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId365"
    });
    $.__views.__alloyId362.add($.__views.__alloyId365);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId395.add($.__views.pageTitle);
    $.__views.__alloyId396 = Ti.UI.createView({
=======
    $.__views.__alloyId365.add($.__views.pageTitle);
    $.__views.__alloyId366 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#f0f5f8",
<<<<<<< HEAD
        id: "__alloyId396"
    });
    $.__views.__alloyId391.add($.__views.__alloyId396);
    $.__views.__alloyId397 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId397"
    });
    $.__views.__alloyId396.add($.__views.__alloyId397);
    $.__views.__alloyId398 = Ti.UI.createView({
=======
        id: "__alloyId366"
    });
    $.__views.__alloyId361.add($.__views.__alloyId366);
    $.__views.__alloyId367 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId367"
    });
    $.__views.__alloyId366.add($.__views.__alloyId367);
    $.__views.__alloyId368 = Ti.UI.createView({
>>>>>>> origin/master
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
<<<<<<< HEAD
        id: "__alloyId398"
    });
    $.__views.__alloyId396.add($.__views.__alloyId398);
=======
        id: "__alloyId368"
    });
    $.__views.__alloyId366.add($.__views.__alloyId368);
>>>>>>> origin/master
    $.__views.sub_back = Ti.UI.createImageView({
        left: 10,
        id: "sub_back",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId398.add($.__views.sub_back);
=======
    $.__views.__alloyId368.add($.__views.sub_back);
>>>>>>> origin/master
    $.__views.sub_title = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#2a363a",
        font: {
            fontSize: 14
        },
        text: "SELECT A SPECIALTY",
        id: "sub_title",
        top: 10,
        bottom: 10,
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId398.add($.__views.sub_title);
    $.__views.__alloyId399 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId399"
    });
    $.__views.__alloyId396.add($.__views.__alloyId399);
    var __alloyId400 = [];
    $.__views._specialty_list = Alloy.createController("appointment/_specialty_list", {
        id: "_specialty_list"
    });
    __alloyId400.push($.__views._specialty_list.getViewEx({
=======
    $.__views.__alloyId368.add($.__views.sub_title);
    $.__views.__alloyId369 = Ti.UI.createView({
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId369"
    });
    $.__views.__alloyId366.add($.__views.__alloyId369);
    var __alloyId370 = [];
    $.__views._specialty_list = Alloy.createController("appointment/_specialty_list", {
        id: "_specialty_list"
    });
    __alloyId370.push($.__views._specialty_list.getViewEx({
>>>>>>> origin/master
        recurse: true
    }));
    $.__views._clinic_list = Alloy.createController("appointment/_clinic_list", {
        id: "_clinic_list"
    });
<<<<<<< HEAD
    __alloyId400.push($.__views._clinic_list.getViewEx({
=======
    __alloyId370.push($.__views._clinic_list.getViewEx({
>>>>>>> origin/master
        recurse: true
    }));
    $.__views._available_timeslot = Alloy.createController("appointment/_available_timeslot", {
        id: "_available_timeslot"
    });
<<<<<<< HEAD
    __alloyId400.push($.__views._available_timeslot.getViewEx({
=======
    __alloyId370.push($.__views._available_timeslot.getViewEx({
>>>>>>> origin/master
        recurse: true
    }));
    $.__views._appointment_form = Alloy.createController("appointment/_appointment_form", {
        id: "_appointment_form"
    });
<<<<<<< HEAD
    __alloyId400.push($.__views._appointment_form.getViewEx({
        recurse: true
    }));
    $.__views.inner_box = Ti.UI.createScrollableView({
        views: __alloyId400,
        id: "inner_box",
        scrollingEnabled: false
    });
    $.__views.__alloyId391.add($.__views.inner_box);
=======
    __alloyId370.push($.__views._appointment_form.getViewEx({
        recurse: true
    }));
    $.__views.inner_box = Ti.UI.createScrollableView({
        views: __alloyId370,
        id: "inner_box",
        scrollingEnabled: false
    });
    $.__views.__alloyId361.add($.__views.inner_box);
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var appointment_id = args.id || 0;
    var page_container = [ {
        title: "SELECT A SPECIALTY"
    }, {
        title: "SELECT A DOCTOR"
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
<<<<<<< HEAD
    __defers["$.__views.__alloyId394!click!closeWindow"] && $.addListener($.__views.__alloyId394, "click", closeWindow);
=======
    __defers["$.__views.__alloyId364!click!closeWindow"] && $.addListener($.__views.__alloyId364, "click", closeWindow);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;