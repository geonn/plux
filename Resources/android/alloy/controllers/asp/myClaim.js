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
  this.__controllerPath = 'asp/myClaim';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "My Claim Details", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId395 = Ti.UI.createView(
  { borderWidth: 0, id: "__alloyId395" });

  $.__views.win.rightNavButton = $.__views.__alloyId395;$.__views.__alloyId396 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId396" });

  $.__views.win.add($.__views.__alloyId396);
  if (true) {
    $.__views.__alloyId397 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId397" });

    $.__views.__alloyId396.add($.__views.__alloyId397);
    $.__views.__alloyId398 = Ti.UI.createView(
    { borderWidth: 0, height: Ti.UI.FILL, left: 0, width: "10%", id: "__alloyId398" });

    $.__views.__alloyId397.add($.__views.__alloyId398);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId398.add($.__views.btnBack);
    $.__views.pageTitle = Ti.UI.createView(
    { borderWidth: 0, height: Ti.UI.FILL, id: "pageTitle", width: "90%" });

    $.__views.__alloyId397.add($.__views.pageTitle);
    $.__views.__alloyId399 = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'My Claim Details', textAlign: "center", id: "__alloyId399" });

    $.__views.pageTitle.add($.__views.__alloyId399);
  }
  $.__views.claimContainer = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "claimContainer", visible: false });

  $.__views.__alloyId396.add($.__views.claimContainer);
  $.__views.main = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "main", scrollType: "vertical" });

  $.__views.claimContainer.add($.__views.main);
  $.__views.date = Ti.UI.createLabel(
  { width: Titanium.UI.SIZE, height: Titanium.UI.SIZE, color: "#eeeeee", id: "date", top: 10 });

  $.__views.main.add($.__views.date);
  $.__views.personal_claim = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "personal_claim" });

  $.__views.main.add($.__views.personal_claim);
  $.__views.insurance_info = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", id: "insurance_info", backgroundColor: "#ba65ca" });

  $.__views.main.add($.__views.insurance_info);
  $.__views.__alloyId400 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, backgroundColor: "#ffffff", top: 5, id: "__alloyId400" });

  $.__views.insurance_info.add($.__views.__alloyId400);
  $.__views.__alloyId401 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId401" });

  $.__views.__alloyId400.add($.__views.__alloyId401);
  $.__views.__alloyId402 = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 14, fontWeight: "bold" }, text: 'INSURANCE INFO', left: 10, id: "__alloyId402" });

  $.__views.__alloyId401.add($.__views.__alloyId402);
  $.__views.InsPlanUrl = Ti.UI.createView(
  { borderWidth: 2, borderColor: "#e8534c", backgroundColor: "#FFFFFF", zIndex: 10, top: 10, width: 60, height: 60, borderRadius: 30, right: 10, id: "InsPlanUrl" });

  $.__views.__alloyId401.add($.__views.InsPlanUrl);
  openPdf ? $.addListener($.__views.InsPlanUrl, 'click', openPdf) : __defers['$.__views.InsPlanUrl!click!openPdf'] = true;$.__views.__alloyId403 = Ti.UI.createImageView(
  { touchEnabled: false, width: 60, height: 60, image: "/images/pdficon.png", id: "__alloyId403" });

  $.__views.InsPlanUrl.add($.__views.__alloyId403);
  $.__views.__alloyId404 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId404" });

  $.__views.__alloyId400.add($.__views.__alloyId404);
  $.__views.__alloyId405 = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, left: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId405" });

  $.__views.__alloyId404.add($.__views.__alloyId405);
  $.__views.__alloyId406 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId406" });

  $.__views.__alloyId404.add($.__views.__alloyId406);
  $.__views.__alloyId407 = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, right: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId407" });

  $.__views.__alloyId404.add($.__views.__alloyId407);
  $.__views.__alloyId408 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId408" });

  $.__views.__alloyId400.add($.__views.__alloyId408);
  $.__views.__alloyId409 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId409" });

  $.__views.__alloyId408.add($.__views.__alloyId409);
  $.__views.__alloyId410 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId410" });

  $.__views.__alloyId409.add($.__views.__alloyId410);
  $.__views.__alloyId411 = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12 }, text: 'EMPLOYEE INSURED', left: 0, id: "__alloyId411" });

  $.__views.__alloyId410.add($.__views.__alloyId411);
  $.__views.EmpIns = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12, fontWeight: "bold" }, left: 0, id: "EmpIns", minimumFontSize: 10 });

  $.__views.__alloyId410.add($.__views.EmpIns);
  $.__views.__alloyId412 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId412" });

  $.__views.__alloyId409.add($.__views.__alloyId412);
  $.__views.__alloyId413 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId413" });

  $.__views.__alloyId409.add($.__views.__alloyId413);
  $.__views.__alloyId414 = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12 }, text: 'SPOUSE INSURED', left: 0, id: "__alloyId414" });

  $.__views.__alloyId413.add($.__views.__alloyId414);
  $.__views.SpouseIns = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12, fontWeight: "bold" }, left: 0, id: "SpouseIns", minimumFontSize: 10 });

  $.__views.__alloyId413.add($.__views.SpouseIns);
  $.__views.__alloyId415 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId415" });

  $.__views.__alloyId408.add($.__views.__alloyId415);
  $.__views.__alloyId416 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId416" });

  $.__views.__alloyId408.add($.__views.__alloyId416);
  $.__views.__alloyId417 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId417" });

  $.__views.__alloyId416.add($.__views.__alloyId417);
  $.__views.__alloyId418 = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12 }, text: 'CHILD INSURED', left: 0, id: "__alloyId418" });

  $.__views.__alloyId417.add($.__views.__alloyId418);
  $.__views.ChildIns = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12, fontWeight: "bold" }, left: 0, id: "ChildIns", minimumFontSize: 10 });

  $.__views.__alloyId417.add($.__views.ChildIns);
  $.__views.__alloyId419 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId419" });

  $.__views.__alloyId416.add($.__views.__alloyId419);
  $.__views.__alloyId420 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId420" });

  $.__views.__alloyId416.add($.__views.__alloyId420);
  $.__views.__alloyId421 = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12 }, text: 'INSURANCE PLAN', left: 0, id: "__alloyId421" });

  $.__views.__alloyId420.add($.__views.__alloyId421);
  $.__views.InsPlan = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12, fontWeight: "bold" }, left: 0, id: "InsPlan", minimumFontSize: 10 });

  $.__views.__alloyId420.add($.__views.InsPlan);
  $.__views.__alloyId422 = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId422" });

  $.__views.__alloyId408.add($.__views.__alloyId422);
  $.__views.__alloyId423 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.SIZE, height: 40, top: 5, id: "__alloyId423" });

  $.__views.__alloyId408.add($.__views.__alloyId423);
  $.__views.__alloyId424 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12 }, text: 'ADDITIONAL INFORMATION', id: "__alloyId424" });

  $.__views.__alloyId423.add($.__views.__alloyId424);
  $.__views.AddIns = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: 12, fontWeight: "bold" }, id: "AddIns", minimumFontSize: 10 });

  $.__views.__alloyId423.add($.__views.AddIns);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var loading = Alloy.createController("loading");

  $.win.add(loading.getView());
  loading.start();

  loadPage();

  function loadPage() {
    $.insurance_info.hide();
    var isver = Ti.App.Properties.getString('isver');
    var corpcode = Ti.App.Properties.getString('corpcode');
    var memno = Ti.App.Properties.getString('memno');
    var empno = Ti.App.Properties.getString('empno');
    console.log(isver + " " + corpcode + " " + memno + " " + empno);
    if (isver == "true" || isver > 0) {
      $.claimContainer.show();

      callbyget({ url: "balchk.aspx", params: "MEMNO=" + memno + "&CORPCODE=" + corpcode, callback: init });
      var params = "EMPNO=" + empno + "&CORPCODE=" + corpcode;
      callbyget({ url: "ifins.aspx", params: params, callback: loadIfins });

    } else {
      loading.finish();
    }
  }

  function callbyget(e) {
    API.callByGet({ url: e.url, params: e.params }, {
      onload: function (responseText) {
        var res = JSON.parse(responseText);
        if (res.length == null || res.length <= 0) {
          if (e.url == "balchk.aspx") {
            var row = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding', 'rounded'], bottom: 0, backgroundColor: "#fff" });
            var view_container = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding'], touchEnabled: false });
            var label = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h5'], textAlign: "center", text: "No Entitlement found" });
            row.add(view_container);
            view_container.add(label);
            $.personal_claim.add(row);
          }
        } else if (typeof res[0] !== "undefined" && typeof res[0].message !== "undefined") {

          common.createAlert(res[0].message);
        } else {
          e.callback(res || []);
        }
      }, onfinish: function () {
        if (e.url == "balchk.aspx") {
          loading.finish();
        }
      }, onerror: function () {
        $.win.close();
      } });

  }

  Ti.App.addEventListener("data_loaded", init);

  function loadIfins(ifins) {
    ifins = ifins[0];
    console.log(ifins);
    $.EmpIns.text = ifins.EmpIns;
    $.SpouseIns.text = ifins.SpouseIns;
    $.ChildIns.text = ifins.ChildIns;
    $.InsPlan.text = ifins.InsPlan;
    $.AddIns.text = ifins.AddIns;
    $.InsPlanUrl.InsPlanUrl = ifins.InsPlanUrl;
    $.insurance_info.show();
  }

  function openPdf(e) {
    if (false) {
      var win = Alloy.createController("webview", { url: encodeURI(e.source.InsPlanUrl) }).getView();
      win.open();
    } else {
      var url = e.source.InsPlanUrl;
      var PDF = require('pdf');
      PDF.createPdf(url, true, "", "", "", function (err, file, base, url) {
        PDF.android_launch(file);
      });
    }
  }

  function init(e) {

    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (e == "") {
      alert("No records found");
      return false;
    }
    $.date.text = timeFormat(currentDateTime());

    var groups = {};
    var balance_groups = {};
    var balance_user_groups = {};
    for (var i = 0; i < e.length; i++) {
      var val = e[i];

      groups[val.name] = groups[val.name] || [];
      groups[val.name].push(val);
    }

    Object.keys(groups).map(function (group) {
      var personal_claim_view = Alloy.createController("asp/_personal_claim_view", { data: groups[group], name: group }).getView();
      $.personal_claim.add(personal_claim_view);
    });
    loading.finish();
  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }

  $.win.addEventListener("close", function () {
    $.destroy();
  });





  __defers['$.__views.InsPlanUrl!click!openPdf'] && $.addListener($.__views.InsPlanUrl, 'click', openPdf);



  _.extend($, exports);
}

module.exports = Controller;