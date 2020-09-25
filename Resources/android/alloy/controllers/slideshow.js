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

  // Generated code that must be executed before all UI and/or
  // controller code. One example is all model and collection
  // declarations from markup.


  // Generated UI code
  $.__views["win"] = Ti.UI.createWindow(
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, id: "win", title: "", navBarHidden: true });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["image_container"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, id: "image_container", backgroundColor: "#fff" });

  $.__views["win"].add($.__views["image_container"]);
  $.__views["__alloyId828"] = Ti.UI.createImageView(
  { width: Ti.UI.FILL, height: Ti.UI.FILL, image: "/images/gradient-bg.png", id: "__alloyId828" });

  $.__views["win"].add($.__views["__alloyId828"]);
  $.__views["__alloyId829"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId829" });

  $.__views["win"].add($.__views["__alloyId829"]);
  var __alloyId830 = [];
  $.__views["__alloyId831"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, layout: "composite", id: "__alloyId831" });

  __alloyId830.push($.__views["__alloyId831"]);
  $.__views["__alloyId832"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId832" });

  $.__views["__alloyId831"].add($.__views["__alloyId832"]);
  $.__views["__alloyId833"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId833" });

  $.__views["__alloyId832"].add($.__views["__alloyId833"]);
  $.__views["__alloyId834"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 18 }, text: 'Welcome,', textAlign: "center", id: "__alloyId834" });

  $.__views["__alloyId833"].add($.__views["__alloyId834"]);
  $.__views["__alloyId835"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'a FREE app that for you to track your health, manage medical records, Free consultation from doctor and many more !', textAlign: "center", id: "__alloyId835" });

  $.__views["__alloyId833"].add($.__views["__alloyId835"]);
  $.__views["__alloyId836"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, layout: "composite", id: "__alloyId836" });

  __alloyId830.push($.__views["__alloyId836"]);
  $.__views["__alloyId837"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, bottom: 0, id: "__alloyId837" });

  $.__views["__alloyId836"].add($.__views["__alloyId837"]);
  $.__views["__alloyId838"] = Ti.UI.createView(
  { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId838" });

  $.__views["__alloyId837"].add($.__views["__alloyId838"]);
  $.__views["__alloyId839"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 18 }, text: 'AskDoctor', textAlign: "center", id: "__alloyId839" });

  $.__views["__alloyId838"].add($.__views["__alloyId839"]);
  $.__views["__alloyId840"] = Ti.UI.createLabel(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#ffffff", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, text: 'Free consultation for Covid 19. 1 click to ASKDoctor button to link with our doctors', textAlign: "center", id: "__alloyId840" });

  $.__views["__alloyId838"].add($.__views["__alloyId840"]);
  $.__views["slogan"] = Ti.UI.createScrollableView(
  { width: Ti.UI.FILL, views: __alloyId830, id: "slogan", height: "85%", pagingControlColor: "transparent", showPagingControl: true, disableBounce: true });

  $.__views["__alloyId829"].add($.__views["slogan"]);
  $.__views["__alloyId841"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "__alloyId841" });

  $.__views["__alloyId829"].add($.__views["__alloyId841"]);
  $.__views["__alloyId842"] = Ti.UI.createButton(
  { borderRadius: 6, backgroundColor: "#ffffff", height: 40, color: "#CE1D1C", width: "60%", font: { fontFamily: "Roboto-Bold" }, borderColor: "#ffffff", textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER, title: "Continue", id: "__alloyId842" });

  $.__views["__alloyId841"].add($.__views["__alloyId842"]);
  do_continue ? $.addListener($.__views["__alloyId842"], 'click', do_continue) : __defers['$.__views["__alloyId842"]!click!do_continue'] = true;exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var u_id = Ti.App.Properties.getString('u_id') || "";
  //var friends = Alloy.createCollection("friends");
  //var data = friends.getData();
  var fade_view = $.UI.create("View", {
    classes: ['wfill', 'hfill'],
    backgroundColor: "#ffffff" });

  var fade_images = ['/images/slideshow/bg0.png', '/images/slideshow/askDoctor_slide.jpg'];

  function do_continue() {
    Ti.App.Properties.setString('isShowIntro', 1);
    var win = Alloy.createController("login").getView();
    win.open();
  }

  //move Hover pointer
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

  //when scrollend event fire, move the hover to correct place. 
  function scroll(event) {
    if (typeof event.currentPageAsFloat == "undefined") {
      return;
    }
    changeSlideOpacity(event.currentPageAsFloat);
    if (event.currentPage == 0) {
      //Ti.App.fireEvent('Ti:table_refresh');
    }
  }

  /*
       	render friends list
       * */
  function render_slideshow() {
    $.image_container.removeAllChildren();
    for (var i = 0; i < fade_images.length; i++) {
      var img = $.UI.create("ImageView", {
        classes: ['wfill', 'hsize'],
        image: fade_images[i] });

      $.image_container.add(img);
    };
  }

  /*
       	Refresh
       * */
  function refresh() {
    render_slideshow();
    changeSlideOpacity(0);
  }

  /**
       * Closes the Window
       */
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

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId842"]!click!do_continue'] && $.addListener($.__views["__alloyId842"], 'click', do_continue);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/slideshow.js.map