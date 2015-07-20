function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function clickToCall() {
        var tel = details.tel;
        tel = tel.replace(/[+]/g, "");
        Ti.Platform.openURL("tel:+" + tel);
    }
    function addToContact() {
        "1" != isAddedToContact && (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED ? performAddressBookFunction() : Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN ? Ti.Contacts.requestAuthorization(function(e) {
            e.success ? performAddressBookFunction() : addressBookDisallowed();
        }) : addressBookDisallowed());
    }
    function direction2here() {
        var locationCallback = function(e) {
            if (!e.success || e.error) {
                Ti.API.info("error:" + JSON.stringify(e.error));
                return;
            }
            var longitude = e.coords.longitude;
            var latitude = e.coords.latitude;
            var url = "geo:" + latitude + "," + longitude + "?q=" + details.clinicName + " (" + details.add1 + "\r\n" + add2 + details.postcode + ", " + details.city + "\r\n" + details.state + ")";
            if (Ti.Android) try {
                Ti.API.info("Trying to Launch via Intent");
                var intent = Ti.Android.createIntent({
                    action: Ti.Android.ACTION_VIEW,
                    data: url
                });
                Ti.Android.currentActivity.startActivity(intent);
            } catch (e) {
                Ti.API.info("Caught Error launching intent: " + e);
                exports.Install();
            } else nav.navigateWithArgs("clinic/clinicMap", {
                map_url: "http://maps.google.com/maps?ie=UTF8&t=h&z=16&saddr=" + latitude + "," + longitude + "&daddr=" + details.latitude + "," + details.longitude
            });
            Titanium.Geolocation.removeEventListener("location", locationCallback);
        };
        Titanium.Geolocation.addEventListener("location", locationCallback);
    }
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
    var __defers = {};
    $.__views.panelDetails = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Panel Details",
        id: "panelDetails",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.panelDetails && $.addTopLevelView($.__views.panelDetails);
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.panelDetails.add($.__views.main);
    $.__views.__alloyId163 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId163"
    });
    $.__views.main.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId164"
    });
    $.__views.__alloyId163.add($.__views.__alloyId164);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId164.add($.__views.btnBack);
    $.__views.__alloyId165 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId165"
    });
    $.__views.__alloyId163.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Panel Details",
        textAlign: "center",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    $.__views.__alloyId167 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#C3C3C3",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "0",
        id: "__alloyId167"
    });
    $.__views.main.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createView({
        width: "95%",
        layout: "vertical",
        backgroundColor: "#F5F5F5",
        height: Ti.UI.SIZE,
        top: "15",
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
    $.__views.clinicName = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 18
        },
        color: "#5E5E5E",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "clinicName",
        bottom: "10"
    });
    $.__views.__alloyId168.add($.__views.clinicName);
    $.__views.__alloyId169 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Address",
        id: "__alloyId169"
    });
    $.__views.__alloyId168.add($.__views.__alloyId169);
    $.__views.clinicAddress = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicAddress",
        bottom: "10"
    });
    $.__views.__alloyId168.add($.__views.clinicAddress);
    $.__views.__alloyId170 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Coordinate",
        id: "__alloyId170"
    });
    $.__views.__alloyId168.add($.__views.__alloyId170);
    $.__views.clinicLocation = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicLocation",
        bottom: "10"
    });
    $.__views.__alloyId168.add($.__views.clinicLocation);
    $.__views.__alloyId171 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Telephone/Mobile",
        id: "__alloyId171"
    });
    $.__views.__alloyId168.add($.__views.__alloyId171);
    $.__views.clinicTel = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicTel",
        bottom: "10"
    });
    $.__views.__alloyId168.add($.__views.clinicTel);
    $.__views.__alloyId172 = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Operation Hours",
        id: "__alloyId172"
    });
    $.__views.__alloyId168.add($.__views.__alloyId172);
    $.__views.clinicOper = Ti.UI.createView({
        left: "0",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        id: "clinicOper",
        bottom: "10"
    });
    $.__views.__alloyId168.add($.__views.clinicOper);
    $.__views.__alloyId173 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#CE1D1C",
        width: "98%",
        top: "10",
        id: "__alloyId173"
    });
    $.__views.__alloyId167.add($.__views.__alloyId173);
    var __alloyId174 = [];
    $.__views.__alloyId175 = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Direction To Here",
        id: "__alloyId175"
    });
    __alloyId174.push($.__views.__alloyId175);
    direction2here ? $.__views.__alloyId175.addEventListener("click", direction2here) : __defers["$.__views.__alloyId175!click!direction2here"] = true;
    $.__views.__alloyId176 = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Call",
        id: "__alloyId176"
    });
    __alloyId174.push($.__views.__alloyId176);
    clickToCall ? $.__views.__alloyId176.addEventListener("click", clickToCall) : __defers["$.__views.__alloyId176!click!clickToCall"] = true;
    $.__views.add2contact = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        id: "add2contact",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Add To Contact"
    });
    __alloyId174.push($.__views.add2contact);
    addToContact ? $.__views.add2contact.addEventListener("click", addToContact) : __defers["$.__views.add2contact!click!addToContact"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId174,
        id: "healthTableData",
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: "100%",
        scrollable: "false"
    });
    $.__views.__alloyId167.add($.__views.healthTableData);
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
        var add2 = details.add2;
        "" != add2.trim() && (add2 += "\r\n");
        $.clinicAddress.text = details.add1 + "\r\n" + add2 + details.postcode + ", " + details.city + "\r\n" + details.state;
        $.clinicLocation.text = details.latitude + ", " + details.longitude;
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
    var performAddressBookFunction = function() {
        var workAddress1 = {
            CountryCode: "my",
            Street: details.add1 + " " + details.add2,
            City: details.city,
            State: details.state,
            Country: "Malaysia",
            ZIP: details.postcode
        };
        var phoneList = {
            work: phoneArr
        };
        Ti.Contacts.createPerson({
            firstName: details.clinicName,
            lastName: "",
            address: {
                work: [ workAddress1 ]
            },
            phone: phoneList
        });
        isAddedToContact = "1";
        $.add2contact.title = "Already added to contact";
        common.createAlert("Success", "Successfully added to contact book.");
    };
    var addressBookDisallowed = function() {
        common.createAlert("Cannot Access Contact Book", "You need allow APLUX to access your contact book.");
    };
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.panelDetails);
    });
    __defers["$.__views.__alloyId175!click!direction2here"] && $.__views.__alloyId175.addEventListener("click", direction2here);
    __defers["$.__views.__alloyId176!click!clickToCall"] && $.__views.__alloyId176.addEventListener("click", clickToCall);
    __defers["$.__views.add2contact!click!addToContact"] && $.__views.add2contact.addEventListener("click", addToContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;