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
  this.__controllerPath = 'asp/claimSubmission_bak';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Claim Submission", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.main = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical" });

  $.__views.win.add($.__views.main);
  if (true) {
    $.__views.__alloyId340 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId340" });

    $.__views.main.add($.__views.__alloyId340);
    $.__views.__alloyId341 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId341" });

    $.__views.__alloyId340.add($.__views.__alloyId341);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId341.add($.__views.btnBack);
    $.__views.__alloyId342 = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId342" });

    $.__views.__alloyId340.add($.__views.__alloyId342);
    $.__views.pageTitle = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'Claim Submission', id: "pageTitle", textAlign: "center" });

    $.__views.__alloyId342.add($.__views.pageTitle);
  }
  $.__views.__alloyId343 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#111111", top: 10, left: 10, right: 10, bottom: 10, font: { fontSize: 14 }, text: "Please fill in below info to claim from ASP", id: "__alloyId343" });

  $.__views.main.add($.__views.__alloyId343);
  $.__views.table = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "table", top: 10, bottom: 10, contentWidth: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, backgroundColor: "#ffffff" });

  $.__views.main.add($.__views.table);
  $.__views.tvrReceiptNo = Ti.UI.createView(
  { borderWidth: 0, id: "tvrReceiptNo", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrReceiptNo);
  $.__views.__alloyId344 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId344" });

  $.__views.tvrReceiptNo.add($.__views.__alloyId344);
  $.__views.__alloyId345 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "Receipt Number", top: 12, id: "__alloyId345" });

  $.__views.__alloyId344.add($.__views.__alloyId345);
  $.__views.receipt_no = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "receipt_no", bottom: 5, right: 5, maxLength: 30, hintText: "Receipt Number" });

  $.__views.__alloyId344.add($.__views.receipt_no);
  $.__views.__alloyId346 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId346" });

  $.__views.tvrReceiptNo.add($.__views.__alloyId346);
  $.__views.tvrCategory = Ti.UI.createView(
  { borderWidth: 0, id: "tvrCategory", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrCategory);
  $.__views.__alloyId347 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId347" });

  $.__views.tvrCategory.add($.__views.__alloyId347);
  $.__views.__alloyId348 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "Category", top: 12, id: "__alloyId348" });

  $.__views.__alloyId347.add($.__views.__alloyId348);
  $.__views.__alloyId349 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, skip_checking: 1, width: "auto", id: "__alloyId349" });

  $.__views.__alloyId347.add($.__views.__alloyId349);
  $.__views.category = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#C8C8CD", top: 12, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, text: "Choose Category", id: "category" });

  $.__views.__alloyId349.add($.__views.category);
  $.__views.__alloyId350 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId350" });

  $.__views.tvrCategory.add($.__views.__alloyId350);
  $.__views.tvrClaimUnder = Ti.UI.createView(
  { borderWidth: 0, id: "tvrClaimUnder", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrClaimUnder);
  $.__views.__alloyId351 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId351" });

  $.__views.tvrClaimUnder.add($.__views.__alloyId351);
  $.__views.__alloyId352 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "Claim Under", top: 12, id: "__alloyId352" });

  $.__views.__alloyId351.add($.__views.__alloyId352);
  $.__views.__alloyId353 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, skip_checking: 1, width: "auto", id: "__alloyId353" });

  $.__views.__alloyId351.add($.__views.__alloyId353);
  $.__views.claim_under = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#C8C8CD", top: 12, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, text: "Choose Claim Under", id: "claim_under" });

  $.__views.__alloyId353.add($.__views.claim_under);
  $.__views.__alloyId354 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId354" });

  $.__views.tvrClaimUnder.add($.__views.__alloyId354);
  $.__views.tvrReceiptAmount = Ti.UI.createView(
  { borderWidth: 0, id: "tvrReceiptAmount", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrReceiptAmount);
  $.__views.__alloyId355 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId355" });

  $.__views.tvrReceiptAmount.add($.__views.__alloyId355);
  $.__views.__alloyId356 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "Receipt Amount", top: 12, id: "__alloyId356" });

  $.__views.__alloyId355.add($.__views.__alloyId356);
  $.__views.receiptAmount = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "receiptAmount", bottom: 5, right: 5, horizontalWrap: true, keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD, hintText: "Receipt amount in RM" });

  $.__views.__alloyId355.add($.__views.receiptAmount);
  $.__views.__alloyId357 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId357" });

  $.__views.tvrReceiptAmount.add($.__views.__alloyId357);
  $.__views.tvrDateVisit = Ti.UI.createView(
  { borderWidth: 0, id: "tvrDateVisit", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrDateVisit);
  showVisitPicker ? $.addListener($.__views.tvrDateVisit, 'click', showVisitPicker) : __defers['$.__views.tvrDateVisit!click!showVisitPicker'] = true;$.__views.__alloyId358 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId358" });

  $.__views.tvrDateVisit.add($.__views.__alloyId358);
  $.__views.__alloyId359 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "Date of Visit", top: 12, id: "__alloyId359" });

  $.__views.__alloyId358.add($.__views.__alloyId359);
  $.__views.__alloyId360 = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, skip_checking: 1, width: "auto", id: "__alloyId360" });

  $.__views.__alloyId358.add($.__views.__alloyId360);
  $.__views.dateVisit = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Titanium.UI.SIZE, color: "#C8C8CD", top: 12, left: 10, right: 10, bottom: 10, font: { fontSize: 12 }, text: "Date of visit a clinic", id: "dateVisit" });

  $.__views.__alloyId360.add($.__views.dateVisit);
  $.__views.__alloyId361 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId361" });

  $.__views.table.add($.__views.__alloyId361);
  $.__views.tvrClinicVisit = Ti.UI.createView(
  { borderWidth: 0, id: "tvrClinicVisit", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrClinicVisit);
  $.__views.__alloyId362 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId362" });

  $.__views.tvrClinicVisit.add($.__views.__alloyId362);
  $.__views.__alloyId363 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "Clinic/Hospital Name", top: 12, id: "__alloyId363" });

  $.__views.__alloyId362.add($.__views.__alloyId363);
  $.__views.clinicName = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", maxLength: 40, borderColor: "#ffffff", id: "clinicName", top: 5, bottom: 5, right: 5, hintText: "Clinic/Hospital Name" });

  $.__views.__alloyId362.add($.__views.clinicName);
  $.__views.__alloyId364 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId364" });

  $.__views.tvrClinicVisit.add($.__views.__alloyId364);
  $.__views.tvrRemark = Ti.UI.createView(
  { borderWidth: 0, id: "tvrRemark", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrRemark);
  $.__views.view_remark = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, id: "view_remark", height: 85 });

  $.__views.tvrRemark.add($.__views.view_remark);
  $.__views.__alloyId365 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "Remark", top: 12, id: "__alloyId365" });

  $.__views.view_remark.add($.__views.__alloyId365);
  $.__views.remark = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", compulsory: 0, id: "remark", bottom: 5, right: 5, hintText: "Claim remark" });

  $.__views.view_remark.add($.__views.remark);
  $.__views.__alloyId366 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId366" });

  $.__views.tvrRemark.add($.__views.__alloyId366);
  $.__views.tvrGstAmount = Ti.UI.createView(
  { borderWidth: 0, id: "tvrGstAmount", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrGstAmount);
  $.__views.__alloyId367 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId367" });

  $.__views.tvrGstAmount.add($.__views.__alloyId367);
  $.__views.__alloyId368 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "GST Amount", top: 12, id: "__alloyId368" });

  $.__views.__alloyId367.add($.__views.__alloyId368);
  $.__views.gstAmount = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "gstAmount", bottom: 5, right: 5, horizontalWrap: true, keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD, hintText: "GST Amount (If applicable)" });

  $.__views.__alloyId367.add($.__views.gstAmount);
  $.__views.__alloyId369 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId369" });

  $.__views.tvrGstAmount.add($.__views.__alloyId369);
  $.__views.tvrMc = Ti.UI.createView(
  { borderWidth: 0, id: "tvrMc", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrMc);
  $.__views.__alloyId370 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId370" });

  $.__views.tvrMc.add($.__views.__alloyId370);
  $.__views.__alloyId371 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "MC Issued", top: 12, id: "__alloyId371" });

  $.__views.__alloyId370.add($.__views.__alloyId371);
  $.__views.mc = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "mc", bottom: 5, right: 5, horizontalWrap: true, keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD, hintText: "MC Issued (Days)" });

  $.__views.__alloyId370.add($.__views.mc);
  $.__views.__alloyId372 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId372" });

  $.__views.tvrMc.add($.__views.__alloyId372);
  $.__views.tvrDiagnosis = Ti.UI.createView(
  { borderWidth: 0, id: "tvrDiagnosis", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrDiagnosis);
  $.__views.__alloyId373 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId373" });

  $.__views.tvrDiagnosis.add($.__views.__alloyId373);
  $.__views.__alloyId374 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "Diagnosis", top: 12, id: "__alloyId374" });

  $.__views.__alloyId373.add($.__views.__alloyId374);
  $.__views.diagnosis = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "diagnosis", bottom: 5, right: 5, hintText: "Diagnosis" });

  $.__views.__alloyId373.add($.__views.diagnosis);
  $.__views.__alloyId375 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId375" });

  $.__views.tvrDiagnosis.add($.__views.__alloyId375);
  $.__views.tvrGlAmount = Ti.UI.createView(
  { borderWidth: 0, id: "tvrGlAmount", height: Ti.UI.SIZE, layout: "vertical", selectedBackgroundColor: "#ffffff" });

  $.__views.table.add($.__views.tvrGlAmount);
  $.__views.__alloyId376 = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 45, id: "__alloyId376" });

  $.__views.tvrGlAmount.add($.__views.__alloyId376);
  $.__views.__alloyId377 = Ti.UI.createLabel(
  { width: "35%", height: Titanium.UI.SIZE, color: "#A52430", font: { fontSize: 14 }, left: 10, text: "GL Amount", top: 12, id: "__alloyId377" });

  $.__views.__alloyId376.add($.__views.__alloyId377);
  $.__views.glamount = Ti.UI.createTextField(
  { borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE, padding: { left: 10, right: 10, bottom: 5, top: 5 }, width: Ti.UI.FILL, height: 40, font: { fontSize: 12 }, color: "#000000", hintTextColor: "#000000", backgroundColor: "#ffffff", borderColor: "#ffffff", id: "glamount", bottom: 5, right: 5, horizontalWrap: true, keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD, hintText: "GL Amount (If applicable)" });

  $.__views.__alloyId376.add($.__views.glamount);
  $.__views.__alloyId378 = Ti.UI.createView(
  { borderWidth: 0, backgroundColor: "#ececec", width: Ti.UI.FILL, height: 1, id: "__alloyId378" });

  $.__views.tvrGlAmount.add($.__views.__alloyId378);
  $.__views.__alloyId379 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, top: 10, id: "__alloyId379" });

  $.__views.table.add($.__views.__alloyId379);
  $.__views.saveBtn = Ti.UI.createButton(
  { borderRadius: 5, backgroundColor: "#7B7B7B", height: 40, color: "#ffffff", width: "70%", id: "saveBtn", title: "Submit Claim" });

  $.__views.__alloyId379.add($.__views.saveBtn);
  submitClaim ? $.addListener($.__views.saveBtn, 'click', submitClaim) : __defers['$.__views.saveBtn!click!submitClaim'] = true;$.__views.selectorView = Ti.UI.createView(
  { borderWidth: 0, height: 0, bottom: 0, id: "selectorView", zIndex: 99 });

  $.__views.win.add($.__views.selectorView);
  $.__views.dateVisitPicker = Ti.UI.createPicker(
  { format24: false, calendarViewShown: false, id: "dateVisitPicker", type: Ti.UI.PICKER_TYPE_DATE, height: 200, visible: false });

  $.__views.selectorView.add($.__views.dateVisitPicker);
  changeVisitDate ? $.addListener($.__views.dateVisitPicker, 'change', changeVisitDate) : __defers['$.__views.dateVisitPicker!change!changeVisitDate'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var isEdit = args.edit || "";
  var serial = args.serial || "";
  var corpcode = Ti.App.Properties.getString('corpcode');
  var empno = Ti.App.Properties.getString('empno');
  var name = Ti.App.Properties.getString('fullname');
  var claimCategoryArr = [];
  var claimCategoryIdArr = [];
  var claimName = [];
  var claimMemNo = [];
  var geoCate = [];
  var panelCategory;
  var userMem;
  var claimCategoryId = 0;
  var claimMemId;
  var claimSerial;
  var claimMode = "INSERT";
  var loading = Alloy.createController('loading');
  common.construct($);
  init();

  function init() {
    loading.start();
    $.win.add(loading.getView());
    if (!Titanium.Network.online) {
      common.createAlert("Alert", "There is no internet connection.", closeWindow);
    }
    var dependent = Ti.App.Properties.getString('dependent');
    userMem = JSON.parse(dependent);
    userMem.forEach(function (entry) {
      claimName.push(entry.name);
      claimMemNo.push(entry.memno);
    });
    claimName.push("Cancel");
    getClaimCategory();
    customize_setting();
  }

  function customize_setting() {
    if (corpcode == "IFMY" || corpcode == "IFLP") {
      $.view_remark.children[0].text = "Diagnosis / Illness";
      $.view_remark.children[0].hintText = "Diagnosis / Illness";
    }
    loading.finish();
  }

  function checkIfHaveData() {
    if (isEdit != "") {
      claimMode = "UPDATE";
      claimSerial = serial;
      var params = "SERIAL=" + serial;
      loading.start();
      API.callByGet({ url: "getclaimReimbUrl", params: params }, function (responseText) {
        var res = JSON.parse(responseText);
        claimMemId = res[0].memno;
        $.receiptAmount.value = res[0].amt || "";
        $.diagnosis.value = res[0].diagnosis || "";
        $.glamount.value = res[0].glamt || 0;
        $.gstAmount.value = res[0].gstamt || 0;
        $.clinicName.value = res[0].nclinic || "";
        $.receipt_no.value = res[0].recno || "";
        $.remark.value = res[0].remarks || "";
        $.mc.value = res[0].mcdays || 0;
        var visitDate = res[0].visitdt || "";
        dateVisit = visitDate.split("/");
        dateVisit = dateVisit[1] + "/" + dateVisit[0] + "/" + dateVisit[2];
        $.dateVisit.text = dateVisit;
        $.dateVisit.color = "#000000";
        $.claim_under.text = name;
        $.claim_under.color = "#000000";

        a = claimCategoryIdArr.indexOf(res[0].category);
        claimCategoryId = claimCategoryArr[a];
        $.category.text = claimCategoryArr[a];
        $.category.color = "#000000";


        loading.finish();
      });
      $.saveBtn.visible = false;
    }
  }

  function getClaimCategory() {
    API.callByGet({ url: "getclaimCategoryUrl", params: "CORPCODE=" + corpcode }, function (responseText) {
      panelCategory = JSON.parse(responseText);

      if (panelCategory.length < 1) {
        common.createAlert("Error", "You are not allowed to submit claim");
        nav.closeWindow($.win);
        return false;
      }
      panelCategory.forEach(function (entry) {
        claimCategoryIdArr.push(entry.catID);
        claimCategoryArr.push(entry.catDesc);
      });
      if (true) {
        claimCategoryIdArr.push("Cancel");
        claimCategoryArr.push("Cancel");
      }

      if (false) {
        claimCategoryArr.push("Cancel");
      }
      loading.finish();
      checkIfHaveData();
    });
  }

  function submitClaim() {
    var receiptNo = $.receipt_no.value;
    var claimCategory = claimCategoryId;
    var claimUnder = claimMemId;
    var receiptAmount = $.receiptAmount.value;

    var dateVisit = $.dateVisit.text;
    var clinicName = $.clinicName.value;
    var remark = $.remark.value;
    var gstAmount = $.gstAmount.value;
    var mc = $.mc.value;
    var diagnosis = $.diagnosis.value;
    var glamount = $.glamount.value;
    var mode = claimMode;

    if (corpcode == "IFMY" || corpcode == "IFLP") {
      if (remark == "") {
        common.resultPopUp("Error", "Please fill in Diagnosis / Illness.");
        return false;
      }
    }
    if (receiptNo.trim() == "") {
      common.resultPopUp("Error", "Please fill in receipt number");
      return false;
    }

    if (claimCategory == "") {
      common.resultPopUp("Error", "Please choose ONE category");
      return false;
    }

    if (typeof claimUnder == "undefined") {
      common.resultPopUp("Error", "Please choose ONE claim under");
      return false;
    }

    if (receiptAmount == "" || receiptAmount <= 0) {
      common.resultPopUp("Error", "Please fill in receipt amount in RM");
      return false;
    }

    if (dateVisit == "") {
      common.resultPopUp("Error", "Please choose date visit to clinic/hospital");
      return false;
    } else {
      dateVisit = dateVisit.split("/");
      dateVisit = dateVisit[1] + "/" + dateVisit[0] + "/" + dateVisit[2];
    }

    if (clinicName == "") {
      common.resultPopUp("Error", "Please fill in clinic/hospital to visit");
      return false;
    }











    var ser = "";
    if (isEdit != "") {
      ser = "&SERIAL=" + claimSerial;
    }
    var params = "RECNO=" + receiptNo + "&CATEGORY=" + claimCategory + "&MEMNO=" + claimUnder + "&EMPNO=" + empno + "&CORPCODE=" + corpcode + "&AMT=" + receiptAmount + "&VISITDT=" + dateVisit + "&NCLINIC=" + clinicName + "&REMARKS=" + remark + "&GSTAMT=" + gstAmount + "&MCDAYS=" + mc + "&DIAGNOSIS=" + diagnosis + "&GLAMT=" + glamount + "&MODE=" + mode + ser;
    console.log(params);
    loading.start();
    API.callByGet({ url: "getclaimSubmissionUrl", params: params }, function (responseText) {
      var res = JSON.parse(responseText);
      console.log(res);
      loading.finish();
      if (res[0]['code'] == "02") {
        common.createAlert("Success", res[0]['message'], function () {
          $.win.close();
        });
      } else {
        common.createAlert("Error", res[0]['message']);
      }
    }, function (responseText) {
      loading.finish();
      common.createAlert("Error", "The Server is busy. Please try again later.");
    });
  }

  function hideKeyboard() {
    $.receiptAmount.blur();
    $.gstAmount.blur();
    $.remark.blur();
    $.mc.blur();
    $.glamount.blur();
  }

  function changeVisitDate(e) {
    var pickerdate = e.value;
    var day = pickerdate.getDate();
    day = day.toString();

    if (day.length < 2) {
      day = '0' + day;
    }

    var month = pickerdate.getMonth();
    month = month + 1;
    month = month.toString();

    if (month.length < 2) {
      month = '0' + month;
    }

    var year = pickerdate.getFullYear();
    selDate = day + "/" + month + "/" + year;
    console.log("trigger!");
    console.log(selDate);
    $.dateVisit.text = selDate;
    $.dateVisit.color = "#000000";
  }

  $.tvrCategory.addEventListener('click', function () {
    var cancelBtn = claimCategoryArr.length - 1;
    var dialog = Ti.UI.createOptionDialog({
      cancel: claimCategoryArr.length - 1,
      options: claimCategoryArr,
      selectedIndex: 0,
      title: 'Choose Claim Category' });


    dialog.show();
    dialog.addEventListener("click", function (e) {
      if (cancelBtn != e.index) {
        claimCategoryId = claimCategoryIdArr[e.index];
        $.category.text = claimCategoryArr[e.index];
        $.category.color = "#000000";
      }
    });
  });
  console.log("claimName");
  console.log(claimName);

  $.tvrClaimUnder.addEventListener('click', function () {
    var cancelBtn = claimName.length - 1;
    var dialog = Ti.UI.createOptionDialog({
      cancel: claimName.length - 1,
      options: claimName,
      title: 'Choose Claim Under' });


    dialog.show();
    dialog.addEventListener("click", function (e) {
      if (claimName.length == "1" || cancelBtn != e.index) {
        claimMemId = claimMemNo[e.index];
        $.claim_under.text = claimName[e.index];
        $.claim_under.color = "#000000";
      }
    });
  });

  function hideDatePicker() {
    changeVisitDate($.dateVisitPicker);
    $.dateVisitPicker.visible = false;
    $.dateToolbar.visible = false;
    $.selectorView.height = 0;
  }

  function showVisitPicker() {

    if (true) {
      var curDate = currentDateTime();
      var ed = curDate.substr(0, 10);
      var res_ed = ed.split('-');
      if (res_ed[1] == "08") {
        res_ed[1] = "8";
      }
      if (res_ed[1] == "09") {
        res_ed[1] = "9";
      }
      var datePicker = Ti.UI.createPicker({
        type: Ti.UI.PICKER_TYPE_DATE,
        minDate: new Date(2015, 0, 1),
        id: "datePicker",
        visible: false });

      datePicker.showDatePickerDialog({
        value: new Date(res_ed[0], parseInt(res_ed[1]) - 1, res_ed[2]),
        callback: function (e) {
          if (e.cancel) {} else {
            changeVisitDate(e);
          }
        } });

    } else {
      $.dateVisitPicker.visible = true;
      $.selectorView.height = Ti.UI.SIZE;
      $.dateToolbar.visible = true;
    }
  }

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }





  __defers['$.__views.tvrDateVisit!click!showVisitPicker'] && $.addListener($.__views.tvrDateVisit, 'click', showVisitPicker);__defers['$.__views.saveBtn!click!submitClaim'] && $.addListener($.__views.saveBtn, 'click', submitClaim);__defers['$.__views.dateVisitPicker!change!changeVisitDate'] && $.addListener($.__views.dateVisitPicker, 'change', changeVisitDate);



  _.extend($, exports);
}

module.exports = Controller;