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
    }
    function render_conversation_list() {
        $.conversation_list.removeAllChildren();
        MessageList = MessageModel.getDataGroupDrid();
        console.log(MessageList);
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
        nav.navigateWithArgs("askDoctor/forms");
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
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "askDoctor";
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
        title: "Ask Doctor",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
<<<<<<< HEAD
    $.__views.__alloyId106 = Ti.UI.createView({
        id: "__alloyId106"
=======
    $.__views.__alloyId59 = Ti.UI.createView({
        id: "__alloyId59"
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
    $.__views.__alloyId106.add($.__views.newRecord);
    navFindDoctor ? $.addListener($.__views.newRecord, "click", navFindDoctor) : __defers["$.__views.newRecord!click!navFindDoctor"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId106;
=======
    $.__views.__alloyId59.add($.__views.newRecord);
    navFindDoctor ? $.addListener($.__views.newRecord, "click", navFindDoctor) : __defers["$.__views.newRecord!click!navFindDoctor"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId59;
>>>>>>> origin/master
    $.__views.aView = Ti.UI.createView({
        id: "aView",
        height: Ti.UI.SIZE,
        top: 0,
        layout: "vertical"
    });
    $.__views.win.add($.__views.aView);
<<<<<<< HEAD
    $.__views.__alloyId107 = Ti.UI.createView({
=======
    $.__views.__alloyId60 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId107"
    });
    $.__views.aView.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId108"
    });
    $.__views.__alloyId107.add($.__views.__alloyId108);
=======
        id: "__alloyId60"
    });
    $.__views.aView.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId108.add($.__views.btnBack);
    $.__views.__alloyId109 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId109"
    });
    $.__views.__alloyId107.add($.__views.__alloyId109);
=======
    $.__views.__alloyId61.add($.__views.btnBack);
    $.__views.__alloyId62 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId62"
    });
    $.__views.__alloyId60.add($.__views.__alloyId62);
>>>>>>> origin/master
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
<<<<<<< HEAD
    $.__views.__alloyId109.add($.__views.pageTitle);
    $.__views.__alloyId110 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId110"
    });
    $.__views.__alloyId107.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createImageView({
        width: 25,
        height: 20,
        image: "/images/add.png",
        id: "__alloyId111"
    });
    $.__views.__alloyId110.add($.__views.__alloyId111);
    navFindDoctor ? $.addListener($.__views.__alloyId111, "click", navFindDoctor) : __defers["$.__views.__alloyId111!click!navFindDoctor"] = true;
=======
    $.__views.__alloyId62.add($.__views.pageTitle);
    $.__views.__alloyId63 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId63"
    });
    $.__views.__alloyId60.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createImageView({
        width: 25,
        height: 20,
        image: "/images/add.png",
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    navFindDoctor ? $.addListener($.__views.__alloyId64, "click", navFindDoctor) : __defers["$.__views.__alloyId64!click!navFindDoctor"] = true;
>>>>>>> origin/master
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
<<<<<<< HEAD
    __defers["$.__views.__alloyId111!click!navFindDoctor"] && $.addListener($.__views.__alloyId111, "click", navFindDoctor);
=======
    __defers["$.__views.__alloyId64!click!navFindDoctor"] && $.addListener($.__views.__alloyId64, "click", navFindDoctor);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;