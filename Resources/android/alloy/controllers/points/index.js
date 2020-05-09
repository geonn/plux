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
  { backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Points", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId675"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId675" });

  $.__views["win"].add($.__views["__alloyId675"]);
  if (true) {
    $.__views["__alloyId676"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId676" });

    $.__views["__alloyId675"].add($.__views["__alloyId676"]);
    $.__views["__alloyId677"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId677" });

    $.__views["__alloyId676"].add($.__views["__alloyId677"]);
    closeWindow ? $.addListener($.__views["__alloyId677"], 'click', closeWindow) : __defers['$.__views["__alloyId677"]!click!closeWindow'] = true;$.__views["__alloyId678"] = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId678" });

    $.__views["__alloyId677"].add($.__views["__alloyId678"]);
    $.__views["__alloyId679"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId679" });

    $.__views["__alloyId676"].add($.__views["__alloyId679"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Points', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId679"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId680"] = Ti.UI.createTableView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, backgroundColor: "transparent", separatorStyle: "none", selectionStyle: "none", layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, bubbleParent: false, top: 0, id: "__alloyId680" });

  $.__views["__alloyId675"].add($.__views["__alloyId680"]);
  var __alloyId690 = Alloy.Collections['points'] || points;function __alloyId691(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId691.opts || {};var models = __alloyId690.models;var len = models.length;var rows = [];for (var i = 0; i < len; i++) {var __alloyId681 = models[i];__alloyId681.__transform = _.isFunction(__alloyId681.transform) ? __alloyId681.transform() : __alloyId681.toJSON();var __alloyId683 = Ti.UI.createTableViewRow(
      {});

      rows.push(__alloyId683);
      var __alloyId685 = Ti.UI.createView(
      { borderWidth: 0, layout: "vertical", height: Ti.UI.SIZE, borderRadius: "5", width: "75%", top: 10, backgroundColor: "#fff" });

      __alloyId683.add(__alloyId685);
      var __alloyId687 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#000", font: { fontFamily: "Roboto-Bold", fontSize: 18 }, textAlign: "center", top: 10, text: __alloyId681.__transform.points });

      __alloyId685.add(__alloyId687);
      var __alloyId689 = Ti.UI.createLabel(
      { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#000", font: { fontFamily: "Roboto-Regular, arial", fontSize: 16 }, bottom: 10, text: __alloyId681.__transform.description });

      __alloyId685.add(__alloyId689);
    }$.__views["__alloyId680"].setData(rows);};__alloyId690.on('fetch destroy change add remove reset', __alloyId691);exports.destroy = function () {__alloyId690 && __alloyId690.off('fetch destroy change add remove reset', __alloyId691);};

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
    Alloy.Globals.API.callByPost({ url: "getMemberPointsRecords", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id } }, function (responseText) {
      var res = JSON.parse(responseText);
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].points = "+" + res.data[i].points + " points";
      };
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
    __defers['$.__views["__alloyId677"]!click!closeWindow'] && $.addListener($.__views["__alloyId677"], 'click', closeWindow);}


  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/points/index.js.map