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
        setTimeout(function() {
            contacts = Ti.Contacts.getAllPeople();
            if (hasContactsPermissions && contacts.length > 0 && null != contacts) for (var i = 0; i < contacts.length; i++) {
                var phone = contacts[i].phone || "";
                var workPhone = phone.mobile;
                if (null != workPhone && workPhone[0] == details.tel) {
                    isAddedToContact = "1";
                    $.add2contact.title = "Already added to contact";
                }
            }
            populateMap(200);
        }, 1e3);
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
            "" != add2 && (add2 += "\r\n");
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
    }
    function populateMap(mapHeight) {
        if ("" != details.latitude && "" != details.longitude) {
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
                height: mapHeight,
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
            $.clinicMap.height = mapHeight;
            $.clinicMap.add(mapview);
        }
    }
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
            console.log("http://maps.google.com/maps?saddr=" + latitude + "," + longitude + "&daddr=" + details.latitude + "," + details.longitude);
            var add2 = details.add2;
            "" != add2 && (add2 += "\r\n");
            var url = "geo:" + latitude + "," + longitude + "?q=" + details.clinicName + " (" + details.add1 + "\r\n" + add2 + details.postcode + ", " + details.city + "\r\n" + details.state + ")";
            if (Ti.Android) try {
                var waze_url = "waze://?ll=" + details.latitude + "," + details.longitude + "&navigate=yes";
                var intent = Ti.Android.createIntent({
                    action: Ti.Android.ACTION_VIEW,
                    data: waze_url
                });
                Ti.Android.currentActivity.startActivity(intent);
            } catch (ex) {
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
            } else Titanium.Platform.openURL("Maps://http://maps.google.com/maps?ie=UTF8&t=h&z=16&saddr=" + latitude + "," + longitude + "&daddr=" + details.latitude + "," + details.longitude);
            Titanium.Geolocation.removeEventListener("location", locationCallback);
        };
        console.log("geo location");
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
<<<<<<< HEAD
    $.__views.__alloyId539 = Ti.UI.createView({
=======
    $.__views.__alloyId543 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId539"
    });
    $.__views.main.add($.__views.__alloyId539);
    $.__views.__alloyId540 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId540"
    });
    $.__views.__alloyId539.add($.__views.__alloyId540);
=======
        id: "__alloyId543"
    });
    $.__views.main.add($.__views.__alloyId543);
    $.__views.__alloyId544 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId544"
    });
    $.__views.__alloyId543.add($.__views.__alloyId544);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId540.add($.__views.btnBack);
    $.__views.__alloyId541 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId541"
    });
    $.__views.__alloyId539.add($.__views.__alloyId541);
    $.__views.__alloyId542 = Ti.UI.createLabel({
=======
    $.__views.__alloyId544.add($.__views.btnBack);
    $.__views.__alloyId545 = Ti.UI.createView({
        width: "60%",
        id: "__alloyId545"
    });
    $.__views.__alloyId543.add($.__views.__alloyId545);
    $.__views.__alloyId546 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Panel Details",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId542"
    });
    $.__views.__alloyId541.add($.__views.__alloyId542);
    $.__views.__alloyId543 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId543"
    });
    $.__views.__alloyId539.add($.__views.__alloyId543);
=======
        id: "__alloyId546"
    });
    $.__views.__alloyId545.add($.__views.__alloyId546);
    $.__views.__alloyId547 = Ti.UI.createView({
        right: 0,
        width: "20%",
        id: "__alloyId547"
    });
    $.__views.__alloyId543.add($.__views.__alloyId547);
