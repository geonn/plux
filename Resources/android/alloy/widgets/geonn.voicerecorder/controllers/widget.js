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
    delete obj[key];
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







  $.__views.container = Ti.UI.createView(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, id: "container", backgroundColor: "#ffffff" });

  $.__views.container && $.addTopLevelView($.__views.container);
  $.__views.text_area = Ti.UI.createView(
  { width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "text_area" });

  $.__views.container.add($.__views.text_area);
  $.__views.timer_text = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", text: 'Recording', id: "timer_text", right: 110 });

  $.__views.text_area.add($.__views.timer_text);
  $.__views.timer = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Ti.UI.SIZE, color: "#606060", text: '0:00', id: "timer", right: 50 });

  $.__views.text_area.add($.__views.timer);
  exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var timer = require(WPATH("timer"));
  var audioRecorder;
  var cancel_record = false;

  if (true) {
    audioRecorder = require("titutorial.audiorecorder");
  } else {
    console.log(Ti.Media.hasAudioPermissions() + " Ti.Media.hasAudioPermissions()");
    Titanium.Media.setAudioSessionCategory(Ti.Media.AUDIO_SESSION_CATEGORY_PLAY_AND_RECORD);
    audioRecorder = Titanium.Media.createAudioRecorder({ compression: Ti.Media.AUDIO_FORMAT_AAC, format: Titanium.Media.AUDIO_FILEFORMAT_MP4 });
  }

  var recordChecking = true;
  function startRecording() {
    if (recordChecking) {
      recordChecking = false;

      cancel_record = false;
      timer.start($.timer);
      $.text_area.width = Ti.UI.SIZE;
      $.timer.show();
      $.timer_text.show();
      if (false) {
        console.log('here!!!');
        audioRecorder.start();
      } else {

        audioRecorder.startRecording({
          outputFormat: audioRecorder.OutputFormat_MPEG_4,
          audioEncoder: audioRecorder.AudioEncoder_AMR_NB,
          directoryName: "plux",
          fileName: "tempfile",
          success: function (e) {

            console.log("response is => " + JSON.stringify(e));

            var audioDir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "plux");
            var audioFile = Ti.Filesystem.getFile(audioDir.resolve(), e.fileName);
            console.log("audioFile.nativePath = " + audioFile.nativePath);
            if (!cancel_record) {
              args.record_callback({ message: "", format: "voice", filedata: audioFile.read() });
            }
          },
          error: function (d) {
            $.text_area.width = 0;
            $.timer_text.hide();
            $.timer.hide();


          } });


      }
    }
  }

  function stopRecording() {
    try {
      recordChecking = true;
      var sec = timer.stop();
      if (sec <= 1) {
        cancel_record = true;
      }
      if (false) {
        var audioFile = audioRecorder.stop();
        console.log(audioFile);
        if (sec > 1) args.record_callback({ message: "", format: "voice", filedata: audioFile.read() });
      } else {
        audioRecorder.stopRecording();
      }
    } catch (err) {} finally {
      if (true) {
        audioRecorder.stopRecording();
      }


      $.text_area.width = 0;
      $.timer_text.hide();
      $.timer.hide();
    }
  }


  function init() {
    $.timer.hide();
    $.timer_text.hide();
    $.text_area.width = 0;
    console.log(WPATH('images/icon_mic.png'));
    var img_mic = $.UI.create("ImageView", { image: WPATH('images/icon_mic.png'), top: 10, bottom: 10, zIndex: 3, right: 10, height: 30, width: 30 });
    img_mic.addEventListener("touchstart", startRecording);
    img_mic.addEventListener("touchend", stopRecording);
    img_mic.addEventListener("touchcancel", stopRecording);
    $.container.add(img_mic);
  };

  init();


  exports.addEventListener = $.on;
  exports.removeEventListener = $.off;
  exports.fireEvent = $.trigger;









  _.extend($, exports);
}

module.exports = Controller;