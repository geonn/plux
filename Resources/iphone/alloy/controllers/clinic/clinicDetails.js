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
            console.log("http://maps.google.com/maps?saddr=" + latitude + "," + longitude + "&daddr=" + details.latitude + "," + details.longitude);
            nav.navigateWithArgs("clinic/clinicMap", {
                url: "http://maps.google.com/maps?ie=UTF8&t=h&z=16&saddr=" + latitude + "," + longitude + "&daddr=" + details.latitude + "," + details.longitude
            });
            Titanium.Geolocation.removeEventListener("location", locationCallback);
        };
        Titanium.Geolocation.addEventListener("location", locationCallback);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "clinic/clinicDetails";
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
    $.__views.__alloyId93 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: "100%",
        top: "0",
        id: "__alloyId93"
    });
    $.__views.panelDetails.add($.__views.__alloyId93);
    $.__views.clinicName = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        right: 5,
        font: {
            fontSize: 18
        },
        color: "5E5E5E",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "clinicName",
        top: "5",
        bottom: "10"
    });
    $.__views.__alloyId93.add($.__views.clinicName);
    $.__views.clinicAddress1 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 10,
        widht: "90%",
        font: {
            fontSize: 14
        },
        color: "#909090",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicAddress1"
    });
    $.__views.__alloyId93.add($.__views.clinicAddress1);
    $.__views.clinicAddress2 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 10,
        widht: "90%",
        font: {
            fontSize: 14
        },
        color: "#909090",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicAddress2"
    });
    $.__views.__alloyId93.add($.__views.clinicAddress2);
    $.__views.clinicPostcode = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 10,
        widht: "90%",
        font: {
            fontSize: 14
        },
        color: "#909090",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicPostcode"
    });
    $.__views.__alloyId93.add($.__views.clinicPostcode);
    $.__views.clinicState = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 10,
        widht: "90%",
        font: {
            fontSize: 14
        },
        color: "#909090",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicState"
    });
    $.__views.__alloyId93.add($.__views.clinicState);
    $.__views.clinicLocation = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 10,
        widht: "90%",
        font: {
            fontSize: 14
        },
        color: "#909090",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicLocation",
        top: "10",
        bottom: "10"
    });
    $.__views.__alloyId93.add($.__views.clinicLocation);
    $.__views.clinicTel = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        left: 10,
        widht: "90%",
        font: {
            fontSize: 14
        },
        color: "#909090",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicTel",
        top: "10",
        bottom: "10"
    });
    $.__views.__alloyId93.add($.__views.clinicTel);
    $.__views.__alloyId94 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#CE1D1C",
        width: "98%",
        top: "10",
        id: "__alloyId94"
    });
    $.__views.__alloyId93.add($.__views.__alloyId94);
    var __alloyId95 = [];
    $.__views.__alloyId96 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Direction To Here",
        id: "__alloyId96"
    });
    __alloyId95.push($.__views.__alloyId96);
    direction2here ? $.__views.__alloyId96.addEventListener("click", direction2here) : __defers["$.__views.__alloyId96!click!direction2here"] = true;
    $.__views.__alloyId97 = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Call",
        id: "__alloyId97"
    });
    __alloyId95.push($.__views.__alloyId97);
    clickToCall ? $.__views.__alloyId97.addEventListener("click", clickToCall) : __defers["$.__views.__alloyId97!click!clickToCall"] = true;
    $.__views.add2contact = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "add2contact",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Add To Contact"
    });
    __alloyId95.push($.__views.add2contact);
    addToContact ? $.__views.add2contact.addEventListener("click", addToContact) : __defers["$.__views.add2contact!click!addToContact"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId95,
        id: "healthTableData",
        height: Ti.UI.SIZE,
        width: "100%",
        scrollable: "false"
    });
    $.__views.__alloyId93.add($.__views.healthTableData);
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
        $.clinicName.text = details.clinicName;
        $.clinicAddress1.text = details.add1;
        $.clinicAddress2.text = details.add2;
        $.clinicPostcode.text = details.postcode + ", " + details.city;
        $.clinicState.text = details.state;
        $.clinicLocation.text = "COORDINATE : " + details.latitude + ", " + details.longitude;
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
    __defers["$.__views.__alloyId96!click!direction2here"] && $.__views.__alloyId96.addEventListener("click", direction2here);
    __defers["$.__views.__alloyId97!click!clickToCall"] && $.__views.__alloyId97.addEventListener("click", clickToCall);
    __defers["$.__views.add2contact!click!addToContact"] && $.__views.add2contact.addEventListener("click", addToContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;