>>>>>>> origin/master
    $.__views.btnDirection = Ti.UI.createImageView({
        right: 10,
        id: "btnDirection",
        visible: false,
        width: 25,
        height: 25,
        image: "/images/map.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId543.add($.__views.btnDirection);
    $.__views.__alloyId544 = Ti.UI.createScrollView({
=======
    $.__views.__alloyId547.add($.__views.btnDirection);
    $.__views.__alloyId548 = Ti.UI.createScrollView({
>>>>>>> origin/master
        layout: "vertical",
        scrollType: "vertical",
        backgroundColor: "#ffffff",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
<<<<<<< HEAD
        id: "__alloyId544"
    });
    $.__views.main.add($.__views.__alloyId544);
    $.__views.__alloyId545 = Ti.UI.createView({
=======
        id: "__alloyId548"
    });
    $.__views.main.add($.__views.__alloyId548);
    $.__views.__alloyId549 = Ti.UI.createView({
>>>>>>> origin/master
        top: 10,
        left: 10,
        right: 10,
        bottom: 0,
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderColor: "#dfe0e4",
        backgroundColor: "#F5F5F5",
        borderRadius: "5",
<<<<<<< HEAD
        id: "__alloyId545"
    });
    $.__views.__alloyId544.add($.__views.__alloyId545);
=======
        id: "__alloyId549"
    });
    $.__views.__alloyId548.add($.__views.__alloyId549);
>>>>>>> origin/master
    $.__views.clinicMap = Ti.UI.createView({
        id: "clinicMap",
        height: 0,
        width: Ti.UI.FILL
    });
<<<<<<< HEAD
    $.__views.__alloyId545.add($.__views.clinicMap);
=======
    $.__views.__alloyId549.add($.__views.clinicMap);
>>>>>>> origin/master
    $.__views.showFullMap = Ti.UI.createImageView({
        right: 10,
        top: 10,
        id: "showFullMap",
        zIndex: 99,
        width: 25,
        height: 25,
        image: "/images/zoom_in.png"
    });
    $.__views.clinicMap.add($.__views.showFullMap);
<<<<<<< HEAD
    $.__views.__alloyId546 = Ti.UI.createView({
=======
    $.__views.__alloyId550 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        width: Ti.UI.FILL,
        borderColor: "#dfe0e4",
        backgroundColor: "#ffffff",
        borderRadius: "5",
        top: 0,
        height: 80,
<<<<<<< HEAD
        id: "__alloyId546"
    });
    $.__views.__alloyId545.add($.__views.__alloyId546);
    $.__views.__alloyId547 = Ti.UI.createView({
        width: "32%",
        height: 80,
        layout: "vertical",
        id: "__alloyId547"
    });
    $.__views.__alloyId546.add($.__views.__alloyId547);
    direction2here ? $.addListener($.__views.__alloyId547, "click", direction2here) : __defers["$.__views.__alloyId547!click!direction2here"] = true;
    $.__views.__alloyId548 = Ti.UI.createImageView({
=======
        id: "__alloyId550"
    });
    $.__views.__alloyId549.add($.__views.__alloyId550);
    $.__views.__alloyId551 = Ti.UI.createView({
        width: "32%",
        height: 80,
        layout: "vertical",
        id: "__alloyId551"
    });
    $.__views.__alloyId550.add($.__views.__alloyId551);
    direction2here ? $.addListener($.__views.__alloyId551, "click", direction2here) : __defers["$.__views.__alloyId551!click!direction2here"] = true;
    $.__views.__alloyId552 = Ti.UI.createImageView({
>>>>>>> origin/master
        image: "/images/map.png",
        width: 40,
        height: 40,
        top: 5,
<<<<<<< HEAD
        id: "__alloyId548"
    });
    $.__views.__alloyId547.add($.__views.__alloyId548);
    $.__views.__alloyId549 = Ti.UI.createLabel({
=======
        id: "__alloyId552"
    });
    $.__views.__alloyId551.add($.__views.__alloyId552);
    $.__views.__alloyId553 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#626262",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Direction To Here",
<<<<<<< HEAD
        id: "__alloyId549"
    });
    $.__views.__alloyId547.add($.__views.__alloyId549);
    $.__views.__alloyId550 = Ti.UI.createView({
        width: 1,
        height: 80,
        backgroundColor: "#dfe0e4",
        id: "__alloyId550"
    });
    $.__views.__alloyId546.add($.__views.__alloyId550);
    $.__views.__alloyId551 = Ti.UI.createView({
        width: "32%",
        height: 80,
        layout: "vertical",
        id: "__alloyId551"
    });
    $.__views.__alloyId546.add($.__views.__alloyId551);
    clickToCall ? $.addListener($.__views.__alloyId551, "click", clickToCall) : __defers["$.__views.__alloyId551!click!clickToCall"] = true;
    $.__views.__alloyId552 = Ti.UI.createImageView({
=======
        id: "__alloyId553"
    });
    $.__views.__alloyId551.add($.__views.__alloyId553);
    $.__views.__alloyId554 = Ti.UI.createView({
        width: 1,
        height: 80,
        backgroundColor: "#dfe0e4",
        id: "__alloyId554"
    });
    $.__views.__alloyId550.add($.__views.__alloyId554);
    $.__views.__alloyId555 = Ti.UI.createView({
        width: "32%",
        height: 80,
        layout: "vertical",
        id: "__alloyId555"
    });
    $.__views.__alloyId550.add($.__views.__alloyId555);
    clickToCall ? $.addListener($.__views.__alloyId555, "click", clickToCall) : __defers["$.__views.__alloyId555!click!clickToCall"] = true;
    $.__views.__alloyId556 = Ti.UI.createImageView({
>>>>>>> origin/master
        image: "/images/call.png",
        width: 30,
        height: 30,
        top: 5,
<<<<<<< HEAD
        id: "__alloyId552"
    });
    $.__views.__alloyId551.add($.__views.__alloyId552);
    $.__views.__alloyId553 = Ti.UI.createLabel({
=======
        id: "__alloyId556"
    });
    $.__views.__alloyId555.add($.__views.__alloyId556);
    $.__views.__alloyId557 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#626262",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Call",
        top: 10,
