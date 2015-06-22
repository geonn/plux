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
    this.__controllerPath = "clinic/clinicDetails";
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var panel_id = args.panel_id || "";
    var panelListModel = Alloy.createCollection("panelList");
    var details = panelListModel.getPanelListById(panel_id);
    var contacts = Ti.Contacts.getAllPeople();
    var isAddedToContact = "0";
    for (var i = 0; i < contacts.length; i++) {
        var phone = contacts[i].phone;
        var workPhone = phone.work;
        if (null != workPhone && workPhone[0] == details.tel) {
            isAddedToContact = "1";
            $.add2contact.title = "Already added to contact";
        }
    }
    var phoneArr = [];
    if ("" != details) {
        var operHour = details.openHour;
        var operHour_arr = operHour.split("[nl]");
        var oh;
        for (var i = 0; i < operHour_arr.length; i++) {
            oh = operHour_arr[i].trim();
            "" != oh && (oh += oh + "<br>\r\n");
        }
        $.clinicName.text = details.clinicName;
        $.clinicAddress1.text = details.add1;
        $.clinicAddress2.text = details.add2;
        $.clinicPostcode.text = details.postcode + ", " + details.city;
        $.clinicState.text = details.state;
        $.clinicLocation.text = "COORDINATE : " + details.latitude + ", " + details.longitude;
        for (var i = 0; i < operHour_arr.length; i++) {
            var oh = operHour_arr[i].trim();
            if ("" != oh) {
                oh = oh.replace(/&quot;/g, "'");
                var oper_label = $.UI.create("Label", {
                    classes: [ "clinic_address" ],
                    text: oh,
                    width: "100%",
                    height: Ti.UI.SIZE,
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    bottom: 1
                });
                $.clinicOper.add(oper_label);
            }
        }
        $.clinicTel.text = "TEL : " + details.tel;
        phoneArr.push(details.tel);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;