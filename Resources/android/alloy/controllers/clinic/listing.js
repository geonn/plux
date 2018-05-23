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
  this.__controllerPath = 'clinic/listing';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, width: Ti.UI.FILL, height: Ti.UI.FILL, title: "Clinic Type List", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId571 = Ti.UI.createImageView(
  { right: 10, width: 25, height: 25, image: "/images/icon_refresh.png", id: "__alloyId571" });

  doRefresh ? $.addListener($.__views.__alloyId571, 'click', doRefresh) : __defers['$.__views.__alloyId571!click!doRefresh'] = true;$.__views.win.rightNavButton = $.__views.__alloyId571;$.__views.panelListTbl = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", id: "panelListTbl" });

  $.__views.win.add($.__views.panelListTbl);
  if (true) {
    $.__views.__alloyId572 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId572" });

    $.__views.panelListTbl.add($.__views.__alloyId572);
    $.__views.__alloyId573 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId573" });

    $.__views.__alloyId572.add($.__views.__alloyId573);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId573.add($.__views.btnBack);
    $.__views.__alloyId574 = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId574" });

    $.__views.__alloyId572.add($.__views.__alloyId574);
    $.__views.pageTitle = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Clinic Type List', id: "pageTitle", textAlign: "center" });

    $.__views.__alloyId574.add($.__views.pageTitle);
    $.__views.__alloyId575 = Ti.UI.createView(
    { borderWidth: 0, right: 0, width: "20%", id: "__alloyId575" });

    $.__views.__alloyId572.add($.__views.__alloyId575);
    $.__views.__alloyId576 = Ti.UI.createImageView(
    { right: 10, width: 25, height: 25, image: "/images/icon_refresh.png", id: "__alloyId576" });

    $.__views.__alloyId575.add($.__views.__alloyId576);
    doRefresh ? $.addListener($.__views.__alloyId576, 'click', doRefresh) : __defers['$.__views.__alloyId576!click!doRefresh'] = true;}
  $.__views.tblview = Ti.UI.createTableView(
  { id: "tblview", width: Ti.UI.FILL, height: Ti.UI.FILL, top: 0 });

  $.__views.panelListTbl.add($.__views.tblview);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");
  var library = Alloy.createCollection('panelList');
  var corp = Ti.App.Properties.getString('corpcode') || "";
  var memno = Ti.App.Properties.getString('memno');
  var details;
  $.win.add(loading.getView());
  doRefresh();

  function doRefresh() {
    loading.start();
    API.loadPanelList({ clinicType: "" });
  }

  function listing() {

    var data = [];
    var arr = details;

    var counter = 0;

    if (arr.length < 1) {
      var noRecord = Ti.UI.createLabel({
        text: "No record found",
        color: '#CE1D1C',
        textAlign: 'center',
        font: { fontSize: 14, fontStyle: 'italic' },
        top: 15,
        width: Ti.UI.SIZE });

      $.panelListTbl.add(noRecord);
    } else {

      arr.forEach(function (entry) {
        var myClinicType = entry.clinicType;
        if (entry.clinicType == "hours24") {
          myClinicType = "24 HOURS";
        }
        var row = Titanium.UI.createTableViewRow({
          touchEnabled: true,
          height: 70,
          id: entry.clinicType,
          backgroundSelectedColor: "#FFE1E1",
          backgroundColor: "#ffffff" });


        var clinicImg = entry.clinicType;



        var leftImage = Titanium.UI.createView({
          backgroundImage: "/images/" + clinicImg + ".png",
          width: 50,
          height: 50,
          left: 10 });


        var popUpTitle = Titanium.UI.createLabel({
          text: myClinicType,
          font: { fontSize: 16 },
          source: entry.clinicType,
          color: "#848484",
          width: '65%',
          textAlign: 'left',
          left: 70,
          height: 25 });


        var totalPanel = Titanium.UI.createLabel({
          text: entry.total,
          source: entry.clinicType,
          font: { fontSize: 14, fontWeight: 'bold' },
          width: 'auto',
          color: "#848484",
          right: 50,
          height: 25 });


        var rightForwardBtn = Titanium.UI.createImageView({
          image: "/images/btn-forward.png",
          source: entry.clinicType,
          width: 15,
          right: 20 });


        row.add(leftImage);
        row.add(popUpTitle);
        row.add(totalPanel);
        row.add(rightForwardBtn);
        data.push(row);
      });

      $.tblview.setData(data);
    }

    loading.finish();
  }

  function init() {
    details = library.getCountClinicType(corp);
    details24 = library.getCount24Hours(corp);
    var det24 = {
      clinicType: "hours24",
      total: details24.total };


    details.splice(1, 0, det24);

    listing();
  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }

  Ti.App.addEventListener('aspClinic', init);

  $.win.addEventListener('close', function () {
    Ti.App.removeEventListener('aspClinic', init);
    details = null;
    details24 = null;
    det24 = null;
  });

  $.tblview.addEventListener('click', function (e) {
    var nav = require('navigation');

    nav.navigateWithArgs("clinic/clinicList", { clinicType: e.rowData.id });
  });





  __defers['$.__views.__alloyId571!click!doRefresh'] && $.addListener($.__views.__alloyId571, 'click', doRefresh);if (true) {
    __defers['$.__views.__alloyId576!click!doRefresh'] && $.addListener($.__views.__alloyId576, 'click', doRefresh);}




  _.extend($, exports);
}

module.exports = Controller;