<<<<<<< HEAD
        id: "__alloyId553"
    });
    $.__views.__alloyId551.add($.__views.__alloyId553);
    $.__views.__alloyId554 = Ti.UI.createView({
        width: 1,
        height: 80,
        backgroundColor: "#dfe0e4",
        id: "__alloyId554"
    });
    $.__views.__alloyId546.add($.__views.__alloyId554);
=======
        id: "__alloyId557"
    });
    $.__views.__alloyId555.add($.__views.__alloyId557);
    $.__views.__alloyId558 = Ti.UI.createView({
        width: 1,
        height: 80,
        backgroundColor: "#dfe0e4",
        id: "__alloyId558"
    });
    $.__views.__alloyId550.add($.__views.__alloyId558);
>>>>>>> origin/master
    $.__views.add2contact = Ti.UI.createView({
        width: "auto",
        height: 80,
        id: "add2contact",
        layout: "vertical"
    });
<<<<<<< HEAD
    $.__views.__alloyId546.add($.__views.add2contact);
    addToContact ? $.addListener($.__views.add2contact, "click", addToContact) : __defers["$.__views.add2contact!click!addToContact"] = true;
    $.__views.__alloyId555 = Ti.UI.createImageView({
=======
    $.__views.__alloyId550.add($.__views.add2contact);
    addToContact ? $.addListener($.__views.add2contact, "click", addToContact) : __defers["$.__views.add2contact!click!addToContact"] = true;
    $.__views.__alloyId559 = Ti.UI.createImageView({
>>>>>>> origin/master
        image: "/images/add_to_contact.png",
        width: 35,
        height: 35,
        top: 5,
<<<<<<< HEAD
        id: "__alloyId555"
    });
    $.__views.add2contact.add($.__views.__alloyId555);
    $.__views.__alloyId556 = Ti.UI.createLabel({
=======
        id: "__alloyId559"
    });
    $.__views.add2contact.add($.__views.__alloyId559);
    $.__views.__alloyId560 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Ti.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#626262",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        text: "Add To Contact",
        top: 5,
<<<<<<< HEAD
        id: "__alloyId556"
    });
    $.__views.add2contact.add($.__views.__alloyId556);
=======
        id: "__alloyId560"
    });
    $.__views.add2contact.add($.__views.__alloyId560);
>>>>>>> origin/master
    $.__views.clinicDetailsView = Ti.UI.createView({
        layout: "vertical",
        id: "clinicDetailsView",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId545.add($.__views.clinicDetailsView);
=======
    $.__views.__alloyId549.add($.__views.clinicDetailsView);
>>>>>>> origin/master
    $.__views.clinicName = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        color: "#5E5E5E",
        left: 10,
        font: {
            fontSize: 18
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        id: "clinicName",
        top: 10,
        bottom: 10
    });
    $.__views.clinicDetailsView.add($.__views.clinicName);
<<<<<<< HEAD
    $.__views.__alloyId557 = Ti.UI.createLabel({
=======
    $.__views.__alloyId561 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Address",
<<<<<<< HEAD
        id: "__alloyId557"
    });
    $.__views.clinicDetailsView.add($.__views.__alloyId557);
=======
        id: "__alloyId561"
    });
    $.__views.clinicDetailsView.add($.__views.__alloyId561);
