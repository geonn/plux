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
  this.__controllerPath = 'asp/eCard';
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
  { backgroundColor: "#fff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "ASP eCARD", backButtonTitle: "", layout: "", id: "win", navTintColor: "#CE1D1C" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.mainContainer = Ti.UI.createView(
  { borderWidth: 0, id: "mainContainer", height: Ti.UI.SIZE, width: Ti.UI.FILL });

  $.__views.win.add($.__views.mainContainer);
  $.__views.main = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical" });

  $.__views.mainContainer.add($.__views.main);
  if (true) {
    $.__views.__alloyId380 = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId380" });

    $.__views.main.add($.__views.__alloyId380);
    $.__views.__alloyId381 = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId381" });

    $.__views.__alloyId380.add($.__views.__alloyId381);
    $.__views.btnBack = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views.__alloyId381.add($.__views.btnBack);
    $.__views.__alloyId382 = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId382" });

    $.__views.__alloyId380.add($.__views.__alloyId382);
    $.__views.pageTitle = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontSize: "16dp" }, text: 'ASP eCARD', id: "pageTitle", textAlign: "center" });

    $.__views.__alloyId382.add($.__views.pageTitle);
  }
  $.__views.__alloyId383 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId383" });

  $.__views.main.add($.__views.__alloyId383);
  $.__views.card_container = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "card_container" });

  $.__views.__alloyId383.add($.__views.card_container);
  $.__views.card = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, width: Ti.UI.FILL, top: 0, id: "card" });

  $.__views.card_container.add($.__views.card);
  $.__views.qrCode = Ti.UI.createView(
  { borderWidth: 0, height: Ti.UI.SIZE, width: Ti.UI.FILL, layout: "vertical", bottom: 50, id: "qrCode" });

  $.__views.card_container.add($.__views.qrCode);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var u_id = args.u_id || 0;
  var noThumbColors = ['#555555', '#cccccc'];
  var noThumbColors2 = ['#ff0000', '#000'];
  var frontbackcounter = 0;
  common.construct($);
  var user = args.user;
  var qrcode = require('qrcode');
  var loading = Alloy.createController('loading');
  $.win.add(loading.getView());
  init();

  function init() {
    console.log(user);
    if (user.isver == "true" || user.isver > 0) {
      $.card.opacity = "1";
    }
  }

  function login_callback(responseText) {
    var res = JSON.parse(responseText);
    res = res[0];
    if (typeof res.message != "undefined" && res.message != null) {
      common.createAlert("Error", res.message);
      loading.finish();
    } else {}
  }

  var front = Ti.UI.createView({
    name: "front",
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    top: 0,
    currentAngle: 10 });


  var memno_text = Ti.UI.createLabel({
    text: user.memno,
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "105dp",
    left: "20dp",
    zIndex: 12,
    font: {
      fontSize: "14dp" },

    color: "#ffffff" });

  var name_text = Ti.UI.createLabel({
    text: user.name,
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "90dp",
    left: "20dp",
    zIndex: 12,
    font: {
      fontSize: "14dp" },

    color: "#ffffff" });

  var ic_text = Ti.UI.createLabel({
    text: user.ic,
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "125dp",
    right: "20dp",
    zIndex: 12,
    font: {
      fontSize: "14dp" },

    color: "#ffffff" });


  var front_bg = Ti.UI.createImageView({
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    image: "/images/eCard-front.png",
    font: {
      fontSize: "11dp" },

    left: 10,
    right: 10,
    zIndex: 11,
    top: 0 });


  front.add(front_bg);
  front.add(name_text);

  front.add(memno_text);

  var back = Ti.UI.createImageView({
    name: "back",
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    left: 10,
    right: 10,
    image: "/images/eCard-back.png",
    currentAngle: 10,
    top: 0 });


  var userIc = user.icno || "";

  var genCode = setInterval(function () {

    var dateTimeNow = currentDateTime();
    var userQR = qrcode.QRCode({
      typeNumber: 10,
      errorCorrectLevel: 'L' });


    var qrcodeView = userQR.createQRCodeView({
      width: 200,
      height: 200,
      margin: 4,
      text: user.name + "||" + user.id + "||" + user.icno + "||" + user.memno + "||" + user.empno + "||" + user.relation + "||" + user.corpcode + "||" + user.corpname + "||" + user.costcenter + "||" + user.dept + "||" + user.allergy + "||" + user.isver + "||" + user.verno + "||" + dateTimeNow + "||" + Ti.App.Properties.getString('cardno') });



    $.qrCode.removeAllChildren();
    $.qrCode.add(qrcodeView);
  }, 1000);


  $.card.add(front);

  var cover = Ti.UI.createView({
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    backgroundColor: "#ffffff",
    opacity: "0.5",
    zIndex: 100,
    top: 0 });

  $.mainContainer.add(cover);

  $.card.addEventListener('click', function (e) {

    var t;
    if (frontbackcounter % 2 == 0) {


      rotate_box($.card, frontbackcounter % 2);
    } else {


      rotate_box($.card, frontbackcounter % 2);
    }
    frontbackcounter++;
  });

  function rotate_box(view_selected, back2front) {

    if ('android' == "android") {
      var matrix2d = Ti.UI.create2DMatrix();
      var m_front_to_back = matrix2d.scale(0);
    } else {
      var m_front_to_back = Ti.UI.create3DMatrix();
      m_front_to_back = m_front_to_back.rotate(-180, 0, 1, 0);
    }
    var a_front_to_back = Ti.UI.createAnimation({
      transform: m_front_to_back,
      duration: 200,
      box: view_selected });

    view_selected.animate(a_front_to_back);
    a_front_to_back.addEventListener('complete', function () {
      Ti.API.info('showFront: Animating the back to the front.');
      a_front_to_back.removeEventListener('complete', function () {});

      if ('android' == "android") {
        var matrix2d = Ti.UI.create2DMatrix();
        var m_front_to_back = matrix2d.scale(1);
      } else {
        var m_front_to_back = Ti.UI.create3DMatrix();
        m_front_to_back = m_front_to_back.rotate(0, 0, 1, 0);
      }
      var a_back_to_front = Ti.UI.createAnimation({
        transform: m_front_to_back,
        duration: 200,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT });

      var back = Ti.UI.createImageView({
        name: "back",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        image: "/images/eCard-back.png",
        currentAngle: 10,
        top: 0 });

      if (back2front) {
        view_selected.remove(view_selected.children[1]);
      } else {

        view_selected.add(back);
      }
      view_selected.animate(a_back_to_front);
    });
  }

  function orientationchange(e) {
    Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
    Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
    if (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) {

      name_text.top = "160dp";
      name_text.left = "80dp";
      memno_text.top = "125dp";
      memno_text.left = "80dp";


    } else {
      name_text.top = "125dp";
      name_text.left = "20dp";
      memno_text.top = "90dp";
      memno_text.left = "20dp";
    }
  }


  Ti.Gesture.addEventListener('orientationchange', orientationchange);
  Ti.App.addEventListener('loadPage', init);

  if ('android' == "android") {
    $.btnBack.addEventListener('click', function () {
      nav.closeWindow($.win);
    });
  }

  $.win.addEventListener("close", function () {
    console.log("close ecard");
    Ti.App.removeEventListener('loadPage', init);
    Ti.Gesture.removeEventListener('orientationchange', orientationchange);
    clearInterval(genCode);
  });









  _.extend($, exports);
}

module.exports = Controller;