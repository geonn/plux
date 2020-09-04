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
  this.__controllerPath = 'points/index';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Points", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId719"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId719" });

  $.__views["win"].add($.__views["__alloyId719"]);
  if (true) {
    $.__views["__alloyId720"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId720" });

    $.__views["__alloyId719"].add($.__views["__alloyId720"]);
    $.__views["__alloyId721"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId721" });

    $.__views["__alloyId720"].add($.__views["__alloyId721"]);
    closeWindow ? $.addListener($.__views["__alloyId721"], 'click', closeWindow) : __defers['$.__views["__alloyId721"]!click!closeWindow'] = true;$.__views["__alloyId722"] = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId722" });

    $.__views["__alloyId721"].add($.__views["__alloyId722"]);
    $.__views["__alloyId723"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId723" });

    $.__views["__alloyId720"].add($.__views["__alloyId723"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Points', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId723"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId724"] = Ti.UI.createTableView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, backgroundColor: "transparent", separatorStyle: "none", selectionStyle: "none", layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, bubbleParent: false, top: 0, id: "__alloyId724" });

  $.__views["__alloyId719"].add($.__views["__alloyId724"]);
  var __alloyId757 = Alloy.Collections['points'] || points;function __alloyId758(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId758.opts || {};var models = __alloyId757.models;var len = models.length;var rows = [];for (var i = 0; i < len; i++) {var __alloyId725 = models[i];__alloyId725.__transform = _.isFunction(__alloyId725.transform) ? __alloyId725.transform() : __alloyId725.toJSON();var __alloyId727 = Ti.UI.createTableViewRow(
      {});

      rows.push(__alloyId727);
      var __alloyId729 = Ti.UI.createView(
      { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, width: Ti.UI.FILL, borderRadius: "5", height: 120, backgroundColor: "#55a939" });

      __alloyId727.add(__alloyId729);
      var __alloyId730 = Ti.UI.createView(
      { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, touchEnabled: false, backgroundColor: "#fff", left: 5 });

      __alloyId729.add(__alloyId730);
      var __alloyId732 = Ti.UI.createView(
      { borderWidth: 0, layout: "vertical", height: Ti.UI.FILL, touchEnabled: false, width: "30%", left: 0, top: 10, bottom: 10 });

      __alloyId730.add(__alloyId732);
      var __alloyId734 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 24 }, touchEnabled: false, bottom: 5, left: 10, right: 10, minimumFontSize: 10, text: __alloyId725.__transform.type });

      __alloyId732.add(__alloyId734);
      var __alloyId736 = Ti.UI.createView(
      { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, touchEnabled: false, height: 60, top: 0 });

      __alloyId732.add(__alloyId736);
      var __alloyId738 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 18 }, touchEnabled: false, left: 10, right: 10, minimumFontSize: 10, text: __alloyId725.__transform.points });

      __alloyId736.add(__alloyId738);
      var __alloyId740 = Ti.UI.createView(
      { borderWidth: 0, touchEnabled: false, zIndex: 100, width: 30, height: 30, borderRadius: 15, backgroundColor: "#535a74", top: -20, left: __alloyId725.__transform.left });

      __alloyId730.add(__alloyId740);
      var __alloyId742 = Ti.UI.createView(
      { borderWidth: 0, touchEnabled: false, zIndex: 100, width: 30, height: 30, borderRadius: 15, backgroundColor: "#535a74", bottom: -20, left: __alloyId725.__transform.left });

      __alloyId730.add(__alloyId742);
      var __alloyId744 = Ti.UI.createView(
      { borderWidth: 0, height: Ti.UI.FILL, touchEnabled: false, width: 1, left: "30%", top: 10, bottom: 10, backgroundColor: "#eeeeee" });

      __alloyId730.add(__alloyId744);
      var __alloyId746 = Ti.UI.createView(
      { borderWidth: 0, height: Ti.UI.FILL, touchEnabled: false, width: "70%", left: "30%", right: 10, top: 10, bottom: 10 });

      __alloyId730.add(__alloyId746);
      var __alloyId748 = Ti.UI.createView(
      { borderWidth: 0, top: 0, left: 10, right: 10, bottom: 0, layout: "vertical", height: Ti.UI.FILL, touchEnabled: false });

      __alloyId746.add(__alloyId748);
      var __alloyId750 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, touchEnabled: false, top: 5, text: "DATE" });

      __alloyId748.add(__alloyId750);
      var __alloyId752 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, touchEnabled: false, top: 0, text: __alloyId725.__transform.date, minimumFontSize: 10 });

      __alloyId748.add(__alloyId752);
      var __alloyId754 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, touchEnabled: false, top: 10, text: "DESCRIPTION" });

      __alloyId748.add(__alloyId754);
      var __alloyId756 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 12 }, touchEnabled: false, top: 0, text: __alloyId725.__transform.description, minimumFontSize: 10 });

      __alloyId748.add(__alloyId756);
    }$.__views["__alloyId724"].setData(rows);};__alloyId757.on('fetch destroy change add remove reset', __alloyId758);exports.destroy = function () {__alloyId757 && __alloyId757.off('fetch destroy change add remove reset', __alloyId758);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var id = args.id || "";
  var notificationModel = Alloy.createCollection('notificationV2');
  var PDF = require('pdf');
  var notificationList;
  var u_id = Ti.App.Properties.getString('u_id');

  var loading = Alloy.createController('loading');
  init();

  function init() {
    $.win.add(loading.getView());
    loading.start();
    refresh();
  }

  function refresh() {
    var pWidth = (false ? Ti.Platform.displayCaps.platformWidth : parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10)) - 20;
    Alloy.Globals.API.callByPost({ url: "getMemberPointsRecords", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id } }, function (responseText) {
      var res = JSON.parse(responseText);
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].points = res.data[i].points + " points";
        res.data[i].left = Math.floor(pWidth * 0.30) - 15;
        res.data[i].type = res.data[i].type == "add" ? "+" : "-";
        res.data[i].left_bottom = Math.floor(pWidth * 0.30) - 15;
      };
      console.log(res.data);
      Alloy.Globals.mocx.createCollection("points", res.data);
      loading.finish();
    });
  }

  function render(data) {

  }

  function monthFormat(datetime) {

    var monthNames = [
    "Jan", "Feb", "Mar",
    "April", "May", "June", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"];


    var timeStamp = datetime.split(" ");
    var newFormat;
    var ampm = "am";
    var date = timeStamp[0].split("-");
    if (date[1] == "08") {
      date[1] = "8";
    }
    if (date[1] == "09") {
      date[1] = "9";
    }
    month = parseInt(date[1]) - 1;
    if (timeStamp.length == 1) {
      newFormat = date[2] + " " + monthNames[month] + " " + date[0];
    } else {
      var time = timeStamp[1].split(":");
      if (time[0] > 12) {
        ampm = "pm";
        time[0] = time[0] - 12;
      }

      newFormat = date[2] + " " + monthNames[month] + " " + date[0] + ", " + time[0] + ":" + time[1] + " " + ampm;
    }

    return newFormat;
  }

  function closeWindow() {
    $.win.close();
  }

  $.win.addEventListener("close", function () {
    $.destroy();
  });

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  if (true) {
    __defers['$.__views["__alloyId721"]!click!closeWindow'] && $.addListener($.__views["__alloyId721"], 'click', closeWindow);}


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://C:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\controllers\points\index.js.map