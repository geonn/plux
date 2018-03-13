var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
    delete obj[key];
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
  { backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Panel Details", id: "panelDetails", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.panelDetails && $.addTopLevelView($.__views.panelDetails);
  $.__views.main = Ti.UI.createView(
  { id: "main", layout: "vertical", backgroundColor: "#F6F6F6", height: "100%" });

  $.__views.panelDetails.add($.__views.main);
  if (true) {
    $.__views.__alloyId329 = Ti.UI.createView(
    { layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId329" });

    $.__views.main.add($.__views.__alloyId329);
    $.__views.__alloyId330 = Ti.UI.createView(
    { left: 0, width: "20%", id: "__alloyId330" });

    $.__views.__alloyId329.add($.__views.__alloyId330);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId330.add($.__views.btnBack);
    $.__views.__alloyId331 = Ti.UI.createView(
    { width: "60%", id: "__alloyId331" });

    $.__views.__alloyId329.add($.__views.__alloyId331);
    $.__views.__alloyId332 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Panel Details', textAlign: "center", id: "__alloyId332" });

    $.__views.__alloyId331.add($.__views.__alloyId332);
    $.__views.__alloyId333 = Ti.UI.createView(
    { right: 0, width: "20%", id: "__alloyId333" });

    $.__views.__alloyId329.add($.__views.__alloyId333);
    $.__views.btnDirection = Ti.UI.createImageView(
    { right: 10, id: "btnDirection", visible: false, width: 25, height: 25, image: "/images/map.png" });

    $.__views.__alloyId333.add($.__views.btnDirection);
  }
  $.__views.clinicMap = Ti.UI.createView(
  { id: "clinicMap", height: 200, width: Ti.UI.FILL });

  $.__views.main.add($.__views.clinicMap);
  $.__views.showFullMap = Ti.UI.createImageView(
  { right: 10, top: 10, id: "showFullMap", zIndex: 99, width: 25, height: 25, image: "/images/zoom_in.png" });

  $.__views.clinicMap.add($.__views.showFullMap);
  $.__views.__alloyId334 = Ti.UI.createScrollView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, layout: "vertical", scrollType: "vertical", backgroundColor: "#ffffff", height: Ti.UI.FILL, width: Ti.UI.FILL, top: 0, id: "__alloyId334" });

  $.__views.main.add($.__views.__alloyId334);
  $.__views.__alloyId335 = Ti.UI.createView(
  { top: 10, left: 10, right: 10, bottom: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, borderColor: "#dfe0e4", backgroundColor: "#FFFFFF", borderRadius: "5", id: "__alloyId335" });

  $.__views.__alloyId334.add($.__views.__alloyId335);
  $.__views.__alloyId336 = Ti.UI.createView(
  { layout: "horizontal", width: Ti.UI.FILL, borderColor: "#dfe0e4", backgroundColor: "#ffffff", borderRadius: "5", top: 0, height: 80, id: "__alloyId336" });

  $.__views.__alloyId335.add($.__views.__alloyId336);
  $.__views.__alloyId337 = Ti.UI.createView(
  { width: "32%", height: 80, layout: "vertical", id: "__alloyId337" });

  $.__views.__alloyId336.add($.__views.__alloyId337);
  direction2here ? $.addListener($.__views.__alloyId337, 'click', direction2here) : __defers['$.__views.__alloyId337!click!direction2here'] = true;$.__views.__alloyId338 = Ti.UI.createImageView(
  { image: "/images/map.png", width: 40, height: 40, top: 5, id: "__alloyId338" });

  $.__views.__alloyId337.add($.__views.__alloyId338);
  $.__views.__alloyId339 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "12dp", fontWeight: "bold" }, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'Direction To Here', id: "__alloyId339" });

  $.__views.__alloyId337.add($.__views.__alloyId339);
  $.__views.__alloyId340 = Ti.UI.createView(
  { width: 1, height: 80, backgroundColor: "#dfe0e4", id: "__alloyId340" });

  $.__views.__alloyId336.add($.__views.__alloyId340);
  $.__views.__alloyId341 = Ti.UI.createView(
  { width: "32%", height: 80, layout: "vertical", id: "__alloyId341" });

  $.__views.__alloyId336.add($.__views.__alloyId341);
  clickToCall ? $.addListener($.__views.__alloyId341, 'click', clickToCall) : __defers['$.__views.__alloyId341!click!clickToCall'] = true;$.__views.__alloyId342 = Ti.UI.createImageView(
  { image: "/images/call.png", width: 30, height: 30, top: 5, id: "__alloyId342" });

  $.__views.__alloyId341.add($.__views.__alloyId342);
  $.__views.__alloyId343 = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "12dp", fontWeight: "bold" }, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'Call', top: 10, id: "__alloyId343" });

  $.__views.__alloyId341.add($.__views.__alloyId343);
  $.__views.__alloyId344 = Ti.UI.createView(
  { width: 1, height: 80, backgroundColor: "#dfe0e4", id: "__alloyId344" });

  $.__views.__alloyId336.add($.__views.__alloyId344);
  $.__views.add2contact = Ti.UI.createView(
  { width: "auto", height: 80, id: "add2contact", layout: "vertical" });

  $.__views.__alloyId336.add($.__views.add2contact);
  addToContact ? $.addListener($.__views.add2contact, 'click', addToContact) : __defers['$.__views.add2contact!click!addToContact'] = true;$.__views.__alloyId345 = Ti.UI.createImageView(
  { image: "/images/add_to_contact.png", width: 35, height: 35, top: 5, id: "__alloyId345" });

  $.__views.add2contact.add($.__views.__alloyId345);
  $.__views.__alloyId346 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#626262", font: { fontSize: "12dp", fontWeight: "bold" }, textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, text: 'Add To Contact', top: 5, id: "__alloyId346" });

  $.__views.add2contact.add($.__views.__alloyId346);
  $.__views.clinicDetailsView = Ti.UI.createView(
  { top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "clinicDetailsView" });

  $.__views.__alloyId335.add($.__views.clinicDetailsView);
  $.__views.clinicName = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", id: "clinicName", top: 10, bottom: 10 });

  $.__views.clinicDetailsView.add($.__views.clinicName);
  $.__views.__alloyId347 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", font: { fontWeight: "bold" }, text: "Address", id: "__alloyId347" });

  $.__views.clinicDetailsView.add($.__views.__alloyId347);
  $.__views.clinicAddress = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", id: "clinicAddress", bottom: 10 });

  $.__views.clinicDetailsView.add($.__views.clinicAddress);
  $.__views.__alloyId348 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", font: { fontWeight: "bold" }, text: "Coordinate", id: "__alloyId348" });

  $.__views.clinicDetailsView.add($.__views.__alloyId348);
  $.__views.clinicLocation = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", id: "clinicLocation", bottom: 10 });

  $.__views.clinicDetailsView.add($.__views.clinicLocation);
  $.__views.__alloyId349 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", font: { fontWeight: "bold" }, text: "Telephone/Mobile", id: "__alloyId349" });

  $.__views.clinicDetailsView.add($.__views.__alloyId349);
  $.__views.clinicTel = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", id: "clinicTel", bottom: 10 });

  $.__views.clinicDetailsView.add($.__views.clinicTel);
  $.__views.__alloyId350 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#606060", font: { fontWeight: "bold" }, text: "Operation Hours", id: "__alloyId350" });

  $.__views.clinicDetailsView.add($.__views.__alloyId350);
  $.__views.clinicOper = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, left: 0, right: 5, bottom: 10, id: "clinicOper" });

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





  __defers['$.__views.__alloyId337!click!direction2here'] && $.addListener($.__views.__alloyId337, 'click', direction2here);__defers['$.__views.__alloyId341!click!clickToCall'] && $.addListener($.__views.__alloyId341, 'click', clickToCall);__defers['$.__views.add2contact!click!addToContact'] && $.addListener($.__views.add2contact, 'click', addToContact);



  _.extend($, exports);
}

module.exports = Controller;