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







  $.__views.wrap = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: Ti.UI.SIZE, id: "wrap", layout: "vertical" });

  $.__views.wrap && $.addTopLevelView($.__views.wrap);
  $.__views.__alloyId0 = Ti.UI.createView(
  { borderWidth: 0, width: Ti.UI.FILL, height: 30, id: "__alloyId0" });

  $.__views.wrap.add($.__views.__alloyId0);
  $.__views.playStopBtn = Ti.UI.createImageView(
  { textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, backgroundColor: "transparent", font: { fontSize: "24dp", fontFamily: "FontAwesome" }, color: "#fff", top: 0, width: 30, height: 30, left: 10, right: 10, zIndex: 10, id: "playStopBtn" });

  $.__views.__alloyId0.add($.__views.playStopBtn);
  onPlayStopBtnClicked ? $.addListener($.__views.playStopBtn, 'click', onPlayStopBtnClicked) : __defers['$.__views.playStopBtn!click!onPlayStopBtnClicked'] = true;$.__views.time = Ti.UI.createLabel(
  { width: Ti.UI.SIZE, height: Titanium.UI.SIZE, color: "#fff", font: { fontSize: "14dp" }, right: 0, left: 50, id: "time" });

  $.__views.__alloyId0.add($.__views.time);
  exports.destroy = function () {};




  _.extend($, $.__views);








  var args = arguments[0] || {};
  var audioPlayer;
  var timer;

  Ti.App.idleTimerDisabled = true;

  var idleTimer = Ti.App.idleTimerDisabled;
  var sliderTouched = false;
  var sliderIsPausingPlayback = false;
  var timerIsActive = false;
  var totalDisplayDuration;
  var playIcon;
  var pauseIcon;


  _.each(args.styles, function (value, property) {
    if (typeof value === 'object') {
      $[property].applyProperties(value);
      delete args.styles[property];
    }
  });
  delete args.styles;


  if (args.playIcon) {
    playIcon = WPATH("/images/play_button.png");
  }
  if (args.pauseIcon) {
    pauseIcon = WPATH("/images/pause_button.png");
  }

  function onPlayStopBtnClicked() {


    console.log(audioPlayer.playing + " audioPlayer.playing");
    if (audioPlayer.playing) {
      audioPlayer.pause();
      $.playStopBtn.image = playIcon;
    } else {
      audioPlayer.play();
      $.playStopBtn.image = pauseIcon;
    }
  }




  function getDuration() {
    if (false) {
      console.log(audioPlayer.duration + " " + audioPlayer.time);
      console.log('should get this ' + Math.ceil(audioPlayer.duration * 1000));
      return Math.ceil(audioPlayer.duration * 1000);
    }
    return Math.ceil(audioPlayer.duration);
  }






  function prettifyTime(time) {
    console.log(time + " time");
    time = Math.floor(time);

    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return padLeft(minutes, 2) + ":" + padLeft(seconds, 2);
  }

  function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
  }

  function updateTimeLabel() {

    totalDisplayDuration = prettifyTime(getDuration() / 1000);

    $.time.text = totalDisplayDuration;
  }

  exports.setUrl = function (url) {

    var filename = url.split('/').pop();
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
    if (file.exists()) {
      set_url(file.nativePath);
    } else {
      var xhr = Titanium.Network.createHTTPClient({
        onload: function () {

          var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
          f.write(this.responseData);
          Ti.App.fireEvent('graphic_downloaded', { filepath: f.nativePath });
          set_url(f.nativePath);
        },
        timeout: 10000 });

      xhr.open('GET', url);
      xhr.send();
    }
  };

  function set_url(url) {
    console.log(url + " here url");
    try {
      if (false) {
        audioPlayer = Ti.Media.createSound({
          url: url,
          allowBackground: true });

      } else {
        audioPlayer = Ti.Media.createAudioPlayer({
          url: url,
          allowBackground: true });

      }
    } catch (e) {
      console.log(e.message);
    }
    audioPlayer.play();
    audioPlayer.stop();

    console.log(audioPlayer.time + " " + audioPlayer.duration);

    updateTimeLabel();


    $.playStopBtn.image = playIcon;

    audioPlayer.addEventListener('change', function (e) {
      console.log('State: ' + e.description + ' (' + e.state + ')');
      Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
      updateTimeLabel();
      if (e.state == 7) {

        $.playStopBtn.image = playIcon;
      }
    });

    audioPlayer.addEventListener("complete", function (e) {
      $.playStopBtn.image = playIcon;
    });
  }

  exports.updatePlayIcon = function (icon) {
    playIcon = icon;
  };

  exports.updatePauseIcon = function (icon) {
    pauseIcon = icon;
  };


  exports.dispose = function () {
    console.log("[AudioPlayerWidget] was disposed, idleTimer reset to = " + idleTimer);


    audioPlayer.stop();


    if (true) {
      audioPlayer.release();
    }


    Ti.App.idleTimerDisabled = idleTimer;
  };


  exports.addEventListener = $.on;
  exports.removeEventListener = $.off;
  exports.fireEvent = $.trigger;





  __defers['$.__views.playStopBtn!click!onPlayStopBtnClicked'] && $.addListener($.__views.playStopBtn, 'click', onPlayStopBtnClicked);



  _.extend($, exports);
}

module.exports = Controller;