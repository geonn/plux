var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {

  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'clinic/clinicDetails';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.panelDetails = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Panel Details", id: "panelDetails", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.panelDetails && $.addTopLevelView($.__views.panelDetails);
  $.__views.main = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical", backgroundColor: "#F6F6F6", height: "100%" });

  $.__views.panelDetails.add($.__views.main);
  if (true) {
    $.__views.__alloyId489 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId489" });

    $.__views.main.add($.__views.__alloyId489);
    $.__views.__alloyId490 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId490" });

    $.__views.__alloyId489.add($.__views.__alloyId490);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId490.add($.__views.btnBack);
    $.__views.__alloyId491 = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId491" });

    $.__views.__alloyId489.add($.__views.__alloyId491);
    $.__views.__alloyId492 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Panel Details', textAlign: "center", id: "__alloyId492" });

    $.__views.__alloyId491.add($.__views.__alloyId492);
    $.__views.__alloyId493 = Ti.UI.createView(
    { borderWidth: 0, right: 0, width: "20%", id: "__alloyId493" });

    $.__views.__alloyId489.add($.__views.__alloyId493);
    $.__views.btnDirection = Ti.UI.createImageView(
    { right: 10, id: "btnDirection", visible: false, width: 25, height: 25, image: "/images/map.png" });

    $.__views.__alloyId493.add($.__views.btnDirection);
  }
  $.__views.clinicMap = Ti.UI.createView(
  { borderWidth: 0, id: "clinicMap", height: 200, width: Ti.UI.FILL });

  $.__views.main.add($.__views.clinicMap);
  $.__views.showFullMap = Ti.UI.createImageView(
  { right: 10, top: 10, id: "showFullMap", zIndex: 99, width: 25, height: 25, image: "/images/zoom_in.png" });

  $.__views.clinicMap.add($.__views.showFullMap);
  $.__views.__alloyId494 = Ti.UI.createScrollView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, layout: "vertical", scrollType: "vertical", backgroundColor: "#ffffff", height: Ti.UI.FILL, width: Ti.UI.FILL, top: 0, id: "__alloyId494" });

  $.__views.main.add($.__views.__alloyId494);
  $.__views.__alloyId495 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#FFFFFF", borderRadius: "5", id: "__alloyId495" });

  $.__views.__alloyId494.add($.__views.__alloyId495);
  $.__views.__alloyId496 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, borderColor: "#dfe0e4", backgroundColor: "#ffffff", borderRadius: "5", top: 0, height: 80, id: "__alloyId496" });

  $.__views.__alloyId495.add($.__views.__alloyId496);
  $.__views.__alloyId497 = Ti.UI.createView(
  { borderWidth: 0, width: "32%", height: 80, layout: "vertical", id: "__alloyId497" });

  $.__views.__alloyId496.add($.__views.__alloyId497);
  direction2here ? $.addListener($.__views.__alloyId497, 'click', direction2here) : __defers['$.__views.__alloyId497!click!direction2here'] = true;$.__views.__alloyId498 = Ti.UI.createImageView(
  { image: "/images/map.png", width: 40, height: 40, top: 5, id: "__alloyId498" });

  $.__views.__alloyId497.add($.__views.__alloyId498);
  $.__views.__alloyId499 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "12dp", fontWeight: "bold" }, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'Direction To Here', id: "__alloyId499" });

  $.__views.__alloyId497.add($.__views.__alloyId499);
  $.__views.__alloyId500 = Ti.UI.createView(
  { borderWidth: 0, width: 1, height: 80, backgroundColor: "#dfe0e4", id: "__alloyId500" });

  $.__views.__alloyId496.add($.__views.__alloyId500);
  $.__views.__alloyId501 = Ti.UI.createView(
  { borderWidth: 0, width: "32%", height: 80, layout: "vertical", id: "__alloyId501" });

  $.__views.__alloyId496.add($.__views.__alloyId501);
  clickToCall ? $.addListener($.__views.__alloyId501, 'click', clickToCall) : __defers['$.__views.__alloyId501!click!clickToCall'] = true;$.__views.__alloyId502 = Ti.UI.createImageView(
  { image: "/images/call.png", width: 30, height: 30, top: 5, id: "__alloyId502" });

  $.__views.__alloyId501.add($.__views.__alloyId502);
  $.__views.__alloyId503 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "12dp", fontWeight: "bold" }, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'Call', top: 10, id: "__alloyId503" });

  $.__views.__alloyId501.add($.__views.__alloyId503);
  $.__views.__alloyId504 = Ti.UI.createView(
  { borderWidth: 0, width: 1, height: 80, backgroundColor: "#dfe0e4", id: "__alloyId504" });

  $.__views.__alloyId496.add($.__views.__alloyId504);
  $.__views.add2contact = Ti.UI.createView(
  { borderWidth: 0, width: "auto", height: 80, id: "add2contact", layout: "vertical" });

  $.__views.__alloyId496.add($.__views.add2contact);
  addToContact ? $.addListener($.__views.add2contact, 'click', addToContact) : __defers['$.__views.add2contact!click!addToContact'] = true;$.__views.__alloyId505 = Ti.UI.createImageView(
  { image: "/images/add_to_contact.png", width: 35, height: 35, top: 5, id: "__alloyId505" });

  $.__views.add2contact.add($.__views.__alloyId505);
  $.__views.__alloyId506 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "12dp", fontWeight: "bold" }, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'Add To Contact', top: 5, id: "__alloyId506" });

  $.__views.add2contact.add($.__views.__alloyId506);
  $.__views.clinicDetailsView = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "clinicDetailsView" });

  $.__views.__alloyId495.add($.__views.clinicDetailsView);
  $.__views.clinicName = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", id: "clinicName", top: 10, bottom: 10 });

  $.__views.clinicDetailsView.add($.__views.clinicName);
  $.__views.__alloyId507 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontWeight: "bold" }, text: "Address", id: "__alloyId507" });

  $.__views.clinicDetailsView.add($.__views.__alloyId507);
  $.__views.clinicAddress = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", id: "clinicAddress", bottom: 10 });

  $.__views.clinicDetailsView.add($.__views.clinicAddress);
  $.__views.__alloyId508 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontWeight: "bold" }, text: "Coordinate", id: "__alloyId508" });

  $.__views.clinicDetailsView.add($.__views.__alloyId508);
  $.__views.clinicLocation = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", id: "clinicLocation", bottom: 10 });

  $.__views.clinicDetailsView.add($.__views.clinicLocation);
  $.__views.__alloyId509 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontWeight: "bold" }, text: "Telephone/Mobile", id: "__alloyId509" });

  $.__views.clinicDetailsView.add($.__views.__alloyId509);
  $.__views.clinicTel = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", id: "clinicTel", bottom: 10 });

  $.__views.clinicDetailsView.add($.__views.clinicTel);
  $.__views.__alloyId510 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontWeight: "bold" }, text: "Operation Hours", id: "__alloyId510" });

  $.__views.clinicDetailsView.add($.__views.__alloyId510);
  $.__views.clinicOper = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, left: 0, right: 5, bottom: 10, id: "clinicOper" });

  $.__views.clinicDetailsView.add($.__views.clinicOper);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var Map = require('ti.map');
  var panel_id = args.panel_id || "";
  var panelListModel = Alloy.createCollection('panelList');
  var hasContactsPermissions = Ti.Contacts.hasContactsPermissions();
  var contacts;
  var isAddedToContact = "0";
  var details = panelListModel.getPanelListById(panel_id);;
  var phoneArr = [];
  var longitude;
  var latitude;
  init();

  function init() {
    setTimeout(function () {
      contacts = Ti.Contacts.getAllPeople();
      if (hasContactsPermissions) {
        if (contacts.length > 0 && contacts != null) {
          for (var i = 0; i < contacts.length; i++) {
            var phone = contacts[i].phone || "";
            var workPhone = phone.mobile;
            if (workPhone != null && workPhone[0] == details.tel) {
              isAddedToContact = "1";
              $.add2contact.title = "Already added to contact";
            }
          }
        }
      }
      populateMap(200);
      Ti.App.fireEvent("clinicList:loading_finish");
    }, 1000);
    console.log("details here");
    console.log(details);

    if (details != "") {
      var operHour = details.openHour;
      var operHour_arr = operHour.split("[nl]");
      var oh;
      for (var i = 0; i < operHour_arr.length; i++) {
        oh = operHour_arr[i].trim();
        if (oh != "") {
          oh += oh + "<br>\r\n";
        }
      }

      $.clinicName.text = details.clinicName;

      var add2 = details.add2;
      if (add2 != "") {
        add2 = add2 + "\r\n";
      }
      $.clinicAddress.text = details.add1 + "\r\n" + add2 + details.postcode + ", " + details.city + "\r\n" + details.state;

      $.clinicLocation.text = details.latitude + ", " + details.longitude;

      for (var i = 0; i < operHour_arr.length; i++) {
        var oh = operHour_arr[i].trim();
        if (oh != "") {
          oh = oh.replace(/&quot;/g, "'");
          var oper_label = $.UI.create('Label', {
            classes: ['wfill', 'hsize'],
            text: oh,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            bottom: 1 });

          $.clinicOper.add(oper_label);
        }
      }
      $.clinicTel.text = "TEL : " + details.tel;
      phoneArr.push(details.tel);
    }
  }

  function zoomMap(mapHeight) {
    $.clinicMap.height = mapHeight;
    mapview.setHeight(mapHeight);
  }

  function PixelsToDPUnits(ThePixels) {
    return ThePixels / (Titanium.Platform.displayCaps.dpi / 160);
  }

  function populateMap(mapHeight) {
    if (details.latitude != "" && details.longitude != "") {
      var annotations = [Alloy.Globals.Map.createAnnotation({
        latitude: details.latitude,
        longitude: details.longitude,
        title: details.clinicName,
        animate: true,
        image: '/images/marker.png' })];


      mapview = Alloy.Globals.Map.createView({
        mapType: Alloy.Globals.Map.NORMAL_TYPE,
        region: {
          latitude: details.latitude,
          longitude: details.longitude,
          latitudeDelta: "0.05",
          longitudeDelta: "0.05" },

        animate: true,
        height: mapHeight,
        top: 0,

        regionFit: true,
        userLocation: false,

        annotations: annotations });



      $.clinicMap.add(mapview);
    }
  }

  function clickToCall() {
    var tel = details.tel;
    tel = tel.replace(/[+]/g, "");
    Ti.Platform.openURL('tel:+' + tel);
  }

  var performAddressBookFunction = function () {
    var workAddress1 = {
      'CountryCode': 'my',
      'Street': details.add1 + " " + details.add2,
      'City': details.city,
      'State': details.state,
      'Country': 'Malaysia',
      'ZIP': details.postcode };


    var phoneList = {
      mobile: phoneArr };


    Ti.Contacts.createPerson({
      firstName: details.clinicName,
      lastName: '',
      address: {
        'work': [workAddress1] },

      phone: phoneList });

    isAddedToContact = "1";
    $.add2contact.title = "Already added to contact";
    common.createAlert("Success", "Successfully added to contact book.");
  };

  var addressBookDisallowed = function () {
    common.createAlert("Cannot Access Contact Book", "You need allow us to access your contact book.");
  };

  function addToContact() {
    if (isAddedToContact != "1") {
      if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_AUTHORIZED) {
        performAddressBookFunction();
      } else if (Ti.Contacts.contactsAuthorization == Ti.Contacts.AUTHORIZATION_UNKNOWN) {
        Ti.Contacts.requestAuthorization(function (e) {
          if (e.success) {
            performAddressBookFunction();
          } else {
            addressBookDisallowed();
          }
        });
      } else {
        addressBookDisallowed();
      }
    }
  }

  $.btnDirection.addEventListener('click', direction2here);

  function locationCallback(e) {
    if (!e.success || e.error) {
      alert("Please enable location services");
      Ti.API.info('error:' + JSON.stringify(e.error));
      return;
    }
    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
  }

  function direction2here() {
    console.log('http://maps.google.com/maps?saddr=' + latitude + ',' + longitude + '&daddr=' + details.latitude + ',' + details.longitude);
    var add2 = details.add2;
    if (add2 != "") {
      add2 = add2 + "\r\n";
    }
    var url = 'geo:' + latitude + ',' + longitude + "?q=" + details.clinicName + " (" + details.add1 + "\r\n" + add2 + details.postcode + ", " + details.city + "\r\n" + details.state + ")";
    if (Ti.Android) {
      try {
        var waze_url = 'waze://?ll=' + details.latitude + ',' + details.longitude + '&navigate=yes';
        var intent = Ti.Android.createIntent({
          action: Ti.Android.ACTION_VIEW,
          data: waze_url });

        Ti.Android.currentActivity.startActivity(intent);
      } catch (ex) {
        try {
          Ti.API.info('Trying to Launch via Intent');
          var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            data: url });

          Ti.Android.currentActivity.startActivity(intent);
        } catch (e) {
          Ti.API.info('Caught Error launching intent: ' + e);
          exports.Install();
        }
      }
    } else {

      Titanium.Platform.openURL('Maps://http://maps.google.com/maps?ie=UTF8&t=h&z=16&saddr=' + latitude + ',' + longitude + '&daddr=' + details.latitude + ',' + details.longitude);
    }
    console.log("geo location");
  }

  var showFull = false;

  $.showFullMap.addEventListener('click', function () {
    if (showFull === false) {
      $.clinicDetailsView.visible = false;
      $.clinicDetailsView.height = 0;
      $.clinicMap.height = Titanium.Platform.displayCaps.platformHeight;
      $.showFullMap.image = "/images/zoom_out.png";
      $.btnDirection.visible = true;
      showFull = true;
      console.log(Titanium.Platform.displayCaps.platformHeight + " Titanium.Platform.displayCaps.platformHeight");
      var pheight = false ? Titanium.Platform.displayCaps.platformHeight : PixelsToDPUnits(Titanium.Platform.displayCaps.platformHeight);
      zoomMap(pheight);
    } else {
      $.clinicDetailsView.visible = true;
      $.btnDirection.visible = false;
      $.clinicDetailsView.height = Ti.UI.SIZE;
      $.clinicMap.height = 200;
      $.showFullMap.image = "/images/zoom_in.png";
      showFull = false;
      zoomMap(200);
    }
  });

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.panelDetails);
    });
  }
  Titanium.Geolocation.addEventListener('location', locationCallback);
  $.panelDetails.addEventListener("close", function () {
    $.destroy();
    Titanium.Geolocation.removeEventListener('location', locationCallback);
  });





  __defers['$.__views.__alloyId497!click!direction2here'] && $.addListener($.__views.__alloyId497, 'click', direction2here);__defers['$.__views.__alloyId501!click!clickToCall'] && $.addListener($.__views.__alloyId501, 'click', clickToCall);__defers['$.__views.add2contact!click!addToContact'] && $.addListener($.__views.add2contact, 'click', addToContact);



  _.extend($, exports);
}

module.exports = Controller;