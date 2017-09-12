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
        API.syncAppointmentData(savedAppointment);
    }
    function savedAppointment(ex) {
        var result = ex.param;
        if ("error" == result.status) {
            common.createAlert("Error", result.data);
            return false;
        }
        appointmentModel.saveArray(result.data);
        render_appointment_list();
    }
    function render_appointment_list() {
        $.appointment_list.removeAllChildren();
        appointmentList = appointmentModel.getAppointmentList({
            u_id: Ti.App.Properties.getString("u_id")
        });
        if (appointmentList.length < 1) {
            var view_norecord = $.UI.create("View", {
                top: 10,
                classes: [ "wsize", "hsize", "box", "rounded" ]
            });
            var label_no_record = $.UI.create("Label", {
                classes: [ "wsize", "hsize", "padding" ],
                text: "No appointment at this moment."
            });
            view_norecord.add(label_no_record);
            $.appointment_list.add(view_norecord);
        } else {
            var all_date = _.sortBy(appointmentList, "start_date");
            all_date = all_date.reverse();
            for (var i = 0; i < all_date.length; i++) {
                var datetime = all_date[i].start_date.split(" ");
                check_update_currentdate(datetime[0]);
                $.appointment_list.add(add_appointment_row(all_date[i]));
            }
        }
        loading.finish();
    }
    function new_appointment() {
        nav.navigateWithArgs("appointment/index", {
            id: ""
        });
    }
    function add_appointment_row(entry) {
        var datetime = entry.start_date.split(" ");
        var time = datetime[1];
        var view_row = $.UI.create("View", {
            classes: [ "wfill", "box", "horz", "rounded" ],
            height: 80,
            appointment_id: entry.id,
            doctor_panel_id: entry.doctor_panel_id,
            status: entry.status,
            view_row: 1,
            top: 3
        });
        var view_date_status_box = $.UI.create("View", {
            classes: [ "hfill", "vert" ],
            width: 90,
            backgroundColor: indicator_color[entry.status]
        });
        var label_time = $.UI.create("Label", {
            classes: [ "wfill", "hsize", "padding" ],
            textAlign: "center",
            color: "#ffffff",
            bottom: 0,
            minimumFontSize: 12,
            text: convert_ampm(time)
        });
        var label_status = $.UI.create("Label", {
            classes: [ "wfill", "hsize", "padding" ],
            textAlign: "center",
            top: 0,
            color: "#ffffff",
            font: {
                fontSize: 12
            },
            text: status_text[entry.status]
        });
        view_date_status_box.add(label_time);
        view_date_status_box.add(label_status);
        var view_clinic_specialty_box = $.UI.create("View", {
            classes: [ "hfill", "vert" ],
            width: "auto"
        });
        var label_clinic = $.UI.create("Label", {
            classes: [ "wfill", "hsize", "padding" ],
            bottom: 0,
            color: "#000000",
            font: {
                fontSize: 12
            },
            text: entry.clinic_name
        });
        var label_doctor_name = $.UI.create("Label", {
            classes: [ "wfill", "hsize", "padding" ],
            bottom: 0,
            top: 0,
            color: "#000000",
            font: {
                fontSize: 12
            },
            text: entry.doctor_name
        });
        var label_specialty = $.UI.create("Label", {
            classes: [ "wfill", "hsize", "padding" ],
            bottom: 0,
            top: 0,
            font: {
                fontSize: 12
            },
            text: entry.specialty_name
        });
        view_clinic_specialty_box.add(label_clinic);
        view_clinic_specialty_box.add(label_doctor_name);
        view_clinic_specialty_box.add(label_specialty);
        view_row.add(view_date_status_box);
        view_row.add(view_clinic_specialty_box);
        view_row.addEventListener("click", create_dialog_box);
        return view_row;
    }
    function create_dialog_box(ex) {
        var id = parent({
            name: "appointment_id"
        }, ex.source);
        var doctor_panel_id = parent({
            name: "doctor_panel_id"
        }, ex.source);
        var status = parent({
            name: "status"
        }, ex.source);
        var buttonName = [], message = "";
        switch (status) {
          case 1:
          case 2:
            buttonName = [ "Cancel Appointment", "Cancel" ];
            message = "Are you sure want to cancel this appointment?";
            break;

          case 4:
            buttonName = [ "Accept", "Cancel" ];
            message = "Please confirm if this appointment time is convenient for you.";
            break;

          case 3:
            return;
        }
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: buttonName,
            message: message,
            title: "Actions"
        });
        dialog.addEventListener("click", function(e) {
            if (0 === e.index) if (4 == status) {
                loading.start();
                API.callByPost({
                    url: "suggestedAppointmentUrl",
                    params: {
                        id: id
                    }
                }, function(responseText) {
                    var model = Alloy.createCollection("appointment");
                    var res = JSON.parse(responseText);
                    var arr = res.data || null;
                    model.saveArray(arr);
                    model.updateSuggestedAppointmentStatus(doctor_panel_id);
                    setTimeout(render_appointment_list, 1e3);
                    loading.finish();
                });
            } else if (1 == status || 2 == status) {
                loading.start();
                API.callByPost({
                    url: "addAppointmentUrl",
                    params: {
                        id: id,
                        status: 5
                    }
                }, function(responseText) {
                    var model = Alloy.createCollection("appointment");
                    var res = JSON.parse(responseText);
                    res.data || null;
                    model.updateAppointmentStatus(id, 5);
                    render_appointment_list();
                    loading.finish();
                });
            }
        });
        dialog.show();
    }
    function check_update_currentdate(date) {
        if (current_date != date) {
            current_date = date;
            var view_date = $.UI.create("View", {
                classes: [ "wsize", "hsize" ],
                top: 10
            });
            var d = new Date();
            var inputDate = new Date(current_date);
            var bool = d.toDateString() == inputDate.toDateString();
            var dateText = monthFormat(current_date);
            true === bool && (dateText = "Today");
            var label_date = $.UI.create("Label", {
                classes: [ "wsize", "hsize", "padding", "themeColor" ],
                text: dateText
            });
            view_date.add(label_date);
            $.appointment_list.add(view_date);
        }
    }
    function convert_ampm(timeStamp) {
        var time = timeStamp.split(":");
        var ampm = "am";
        if (time[0] > 12) {
            ampm = "pm";
            time[0] = time[0] - 12;
        }
        return time[0] + ":" + time[1] + " " + ampm;
    }
    function init_render() {
        loading.start();
        render_appointment_list();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointment";
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
        title: "Appointment",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
<<<<<<< HEAD
    $.__views.__alloyId95 = Ti.UI.createView({
        id: "__alloyId95"
=======
    $.__views.__alloyId48 = Ti.UI.createView({
        id: "__alloyId48"
>>>>>>> origin/master
    });
    $.__views.newRecord = Ti.UI.createImageView({
        left: 10,
        id: "newRecord",
        width: 25,
        height: 20,
        image: "/images/add.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId95.add($.__views.newRecord);
    new_appointment ? $.addListener($.__views.newRecord, "click", new_appointment) : __defers["$.__views.newRecord!click!new_appointment"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId95;
    $.__views.__alloyId96 = Ti.UI.createView({
        id: "__alloyId96"
    });
    $.__views.win.add($.__views.__alloyId96);
=======
    $.__views.__alloyId48.add($.__views.newRecord);
    new_appointment ? $.addListener($.__views.newRecord, "click", new_appointment) : __defers["$.__views.newRecord!click!new_appointment"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId48;
    $.__views.__alloyId49 = Ti.UI.createView({
        id: "__alloyId49"
    });
    $.__views.win.add($.__views.__alloyId49);
>>>>>>> origin/master
    $.__views.aView = Ti.UI.createView({
        id: "aView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId96.add($.__views.aView);
    $.__views.__alloyId97 = Ti.UI.createView({
=======
    $.__views.__alloyId49.add($.__views.aView);
    $.__views.__alloyId50 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId97"
    });
    $.__views.aView.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId98"
    });
    $.__views.__alloyId97.add($.__views.__alloyId98);
=======
        id: "__alloyId50"
    });
    $.__views.aView.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId51"
    });
    $.__views.__alloyId50.add($.__views.__alloyId51);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId98.add($.__views.btnBack);
    $.__views.__alloyId99 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId99"
    });
    $.__views.__alloyId97.add($.__views.__alloyId99);
=======
    $.__views.__alloyId51.add($.__views.btnBack);
    $.__views.__alloyId52 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId52"
    });
    $.__views.__alloyId50.add($.__views.__alloyId52);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Appointment",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId99.add($.__views.pageTitle);
    $.__views.__alloyId100 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId100"
    });
    $.__views.__alloyId97.add($.__views.__alloyId100);
