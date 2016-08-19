function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function render_doctor_list() {
        $.doctorContainer.removeAllChildren();
        var docTable = Ti.UI.createTableView();
        var data = [];
        if (listing.length < 1) docTable.setData(common.noRecord()); else {
            listing.forEach(function(entry) {
                console.log(entry.id);
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: Ti.UI.SIZE,
                    backgroundSelectedColor: "#ECFFF9"
                });
                var tblRowView = Ti.UI.createView({
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL
                });
                var tblView = Ti.UI.createView({
                    layout: "vertical",
                    height: Ti.UI.SIZE,
                    width: "auto"
                });
                var docName = $.UI.create("Label", {
                    classes: [ "medium_font", "wfill", "hsize", "themeColor" ],
                    text: entry.clinic_id,
                    textAlign: "left",
                    top: 5,
                    left: 15
                });
                var docSpecialty = $.UI.create("Label", {
                    classes: [ "small_font", "wfill", "hsize" ],
                    text: entry.doctor_id,
                    color: "#848484",
                    textAlign: "left",
                    left: 15
                });
                var docContact = $.UI.create("Label", {
                    classes: [ "small_font", "wfill", "hsize" ],
                    text: "Tel : " + entry.id,
                    color: "#848484",
                    textAlign: "left",
                    bottom: 5,
                    left: 15
                });
                tblView.add(docName);
                tblView.add(docSpecialty);
                tblView.add(docContact);
                tblRowView.add(tblView);
                addClinicAction(tblRowView);
                row.add(tblRowView);
                data.push(row);
            });
            docTable.setData(data);
        }
        $.doctorContainer.add(docTable);
    }
    function addClinicAction(vw) {
        vw.addEventListener("click", function(e) {
            var elbl = JSON.stringify(e.source);
            var res = JSON.parse(elbl);
            Ti.App.fireEvent("selectClinic", {
                clinicName: res.clinicName,
                clinicId: res.source,
                specialty: res.specialty
            });
            Ti.App.fireEvent("appointment_index:moveNext");
        });
    }
    function refresh() {
        var checker = Alloy.createCollection("updateChecker");
        var isUpdate = checker.getCheckerById(4, clinicId);
        var last_update = isUpdate.updated || "";
        console.log(clinicId + " clinic id");
        API.callByPost({
            url: "getDoctorByPanel",
            params: {
                last_updated: last_update,
                clinic_id: clinicId
            }
        }, function(responseText) {
            var model = Alloy.createCollection("doctor_panel");
            var res = JSON.parse(responseText);
            var arr = res.data || null;
            model.saveArray(arr);
            checker.updateModule(4, "getDoctorByPanel", res.last_updated, clinicId);
            render_timeslot();
            listing = model.getData(clinicId);
            render_doctor_list();
            loading.finish();
        });
    }
    function init() {
        console.log("init");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointment/_doctor_list";
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
    $.__views.doctorContainer = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "doctorContainer"
    });
    $.__views.doctorContainer && $.addTopLevelView($.__views.doctorContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.createCollection("panelList");
    var listing = [];
    var clinicId = 0;
    $.set_clinicId = function(e) {
        console.log("specialty called");
        clinicId = e.clinicId;
        refresh();
    };
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;