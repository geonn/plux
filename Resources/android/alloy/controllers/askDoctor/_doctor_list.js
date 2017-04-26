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
                var row = Titanium.UI.createTableViewRow({
                    touchEnabled: true,
                    height: Ti.UI.SIZE,
                    dr_id: entry.id,
                    backgroundSelectedColor: "#ECFFF9"
                });
                var tblRowView = Ti.UI.createView({
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    dr_id: entry.id
                });
                var tblView = Ti.UI.createView({
                    layout: "vertical",
                    height: Ti.UI.SIZE,
                    width: "auto"
                });
                var docName = $.UI.create("Label", {
                    classes: [ "medium_font", "wfill", "hsize", "themeColor" ],
                    text: entry.name + " " + entry.id,
                    textAlign: "left",
                    top: 5,
                    left: 15
                });
                var docSpecialty = $.UI.create("Label", {
                    classes: [ "small_font", "wfill", "hsize" ],
                    text: entry.specialty,
                    color: "#848484",
                    textAlign: "left",
                    left: 15
                });
                tblView.add(docName);
                tblView.add(docSpecialty);
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
            var dr_id = parent({
                name: "dr_id"
            }, e.source);
            console.log(dr_id + " dr_id from doctor");
            var room_model = Alloy.createCollection("room");
            var room = room_model.getDataBydr_id({
                dr_id: dr_id
            });
            console.log(room);
            room.length > 0 && 2 == room[0].status ? nav.navigateWithArgs("conversation", {
                dr_id: dr_id
            }) : nav.navigateWithArgs("askDoctor/forms", {
                dr_id: dr_id
            });
        });
    }
    function refresh() {
        listing = panelListModel.getDoctorList([ {
            key: "specialty",
            value: specialty
        } ]);
        render_doctor_list();
    }
    function init() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "askDoctor/_doctor_list";
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
    var panelListModel = Alloy.createCollection("doctors");
    var listing = [];
    var specialty = "";
    $.update_doctor_list = function(e) {
        specialty = e.specialty;
        refresh();
    };
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;