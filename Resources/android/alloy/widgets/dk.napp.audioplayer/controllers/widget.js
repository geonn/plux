var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;


function WPATH(s) {
  var index = s.lastIndexOf('/');
  var path = index === -1 ?
  'dk.napp.audioplayer/' + s :
  s.substring(0, index) + '/dk.napp.audioplayer/' + s.substring(index + 1);

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
  var Widget = new (require('/alloy/widget'))('dk.napp.audioplayer');this.__widgetId = 'dk.napp.audioplayer';
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
  $.__views["wrap"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "wrap", layout: "vertical" });

  $.__views["wrap"] && $.addTopLevelView($.__views["wrap"]);
  $.__views["__alloyId0"] = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: 30, id: "__alloyId0" });

  $.__views["wrap"].add($.__views["__alloyId0"]);
  $.__views["playStopBtn"] = Ti.UI.createImageView(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, backgroundColor: "transparent", font: { fontSize: "24dp", fontFamily: "FontAwesome" }, color: "#fff", top: 0, width: 30, height: 30, left: 10, right: 10, zIndex: 10, id: "playStopBtn" });

  $.__views["__alloyId0"].add($.__views["playStopBtn"]);
  onPlayStopBtnClicked ? $.addListener($.__views["playStopBtn"], 'click', onPlayStopBtnClicked) : __defers['$.__views["playStopBtn"]!click!onPlayStopBtnClicked'] = true;$.__views["time"] = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Titanium.UI.SIZE, color: "#000", font: { fontFamily: "Roboto-Regular, arial", fontSize: "14dp" }, right: 0, left: 50, id: "time" });

  $.__views["__alloyId0"].add($.__views["time"]);
  exports.destroy = function () {};

  // make all IDed elements in $.__views available right on the $ in a
  // controller's internal code. Externally the IDed elements will
  // be accessed with getView().
  _.extend($, $.__views);

  // Controller code directly from the developer's controller file
  /**
   * Audio Player Widget
   * @author Mads Møller
   * (c) 2014 Napp ApS
   */
  var _ = require('underscore')._;
  var Activity = require('android.app.Activity');
  var AudioManager = require('android.media.AudioManager');
  var MediaPlayer = require('android.media.MediaPlayer');
  var Uri = require('android.net.Uri');

  var args = arguments[0] || {};
  var audioPlayer; // = Ti.Media.createAudioPlayer();
  var timer;
  $.time.color = args.color;

  // save off current idle timer state
  Ti.App.idleTimerDisabled = true;

  var idleTimer = Ti.App.idleTimerDisabled;
  var sliderTouched = false;
  var sliderIsPausingPlayback = false;
  var timerIsActive = false;
  var totalDisplayDuration;
  var playIcon;
  var pauseIcon;

  // parsing styles from TSS
  _.each(args.styles, function (value, property) {
    if (typeof value === 'object') {
      $[property].applyProperties(value);
      delete args.styles[property];
    }
  });
  delete args.styles;

  // parse icon arguments
  if (args.playIcon) {
    playIcon = WPATH("/images/play_button.png");
  }
  if (args.pauseIcon) {
    pauseIcon = WPATH("/images/pause_button.png");
  }

  function onPlayStopBtnClicked() {
    // If both are false, playback is stopped.
    if (audioPlayer.isPlaying()) {
      audioPlayer.pause();
      $.time.text = "Pause";
      $.playStopBtn.image = playIcon;
    } else {
      try {
        audioPlayer.start();
      } catch (e) {
        console.log("see what error here");
        console.log(e);
      }
      $.time.text = "Playing...";
      $.playStopBtn.image = pauseIcon;
    }
  }

  /**
       * Get the sound duration in miliseconds
       */
  function getDuration() {
    if (false) {
      console.log(audioPlayer.duration + " " + audioPlayer.time);
      console.log('should get this ' + Math.ceil(audioPlayer.duration * 1000));
      return Math.ceil(audioPlayer.duration * 1000);
    }
    return Math.ceil(audioPlayer.duration);
  }

  /**
       * prettifyTime
       * @param {String} time in seconds
       * @return {String} pretty time
       */
  function prettifyTime(time) {
    console.log(time + " time");
    time = Math.floor(time);
    // find minutes and seconds
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return padLeft(minutes, 2) + ":" + padLeft(seconds, 2);
  }

  function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
  }

  function updateTimeLabel() {
    // calc the duration - only once started
    $.time.text = audioPlayer.playing ? "Playing..." : "";
    return;

    totalDisplayDuration = prettifyTime(getDuration() / 1000);

    $.time.text = totalDisplayDuration;
  }

  exports.setUrl = function (url) {
    console.log("exports setUrl");
    var protocol = url.split('/')[0];
    if (protocol == "file:") {
      set_url(url);
      return;
    }
    var filename = url.split('/').pop();
    var folder = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, args.room_id);
    if (!folder.exists()) {
      folder.createDirectory();
    }
    var file_temp = Titanium.Filesystem.getFile(folder.resolve(), filename);
    if (file_temp.exists()) {
      console.log('b');
      console.log(file_temp.nativePath + " exist");
      set_url(file_temp.nativePath);
    } else {
      var xhr = Titanium.Network.createHTTPClient({
        onload: function () {
          // first, grab a "handle" to the file where you'll store the downloaded data
          //var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
          console.log("download the file");
          file_temp.write(this.responseData); // write to the file
          console.log(file_temp.nativePath + " exist");
          set_url(file_temp.nativePath);
        },
        timeout: 10000 });

      xhr.open('GET', url);
      xhr.send();
    }
  };

  function set_url(url) {
    console.log(url + " here url");
    const activity = new Activity(Ti.Android.currentActivity);
    const contentUri = Uri.parse(url);

    audioPlayer = new MediaPlayer();
    audioPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener({
      onCompletion: function (mediaPlayer) {
        $.playStopBtn.image = playIcon;
        console.log("audio release");
        $.time.text = "";
        Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
      } }));

    audioPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
    audioPlayer.setDataSource(activity.getApplicationContext(), contentUri);
    audioPlayer.prepare();

    $.playStopBtn.image = playIcon;
    /*
                                                                    audioPlayer.addEventListener('change', function(e) {
                                                                    console.log('State: ' + e.description + ' (' + e.state + ')');
                                                                     //updateTimeLabel();
                                                                     if(e.state == 7){	//7 = stopped
                                                                     	  image = playIcon;
                                                                     }else if(e.state == 5){    //7 = stopped
                                                                            $.time.text = "";
                                                                            image = playIcon;
                                                                        }else if(e.state == 2){
                                                                    $.time.text = "Pause";
                                                                    }else if(e.state == 3){
                                                                    $.time.text = "Playing...";
                                                                    }
                                                                    });
                                                                    audioPlayer.addEventListener("complete", function(e){
                                                                    $.playStopBtn.image = playIcon;
                                                                        audioPlayer.release();
                                                                        console.log("audio release");
                                                                    $.time.text = "";
                                                                    Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
                                                                    });*/

  }

  exports.updatePlayIcon = function (icon) {
    playIcon = icon;
  };

  exports.updatePauseIcon = function (icon) {
    pauseIcon = icon;
  };

  args.win.addEventListener("close", function () {
    if (_.isFunction(audioPlayer.release)) {
      audioPlayer.release();
    }
  });

  // EVENTS
  exports.addEventListener = $.on;
  exports.removeEventListener = $.off;
  exports.fireEvent = $.trigger;

  // Generated code that must be executed after all UI and
  // controller code. One example deferred event handlers whose
  // functions are not defined until after the controller code
  // is executed.
  __defers['$.__views["playStopBtn"]!click!onPlayStopBtnClicked'] && $.addListener($.__views["playStopBtn"], 'click', onPlayStopBtnClicked);

  // Extend the $ instance with all functions and properties
  // defined on the exports object.
  _.extend($, exports);
}

module.exports = Controller;
//# sourceMappingURL=file://c:\Users\Danial Haikal\Documents\Appcelerator_Studio_Workspace\plux/build/map/Resources\android\alloy\widgets\dk.napp.audioplayer\controllers\widget.js.map