=======
    $.__views.__alloyId52.add($.__views.pageTitle);
    $.__views.__alloyId53 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId53"
    });
    $.__views.__alloyId50.add($.__views.__alloyId53);
>>>>>>> origin/master
    $.__views.newRecord = Ti.UI.createImageView({
        id: "newRecord",
        width: 25,
        height: 20,
        image: "/images/add.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId100.add($.__views.newRecord);
=======
    $.__views.__alloyId53.add($.__views.newRecord);
>>>>>>> origin/master
    new_appointment ? $.addListener($.__views.newRecord, "click", new_appointment) : __defers["$.__views.newRecord!click!new_appointment"] = true;
    $.__views.appointment_list = Ti.UI.createScrollView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        id: "appointment_list"
    });
    $.__views.aView.add($.__views.appointment_list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var appointmentModel = Alloy.createCollection("appointment");
    Alloy.createCollection("panelList");
    var appointmentList;
    var indicator_color = [ "#ffffff", "#fccd03", "#CE1D1C", "#afdb00", "#3f99f9", "black" ];
    var status_text = [ "", "Pending", "Rejected", "Accepted", "Suggestion", "Deleted" ];
    var current_date = "";
    var loading = Alloy.createController("loading");
    Ti.App.Properties.setString("currentAppointmentWindow", "1");
    init();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    Ti.App.addEventListener("displayRecords", render_appointment_list);
    Ti.App.addEventListener("appointment:refresh", init_render);
    $.win.addEventListener("close", function() {
        $.destroy();
        Ti.App.removeEventListener("displayRecords", render_appointment_list);
        Ti.App.removeEventListener("appointment:refresh", init_render);
        Ti.App.Properties.setString("currentAppointmentWindow", "");
    });
    __defers["$.__views.newRecord!click!new_appointment"] && $.addListener($.__views.newRecord, "click", new_appointment);
    __defers["$.__views.newRecord!click!new_appointment"] && $.addListener($.__views.newRecord, "click", new_appointment);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;