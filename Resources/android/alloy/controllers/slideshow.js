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
  { backgroundColor: "#ffffff", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "", navBarHidden: true });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.image_container = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, id: "image_container", backgroundColor: "#000" });

  $.__views.win.add($.__views.image_container);
  $.__views.__alloyId819 = Ti.UI.createImageView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, image: "/images/gradient-bg.png", id: "__alloyId819" });

  $.__views.win.add($.__views.__alloyId819);
  $.__views.__alloyId820 = Ti.UI.createView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId820" });

  $.__views.win.add($.__views.__alloyId820);
  var __alloyId821 = [];
  $.__views.__alloyId822 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, layout: "composite", id: "__alloyId822" });

  __alloyId821.push($.__views.__alloyId822);
  $.__views.__alloyId823 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId823" });

  $.__views.__alloyId822.add($.__views.__alloyId823);
  $.__views.__alloyId824 = Ti.UI.createView(
  { top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId824" });

  $.__views.__alloyId823.add($.__views.__alloyId824);
  $.__views.__alloyId825 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 18 }, text: 'Welcome,', textAlign: "center", id: "__alloyId825" });

  $.__views.__alloyId824.add($.__views.__alloyId825);
  $.__views.__alloyId826 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 14 }, text: 'a FREE app that automates most of the management, claims and tracking functions that are performed by companies’ HR departments', textAlign: "center", id: "__alloyId826" });

  $.__views.__alloyId824.add($.__views.__alloyId826);
  $.__views.__alloyId827 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId827" });

  __alloyId821.push($.__views.__alloyId827);
  $.__views.__alloyId828 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId828" });

  $.__views.__alloyId827.add($.__views.__alloyId828);
  $.__views.__alloyId829 = Ti.UI.createView(
  { top: 10, left: 10, right: 10, bottom: 20, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId829" });

  $.__views.__alloyId828.add($.__views.__alloyId829);
  $.__views.__alloyId830 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 18 }, text: 'Doctor Appointment Booking', textAlign: "center", id: "__alloyId830" });

  $.__views.__alloyId829.add($.__views.__alloyId830);
  $.__views.__alloyId831 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 14 }, text: 'Employees can choose from a panel of thousands of doctors for unparalleled convenience', textAlign: "center", id: "__alloyId831" });

  $.__views.__alloyId829.add($.__views.__alloyId831);
  $.__views.__alloyId832 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, layout: "composite", id: "__alloyId832" });

  __alloyId821.push($.__views.__alloyId832);
  $.__views.__alloyId833 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId833" });

  $.__views.__alloyId832.add($.__views.__alloyId833);
  $.__views.__alloyId834 = Ti.UI.createView(
  { top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId834" });

  $.__views.__alloyId833.add($.__views.__alloyId834);
  $.__views.__alloyId835 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 18 }, text: 'Smart Claims', textAlign: "center", id: "__alloyId835" });

  $.__views.__alloyId834.add($.__views.__alloyId835);
  $.__views.__alloyId836 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 14 }, text: 'Access details of entitlements, claims made, claims remaining, etc', textAlign: "center", id: "__alloyId836" });

  $.__views.__alloyId834.add($.__views.__alloyId836);
  $.__views.__alloyId837 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId837" });

  __alloyId821.push($.__views.__alloyId837);
  $.__views.__alloyId838 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId838" });

  $.__views.__alloyId837.add($.__views.__alloyId838);
  $.__views.__alloyId839 = Ti.UI.createView(
  { top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId839" });

  $.__views.__alloyId838.add($.__views.__alloyId839);
  $.__views.__alloyId840 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 18 }, text: 'Easy Clinic Locator', textAlign: "center", id: "__alloyId840" });

  $.__views.__alloyId839.add($.__views.__alloyId840);
  $.__views.__alloyId841 = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontSize: 14 }, text: 'Search through our panel of thousands of doctors, located all over Malaysia', textAlign: "center", id: "__alloyId841" });

  $.__views.__alloyId839.add($.__views.__alloyId841);
  $.__views.slogan = Ti.UI.createScrollableView(
  { width: Ti.UI.FILL, views: __alloyId821, id: "slogan", height: "85%", pagingControlColor: "transparent", showPagingControl: true, disableBounce: true });

  $.__views.__alloyId820.add($.__views.slogan);
  $.__views.__alloyId842 = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId842" });

  $.__views.__alloyId820.add($.__views.__alloyId842);
  $.__views.__alloyId843 = Ti.UI.createButton(
  { font: { fontWeight: "bold" }, height: 40, borderColor: "#ffffff", textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, backgroundColor: "#ffffff", borderRadius: 6, color: "#CE1D1C", width: "60%", title: "Continue", id: "__alloyId843" });

  $.__views.__alloyId842.add($.__views.__alloyId843);
  do_continue ? $.addListener($.__views.__alloyId843, 'click', do_continue) : __defers['$.__views.__alloyId843!click!do_continue'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var u_id = Ti.App.Properties.getString('u_id') || "";


  var fade_view = $.UI.create("View", {
    classes: ['wfill', 'hfill'],
    backgroundColor: "#ffffff" });

  var fade_images = ['/images/slideshow/bg0.png', '/images/slideshow/bg1.png', '/images/slideshow/bg2.png', '/images/slideshow/bg3.png'];

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





  __defers['$.__views.__alloyId843!click!do_continue'] && $.addListener($.__views.__alloyId843, 'click', do_continue);



  _.extend($, exports);
}

module.exports = Controller;