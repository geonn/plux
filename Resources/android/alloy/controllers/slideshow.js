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
  this.__controllerPath = 'slideshow';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "", navBarHidden: true });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.image_container = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "image_container", backgroundColor: "#000" });

  $.__views.win.add($.__views.image_container);
  $.__views.__alloyId1043 = Ti.UI.createImageView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, image: "/images/gradient-bg.png", id: "__alloyId1043" });

  $.__views.win.add($.__views.__alloyId1043);
  $.__views.__alloyId1044 = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId1044" });

  $.__views.win.add($.__views.__alloyId1044);
  var __alloyId1045 = [];
  $.__views.__alloyId1046 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, layout: "composite", id: "__alloyId1046" });

  __alloyId1045.push($.__views.__alloyId1046);
  $.__views.__alloyId1047 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId1047" });

  $.__views.__alloyId1046.add($.__views.__alloyId1047);
  $.__views.__alloyId1048 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId1048" });

  $.__views.__alloyId1047.add($.__views.__alloyId1048);
  $.__views.__alloyId1049 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 18 }, text: 'Welcome,', textAlign: "center", id: "__alloyId1049" });

  $.__views.__alloyId1048.add($.__views.__alloyId1049);
  $.__views.__alloyId1050 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 14 }, text: 'a FREE app that automates most of the management, claims and tracking functions that are performed by companies’ HR departments', textAlign: "center", id: "__alloyId1050" });

  $.__views.__alloyId1048.add($.__views.__alloyId1050);
  $.__views.__alloyId1051 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, layout: "composite", id: "__alloyId1051" });

  __alloyId1045.push($.__views.__alloyId1051);
  $.__views.__alloyId1052 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId1052" });

  $.__views.__alloyId1051.add($.__views.__alloyId1052);
  $.__views.__alloyId1053 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId1053" });

  $.__views.__alloyId1052.add($.__views.__alloyId1053);
  $.__views.__alloyId1054 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 18 }, text: 'Smart Claims', textAlign: "center", id: "__alloyId1054" });

  $.__views.__alloyId1053.add($.__views.__alloyId1054);
  $.__views.__alloyId1055 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 14 }, text: 'Access details of entitlements, claims made, claims remaining, etc', textAlign: "center", id: "__alloyId1055" });

  $.__views.__alloyId1053.add($.__views.__alloyId1055);
  $.__views.__alloyId1056 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId1056" });

  __alloyId1045.push($.__views.__alloyId1056);
  $.__views.__alloyId1057 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId1057" });

  $.__views.__alloyId1056.add($.__views.__alloyId1057);
  $.__views.__alloyId1058 = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId1058" });

  $.__views.__alloyId1057.add($.__views.__alloyId1058);
  $.__views.__alloyId1059 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 18 }, text: 'Easy Clinic Locator', textAlign: "center", id: "__alloyId1059" });

  $.__views.__alloyId1058.add($.__views.__alloyId1059);
  $.__views.__alloyId1060 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 14 }, text: 'Search through our panel of thousands of doctors, located all over Malaysia', textAlign: "center", id: "__alloyId1060" });

  $.__views.__alloyId1058.add($.__views.__alloyId1060);
  $.__views.slogan = Ti.UI.createScrollableView(
  { width: Ti.UI.FILL, views: __alloyId1045, id: "slogan", height: "85%", pagingControlColor: "transparent", showPagingControl: true, disableBounce: true });

  $.__views.__alloyId1044.add($.__views.slogan);
  $.__views.__alloyId1061 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId1061" });

  $.__views.__alloyId1044.add($.__views.__alloyId1061);
  $.__views.__alloyId1062 = Ti.UI.createButton(
  { borderRadius: 6, backgroundColor: "#ffffff", height: 40, color: "#CE1D1C", width: "60%", font: { fontWeight: "bold" }, borderColor: "#ffffff", textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, title: "Continue", id: "__alloyId1062" });

  $.__views.__alloyId1061.add($.__views.__alloyId1062);
  do_continue ? $.addListener($.__views.__alloyId1062, 'click', do_continue) : __defers['$.__views.__alloyId1062!click!do_continue'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var u_id = Ti.App.Properties.getString('u_id') || "";


  var fade_view = $.UI.create("View", {
    classes: ['wfill', 'hfill'],
    backgroundColor: "#ffffff" });

  var fade_images = ['/images/slideshow/bg0.png', '/images/slideshow/bg2.png', '/images/slideshow/bg3.png'];

  function do_continue() {
    Ti.App.Properties.setString('isShowIntro', 1);
    var win = Alloy.createController("login").getView();
    win.open();
  }


  function changeSlideOpacity(seed) {
    var child = $.image_container.children;
    var first = child[Math.floor(seed)];

    if (seed - Math.floor(seed) == 0) {
      for (var a = 0; a < child.length; a++) {
        if (a == Math.floor(seed)) {
          child[a].setOpacity(1);
        } else {
          child[a].setOpacity(0);
        }
      }
    } else {
      var second = child[Math.ceil(seed)];
      for (var a = 0; a < child.length; a++) {
        if (a == Math.floor(seed) || a == Math.ceil(seed)) {
          first.setOpacity(Math.ceil(seed) - seed);
          second.setOpacity(seed - Math.floor(seed));
        } else {
          child[a].setOpacity(0);
        }
      }
    }
  }


  function scroll(event) {
    if (typeof event.currentPageAsFloat == "undefined") {
      return;
    }
    changeSlideOpacity(event.currentPageAsFloat);
    if (event.currentPage == 0) {

    }
  }




  function render_slideshow() {
    $.image_container.removeAllChildren();
    for (var i = 0; i < fade_images.length; i++) {
      var img = $.UI.create("ImageView", {
        classes: ['wfill', 'hsize'],
        image: fade_images[i],
        top: 0 });

      $.image_container.add(img);
    };
  }




  function refresh() {
    render_slideshow();
    changeSlideOpacity(0);
  }




  function closeWindow() {
    $.win.close();
  }

  function init() {
    refresh();
  }

  init();

  $.slogan.addEventListener("scroll", scroll);

  Ti.App.addEventListener('slideshow:refresh', refresh);

  $.win.addEventListener("close", function () {
    Ti.App.removeEventListener('slideshow:refresh', refresh);
    $.destroy();
  });





  __defers['$.__views.__alloyId1062!click!do_continue'] && $.addListener($.__views.__alloyId1062, 'click', do_continue);



  _.extend($, exports);
}

module.exports = Controller;