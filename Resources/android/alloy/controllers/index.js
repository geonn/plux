function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.index = Alloy.createController("slideshow", {
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var u_id = Ti.App.Properties.getString("u_id") || "";
    var appointmentModel = Alloy.createCollection("appointment");
    appointmentModel.addColumn("doctor_panel_id", "TEXT");
    appointmentModel.addColumn("clinic_name", "TEXT");
    appointmentModel.addColumn("doctor_name", "TEXT");
    appointmentModel.addColumn("specialty_name", "TEXT");
    var medicalRecordsModel = Alloy.createCollection("medicalRecords");
    medicalRecordsModel.addColumn("server_id", "TEXT");
    var medicalAttachmentModel = Alloy.createCollection("medicalAttachment");
    medicalAttachmentModel.addColumn("img_path", "TEXT");
    medicalAttachmentModel.addColumn("server_id", "TEXT");
    var notificationModel = Alloy.createCollection("notification");
    notificationModel.addColumn("isRead", "TEXT");
    notificationModel.addColumn("status", "TEXT");
    API.loadCategoryList();
    API.loadNewsFeed();
    API.loadLeaflet();
    API.loadClinicList();
    API.loadDoctorPanel();
    API.getDoctorList();
    var isShowIntro = Ti.App.Properties.getString("isShowIntro") || "";
    if ("" != isShowIntro) {
        var win = Alloy.createController("home").getView();
        win.open();
        "" == u_id && nav.navigateWithArgs("login", {});
    } else $.index.win.open();
    var AppVersionControl = require("AppVersionControl");
    AppVersionControl.checkAndUpdate();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;