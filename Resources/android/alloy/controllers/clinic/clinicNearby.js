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
  this.__controllerPath = 'clinic/clinicNearby';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  $.__views.clinicNearby = Ti.UI.createWindow({ backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Clinic Nearby", id: "clinicNearby", backButtonTitle: "", navTintColor: "#CE1D1C" });
  $.__views.clinicNearby && $.addTopLevelView($.__views.clinicNearby);
  $.__views.win_map = Ti.UI.createView({ id: "win_map", layout: "vertical" });
  $.__views.clinicNearby.add($.__views.win_map);
  if (true) {
    $.__views.__alloyId391 = Ti.UI.createView({ layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId391" });
    $.__views.win_map.add($.__views.__alloyId391);
    $.__views.__alloyId392 = Ti.UI.createView({ left: 0, width: "20%", id: "__alloyId392" });
    $.__views.__alloyId391.add($.__views.__alloyId392);
    $.__views.btnBack = Ti.UI.createImageView({ left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });
    $.__views.__alloyId392.add($.__views.btnBack);
    $.__views.__alloyId393 = Ti.UI.createView({ width: "60%", id: "__alloyId393" });
    $.__views.__alloyId391.add($.__views.__alloyId393);
    $.__views.pageTitle = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontSize: "16dp" }, text: 'Clinic Nearby', id: "pageTitle", textAlign: "center" });
    $.__views.__alloyId393.add($.__views.pageTitle);
  }
  $.__views.clinicNearbySv = Ti.UI.createScrollView({ id: "clinicNearbySv" });
  $.__views.win_map.add($.__views.clinicNearbySv);
  $.__views.loadingBar = Ti.UI.createView({ layout: "vertical", id: "loadingBar", height: 120, width: 120, borderRadius: 15, backgroundColor: "#2E2E2E" });
  $.__views.clinicNearby.add($.__views.loadingBar);
  $.__views.activityIndicator = Ti.UI.createActivityIndicator({ top: 10, left: 30, width: 60, id: "activityIndicator" });
  $.__views.loadingBar.add($.__views.activityIndicator);
  $.__views.__alloyId394 = Ti.UI.createLabel({ width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#ffffff", top: 5, bottom: 10, text: "Loading", id: "__alloyId394" });
  $.__views.loadingBar.add($.__views.__alloyId394);
  exports.destroy = function () {};

  _.extend($, $.__views);

  var args = arguments[0] || {};
  var longitude = args.longitude || "";
  var latitude = args.latitude || "";
  var clinicType = args.clinicType || "";
  var corp = Ti.App.Properties.getString('corpcode');
  var library = Alloy.createCollection('panelList');
  var list;
  var details;
  var aspClinicArr = [];

  if (corp != "") {
    loadClinic();
  } else {
    list = API.getNearbyClinic({ longitude: longitude, latitude: latitude, clinicType: clinicType });
  }

  function loadClinic() {
    if (clinicType == "hours24") {
      details = library.getPanelBy24Hours("", corp);
    } else {
      details = library.getPanelByClinicType(clinicType, "", corp);
    }
    if (details) {
      details.forEach(function (d) {
        aspClinicArr.push(d.id);
      });
    }
    API.getNearbyClinic({ longitude: longitude, latitude: latitude, clinicType: clinicType });
  }

  common.construct($);
  common.showLoading();
  Ti.App.addEventListener('updateNearbyList', listing);

  function listing(e) {

    var TheTable = Titanium.UI.createTableView({
      width: '100%',
      height: 'auto'
    });

    var data = [];

    var arr = e.data;
    var counter = 0;
    if (arr.length < 1) {
      var noRecord = Ti.UI.createLabel({
        text: "No clinic found nearby",
        color: '#CE1D1C',
        textAlign: 'center',
        font: { fontSize: 14, fontStyle: 'italic' },
        top: 15,
        width: Ti.UI.SIZE
      });
      $.clinicNearbySv.add(noRecord);
    } else {
      console.log(arr.length);
      arr.forEach(function (entry) {
        var isValid = aspClinicArr.indexOf(entry.id);
        if (isValid != "-1" || corp == "") {
          var row = Titanium.UI.createTableViewRow({
            touchEnabled: true,
            height: Ti.UI.SIZE,
            source: entry.id,
            selectedBackgroundColor: "#FFE1E1"

          });

          var contentView = Ti.UI.createView({
            layout: "vertical",
            height: Ti.UI.SIZE,
            width: Ti.UI.FILL
          });

          var clinicLbl = Titanium.UI.createLabel({
            text: entry.clinicname,
            font: { fontSize: 16 },
            source: entry.id,
            color: "#CE1D1C",
            textAlign: 'left',
            top: 5,
            left: 15,
            width: "80%",
            height: Ti.UI.SIZE
          });
          contentView.add(clinicLbl);

          var mobileLbl = Titanium.UI.createLabel({
            text: "Tel: " + entry.tel,
            font: { fontSize: 14 },
            source: entry.id,
            color: "#848484",
            textAlign: 'left',
            left: 15,
            height: Ti.UI.SIZE
          });
          contentView.add(mobileLbl);

          var distLbl = Titanium.UI.createLabel({
            text: "Within " + entry.distance,
            font: { fontSize: 14 },
            source: entry.id,
            color: "#848484",
            textAlign: 'left',
            left: 15,
            bottom: 5,
            height: Ti.UI.SIZE
          });
          contentView.add(distLbl);

          var rightForwardBtn = Titanium.UI.createImageView({
            image: "/images/btn-forward.png",
            source: entry.id,
            width: 15,
            right: 20
          });

          row.add(contentView);
          row.add(rightForwardBtn);
          data.push(row);
        }
      });

      TheTable.setData(data);
      $.clinicNearbySv.add(TheTable);
    }
    common.hideLoading();
    TheTable.addEventListener('click', function (e) {
      nav.navigateWithArgs("clinic/clinicDetails", { panel_id: e.rowData.source });
    });
  }

  $.clinicNearby.addEventListener("close", function () {
    Ti.App.removeEventListener('updateNearbyList', listing);
    $.destroy();
    console.log("window close");
  });

  _.extend($, exports);
}

module.exports = Controller;