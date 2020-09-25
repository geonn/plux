/**
 * Alloy for Titanium by Appcelerator
 * This is generated code, DO NOT MODIFY - changes will be lost!
 * Copyright (c) 2012 by Appcelerator, Inc.
 */
var Alloy = require('/alloy'),
_ = Alloy._,
Backbone = Alloy.Backbone;

// The globals should be configured by the bootstrap script, however if anyone is using an SDK
// older than 7.5.0 that won't get ran. So set them here if they don't exist
if (!global.Alloy) {
  global.Alloy = Alloy;
  global._ = _;
  global.Backbone = Backbone;
}

// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

/*
 remove asp_password for security issues.
 * */
Ti.App.Properties.removeProperty('asp_password');
Ti.App.Properties.removeProperty('is_ver');
Alloy.Globals.push_redirect = true;
Alloy.Globals.common = require('common');
Alloy.Globals.API = require('api');
Alloy.Globals.nav = require('navigation');
Alloy.Globals.socket = require('socket');
Alloy.Globals._ = require("alloy/underscore")._;
//Alloy.Globals.Map =  (OS_IOS || OS_ANDROID) ? require('ti.map') : Ti.Map;
//var DBVersionControl = require('DBVersionControl');
//DBVersionControl.checkAndUpdate();
Alloy.Globals.Map = require('ti.map');

var win;
var target_page = "";
Ti.App.addEventListener("pause", function (e) {
  Alloy.Globals.push_redirect = true;
  Alloy.Globals.socket.disconnect();
  //Ti.App.fireEvent("disconnect");
  if (false) {
    win = Ti.UI.createWindow({ backgroundColor: "red" });
    win.open();
  }
});

Ti.App.addEventListener("resumed", function (e) {
  if (typeof win != null && win != null) {
    win.close();
  }
  setTimeout(function () {
    Alloy.Globals.push_redirect = false;
  }, 2000);
  var time_offset = parseInt(Ti.App.Properties.getString('time_offset')) + 0 || 0;
  //Ti.App.fireEvent("connect", {u_id: Ti.App.Properties.getString('u_id') || 0, time_offset: time_offset});
});

Alloy.Globals.Device = {
  version: Ti.Platform.version,
  versionMajor: parseInt(Ti.Platform.version.split(".")[0], 10),
  versionMinor: parseInt(Ti.Platform.version.split(".")[1], 10),
  width: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
  height: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
  dpi: Ti.Platform.displayCaps.dpi,
  orientation: Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "landscape" : "portrait" };


Alloy.Globals.calculateElementDimensions = function (size) {

  var layout = {};

  // intro
  layout.appointment = {};
  layout.appointment.dotted_left = Math.floor(size.width * 0.30) - 15;
  return layout;
};

Alloy.Globals.layout = Alloy.Globals.calculateElementDimensions(Alloy.Globals.Device);

Alloy.Globals.mocx = require("mocx");
Alloy.Globals.mocx.createCollection("chats", []);
Alloy.Globals.mocx.createCollection("points", []);
Alloy.Globals.mocx.createCollection("appointment", []);


// Open root window if a new UI session has started. Can happen more than once in app's lifetime.
// Event can only be fired if "tiapp.xml" property "run-in-background" is set true.
Ti.UI.addEventListener('sessionbegin', function () {
  Alloy.createController('index');
});

// Open the root window immediately if an active UI session exists on startup.
// Note: The Ti.UI.hasSession property was added as of Titanium 9.1.0.
if (typeof Ti.UI.hasSession === 'undefined' || Ti.UI.hasSession) {
  Alloy.createController('index');
}
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/app.js.map