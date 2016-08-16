function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadingViewFinish() {
        console.log("anyone call you?");
        var isShowIntro = Ti.App.Properties.getString("isShowIntro") || "";
        var isSignup2 = Ti.App.Properties.getString("signup2");
        if ("" != isShowIntro) if ("" == u_id) if ("yes" == isSignup2) {
            var win = Alloy.createController("asp/signup2").getView();
            win.open();
        } else {
            console.log("login");
            var win = Alloy.createController("login").getView();
            win.open();
        } else if ("yes" == isSignup2) {
            var win = Alloy.createController("asp/signup2").getView();
            win.open();
        } else {
            console.log("home");
            var win = Alloy.createController("home").getView();
            win.open();
        } else {
            console.log("firsttime");
            $.index.win.open();
        }
        loadingView = null;
    }
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
    var loadingView;
    var appointmentModel = Alloy.createCollection("appointment");
    appointmentModel.addColumn("doctor_panel_id", "TEXT");
    appointmentModel.addColumn("clinic_name", "TEXT");
    appointmentModel.addColumn("doctor_name", "TEXT");
    appointmentModel.addColumn("specialty_name", "TEXT");
<<<<<<< HEAD
    var medicalRecordsModel = Alloy.createCollection("medicalRecords");
    medicalRecordsModel.addColumn("server_id", "TEXT");
=======
    var checker = Alloy.createCollection("updateChecker");
    checker.addColumn("u_id", "INTEGER");
>>>>>>> origin/master
    var medicalAttachmentModel = Alloy.createCollection("medicalAttachment");
    medicalAttachmentModel.addColumn("img_path", "TEXT");
    medicalAttachmentModel.addColumn("server_id", "TEXT");
    var notificationModel = Alloy.createCollection("notification");
    notificationModel.addColumn("isRead", "TEXT");
    notificationModel.addColumn("status", "TEXT");
    API.callByPost({
        url: "dateNow"
    }, function(responseText) {
        var res = JSON.parse(responseText);
        "error" != res.status && common.sync_time(res.data);
        loadingView = Alloy.createController("loader");
        loadingView.getView().open();
        loadingView.start();
    });
    Ti.App.addEventListener("app:loadingViewFinish", loadingViewFinish);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;