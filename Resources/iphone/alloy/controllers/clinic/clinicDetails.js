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
                alert("Please enable location services");
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
                map_url: "http://maps.apple.com/?daddr=" + details.add1 + "\r\n" + add2 + details.postcode + ", " + details.city + "\r\n" + details.state + "&saddr=" + details.latitude + "," + details.longitude
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
    $.__views.__alloyId217 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#ffffff",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "0",
        id: "__alloyId217"
    });
    $.__views.main.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createView({
        width: "95%",
        layout: "vertical",
        backgroundColor: "#F5F5F5",
        height: Ti.UI.SIZE,
        top: "15",
        id: "__alloyId218"
    });
    $.__views.__alloyId217.add($.__views.__alloyId218);
    $.__views.clinicMap = Ti.UI.createView({
        id: "clinicMap",
        height: "0",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId218.add($.__views.clinicMap);
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
    $.__views.__alloyId218.add($.__views.clinicName);
    $.__views.__alloyId219 = Ti.UI.createLabel({
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
        id: "__alloyId219"
    });
    $.__views.__alloyId218.add($.__views.__alloyId219);
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
    $.__views.__alloyId218.add($.__views.clinicAddress);
    $.__views.__alloyId220 = Ti.UI.createLabel({
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
        id: "__alloyId220"
    });
    $.__views.__alloyId218.add($.__views.__alloyId220);
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
    $.__views.__alloyId218.add($.__views.clinicLocation);
    $.__views.__alloyId221 = Ti.UI.createLabel({
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
        id: "__alloyId221"
    });
    $.__views.__alloyId218.add($.__views.__alloyId221);
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
    $.__views.__alloyId218.add($.__views.clinicTel);
    $.__views.__alloyId222 = Ti.UI.createLabel({
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
        id: "__alloyId222"
    });
    $.__views.__alloyId218.add($.__views.__alloyId222);
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
        right: "5",
        id: "clinicOper",
        bottom: "10"
    });
    $.__views.__alloyId218.add($.__views.clinicOper);
    $.__views.__alloyId223 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#CE1D1C",
        width: "98%",
        top: "10",
        id: "__alloyId223"
    });
    $.__views.__alloyId217.add($.__views.__alloyId223);
    var __alloyId224 = [];
    $.__views.__alloyId225 = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Direction To Here",
        id: "__alloyId225"
    });
    __alloyId224.push($.__views.__alloyId225);
    direction2here ? $.addListener($.__views.__alloyId225, "click", direction2here) : __defers["$.__views.__alloyId225!click!direction2here"] = true;
    $.__views.__alloyId226 = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Call",
        id: "__alloyId226"
    });
    __alloyId224.push($.__views.__alloyId226);
    clickToCall ? $.addListener($.__views.__alloyId226, "click", clickToCall) : __defers["$.__views.__alloyId226!click!clickToCall"] = true;
    $.__views.add2contact = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        id: "add2contact",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Add To Contact"
    });
    __alloyId224.push($.__views.add2contact);
    addToContact ? $.addListener($.__views.add2contact, "click", addToContact) : __defers["$.__views.add2contact!click!addToContact"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId224,
        id: "healthTableData",
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: "100%",
        scrollable: "false"
    });
    $.__views.__alloyId217.add($.__views.healthTableData);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var panel_id = args.panel_id || "";
    var panelListModel = Alloy.createCollection("panelList");
    var details = panelListModel.getPanelListById(panel_id);
    var contacts = Ti.Contacts.getAllPeople();
    var isAddedToContact = "0";
    for (var i = 0; i < contacts.length; i++) {
        var phone = contacts[i].phone || "";
        var workPhone = phone.mobile;
        if (null != workPhone && workPhone[0] == details.tel) {
            isAddedToContact = "1";
            $.add2contact.title = "Already added to contact";
        }
    }
    var phoneArr = [];
    if ("" != details) {
        if ("" != details.latitude && "" != details.longitude) {
            var Map = require("ti.map");
            var mapview = Map.createView({
                mapType: Map.NORMAL_TYPE,
                region: {
                    latitude: details.latitude,
                    longitude: details.longitude,
                    latitudeDelta: .005,
                    longitudeDelta: .005
                },
                animate: true,
                regionFit: true,
                height: 200,
                top: 0,
                userLocation: true
            });
            var merchantLoc = Map.createAnnotation({
                latitude: details.latitude,
                longitude: details.longitude,
                title: details.clinicName,
                image: "/images/marker.png",
                animate: true,
                pincolor: Map.ANNOTATION_RED
            });
            mapview.addAnnotation(merchantLoc);
            $.clinicMap.height = 200;
            $.clinicMap.add(mapview);
        }
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
            mobile: phoneArr
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
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.panelDetails);
    });
    __defers["$.__views.__alloyId225!click!direction2here"] && $.addListener($.__views.__alloyId225, "click", direction2here);
    __defers["$.__views.__alloyId226!click!clickToCall"] && $.addListener($.__views.__alloyId226, "click", clickToCall);
    __defers["$.__views.add2contact!click!addToContact"] && $.addListener($.__views.add2contact, "click", addToContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;