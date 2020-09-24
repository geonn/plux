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
  this.__controllerPath = 'asp/claimDetail';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};

  // Generated code that must be executed before all UI and/or
  // controller code. One example is all model and collection
  // declarations from markup.


  // Generated UI code
  $.__views["win"] = Ti.UI.createWindow(
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Claim Detail", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["main"] = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical" });

  $.__views["win"].add($.__views["main"]);
  if (true) {
    $.__views["__alloyId225"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId225" });

    $.__views["main"].add($.__views["__alloyId225"]);
    $.__views["__alloyId226"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId226" });

    $.__views["__alloyId225"].add($.__views["__alloyId226"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId226"].add($.__views["btnBack"]);
    $.__views["__alloyId227"] = Ti.UI.createView(
    { borderWidth: 0, width: "70%", id: "__alloyId227" });

    $.__views["__alloyId225"].add($.__views["__alloyId227"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Claim Detail', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId227"].add($.__views["pageTitle"]);
    $.__views["__alloyId228"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "auto", id: "__alloyId228" });

    $.__views["__alloyId225"].add($.__views["__alloyId228"]);
    openReceipt ? $.addListener($.__views["__alloyId228"], 'click', openReceipt) : __defers['$.__views["__alloyId228"]!click!openReceipt'] = true;$.__views["recepit"] = Ti.UI.createLabel(
    { width: "auto", height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial" }, text: 'Receipt', id: "recepit" });

    $.__views["__alloyId228"].add($.__views["recepit"]);
  }
  $.__views["__alloyId229"] = Ti.UI.createScrollView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "__alloyId229" });

  $.__views["main"].add($.__views["__alloyId229"]);
  $.__views["__alloyId230"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, height: Ti.UI.SIZE, borderRadius: "5", backgroundColor: "#ba65ca", id: "__alloyId230" });

  $.__views["__alloyId229"].add($.__views["__alloyId230"]);
  $.__views["status_view"] = Ti.UI.createView(
  { borderWidth: 2, borderColor: "#55a939", backgroundColor: "#FFFFFF", zIndex: 10, top: 10, width: 120, height: 120, borderRadius: 30, right: 10, id: "status_view" });

  $.__views["__alloyId230"].add($.__views["status_view"]);
  $.__views["status"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#55a939", font: { fontFamily: "Roboto-Bold", fontSize: 11 }, touchEnabled: false, transform: Ti.UI.create2DMatrix({ rotate: -45 }), minimumFontSize: 10, id: "status" });

  $.__views["status_view"].add($.__views["status"]);
  $.__views["__alloyId231"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, backgroundColor: "#ffffff", top: 5, id: "__alloyId231" });

  $.__views["__alloyId230"].add($.__views["__alloyId231"]);
  $.__views["__alloyId232"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId232" });

  $.__views["__alloyId231"].add($.__views["__alloyId232"]);
  $.__views["__alloyId233"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.SIZE, height: 40, id: "__alloyId233" });

  $.__views["__alloyId232"].add($.__views["__alloyId233"]);
  $.__views["__alloyId234"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'NAME', id: "__alloyId234" });

  $.__views["__alloyId233"].add($.__views["__alloyId234"]);
  $.__views["name"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, id: "name", minimumFontSize: 10 });

  $.__views["__alloyId233"].add($.__views["name"]);
  $.__views["__alloyId235"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId235" });

  $.__views["__alloyId232"].add($.__views["__alloyId235"]);
  $.__views["__alloyId236"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId236" });

  $.__views["__alloyId232"].add($.__views["__alloyId236"]);
  $.__views["__alloyId237"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "30%", height: Ti.UI.FILL, top: 5, id: "__alloyId237" });

  $.__views["__alloyId236"].add($.__views["__alloyId237"]);
  $.__views["__alloyId238"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'CATEGORY', left: 0, id: "__alloyId238" });

  $.__views["__alloyId237"].add($.__views["__alloyId238"]);
  $.__views["category"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "category", minimumFontSize: 10 });

  $.__views["__alloyId237"].add($.__views["category"]);
  $.__views["__alloyId239"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId239" });

  $.__views["__alloyId236"].add($.__views["__alloyId239"]);
  $.__views["__alloyId240"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "30%", height: Ti.UI.FILL, top: 5, id: "__alloyId240" });

  $.__views["__alloyId236"].add($.__views["__alloyId240"]);
  $.__views["__alloyId241"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'CLAIM TYPE', left: 0, id: "__alloyId241" });

  $.__views["__alloyId240"].add($.__views["__alloyId241"]);
  $.__views["claimtype"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "claimtype", minimumFontSize: 10 });

  $.__views["__alloyId240"].add($.__views["claimtype"]);
  $.__views["__alloyId242"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId242" });

  $.__views["__alloyId236"].add($.__views["__alloyId242"]);
  $.__views["__alloyId243"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "20%", height: Ti.UI.FILL, top: 5, id: "__alloyId243" });

  $.__views["__alloyId236"].add($.__views["__alloyId243"]);
  $.__views["__alloyId244"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'MC', left: 0, id: "__alloyId244" });

  $.__views["__alloyId243"].add($.__views["__alloyId244"]);
  $.__views["mcdays"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "mcdays", minimumFontSize: 10 });

  $.__views["__alloyId243"].add($.__views["mcdays"]);
  $.__views["__alloyId245"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId245" });

  $.__views["__alloyId232"].add($.__views["__alloyId245"]);
  $.__views["__alloyId246"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId246" });

  $.__views["__alloyId232"].add($.__views["__alloyId246"]);
  $.__views["__alloyId247"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId247" });

  $.__views["__alloyId246"].add($.__views["__alloyId247"]);
  $.__views["__alloyId248"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'MEMBER NUMBER', left: 0, id: "__alloyId248" });

  $.__views["__alloyId247"].add($.__views["__alloyId248"]);
  $.__views["memno"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "memno", minimumFontSize: 10 });

  $.__views["__alloyId247"].add($.__views["memno"]);
  $.__views["__alloyId249"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId249" });

  $.__views["__alloyId246"].add($.__views["__alloyId249"]);
  $.__views["__alloyId250"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId250" });

  $.__views["__alloyId246"].add($.__views["__alloyId250"]);
  $.__views["__alloyId251"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'DATE', left: 0, id: "__alloyId251" });

  $.__views["__alloyId250"].add($.__views["__alloyId251"]);
  $.__views["visitdate"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, left: 0, id: "visitdate", minimumFontSize: 10 });

  $.__views["__alloyId250"].add($.__views["visitdate"]);
  $.__views["__alloyId252"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId252" });

  $.__views["__alloyId232"].add($.__views["__alloyId252"]);
  $.__views["clinicname"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#f58505", font: { fontFamily: "Roboto-Bold", fontSize: 24 }, top: 10, left: 10, right: 10, bottom: 0, id: "clinicname", textAlign: "center", minimumFontSize: 10 });

  $.__views["__alloyId232"].add($.__views["clinicname"]);
  $.__views["__alloyId253"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId253" });

  $.__views["__alloyId231"].add($.__views["__alloyId253"]);
  $.__views["__alloyId254"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId254" });

  $.__views["__alloyId253"].add($.__views["__alloyId254"]);
  $.__views["__alloyId255"] = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, left: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId255" });

  $.__views["__alloyId254"].add($.__views["__alloyId255"]);
  $.__views["__alloyId256"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId256" });

  $.__views["__alloyId254"].add($.__views["__alloyId256"]);
  $.__views["__alloyId257"] = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, right: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId257" });

  $.__views["__alloyId254"].add($.__views["__alloyId257"]);
  $.__views["__alloyId258"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId258" });

  $.__views["__alloyId231"].add($.__views["__alloyId258"]);
  $.__views["__alloyId259"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, top: 0, bottom: 10, id: "__alloyId259" });

  $.__views["__alloyId258"].add($.__views["__alloyId259"]);
  $.__views["__alloyId260"] = Ti.UI.createLabel(
  { width: "50%", height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'TOTAL AMOUNT', textAlign: "center", left: 0, id: "__alloyId260" });

  $.__views["__alloyId259"].add($.__views["__alloyId260"]);
  $.__views["amount"] = Ti.UI.createLabel(
  { width: "48%", height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 16 }, text: 'RM', textAlign: "left", right: 0, id: "amount", minimumFontSize: 10 });

  $.__views["__alloyId259"].add($.__views["amount"]);
  $.__views["__alloyId261"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId261" });

  $.__views["__alloyId258"].add($.__views["__alloyId261"]);
  $.__views["__alloyId262"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId262" });

  $.__views["__alloyId261"].add($.__views["__alloyId262"]);
  $.__views["__alloyId263"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'CONSULTATION', touchEnabled: false, left: 0, id: "__alloyId263" });

  $.__views["__alloyId262"].add($.__views["__alloyId263"]);
  $.__views["consultation_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', touchEnabled: false, left: 0, id: "consultation_amt", minimumFontSize: 10 });

  $.__views["__alloyId262"].add($.__views["consultation_amt"]);
  $.__views["__alloyId264"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId264" });

  $.__views["__alloyId261"].add($.__views["__alloyId264"]);
  $.__views["__alloyId265"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId265" });

  $.__views["__alloyId261"].add($.__views["__alloyId265"]);
  view_detail ? $.addListener($.__views["__alloyId265"], 'click', view_detail) : __defers['$.__views["__alloyId265"]!click!view_detail'] = true;$.__views["__alloyId266"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'MEDICATION', touchEnabled: false, left: 0, id: "__alloyId266" });

  $.__views["__alloyId265"].add($.__views["__alloyId266"]);
  $.__views["medication_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', touchEnabled: false, left: 0, id: "medication_amt", minimumFontSize: 10 });

  $.__views["__alloyId265"].add($.__views["medication_amt"]);
  $.__views["__alloyId267"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId267" });

  $.__views["__alloyId258"].add($.__views["__alloyId267"]);
  $.__views["__alloyId268"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId268" });

  $.__views["__alloyId267"].add($.__views["__alloyId268"]);
  view_detail ? $.addListener($.__views["__alloyId268"], 'click', view_detail) : __defers['$.__views["__alloyId268"]!click!view_detail'] = true;$.__views["__alloyId269"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'INJECTION', touchEnabled: false, left: 0, id: "__alloyId269" });

  $.__views["__alloyId268"].add($.__views["__alloyId269"]);
  $.__views["injection_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', touchEnabled: false, left: 0, id: "injection_amt", minimumFontSize: 10 });

  $.__views["__alloyId268"].add($.__views["injection_amt"]);
  $.__views["__alloyId270"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId270" });

  $.__views["__alloyId267"].add($.__views["__alloyId270"]);
  $.__views["__alloyId271"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId271" });

  $.__views["__alloyId267"].add($.__views["__alloyId271"]);
  view_detail ? $.addListener($.__views["__alloyId271"], 'click', view_detail) : __defers['$.__views["__alloyId271"]!click!view_detail'] = true;$.__views["__alloyId272"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'LAB TEST', touchEnabled: false, left: 0, id: "__alloyId272" });

  $.__views["__alloyId271"].add($.__views["__alloyId272"]);
  $.__views["labtest_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', touchEnabled: false, left: 0, id: "labtest_amt", minimumFontSize: 10 });

  $.__views["__alloyId271"].add($.__views["labtest_amt"]);
  $.__views["__alloyId273"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId273" });

  $.__views["__alloyId258"].add($.__views["__alloyId273"]);
  $.__views["__alloyId274"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId274" });

  $.__views["__alloyId273"].add($.__views["__alloyId274"]);
  view_detail ? $.addListener($.__views["__alloyId274"], 'click', view_detail) : __defers['$.__views["__alloyId274"]!click!view_detail'] = true;$.__views["__alloyId275"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'X-RAY', touchEnabled: false, left: 0, id: "__alloyId275" });

  $.__views["__alloyId274"].add($.__views["__alloyId275"]);
  $.__views["xray_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', touchEnabled: false, id: "xray_amt", left: 0, minimumFontSize: 10 });

  $.__views["__alloyId274"].add($.__views["xray_amt"]);
  $.__views["__alloyId276"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId276" });

  $.__views["__alloyId273"].add($.__views["__alloyId276"]);
  $.__views["__alloyId277"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId277" });

  $.__views["__alloyId273"].add($.__views["__alloyId277"]);
  view_detail ? $.addListener($.__views["__alloyId277"], 'click', view_detail) : __defers['$.__views["__alloyId277"]!click!view_detail'] = true;$.__views["__alloyId278"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'SURGICAL', touchEnabled: false, left: 0, id: "__alloyId278" });

  $.__views["__alloyId277"].add($.__views["__alloyId278"]);
  $.__views["surgical_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', touchEnabled: false, left: 0, id: "surgical_amt", minimumFontSize: 10 });

  $.__views["__alloyId277"].add($.__views["surgical_amt"]);
  $.__views["__alloyId279"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId279" });

  $.__views["__alloyId258"].add($.__views["__alloyId279"]);
  $.__views["__alloyId280"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId280" });

  $.__views["__alloyId279"].add($.__views["__alloyId280"]);
  $.__views["__alloyId281"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'EXTRACTION', left: 0, id: "__alloyId281" });

  $.__views["__alloyId280"].add($.__views["__alloyId281"]);
  $.__views["extraction_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', left: 0, id: "extraction_amt", minimumFontSize: 10 });

  $.__views["__alloyId280"].add($.__views["extraction_amt"]);
  $.__views["__alloyId282"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId282" });

  $.__views["__alloyId279"].add($.__views["__alloyId282"]);
  $.__views["__alloyId283"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId283" });

  $.__views["__alloyId279"].add($.__views["__alloyId283"]);
  $.__views["__alloyId284"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'FILLINGS', left: 0, id: "__alloyId284" });

  $.__views["__alloyId283"].add($.__views["__alloyId284"]);
  $.__views["fillings_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', left: 0, id: "fillings_amt", minimumFontSize: 10 });

  $.__views["__alloyId283"].add($.__views["fillings_amt"]);
  $.__views["__alloyId285"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 40, id: "__alloyId285" });

  $.__views["__alloyId258"].add($.__views["__alloyId285"]);
  $.__views["__alloyId286"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId286" });

  $.__views["__alloyId285"].add($.__views["__alloyId286"]);
  $.__views["__alloyId287"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'SCALLING', left: 0, id: "__alloyId287" });

  $.__views["__alloyId286"].add($.__views["__alloyId287"]);
  $.__views["scaling_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', left: 0, id: "scaling_amt", minimumFontSize: 10 });

  $.__views["__alloyId286"].add($.__views["scaling_amt"]);
  $.__views["__alloyId288"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId288" });

  $.__views["__alloyId285"].add($.__views["__alloyId288"]);
  $.__views["__alloyId289"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.FILL, top: 5, id: "__alloyId289" });

  $.__views["__alloyId285"].add($.__views["__alloyId289"]);
  $.__views["__alloyId290"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'OTHERS', left: 0, id: "__alloyId290" });

  $.__views["__alloyId289"].add($.__views["__alloyId290"]);
  $.__views["others_amt"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, text: 'RM', left: 0, id: "others_amt", minimumFontSize: 10 });

  $.__views["__alloyId289"].add($.__views["others_amt"]);
  $.__views["__alloyId291"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId291" });

  $.__views["__alloyId231"].add($.__views["__alloyId291"]);
  $.__views["__alloyId292"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId292" });

  $.__views["__alloyId291"].add($.__views["__alloyId292"]);
  $.__views["__alloyId293"] = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, left: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId293" });

  $.__views["__alloyId292"].add($.__views["__alloyId293"]);
  $.__views["__alloyId294"] = Ti.UI.createView(
  { borderWidth: 0, width: Titanium.UI.FILL, height: 1, backgroundColor: "#eee", id: "__alloyId294" });

  $.__views["__alloyId292"].add($.__views["__alloyId294"]);
  $.__views["__alloyId295"] = Ti.UI.createView(
  { borderWidth: 0, width: 30, height: 30, zIndex: 2, right: -20, borderRadius: 15, backgroundColor: "#535a74", id: "__alloyId295" });

  $.__views["__alloyId292"].add($.__views["__alloyId295"]);
  $.__views["__alloyId296"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId296" });

  $.__views["__alloyId231"].add($.__views["__alloyId296"]);
  $.__views["__alloyId297"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, top: 5, id: "__alloyId297" });

  $.__views["__alloyId296"].add($.__views["__alloyId297"]);
  $.__views["__alloyId298"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'DIAGNOSIS', left: 0, id: "__alloyId298" });

  $.__views["__alloyId297"].add($.__views["__alloyId298"]);
  $.__views["diagnosis"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, id: "diagnosis", left: 0 });

  $.__views["__alloyId297"].add($.__views["diagnosis"]);
  $.__views["__alloyId299"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, id: "__alloyId299" });

  $.__views["__alloyId296"].add($.__views["__alloyId299"]);
  $.__views["__alloyId300"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.SIZE, top: 5, id: "__alloyId300" });

  $.__views["__alloyId299"].add($.__views["__alloyId300"]);
  $.__views["__alloyId301"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'BLOOD PRESSURE SYSTOLIC', left: 0, id: "__alloyId301" });

  $.__views["__alloyId300"].add($.__views["__alloyId301"]);
  $.__views["bps"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, id: "bps", left: 0, minimumFontSize: 10 });

  $.__views["__alloyId300"].add($.__views["bps"]);
  $.__views["__alloyId302"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, height: Ti.UI.FILL, width: 1, backgroundColor: "#eeeeee", id: "__alloyId302" });

  $.__views["__alloyId299"].add($.__views["__alloyId302"]);
  $.__views["__alloyId303"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: "45%", height: Ti.UI.SIZE, top: 5, id: "__alloyId303" });

  $.__views["__alloyId299"].add($.__views["__alloyId303"]);
  $.__views["__alloyId304"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'BLOOD PRESSURE DIATOLIC', left: 0, id: "__alloyId304" });

  $.__views["__alloyId303"].add($.__views["__alloyId304"]);
  $.__views["bpd"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, id: "bpd", left: 0, minimumFontSize: 10 });

  $.__views["__alloyId303"].add($.__views["bpd"]);
  $.__views["__alloyId305"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId305" });

  $.__views["__alloyId296"].add($.__views["__alloyId305"]);
  $.__views["__alloyId306"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, left: 0, width: "45%", top: 5, id: "__alloyId306" });

  $.__views["__alloyId305"].add($.__views["__alloyId306"]);
  $.__views["__alloyId307"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, text: 'PULSE RATE', left: 0, id: "__alloyId307" });

  $.__views["__alloyId306"].add($.__views["__alloyId307"]);
  $.__views["pulse"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, id: "pulse", left: 0, minimumFontSize: 10 });

  $.__views["__alloyId306"].add($.__views["pulse"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var arg_serial = typeof args.serial != "undefined" ? args.serial : 0;
  var loading = Alloy.createController("loading");
  var img_path = "";
  console.log(args);
  if (args.rcpfile != "") {
    img_path = "http://ereceipt.aspmedic.com/ereceipt/" + args.rcpfile;
    console.log('yes');
  } else if (args.appcode.charAt(0) != "T") {
    if (false) {
      $.win.setRightNavButton(null);
    } else {
      $.recepit.hide();
    }
  } else {
    img_path = "https://tslip.aspmedic.com/" + args.appcode + ".png";
  }
  console.log(img_path);



  function init() {
    $.win.add(loading.getView());
    $.status_view.opacity = 0;
    loading.start();
    loadBasicInfo();
    Alloy.Globals.API.callByGet({ url: "claimdetails.aspx", params: "SERIAL=" + arg_serial }, {
      onload: function (responseText) {
        var res = JSON.parse(responseText);
        if (res.length == null || res.length <= 0) {
        } else if (typeof res[0] !== "undefined" && typeof res[0].message !== "undefined") {
          Alloy.Globals.common.createAlert(res[0].message);
        } else {
          loadDetail(res[0] || []);
        }
      }, onfinish: function () {
        loading.finish();
      }, onerror: function () {
        $.win.close();
      } });

    // Alloy.Globals.API.claimDetailBySeries({serial : arg_serial}, loadDetail);
  }

  init();

  function loadBasicInfo() {
    var indicator_bg_color = args.status == "Pending" ? "#fba81c" : args.status == "Approved" ? "#55a939" : "#e8534c";
    $.status_view.borderColor = indicator_bg_color;
    $.status.color = indicator_bg_color;

    var key_to_load = ['status', 'name', 'category', 'claimtype', 'mcdays', 'memno', 'visitdate', 'clinicname', 'amount'];
    for (var i = 0; i < key_to_load.length; i++) {
      // var text = ;
      $[key_to_load[i]].text = args[key_to_load[i]] ? ($[key_to_load[i]].text || "") + " " + args[key_to_load[i]] : "-";
    };
  }

  function loadDetail(data) {
    if (typeof data == "undefined") {
      $.status_view.animate({ height: 60, width: 60, opacity: 1, duration: 500 });
      loading.finish();
      return;
    }
    var key_to_load = ['medication_amt', 'injection_amt', 'labtest_amt', 'xray_amt', 'surgical_amt', 'extraction_amt', 'fillings_amt', 'scaling_amt', 'others_amt', 'bps', 'bpd', 'pulse', 'diagnosis', 'consultation_amt'];
    for (var i = 0; i < key_to_load.length; i++) {
      // $[key_to_load[i]].text = args[key_to_load[i]] || $[key_to_load[i]].text;
      if (typeof data[key_to_load[i]] != "undefined") {
        $[key_to_load[i]].parent.data = data[key_to_load[i].slice(0, -4)];
        $[key_to_load[i]].text = data[key_to_load[i]] ? ($[key_to_load[i]].text || "") + " " + data[key_to_load[i]] : "-";
      }
    };
    $.status_view.animate({ height: 60, width: 60, opacity: 1, duration: 500 });
    loading.finish();
  }

  function view_detail(e) {
    e.source.backgroundColor = "#f58505";
    e.source.animate({ backgroundColor: "#fff", duration: 500 });
    if (e.source.data != "" && typeof e.source.data != "undefined") {
      alert(e.source.data);
    }
  }

  function openReceipt() {
    console.log(img_path);
    Alloy.Globals.common.lightbox({ img_path: img_path }, $.win);
  }

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  $.win.addEventListener("close", function () {
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  if (true) {
    __defers['$.__views["__alloyId228"]!click!openReceipt'] && $.addListener($.__views["__alloyId228"], 'click', openReceipt);}
  __defers['$.__views["__alloyId265"]!click!view_detail'] && $.addListener($.__views["__alloyId265"], 'click', view_detail);__defers['$.__views["__alloyId268"]!click!view_detail'] && $.addListener($.__views["__alloyId268"], 'click', view_detail);__defers['$.__views["__alloyId271"]!click!view_detail'] && $.addListener($.__views["__alloyId271"], 'click', view_detail);__defers['$.__views["__alloyId274"]!click!view_detail'] && $.addListener($.__views["__alloyId274"], 'click', view_detail);__defers['$.__views["__alloyId277"]!click!view_detail'] && $.addListener($.__views["__alloyId277"], 'click', view_detail);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\DanialHaikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\asp\claimDetail.js.map