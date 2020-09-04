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
  this.__controllerPath = 'appointment/index';
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
  { barColor: "transparent", backgroundColor: "#535a74", orientationModes: [Ti.UI.PORTRAIT], fullscreen: false, windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN, title: "Appointment", id: "win", backButtonTitle: "", navTintColor: "#CE1D1C" });

  $.__views["win"] && $.addTopLevelView($.__views["win"]);
  $.__views["__alloyId48"] = Ti.UI.createView(
  { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "__alloyId48" });

  $.__views["win"].add($.__views["__alloyId48"]);
  if (true) {
    $.__views["__alloyId49"] = Ti.UI.createView(
    { borderWidth: 0, layout: "horizontal", width: Ti.UI.FILL, height: 50, backgroundColor: "#DEDEDE", id: "__alloyId49" });

    $.__views["__alloyId48"].add($.__views["__alloyId49"]);
    $.__views["__alloyId50"] = Ti.UI.createView(
    { borderWidth: 0, left: 0, width: "20%", id: "__alloyId50" });

    $.__views["__alloyId49"].add($.__views["__alloyId50"]);
    closeWindow ? $.addListener($.__views["__alloyId50"], 'click', closeWindow) : __defers['$.__views["__alloyId50"]!click!closeWindow'] = true;$.__views["__alloyId51"] = Ti.UI.createImageView(
    { left: 10, width: 25, height: 25, image: "/images/btn-back.png", id: "__alloyId51" });

    $.__views["__alloyId50"].add($.__views["__alloyId51"]);
    $.__views["__alloyId52"] = Ti.UI.createView(
    { borderWidth: 0, width: "60%", id: "__alloyId52" });

    $.__views["__alloyId49"].add($.__views["__alloyId52"]);
    $.__views["pageTitle"] = Ti.UI.createLabel(
    { width: Titanium.UI.SIZE, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: "16dp" }, text: 'Appointment', id: "pageTitle", textAlign: "center" });

    $.__views["__alloyId52"].add($.__views["pageTitle"]);
  }
  $.__views["__alloyId53"] = Ti.UI.createTableView(
  { contentHeight: Ti.UI.SIZE, contentWidth: Ti.UI.FILL, backgroundColor: "transparent", separatorStyle: "none", selectionStyle: "none", layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.FILL, bubbleParent: false, top: 0, id: "__alloyId53" });

  $.__views["__alloyId48"].add($.__views["__alloyId53"]);
  var __alloyId95 = Alloy.Collections['appointment'] || appointment;function __alloyId96(e) {if (e && e.fromAdapter) {return;}var opts = __alloyId96.opts || {};var models = __alloyId95.models;var len = models.length;var rows = [];for (var i = 0; i < len; i++) {var __alloyId54 = models[i];__alloyId54.__transform = _.isFunction(__alloyId54.transform) ? __alloyId54.transform() : __alloyId54.toJSON();var __alloyId56 = Ti.UI.createTableViewRow(
      {});

      rows.push(__alloyId56);
      var __alloyId58 = Ti.UI.createView(
      { borderWidth: 0, top: 10, left: 10, right: 10, bottom: 10, layout: "vertical", width: Ti.UI.FILL, borderRadius: "5", date: __alloyId54.__transform.date, clinic_tel: __alloyId54.__transform.clinic_tel, height: 120, backgroundColor: "#55a939" });

      __alloyId56.add(__alloyId58);
      var __alloyId60 = Ti.UI.createView(
      { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.FILL, touchEnabled: false, left: 5, backgroundColor: "#fff" });

      __alloyId58.add(__alloyId60);
      var __alloyId62 = Ti.UI.createView(
      { borderWidth: 0, height: Ti.UI.FILL, touchEnabled: false, width: "30%", left: 0, top: 10, bottom: 10 });

      __alloyId60.add(__alloyId62);
      var __alloyId64 = Ti.UI.createView(
      { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, touchEnabled: false, left: 10, top: 0 });

      __alloyId62.add(__alloyId64);
      var __alloyId66 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, touchEnabled: false, text: "REMAIN" });

      __alloyId64.add(__alloyId66);
      var __alloyId68 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 18 }, touchEnabled: false, text: __alloyId54.__transform.fromNow });

      __alloyId64.add(__alloyId68);
      var __alloyId70 = Ti.UI.createView(
      { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, touchEnabled: false, height: 40, left: 10, bottom: 0 });

      __alloyId62.add(__alloyId70);
      var __alloyId72 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, touchEnabled: false, text: "DATE" });

      __alloyId70.add(__alloyId72);
      var __alloyId74 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 16 }, touchEnabled: false, text: __alloyId54.__transform.date });

      __alloyId70.add(__alloyId74);
      var __alloyId76 = Ti.UI.createView(
      { borderWidth: 0, touchEnabled: false, zIndex: 100, width: 30, height: 30, borderRadius: 15, backgroundColor: "#535a74", top: -20, left: Alloy.Globals.layout.appointment.dotted_left });

      __alloyId60.add(__alloyId76);
      var __alloyId78 = Ti.UI.createView(
      { borderWidth: 0, touchEnabled: false, zIndex: 100, width: 30, height: 30, borderRadius: 15, backgroundColor: "#535a74", bottom: -20, left: Alloy.Globals.layout.appointment.dotted_left });

      __alloyId60.add(__alloyId78);
      var __alloyId80 = Ti.UI.createView(
      { borderWidth: 0, height: Ti.UI.FILL, touchEnabled: false, width: 1, left: "30%", top: 10, bottom: 10, backgroundColor: "#eee" });

      __alloyId60.add(__alloyId80);
      var __alloyId82 = Ti.UI.createView(
      { borderWidth: 0, height: Ti.UI.FILL, touchEnabled: false, width: "70%", left: "30%", top: 10, bottom: 10 });

      __alloyId60.add(__alloyId82);
      var __alloyId84 = Ti.UI.createView(
      { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, height: Ti.UI.SIZE, touchEnabled: false, left: 10, top: 0 });

      __alloyId82.add(__alloyId84);
      var __alloyId86 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, touchEnabled: false, text: "CLINIC NAME" });

      __alloyId84.add(__alloyId86);
      var __alloyId88 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 16 }, touchEnabled: false, maxLines: 2, minimumFontSize: 10, text: __alloyId54.__transform.clinic_name });

      __alloyId84.add(__alloyId88);
      var __alloyId90 = Ti.UI.createView(
      { borderWidth: 0, layout: "vertical", width: Ti.UI.FILL, touchEnabled: false, height: 40, left: 10, bottom: 0 });

      __alloyId82.add(__alloyId90);
      var __alloyId92 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Regular, arial", fontSize: 12 }, touchEnabled: false, text: "DOCTOR NAME" });

      __alloyId90.add(__alloyId92);
      var __alloyId94 = Ti.UI.createLabel(
      { width: Ti.UI.FILL, height: Ti.UI.SIZE, color: "#111111", font: { fontFamily: "Roboto-Bold", fontSize: 16 }, touchEnabled: false, minimumFontSize: 10, text: __alloyId54.__transform.dr_name });

      __alloyId90.add(__alloyId94);
    }$.__views["__alloyId53"].setData(rows);};__alloyId95.on('fetch destroy change add remove reset', __alloyId96);popup ? $.addListener($.__views["__alloyId53"], 'click', popup) : __defers['$.__views["__alloyId53"]!click!popup'] = true;exports.destroy = function () {__alloyId95 && __alloyId95.off('fetch destroy change add remove reset', __alloyId96);};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var id = args.id || "";
  var u_id = Ti.App.Properties.getString('u_id');
  var moment = require('alloy/moment');
  var loading = Alloy.createController('loading');
  init();

  function init() {
    $.win.add(loading.getView());
    loading.start();
    refresh();
  }

  function refresh() {
    Alloy.Globals.API.callByPost({ url: "getAppointmentList", new: true, domain: "FREEJINI_DOMAIN", params: { u_id: u_id } }, function (responseText) {
      var res = JSON.parse(responseText);
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].fromNow = moment(res.data[i].date).fromNow();
      };
      Alloy.Globals.mocx.createCollection("appointment", res.data);
      loading.finish();
    });
  }

  function popup(ex) {
    var dialog = Titanium.UI.createOptionDialog({
      title: L("Action"),
      options: ["Call", "Add To Calendar", "Cancel"],
      cancel: 2 });

    dialog.show();
    dialog.addEventListener('click', function (e) {
      if (false ? e.cancel != e.index : !e.cancel) {
        if (e.index == "0") {
          call(ex.source);
        } else if (e.index == '1') {
          addToCalender({ date: ex.source.date });
        }
      }
    });
  }

  function addToCalendar(e) {
    // Create the event
    var date = e.date.split("/");
    var start_date = new Date(date[0], date[1] - 1, date[2], 10, 0, 0);
    var end_date = new Date(date[0], date[1] - 1, date[2], 23, 59, 59);
    var CALENDAR_TO_USE = 1;
    var calendar = Ti.Calendar.getCalendarById(CALENDAR_TO_USE);
    console.log('check here');
    console.log(calendar);
    var eventBegins = new Date(2010, 11, 26, 12, 0, 0);
    var eventEnds = new Date(2010, 11, 26, 14, 0, 0);
    var details = {
      title: 'Do some stuff',
      description: "I'm going to do some stuff at this time.",
      begin: eventBegins,
      end: eventEnds };


    var event = calendar.createEvent(details);

    // Now add a reminder via e-mail for 10 minutes before the event.
    var reminderDetails = {
      minutes: 10,
      method: Ti.Calendar.METHOD_EMAIL };


    event.createReminder(reminderDetails);
  }

  function addToCalender(e) {
    console.log("addToCalender");
    console.log(e);
    if ("android" == "android") {
      var hasCalendarPermissions = Ti.Calendar.hasCalendarPermissions();

      if (hasCalendarPermissions) {
        showCalendars(Ti.Calendar.selectableCalendars);
        setCalendarEvent(e);
      } else
      {
        Ti.Calendar.requestCalendarPermissions(function (e1) {
          if (e1.success) {
            showCalendars(Ti.Calendar.selectableCalendars);
            setCalendarEvent(e);
          } else {
            alert('You denied permission.');
          }
        });
      }
    } else {
      console.log(Ti.Calendar.hasCalendarPermissions() + " Ti.Calendar.hasCalendarPermissions");
      if (Ti.Calendar.hasCalendarPermissions()) {
        showCalendars(Ti.Calendar.allCalendars);
        setCalendarEvent(e);

      } else {
        Ti.Calendar.requestCalendarPermissions(function (ex1) {
          if (ex1.success) {
            showCalendars(Ti.Calendar.allCalendars);
            setCalendarEvent(e);
          } else {
            alert('Access to calendar is not allowed');
          }
        });
      }
    }
  }
  var Calendar_id = "";
  function showCalendars(calendars) {
    for (var i = 0; i < calendars.length; i++) {
      console.log(calendars[i].id + " " + calendars[i].name);
      if (calendars[i].name == "Calendar" || i === 0) {
        Calendar_id = calendars[i].id;
      }
    }

    if (true) {
      Calendar_id = 1;
    }
  }

  function call(e) {
    var tel = e.clinic_tel;
    tel = tel.replace(/[+]/g, "");
    Ti.Platform.openURL('tel:' + tel);
  }


  function setCalendarEvent(e) {
    console.log("setCalendarEvent");
    console.log(e);
    var cal = Ti.Calendar.getCalendarById(Calendar_id);
    console.log(cal);
    var date = e.date.split("-");
    var start_date = new Date(date[0], date[1] - 1, date[2], 10, 0, 0);
    var end_date = new Date(date[0], date[1] - 1, date[2], 23, 59, 59);

    /*
                                                                                                                                            if(e.source.expired_date != "0000-00-00"){
                                                                                                                                            	var expired_date = e.source.expired_date.split("/");
                                                                                                                                            	var end_date = new Date(expired_date[2], expired_date[1]-1, expired_date[0]-1, 10, 0, 0);
                                                                                                                                            }else{
                                                                                                                                            	var end_date = new Date(active_date[2], active_date[1]-1, active_date[0], 23, 0, 0);
                                                                                                                                            }*/

    var event = cal.createEvent({
      title: "Doctor Appointment",
      begin: start_date,
      end: end_date,
      availability: Ti.Calendar.AVAILABILITY_FREE,
      allDay: true });


    var mil = 60 * 1000;

    //adding alert to your event , this alert will be before the start _date with 1 minutes
    if (false) {
      var alert1 = event.createAlert({
        relativeOffset: mil });

      event.alerts = [alert1];
      event.save(Ti.Calendar.SPAN_FUTUREEVENTS);
    } else {
      var reminderDetails = {
        minutes: 60,
        method: Ti.Calendar.METHOD_ALERT };


      event.createReminder(reminderDetails);
    }



    alert("Appointment reminder added into your calendar.");
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
    __defers['$.__views["__alloyId50"]!click!closeWindow'] && $.addListener($.__views["__alloyId50"], 'click', closeWindow);}
  __defers['$.__views["__alloyId53"]!click!popup'] && $.addListener($.__views["__alloyId53"], 'click', popup);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/controllers/appointment/index.js.map