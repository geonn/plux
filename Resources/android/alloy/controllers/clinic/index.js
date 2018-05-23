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
  this.__controllerPath = 'clinic/index';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.win = Ti.UI.createWindow(
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Clinic Locator", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId554 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId554" });

  $.__views.win.add($.__views.__alloyId554);
  if (true) {
    $.__views.__alloyId555 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: "100%", backgroundColor: "#DEDEDE", id: "__alloyId555" });

    $.__views.__alloyId554.add($.__views.__alloyId555);
    $.__views.__alloyId556 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId556" });

    $.__views.__alloyId555.add($.__views.__alloyId556);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId556.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { borderWidth: 0, id: "pageTitle", width: Ti.UI.FILL });

    $.__views.__alloyId555.add($.__views.pageTitle);
    $.__views.__alloyId557 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Clinic Locator', textAlign: "center", id: "__alloyId557" });

    $.__views.pageTitle.add($.__views.__alloyId557);
  }
  $.__views.parent = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "parent", backgroundColor: "#ffffff" });

  $.__views.__alloyId554.add($.__views.parent);
  $.__views.mapview = (require("ti.map").createView || Ti.UI.createView)(
  { borderWidth: 0, width: Ti.UI.FILL, id: "mapview", userLocation: true });

  $.__views.parent.add($.__views.mapview);
  $.__views.__alloyId558 = Ti.UI.createView(
  { borderWidth: 1, layout: "horizontal", width: Ti.UI.SIZE, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#9cffffff", borderColor: "#111", left: 20, top: 70, id: "__alloyId558" });

  $.__views.win.add($.__views.__alloyId558);
  openCategory ? $.addListener($.__views.__alloyId558, 'click', openCategory) : __defers['$.__views.__alloyId558!click!openCategory'] = true;$.__views.filter_icon = Ti.UI.createImageView(
  { id: "filter_icon", width: 0, height: 20 });

  $.__views.__alloyId558.add($.__views.filter_icon);
  $.__views.filter_text = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", top: 10, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, text: 'Looking For...', id: "filter_text" });

  $.__views.__alloyId558.add($.__views.filter_text);
  $.__views.view_category = Ti.UI.createView(
  { borderWidth: 0, width: 320, height: Ti.UI.FILL, id: "view_category", backgroundColor: "#00ffffff" });

  $.__views.win.add($.__views.view_category);
  $.__views.filter_list = Ti.UI.createTableView(
  { height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, backgroundColor: "#fff", width: "80%", zIndex: 10, left: 0, bottom: 10, id: "filter_list" });

  $.__views.view_category.add($.__views.filter_list);
  setFilter ? $.addListener($.__views.filter_list, 'click', setFilter) : __defers['$.__views.filter_list!click!setFilter'] = true;$.__views.__alloyId559 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId559" });

  $.__views.view_category.add($.__views.__alloyId559);
  openCategory ? $.addListener($.__views.__alloyId559, 'click', openCategory) : __defers['$.__views.__alloyId559!click!openCategory'] = true;$.__views.detail = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, backgroundColor: "#ffffff", bottom: 0, id: "detail" });

  $.__views.win.add($.__views.detail);
  $.__views.__alloyId560 = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 18 }, right: 10, top: 10, zIndex: 100, id: "__alloyId560" });

  $.__views.detail.add($.__views.__alloyId560);
  closeView ? $.addListener($.__views.__alloyId560, 'click', closeView) : __defers['$.__views.__alloyId560!click!closeView'] = true;$.__views.__alloyId561 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId561" });

  $.__views.detail.add($.__views.__alloyId561);
  $.__views.__alloyId562 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId562" });

  $.__views.__alloyId561.add($.__views.__alloyId562);
  $.__views.__alloyId563 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, top: 0, width: "auto", id: "__alloyId563" });

  $.__views.__alloyId562.add($.__views.__alloyId563);
  $.__views.name = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 14, fontWeight: "bold" }, id: "name" });

  $.__views.__alloyId563.add($.__views.name);
  $.__views.address = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 14 }, id: "address" });

  $.__views.__alloyId563.add($.__views.address);
  $.__views.__alloyId564 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 14, fontWeight: "bold" }, text: 'WORKING HOUR:', top: 5, id: "__alloyId564" });

  $.__views.__alloyId563.add($.__views.__alloyId564);
  $.__views.openHour = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 14 }, id: "openHour" });

  $.__views.__alloyId563.add($.__views.openHour);
  $.__views.__alloyId565 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId565" });

  $.__views.__alloyId561.add($.__views.__alloyId565);
  $.__views.__alloyId566 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, width: "50%", left: 0, backgroundColor: "#CC2228", id: "__alloyId566" });

  $.__views.__alloyId565.add($.__views.__alloyId566);
  $.__views.__alloyId567 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", top: 10, left: 10, right: 10, bottom: 10, font: { fontSize: 14 }, text: 'DIRECTION', textAlign: "center", id: "__alloyId567" });

  $.__views.__alloyId566.add($.__views.__alloyId567);
  getDirection ? $.addListener($.__views.__alloyId567, 'click', getDirection) : __defers['$.__views.__alloyId567!click!getDirection'] = true;$.__views.__alloyId568 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, width: "50%", right: 0, backgroundColor: "#CC2228", id: "__alloyId568" });

  $.__views.__alloyId565.add($.__views.__alloyId568);
  call ? $.addListener($.__views.__alloyId568, 'click', call) : __defers['$.__views.__alloyId568!click!call'] = true;$.__views.__alloyId569 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", top: 10, left: 10, right: 10, bottom: 10, font: { fontSize: 14 }, text: 'CALL', textAlign: "center", id: "__alloyId569" });

  $.__views.__alloyId568.add($.__views.__alloyId569);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  var isRefresh = 1;

  var platformHeight = false ? Ti.Platform.displayCaps.platformHeight : parseInt(Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10);

  var platformWidth = false ? Ti.Platform.displayCaps.platformWidth : parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10);
  var type = "CLINIC";
  var pin_data = [{ type: "CLINIC", name: "CLINIC", icon: "/images/icons/CLINIC.png" }, { type: "HOSPITAL", name: "HOSPITAL", icon: "/images/icons/HOSPITAL.png" }, { type: "OPTICAL", name: "OPTICAL", icon: "/images/icons/OPTICAL.png" }, { type: "PHYSIOTHERAPHY", name: "PHYSIOTHERAPHY", icon: "/images/icons/CLINIC.png" }, { type: "SPECIALIST", name: "SPECIALIST", icon: "/images/icons/SPECIALIST.png" }, { type: "24HOURS", name: "24HOURS", icon: "/images/icons/24HOURS.png" }];

  $.mapview.height = platformHeight - 50;

  var distance = function (lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;
    var a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
  };

  var saveCurLoc = function (e) {
    console.log("saveCurLoc");
    if (e.error) {
      alert('Location service is disabled. ');

    } else {

      showCurLoc = true;
      Ti.App.Properties.setString('latitude', e.coords.latitude);
      Ti.App.Properties.setString('longitude', e.coords.longitude);
      $.mapview.region = { latitude: e.coords.latitude, longitude: e.coords.longitude, zoom: 12, latitudeDelta: 0.01, longitudeDelta: 0.01 };
      throttle_centerMap({ filter: true });

    }
    Ti.Geolocation.removeEventListener('location', saveCurLoc);
  };

  if (Ti.Geolocation.locationServicesEnabled) {
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
    console.log("1");
    Ti.Geolocation.addEventListener('location', saveCurLoc);
  }

  function setFilter(e) {
    $.filter_icon.width = 20;
    $.filter_icon.left = 10;

    $.filter_icon.image = e.source.record.icon;
    $.filter_text.text = e.source.record.name;
    openCategory();
    type = e.source.record.type;
    $.mapview.removeAllAnnotations();
    throttle_centerMap({ filter: true });
  }

  var skip = 0;
  var compare_lat = 0,
  compare_long = 0;
  var last_zoom_distance = 0;
  var annotations = [];

  var throttle_centerMap = _.throttle(centerMap, 2000);
  function centerMap(e) {
    if (skip <= 0) {
      skip++;
      return;
    }
    var u_id = Ti.App.Properties.getString('u_id') || "";
    var corpcode = "LHDN";
    var bounds = getMapBounds($.mapview.region);
    var zoom_distance = distance(bounds.northWest.lat, bounds.northWest.lng, bounds.southEast.lat, bounds.southEast.lng);
    console.log(last_zoom_distance + " " + zoom_distance);
    var compare_zoom_distance = last_zoom_distance.toFixed(1) != zoom_distance.toFixed(1) ? true : false;
    last_zoom_distance = zoom_distance;
    var dist = distance($.mapview.region.latitude, $.mapview.region.longitude, compare_lat, compare_long);
    if (compare_zoom_distance > 0.1) {
      console.log(dist + " zoom dist");
      annotations = [];
    }
    console.log(dist + " dist to refresh");
    console.log(e.filter);
    if (dist > 0.3 || e.filter) {
      API.callByPost({ url: "getClinicLocator3", params: { nw_latitude: bounds.northWest.lat, nw_longitude: bounds.northWest.lng, se_latitude: bounds.southEast.lat, se_longitude: bounds.southEast.lng, u_id: u_id, category: type, isRefresh: isRefresh, corpcode: corpcode } }, function (responseText) {
        if (compare_zoom_distance > 0.1) {
          $.mapview.removeAllAnnotations();
        }

        console.log(responseText);
        var result = JSON.parse(responseText);
        var data = result.data;
        for (var i = 0; i < data.length; i++) {
          var found = _.where(annotations, { id: data[i].id });
          console.log(typeof found + " typeof found");
          console.log(found.length);
          if (found.length <= 0) {
            var pin = { id: data[i].id, latitude: data[i].latitude, longitude: data[i].longitude, image: "images/icons/" + data[i].clinicType + ".png", title: data[i].clinicName, subtitle: data[i].add1 + data[i].add2, record: data[i] };
            annotations.push(pin);
            render_annotation(pin);
          }
        };
        isRefresh = 0;
      });
      compare_lat = $.mapview.region.latitude;
      compare_long = $.mapview.region.longitude;
    }
  }

  function getMapBounds(region) {
    var b = {};
    b.northWest = {};b.northEast = {};
    b.southWest = {};b.southEast = {};

    b.northWest.lat = parseFloat(region.latitude) + parseFloat(region.latitudeDelta) / 2.0;
    b.northWest.lng = parseFloat(region.longitude) - parseFloat(region.longitudeDelta) / 2.0;

    b.southWest.lat = parseFloat(region.latitude) - parseFloat(region.latitudeDelta) / 2.0;
    b.southWest.lng = parseFloat(region.longitude) - parseFloat(region.longitudeDelta) / 2.0;

    b.northEast.lat = parseFloat(region.latitude) + parseFloat(region.latitudeDelta) / 2.0;
    b.northEast.lng = parseFloat(region.longitude) + parseFloat(region.longitudeDelta) / 2.0;

    b.southEast.lat = parseFloat(region.latitude) - parseFloat(region.latitudeDelta) / 2.0;
    b.southEast.lng = parseFloat(region.longitude) + parseFloat(region.longitudeDelta) / 2.0;

    return b;
  }
  var voucher = false;
  var marker = false;
  function pinClicked(e) {
    console.log(e.annotation.record.latitude + " " + e.annotation.record.longitude);
    marker = e.annotation.record;
    $.name.text = e.annotation.record.clinicName;
    $.address.text = e.annotation.record.add1 + " " + e.annotation.record.add2 + " " + e.annotation.record.city + " " + e.annotation.record.postcode + " " + e.annotation.record.state;
    $.openHour.text = e.annotation.record.openHour.replace(/\[nl\]/g, "\n");
    $.detail.show();
  }

  function getDirection() {
    try {
      var waze_url = 'waze://?ll=' + marker.latitude + ',' + marker.longitude + '&navigate=yes';
      if (Ti.Android) {
        var intent = Ti.Android.createIntent({
          action: Ti.Android.ACTION_VIEW,
          data: waze_url });

        Ti.Android.currentActivity.startActivity(intent);
      } else {
        Ti.Platform.openURL(waze_url);
        console.log(waze_url + " here");
      }
    } catch (ex) {
      console.log(ex);
      if (false) {
        Titanium.Platform.openURL('Maps://http://maps.google.com/maps?ie=UTF8&t=h&z=16&daddr=' + marker.latitude + ',' + marker.longitude);
      } else {
        var intent = Ti.Android.createIntent({
          action: Ti.Android.ACTION_VIEW,
          data: 'geo:' + marker.latitudee + ',' + marker.longitudee + "?q=" + marker.title + " (" + marker.address + ")" });

        Ti.Android.currentActivity.startActivity(intent);
      }
    }
  }

  function call(e) {
    var tel = marker.tel;
    tel = tel.replace(/[+]/g, "");
    Ti.Platform.openURL('tel:+' + tel);
  }

  function navTo(e) {
    nav.navigateWithArgs("clinic/clinicList", { clinicType: e.source.id });

  }

  function render_annotation(annotation) {
    var ann = Alloy.Globals.Map.createAnnotation(annotation);
    $.mapview.addAnnotation(ann);
  }

  $.win.addEventListener("close", function () {
    $.destroy();
  });

  $.mapview.addEventListener("regionchanged", throttle_centerMap);
  $.mapview.addEventListener("click", pinClicked);

  function closeView() {
    $.detail.hide();
  }

  function init() {
    console.log("init");
    $.detail.hide();
    $.win.add(loading.getView());
    $.view_category.width = platformWidth;
    $.view_category.left = -platformWidth;
    console.log("init 1");
    loadPinCategory();
  }

  init();

  function loadPinCategory() {
    loading.start();
    console.log(pin_data.length);
    var arr_filter = [];
    for (var i = 0; i < pin_data.length; i++) {
      var tvr = $.UI.create("TableViewRow", { classes: ['wfill', 'hsize'], record: pin_data[i] });
      var row = $.UI.create("View", { classes: ['wsize', 'hsize'], left: 0, touchEnabled: false });
      var img_pin = $.UI.create("ImageView", { width: 30, height: 30, left: 10, image: pin_data[i].icon, touchEnabled: false });
      var lab_category_name = $.UI.create("Label", { classes: ['wsize', 'hsize'], left: 50, text: pin_data[i].name, touchEnabled: false });
      row.add(img_pin);
      row.add(lab_category_name);
      tvr.add(row);
      arr_filter.push(tvr);
    };
    $.filter_list.setData(arr_filter);
    loading.finish();
  }

  var show_category = false;
  var duration = 200;
  function openCategory() {
    console.log('openCategory');
    if (show_category) {
      moveTo = -platformWidth;
      show_category = false;
    } else {
      moveTo = "0";
      show_category = true;
    }

    $.view_category.animate({
      left: moveTo,
      duration: duration });

  }
  console.log('last');





  __defers['$.__views.__alloyId558!click!openCategory'] && $.addListener($.__views.__alloyId558, 'click', openCategory);__defers['$.__views.filter_list!click!setFilter'] && $.addListener($.__views.filter_list, 'click', setFilter);__defers['$.__views.__alloyId559!click!openCategory'] && $.addListener($.__views.__alloyId559, 'click', openCategory);__defers['$.__views.__alloyId560!click!closeView'] && $.addListener($.__views.__alloyId560, 'click', closeView);__defers['$.__views.__alloyId567!click!getDirection'] && $.addListener($.__views.__alloyId567, 'click', getDirection);__defers['$.__views.__alloyId568!click!call'] && $.addListener($.__views.__alloyId568, 'click', call);



  _.extend($, exports);
}

module.exports = Controller;