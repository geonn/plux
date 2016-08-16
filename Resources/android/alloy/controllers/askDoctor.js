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
        render_conversation_list();
    }
    function savedAppointment(ex) {
        var result = ex.param;
        if ("error" == result.status) {
            common.createAlert("Error", result.data);
            return false;
        }
        MessageModel.saveArray(result.data);
        render_conversation_list();
    }
    function render_conversation_list() {
        $.conversation_list.removeAllChildren();
        MessageList = MessageModel.getDataGroupDrid();
        if (MessageList.length < 1) {
            var view_norecord = $.UI.create("View", {
                classes: [ "wsize", "hsize", "box", "rounded" ]
            });
            var label_no_record = $.UI.create("Label", {
                classes: [ "wsize", "hsize", "padding" ],
                text: "No  at this moment."
            });
            view_norecord.add(label_no_record);
        } else for (var i = 0; i < MessageList.length; i++) $.conversation_list.add(add_appointment_row(MessageList[i]));
        var view_find_doctor = $.UI.create("View", {
            classes: [ "wfill", "vert", "hsize" ]
        });
        var view_line = $.UI.create("View", {
            classes: [ "line" ],
            top: 10
        });
        var button_find_doctor = $.UI.create("Button", {
            classes: [ "button" ],
            title: "Find Doctor"
        });
        var label_status = $.UI.create("Label", {
            classes: [ "wfill", "hsize", "padding" ],
            textAlign: "center",
            font: {
                fontSize: 12
            },
            text: "Click here to find out what specialist that you want to chat."
        });
        view_find_doctor.addEventListener("click", navFindDoctor);
        view_find_doctor.add(view_line);
        view_find_doctor.add(button_find_doctor);
        view_find_doctor.add(label_status);
        $.conversation_list.add(view_find_doctor);
        loading.finish();
    }
    function navToConversation(e) {
        var dr_id = parent({
            name: "dr_id"
        }, e.source);
        var room_id = parent({
            name: "room_id"
        }, e.source);
        nav.navigateWithArgs("conversation", {
            dr_id: dr_id,
            room_id: room_id
        });
    }
    function navFindDoctor() {
        nav.navigateWithArgs("askDoctor/index", {
            id: ""
        });
    }
    function add_appointment_row(entry) {
        var view_row = $.UI.create("View", {
            classes: [ "wfill", "hsize", "box", "horz", "rounded" ],
            room_id: entry.room_id,
            dr_id: entry.dr_id,
            view_row: 1,
            top: 3
        });
        var view_clinic_specialty_box = $.UI.create("View", {
            classes: [ "hsize", "vert" ],
            width: "auto"
        });
        var label_clinic = $.UI.create("Label", {
            classes: [ "wfill", "hsize", "padding", "h4", "bold" ],
            bottom: 0,
            text: entry.doctor_name
        });
        var label_specialty = $.UI.create("Label", {
            classes: [ "wfill", "hsize", "padding", "h4" ],
            top: 0,
            text: entry.doctor_specialty
        });
        view_clinic_specialty_box.add(label_clinic);
        view_clinic_specialty_box.add(label_specialty);
        view_row.add(view_clinic_specialty_box);
        view_row.addEventListener("click", navToConversation);
        return view_row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "askDoctor";
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
        title: "Ask Doctor",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId95 = Ti.UI.createView({
        id: "__alloyId95"
    });
    $.__views.newRecord = Ti.UI.createImageView({
        left: 10,
        id: "newRecord",
        width: 25,
        height: 20,
        image: "/images/add.png"
    });
    $.__views.__alloyId95.add($.__views.newRecord);
    navFindDoctor ? $.addListener($.__views.newRecord, "click", navFindDoctor) : __defers["$.__views.newRecord!click!navFindDoctor"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId95;
    $.__views.aView = Ti.UI.createView({
        id: "aView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical"
    });
    $.__views.win.add($.__views.aView);
    $.__views.__alloyId96 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId96"
    });
    $.__views.aView.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId97"
    });
    $.__views.__alloyId96.add($.__views.__alloyId97);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId97.add($.__views.btnBack);
    $.__views.__alloyId98 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId98"
    });
    $.__views.__alloyId96.add($.__views.__alloyId98);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Ask Doctor",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId98.add($.__views.pageTitle);
    $.__views.__alloyId99 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId99"
    });
    $.__views.__alloyId96.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createImageView({
        width: 25,
        height: 20,
        image: "/images/add.png",
        id: "__alloyId100"
    });
    $.__views.__alloyId99.add($.__views.__alloyId100);
    navFindDoctor ? $.addListener($.__views.__alloyId100, "click", navFindDoctor) : __defers["$.__views.__alloyId100!click!navFindDoctor"] = true;
    $.__views.conversation_list = Ti.UI.createScrollView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        id: "conversation_list"
    });
    $.__views.aView.add($.__views.conversation_list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var MessageModel = Alloy.createCollection("message");
    var MessageList;
    var loading = Alloy.createController("loading");
    init();
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    Ti.App.addEventListener("displayRecords", render_conversation_list);
    $.win.addEventListener("close", function() {
        $.destroy();
        Ti.App.removeEventListener("displayRecords", render_conversation_list);
    });
    __defers["$.__views.newRecord!click!navFindDoctor"] && $.addListener($.__views.newRecord, "click", navFindDoctor);
    __defers["$.__views.__alloyId100!click!navFindDoctor"] && $.addListener($.__views.__alloyId100, "click", navFindDoctor);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;