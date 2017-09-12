function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function render_specialty_list() {
        $.specialty_container.removeAllChildren();
        var docTable = Ti.UI.createTableView();
        var data = [];
        if (listing.length < 1) docTable.setData(common.noRecord()); else {
            listing.forEach(function(entry) {
                console.log(entry);
                if ("" != entry.specialty) {
                    var row = Titanium.UI.createTableViewRow({
                        touchEnabled: true,
                        height: Ti.UI.SIZE,
                        specialty: entry.specialty,
                        backgroundSelectedColor: "#ECFFF9"
                    });
                    var tblRowView = Ti.UI.createView({
                        height: Ti.UI.SIZE,
                        width: Ti.UI.FILL,
                        top: 10,
                        bottom: 10,
                        specialty: entry.specialty
                    });
                    var tblView = Ti.UI.createView({
                        layout: "vertical",
                        height: Ti.UI.SIZE,
                        specialty: entry.specialty,
                        width: "auto"
                    });
                    var label_specialty = $.UI.create("Label", {
                        classes: [ "medium_font", "wfill", "hsize", "themeColor" ],
                        text: entry.specialty,
                        textAlign: "left",
                        specialty: entry.specialty,
                        top: 5,
                        left: 15
                    });
                    tblView.add(label_specialty);
                    tblRowView.add(tblView);
                    update_specialty_to_form(tblRowView);
                    row.add(tblRowView);
                    data.push(row);
                }
            });
            docTable.setData(data);
        }
        $.specialty_container.add(docTable);
    }
    function update_specialty_to_form(vw) {
        vw.addEventListener("click", function(e) {
            var elbl = JSON.stringify(e.source);
            var res = JSON.parse(elbl);
            console.log(res);
            Ti.App.fireEvent("update_specialty", {
                specialty: res.specialty
            });
            Ti.App.fireEvent("askDoctor_index:moveNext");
        });
    }
    function refresh() {
        listing = doctors_model.getDoctorListGroupBySpecialty();
        render_specialty_list();
    }
    function init() {
        refresh();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "askDoctor/_specialty_list";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.specialty_container = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "specialty_container"
    });
    $.__views.specialty_container && $.addTopLevelView($.__views.specialty_container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var doctors_model = Alloy.createCollection("doctors");
    var clinicId = 0;
    var listing = [];
    $.set_clinicId = function(e) {
        console.log("specialty called");
        clinicId = e.clinicId;
        refresh();
    };
    init();
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;