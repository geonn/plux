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
        var data = usersModel.getClaimDetailBySeries({
            serial: arg_serial
        });
        console.log(data);
        $.tv.appendRow(createTableViewRow("Clinic Name", data.clinicname));
        $.tv.appendRow(createTableViewRow("Patient Name", data.name));
        $.tv.appendRow(createTableViewRow("Date Visit", data.visitdate));
        $.tv.appendRow(createTableViewRow("Category", data.category));
        $.tv.appendRow(createTableViewRow("MC Days", data.mcdays));
        $.tv.appendRow(createTableViewRow("Amount", data.amount));
        $.tv.appendRow(createTableViewRow("Diagnosis", data.diagnosis));
        $.tv.appendRow(createTableViewRow("Consultation", data.consultation_amt));
        $.tv.appendRow(createTableViewRow("Medication", data.medication_amt));
        $.tv.appendRow(createTableViewRow("Injection", data.injection_amt));
        $.tv.appendRow(createTableViewRow("Labtest", data.labtest_amt));
        $.tv.appendRow(createTableViewRow("X-Ray", data.xray_amt));
        $.tv.appendRow(createTableViewRow("Surgical", data.surgical_amt));
        $.tv.appendRow(createTableViewRow("Extraction", data.extraction_amt));
        $.tv.appendRow(createTableViewRow("Fillings", data.fillings_amt));
        $.tv.appendRow(createTableViewRow("Scaling", data.scaling_amt));
        $.tv.appendRow(createTableViewRow("Others", data.others_amt));
        $.tv.appendRow(createTableViewRow("Bps", data.bps));
        $.tv.appendRow(createTableViewRow("Bpd", data.bpd));
        $.tv.appendRow(createTableViewRow("Pulse", data.pulse));
    }
    function createTableViewRow(text, value) {
        value = "number" != typeof value ? value.replace(/^\s+|\s+$/g, "") : value;
        text = "number" != typeof text ? text.replace(/^\s+|\s+$/g, "") : text;
        var row = $.UI.create("TableViewRow", {
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL
        });
        var view = $.UI.create("View", {
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL,
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
        });
        var label_text = $.UI.create("Label", {
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            left: 0,
            text: text
        });
        var label_value = $.UI.create("Label", {
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            right: 0,
            text: value
        });
        view.add(label_text);
        view.add(label_value);
        row.add(view);
        return row;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/claimDetail";
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
    $.__views.claimDetail = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "My Claim History",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "claimDetail"
    });
    $.__views.claimDetail && $.addTopLevelView($.__views.claimDetail);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.claimDetail.add($.__views.main);
    $.__views.tv = Ti.UI.createTableView({
        id: "tv"
    });
    $.__views.main.add($.__views.tv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var arg_serial = "undefined" != typeof args.serial ? args.serial : 0;
    API.claimDetailBySeries({
        serial: arg_serial
    });
    var usersModel = Alloy.createCollection("claim_detail");
    Ti.UI.addEventListener("load_claim_detail", init);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;