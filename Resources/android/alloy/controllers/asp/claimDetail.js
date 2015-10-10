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
        console.log("init");
        var data = usersModel.getClaimDetailBySeries({
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
        "" != totalAmount && section.add(createTableViewRow("Total Amount", "RM" + data.amount.toFixed(2)));
        section.add(createTableViewRow("Consultation", "RM" + data.consultation_amt.toFixed(2)));
        section.add(createTableViewRow("Medication", "RM" + data.medication_amt.toFixed(2), data.medication));
        section.add(createTableViewRow("Injection", "RM" + data.injection_amt.toFixed(2), data.injection));
        section.add(createTableViewRow("Lab Test", "RM" + data.labtest_amt.toFixed(2), data.labtest));
        section.add(createTableViewRow("X-Ray", "RM" + data.xray_amt.toFixed(2), data.xray));
        section.add(createTableViewRow("Surgical", "RM" + data.surgical_amt.toFixed(2), data.surgical));
        section.add(createTableViewRow("Extraction", "RM" + data.extraction_amt.toFixed(2)));
        section.add(createTableViewRow("Fillings", "RM" + data.fillings_amt.toFixed(2)));
        section.add(createTableViewRow("Scaling", "RM" + data.scaling_amt.toFixed(2)));
        section.add(createTableViewRow("Others", "RM" + data.others_amt.toFixed(2)));
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
    $.__views.claimDetail = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Claim Detail",
        id: "claimDetail",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.claimDetail && $.addTopLevelView($.__views.claimDetail);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: "120",
        zIndex: "12",
        width: "120",
        borderRadius: "15",
        backgroundColor: "#2E2E2E"
    });
    $.__views.claimDetail.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId214 = Ti.UI.createLabel({
=======
    $.__views.__alloyId220 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        top: "5",
        bottom: "5",
        text: "Loading",
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId214"
    });
    $.__views.loadingBar.add($.__views.__alloyId214);
=======
        id: "__alloyId220"
    });
    $.__views.loadingBar.add($.__views.__alloyId220);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
    $.__views.claimDetail.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId215 = Ti.UI.createView({
=======
    $.__views.__alloyId221 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId215"
    });
    $.__views.main.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId216"
    });
    $.__views.__alloyId215.add($.__views.__alloyId216);
=======
        id: "__alloyId221"
    });
    $.__views.main.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createView({
        left: "0",
        width: "10%",
        id: "__alloyId222"
    });
    $.__views.__alloyId221.add($.__views.__alloyId222);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId216.add($.__views.btnBack);
    $.__views.__alloyId217 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId217"
    });
    $.__views.__alloyId215.add($.__views.__alloyId217);
=======
    $.__views.__alloyId222.add($.__views.btnBack);
    $.__views.__alloyId223 = Ti.UI.createView({
        width: "90%",
        id: "__alloyId223"
    });
    $.__views.__alloyId221.add($.__views.__alloyId223);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Claim Detail",
        id: "pageTitle",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId217.add($.__views.pageTitle);
=======
    $.__views.__alloyId223.add($.__views.pageTitle);
>>>>>>> origin/master
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
    common.construct($);
    common.showLoading();
    Ti.App.addEventListener("load_claim_detail", init);
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.claimDetail);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;