var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;


function WPATH(s) {
  var index = s.lastIndexOf('/');
  var path = index === -1 ?
  'geonn.voicerecorder/' + s :
  s.substring(0, index) + '/geonn.voicerecorder/' + s.substring(index + 1);

  return path.indexOf('/') !== 0 ? '/' + path : path;
}

function __processArg(obj, key) {
  var arg = null;
  if (obj) {
    arg = obj[key] || null;
  }
  return arg;
}

function Controller() {
  var Widget = new (require('/alloy/widget'))('geonn.voicerecorder');this.__widgetId = 'geonn.voicerecorder';
  require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
  this.__controllerPath = 'widget';
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
  $.__views["container"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, height: Ti.UI.SIZE, id: "container", backgroundColor: "#ffffff" });

  $.__views["container"] && $.addTopLevelView($.__views["container"]);
  $.__views["text_area"] = Ti.UI.createView(
  { borderWidth: 0, layout: "horizontal", width: Ti.UI.SIZE, height: Ti.UI.SIZE, id: "text_area", backgroundColor: "#ffffff", zIndex: 20 });

  $.__views["container"].add($.__views["text_area"]);
  $.__views["__alloyId1"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.SIZE, height: 40, borderRadius: 10, left: 10, right: 10, backgroundColor: "#1b99e9", id: "__alloyId1" });

  $.__views["text_area"].add($.__views["__alloyId1"]);
  stopRecording ? $.addListener($.__views["__alloyId1"], 'click', stopRecording) : __defers['$.__views["__alloyId1"]!click!stopRecording'] = true;$.__views["__alloyId2"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#20243e", font: { fontFamily: "Roboto-Regular, arial" }, text: 'STOP', touchEnabled: false, right: 10, left: 10, id: "__alloyId2" });

  $.__views["__alloyId1"].add($.__views["__alloyId2"]);
  $.__views["__alloyId3"] = Ti.UI.createView(
  { borderWidth: 0, width: 1, height: 20, backgroundColor: "#fff", id: "__alloyId3" });

  $.__views["text_area"].add($.__views["__alloyId3"]);
  $.__views["timer_text"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontFamily: "Roboto-Regular, arial" }, text: 'Recording', id: "timer_text", left: 10, right: 10 });

  $.__views["text_area"].add($.__views["timer_text"]);
  $.__views["timer"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", font: { fontFamily: "Roboto-Regular, arial" }, text: '0:00', id: "timer", left: 10, right: 10 });

  $.__views["text_area"].add($.__views["timer"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  var args = arguments[0] || {};
  var timer = require(WPATH("timer"));
  var cancel_record = false;
  var recording = false;
  var audioRecorder = Titanium.Media.createAudioRecorder({ compression: Ti.Media.AUDIO_FORMAT_AAC, format: Titanium.Media.AUDIO_FILEFORMAT_MP4 });



  function startRecording() {
    //$.message_bar.animate({right: 200, duration: 30});
    console.log("startRecording " + cancel_record);
    if (recording) {
      return;
    }
    recording = true;
    cancel_record = false;
    timer.start($.timer);
    $.text_area.width = Ti.UI.SIZE;
    $.timer.show();
    $.timer_text.show();
    if (false) {
      Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAY_AND_RECORD;
      console.log('here!!!');
    }
    Ti.Media.vibrate();
    audioRecorder.start();
  }

  function stopRecording(e) {
    console.log("stop recording");
    recording = false;
    try {
      var sec = timer.stop();
      if (sec <= 1) {
        cancel_record = true;
      }
      var audioFile = audioRecorder.stop();
      if (false) {
        Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
      }
      if (sec > 1) {
        console.log(audioFile.nativePath);
        var filename = audioFile.nativePath.split('/').pop();
        var folder = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, args.room_id);
        if (!folder.exists()) {
          folder.createDirectory();
        }
        var file_temp = Titanium.Filesystem.getFile(folder.resolve(), filename);
        //var file_temp = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
        file_temp.write(audioFile.read());
        console.log(file_temp.nativePath);
        args.record_callback({ message: file_temp.nativePath, format: "voice", filedata: file_temp.read() });
      }
      //$.message_bar.animate({right: 50, duration: 30});
      $.text_area.width = 0;
      $.timer_text.hide();
      $.timer.hide();
    } catch (e) {
      console.log("error caught");
      cancel_record = true;
      $.text_area.width = 0;
      $.timer_text.hide();
      $.timer.hide();
    };

  }

  // call dispose when done
  function init() {
    $.timer.hide();
    $.timer_text.hide();
    $.text_area.width = 0;
    console.log(WPATH('images/icon_mic.png'));
    var img_mic = $.UI.create("ImageView", { image: WPATH('images/icon_mic.png'), top: 10, bottom: 10, zIndex: 3, right: 10, height: 30, width: 30 });

    img_mic.addEventListener("click", startRecording);
    img_mic.addEventListener("longpress", startRecording);
    //$.container.addEventListener("touchend", stopRecording);
    //$.container.addEventListener("touchcancel",stopRecording);
    $.container.add(img_mic);
  };

  init();

  // EVENTS
  exports.addEventListener = $.on;
  exports.removeEventListener = $.off;
  exports.fireEvent = $.trigger;
  exports.startRecording = startRecording;
  exports.stopRecording = stopRecording;

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["__alloyId1"]!click!stopRecording'] && $.addListener($.__views["__alloyId1"], 'click', stopRecording);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file:///Users/yikonnlau/Documents/Appcelerator_Studio_Workspace/plux/build/map/Resources/android/alloy/widgets/geonn.voicerecorder/controllers/widget.js.map