>>>>>>> origin/master
    $.__views.clinicAddress = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#777777",
        left: 10,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicAddress",
        bottom: 10
    });
    $.__views.clinicDetailsView.add($.__views.clinicAddress);
<<<<<<< HEAD
    $.__views.__alloyId558 = Ti.UI.createLabel({
=======
    $.__views.__alloyId562 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Coordinate",
<<<<<<< HEAD
        id: "__alloyId558"
    });
    $.__views.clinicDetailsView.add($.__views.__alloyId558);
=======
        id: "__alloyId562"
    });
    $.__views.clinicDetailsView.add($.__views.__alloyId562);
>>>>>>> origin/master
    $.__views.clinicLocation = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#777777",
        left: 10,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicLocation",
        bottom: 10
    });
    $.__views.clinicDetailsView.add($.__views.clinicLocation);
<<<<<<< HEAD
    $.__views.__alloyId559 = Ti.UI.createLabel({
=======
    $.__views.__alloyId563 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Telephone/Mobile",
<<<<<<< HEAD
        id: "__alloyId559"
    });
    $.__views.clinicDetailsView.add($.__views.__alloyId559);
=======
        id: "__alloyId563"
    });
    $.__views.clinicDetailsView.add($.__views.__alloyId563);
>>>>>>> origin/master
    $.__views.clinicTel = Ti.UI.createLabel({
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#777777",
        left: 10,
        font: {
            fontSize: 14
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        id: "clinicTel",
        bottom: 10
    });
    $.__views.clinicDetailsView.add($.__views.clinicTel);
<<<<<<< HEAD
    $.__views.__alloyId560 = Ti.UI.createLabel({
=======
    $.__views.__alloyId564 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "90%",
        height: Titanium.UI.SIZE,
        color: "#CE1D1C",
        left: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        text: "Operation Hours",
<<<<<<< HEAD
        id: "__alloyId560"
    });
    $.__views.clinicDetailsView.add($.__views.__alloyId560);
=======
        id: "__alloyId564"
    });
    $.__views.clinicDetailsView.add($.__views.__alloyId564);
>>>>>>> origin/master
    $.__views.clinicOper = Ti.UI.createView({
        left: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14
        },
        color: "#777777",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        layout: "vertical",
        right: 5,
        id: "clinicOper",
        bottom: 10
    });
    $.__views.clinicDetailsView.add($.__views.clinicOper);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var Map = require("ti.map");
    var panel_id = args.panel_id || "";
    var panelListModel = Alloy.createCollection("panelList");
    var hasContactsPermissions = Ti.Contacts.hasContactsPermissions();
    var contacts;
    var isAddedToContact = "0";
    var details = panelListModel.getPanelListById(panel_id);
    var phoneArr = [];
    init();
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
    $.btnDirection.addEventListener("click", direction2here);
    var showFull = false;
    $.showFullMap.addEventListener("click", function() {
        if (false === showFull) {
            $.clinicDetailsView.visible = false;
            $.clinicDetailsView.height = 0;
            $.clinicMap.height = Titanium.Platform.displayCaps.platformHeight;
            $.showFullMap.image = "/images/zoom_out.png";
            $.btnDirection.visible = true;
            showFull = true;
            populateMap(Titanium.Platform.displayCaps.platformHeight);
        } else {
            $.clinicDetailsView.visible = true;
            $.btnDirection.visible = false;
            $.clinicDetailsView.height = Ti.UI.SIZE;
            $.clinicMap.height = 200;
            $.showFullMap.image = "/images/zoom_in.png";
            showFull = false;
            populateMap(200);
        }
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.panelDetails);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId547!click!direction2here"] && $.addListener($.__views.__alloyId547, "click", direction2here);
    __defers["$.__views.__alloyId551!click!clickToCall"] && $.addListener($.__views.__alloyId551, "click", clickToCall);
=======
    __defers["$.__views.__alloyId551!click!direction2here"] && $.addListener($.__views.__alloyId551, "click", direction2here);
    __defers["$.__views.__alloyId555!click!clickToCall"] && $.addListener($.__views.__alloyId555, "click", clickToCall);
>>>>>>> origin/master
    __defers["$.__views.add2contact!click!addToContact"] && $.addListener($.__views.add2contact, "click", addToContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;