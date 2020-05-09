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
  this.__controllerPath = 'asp/claimHistory';
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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "My Claim History", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["main"] = Ti.UI.createView(
  { borderWidth: 0, id: "main", layout: "vertical" });

  $.__views["win"].add($.__views["main"]);
  if (true) {
    $.__views["__alloyId259"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", height: 50, width: Ti.UI.FILL, backgroundColor: "#DEDEDE", id: "__alloyId259" });

    $.__views["main"].add($.__views["__alloyId259"]);
    $.__views["__alloyId260"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "10%", id: "__alloyId260" });

    $.__views["__alloyId259"].add($.__views["__alloyId260"]);
    $.__views["btnBack"] = Ti.UI.createImageView(
    { left: 10, id: "btnBack", width: 25, height: 25, image: "/images/btn-back.png" });

    $.__views["__alloyId260"].add($.__views["btnBack"]);
    $.__views["__alloyId261"] = Ti.UI.createView(
    { borderWidth: 0, width: "90%", id: "__alloyId261" });

    $.__views["__alloyId259"].add($.__views["__alloyId261"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'My Claim History', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId261"].add($.__views["pageTitle"]);
  }
  $.__views["listing"] = Ti.UI.createScrollView(
  { layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, id: "listing" });

  $.__views["main"].add($.__views["listing"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var arg_name = typeof args.name != "undefined" ? args.name : "%";
  var title = arg_name == "%" ? "All Claim Records" : arg_name;
  var nav = require('navigation');
  var loading = Alloy.createController("loading");
  var corpcode = Ti.App.Properties.getString('corpcode');
  var empno = Ti.App.Properties.getString('empno');

  if ("android" == "android") {
    $.pageTitle.text = title;
  } else {
    $.win.title = title;
  }

  function init() {
    $.win.add(loading.getView());
    loading.start();

    Alloy.Globals.API.callByGet({ url: "claim.aspx", params: "EMPNO=" + empno + "&CORPCODE=" + corpcode + "&PERIOD=ALL" }, {
      onload: function (responseText) {
        var res = JSON.parse(responseText);
        if (res.length == null || res.length <= 0) {
        } else if (typeof res[0] !== "undefined" && typeof res[0].message !== "undefined") {
          Alloy.Globals.common.createAlert(res[0].message);
        } else {
          render(res || []);
        }
      }, onfinish: function () {
        loading.finish();
      }, onerror: function () {
        $.win.close();
      } });

  }

  init();

  function render(data) {
    var pWidth = (false ? Ti.Platform.displayCaps.platformWidth : parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10)) - 20;

    data = Alloy.Globals._.sortBy(data, "visitdate");
    data.reverse();
    for (var i = 0; i < data.length; i++) {

      if (Alloy.Globals._.contains(args.benefittype.split("/"), data[i].category) || true) {
        var left_indicator_bg_color = data[i].status == "Pending" ? "#fba81c" : data[i].status == "Approved" ? "#55a939" : "#e8534c";
        var row = $.UI.create("View", { classes: ['wfill', 'padding', 'rounded'], bottom: data.length - 1 == i ? 10 : 0, height: 120, backgroundColor: left_indicator_bg_color, record: data[i] });
        var view_container = $.UI.create("View", { classes: ['wfill', 'hfill'], touchEnabled: false, backgroundColor: "#fff", left: 5 });
        row.add(view_container);

        var view_left_container = $.UI.create("View", { classes: ['hfill'], touchEnabled: false, width: "30%", left: 0, top: 10, bottom: 10 });
        view_container.add(view_left_container);
        var view_cutoff = $.UI.create("View", { zIndex: 100, touchEnabled: false, width: 30, height: 30, borderRadius: 15, backgroundColor: "#535a74", top: -20, left: Math.floor(pWidth * 0.30) - 15 });
        var view_cutoff2 = $.UI.create("View", { zIndex: 100, touchEnabled: false, width: 30, height: 30, borderRadius: 15, backgroundColor: "#535a74", bottom: -20, left: Math.floor(pWidth * 0.30) - 15 });
        view_container.add(view_cutoff);
        view_container.add(view_cutoff2);
        var view_amount = $.UI.create("View", { classes: ['wfill', 'vert'], touchEnabled: false, height: 60, top: 0 });
        var view_date = $.UI.create("View", { classes: ['wfill', 'vert'], touchEnabled: false, height: 40, left: 10, bottom: 0 });
        view_left_container.add(view_amount);
        view_left_container.add(view_date);

        var label_status = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h5'], bottom: 50, touchEnabled: false, left: 10, right: 10, minimumFontSize: 10, color: left_indicator_bg_color, text: data[i].status });
        view_left_container.add(label_status);
        var label_amount = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h4', 'bold'], touchEnabled: false, left: 10, right: 10, minimumFontSize: 10, text: "RM " + data[i].amount });
        view_amount.add(label_amount);

        var label_date_title = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], touchEnabled: false, text: "DATE" });
        var label_date = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, text: data[i].visitdate });
        view_date.add(label_date_title);
        view_date.add(label_date);

        var view_separator = $.UI.create("View", { classes: ['hfill'], touchEnabled: false, width: 1, left: "30%", top: 10, bottom: 10, backgroundColor: "#eeeeee" });
        view_container.add(view_separator);
        var view_right_container = $.UI.create("View", { classes: ['hfill'], touchEnabled: false, width: "70%", left: "30%", right: 10, bottom: 10, top: 10 });
        view_container.add(view_right_container);

        var view_right_top = $.UI.create("View", { classes: ['wfill', 'vert', 'padding'], touchEnabled: false, top: 0, bottom: 0, height: 60 });
        view_right_container.add(view_right_top);

        var label_clinic = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].clinicname });
        var label_claimUnder_title = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], touchEnabled: false, top: 5, text: "CLAIM UNDER" });
        var label_claimUnder = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].name });
        view_right_top.add(label_clinic);
        view_right_top.add(label_claimUnder_title);
        view_right_top.add(label_claimUnder);

        var view_right_bottom = $.UI.create("View", { classes: ['vert'], touchEnabled: false, width: "50%", left: 10, bottom: 0, height: 40 });
        view_right_container.add(view_right_bottom);
        var label_type_title = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], touchEnabled: false, text: "CLAIM TYPE" });
        var label_type = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].claimtype });
        view_right_bottom.add(label_type_title);
        view_right_bottom.add(label_type);

        var view_right_bottom2 = $.UI.create("View", { classes: ['vert'], touchEnabled: false, width: "32%", left: "53%", bottom: 0, height: 40 });
        view_right_container.add(view_right_bottom2);

        var label_category_title = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], touchEnabled: false, text: "CATEGORY" });
        var label_category = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].category });
        view_right_bottom2.add(label_category_title);
        view_right_bottom2.add(label_category);

        var view_right_bottom3 = $.UI.create("View", { classes: ['vert'], touchEnabled: false, width: "15%", left: "86%", bottom: 0, height: 40 });
        view_right_container.add(view_right_bottom3);

        var label_mc_title = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6'], touchEnabled: false, text: "MC" });
        var label_mc = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h6', 'bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].mcdays });
        view_right_bottom3.add(label_mc_title);
        view_right_bottom3.add(label_mc);

        row.addEventListener("click", function (e) {
          Alloy.Globals.nav.navigateWithArgs("asp/claimDetail", e.source.record);
        });

        $.listing.add(row);
      }
    };
    if (data.length <= 0) {
      var row = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding', 'rounded'], bottom: 0, backgroundColor: "#fff" });
      var view_container = $.UI.create("View", { classes: ['wfill', 'hsize', 'padding'], touchEnabled: false });
      var label = $.UI.create("Label", { classes: ['wfill', 'hsize', 'h5'], textAlign: "center", text: "No record found" });
      row.add(view_container);
      view_container.add(label);
      $.listing.add(row);
    }
  }

  $.win.addEventListener("close", function () {

  });

  if ("android" == "android") {
    $.btnBack.addEventListener('click', function () {
      Alloy.Globals.nav.closeWindow($.win);
    });
  }

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/asp/claimHistory.js.map