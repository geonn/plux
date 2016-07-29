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
        "" != totalAmount && section.add(createTableViewRow("Total Amount", "RM" + data.amount.toFixed(2)));
        console.log(data);
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
    function lightBox() {
        var img_path = "https://tslip.aspmedic.com/" + appcode + ".png";
        console.log(img_path);
        common.lightbox({
            img_path: img_path
        }, $.claimDetail);
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
<<<<<<< HEAD
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Claim Detail",
        id: "win",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
=======
    $.__views.claimDetail = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Claim Detail",
        id: "claimDetail",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.claimDetail && $.addTopLevelView($.__views.claimDetail);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        zIndex: 12,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.win.add($.__views.loadingBar);
=======
    $.__views.claimDetail.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.win.add($.__views.main);
=======
    $.__views.claimDetail.add($.__views.main);
>>>>>>> origin/master
    $.__views.__alloyId395 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId395"
    });
    $.__views.main.add($.__views.__alloyId395);
    $.__views.__alloyId396 = Ti.UI.createView({
        left: 0,
        width: "10%",
        id: "__alloyId396"
    });
    $.__views.__alloyId395.add($.__views.__alloyId396);
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId396.add($.__views.btnBack);
    $.__views.__alloyId397 = Ti.UI.createView({
        width: "70%",
        id: "__alloyId397"
    });
    $.__views.__alloyId395.add($.__views.__alloyId397);
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
    $.__views.__alloyId397.add($.__views.pageTitle);
    $.__views.__alloyId398 = Ti.UI.createView({
        left: 0,
        width: "auto",
        id: "__alloyId398"
    });
    $.__views.__alloyId395.add($.__views.__alloyId398);
    lightBox ? $.addListener($.__views.__alloyId398, "click", lightBox) : __defers["$.__views.__alloyId398!click!lightBox"] = true;
    $.__views.recepit = Ti.UI.createLabel({
        width: "auto",
        height: Ti.UI.SIZE,
        color: "#606060",
        text: "Receipt",
        id: "recepit"
    });
    $.__views.__alloyId398.add($.__views.recepit);
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
        nav.closeWindow($.claimDetail);
    });
<<<<<<< HEAD
    $.win.addEventListener("close", function() {
=======
    $.claimDetail.addEventListener("close", function() {
>>>>>>> origin/master
        Ti.App.removeEventListener("load_claim_detail", init);
    });
    __defers["$.__views.__alloyId398!click!lightBox"] && $.addListener($.__views.__alloyId398, "click", lightBox);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;