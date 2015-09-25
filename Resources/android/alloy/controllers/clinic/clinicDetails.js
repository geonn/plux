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
                var waze_url = "waze://?ll=" + details.latitude + "," + details.longitude + "&navigate=yes";
                var intent = Ti.Android.createIntent({
                    action: Ti.Android.ACTION_VIEW,
                    data: waze_url
                });
                Ti.Android.currentActivity.startActivity(intent);
<<<<<<< HEAD:Resources/iphone/alloy/controllers/clinic/clinicDetails.js
            } catch (e) {
                Ti.API.info("Caught Error launching intent: " + e);
                exports.Install();
=======
                console.log("waze");
            } catch (ex) {
                console.log(ex);
                try {
                    Ti.API.info("Trying to Launch via Intent");
                    var intent = Ti.Android.createIntent({
                        action: Ti.Android.ACTION_VIEW,
                        data: url
                    });
                    Ti.Android.currentActivity.startActivity(intent);
                } catch (e) {
                    Ti.API.info("Caught Error launching intent: " + e);
                    exports.Install();
                }
>>>>>>> origin/master:Resources/android/alloy/controllers/clinic/clinicDetails.js
            } else Titanium.Platform.canOpenURL("waze://?ll=" + details.latitude + "," + details.longitude + "&navigate=yes") ? Titanium.Platform.openURL("waze://?ll=" + details.latitude + "," + details.longitude + "&navigate=yes") : nav.navigateWithArgs("clinic/clinicMap", {
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
    $.__views.__alloyId254 = Ti.UI.createView({
        layout: "horizontal",
        height: "50",
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId254"
    });
    $.__views.main.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createView({
        left: "0",
        width: "20%",
        id: "__alloyId255"
    });
    $.__views.__alloyId254.add($.__views.__alloyId255);
    $.__views.btnBack = Ti.UI.createImageView({
        left: "10",
        id: "btnBack",
        width: "25",
        height: "25",
        image: "/images/btn-back.png"
    });
    $.__views.__alloyId255.add($.__views.btnBack);
    $.__views.__alloyId256 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId256"
    });
    $.__views.__alloyId254.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        text: "Panel Details",
        textAlign: "center",
        id: "__alloyId257"
    });
    $.__views.__alloyId256.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createScrollView({
        layout: "vertical",
        backgroundColor: "#ffffff",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "0",
        id: "__alloyId258"
    });
    $.__views.main.add($.__views.__alloyId258);
    $.__views.__alloyId259 = Ti.UI.createView({
        width: "95%",
        layout: "vertical",
        backgroundColor: "#F5F5F5",
        height: Ti.UI.SIZE,
        top: "15",
        id: "__alloyId259"
    });
    $.__views.__alloyId258.add($.__views.__alloyId259);
    $.__views.clinicMap = Ti.UI.createView({
        id: "clinicMap",
        height: "0",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId259.add($.__views.clinicMap);
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
    $.__views.__alloyId259.add($.__views.clinicName);
    $.__views.__alloyId260 = Ti.UI.createLabel({
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
        id: "__alloyId260"
    });
    $.__views.__alloyId259.add($.__views.__alloyId260);
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
    $.__views.__alloyId259.add($.__views.clinicAddress);
    $.__views.__alloyId261 = Ti.UI.createLabel({
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
        id: "__alloyId261"
    });
    $.__views.__alloyId259.add($.__views.__alloyId261);
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
    $.__views.__alloyId259.add($.__views.clinicLocation);
    $.__views.__alloyId262 = Ti.UI.createLabel({
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
        id: "__alloyId262"
    });
    $.__views.__alloyId259.add($.__views.__alloyId262);
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
    $.__views.__alloyId259.add($.__views.clinicTel);
    $.__views.__alloyId263 = Ti.UI.createLabel({
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
        id: "__alloyId263"
    });
    $.__views.__alloyId259.add($.__views.__alloyId263);
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
    $.__views.__alloyId259.add($.__views.clinicOper);
    $.__views.__alloyId264 = Ti.UI.createView({
        height: "1",
        backgroundColor: "#CE1D1C",
        width: "98%",
        top: "10",
        id: "__alloyId264"
    });
    $.__views.__alloyId258.add($.__views.__alloyId264);
    var __alloyId265 = [];
    $.__views.__alloyId266 = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Direction To Here",
        id: "__alloyId266"
    });
    __alloyId265.push($.__views.__alloyId266);
    direction2here ? $.addListener($.__views.__alloyId266, "click", direction2here) : __defers["$.__views.__alloyId266!click!direction2here"] = true;
    $.__views.__alloyId267 = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Call",
        id: "__alloyId267"
    });
    __alloyId265.push($.__views.__alloyId267);
    clickToCall ? $.addListener($.__views.__alloyId267, "click", clickToCall) : __defers["$.__views.__alloyId267!click!clickToCall"] = true;
    $.__views.add2contact = Ti.UI.createTableViewRow({
        height: "50",
        left: "10",
        id: "add2contact",
        selectedBackgroundColor: "#FFE1E1",
        color: "#5E5E5E",
        title: "Add To Contact"
    });
    __alloyId265.push($.__views.add2contact);
    addToContact ? $.addListener($.__views.add2contact, "click", addToContact) : __defers["$.__views.add2contact!click!addToContact"] = true;
    $.__views.healthTableData = Ti.UI.createTableView({
        data: __alloyId265,
        id: "healthTableData",
        backgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        width: "100%",
        scrollable: "false"
    });
    $.__views.__alloyId258.add($.__views.healthTableData);
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
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.panelDetails);
    });
    __defers["$.__views.__alloyId266!click!direction2here"] && $.addListener($.__views.__alloyId266, "click", direction2here);
    __defers["$.__views.__alloyId267!click!clickToCall"] && $.addListener($.__views.__alloyId267, "click", clickToCall);
    __defers["$.__views.add2contact!click!addToContact"] && $.addListener($.__views.add2contact, "click", addToContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;