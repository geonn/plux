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
        var data = model.getClaimDetailBySeries({
            serial: arg_serial
        });
        $.tv.appendRow(createTableViewRow("Clinic Name", data.clinicname));
        $.tv.appendRow(createTableViewRow("Date Visit", data.visitdate));
        $.tv.appendRow(createTableViewRow("Category", data.category));
        $.tv.appendRow(createTableViewRow("MC Days", data.mcdays));
        $.tv.appendRow(createTableViewRow("Diagnosis", data.diagnosis));
        var section = Ti.UI.createTableViewSection({
            headerTitle: "Amount"
        });
        var totalAmount = "undefined" != typeof data.amount ? data.amount : "";
        appcode = data.appcode;
        "" != totalAmount && section.add(createTableViewRow("Total Amount", "RM" + data.amount));
        section.add(createTableViewRow("Consultation", "RM" + ("null" == data.consultation_amt || data.consultation_amt <= 0 ? "0" : data.consultation_amt)));
        section.add(createTableViewRow("Medication", "RM" + ("null" == data.medication_amt || data.medication_amt <= 0 ? "0" : data.medication_amt), data.medication));
        section.add(createTableViewRow("Injection", "RM" + ("null" == data.injection_amt || data.injection_amt <= 0 ? "0" : data.injection_amt), data.injection));
        section.add(createTableViewRow("Lab Test", "RM" + ("null" == data.labtest_amt || data.labtest_amt <= 0 ? "0" : data.labtest_amt), data.labtest));
        section.add(createTableViewRow("X-Ray", "RM" + ("null" == data.xray_amt || data.xray_amt <= 0 ? "0" : data.xray_amt), data.xray));
        section.add(createTableViewRow("Surgical", "RM" + ("null" == data.surgical_amt || data.surgical_amt <= 0 ? "0" : data.surgical_amt), data.surgical));
        section.add(createTableViewRow("Extraction", "RM" + ("null" == data.extraction_amt || data.extraction_amt <= 0 ? "0" : data.extraction_amt)));
        section.add(createTableViewRow("Fillings", "RM" + ("null" == data.fillings_amt || data.fillings_amt <= 0 ? "0" : data.fillings_amt)));
        section.add(createTableViewRow("Scaling", "RM" + ("null" == data.scaling_amt || data.scaling_amt <= 0 ? "0" : data.scaling_amt)));
        section.add(createTableViewRow("Others", "RM" + ("null" == data.others_amt || data.others_amt <= 0 ? "0" : data.others_amt)));
        section.add(createTableViewRow("Bps", data.bps));
        section.add(createTableViewRow("Bpd", data.bpd));
        section.add(createTableViewRow("Pulse", data.pulse));
        $.tv.appendSection(section);
        common.hideLoading();
    }
    function createTableViewRow(text, value, dialog) {
        "" != text && (text = "number" != typeof text ? text.replace(/^\s+|\s+$/g, "") : text);
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
            classes: [ "themeColor" ],
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
        dialog && row.addEventListener("click", function() {
            var dialogs = Ti.UI.createAlertDialog({
                message: dialog,
                ok: "Ok",
                title: text
            });
            dialogs.show();
        });
        return row;
    }
    function lightBox() {
        var img_path = "https://tslip.aspmedic.com/" + appcode + ".png";
        console.log(img_path);
        common.lightbox({
            img_path: img_path
        }, $.win);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/claimDetail";
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
        title: "Claim Detail",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        zIndex: 12,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.win.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.win.add($.__views.main);
    $.__views.__alloyId438 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId438"
    });
    $.__views.main.add($.__views.__alloyId438);
    $.__views.__alloyId439 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId439"
    });
    $.__views.__alloyId438.add($.__views.__alloyId439);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId439.add($.__views.btnBack);
    $.__views.__alloyId440 = Ti.UI.createView({
        width: "70%",
        id: "__alloyId440"
    });
    $.__views.__alloyId438.add($.__views.__alloyId440);
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Claim Detail",
        id: "pageTitle",
        textAlign: "center"
    });
    $.__views.__alloyId440.add($.__views.pageTitle);
    $.__views.__alloyId441 = Ti.UI.createView({
        left: 0,
        width: "auto",
        id: "__alloyId441"
    });
    $.__views.__alloyId438.add($.__views.__alloyId441);
    lightBox ? $.addListener($.__views.__alloyId441, "click", lightBox) : __defers["$.__views.__alloyId441!click!lightBox"] = true;
    $.__views.recepit = Ti.UI.createLabel({
        width: "auto",
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Receipt",
        id: "recepit"
    });
    $.__views.__alloyId441.add($.__views.recepit);
    $.__views.tv = Ti.UI.createTableView({
        id: "tv"
    });
    $.__views.main.add($.__views.tv);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var arg_serial = "undefined" != typeof args.serial ? args.serial : 0;
    "T" != args.appcode.charAt(0) && $.recepit.hide();
    API.claimDetailBySeries({
        serial: arg_serial
    });
    var model = Alloy.createCollection("claim_detail");
    var appcode = "";
    common.construct($);
    common.showLoading();
    Ti.App.addEventListener("load_claim_detail", init);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.win);
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("load_claim_detail", init);
    });
    __defers["$.__views.__alloyId441!click!lightBox"] && $.addListener($.__views.__alloyId441, "click", lightBox);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;